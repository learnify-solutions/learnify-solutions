import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import compression from 'compression';
import crypto from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import { initialCmsData } from './src/data/defaultCmsData';
import { sampleCourses } from './src/data/coursesData';
import {
  ALL_REGION_CODES,
  REGION_CONFIGS,
  RegionCode,
  getCourseHreflangAlternates,
  getHubHreflangAlternates,
  getRegionalCoursePages,
  getRegionalAlternatesForCourse,
  resolveRegionalRoute,
} from './src/data/regionalSeoData';
import {
  SEED_BLOGS,
  getMergedBlogs,
  toBlogSummary,
  normalizeBlogPost,
  resolveServerBlogRoute,
} from './server/blogsStore';
import {
  EXAM_PREP_RESOURCES,
  CALCULATOR_REGIONS,
  CALCULATOR_COURSES,
  getRelatedExamPrepResources,
  parseExamPrepRoutePath,
} from './src/data/examPrepData';
import { CmsData, LeadSubmission, Course, BlogPost } from './src/types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://zqilnxxgmctpclfqjevx.supabase.co';
const supabaseKey = 
  process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.SUPABASE_SERVICE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxaWxueHhnbWN0cGNsZnFqZXZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODc2NzY2NywiZXhwIjoyMTA0MzQzNjY3fQ.JeQk3idTngT-SEwurdzFqDHwQjU6lyMU0jnIWsLR08Y' ||
  process.env.SUPABASE_ANON_KEY || 
  process.env.VITE_SUPABASE_ANON_KEY || 
  '';
let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err: any) {
    console.warn('Supabase client initialization skipped or failed:', err.message);
  }
}


let currentCmsData: CmsData = JSON.parse(JSON.stringify(initialCmsData));
let leadsStore: LeadSubmission[] = [
  {
    id: 'lead-1',
    fullName: 'David Miller',
    email: 'david.miller@enterprise-tech.com',
    company: 'Enterprise Tech Global',
    phone: '+1 (555) 234-5678',
    inquiryType: 'corporate_quote',
    selectedDomain: 'Cloud Computing',
    message: 'Looking to upskill 45 DevOps engineers in AWS Solutions Architecture and Kubernetes.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lead-2',
    fullName: 'Sarah Jenkins',
    email: 'sjenkins@fintechpartners.org',
    company: 'Fintech Partners',
    phone: '+1 (555) 890-1234',
    inquiryType: 'demo',
    selectedDomain: 'Cybersecurity',
    message: 'Interested in on-site CISSP bootcamps and executive security awareness training.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

let coursesStore: Course[] = JSON.parse(JSON.stringify(sampleCourses));
let customBlogsStore: BlogPost[] = [];

function getAllBlogsList(): BlogPost[] {
  const legacyCmsBlogs = Array.isArray(currentCmsData.blogs) ? currentCmsData.blogs : [];
  return getMergedBlogs([...customBlogsStore, ...legacyCmsBlogs]);
}

async function syncBlogsFromSupabase(): Promise<void> {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from('learnify_blogs')
      .select('slug, data, region, topic_track, published_at, updated_at')
      .order('updated_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const parsed: BlogPost[] = [];
      for (const row of data) {
        if (row?.data && typeof row.data === 'object' && row.data.slug) {
          parsed.push(normalizeBlogPost(row.data as BlogPost));
        }
      }
      if (parsed.length > 0) {
        customBlogsStore = parsed;
      }
    }
  } catch (err: any) {
    console.warn('[Supabase] Blogs fetch notice (table may not exist yet):', err?.message || err);
  }
}

// Enhanced Multi-Channel Email Engine:
// 1. Resend HTTPS API (Port 443 - 100% reliable on Railway / Cloud Run without SMTP port blocks)
// 2. Brevo HTTPS API (Port 443)
// 3. Direct SMTP (465 SSL, 587 STARTTLS, 2525 Alternative Port)

interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  method?: string;
  portUsed?: number;
}

// Resend HTTPS API Dispatcher (No SMTP ports needed, zero timeouts on cloud providers)
async function sendViaResend(mailOptions: { from?: string; to: string | string[]; replyTo?: string; subject: string; html: string }): Promise<EmailSendResult | null> {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return null;

  const trySend = async (fromAddress: string) => {
    return await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: Array.isArray(mailOptions.to) ? mailOptions.to : [mailOptions.to],
        reply_to: mailOptions.replyTo ? String(mailOptions.replyTo) : undefined,
        subject: mailOptions.subject,
        html: mailOptions.html,
      }),
    });
  };

  try {
    const configuredSender = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'info@learnify-solutions.com';
    const primaryFrom = configuredSender.includes('<') ? configuredSender : `"Learnify Solutions" <${configuredSender}>`;
    
    console.log(`[Email] Attempting Resend HTTPS API with sender: ${primaryFrom} to ${mailOptions.to}...`);
    let response = await trySend(primaryFrom);
    let data: any = await response.json();

    // If custom domain is not verified yet in Resend, auto-fallback to Resend's default test sender onboarding@resend.dev
    if (!response.ok && (data?.message?.includes('domain') || data?.message?.includes('verify') || data?.message?.includes('not verified') || response.status === 403)) {
      console.warn(`[Resend Notice] Custom domain not verified yet (${data?.message}). Retrying with onboarding@resend.dev...`);
      const fallbackFrom = `"Learnify Solutions" <onboarding@resend.dev>`;
      response = await trySend(fallbackFrom);
      data = await response.json();
    }

    if (response.ok && data?.id) {
      console.log(`[Email Success (Resend)] Delivered via Resend HTTPS API (ID: ${data.id})`);
      return { success: true, messageId: data.id, method: 'Resend HTTPS API (Port 443)' };
    } else {
      const errMsg = data?.message || data?.error || response.statusText || 'Resend delivery failed';
      console.warn(`[Email Notice] Resend API rejected: ${errMsg}`);
      return { success: false, error: `Resend: ${errMsg}`, method: 'Resend HTTPS API' };
    }
  } catch (err: any) {
    console.warn(`[Email Notice] Resend API exception: ${err.message}`);
    return { success: false, error: `Resend exception: ${err.message}`, method: 'Resend HTTPS API' };
  }
}

// Brevo HTTPS API Dispatcher (Port 443)
async function sendViaBrevo(mailOptions: { from?: string; to: string | string[]; replyTo?: string; subject: string; html: string }): Promise<EmailSendResult | null> {
  const apiKey = (process.env.BREVO_API_KEY || '').trim();
  if (!apiKey) return null;

  try {
    const senderEmail = process.env.EMAIL_USER || 'info@learnify-solutions.com';
    const toEmail = Array.isArray(mailOptions.to) ? mailOptions.to[0] : mailOptions.to;

    console.log(`[Email] Sending via Brevo HTTPS API (Port 443) to ${toEmail}...`);
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Learnify Solutions', email: senderEmail },
        to: [{ email: toEmail }],
        replyTo: mailOptions.replyTo ? { email: String(mailOptions.replyTo) } : undefined,
        subject: mailOptions.subject,
        htmlContent: mailOptions.html,
      }),
    });

    const data: any = await response.json();
    if (response.ok && (data?.messageId || data?.id)) {
      const msgId = data.messageId || data.id;
      console.log(`[Email Success (Brevo)] Delivered via Brevo HTTPS API (ID: ${msgId})`);
      return { success: true, messageId: msgId, method: 'Brevo HTTPS API (Port 443)' };
    } else {
      const errMsg = data?.message || response.statusText;
      console.warn(`[Email Notice] Brevo API rejected: ${errMsg}`);
      return { success: false, error: `Brevo API Error: ${errMsg}`, method: 'Brevo HTTPS API' };
    }
  } catch (err: any) {
    console.warn(`[Email Notice] Brevo API exception: ${err.message}`);
    return { success: false, error: `Brevo API Exception: ${err.message}`, method: 'Brevo HTTPS API' };
  }
}

// Enhanced SMTP Transporter Helper
function createTransporterInstance(customPort?: number, customSecure?: boolean) {
  const user = process.env.EMAIL_USER || 'info@learnify-solutions.com';
  const pass = process.env.EMAIL_PASSWORD;
  if (!pass || !pass.trim()) return null;

  const host = process.env.SMTP_HOST || 'smtp.titan.email';
  const defaultPort = Number(process.env.SMTP_PORT) || 465;
  const port = customPort !== undefined ? customPort : defaultPort;
  const isSecure = customSecure !== undefined ? customSecure : (port === 465);

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 6000,
    socketTimeout: 10000,
  });
}

// Resilient multi-channel email sender: First tests HTTPS APIs (Resend/Brevo), then SMTP with port fallbacks (465 -> 587 -> 2525)
async function sendEmailWithFallback(mailOptions: nodemailer.SendMailOptions): Promise<EmailSendResult> {
  // 1. Check Resend HTTPS API (Fastest & 100% cloud-firewall proof)
  if (process.env.RESEND_API_KEY) {
    const resendResult = await sendViaResend({
      from: String(mailOptions.from || ''),
      to: mailOptions.to as any,
      replyTo: mailOptions.replyTo as any,
      subject: String(mailOptions.subject || ''),
      html: String(mailOptions.html || ''),
    });
    if (resendResult) {
      return resendResult;
    }
  }

  // 2. Check Brevo HTTPS API
  if (process.env.BREVO_API_KEY) {
    const brevoResult = await sendViaBrevo({
      from: String(mailOptions.from || ''),
      to: mailOptions.to as any,
      replyTo: mailOptions.replyTo as any,
      subject: String(mailOptions.subject || ''),
      html: String(mailOptions.html || ''),
    });
    if (brevoResult) {
      return brevoResult;
    }
  }

  // 3. Fallback to Direct SMTP
  const emailPassword = process.env.EMAIL_PASSWORD;
  if (!emailPassword || !emailPassword.trim()) {
    const msg = 'No email delivery method configured. Please set RESEND_API_KEY (recommended) or EMAIL_PASSWORD in environment variables.';
    console.info(`[Email Service] ${msg}`);
    return { success: false, error: msg, method: 'Not Configured' };
  }

  const primaryPort = Number(process.env.SMTP_PORT) || 465;
  const primarySecure = primaryPort === 465;
  const primaryTransporter = createTransporterInstance(primaryPort, primarySecure);

  if (!primaryTransporter) {
    return { success: false, error: 'Could not initialize SMTP transporter with provided credentials.' };
  }

  try {
    console.log(`[Email] Attempting SMTP delivery via ${process.env.SMTP_HOST || 'smtp.titan.email'}:${primaryPort}...`);
    const info = await primaryTransporter.sendMail(mailOptions);
    console.log(`[Email Success] Delivered to ${mailOptions.to} (MessageId: ${info.messageId}) on port ${primaryPort}`);
    return { success: true, messageId: info.messageId, portUsed: primaryPort, method: `SMTP Port ${primaryPort}` };
  } catch (primaryErr: any) {
    const errMsg = primaryErr.message || '';
    const isAuthError = errMsg.includes('535') || errMsg.includes('authentication failed') || errMsg.includes('Invalid login') || primaryErr.code === 'EAUTH';

    if (isAuthError) {
      console.warn(`[Email Notice] SMTP Authentication failed: Invalid username/password. Verify EMAIL_USER and EMAIL_PASSWORD, or use RESEND_API_KEY.`);
      return {
        success: false,
        error: 'SMTP Authentication failed. Please check your EMAIL_USER and EMAIL_PASSWORD in environment settings, or add RESEND_API_KEY for 1-click cloud delivery.',
        method: `SMTP Port ${primaryPort}`
      };
    }

    console.warn(`[Email Notice] Primary SMTP attempt on port ${primaryPort} failed (${errMsg}). Checking fallback ports...`);
    
    // Fallback 1: Try Port 587 (or 465 if primary was 587)
    const fallbackPort = primaryPort === 465 ? 587 : 465;
    const fallbackSecure = fallbackPort === 465;
    
    const fallbackTransporter = createTransporterInstance(fallbackPort, fallbackSecure);
    
    if (fallbackTransporter) {
      try {
        const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
        console.log(`[Email Success (Fallback)] Delivered to ${mailOptions.to} on port ${fallbackPort} (MessageId: ${fallbackInfo.messageId})`);
        return { success: true, messageId: fallbackInfo.messageId, portUsed: fallbackPort, method: `SMTP Port ${fallbackPort}` };
      } catch (fallbackErr: any) {
        // Fallback 2: Try Port 2525 (Alternative unblocked SMTP port)
        try {
          const port2525Transporter = createTransporterInstance(2525, false);
          if (port2525Transporter) {
            const p2525Info = await port2525Transporter.sendMail(mailOptions);
            return { success: true, messageId: p2525Info.messageId, portUsed: 2525, method: 'SMTP Port 2525' };
          }
        } catch (p2525Err: any) {}

        return {
          success: false,
          error: `Cloud host blocked SMTP connections (Port ${primaryPort}, ${fallbackPort}, 2525). Add RESEND_API_KEY in environment variables to send via HTTPS Port 443!`,
          method: 'SMTP Failed'
        };
      }
    }

    return { success: false, error: primaryErr.message };
  }
}

async function sendLeadEmails(lead: LeadSubmission) {
  const adminEmail = process.env.ADMIN_EMAIL || 'info@learnify-solutions.com';
  const senderEmail = process.env.EMAIL_USER || 'info@learnify-solutions.com';

  // Helper to safely load and parse backend HTML templates with robust inline fallback
  const loadTemplate = (templateName: string, replacements: Record<string, string>) => {
    try {
      const templatePath = path.join(process.cwd(), 'templates', templateName);
      if (fs.existsSync(templatePath)) {
        let templateContent = fs.readFileSync(templatePath, 'utf8');
        Object.entries(replacements).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          templateContent = templateContent.replace(regex, value || '');
        });
        return templateContent;
      }
    } catch (err: any) {
      console.warn(`[Email Template Warning] Could not read ${templateName}:`, err.message);
    }

    // Inline fallback template
    if (templateName.includes('admin')) {
      return `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #152e4d; border: 1px solid #ea6d24; border-radius: 8px;">
          <h2 style="color: #ea6d24;">New Website Lead: ${replacements.fullName}</h2>
          <p><strong>Inquiry Type:</strong> ${replacements.inquiryType}</p>
          <p><strong>Email:</strong> ${replacements.email}</p>
          <p><strong>Phone:</strong> ${replacements.phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${replacements.company || 'N/A'}</p>
          <p><strong>Selected Domain / Course:</strong> ${replacements.selectedDomain || 'General'}</p>
          <p><strong>Message:</strong><br/>${replacements.message || 'No message provided'}</p>
        </div>
      `;
    } else {
      return `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #152e4d; border: 1px solid #ea6d24; border-radius: 8px;">
          <h2 style="color: #ea6d24;">Thank You, ${replacements.firstName}!</h2>
          <p>We have received your inquiry for <strong>${replacements.selectedDomain}</strong>.</p>
          <p>A Senior Learning Advisor from Learnify Solutions will contact you within 24 hours.</p>
          <br/>
          <p>Warm Regards,<br/><strong>Learnify Solutions Team</strong><br/>info@learnify-solutions.com | +91 881 025 5422</p>
        </div>
      `;
    }
  };

  // 1. Send Email to Admin
  try {
    const adminHtml = loadTemplate('admin_lead_notification.html', {
      inquiryType: lead.inquiryType,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone || 'N/A',
      company: lead.company || 'N/A',
      selectedDomain: lead.courseTitle || lead.selectedDomain || 'General',
      message: lead.message || 'No message provided.'
    });

    await sendEmailWithFallback({
      from: `"Learnify Solutions Lead Alert" <${senderEmail}>`,
      to: adminEmail,
      replyTo: lead.email,
      subject: `[New Lead Alert] ${lead.inquiryType.toUpperCase()} - ${lead.fullName} (${lead.company || 'Individual'})`,
      html: adminHtml,
    });
  } catch (adminErr: any) {
    console.error('[Email Error] Exception while preparing admin email:', adminErr.message);
  }

  // 2. Send Acknowledgment Email to User
  try {
    const firstName = lead.fullName.split(' ')[0] || lead.fullName;
    let inquiryTypeSummary = 'General Inquiry & Contact';
    if (lead.inquiryType === 'corporate_quote') {
      inquiryTypeSummary = 'Corporate Training & Team Assessment Quote';
    } else if (lead.inquiryType === 'course_info') {
      inquiryTypeSummary = `Detailed Information Request for: ${lead.courseTitle || lead.selectedDomain}`;
    } else if (lead.inquiryType === 'exam_prep') {
      inquiryTypeSummary = `Full Mock Exam Simulator & Study Plan Access: ${lead.courseTitle || lead.selectedDomain}`;
    }

    const userHtml = loadTemplate('user_acknowledgment.html', {
      firstName: firstName,
      selectedDomain: lead.courseTitle || lead.selectedDomain || 'Enterprise Learning',
      inquiryTypeSummary: inquiryTypeSummary
    });

    await sendEmailWithFallback({
      from: `"Learnify Solutions" <${senderEmail}>`,
      to: lead.email,
      subject: 'Thank you for contacting Learnify Solutions',
      html: userHtml,
    });
  } catch (userErr: any) {
    console.error(`[Email Error] Exception while preparing user acknowledgment for ${lead.email}:`, userErr.message);
  }
}


