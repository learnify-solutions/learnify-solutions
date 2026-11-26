import React, { useEffect, useRef, useState } from 'react';
import { BlogTopicTrack } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';

interface BlogEditorialCoverProps {
  slug: string;
  title: string;
  topicTrack: BlogTopicTrack | string;
  regionLabel: string;
  category?: string;
  readTime?: string;
  coverImage?: string;
  variant?: 'hero' | 'card' | 'compact';
  className?: string;
}

type CoverMotif =
  | 'cloud_bridge'
  | 'security_shield'
  | 'analytics_bars'
  | 'regional_rings'
  | 'terminal_cluster'
  | 'infra_stack'
  | 'ai_nodes';

interface EditorialCoverSpec {
  trackEyebrow: string;
  coverHeadline: string;
  examCodes: string[];
  subCaption: string;
  footerMeta: string;
  motif: CoverMotif;
  surfaceTone: 'navy' | 'deep' | 'slate';
}

const AI_GENERATED_COVER_PATTERNS = [
  '_178777',
  '_178829',
  'cyber_soc_shield',
  'azure_cloud_infra',
  'comptia_security_soc',
  'powerbi_data_analytics',
  'comptia_cloud_multicloud',
  'pc_hardware_workbench',
  'copilot_genai_workspace',
  'ethical_hacking_pentest',
  'cloud_essentials_business',
  'aws_architecture_diagram',
  'kubernetes_devops_cluster',
  'linux_datacenter_admin',
];

function isCustomUploadedPhoto(coverImage?: string): boolean {
  if (!coverImage || typeof coverImage !== 'string') return false;
  const trimmed = coverImage.trim();
  if (!trimmed) return false;
  if (trimmed === '/hero.webp' || trimmed === '/hero-mobile.webp') return false;
  return !AI_GENERATED_COVER_PATTERNS.some((pattern) => trimmed.includes(pattern));
}

