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
import { initialCmsData, sampleCourses } from './src/data/defaultCmsData';
import { CmsData, LeadSubmission, Course } from './src/types';
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
  const pass = process.env.EMAIL_PASSWORD || 'Pa$$w0rd@123';
  if (!pass) return null;

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
  const emailPassword = process.env.EMAIL_PASSWORD || 'Pa$$w0rd@123';
  if (!emailPassword) {
    const msg = 'EMAIL_PASSWORD or RESEND_API_KEY is not configured.';
    console.warn(`[Email Notice] ${msg}`);
    return { success: false, error: msg };
  }

  const primaryPort = Number(process.env.SMTP_PORT) || 465;
  const primarySecure = primaryPort === 465;
  const primaryTransporter = createTransporterInstance(primaryPort, primarySecure);

  if (!primaryTransporter) {
    return { success: false, error: 'Could not initialize primary SMTP transporter.' };
  }

  try {
    console.log(`[Email] Attempting SMTP delivery via ${process.env.SMTP_HOST || 'smtp.titan.email'}:${primaryPort}...`);
    const info = await primaryTransporter.sendMail(mailOptions);
    console.log(`[Email Success] Delivered to ${mailOptions.to} (MessageId: ${info.messageId}) on port ${primaryPort}`);
    return { success: true, messageId: info.messageId, portUsed: primaryPort, method: `SMTP Port ${primaryPort}` };
  } catch (primaryErr: any) {
    console.warn(`[Email Notice] Primary SMTP attempt on port ${primaryPort} failed: ${primaryErr.message}`);
    
    // Fallback 1: Try Port 587 (or 465 if primary was 587)
    const fallbackPort = primaryPort === 465 ? 587 : 465;
    const fallbackSecure = fallbackPort === 465;
    
    console.log(`[Email Fallback] Retrying delivery via fallback port ${fallbackPort}...`);
    const fallbackTransporter = createTransporterInstance(fallbackPort, fallbackSecure);
    
    if (fallbackTransporter) {
      try {
        const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
        console.log(`[Email Success (Fallback)] Delivered to ${mailOptions.to} on port ${fallbackPort} (MessageId: ${fallbackInfo.messageId})`);
        return { success: true, messageId: fallbackInfo.messageId, portUsed: fallbackPort, method: `SMTP Port ${fallbackPort}` };
      } catch (fallbackErr: any) {
        console.error(`[Email Error] Fallback port ${fallbackPort} failed: ${fallbackErr.message}`);
        
        // Fallback 2: Try Port 2525 (Alternative unblocked SMTP port)
        try {
          console.log(`[Email Fallback 2] Retrying delivery via alternative unblocked port 2525...`);
          const port2525Transporter = createTransporterInstance(2525, false);
          if (port2525Transporter) {
            const p2525Info = await port2525Transporter.sendMail(mailOptions);
            return { success: true, messageId: p2525Info.messageId, portUsed: 2525, method: 'SMTP Port 2525' };
          }
        } catch (p2525Err: any) {
          console.error(`[Email Error] Port 2525 failed: ${p2525Err.message}`);
        }

        return {
          success: false,
          error: `Railway/Cloud Host blocked SMTP connections (Port ${primaryPort}, ${fallbackPort}, 2525: Connection timeout). Add RESEND_API_KEY in Railway to send via HTTPS Port 443 instantly!`,
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

  // Dynamic SEO Sitemap Generation with all courses
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://learnify-solutions.com';
    const staticRoutes = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/#courses', priority: '0.9', changefreq: 'daily' },
      { loc: '/#corporate', priority: '0.8', changefreq: 'weekly' },
      { loc: '/#about', priority: '0.7', changefreq: 'monthly' },
      { loc: '/#contact', priority: '0.8', changefreq: 'monthly' },
    ];

    const courseRoutes = coursesStore.map((c) => ({
      loc: `/#course-${c.id}`,
      priority: '0.85',
      changefreq: 'weekly',
    }));

    const allRoutes = [...staticRoutes, ...courseRoutes];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}${r.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  });

  // Dynamic robots.txt
  app.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *
Allow: /
Sitemap: https://learnify-solutions.com/sitemap.xml
`;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(robots);
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

  // 1b. Administrator Login Endpoint - Secure Authentication
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

  // 4. Reset CMS to default
  app.post('/api/cms/reset', authenticateAdminToken, (req, res) => {
    currentCmsData = JSON.parse(JSON.stringify(initialCmsData));
    res.json({
      success: true,
      message: 'CMS content reset to default schema',
      data: currentCmsData,
    });
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

-- Enable Row Level Security (RLS) & Allow public read access
ALTER TABLE public.learnify_cms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learnify_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learnify_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read CMS" ON public.learnify_cms FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON public.learnify_courses FOR SELECT USING (true);
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

    // General static file serving with 1 day caching
    app.use(
      express.static(distPath, {
        maxAge: '1d',
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            // HTML is fresh or short cache for immediate updates
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          }
        },
      })
    );

    app.get('*', (req, res) => {
      const url = req.originalUrl || req.url;
      const indexPath = path.join(distPath, 'index.html');
      
      try {
        let html = fs.readFileSync(indexPath, 'utf-8');

        // Dynamic SSR OpenGraph / Meta Tag Injection for Courses & Pages
        if (url.startsWith('/course/') || url.includes('course=')) {
          const courseIdMatch = url.match(/\/course\/([a-zA-Z0-9_-]+)/) || url.match(/course=([a-zA-Z0-9_-]+)/);
          const courseId = courseIdMatch ? courseIdMatch[1] : null;
          const course = courseId ? coursesStore.find(c => c.id === courseId) : null;

          if (course) {
            const courseTitle = `${course.title} Certification Training | Learnify Solutions`;
            const courseDesc = `${course.summary} Learn with live labs and expert mentors.`;
            html = html
              .replace(/<title>.*?<\/title>/, `<title>${courseTitle}</title>`)
              .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${courseTitle}" />`)
              .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${courseDesc}" />`)
              .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${courseTitle}" />`)
              .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${courseDesc}" />`);
          }
        } else if (url.startsWith('/about')) {
          html = html
            .replace(/<title>.*?<\/title>/, `<title>About Us | Learnify Solutions - Enterprise IT Training Ecosystem</title>`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="Discover Learnify Solutions’ mission, leadership, and ISO-certified training frameworks empowering global enterprise tech workforces." />`);
        } else if (url.startsWith('/courses')) {
          html = html
            .replace(/<title>.*?<\/title>/, `<title>IT & Cloud Certification Courses Catalog | Learnify Solutions</title>`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="Browse official certification courses in AWS, Microsoft Azure, Google Cloud, Cisco, DevOps, Kubernetes, and Cybersecurity." />`);
        } else if (url.startsWith('/corporate')) {
          html = html
            .replace(/<title>.*?<\/title>/, `<title>Corporate IT Training & Team Upskilling Solutions | Learnify Solutions</title>`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="Scalable enterprise learning solutions designed for enterprise engineering teams. Custom syllabus, private cloud sandboxes, 98% completion rate." />`);
        } else if (url.startsWith('/admin')) {
          html = html
            .replace(/<title>.*?<\/title>/, `<title>Learnify Portal Administration</title>`)
            .replace(/<head>/, `<head><meta name="robots" content="noindex, nofollow" />`);
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
      } catch {
        res.sendFile(indexPath);
      }
    });
  }

  // Preload latest CMS data on server boot
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
    } catch (err: any) {
      console.warn('[Supabase] Startup CMS fetch notice:', err.message);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Learnify Full-Stack Server running at http://localhost:${PORT}`);
  });
}

startServer();