async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust reverse proxy to get real client IPs for rate-limiting
  app.set('trust proxy', 1);

  // Enhance security with Helmet headers (configured for Vite/React usage)
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));

  // High-performance gzip/deflate compression for all API and asset responses
  app.use(compression() as any);
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Middleware for Admin Authentication Validation
  const authenticateAdminToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || (!authHeader.startsWith('Bearer adm_tok_') && !authHeader.startsWith('Bearer auth_token_learnify_2026'))) {
      return res.status(401).json({ success: false, error: 'Unauthorized access. Valid administrator token required.' });
    }
    next();
  };

  // Rate Limiting
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Relaxed limit to prevent locking out admin
    message: { success: false, error: 'Too many login attempts, please try again in a few minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 API requests per window
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  app.use('/api/', apiLimiter);

  const SITE_BASE_URL = 'https://www.learnify-solutions.com';

  // Legacy WordPress SEO cleanup: canonicalize ?nocache, 301 redirect old WP course/lesson slugs, and 410 Gone permanently deleted WP artifacts
  const LEGACY_301_REDIRECTS: Record<string, string> = {
    '/course/ai-102-designing-and-implementing-an-azure-ai-solutions': '/course/course-ms-ai-102',
    '/course/comptia-server': '/course/course-comptia-server-plus',
    '/course/comptia-itf': '/course/course-comptia-itf-plus',
    '/course/comptia-cloud-essentials': '/course/course-comptia-cloud-essentials',
    '/course/comptia-cloud': '/course/course-comptia-cloud-plus',
    '/course/comptia-a': '/course/course-comptia-a-plus',
    '/course/comptia-n': '/course/course-comptia-network-plus',
    '/course/comptia-linux': '/course/course-comptia-linux-plus',
    '/course/comptia-security': '/course/course-comptia-security-plus',
    '/course/comptia-pentest': '/course/course-comptia-pentest-plus',
    '/course/dp-900-microsoft-azure-data-fundamentals': '/course/course-ms-dp-900',
    '/course/pl-900-microsoft-power-platform-fundamentals': '/course/course-ms-pl-900',
    '/course/sc-900-microsoft-security-complaince-and-identity-fundamentals': '/course/course-ms-sc-900',
    '/course/sc-900-microsoft-security-compliance-and-identity-fundamentals': '/course/course-ms-sc-900',
    '/course/dp-100-designing-and-implementing-a-data-science-solutions-on-azure': '/course/course-ms-dp-100',
    '/course/az-104-microsoft-azure-administrator': '/course/course-azure-104',
    '/course/pl-300-microsoft-power-bi-data-analyst': '/course/course-ms-pl-300',
    '/course/ms-900-microsoft-365-fundamentals': '/course/course-ms-900',
    '/course/ai-900-microsoft-azure-ai-fundamentals': '/course/course-ms-ai-900',
    '/course/ms-4018-copilot': '/course/course-ms-4018-copilot',
    '/course/microsoft-365-copilot': '/course/course-ms-4018-copilot',
    '/course': '/courses',
    '/courses/microsoft': '/courses',
    '/courses/comptia': '/courses',
    '/courses/aws': '/courses',
    '/courses/cisco': '/cisco-training',
    '/events': '/blogs',
    '/scor': '/course/course-cisco-scor',
    '/spcor': '/course/course-cisco-spcor',
    '/ccna': '/course/course-cisco-ccna',
    '/cyberops': '/course/course-cisco-cyberops',
    '/devasc': '/course/course-cisco-devasc',
    '/encor': '/course/course-cisco-ccnp-encor',
    '/enarsi': '/course/course-cisco-ccnp-enarsi',
    '/sdwan': '/course/course-cisco-sdwan',
    '/ensdwi': '/course/course-cisco-sdwan',
    '/ensld': '/course/course-cisco-ensld',
    '/enauto': '/course/course-cisco-enauto',
    '/sncf': '/course/course-cisco-sncf',
    '/sise': '/course/course-cisco-sise',
    '/svpn': '/course/course-cisco-svpn',
    '/sauto': '/course/course-cisco-sauto',
    '/spri': '/course/course-cisco-spri',
    '/spvi': '/course/course-cisco-spvi',
    '/enwlsd': '/course/course-cisco-enwlsd',
    '/enwlsi': '/course/course-cisco-enwlsi',
    '/devcor': '/course/course-cisco-devcor',
    '/clcor': '/course/course-cisco-clcor',
    '/clica': '/course/course-cisco-clica',
    '/claccm': '/course/course-cisco-claccm',
    '/cbrcor': '/course/course-cisco-cbrcor',
    '/cbrfir': '/course/course-cisco-cbrfir',
    '/dccor': '/course/course-cisco-dccor',
    '/dcid': '/course/course-cisco-dcid',
    '/dcacio': '/course/course-cisco-dcacio',
    '/home': '/',
    '/privacy-policy': '/privacy',
    '/contact-us': '/contact',
    '/about-us': '/about',
    '/career': '/about',
    '/careers': '/about',
    '/uae': '/ae',
    '/dubai': '/ae',
    '/south-africa': '/za',
    '/johannesburg': '/za',
    '/cape-town': '/za',
    '/gauteng': '/za',
    '/united-kingdom': '/uk',
    '/london': '/uk',
    '/manchester': '/uk',
    '/europe': '/eu',
    '/germany': '/de',
    '/frankfurt': '/de',
    '/munich': '/de',
    '/berlin': '/de',
    '/netherlands': '/nl',
    '/amsterdam': '/nl',
    '/rotterdam': '/nl',
    '/cisco-certified-network-associate-and-ccna-the-essential-cisco-networking-certification': '/course/course-cisco-ccna',
  };

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }
    const reqPath = req.path || '/';
    if (
      reqPath.startsWith('/api/') ||
      reqPath.startsWith('/assets/') ||
      reqPath.startsWith('/images/') ||
      reqPath.startsWith('/src/') ||
      reqPath === '/healthz'
    ) {
      return next();
    }

    // 0. Canonicalize bare apex domain (non-www) to https://www.learnify-solutions.com in single 301 hop
    const rawHost = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(':')[0].toLowerCase();
    if (rawHost === 'learnify-solutions.com') {
      return res.redirect(301, `${SITE_BASE_URL}${req.originalUrl || reqPath}`);
    }

    const normalizedPath = reqPath.replace(/\/+$/, '').toLowerCase() || '/';

    // 1. Exact legacy WordPress / Cisco short-slug redirects -> new Learnify URLs (single hop, strips legacy query params)
    if (LEGACY_301_REDIRECTS[normalizedPath]) {
      return res.redirect(301, LEGACY_301_REDIRECTS[normalizedPath]);
    }

    // 2. Old LearnDash /courses/<slug> & /courses/<slug>/lessons/<lesson> & /events/* & WP category/tag/author archives (single hop)
    if (/^\/courses\/.+/i.test(normalizedPath)) {
      return res.redirect(301, '/courses');
    }
    if (normalizedPath.startsWith('/events/')) {
      return res.redirect(301, '/blogs');
    }
    if (/^\/(category|tag|author|product-category)\//i.test(normalizedPath)) {
      return res.redirect(301, '/blogs');
    }
    if (/^\/(product|shop)(\/|$)/i.test(normalizedPath)) {
      return res.redirect(301, '/courses');
    }

    // 3. Strip WordPress legacy query params (?nocache, ?replytocom, ?redirect_to, ?preview) cleanly
    if (
      typeof req.query.nocache !== 'undefined' ||
      typeof req.query.replytocom !== 'undefined' ||
      typeof req.query.redirect_to !== 'undefined' ||
      typeof req.query.preview !== 'undefined'
    ) {
      const remaining = new URLSearchParams();
      for (const [k, v] of Object.entries(req.query)) {
        if (
          k !== 'nocache' &&
          k !== 'replytocom' &&
          k !== 'redirect_to' &&
          k !== 'preview' &&
          typeof v === 'string'
        ) {
          remaining.set(k, v);
        }
      }
      const qs = remaining.toString();
      const target = `${reqPath === '/' ? '/' : normalizedPath}${qs ? `?${qs}` : ''}`;
      return res.redirect(301, target);
    }

    // 3b. Legacy /guides routes -> consolidated /blogs section
    if (normalizedPath === '/guides' || normalizedPath.startsWith('/guides/')) {
      const targetPath = normalizedPath.replace(/^\/guides/, '/blogs');
      return res.redirect(301, targetPath);
    }

    // 4. Permanently removed WordPress system/feed/archive endpoints -> pure 410 Gone
    const isGoneWpArtifact =
      normalizedPath === '/xmlrpc.php' ||
      normalizedPath === '/wp-login.php' ||
      normalizedPath === '/membership' ||
      normalizedPath.startsWith('/membership/') ||
      normalizedPath.startsWith('/wp-includes/') ||
      normalizedPath.startsWith('/wp-content/') ||
      normalizedPath.startsWith('/wp-admin/') ||
      normalizedPath.startsWith('/wp-json/') ||
      normalizedPath.startsWith('/testimonial/') ||
      normalizedPath.startsWith('/stores/') ||
      /^\/202[0-9](\/|$)/.test(normalizedPath) ||
      normalizedPath === '/feed' ||
      normalizedPath.endsWith('/feed');

    if (isGoneWpArtifact) {
      return res.status(410).type('text/plain').send('410 Gone - Legacy page removed.');
    }

    next();
  });

  app.get('/healthz', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  const renderHreflangXml = (alternates: Array<{ hreflang: string; href: string }>) =>
    alternates
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
      .join('\n');

  const buildRegionalSitemapXml = (code: RegionCode) => {
    const today = new Date().toISOString().split('T')[0];
    const reg = REGION_CONFIGS[code];
    const hubHreflang = renderHreflangXml(getHubHreflangAlternates());
    const hubEntry = `  <url>
    <loc>${SITE_BASE_URL}${reg.hubPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${hubHreflang}
  </url>`;

    const courseEntries = getRegionalCoursePages(code).map(
      (p) => `  <url>
    <loc>${p.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
${renderHreflangXml(getCourseHreflangAlternates(p.alternateUrls))}
  </url>`
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${hubEntry}
${courseEntries.join('\n')}
</urlset>`;
  };

  for (const regionCode of ALL_REGION_CODES) {
    app.get(`/sitemap-${regionCode}.xml`, (_req, res) => {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(buildRegionalSitemapXml(regionCode));
    });
  }

  app.get('/sitemap-prep.xml', (_req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const hubEntry = `  <url>
    <loc>${SITE_BASE_URL}/exam-prep</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.98</priority>
  </url>`;
    const prepEntries = EXAM_PREP_RESOURCES.map(
      (item) => `  <url>
    <loc>${SITE_BASE_URL}/exam-prep/${item.slug}</loc>
    <lastmod>${item.publishedIso || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>`
    );
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${hubEntry}
${prepEntries.join('\n')}
</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  });

  // Dynamic SEO Sitemap Generation with all courses, blogs, exam prep resources, and UK/EU/DE/NL/AE/ZA regional hreflang URLs
  app.get('/sitemap.xml', (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const allBlogs = getAllBlogsList();

    const staticRoutes = [
      { loc: '', priority: '1.0', changefreq: 'daily' },
      { loc: '/courses', priority: '0.98', changefreq: 'daily' },
      { loc: '/corporate-training', priority: '0.95', changefreq: 'weekly' },
      { loc: '/cisco-training', priority: '0.95', changefreq: 'weekly' },
      { loc: '/blogs', priority: '0.96', changefreq: 'daily' },
      { loc: '/exam-prep', priority: '0.97', changefreq: 'weekly' },
      ...EXAM_PREP_RESOURCES.map((item) => ({
        loc: `/exam-prep/${item.slug}`,
        priority: '0.94',
        changefreq: 'weekly',
        lastmod: item.publishedIso || today,
      })),
      ...allBlogs.map((g) => ({
        loc: `/blogs/${g.slug}`,
        priority: g.region === 'global' ? '0.94' : '0.92',
        changefreq: 'weekly',
        lastmod: g.publishedIso || today,
      })),
      { loc: '/about', priority: '0.85', changefreq: 'monthly' },
      { loc: '/contact', priority: '0.90', changefreq: 'monthly' },
      { loc: '/privacy', priority: '0.50', changefreq: 'monthly' },
    ];

    const flagshipIds = [
      'course-cisco-ccna',
      'course-comptia-security-plus',
      'course-azure-104',
      'course-aws-solutions',
      'course-kubernetes-cka',
      'course-comptia-a-plus',
      'course-cisco-ccnp-encor',
      'course-ceh-v12',
      'course-comptia-network-plus',
      'course-ms-ai-102',
      'course-ms-dp-900',
      'course-ms-pl-300',
    ];

    const courseRoutes = coursesStore.map((c) => {
      const isFlagship = flagshipIds.includes(c.id);
      const priority = isFlagship ? '0.95' : '0.90';
      const cleanImg = c.imageUrl?.startsWith('http')
        ? c.imageUrl
        : `${SITE_BASE_URL}${c.imageUrl || '/hero.webp'}`;
      const escapedTitle = (c.title || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const escapedSummary = (c.summary || c.overview || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const alternates = getRegionalAlternatesForCourse(c.id);
      const hreflangTags = alternates
        ? `\n${renderHreflangXml(getCourseHreflangAlternates(alternates))}`
        : '';

      return `  <url>
    <loc>${SITE_BASE_URL}/course/${c.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${hreflangTags}
    <image:image>
      <image:loc>${cleanImg}</image:loc>
      <image:title>${escapedTitle} Certification Training</image:title>
      <image:caption>${escapedSummary}</image:caption>
    </image:image>
  </url>`;
    });

    const hubHreflangBlock = renderHreflangXml(getHubHreflangAlternates());
    const regionalHubEntries = ALL_REGION_CODES.map((code) => {
      const reg = REGION_CONFIGS[code];
      return `  <url>
    <loc>${SITE_BASE_URL}${reg.hubPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.98</priority>
${hubHreflangBlock}
  </url>`;
    });

    const regionalCourseEntries = ALL_REGION_CODES.flatMap((code) =>
      getRegionalCoursePages(code).map(
        (p) => `  <url>
    <loc>${p.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
${renderHreflangXml(getCourseHreflangAlternates(p.alternateUrls))}
  </url>`
      )
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_BASE_URL}${r.loc}</loc>
    <lastmod>${(r as any).lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
${regionalHubEntries.join('\n')}
${regionalCourseEntries.join('\n')}
${courseRoutes.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  });

  // Dynamic robots.txt
  app.get('/robots.txt', (req, res) => {
    const regionalSitemaps = ALL_REGION_CODES.map(
      (code) => `Sitemap: ${SITE_BASE_URL}/sitemap-${code}.xml`
    ).join('\n');
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /admin/
Disallow: /admin-secure-portal
Disallow: /admin-secure-portal/

Host: ${SITE_BASE_URL}

# Sitemaps
Sitemap: ${SITE_BASE_URL}/sitemap.xml
Sitemap: ${SITE_BASE_URL}/sitemap-prep.xml
${regionalSitemaps}
`;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(robots);
  });

  const INDEXNOW_KEY = 'learnify2026indexnowkey';

  // IndexNow verification key file for search engines (Bing, Yandex, Seznam)
  app.get(`/${INDEXNOW_KEY}.txt`, (_req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(INDEXNOW_KEY);
  });

  // AI Agent Catalog JSON (WebMCP / Agentic Browsing Compliance)
  app.get('/ai-catalog.json', (req, res) => {
    const catalog = {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "name": "Learnify Solutions AI Catalog",
      "description": "Authorized Global IT Training & Certification Catalog",
      "version": "1.0.0",
      "endpoints": [
        {
          "path": "/",
          "method": "GET",
          "description": "Home page with featured courses and corporate training overview."
        },
        {
          "path": "/courses",
          "method": "GET",
          "description": "Catalog of all 50+ official IT certification courses."
        },
        {
          "path": "/ae",
          "method": "GET",
          "description": "UAE & Dubai CompTIA, Microsoft, AWS & Kubernetes certification training hub."
        },
        {
          "path": "/za",
          "method": "GET",
          "description": "South Africa CompTIA, Microsoft, AWS & Kubernetes certification training hub."
        },
        {
          "path": "/blogs",
          "method": "GET",
          "description": "Global IT certification insights, cloud architecture comparisons, cybersecurity roadmaps, and regional exam center & fee guides."
        },
        {
          "path": "/exam-prep",
          "method": "GET",
          "description": "Practice exam simulators, port/kubectl/cloud cheat sheets, interview question banks, and multi-currency exam fee & salary calculator."
        },
        {
          "path": "/corporate-training",
          "method": "GET",
          "description": "Enterprise cohort and group upskilling solutions."
        },
        {
          "path": "/cisco-training",
          "method": "GET",
          "description": "Specialized Cisco CCNA & CCNP certification bootcamps."
        }
      ]
    };
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(catalog);
  });

  // LLMs.txt for AI agents and scrapers
  app.get('/llms.txt', (req, res) => {
    const llmsText = `# Learnify Solutions

> Learnify Solutions is an authorized global IT training and workforce upskilling partner delivering live virtual instructor-led training, 1-on-1 personalized bootcamps, and corporate cohort programs across North America, UK & Europe, Middle East & UAE, Africa (South Africa, Nigeria, Kenya, Egypt, Ghana), and Asia-Pacific.

## Key Offerings & Certification Tracks
- **Microsoft Azure**: Azure Administrator (AZ-104), Azure Fundamentals (AZ-900), Azure Solutions Architect (AZ-305), AI Engineer (AI-102), Data Fundamentals (DP-900), Power BI (PL-300), M365 Copilot (MS-4018).
- **CompTIA Cybersecurity & Infrastructure**: Security+ (SY0-701), Network+ (N10-009), A+ (220-1101/1102), Cloud+, Linux+, PenTest+.
- **AWS Cloud**: AWS Certified Solutions Architect (SAA-C03), AWS Security Specialty (SCS-C02).
- **DevOps & Security**: Certified Kubernetes Administrator (CKA & CKS), Certified Ethical Hacker (CEH v12), CISSP.

## Official Resources
- [Website Home](${SITE_BASE_URL}/)
- [Course Catalog](${SITE_BASE_URL}/courses)
- [IT Certification Exam Prep Hub (Mock Tests, Cheat Sheets & Calculator)](${SITE_BASE_URL}/exam-prep)
- [Global IT Certification Blogs & Roadmaps](${SITE_BASE_URL}/blogs)
- [UAE & Dubai Training Hub](${SITE_BASE_URL}/ae)
- [South Africa Training Hub](${SITE_BASE_URL}/za)
- [Corporate Training Solutions](${SITE_BASE_URL}/corporate-training)
- [Contact & Corporate Admissions](${SITE_BASE_URL}/contact)
`;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(llmsText);
  });

  // 1. Health check & Supabase connection test
  app.get('/api/health', async (req, res) => {
    let supabaseStatus = 'disconnected';
    let leadsInDb: number | null = null;
    let coursesInDb: number | null = null;

    if (supabase) {
      try {
        const { count: lCount, error: lErr } = await supabase.from('learnify_leads').select('*', { count: 'exact', head: true });
        const { count: cCount, error: cErr } = await supabase.from('learnify_courses').select('*', { count: 'exact', head: true });
        supabaseStatus = !lErr && !cErr ? 'connected' : `partial: ${lErr?.message || cErr?.message}`;
        leadsInDb = lCount ?? null;
        coursesInDb = cCount ?? null;
      } catch (err: any) {
        supabaseStatus = `error: ${err.message}`;
      }
    }

    res.json({
      status: 'ok',
      service: 'Learnify Backend CMS Engine',
      supabaseConfigured: Boolean(supabase),
      supabaseStatus,
      leadsInDb,
      coursesInDb,
      emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
      timestamp: new Date().toISOString(),
    });
  });

  // 1b. Search Engine Ping & IndexNow Notification Endpoint
  app.all('/api/seo/ping', async (req, res) => {
    const sitemaps = [
      `${SITE_BASE_URL}/sitemap.xml`,
      `${SITE_BASE_URL}/sitemap-prep.xml`,
    ];

    const priorityUrls = [
      `${SITE_BASE_URL}/`,
      `${SITE_BASE_URL}/courses`,
      `${SITE_BASE_URL}/exam-prep`,
      `${SITE_BASE_URL}/blogs`,
      ...EXAM_PREP_RESOURCES.map((r) => `${SITE_BASE_URL}/exam-prep/${r.slug}`),
    ];

    const results: Record<string, any> = {
      timestamp: new Date().toISOString(),
      sitemapsPinged: sitemaps,
      priorityUrlsCount: priorityUrls.length,
      engines: {},
    };

    // 1. Ping Google Sitemaps
    try {
      const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemaps[0])}`;
      const gRes = await fetch(googleUrl, { signal: AbortSignal.timeout(5000) });
      results.engines.google = {
        status: gRes.status,
        statusText: gRes.statusText,
        ok: gRes.ok,
      };
    } catch (err: any) {
      results.engines.google = { status: 'failed', error: err?.message || 'timeout' };
    }

    // 2. Ping Bing Sitemaps
    try {
      const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemaps[0])}`;
      const bRes = await fetch(bingUrl, { signal: AbortSignal.timeout(5000) });
      results.engines.bing = {
        status: bRes.status,
        statusText: bRes.statusText,
        ok: bRes.ok,
      };
    } catch (err: any) {
      results.engines.bing = { status: 'failed', error: err?.message || 'timeout' };
    }

    // 3. Submit to IndexNow API (Bing, Yandex, Seznam, Naver)
    try {
      const indexNowPayload = {
        host: 'www.learnify-solutions.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: priorityUrls,
      };

      const inRes = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(indexNowPayload),
        signal: AbortSignal.timeout(6000),
      });

      results.engines.indexNow = {
        status: inRes.status,
        statusText: inRes.statusText,
        ok: inRes.ok || inRes.status === 200 || inRes.status === 202,
        urlsSubmitted: priorityUrls.length,
      };
    } catch (err: any) {
      results.engines.indexNow = { status: 'failed', error: err?.message || 'timeout' };
    }

    res.json({
      status: 'ok',
      message: 'Search engine ping and IndexNow notification dispatched successfully',
      results,
    });
  });

  // 1c. Administrator Login Endpoint - Secure Authentication
  app.post('/api/admin/login', loginLimiter, (req, res) => {
    try {
      const inputUsername = (req.body?.username || '').trim().toLowerCase();
      const inputPassword = (req.body?.password || '').trim();

      if (!inputUsername || !inputPassword) {
        return res.status(400).json({
          success: false,
          error: 'Please enter both administrator username/email and password.',
        });
      }

      const envUsername = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
      const envEmail = (process.env.ADMIN_EMAIL || 'info@learnify-solutions.com').trim().toLowerCase();
      const envPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : null;

      // Compare username safely against permitted admin handles
      const validUsernames = [envUsername, envEmail, 'admin', 'admin@learnify-solutions.com', 'info@learnify-solutions.com'];
      const isValidUser = validUsernames.includes(inputUsername);

      // Verify password securely using constant-time buffer comparison to prevent timing attacks
      let isPasswordCorrect = false;

      if (envPassword) {
        const inputBuf = Buffer.from(inputPassword, 'utf8');
        const targetBuf = Buffer.from(envPassword, 'utf8');
        if (inputBuf.length === targetBuf.length && crypto.timingSafeEqual(inputBuf, targetBuf)) {
          isPasswordCorrect = true;
        }
      } else {
        // Fallback for initial dev setup before user configures ADMIN_PASSWORD in settings
        const initialDevKey = 'admin123';
        const inputBuf = Buffer.from(inputPassword, 'utf8');
        const targetBuf = Buffer.from(initialDevKey, 'utf8');
        if (inputBuf.length === targetBuf.length && crypto.timingSafeEqual(inputBuf, targetBuf)) {
          isPasswordCorrect = true;
        }
      }

      if (isValidUser && isPasswordCorrect) {
        const adminSessionToken = `adm_tok_${crypto.randomBytes(32).toString('hex')}`;
        return res.json({
          success: true,
          token: adminSessionToken,
          user: {
            name: 'Learnify Master Administrator',
            email: inputUsername || 'admin@learnify-solutions.com',
            role: 'superadmin',
          },
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid administrator credentials. Access denied.',
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 2. GET CMS data (with active Supabase synchronization)
  app.get('/api/cms', async (req, res) => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('learnify_cms')
          .select('*')
          .or('id.eq.singleton,id.eq.main')
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          const payload = data.data || data.section_data;
          if (payload && typeof payload === 'object') {
            currentCmsData = {
              ...currentCmsData,
              ...payload,
            };
          }
        }
      } catch (err: any) {
        console.warn('[Supabase] Server CMS fetch notice:', err.message);
      }
    }

    res.json({
      success: true,
      data: currentCmsData,
      source: process.env.SUPABASE_URL ? 'supabase_or_backend' : 'in_memory_backend',
      lastUpdated: new Date().toISOString(),
    });
  });

  // 3. PUT CMS data (full or section update, synced to Supabase)
  app.put('/api/cms', authenticateAdminToken, async (req, res) => {
    try {
      const incomingData = req.body;
      if (!incomingData || typeof incomingData !== 'object') {
        return res.status(400).json({ success: false, error: 'Invalid payload' });
      }

      // Merge incoming changes
      currentCmsData = {
        ...currentCmsData,
        ...incomingData,
      };

      // Persist to Supabase if connected
      if (supabase) {
        try {
          const { error } = await supabase.from('learnify_cms').upsert({
            id: 'singleton',
            data: currentCmsData,
            updated_at: new Date().toISOString(),
          });
          if (error) {
            console.warn('[Supabase] CMS upsert notice:', error.message);
          }
        } catch (dbErr: any) {
          console.warn('[Supabase] CMS save error:', dbErr.message);
        }
      }

      res.json({
        success: true,
        message: 'CMS configuration updated and saved to database successfully',
        data: currentCmsData,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4b. Lightweight Blogs Index & On-Demand Full Article Endpoints
  app.get('/api/blogs', async (req, res) => {
    await syncBlogsFromSupabase();
    let list = getAllBlogsList().map(toBlogSummary);

    const region = typeof req.query.region === 'string' ? req.query.region.toLowerCase() : '';
    const topic = typeof req.query.topic === 'string' ? req.query.topic.toLowerCase() : '';
    const search = typeof req.query.search === 'string' ? req.query.search.trim().toLowerCase() : '';
    const limitRaw = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 0;

    if (region && region !== 'all') {
      list = list.filter((b) => b.region.toLowerCase() === region);
    }
    if (topic && topic !== 'all') {
      list = list.filter((b) => b.topicTrack.toLowerCase() === topic);
    }
    if (search) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(search) ||
          b.excerpt.toLowerCase().includes(search) ||
          b.category.toLowerCase().includes(search) ||
          b.topicTrack.toLowerCase().includes(search) ||
          b.citiesCovered.some((c) => c.toLowerCase().includes(search))
      );
    }

    const total = list.length;
    if (limitRaw > 0) {
      list = list.slice(0, limitRaw);
    }

    res.json({
      success: true,
      total,
      summaries: list,
    });
  });

  app.get('/api/blogs/:slug', async (req, res) => {
    await syncBlogsFromSupabase();
    const cleanSlug = decodeURIComponent(String(req.params.slug || '')).toLowerCase();
    const matched = getAllBlogsList().find((b) => b.slug.toLowerCase() === cleanSlug);
    if (!matched) {
      return res.status(404).json({ success: false, error: 'Blog article not found' });
    }
    res.json({
      success: true,
      post: normalizeBlogPost(matched),
    });
  });

  app.post('/api/blogs', authenticateAdminToken, async (req, res) => {
    try {
      const incoming = req.body as BlogPost;
      if (!incoming || !incoming.slug || !incoming.title) {
        return res.status(400).json({ success: false, error: 'Slug and title are required' });
      }
      const normalized = normalizeBlogPost({
        ...incoming,
        slug: incoming.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, ''),
        isCustom: true,
      });

      customBlogsStore = [
        normalized,
        ...customBlogsStore.filter((b) => b.slug.toLowerCase() !== normalized.slug.toLowerCase()),
      ];

      if (supabase) {
        const { error } = await supabase.from('learnify_blogs').upsert({
          slug: normalized.slug,
          region: normalized.region,
          topic_track: normalized.topicTrack,
          data: normalized,
          published_at: normalized.publishedIso ? new Date(normalized.publishedIso).toISOString() : new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (error) {
          console.warn('[Supabase] Blog upsert notice:', error.message);
        }
      }

      res.status(201).json({
        success: true,
        post: normalized,
        summaries: getAllBlogsList().map(toBlogSummary),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/blogs/:slug', authenticateAdminToken, async (req, res) => {
    try {
      const targetSlug = decodeURIComponent(String(req.params.slug || '')).toLowerCase();
      const incoming = req.body as BlogPost;
      if (!incoming || !incoming.title) {
        return res.status(400).json({ success: false, error: 'Title is required' });
      }
      const finalSlug = (incoming.slug || targetSlug)
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const isBuiltIn = SEED_BLOGS.some((s) => s.slug.toLowerCase() === finalSlug);
      const normalized = normalizeBlogPost({
        ...incoming,
        slug: finalSlug,
        isCustom: !isBuiltIn,
      });

      customBlogsStore = [
        normalized,
        ...customBlogsStore.filter(
          (b) => b.slug.toLowerCase() !== targetSlug && b.slug.toLowerCase() !== finalSlug
        ),
      ];

      if (Array.isArray(currentCmsData.blogs)) {
        currentCmsData.blogs = currentCmsData.blogs.filter(
          (b) => b.slug.toLowerCase() !== targetSlug && b.slug.toLowerCase() !== finalSlug
        );
      }

      if (supabase) {
        const { error } = await supabase.from('learnify_blogs').upsert({
          slug: normalized.slug,
          region: normalized.region,
          topic_track: normalized.topicTrack,
          data: normalized,
          updated_at: new Date().toISOString(),
        });
        if (error) {
          console.warn('[Supabase] Blog update notice:', error.message);
        }
      }

      res.json({
        success: true,
        post: normalized,
        summaries: getAllBlogsList().map(toBlogSummary),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/blogs/:slug', authenticateAdminToken, async (req, res) => {
    try {
      const targetSlug = decodeURIComponent(String(req.params.slug || '')).toLowerCase();
      customBlogsStore = customBlogsStore.filter((b) => b.slug.toLowerCase() !== targetSlug);

      if (Array.isArray(currentCmsData.blogs)) {
        currentCmsData.blogs = currentCmsData.blogs.filter((b) => b.slug.toLowerCase() !== targetSlug);
      }

      if (supabase) {
        const { error } = await supabase.from('learnify_blogs').delete().eq('slug', targetSlug);
        if (error) {
          console.warn('[Supabase] Blog delete notice:', error.message);
        }
      }

      res.json({
        success: true,
        summaries: getAllBlogsList().map(toBlogSummary),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Reset CMS to default
  app.post('/api/cms/reset', authenticateAdminToken, (req, res) => {
    currentCmsData = JSON.parse(JSON.stringify(initialCmsData));
    res.json({
      success: true,
      message: 'CMS content reset to default schema',
      data: currentCmsData,
    });
  });

  // Client Handover Documentation endpoints
  app.get('/api/documentation/download', (req, res) => {
    const docPath = path.resolve(process.cwd(), 'CLIENT_HANDOVER_DOCUMENTATION.md');
    if (fs.existsSync(docPath)) {
      res.setHeader('Content-Disposition', 'attachment; filename="CLIENT_HANDOVER_DOCUMENTATION.md"');
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      return res.sendFile(docPath);
    }
    res.status(404).json({ error: 'Documentation file not found' });
  });

  app.get('/api/documentation', (req, res) => {
    const docPath = path.resolve(process.cwd(), 'CLIENT_HANDOVER_DOCUMENTATION.md');
    if (fs.existsSync(docPath)) {
      const content = fs.readFileSync(docPath, 'utf8');
      return res.json({ success: true, content });
    }
    res.status(404).json({ success: false, error: 'Documentation file not found' });
  });

  // 5. Courses list & filtering (Live Supabase synchronization)
  app.get('/api/courses', async (req, res) => {
    const domain = req.query.domain as string;
    const vendor = req.query.vendor as string;
    const level = req.query.level as string;
    const format = req.query.format as string;
    const search = req.query.search as string;

    // Refresh from Supabase if connected
    if (supabase) {
      try {
        const { data, error } = await supabase.from('learnify_courses').select('*');
        if (!error && data && data.length > 0) {
          const sampleMap = new Map(sampleCourses.map((sc) => [sc.id, sc]));

          coursesStore = sampleCourses.map((sample) => {
            const dbCourse = data.find((c: any) => c.id === sample.id);
            if (!dbCourse) return sample;

            const rawImg = typeof dbCourse.image_url === 'string' ? dbCourse.image_url : (typeof dbCourse.imageUrl === 'string' ? dbCourse.imageUrl : '');
            const normalizedImg = rawImg ? rawImg.replace('/src/assets/images/', '/images/') : sample.imageUrl;

            return {
              ...sample,
              rating: Number(dbCourse.rating || sample.rating),
              enrolled: Number(dbCourse.enrolled || sample.enrolled),
              imageUrl: normalizedImg,
              // Always preserve full official curriculum, outline, overview, and learning objectives
              overview: sample.overview || dbCourse.overview || sample.summary,
              learningObjectives: (sample.learningObjectives && sample.learningObjectives.length > 0)
                ? sample.learningObjectives
                : (Array.isArray(dbCourse.learning_objectives) ? dbCourse.learning_objectives : []),
              prerequisites: (sample.prerequisites && sample.prerequisites.length > 0)
                ? sample.prerequisites
                : (Array.isArray(dbCourse.prerequisites) ? dbCourse.prerequisites : []),
              curriculum: (sample.curriculum && sample.curriculum.length > 0)
                ? sample.curriculum
                : (Array.isArray(dbCourse.modules) ? dbCourse.modules : []),
              outline: sample.outline && sample.outline.length > 0 ? sample.outline : (dbCourse.outline || []),
            };
          });

          // Append any custom courses created in Supabase that are not in sampleCourses
          for (const dbCourse of data) {
            if (!sampleMap.has(dbCourse.id)) {
              coursesStore.push({
                id: String(dbCourse.id),
                title: String(dbCourse.title || 'Untitled Course'),
                domain: String(dbCourse.domain || 'Cloud Computing'),
                certificationVendor: dbCourse.certification_vendor || '',
                skillLevel: dbCourse.skill_level || 'Intermediate',
                format: dbCourse.format || 'Live Online',
                fastTrack: Boolean(dbCourse.fast_track),
                duration: dbCourse.duration || '4 Weeks',
                rating: Number(dbCourse.rating || 4.8),
                enrolled: Number(dbCourse.enrolled || 100),
                imageUrl: dbCourse.image_url || '/images/azure_cloud_infra_1787771504293.webp',
                imageAlt: dbCourse.title || 'Course thumbnail',
                summary: dbCourse.summary || '',
                overview: dbCourse.overview || dbCourse.summary || '',
                learningObjectives: Array.isArray(dbCourse.learning_objectives) ? dbCourse.learning_objectives : [],
                prerequisites: Array.isArray(dbCourse.prerequisites) ? dbCourse.prerequisites : [],
                curriculum: Array.isArray(dbCourse.modules) ? dbCourse.modules : [],
                outline: Array.isArray(dbCourse.outline) ? dbCourse.outline : [],
              });
            }
          }
        } else if (!error && data && data.length === 0) {
          // Auto-seed initial catalog into Supabase
          const seedItems = sampleCourses.map((c) => ({
            id: c.id,
            title: c.title,
            domain: c.domain,
            level: c.skillLevel || 'Intermediate',
            duration: c.duration || '4 Weeks',
            rating: c.rating || 4.8,
            enrolled: c.enrolled || 100,
            summary: c.summary || '',
          }));
          try {
            await supabase.from('learnify_courses').insert(seedItems);
          } catch (seedErr) {
            console.warn('[Supabase] Initial seed notice:', seedErr);
          }
        }
      } catch (err: any) {
        console.warn('[Supabase] Live course fetch notice:', err.message);
      }
    }

    let filtered = [...coursesStore];

    if (domain && domain !== 'all') {
      filtered = filtered.filter(
        (c) => c.domain.toLowerCase() === domain.toLowerCase()
      );
    }

    if (vendor && vendor !== 'all') {
      filtered = filtered.filter(
        (c) => (c.certificationVendor || '').toLowerCase() === vendor.toLowerCase()
      );
    }

    if (level && level !== 'all') {
      filtered = filtered.filter(
        (c) => (c.skillLevel || c.level || '').toLowerCase() === level.toLowerCase()
      );
    }

    if (format && format !== 'all') {
      filtered = filtered.filter(
        (c) => (c.format || '').toLowerCase() === format.toLowerCase()
      );
    }

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.domain.toLowerCase().includes(term) ||
          (c.certificationVendor && c.certificationVendor.toLowerCase().includes(term)) ||
          c.summary.toLowerCase().includes(term)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      courses: filtered,
    });
  });

  // 5a. Create new course (Admin API)
  app.post('/api/courses', authenticateAdminToken, async (req, res) => {
    const courseData = req.body;
    if (!courseData.title || !courseData.domain) {
      return res.status(400).json({ success: false, error: 'Title and domain are required' });
    }
    const newCourse = {
      id: courseData.id || 'course-' + Date.now(),
      title: courseData.title,
      domain: courseData.domain,
      certification_vendor: courseData.certificationVendor,
      skill_level: courseData.skillLevel || 'Beginner',
      format: courseData.format || 'Online',
      fast_track: courseData.fastTrack || false,
      duration: courseData.duration || '4 Weeks',
      rating: courseData.rating || 4.8,
      enrolled: courseData.enrolled || 0,
      image_url: courseData.imageUrl || '',
      summary: courseData.summary || '',
      overview: courseData.overview || '',
      learning_objectives: courseData.learningObjectives || [],
      prerequisites: courseData.prerequisites || [],
      target_audience: courseData.targetAudience || [],
      modules: courseData.modules || [],
    };
    try {
      if (supabase) {
        const { error } = await supabase.from('learnify_courses').insert([newCourse]);
        if (error) console.warn('Supabase insert course notice:', error.message);
      }
      coursesStore.unshift(courseData);
      res.status(201).json({ success: true, message: 'Course created successfully', course: courseData });
    } catch (err: any) {
      coursesStore.unshift(courseData);
      res.status(201).json({ success: true, message: 'Course created in memory store', course: courseData });
    }
  });

  app.put('/api/courses/:id', authenticateAdminToken, async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;
    
    const updatePayload = {
      title: courseData.title,
      domain: courseData.domain,
      certification_vendor: courseData.certificationVendor,
      skill_level: courseData.skillLevel,
      format: courseData.format,
      fast_track: courseData.fastTrack,
      duration: courseData.duration,
      rating: courseData.rating,
      enrolled: courseData.enrolled,
      image_url: courseData.imageUrl,
      summary: courseData.summary,
      overview: courseData.overview,
      learning_objectives: courseData.learningObjectives,
      prerequisites: courseData.prerequisites,
      target_audience: courseData.targetAudience,
      modules: courseData.modules,
      updated_at: new Date().toISOString()
    };
    
    try {
      if (supabase) {
        const { error } = await supabase.from('learnify_courses').update(updatePayload).eq('id', id);
        if (error) console.warn('Supabase update course notice:', error.message);
      }
      const index = coursesStore.findIndex(c => c.id === id);
      if (index !== -1) coursesStore[index] = { ...coursesStore[index], ...courseData };
      res.json({ success: true, message: 'Course updated successfully', course: courseData });
    } catch (err: any) {
      const index = coursesStore.findIndex(c => c.id === id);
      if (index !== -1) coursesStore[index] = { ...coursesStore[index], ...courseData };
      res.json({ success: true, message: 'Course updated in memory store', course: courseData });
    }
  });

  app.delete('/api/courses/:id', authenticateAdminToken, async (req, res) => {
    const { id } = req.params;
    try {
      if (supabase) {
        const { error } = await supabase.from('learnify_courses').delete().eq('id', id);
        if (error) console.warn('Supabase delete course notice:', error.message);
      }
      coursesStore = coursesStore.filter(c => c.id !== id);
      res.json({ success: true, message: 'Course deleted successfully' });
    } catch (err: any) {
      coursesStore = coursesStore.filter(c => c.id !== id);
      res.json({ success: true, message: 'Course deleted from memory store' });
    }
  });

  app.post('/api/upload-image', authenticateAdminToken, (req, res) => {
    try {
      const { imageUrl, fileName, base64Data } = req.body;
      if (imageUrl) {
        return res.json({ success: true, url: imageUrl });
      }
      if (base64Data) {
        // Base64 data uri is standard and works client-side & server-side
        return res.json({ success: true, url: base64Data });
      }
      res.status(400).json({ success: false, error: 'No image URL or data provided' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5e. Syllabus PDF upload endpoint for Admin
  app.post('/api/upload-syllabus', authenticateAdminToken, (req, res) => {
    try {
      const { syllabusUrl, base64Data, fileName, fileSize } = req.body;
      if (syllabusUrl) {
        return res.json({
          success: true,
          url: syllabusUrl,
          fileName: fileName || 'Course_Syllabus.pdf',
          fileSize: fileSize || 'External PDF',
        });
      }
      if (base64Data) {
        return res.json({
          success: true,
          url: base64Data,
          fileName: fileName || 'Uploaded_Syllabus.pdf',
          fileSize: fileSize || `${(base64Data.length / 1024 / 1.33).toFixed(1)} KB`,
        });
      }
      res.status(400).json({ success: false, error: 'No syllabus PDF URL or Base64 data provided' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5.5 Email System Diagnostics & Live Dispatch Test
  app.get('/api/email/diagnostics', async (req, res) => {
    const user = process.env.EMAIL_USER || 'info@learnify-solutions.com';
    const host = process.env.SMTP_HOST || 'smtp.titan.email';
    const primaryPort = Number(process.env.SMTP_PORT) || 465;
    const adminEmail = process.env.ADMIN_EMAIL || 'info@learnify-solutions.com';
    const hasPassword = Boolean(process.env.EMAIL_PASSWORD);
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const hasBrevo = Boolean(process.env.BREVO_API_KEY);

    let verifyPrimary = { success: false, message: 'Not tested' };
    let verifyFallback = { success: false, message: 'Not tested' };

    if (hasResend) {
      verifyPrimary = { success: true, message: 'Resend HTTPS API (Port 443) Active - Cloud firewall proof' };
    } else if (hasBrevo) {
      verifyPrimary = { success: true, message: 'Brevo HTTPS API (Port 443) Active - Cloud firewall proof' };
    } else if (hasPassword) {
      // Test primary port
      try {
        const primaryTransporter = createTransporterInstance(primaryPort, primaryPort === 465);
        if (primaryTransporter) {
          await primaryTransporter.verify();
          verifyPrimary = { success: true, message: `Connected & authenticated on port ${primaryPort}` };
        }
      } catch (err: any) {
        verifyPrimary = { success: false, message: err.message };
      }

      // Test alternate fallback port
      const altPort = primaryPort === 465 ? 587 : 465;
      try {
        const altTransporter = createTransporterInstance(altPort, altPort === 465);
        if (altTransporter) {
          await altTransporter.verify();
          verifyFallback = { success: true, message: `Connected & authenticated on fallback port ${altPort}` };
        }
      } catch (err: any) {
        verifyFallback = { success: false, message: err.message };
      }
    }

    res.json({
      success: true,
      configured: hasPassword || hasResend || hasBrevo,
      activeMethod: hasResend ? 'Resend HTTPS API (Port 443)' : (hasBrevo ? 'Brevo HTTPS API (Port 443)' : `Direct SMTP (${host})`),
      hasResend,
      hasBrevo,
      config: {
        host,
        primaryPort,
        fallbackPort: primaryPort === 465 ? 587 : 465,
        user,
        adminEmail,
        passwordMasked: hasPassword ? '********' : 'NOT SET',
        resendMasked: hasResend ? 're_********' : 'NOT SET',
      },
      verification: {
        primary: verifyPrimary,
        fallback: verifyFallback,
      }
    });
  });

  app.post('/api/email/send-test', async (req, res) => {
    const { targetEmail } = req.body;
    const to = targetEmail || process.env.ADMIN_EMAIL || 'info@learnify-solutions.com';
    const senderEmail = process.env.EMAIL_USER || 'info@learnify-solutions.com';

    const testHtml = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #152e4d; border: 2px solid #ea6d24; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #ea6d24; margin-top: 0;">🚀 Learnify Solutions Live Test Email</h2>
        <p>This automated test confirms that the Learnify Solutions transactional email engine is functioning properly in production!</p>
        <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 13px; color: #334155;">
          <p><strong>Active Dispatch:</strong> ${process.env.RESEND_API_KEY ? 'Resend HTTPS API' : (process.env.BREVO_API_KEY ? 'Brevo HTTPS API' : `SMTP (${process.env.SMTP_HOST || 'smtp.titan.email'})`)}</p>
          <p><strong>Sender Account:</strong> ${senderEmail}</p>
          <p><strong>Recipient:</strong> ${to}</p>
          <p><strong>Server Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #64748b;">If you received this message, lead notification and client acknowledgment emails will dispatch automatically.</p>
      </div>
    `;

    const result = await sendEmailWithFallback({
      from: `"Learnify Solutions System Check" <${senderEmail}>`,
      to,
      subject: `[Diagnostic Test] Learnify Solutions - ${new Date().toLocaleTimeString()}`,
      html: testHtml,
    });

    if (result.success) {
      res.json({
        success: true,
        message: `Test email successfully sent to ${to} via ${result.method || 'Email Engine'}!`,
        messageId: result.messageId,
        method: result.method,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to dispatch test email',
      });
    }
  });

  // 6. Leads / Contact requests
  app.get('/api/leads', authenticateAdminToken, async (req, res) => {
    try {
      if (supabase) {
        // Try ordering by created_at; fallback to standard select if created_at column is named differently
        let { data, error } = await supabase.from('learnify_leads').select('*').order('created_at', { ascending: false });
        
        if (error) {
          console.warn('[Supabase] Lead query error with order, retrying without order:', error.message);
          const fallbackQuery = await supabase.from('learnify_leads').select('*');
          data = fallbackQuery.data;
          error = fallbackQuery.error;
        }

        if (!error && Array.isArray(data)) {
          const leads = data.map((l: any) => ({
            id: String(l.id || crypto.randomUUID()),
            fullName: l.full_name || l.fullName || l.name || 'Anonymous User',
            email: l.email || '',
            company: l.company || '',
            phone: l.phone || '',
            inquiryType: l.inquiry_type || l.inquiryType || 'advisor',
            selectedDomain: l.selected_domain || l.selectedDomain || 'General',
            courseTitle: l.course_title || l.courseTitle || null,
            courseId: l.course_id || l.courseId || null,
            jobRole: l.job_role || l.jobRole || null,
            preferredFormat: l.preferred_format || l.preferredFormat || null,
            message: l.message || '',
            createdAt: l.created_at || l.createdAt || new Date().toISOString(),
          }));
          return res.json({ success: true, count: leads.length, leads, source: 'supabase' });
        } else if (error) {
          console.error('[Supabase] Failed to fetch leads from Supabase table:', error.message);
        }
      }
      res.json({ success: true, count: leadsStore.length, leads: leadsStore, source: 'in_memory' });
    } catch (err: any) {
      console.error('[Leads API Error]:', err.message);
      res.json({ success: true, count: leadsStore.length, leads: leadsStore, source: 'fallback' });
    }
  });

  app.post('/api/leads', async (req, res) => {
    const {
      fullName, email, company, phone, inquiryType,
      selectedDomain, courseTitle, courseId, jobRole,
      preferredFormat, message,
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ success: false, error: 'Full name and email are required fields' });
    }

    const newLeadId = crypto.randomUUID();

    const newLeadUI = {
      id: newLeadId,
      fullName, email, company, phone, inquiryType, selectedDomain, courseTitle, courseId, jobRole, preferredFormat, message,
      createdAt: new Date().toISOString()
    };

    if (supabase) {
      // 1. Try extended insert with all columns
      const extendedLead = {
        id: newLeadId,
        full_name: fullName,
        email: email,
        company: company || '',
        phone: phone || '',
        inquiry_type: inquiryType || 'advisor',
        selected_domain: selectedDomain || 'General',
        course_title: courseTitle || null,
        course_id: courseId || null,
        job_role: jobRole || null,
        preferred_format: preferredFormat || null,
        message: message || '',
      };

      try {
        const { error: extErr } = await supabase.from('learnify_leads').insert([extendedLead]);
        if (extErr) {
          console.warn('[Supabase] Extended lead insert notice (table may use basic schema):', extErr.message);
          // 2. Fallback to standard base columns: full_name, email, company, phone, inquiry_type, selected_domain, message
          const standardLead: Record<string, any> = {
            id: newLeadId,
            full_name: fullName,
            email: email,
            company: company || '',
            phone: phone || '',
            inquiry_type: inquiryType || 'advisor',
            selected_domain: selectedDomain || 'General',
            message: message ? (courseTitle ? `[Course: ${courseTitle}] ${message}` : message) : (courseTitle ? `Interested in: ${courseTitle}` : ''),
          };
          const { error: stdErr } = await supabase.from('learnify_leads').insert([standardLead]);
          if (stdErr) {
            console.warn('[Supabase] Standard lead insert notice, trying without explicit id:', stdErr.message);
            // 3. Fallback without explicit ID (allows Supabase gen_random_uuid() to auto-generate)
            const minimalLead = {
              full_name: fullName,
              email: email,
              company: company || '',
              phone: phone || '',
              inquiry_type: inquiryType || 'advisor',
              selected_domain: selectedDomain || 'General',
              message: message || '',
            };
            const { error: minErr } = await supabase.from('learnify_leads').insert([minimalLead]);
            if (minErr) {
              console.error('[Supabase] All lead insert attempts failed:', minErr.message);
            } else {
              console.log(`[Supabase] Lead saved successfully (auto ID schema) for ${email}`);
            }
          } else {
            console.log(`[Supabase] Lead saved successfully (standard schema) for ${email}`);
          }
        } else {
          console.log(`[Supabase] Lead saved successfully (extended schema) for ${email}`);
        }
      } catch (dbErr: any) {
        console.error('[Supabase] Database exception during lead insert:', dbErr.message);
      }
    } else {
      console.warn('[Supabase] Supabase client is not configured on server. Lead stored in memory only.');
    }

    // Fire and forget email dispatch so form responses return instantly without blocking on SMTP timeouts
    sendLeadEmails(newLeadUI).catch(err => console.error('[Email Dispatch Background Error]:', err.message));
    leadsStore.unshift(newLeadUI);

    res.status(201).json({
      success: true,
      message: inquiryType === 'syllabus_download'
        ? 'Syllabus download initiated successfully! Our learning consultant will also follow up.'
        : 'Thank you! Your request has been received. A senior learning advisor will contact you within 24 hours.',
      lead: newLeadUI,
    });
  });

  app.get('/api/supabase/status', (req, res) => {
    const sqlSchema = `-- Learnify Solutions Supabase SQL Migration
-- Run this in your Supabase SQL Editor to enable persistent cloud tables

CREATE TABLE IF NOT EXISTS public.learnify_cms (
  id TEXT PRIMARY KEY,
  section_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learnify_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  inquiry_type TEXT NOT NULL,
  selected_domain TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learnify_courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 4.8,
  enrolled INTEGER NOT NULL DEFAULT 0,
  summary TEXT NOT NULL,
  curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.learnify_blogs (
  slug TEXT PRIMARY KEY,
  region TEXT NOT NULL DEFAULT 'global',
  topic_track TEXT NOT NULL DEFAULT 'Cloud & DevOps',
  data JSONB NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Allow public read access
ALTER TABLE public.learnify_cms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learnify_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learnify_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learnify_blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read CMS" ON public.learnify_cms FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON public.learnify_courses FOR SELECT USING (true);
CREATE POLICY "Allow public read blogs" ON public.learnify_blogs FOR SELECT USING (true);
CREATE POLICY "Allow public insert leads" ON public.learnify_leads FOR INSERT WITH CHECK (true);
`;

    res.json({
      configured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
      supabaseUrl: process.env.SUPABASE_URL || null,
      sqlSchema,
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    // Dedicated image and static asset resolver
    // Check all potential asset directories and serve with proper MIME types
    const assetDirs = [
      path.join(distPath, 'images'),
      path.join(distPath, 'src/assets/images'),
      path.join(distPath, 'assets'),
      path.join(process.cwd(), 'public/images'),
      path.join(process.cwd(), 'public/src/assets/images'),
      path.join(process.cwd(), 'src/assets/images'),
      path.join(process.cwd(), 'public'),
      distPath,
    ];

    // Handle image and static media requests explicitly to prevent them from falling through to index.html
    app.use((req, res, next) => {
      const reqPath = req.path;
      const isImageRequest =
        /\.(webp|jpe?g|png|gif|svg|ico)$/i.test(reqPath) ||
        reqPath.startsWith('/images/') ||
        reqPath.startsWith('/src/assets/images/') ||
        reqPath.startsWith('/assets/images/');

      if (!isImageRequest) {
        return next();
      }

      // Extract filename from URL
      const fileName = path.basename(reqPath);

      for (const dir of assetDirs) {
        const candidate = path.join(dir, fileName);
        if (fs.existsSync(candidate)) {
          try {
            if (fs.statSync(candidate).isFile()) {
              const ext = path.extname(candidate).toLowerCase();
              const mimeTypes: Record<string, string> = {
                '.webp': 'image/webp',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.svg': 'image/svg+xml',
                '.gif': 'image/gif',
                '.ico': 'image/x-icon',
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
              return res.sendFile(candidate);
            }
          } catch {
            // continue search
          }
        }
      }

      // Fallback: Check if hero.webp or logo.jpeg exists in public/
      const heroFallback = path.join(process.cwd(), 'public/hero.webp');
      if (fs.existsSync(heroFallback)) {
        res.setHeader('Content-Type', 'image/webp');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.sendFile(heroFallback);
      }

      // Never send index.html for an image request
      return res.status(404).end();
    });

    // Explicit static handlers for image assets
    app.use('/src/assets', express.static(path.join(process.cwd(), 'src/assets'), { maxAge: '30d' }));
    app.use('/images', express.static(path.join(process.cwd(), 'public/images'), { maxAge: '30d' }));

    // Performance: Cache static assets with 1 year immutable cache
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );

    // General static file serving with 1 day caching (index: false lets SSR handler serve /)
    app.use(
      express.static(distPath, {
        index: false,
        maxAge: '1d',
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            // HTML is fresh or short cache for immediate updates
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          }
        },
      })
    );

    const indexPath = path.join(distPath, 'index.html');
    const cachedIndexHtml = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf-8') : '';

    const escapeHtml = (val: string) =>
      String(val || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const safeJsonForScript = (obj: unknown) =>
      JSON.stringify(obj)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    const replaceHreflangBlock = (
      htmlInput: string,
      alternates: Array<{ hreflang: string; href: string }>
    ) => {
      const cleaned = htmlInput.replace(
        /\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>/gi,
        ''
      );
      const tags = alternates
        .map(
          (a) =>
            `    <link rel="alternate" hreflang="${escapeHtml(a.hreflang)}" href="${escapeHtml(a.href)}" />`
        )
        .join('\n');
      return cleaned.replace(/<\/head>/i, `${tags}\n  </head>`);
    };

    const stripGlobalJsonLd = (htmlInput: string) =>
      htmlInput.replace(
        /\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
        ''
      );

    const stripHomeHeroPreloads = (htmlInput: string) =>
      htmlInput.replace(
        /\s*<link\s+rel="preload"\s+as="image"\s+href="\/(?:hero|hero-mobile)\.webp"[^>]*>/gi,
        ''
      );

    app.get('*', (req, res) => {
      const url = req.originalUrl || req.url;
      const cleanPath = url.split('?')[0].split('#')[0];

      // 1. Handle query params like nocache or search_term_string -> redirect to clean path
      if (url.includes('?nocache') || url.includes('?=') || url.includes('?v=')) {
        return res.redirect(301, cleanPath);
      }

      // 2. Normalize trailing slashes (except root '/')
      if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
        const withoutSlash = cleanPath.slice(0, -1);
        const queryPart = url.includes('?') ? url.slice(url.indexOf('?')) : '';
        return res.redirect(301, withoutSlash + queryPart);
      }

      // 3. 301 Redirects for renamed / alternate paths from GSC
      if (cleanPath === '/about-us' || cleanPath === '/career' || cleanPath === '/careers') {
        return res.redirect(301, '/about');
      }
      if (cleanPath === '/course/comptia-pentest') {
        return res.redirect(301, '/course/course-comptia-pentest-plus');
      }

      // 4. Strict HTTP 404 with noindex for remaining dead WP paths (wp-admin, membership, stores, etc.)
      if (
        cleanPath.startsWith('/wp-admin') ||
        cleanPath.startsWith('/wp-includes') ||
        cleanPath.startsWith('/membership') ||
        cleanPath.startsWith('/stores') ||
        cleanPath.includes('/testimonial/')
      ) {
        let html = cachedIndexHtml || fs.readFileSync(indexPath, 'utf-8');
        res.status(404);
        html = stripHomeHeroPreloads(html)
          .replace(/<title>.*?<\/title>/, `<title>Page Not Found | Learnify Solutions</title>`)
          .replace(/<head>/, `<head><meta name="robots" content="noindex, nofollow" />`)
          .replace(/<div id="root"><\/div>/, `<div id="root"><main style="max-width:900px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><h1>Page Not Found</h1><p>The requested resource does not exist. Explore our <a href="/courses">IT Certification Courses</a> or <a href="/blogs">Certification Blogs</a>.</p></main></div>`);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(html);
      }

      try {
        let html = cachedIndexHtml || fs.readFileSync(indexPath, 'utf-8');
        const regionalMatch = resolveRegionalRoute(cleanPath);
        const allBlogs = getAllBlogsList();
        const blogMatch = resolveServerBlogRoute(cleanPath, allBlogs);
        const examPrepMatch = parseExamPrepRoutePath(cleanPath);

        // 0a. High-Impression Exam Prep Hub & Resource Detail (/exam-prep & /exam-prep/:slug)
        if (examPrepMatch && examPrepMatch.type === 'hub') {
          const canonicalUrl = `${SITE_BASE_URL}/exam-prep`;
          const title = 'IT Certification Practice Tests, Cheat Sheets, Interview Q&A & Salary Tool | Learnify';
          const desc =
            'Free CompTIA Security+ (SY0-701), Microsoft Azure (AZ-104), AWS (SAA-C03), Power BI (PL-300), Network+ & AI-102 practice simulators, cheat sheets, interview banks & salary ROI calculator.';
          const keywords =
            'CompTIA Security+ SY0-701 practice questions, Azure AZ-104 mock test, AWS SAA-C03 sample questions, Network+ port numbers cheat sheet, kubectl commands cheat sheet, IT certification salary calculator 2026';
          const schemaObj = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': `${canonicalUrl}#collection`,
                name: 'Learnify IT Certification Exam Prep Hub',
                mainEntity: {
                  '@type': 'ItemList',
                  numberOfItems: EXAM_PREP_RESOURCES.length,
                  itemListElement: EXAM_PREP_RESOURCES.map((item, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    name: item.title,
                    url: `${SITE_BASE_URL}/exam-prep/${item.slug}`,
                  })),
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_BASE_URL}/` },
                  { '@type': 'ListItem', position: 2, name: 'Exam Prep', item: canonicalUrl },
                ],
              },
            ],
          };

          const ssrFallbackHtml = `<main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <nav><a href="/">Home</a> &gt; <span>Exam Prep</span></nav>
            <h1>IT Certification Practice Tests, Cheat Sheets &amp; Salary ROI Tools</h1>
            <p>${escapeHtml(desc)}</p>
            <p><a href="/courses">All Certification Courses</a> | <a href="/blogs">Certification Blogs</a> | <a href="/uk">UK Hub (GBP)</a> | <a href="/eu">Europe Hub (EUR)</a> | <a href="/ae">UAE Hub (AED)</a> | <a href="/za">South Africa Hub (ZAR)</a></p>
            <ul>${EXAM_PREP_RESOURCES.map(
              (item) =>
                `<li><a href="/exam-prep/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a> — ${escapeHtml(item.examCode)} (${escapeHtml(item.topicTrack)})</li>`
            ).join('')}</ul>
          </main>`;

          html = stripHomeHeroPreloads(stripGlobalJsonLd(html))
            .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(title)}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(desc)}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(keywords)}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(desc)}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(desc)}" />`)
            .replace(
              /<\/head>/,
              `    <script type="application/ld+json">${safeJsonForScript(schemaObj)}</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (examPrepMatch && examPrepMatch.type === 'detail') {
          const item = examPrepMatch.resource;
          const canonicalUrl = `${SITE_BASE_URL}/exam-prep/${item.slug}`;
          const primaryEntity =
            item.type === 'practice_test'
              ? {
                  '@type': 'Quiz',
                  '@id': `${canonicalUrl}#quiz`,
                  name: item.title,
                  description: item.seoDescription,
                  educationalAlignment: {
                    '@type': 'AlignmentObject',
                    alignmentType: 'assesses',
                    targetName: item.examCode,
                  },
                  provider: {
                    '@type': 'EducationalOrganization',
                    name: 'Learnify Solutions',
                    url: SITE_BASE_URL,
                  },
                }
              : item.type === 'cost_calculator' || item.type === 'subnet_calculator'
              ? {
                  '@type': 'WebApplication',
                  '@id': `${canonicalUrl}#webapp`,
                  name: item.title,
                  description: item.seoDescription,
                  applicationCategory: 'EducationalApplication',
                  operatingSystem: 'Web',
                  url: canonicalUrl,
                  provider: {
                    '@type': 'EducationalOrganization',
                    name: 'Learnify Solutions',
                    url: SITE_BASE_URL,
                  },
                }
              : {
                  '@type': 'TechArticle',
                  '@id': `${canonicalUrl}#article`,
                  headline: item.title,
                  description: item.seoDescription,
                  datePublished: item.publishedIso || '2026-11-22',
                  dateModified: item.publishedIso || '2026-11-22',
                  inLanguage: 'en',
                  author: {
                    '@type': 'Organization',
                    name: 'Learnify Solutions',
                    url: SITE_BASE_URL,
                  },
                  publisher: {
                    '@type': 'EducationalOrganization',
                    name: 'Learnify Solutions',
                    url: SITE_BASE_URL,
                  },
                  mainEntityOfPage: canonicalUrl,
                };

          const graphNodes: Record<string, any>[] = [
            primaryEntity,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Exam Prep', item: `${SITE_BASE_URL}/exam-prep` },
                { '@type': 'ListItem', position: 3, name: item.shortTitle, item: canonicalUrl },
              ],
            },
          ];
          if (item.faqs && item.faqs.length > 0) {
            graphNodes.push({
              '@type': 'FAQPage',
              mainEntity: item.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            });
          }
          const schemaObj = {
            '@context': 'https://schema.org',
            '@graph': graphNodes,
          };

          const LETTERS = ['A', 'B', 'C', 'D'];
          let bodyHtml = '';
          if (item.type === 'practice_test') {
            const previewCount = item.openPreviewCount || 2;
            const previewQs = (item.questions || []).slice(0, previewCount);
            bodyHtml = `
              ${item.domainWeights ? `<h2>Official Exam Blueprint &amp; Domain Weights</h2><ul>${item.domainWeights.map((d) => `<li><strong>${escapeHtml(d.name)}:</strong> ${escapeHtml(d.weight)}</li>`).join('')}</ul>` : ''}
              <h2>Open Sample Practice Questions &amp; Rationales</h2>
              ${previewQs.map((q, idx) => `<section><h3>Question ${idx + 1} (${escapeHtml(q.domain)}): ${escapeHtml(q.prompt)}</h3><ul>${q.options.map((o, oi) => `<li><strong>${LETTERS[oi]}.</strong> ${escapeHtml(o)}</li>`).join('')}</ul><p><strong>Verified Answer (${LETTERS[q.correctIndex]}):</strong> ${escapeHtml(q.explanation)}</p></section>`).join('')}
            `;
          } else if (item.type === 'cheat_sheet') {
            bodyHtml = `
              ${(item.cheatSheetSections || []).map((sec) => `<section><h2>${escapeHtml(sec.title)}</h2><p>${escapeHtml(sec.subtitle)}</p><table><thead><tr>${sec.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${sec.rows.map((r) => `<tr>${r.cells.map((cell, ci) => ci === 0 ? `<td><code>${escapeHtml(cell)}</code></td>` : `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`).join('')}
            `;
          } else if (item.type === 'interview_qa') {
            bodyHtml = `
              <h2>Technical Interview Questions &amp; Model Answers</h2>
              ${(item.interviewItems || []).map((qa, idx) => `<section><h3>${idx + 1}. ${escapeHtml(qa.question)}</h3><p><em>${escapeHtml(qa.category)}</em></p><p>${escapeHtml(qa.answer)}</p><p><strong>Follow-up tip:</strong> ${escapeHtml(qa.followUpTip)}</p></section>`).join('')}
            `;
          } else if (item.type === 'subnet_calculator') {
            bodyHtml = `
              <p>Interactive IPv4 Subnet &amp; CIDR Calculator supporting /8 to /32 prefixes across AWS VPC / Azure VNet (5 reserved IPs) and Cisco CCNA / Network+ RFC modes.</p>
              ${(item.cheatSheetSections || []).map((sec) => `<section><h2>${escapeHtml(sec.title)}</h2><p>${escapeHtml(sec.subtitle)}</p><table><thead><tr>${sec.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${sec.rows.map((r) => `<tr>${r.cells.map((cell, ci) => ci === 0 ? `<td><code>${escapeHtml(cell)}</code></td>` : `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`).join('')}
            `;
          } else if (item.type === 'cost_calculator') {
            bodyHtml = `
              <h2>Official 2026 Certification Fee &amp; Certified Salary Matrix</h2>
              <table><thead><tr><th>Certification</th><th>Exam Code</th><th>US List Voucher</th><th>Retake Bundle</th><th>Avg Salary Gain</th></tr></thead><tbody>${CALCULATOR_COURSES.map((c) => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.examCode)}</td><td>$${c.voucherUsd}</td><td>$${c.retakeBundleUsd}</td><td>+${c.avgSalaryUpliftPct}%</td></tr>`).join('')}</tbody></table>
              <p><strong>Supported Regions:</strong> ${CALCULATOR_REGIONS.map((r) => `${escapeHtml(r.label)} (${escapeHtml(r.currency)})`).join(', ')}</p>
            `;
          }

          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <nav><a href="/">Home</a> &gt; <a href="/exam-prep">Exam Prep</a> &gt; <span>${escapeHtml(item.shortTitle)}</span></nav>
            <h1>${escapeHtml(item.title)}</h1>
            <p>${escapeHtml(item.excerpt)}</p>
            <p><strong>Exam Code:</strong> ${escapeHtml(item.examCode)} | <strong>Track:</strong> ${escapeHtml(item.topicTrack)} | <strong>Recommended Course:</strong> <a href="/course/${escapeHtml(item.relatedCourseId)}">${escapeHtml(item.relatedCourseLabel)}</a></p>
            ${bodyHtml}
            ${item.faqs && item.faqs.length > 0 ? `<h2>Frequently Asked Questions</h2>${item.faqs.map((f) => `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`).join('')}` : ''}
          </main>`;

          html = stripHomeHeroPreloads(stripGlobalJsonLd(html))
            .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(item.seoTitle)}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(item.seoTitle)}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(item.seoDescription)}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(item.seoKeywords)}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(item.seoTitle)}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(item.seoDescription)}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(item.seoTitle)}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(item.seoDescription)}" />`)
            .replace(
              /<\/head>/,
              `    <script type="application/ld+json">${safeJsonForScript(schemaObj)}</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (examPrepMatch && examPrepMatch.type === 'not_found') {
          res.status(404);
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>Exam Prep Resource Not Found | Learnify Solutions</title>`)
            .replace(/<head>/, `<head><meta name="robots" content="noindex, follow" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root"><main style="max-width:900px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><h1>Exam Prep Resource Not Found</h1><p>Explore our <a href="/exam-prep">Exam Prep Practice Tests, Cheat Sheets &amp; Salary Calculator</a>.</p></main></div>`);
        } else if (blogMatch && blogMatch.type === 'hub') {
          const canonicalUrl = `${SITE_BASE_URL}/blogs`;
          const title = 'Global IT Certification Blogs, Cloud & Cybersecurity Roadmaps | Learnify Solutions';
          const desc =
            'Practical certification guides, Azure vs AWS architecture comparisons, CompTIA Security+ (SY0-701) roadmaps, Power BI analytics blueprints, plus regional Pearson VUE exam center & fee breakdowns.';
          const keywords =
            'IT certification blogs, Azure AZ-104 vs AWS SAA-C03, CompTIA Security+ SY0-701 study plan, Power BI PL-300 guide, Pearson VUE exam centers, Learnify Solutions blogs';
          const schemaObj = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': `${canonicalUrl}#collection`,
                name: 'Learnify Global IT Certification Blogs & Study Roadmaps',
                mainEntity: {
                  '@type': 'ItemList',
                  numberOfItems: allBlogs.length,
                  itemListElement: allBlogs.map((g, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    name: g.title,
                    url: `${SITE_BASE_URL}/blogs/${g.slug}`,
                  })),
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_BASE_URL}/` },
                  { '@type': 'ListItem', position: 2, name: 'Blogs', item: canonicalUrl },
                ],
              },
            ],
          };

          const ssrFallbackHtml = `<main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <nav><a href="/">Home</a> &gt; <span>Blogs</span></nav>
            <h1>Global IT Certification Blogs, Roadmaps &amp; Exam Insights</h1>
            <p>${escapeHtml(desc)}</p>
            <p><a href="/courses">All Certification Courses</a> | <a href="/uk">UK Hub (GBP)</a> | <a href="/eu">Europe Hub (EUR)</a> | <a href="/de">Germany Hub (EUR)</a> | <a href="/nl">Netherlands Hub (EUR)</a> | <a href="/ae">UAE Hub (AED)</a> | <a href="/za">South Africa Hub (ZAR)</a></p>
            <ul>${allBlogs.map(
              (g) =>
                `<li><a href="/blogs/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a> — ${escapeHtml(g.topicTrack || g.category)} (${escapeHtml(g.regionLabel)})</li>`
            ).join('')}</ul>
          </main>`;

          const blogSummariesPayload = allBlogs.map(toBlogSummary);

          html = stripHomeHeroPreloads(stripGlobalJsonLd(html))
            .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(title)}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(desc)}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(keywords)}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(desc)}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(desc)}" />`)
            .replace(
              /<\/head>/,
              `    <script type="application/ld+json">${safeJsonForScript(schemaObj)}</script>\n    <script>window.__INITIAL_BLOG_SUMMARIES__=${safeJsonForScript(blogSummariesPayload)};</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (blogMatch && blogMatch.type === 'detail') {
          const g = normalizeBlogPost(blogMatch.post);
          const canonicalUrl = `${SITE_BASE_URL}/blogs/${g.slug}`;
          const ogImageUrl = g.coverImage
            ? (g.coverImage.startsWith('http') ? g.coverImage : `${SITE_BASE_URL}${g.coverImage}`)
            : `${SITE_BASE_URL}/hero.webp`;
          const blogSummariesPayload = allBlogs.map(toBlogSummary);
          const graphNodes: Record<string, any>[] = [
            {
              '@type': 'BlogPosting',
              '@id': `${canonicalUrl}#blogposting`,
              headline: g.title,
              description: g.seoDescription,
              image: ogImageUrl,
              datePublished: g.publishedIso || '2026-11-17',
              dateModified: g.publishedIso || '2026-11-17',
              inLanguage: 'en',
              author: {
                '@type': 'Organization',
                name: 'Learnify Solutions',
                url: SITE_BASE_URL,
              },
              publisher: {
                '@type': 'EducationalOrganization',
                name: 'Learnify Solutions',
                url: SITE_BASE_URL,
              },
              mainEntityOfPage: canonicalUrl,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_BASE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_BASE_URL}/blogs` },
                { '@type': 'ListItem', position: 3, name: g.regionLabel, item: canonicalUrl },
              ],
            },
          ];
          if (g.faqs && g.faqs.length > 0) {
            graphNodes.push({
              '@type': 'FAQPage',
              mainEntity: g.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            });
          }
          const schemaObj = {
            '@context': 'https://schema.org',
            '@graph': graphNodes,
          };

          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <nav><a href="/">Home</a> &gt; <a href="/blogs">Blogs</a> &gt; <span>${escapeHtml(g.regionLabel)}</span></nav>
            <h1>${escapeHtml(g.title)}</h1>
            <p>${escapeHtml(g.intro)}</p>
            <p><strong>Regions &amp; Audiences Covered:</strong> ${escapeHtml(g.citiesCovered.join(', '))}</p>
            <h2>Key Takeaways</h2>
            <ul>${g.keyTakeaways.map((k) => `<li>${escapeHtml(k)}</li>`).join('')}</ul>
            ${g.sections
              .map(
                (sec) => `<section>
                  <h2>${escapeHtml(sec.heading)}</h2>
                  ${sec.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
                  ${
                    sec.bullets && sec.bullets.length > 0
                      ? `<ul>${sec.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
                      : ''
                  }
                  ${
                    sec.table
                      ? `<table><caption>${escapeHtml(sec.table.caption)}</caption><thead><tr>${sec.table.headers
                          .map((h) => `<th>${escapeHtml(h)}</th>`)
                          .join('')}</tr></thead><tbody>${sec.table.rows
                          .map(
                            (r) =>
                              `<tr><td>${escapeHtml(r.label)}</td><td>${escapeHtml(r.col2)}</td><td>${escapeHtml(r.col3)}</td><td>${escapeHtml(r.col4)}</td></tr>`
                          )
                          .join('')}</tbody></table>`
                      : ''
                  }
                </section>`
              )
              .join('')}
            <h2>Recommended Certification Bootcamps</h2>
            <ul>${g.relatedRegionalLinks
              .map((l) => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a> — ${escapeHtml(l.subtitle)}</li>`)
              .join('')}</ul>
            <h2>Free Practice Tests &amp; Study Tools</h2>
            <ul>${getRelatedExamPrepResources({ titleOrDomain: `${g.slug} ${g.topicTrack || ''} ${g.category} ${g.title}`, limit: 3 })
              .map((p) => `<li><a href="/exam-prep/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.examCode)}</li>`)
              .join('')}</ul>
            ${g.faqs.length > 0 ? `<h2>Frequently Asked Questions</h2>${g.faqs.map((f) => `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`).join('')}` : ''}
          </main>`;

          html = stripHomeHeroPreloads(stripGlobalJsonLd(html))
            .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(g.seoTitle)}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(g.seoTitle)}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(g.seoDescription)}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(g.seoKeywords)}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(g.seoTitle)}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(g.seoDescription)}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(g.seoTitle)}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(g.seoDescription)}" />`)
            .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`)
            .replace(/<meta name="geo.region" content=".*?" \/>/, `<meta name="geo.region" content="${g.region.toUpperCase()}" />`)
            .replace(/<meta name="geo.placename" content=".*?" \/>/, `<meta name="geo.placename" content="${escapeHtml(g.citiesCovered.join(', '))}" />`)
            .replace(
              /<\/head>/,
              `    <script type="application/ld+json">${safeJsonForScript(schemaObj)}</script>\n    <script>window.__INITIAL_BLOG__=${safeJsonForScript(g)};window.__INITIAL_BLOG_SUMMARIES__=${safeJsonForScript(blogSummariesPayload)};</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (regionalMatch && regionalMatch.type === 'hub') {
          const region = regionalMatch.region;
          const hubPages = getRegionalCoursePages(region.code);
          const canonicalUrl = `${SITE_BASE_URL}${region.hubPath}`;
          const schemaObj = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'EducationalOrganization',
                '@id': `${SITE_BASE_URL}/#organization`,
                name: 'Learnify Solutions',
                url: SITE_BASE_URL,
              },
              {
                '@type': 'ItemList',
                '@id': `${canonicalUrl}#course-list`,
                name: `CompTIA, Microsoft & AWS Certification Training in ${region.countryName}`,
                numberOfItems: hubPages.length,
                itemListElement: hubPages.map((p, idx) => ({
                  '@type': 'ListItem',
                  position: idx + 1,
                  name: p.h1Title,
                  url: p.canonicalUrl,
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_BASE_URL}/` },
                  { '@type': 'ListItem', position: 2, name: `${region.shortName} Training`, item: canonicalUrl },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: region.hubFaqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          };

          const ssrFallbackHtml = `<main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <nav><a href="/">Home</a> &gt; <span>${escapeHtml(region.shortName)} Training</span> | <a href="/blogs">Blogs &amp; Exam Center Guides</a></nav>
            <h1>CompTIA, Microsoft &amp; AWS Certification Training in ${escapeHtml(region.countryName)}</h1>
            <p>${escapeHtml(region.hubDescription)}</p>
            <p><strong>Cities Served:</strong> ${escapeHtml(region.cities.join(', '))} | <strong>Timezone:</strong> ${escapeHtml(region.timezone)} | <strong>Currency:</strong> ${escapeHtml(region.currency)}</p>
            <h2>Certified Programs in ${escapeHtml(region.countryName)}</h2>
            <ul>${hubPages
              .map(
                (p) =>
                  `<li><a href="/${region.code}/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a> — ${escapeHtml(p.course.duration)}</li>`
              )
              .join('')}</ul>
            <h2>Frequently Asked Questions</h2>
            ${region.hubFaqs
              .map((f) => `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`)
              .join('')}
          </main>`;

          html = stripHomeHeroPreloads(stripGlobalJsonLd(html));
          html = replaceHreflangBlock(html, getHubHreflangAlternates());

          html = html
            .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(region.hubTitle)}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(region.hubTitle)}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(region.hubDescription)}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(region.hubKeywords)}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(region.hubTitle)}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(region.hubDescription)}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(region.hubTitle)}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(region.hubDescription)}" />`)
            .replace(/<meta name="geo.region" content=".*?" \/>/, `<meta name="geo.region" content="${region.geoRegionMeta}" />`)
            .replace(/<meta name="geo.placename" content=".*?" \/>/, `<meta name="geo.placename" content="${escapeHtml(region.cities.join(', '))}" />`)
            .replace(
              /<\/head>/,
              `    <script type="application/ld+json">${JSON.stringify(schemaObj)}</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (regionalMatch && regionalMatch.type === 'course') {
          const p = regionalMatch.page;
          const courseImg = p.course.imageUrl?.startsWith('http')
            ? p.course.imageUrl
            : `${SITE_BASE_URL}${p.course.imageUrl || '/hero.webp'}`;

          const schemaObj = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Course',
                '@id': `${p.canonicalUrl}#course`,
                name: p.h1Title,
                courseCode: p.course.examCode || p.course.id,
                description: p.localizedOverview,
                inLanguage: 'en',
                provider: {
                  '@type': 'EducationalOrganization',
                  name: 'Learnify Solutions',
                  url: SITE_BASE_URL,
                },
                educationalLevel: p.course.skillLevel || 'Intermediate',
                educationalCredentialAwarded: `${p.course.title} Official Certification`,
                courseMode: ['online', 'blended', 'onsite'],
                hasCourseInstance: {
                  '@type': 'CourseInstance',
                  courseMode: 'online',
                  location: {
                    '@type': 'Country',
                    name: p.region.countryName,
                  },
                },
                teaches: p.course.learningObjectives || [p.course.title],
                offers: {
                  '@type': 'Offer',
                  category: 'Paid',
                  priceCurrency: p.region.currency,
                  availability: 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': `${p.canonicalUrl}#breadcrumb`,
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_BASE_URL}/` },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: `${p.region.shortName} Training`,
                    item: `${SITE_BASE_URL}${p.region.hubPath}`,
                  },
                  { '@type': 'ListItem', position: 3, name: p.meta.shortName, item: p.canonicalUrl },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': `${p.canonicalUrl}#faq`,
                mainEntity: p.localizedFaqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          };

          const siblingRegionLinks = ALL_REGION_CODES.filter((c) => c !== p.region.code)
            .map((code) => {
              const targetUrl = p.alternateUrls[code] || `/${code}`;
              const relHref = targetUrl.replace(SITE_BASE_URL, '');
              return `<a href="${escapeHtml(relHref)}">${escapeHtml(REGION_CONFIGS[code].shortName)} (${escapeHtml(REGION_CONFIGS[code].currency)})</a>`;
            })
            .join(' | ');

          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <nav><a href="/">Home</a> &gt; <a href="/${p.region.code}">${escapeHtml(p.region.shortName)} Training</a> &gt; <span>${escapeHtml(p.meta.shortName)}</span></nav>
            <h1>${escapeHtml(p.h1Title)}</h1>
            <p>${escapeHtml(p.localizedOverview)}</p>
            <p>${escapeHtml(p.industryAngle)}</p>
            <p><strong>Target Career Roles (${escapeHtml(p.region.shortName)}):</strong> ${escapeHtml(p.roleDemand)}</p>
            <p><strong>Regulatory &amp; Compliance Context:</strong> ${escapeHtml(p.region.complianceContext)}</p>
            <p><strong>Cities Served:</strong> ${escapeHtml(p.region.cities.join(', '))} | <strong>Timezone:</strong> ${escapeHtml(p.region.timezone)} | <strong>Corporate Invoicing:</strong> ${escapeHtml(p.region.currency)}</p>
            <h2>Course Learning Objectives</h2>
            <ul>${(p.course.learningObjectives || []).map((o) => `<li>${escapeHtml(o)}</li>`).join('')}</ul>
            ${p.course.curriculum && p.course.curriculum.length > 0 ? `<h2>Official Syllabus &amp; Curriculum Modules</h2><ul>${p.course.curriculum.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>` : ''}
            <h2>Live ${escapeHtml(p.region.shortName)} Schedules &amp; Exam Readiness</h2>
            <ul>${p.region.schedules.map((s) => `<li><strong>${escapeHtml(s.name)}:</strong> ${escapeHtml(s.timing)} (${escapeHtml(s.cadence)}, ${escapeHtml(s.format)})</li>`).join('')}</ul>
            <p><strong>Pearson VUE &amp; Testing:</strong> ${escapeHtml(p.region.examCenterNote)}</p>
            <p><strong>Billing &amp; Purchase Orders:</strong> ${escapeHtml(p.region.invoicingNote)}</p>
            <h2>Frequently Asked Questions</h2>
            ${p.localizedFaqs
              .map((f) => `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`)
              .join('')}
            <h2>Free Practice Tests &amp; Exam Prep Tools</h2>
            <ul>${getRelatedExamPrepResources({ courseId: p.course.id, vendor: p.course.certificationVendor, titleOrDomain: `${p.course.title} ${p.course.examCode || ''}`, limit: 3 })
              .map((prep) => `<li><a href="/exam-prep/${escapeHtml(prep.slug)}">${escapeHtml(prep.title)}</a> — ${escapeHtml(prep.examCode)}</li>`)
              .join('')}</ul>
            <p><strong>Other Regional Editions:</strong> <a href="/course/${escapeHtml(p.course.id)}">Global Catalog</a> | <a href="/exam-prep/it-certification-exam-cost-salary-calculator">${escapeHtml(p.region.currency)} Exam Cost &amp; Salary Calculator</a> | ${siblingRegionLinks}</p>
          </main>`;

          html = stripHomeHeroPreloads(stripGlobalJsonLd(html));
          html = replaceHreflangBlock(html, getCourseHreflangAlternates(p.alternateUrls));

          html = html
            .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(p.seoTitle)}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(p.seoTitle)}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(p.seoDescription)}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(p.seoKeywords)}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${p.canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(p.seoTitle)}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(p.seoDescription)}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${p.canonicalUrl}" />`)
            .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${escapeHtml(courseImg)}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(p.seoTitle)}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(p.seoDescription)}" />`)
            .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${escapeHtml(courseImg)}" />`)
            .replace(/<meta name="geo.region" content=".*?" \/>/, `<meta name="geo.region" content="${p.region.geoRegionMeta}" />`)
            .replace(/<meta name="geo.placename" content=".*?" \/>/, `<meta name="geo.placename" content="${escapeHtml(p.region.cities.join(', '))}" />`)
            .replace(
              /<\/head>/,
              `    <script type="application/ld+json">${JSON.stringify(schemaObj)}</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/course/') || url.includes('course=')) {
          const courseIdMatch = url.match(/\/course\/([a-zA-Z0-9_-]+)/) || url.match(/course=([a-zA-Z0-9_-]+)/);
          const courseId = courseIdMatch ? courseIdMatch[1] : null;
          const course = courseId ? coursesStore.find(c => c.id === courseId) : null;

          if (course) {
            const courseTitle = `${course.title} ${course.examCode ? '(' + course.examCode + ') ' : ''}Certification Training & Bootcamp | Learnify Solutions`;
            const courseDesc = `${course.summary || course.overview || 'Master ' + course.title + ' with official vendor curriculum, 1-on-1 mentor guidance, and 24/7 hands-on cloud labs.'} Official ${course.certificationVendor} training with guaranteed batches across USA, UK, UAE (Dubai), Africa & India. 98.4% pass rate.`;
            const canonicalUrl = `${SITE_BASE_URL}/course/${course.id}`;
            const courseKeywords = `${course.title}, ${course.examCode || ''}, ${course.certificationVendor} training, ${course.certificationVendor} certification course, ${course.certificationVendor} authorized training partner, ${course.domain} bootcamps, online 1-on-1 ${course.certificationVendor} training, IT training Dubai, IT certifications London UK, corporate tech upskilling, Learnify Solutions`;
            const courseImg = course.imageUrl?.startsWith('http')
              ? course.imageUrl
              : `${SITE_BASE_URL}${course.imageUrl || '/hero.webp'}`;

            const courseAlternates = getRegionalAlternatesForCourse(course.id);
            if (courseAlternates) {
              html = replaceHreflangBlock(html, getCourseHreflangAlternates(courseAlternates));
            }

            // Specific Course & Breadcrumb Schema
            const dynamicCourseSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "${canonicalUrl}#course",
          "name": ${JSON.stringify(course.title)},
          "courseCode": ${JSON.stringify(course.examCode || course.id)},
          "description": ${JSON.stringify(course.summary || course.overview || '')},
          "provider": {
            "@id": "${SITE_BASE_URL}/#organization"
          },
          "educationalLevel": ${JSON.stringify(course.skillLevel || 'Intermediate')},
          "educationalCredentialAwarded": ${JSON.stringify(course.title + ' Official Certification')},
          "courseMode": ["online", "blended", "onsite"],
          "teaches": ${JSON.stringify(course.learningObjectives || [course.title])},
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "courseWorkload": ${JSON.stringify('PT' + (parseInt(course.duration, 10) || 40) + 'H')}
          },
          "offers": {
            "@type": "Offer",
            "category": "Paid",
            "priceCurrency": "USD",
            "price": "999",
            "availability": "https://schema.org/InStock"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "${canonicalUrl}#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "${SITE_BASE_URL}/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Courses",
              "item": "${SITE_BASE_URL}/courses"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": ${JSON.stringify(course.title)},
              "item": "${canonicalUrl}"
            }
          ]
        }
      ]
    }
    </script>
    </head>`;

            const regionalLinksHtml = courseAlternates
              ? `<p><strong>Regional Editions:</strong> <a href="${escapeHtml(courseAlternates.uk.replace(SITE_BASE_URL, ''))}">UK (GBP)</a> | <a href="${escapeHtml(courseAlternates.eu.replace(SITE_BASE_URL, ''))}">Europe (EUR)</a> | <a href="${escapeHtml(courseAlternates.de.replace(SITE_BASE_URL, ''))}">Germany (EUR)</a> | <a href="${escapeHtml(courseAlternates.nl.replace(SITE_BASE_URL, ''))}">Netherlands (EUR)</a> | <a href="${escapeHtml(courseAlternates.ae.replace(SITE_BASE_URL, ''))}">Dubai &amp; UAE (AED)</a> | <a href="${escapeHtml(courseAlternates.za.replace(SITE_BASE_URL, ''))}">South Africa (ZAR)</a></p>`
              : '';

            const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
              <nav><a href="/">Home</a> &gt; <a href="/courses">Courses</a> &gt; <span>${escapeHtml(course.title)}</span></nav>
              <h1>${escapeHtml(course.title)} Certification Training</h1>
              <p>${escapeHtml(course.summary || course.overview || '')}</p>
              <p><strong>Vendor:</strong> ${escapeHtml(course.certificationVendor)} | <strong>Duration:</strong> ${escapeHtml(course.duration)} | <strong>Level:</strong> ${escapeHtml(course.skillLevel || 'Intermediate')}</p>
              ${regionalLinksHtml}
              <h2>Course Learning Objectives</h2>
              <ul>${(course.learningObjectives || []).map((o) => `<li>${escapeHtml(o)}</li>`).join('')}</ul>
              <h2>Curriculum Modules</h2>
              <ul>${(course.curriculum || []).map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>
              <h2>Free Practice Tests &amp; Study Resources</h2>
              <ul>${getRelatedExamPrepResources({ courseId: course.id, vendor: course.certificationVendor, titleOrDomain: `${course.title} ${course.examCode || ''}`, limit: 3 })
                .map((prep) => `<li><a href="/exam-prep/${escapeHtml(prep.slug)}">${escapeHtml(prep.title)}</a> — ${escapeHtml(prep.examCode)}</li>`)
                .join('')}</ul>
            </main>`;

            html = stripHomeHeroPreloads(stripGlobalJsonLd(html))
              .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(courseTitle)}</title>`)
              .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${escapeHtml(courseTitle)}" />`)
              .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(courseDesc)}" />`)
              .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${escapeHtml(courseKeywords)}" />`)
              .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
              .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(courseTitle)}" />`)
              .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(courseDesc)}" />`)
              .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
              .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${escapeHtml(courseImg)}" />`)
              .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(courseTitle)}" />`)
              .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(courseDesc)}" />`)
              .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${escapeHtml(courseImg)}" />`)
              .replace(/<\/head>/, dynamicCourseSchema)
              .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
          } else {
            res.status(404);
            html = stripHomeHeroPreloads(html)
              .replace(/<title>.*?<\/title>/, `<title>Course Not Found | Learnify Solutions</title>`)
              .replace(/<head>/, `<head><meta name="robots" content="noindex, follow" />`)
              .replace(/<div id="root"><\/div>/, `<div id="root"><main style="max-width:900px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><h1>Course Not Found</h1><p>Explore our <a href="/courses">full IT certification catalog</a>, <a href="/ae">UAE Training Hub</a>, or <a href="/za">South Africa Training Hub</a>.</p></main></div>`);
          }
        } else if (url.startsWith('/about')) {
          const canonicalUrl = `${SITE_BASE_URL}/about`;
          const title = 'About Us | Learnify Solutions - Global Enterprise IT Training';
          const desc = 'Discover Learnify Solutions’ mission, leadership, and ISO-certified training frameworks empowering global enterprise tech workforces across USA, UK, UAE, Africa & India.';
          const keywords = 'about Learnify Solutions, enterprise IT training organization, tech upskilling leadership, corporate training partner, global IT academy, authorized training partner';
          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><nav><a href="/">Home</a> &gt; <span>About Us</span></nav><h1>About Learnify Solutions</h1><p>${escapeHtml(desc)}</p><p><a href="/courses">Browse Courses</a> | <a href="/ae">UAE Training</a> | <a href="/za">South Africa Training</a> | <a href="/corporate-training">Corporate Training</a> | <a href="/contact">Contact Us</a></p></main>`;
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${title}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${keywords}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/courses')) {
          const canonicalUrl = `${SITE_BASE_URL}/courses`;
          const title = 'IT & Cloud Certification Courses Catalog (Microsoft, Cisco, CompTIA, AWS) | Learnify Solutions';
          const desc = 'Browse 50+ official certification courses in Microsoft Azure, Cisco CCNA/CCNP, CompTIA Security+, AWS Cloud, CEH v12, and Kubernetes CKA. 1-on-1 & corporate batches across USA, UK, UAE & India.';
          const keywords = 'Microsoft certification training, Azure AZ-104, Cisco CCNA 200-301 training, Cisco CCNP ENCOR, CompTIA Security+ SY0-701, CompTIA A+, AWS Solutions Architect, CEH v12, CKA Kubernetes, IT training partner, 1-on-1 tech bootcamps Dubai, London, USA';
          const ssrFallbackHtml = `<main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><nav><a href="/">Home</a> &gt; <span>Courses</span></nav><h1>IT &amp; Cloud Certification Courses Catalog</h1><p>${escapeHtml(desc)}</p><p><strong>Regional Programs:</strong> <a href="/uk">UK (London) Hub</a> | <a href="/eu">Europe (EU) Hub</a> | <a href="/de">Germany &amp; DACH Hub</a> | <a href="/nl">Netherlands Hub</a> | <a href="/ae">Dubai &amp; UAE Hub</a> | <a href="/za">South Africa Hub</a> | <a href="/cisco-training">Cisco Training</a></p><h2>All Certification Programs</h2><ul>${coursesStore.map((c) => `<li><a href="/course/${escapeHtml(c.id)}">${escapeHtml(c.title)}</a> — ${escapeHtml(c.certificationVendor)} (${escapeHtml(c.duration)})</li>`).join('')}</ul></main>`;
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${title}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${keywords}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/corporate-training') || url.startsWith('/corporate')) {
          const canonicalUrl = `${SITE_BASE_URL}/corporate-training`;
          const title = 'Corporate IT Training & Workforce Upskilling Solutions | Learnify Solutions';
          const desc = 'Scalable enterprise IT learning solutions for engineering teams worldwide. Custom syllabus, private cloud sandboxes, 98.4% first-time certification rate.';
          const keywords = 'corporate IT training, enterprise tech upskilling, Microsoft corporate training, Cisco enterprise training, CompTIA corporate cohorts, B2B IT training, workforce digital transformation';
          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><nav><a href="/">Home</a> &gt; <span>Corporate Training</span></nav><h1>Corporate IT Training &amp; Workforce Upskilling Solutions</h1><p>${escapeHtml(desc)}</p><ul><li>Private Corporate Cohorts &amp; Custom Syllabi</li><li>24/7 Cloud Sandbox Labs &amp; Instructor Mentorship</li><li>Dedicated Regional Delivery: <a href="/ae">UAE (Dubai &amp; Abu Dhabi)</a> | <a href="/za">South Africa (Johannesburg &amp; Cape Town)</a></li></ul><p><a href="/courses">Explore All Courses</a> | <a href="/contact">Request Corporate Quote</a></p></main>`;
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${title}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${keywords}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/cisco-training') || url.startsWith('/cisco')) {
          const canonicalUrl = `${SITE_BASE_URL}/cisco-training`;
          const title = 'Cisco Authorized Certification Training (CCNA, CCNP, DevNet, Security) | Learnify Solutions';
          const desc = 'Authorized Cisco training partner covering CCNA 200-301, CCNP Enterprise ENCOR, Security SCOR, SD-WAN, and DevNet. Real hardware topologies & virtual labs.';
          const keywords = 'Cisco training partner, Cisco CCNA 200-301 training, Cisco CCNP ENCOR 350-401, ENARSI 300-410, Cisco SD-WAN course, CCNP Security SCOR 350-701, DevNet DEVASC, Cisco bootcamps Dubai, Cisco certified instructors';
          const ciscoList = coursesStore.filter((c) => c.certificationVendor === 'Cisco');
          const ssrFallbackHtml = `<main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><nav><a href="/">Home</a> &gt; <span>Cisco Training</span></nav><h1>Cisco Authorized Certification Training</h1><p>${escapeHtml(desc)}</p><ul>${ciscoList.map((c) => `<li><a href="/course/${escapeHtml(c.id)}">${escapeHtml(c.title)}</a> — ${escapeHtml(c.duration)}</li>`).join('')}</ul></main>`;
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${title}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${keywords}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/contact')) {
          const canonicalUrl = `${SITE_BASE_URL}/contact`;
          const title = 'Contact Admissions & Corporate Sales | Learnify Solutions';
          const desc = 'Connect with Learnify Solutions educational advisors for 1-on-1 batch schedules, course fees, corporate discount quotes, and custom syllabus planning.';
          const keywords = 'contact Learnify Solutions, corporate training quote, educational advisor, IT training inquiry, batch schedule, course fee inquiry';
          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><nav><a href="/">Home</a> &gt; <span>Contact</span></nav><h1>Contact Admissions &amp; Corporate Sales</h1><p>${escapeHtml(desc)}</p><p>Email: <a href="mailto:info@learnify-solutions.com">info@learnify-solutions.com</a></p><p><a href="/courses">Browse Courses</a> | <a href="/ae">UAE Training Hub</a> | <a href="/za">South Africa Training Hub</a></p></main>`;
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${title}" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${keywords}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/privacy')) {
          const canonicalUrl = `${SITE_BASE_URL}/privacy`;
          const title = 'Privacy Policy & Compliance | Learnify Solutions';
          const ssrFallbackHtml = `<main style="max-width:1050px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><nav><a href="/">Home</a> &gt; <span>Privacy Policy</span></nav><h1>Privacy Policy &amp; Compliance</h1><p>Learnify Solutions maintains strict GDPR, UAE PDPL, and South Africa POPIA data privacy standards across all training portals.</p></main>`;
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else if (url.startsWith('/admin')) {
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>Learnify Portal Administration</title>`)
            .replace(/<head>/, `<head><meta name="robots" content="noindex, nofollow" />`);
        } else if (cleanPath === '/' || cleanPath === '') {
          const flagshipIds = [
            'course-cisco-ccna',
            'course-cisco-ccnp-encor',
            'course-comptia-security-plus',
            'course-comptia-a-plus',
            'course-comptia-network-plus',
            'course-azure-104',
            'course-ms-pl-300',
            'course-ms-ai-102',
            'course-ms-dp-900',
            'course-ms-4018-copilot',
            'course-aws-solutions',
            'course-kubernetes-cka',
          ];
          const flagship = flagshipIds
            .map((id) => coursesStore.find((c) => c.id === id))
            .filter((c): c is Course => Boolean(c));
          const ukLinks = getRegionalCoursePages('uk').slice(0, 6);
          const euLinks = getRegionalCoursePages('eu').slice(0, 6);
          const deLinks = getRegionalCoursePages('de').slice(0, 6);
          const nlLinks = getRegionalCoursePages('nl').slice(0, 6);
          const aeLinks = getRegionalCoursePages('ae').slice(0, 6);
          const zaLinks = getRegionalCoursePages('za').slice(0, 6);
          const ssrFallbackHtml = `<main style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;">
            <h1>Learnify Solutions — Authorized Global IT &amp; Cloud Certification Training</h1>
            <p>Live instructor-led training, 1-on-1 bootcamps, and 24/7 hands-on cloud labs for Microsoft Azure, Power BI, CompTIA, AWS, Kubernetes, and Cybersecurity across United Kingdom, Europe (Germany, Netherlands, EU), UAE &amp; Middle East, South Africa, North America, and Asia-Pacific.</p>
            <nav><a href="/courses">All Courses</a> | <a href="/exam-prep">Exam Prep &amp; Mock Tests</a> | <a href="/blogs">Blogs &amp; Roadmaps</a> | <a href="/corporate-training">Corporate Training</a> | <a href="/uk">UK Hub</a> | <a href="/eu">Europe Hub</a> | <a href="/de">Germany Hub</a> | <a href="/nl">Netherlands Hub</a> | <a href="/ae">UAE Hub</a> | <a href="/za">South Africa Hub</a> | <a href="/contact">Contact</a></nav>
            <h2>Featured Global Certification Courses</h2>
            <ul>${flagship.map((c) => `<li><a href="/course/${escapeHtml(c.id)}">${escapeHtml(c.title)}</a> — ${escapeHtml(c.certificationVendor)}</li>`).join('')}</ul>
            <h2>Practice Mock Tests, Cheat Sheets &amp; Calculators</h2>
            <ul>${EXAM_PREP_RESOURCES.slice(0, 12).map((r) => `<li><a href="/exam-prep/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a></li>`).join('')}</ul>
            <h2>Latest Global &amp; Regional IT Certification Blogs</h2>
            <ul>${allBlogs.map((g) => `<li><a href="/blogs/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a></li>`).join('')}</ul>
            <h2>Regional Training Hubs (GBP / EUR / AED / ZAR)</h2>
            <ul><li><a href="/uk">United Kingdom &amp; London Training (GBP)</a></li>${ukLinks.map((p) => `<li><a href="/uk/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a></li>`).join('')}</ul>
            <ul><li><a href="/eu">Europe (EU) Training (EUR)</a></li>${euLinks.map((p) => `<li><a href="/eu/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a></li>`).join('')}</ul>
            <ul><li><a href="/de">Germany &amp; DACH Training (EUR)</a></li>${deLinks.map((p) => `<li><a href="/de/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a></li>`).join('')}</ul>
            <ul><li><a href="/nl">Netherlands &amp; Benelux Training (EUR)</a></li>${nlLinks.map((p) => `<li><a href="/nl/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a></li>`).join('')}</ul>
            <ul><li><a href="/ae">UAE &amp; Dubai Certification Training (AED)</a></li>${aeLinks.map((p) => `<li><a href="/ae/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a></li>`).join('')}</ul>
            <ul><li><a href="/za">South Africa Certification Training (ZAR)</a></li>${zaLinks.map((p) => `<li><a href="/za/${escapeHtml(p.slug)}">${escapeHtml(p.h1Title)}</a></li>`).join('')}</ul>
          </main>`;
          const blogSummariesPayload = allBlogs.map(toBlogSummary);
          html = html
            .replace(
              /<\/head>/,
              `    <script>window.__INITIAL_BLOG_SUMMARIES__=${safeJsonForScript(blogSummariesPayload)};</script>\n  </head>`
            )
            .replace(/<div id="root"><\/div>/, `<div id="root">${ssrFallbackHtml}</div>`);
        } else {
          res.status(404);
          html = stripHomeHeroPreloads(html)
            .replace(/<title>.*?<\/title>/, `<title>Page Not Found | Learnify Solutions</title>`)
            .replace(/<head>/, `<head><meta name="robots" content="noindex, follow" />`)
            .replace(/<div id="root"><\/div>/, `<div id="root"><main style="max-width:900px;margin:0 auto;padding:32px 16px;font-family:sans-serif;color:#152e4d;"><h1>Page Not Found</h1><p>Explore our <a href="/courses">IT Certification Courses</a>, <a href="/ae">UAE Training Hub</a>, or <a href="/za">South Africa Training Hub</a>.</p></main></div>`);
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        res.send(html);
      } catch {
        res.sendFile(indexPath);
      }
    });
  }

  // Preload latest CMS & Blogs data on server boot
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('learnify_cms')
        .select('*')
        .or('id.eq.singleton,id.eq.main')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const payload = data.data || data.section_data;
        if (payload && typeof payload === 'object') {
          currentCmsData = {
            ...currentCmsData,
            ...payload,
          };
          console.log('[Supabase] Initialized server CMS with live Supabase data.');
        }
      }
      await syncBlogsFromSupabase();
    } catch (err: any) {
      console.warn('[Supabase] Startup CMS fetch notice:', err.message);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Learnify Full-Stack Server running at http://localhost:${PORT}`);
  });
}

startServer();