function buildFallbackHeadline(title: string): string {
  const cleaned = String(title || 'Certification Blueprint')
    .replace(/[:|–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleaned.split(' ').filter(Boolean);
  if (words.length <= 5) return cleaned;
  return words.slice(0, 5).join(' ');
}

function getEditorialCoverSpec(
  slug: string,
  title: string,
  topicTrack: string,
  regionLabel: string,
  category?: string
): EditorialCoverSpec {
  const s = (slug || '').toLowerCase();

  if (s.includes('az-900') && s.includes('clf-c02')) {
    return {
      trackEyebrow: 'Entry Cloud Comparison',
      coverHeadline: 'AZ-900 vs AWS CLF-C02',
      examCodes: ['AZ-900', 'CLF-C02'],
      subCaption: 'Cost · Blueprint · Career Next Step',
      footerMeta: '2026 Decision Guide',
      motif: 'cloud_bridge',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('sy0-701') && s.includes('ceh')) {
    return {
      trackEyebrow: 'Cybersecurity Comparison',
      coverHeadline: 'Security+ vs CEH v12',
      examCodes: ['SY0-701', 'CEH 312-50'],
      subCaption: 'Blue Team · Red Team · Fee ROI',
      footerMeta: '2026 Hiring Guide',
      motif: 'security_shield',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('n10-009') && s.includes('ccna')) {
    return {
      trackEyebrow: 'Networking Comparison',
      coverHeadline: 'Network+ vs Cisco CCNA',
      examCodes: ['N10-009', '200-301'],
      subCaption: 'OSPF · Subnetting · CLI Labs',
      footerMeta: 'Career Path Comparison',
      motif: 'infra_stack',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('cissp') && s.includes('cism')) {
    return {
      trackEyebrow: 'Security Leadership',
      coverHeadline: 'CISSP vs CISM vs Sec+',
      examCodes: ['SY0-701', 'CISSP', 'CISM'],
      subCaption: 'Risk · Architecture · Experience Path',
      footerMeta: 'Senior Cyber Roadmap',
      motif: 'security_shield',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('uk-europe') || s.includes('nis2')) {
    return {
      trackEyebrow: 'UK & Europe Playbook',
      coverHeadline: 'UK & EU NIS2 Salaries',
      examCodes: ['UK · GBP', 'EU · EUR', 'NIS2 / DORA'],
      subCaption: 'London · Frankfurt · Amsterdam',
      footerMeta: 'Compliance & Pay Guide',
      motif: 'regional_rings',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('itf-plus') || s.includes('cloud-essentials') || s.includes('server-plus')) {
    return {
      trackEyebrow: 'CompTIA Infrastructure',
      coverHeadline: 'ITF+ to Server+ Path',
      examCodes: ['FC0-U61', 'CLO-002', 'SK0-005'],
      subCaption: 'Helpdesk · Cloud Ops · Server Admin',
      footerMeta: 'Career Track Blueprint',
      motif: 'infra_stack',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('dp-900') || s.includes('pl-900') || s.includes('ai-102') || s.includes('sc-900')) {
    return {
      trackEyebrow: 'Microsoft Data & AI',
      coverHeadline: 'AI-102, DP-900 & SC-900 Plan',
      examCodes: ['AI-102', 'DP-900', 'SC-900'],
      subCaption: 'Azure OpenAI · Data · Zero Trust',
      footerMeta: 'Role Certification Map',
      motif: 'ai_nodes',
      surfaceTone: 'slate',
    };
  }

  if (s.includes('az-104') && s.includes('aws')) {
    return {
      trackEyebrow: 'Cloud Comparison',
      coverHeadline: 'Azure vs AWS Career Guide',
      examCodes: ['AZ-104', 'SAA-C03'],
      subCaption: 'Architecture · Pay · 6-Week Plan',
      footerMeta: 'Multi-Cloud Strategy',
      motif: 'cloud_bridge',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('power-bi') || s.includes('pl-300')) {
    return {
      trackEyebrow: 'Microsoft Analytics',
      coverHeadline: 'Power BI PL-300 & DAX Guide',
      examCodes: ['PL-300', 'DAX', 'RLS'],
      subCaption: 'Star Schema · Time Intelligence',
      footerMeta: 'Data Analyst Roadmap',
      motif: 'analytics_bars',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('copilot') || s.includes('ms-4018')) {
    return {
      trackEyebrow: 'Enterprise GenAI',
      coverHeadline: 'M365 Copilot Rollout Guide',
      examCodes: ['MS-4018', 'Purview'],
      subCaption: 'Data Governance · 90-Day KPI',
      footerMeta: 'Enterprise Deployment',
      motif: 'ai_nodes',
      surfaceTone: 'slate',
    };
  }

  if (s.includes('aws-saa-c03') || (s.includes('aws') && s.includes('security'))) {
    return {
      trackEyebrow: 'AWS Architecture',
      coverHeadline: 'AWS SAA-C03 to SCS-C02',
      examCodes: ['SAA-C03', 'SCS-C02'],
      subCaption: 'Multi-AZ VPC · IAM · GuardDuty',
      footerMeta: 'Production Cloud Guide',
      motif: 'cloud_bridge',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('kubernetes') || s.includes('cka')) {
    return {
      trackEyebrow: 'Cloud-Native DevOps',
      coverHeadline: 'Kubernetes CKA Exam Speed',
      examCodes: ['CKA', 'kubectl', 'etcd'],
      subCaption: 'Cluster Triage · Imperative YAML',
      footerMeta: 'CNCF Terminal Playbook',
      motif: 'terminal_cluster',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('security-plus') || s.includes('sy0-701')) {
    return {
      trackEyebrow: 'Cybersecurity Track',
      coverHeadline: 'Security+ SY0-701 Blueprint',
      examCodes: ['SY0-701', 'SOC', 'Zero Trust'],
      subCaption: '5 Domains · PBQs · Study Plan',
      footerMeta: '30-Day Pass Strategy',
      motif: 'security_shield',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('pentest') || s.includes('pt0-002')) {
    return {
      trackEyebrow: 'Offensive Security',
      coverHeadline: 'PenTest+ PT0-002 Lab Guide',
      examCodes: ['PT0-002', 'Red Team'],
      subCaption: 'Scoping · Recon · Exploitation',
      footerMeta: 'Hands-On Validation',
      motif: 'security_shield',
      surfaceTone: 'deep',
    };
  }

  if (s.includes('cloud-plus') || s.includes('cv0-004')) {
    return {
      trackEyebrow: 'Multi-Cloud Ops',
      coverHeadline: 'CompTIA Cloud+ CV0-004 Guide',
      examCodes: ['CV0-004', 'FinOps', 'IaC'],
      subCaption: 'Hybrid Infra · DevSecOps',
      footerMeta: 'Vendor-Neutral Cloud',
      motif: 'infra_stack',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('network') || s.includes('a-plus') || s.includes('linux')) {
    return {
      trackEyebrow: 'Core Infrastructure',
      coverHeadline: buildFallbackHeadline(title),
      examCodes: ['A+', 'N10-009', 'XK0-005'],
      subCaption: 'Networking · Linux · Troubleshooting',
      footerMeta: 'Infrastructure Guide',
      motif: 'infra_stack',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('uae') || s.includes('dubai')) {
    return {
      trackEyebrow: 'UAE & Dubai Desk',
      coverHeadline: 'UAE Exam Centers & AED Fees',
      examCodes: ['Dubai', 'Abu Dhabi', 'AED'],
      subCaption: 'Pearson VUE · GST Batches',
      footerMeta: 'Regional Exam Playbook',
      motif: 'regional_rings',
      surfaceTone: 'navy',
    };
  }

  if (s.includes('south-africa') || s.includes('johannesburg') || s.includes('cape-town')) {
    return {
      trackEyebrow: 'South Africa Desk',
      coverHeadline: 'SA Exam Centers & ZAR Fees',
      examCodes: ['Joburg', 'Cape Town', 'ZAR'],
      subCaption: 'Pearson VUE · SAST · B2B POs',
      footerMeta: 'Regional Exam Playbook',
      motif: 'regional_rings',
      surfaceTone: 'navy',
    };
  }

  return {
    trackEyebrow: topicTrack || category || 'Certification Guide',
    coverHeadline: buildFallbackHeadline(title),
    examCodes: [category || 'Exam Track', regionLabel],
    subCaption: 'Official Syllabus · Practical Strategy',
    footerMeta: 'Learnify Editorial',
    motif:
      topicTrack === 'Cybersecurity'
        ? 'security_shield'
        : topicTrack === 'Data & AI'
        ? 'analytics_bars'
        : topicTrack === 'Exam & Fee Guides'
        ? 'regional_rings'
        : 'cloud_bridge',
    surfaceTone: 'navy',
  };
}

const CoverSchematicMotif: React.FC<{ motif: CoverMotif; uid: string }> = ({ motif }) => {
  switch (motif) {
    case 'security_shield':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <path
            d="M60 14 L98 29 V58 C98 81 81 98 60 107 C39 98 22 81 22 58 V29 Z"
            fill="rgba(234,109,36,0.08)"
            stroke="#ea6d24"
            strokeWidth="2.2"
          />
          <path
            d="M60 27 L86 37 V58 C86 74 75 87 60 94 C45 87 34 74 34 58 V37 Z"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
          />
          <path
            d="M47 60 L56 69 L75 49"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'cloud_bridge':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <rect
            x="14"
            y="24"
            width="36"
            height="28"
            rx="6"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.8"
          />
          <rect
            x="70"
            y="24"
            width="36"
            height="28"
            rx="6"
            fill="rgba(234,109,36,0.12)"
            stroke="#ea6d24"
            strokeWidth="2"
          />
          <rect
            x="38"
            y="72"
            width="44"
            height="26"
            rx="6"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.8"
          />
          <path
            d="M50 38 H70 M32 52 V64 H60 V72 M88 52 V64 H60"
            fill="none"
            stroke="#f7944d"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="38" r="4" fill="#ffffff" />
          <circle cx="88" cy="38" r="4" fill="#ea6d24" />
          <circle cx="60" cy="85" r="4" fill="#ffffff" />
        </svg>
      );
    case 'analytics_bars':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <line x1="18" y1="96" x2="104" y2="96" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" />
          <rect x="24" y="64" width="14" height="32" rx="3" fill="rgba(255,255,255,0.22)" />
          <rect x="44" y="48" width="14" height="48" rx="3" fill="rgba(255,255,255,0.42)" />
          <rect x="64" y="34" width="14" height="62" rx="3" fill="#ea6d24" />
          <rect x="84" y="22" width="14" height="74" rx="3" fill="#f7944d" />
          <path
            d="M24 54 L48 40 L70 28 L92 16"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="92" cy="16" r="4" fill="#ea6d24" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );
    case 'terminal_cluster':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <rect
            x="16"
            y="22"
            width="88"
            height="76"
            rx="8"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1.8"
          />
          <line x1="16" y1="38" x2="104" y2="38" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          <circle cx="27" cy="30" r="2.6" fill="#ea6d24" />
          <circle cx="36" cy="30" r="2.6" fill="rgba(255,255,255,0.45)" />
          <circle cx="45" cy="30" r="2.6" fill="rgba(255,255,255,0.45)" />
          <path
            d="M28 53 L38 61 L28 69"
            fill="none"
            stroke="#ea6d24"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="46" y1="68" x2="78" y2="68" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="81" x2="64" y2="81" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'regional_rings':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1.6" />
          <circle cx="60" cy="60" r="26" fill="none" stroke="rgba(234,109,36,0.55)" strokeWidth="1.8" />
          <ellipse cx="60" cy="60" rx="20" ry="42" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" />
          <line x1="18" y1="60" x2="102" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.4" />
          <circle cx="60" cy="60" r="6" fill="#ea6d24" stroke="#ffffff" strokeWidth="2" />
          <circle cx="88" cy="39" r="4" fill="#ffffff" />
          <circle cx="32" cy="78" r="4" fill="#f7944d" />
        </svg>
      );
    case 'ai_nodes':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <line x1="28" y1="36" x2="60" y2="60" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" />
          <line x1="28" y1="84" x2="60" y2="60" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" />
          <line x1="60" y1="60" x2="94" y2="34" stroke="#ea6d24" strokeWidth="2" />
          <line x1="60" y1="60" x2="94" y2="86" stroke="#ea6d24" strokeWidth="2" />
          <circle cx="28" cy="36" r="8" fill="#0f2238" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
          <circle cx="28" cy="84" r="8" fill="#0f2238" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
          <circle cx="60" cy="60" r="11" fill="#ea6d24" stroke="#ffffff" strokeWidth="2" />
          <circle cx="94" cy="34" r="7" fill="#0f2238" stroke="#f7944d" strokeWidth="2" />
          <circle cx="94" cy="86" r="7" fill="#0f2238" stroke="#f7944d" strokeWidth="2" />
        </svg>
      );
    case 'infra_stack':
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
          <rect
            x="20"
            y="22"
            width="80"
            height="19"
            rx="4"
            fill="rgba(234,109,36,0.14)"
            stroke="#ea6d24"
            strokeWidth="2"
          />
          <rect
            x="20"
            y="50"
            width="80"
            height="19"
            rx="4"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.8"
          />
          <rect
            x="20"
            y="78"
            width="80"
            height="19"
            rx="4"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.8"
          />
          <circle cx="32" cy="31.5" r="3" fill="#ea6d24" />
          <circle cx="32" cy="59.5" r="3" fill="#ffffff" />
          <circle cx="32" cy="87.5" r="3" fill="rgba(255,255,255,0.65)" />
        </svg>
      );
  }
};

export const BlogEditorialCover: React.FC<BlogEditorialCoverProps> = ({
  slug,
  title,
  topicTrack,
  regionLabel,
  category,
  readTime,
  coverImage,
  variant = 'card',
  className = '',
}) => {
  const showCustomPhoto = isCustomUploadedPhoto(coverImage);
  const spec = getEditorialCoverSpec(slug, title, String(topicTrack || ''), regionLabel, category);
  const normalizedCover = showCustomPhoto && coverImage ? normalizeImageUrl(coverImage, 'course') : '';
  const [hasImgError, setHasImgError] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setHasImgError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsImgLoaded(true);
    } else {
      setIsImgLoaded(false);
    }
  }, [normalizedCover]);

  if (showCustomPhoto && normalizedCover && !hasImgError) {
    return (
      <div className={`relative w-full h-full bg-[#152e4d] overflow-hidden ${className}`}>
        {!isImgLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#152e4d] via-[#1d3f69] to-[#152e4d] animate-pulse pointer-events-none"
          />
        )}
        <img
          ref={imgRef}
          src={normalizedCover}
          alt={title || spec.coverHeadline}
          width={variant === 'compact' ? 320 : 800}
          height={variant === 'compact' ? 240 : 450}
          loading={variant === 'hero' ? 'eager' : 'lazy'}
          fetchPriority={variant === 'hero' ? 'high' : undefined}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsImgLoaded(true)}
          onError={() => setHasImgError(true)}
          className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const bgTone =
    spec.surfaceTone === 'deep'
      ? 'bg-[#0f2238]'
      : spec.surfaceTone === 'slate'
      ? 'bg-[#173354]'
      : 'bg-[#152e4d]';

  if (variant === 'compact') {
    return (
      <div
        className={`relative w-full h-full ${bgTone} text-white p-3.5 flex flex-col justify-between overflow-hidden select-none ${className}`}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none"
        >
          <defs>
            <pattern id={`grid-compact-${slug}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-compact-${slug})`} />
        </svg>

        <div className="relative flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f7944d] truncate">
            {spec.trackEyebrow}
          </span>
          <div className="w-7 h-7 shrink-0 opacity-90">
            <CoverSchematicMotif motif={spec.motif} uid={`c-${slug}`} />
          </div>
        </div>

        <div className="relative space-y-1 pr-1">
          <p className="text-sm font-extrabold text-white leading-tight line-clamp-2">
            {spec.coverHeadline}
          </p>
          <p className="text-[11px] font-mono tabular-nums font-bold text-[#f7944d] truncate">
            {spec.examCodes.slice(0, 2).join(' · ')}
          </p>
        </div>

        <div className="relative flex items-center justify-between text-[10px] font-semibold text-slate-300 pt-1 border-t border-white/10">
          <span className="truncate">{spec.footerMeta}</span>
          <span className="text-white/75 shrink-0">{readTime || regionLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full ${bgTone} text-white ${
        variant === 'hero' ? 'p-5 sm:p-7' : 'p-4 sm:p-5'
      } flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* Clean Architectural Grid in Learnify Navy */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none"
      >
        <defs>
          <pattern id={`grid-${variant}-${slug}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant}-${slug})`} />
      </svg>

      {/* Subtle Warm Focal Corner Glow */}
      <div
        aria-hidden="true"
        className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#ea6d24]/15 pointer-events-none"
      />

      {/* Top Row: Track Eyebrow + Brand Attribution */}
      <div className="relative flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#f7944d] truncate">
          {spec.trackEyebrow} · Learnify Editorial
        </span>
        <span className="text-[10px] font-mono tabular-nums font-semibold text-slate-300 shrink-0">
          {regionLabel}
        </span>
      </div>

      {/* Main Focal Asymmetric Split: Headline + Single Crisp Schematic */}
      <div className="relative my-auto py-2 grid grid-cols-12 gap-3 items-center">
        <div className="col-span-8 space-y-2 min-w-0">
          <p
            className={`${
              variant === 'hero' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            } font-extrabold text-white leading-[1.15] tracking-tight`}
          >
            {spec.coverHeadline}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono tabular-nums font-bold text-[#f7944d]">
            {spec.examCodes.map((code, idx) => (
              <React.Fragment key={code}>
                {idx > 0 && <span className="text-white/30">·</span>}
                <span>{code}</span>
              </React.Fragment>
            ))}
          </div>

          <p className="text-[11px] sm:text-xs text-slate-300 truncate">{spec.subCaption}</p>
        </div>

        <div className="col-span-4 flex items-center justify-center">
          <div
            className={`${
              variant === 'hero' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20 sm:w-24 sm:h-24'
            } p-2 rounded-2xl bg-[#0b1b2e]/75 border border-white/15`}
          >
            <CoverSchematicMotif motif={spec.motif} uid={`${variant}-${slug}`} />
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="relative flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-300 pt-2 border-t border-white/10">
        <span className="truncate">{spec.footerMeta}</span>
        <span className="text-slate-200 tabular-nums shrink-0">
          {readTime || '2026 Edition'}
        </span>
      </div>
    </div>
  );
};
