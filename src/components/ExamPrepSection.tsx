import React from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  FileCode2,
  Network,
  Terminal,
} from 'lucide-react';

interface ExamPrepSectionProps {
  onSelectResource: (slug: string) => void;
  onViewExamPrepHub: () => void;
}

const FEATURED_RESOURCES = [
  {
    slug: 'comptia-security-plus-sy0-701-practice-questions',
    eyebrow: 'Mock Simulator · SY0-701',
    title: 'CompTIA Security+ Practice Questions',
    description:
      '45 realistic SOC, Zero Trust & cryptography exam scenarios with domain weights and scorecard.',
    meta: '2 Open Previews + Timed Test',
    kind: 'quiz' as const,
  },
  {
    slug: 'azure-az-900-practice-questions',
    eyebrow: 'Mock Simulator · AZ-900',
    title: 'Microsoft Azure Fundamentals Quiz',
    description:
      'Test CapEx vs OpEx, Shared Responsibility, Entra ID, Azure Policy & SLAs in 45 scenario Qs.',
    meta: '2 Open Previews + Timed Test',
    kind: 'quiz' as const,
  },
  {
    slug: 'aws-clf-c02-practice-questions',
    eyebrow: 'Mock Simulator · CLF-C02',
    title: 'AWS Cloud Practitioner Practice Exam',
    description:
      'Practice AWS Well-Architected, IAM, S3 tiers, CloudFront & billing tools with explanations.',
    meta: '2 Open Previews + Timed Test',
    kind: 'quiz' as const,
  },
  {
    slug: 'cisco-ccna-200-301-practice-questions',
    eyebrow: 'Mock Simulator · 200-301',
    title: 'Cisco CCNA 200-301 Routing & Switching',
    description:
      'OSPF, RSTP, VLSM, VLAN trunks, DHCP snooping & IPv6 SLAAC scenarios built for exam speed.',
    meta: '2 Open Previews + Timed Test',
    kind: 'quiz' as const,
  },
  {
    slug: 'ipv4-subnetting-cidr-cheat-sheet-calculator',
    eyebrow: 'Interactive CIDR Tool',
    title: 'IPv4 Subnetting & CIDR Calculator',
    description:
      'Live /8–/32 subnet calculator comparing AWS/Azure 5-IP VPC reservations vs Cisco RFC math.',
    meta: 'Free Live Engineering Tool',
    kind: 'subnet' as const,
  },
  {
    slug: 'it-certification-exam-cost-salary-calculator',
    eyebrow: 'Multi-Region Pricing & Quote Tool',
    title: '2026 Exam Pricing, Quote & Salary Calculator',
    description:
      'Compare Power BI ($165), Azure, AWS & CKA costs & request instant quotes in USD, GBP, EUR, AED, ZAR & INR.',
    meta: '6 Currencies · Instant Quote',
    kind: 'cost' as const,
  },
];

const QUICK_CHEAT_SHEETS = [
  {
    slug: 'power-bi-pl-300-dax-formulas-cheat-sheet',
    label: 'Power BI PL-300 DAX & $165 Pricing Sheet',
  },
  {
    slug: 'azure-az-104-lab-setup-cli-cheat-sheet',
    label: 'Azure AZ-104 Lab Specs & CLI Sheet',
  },
  {
    slug: 'comptia-network-plus-port-numbers-cheat-sheet',
    label: 'Network+ & Security+ Ports',
  },
  {
    slug: 'kubernetes-cka-kubectl-commands-cheat-sheet',
    label: 'Kubernetes CKA kubectl Sheet',
  },
  {
    slug: 'linux-networking-commands-cheat-sheet',
    label: 'Linux Networking Commands (ss / ip)',
  },
  {
    slug: 'terraform-iac-commands-cheat-sheet',
    label: 'Terraform CLI Cheat Sheet',
  },
  {
    slug: 'azure-vs-aws-services-mapping-sheet',
    label: 'Azure vs AWS Services Map',
  },
];

function CardIcon({ kind }: { kind: 'quiz' | 'subnet' | 'cost' }) {
  switch (kind) {
    case 'subnet':
      return <Network className="w-5 h-5 text-[#ea6d24]" />;
    case 'cost':
      return <Calculator className="w-5 h-5 text-[#ea6d24]" />;
    case 'quiz':
    default:
      return <BookOpenCheck className="w-5 h-5 text-[#ea6d24]" />;
  }
}

export const ExamPrepSection: React.FC<ExamPrepSectionProps> = ({
  onSelectResource,
  onViewExamPrepHub,
}) => {
  return (
    <section
      aria-labelledby="homepage-exam-prep-heading"
      className="w-full py-16 md:py-20 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
              Free Practice Simulators &amp; Interactive Calculators
            </p>
            <h2
              id="homepage-exam-prep-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#152e4d] tracking-tight [text-wrap:balance]"
            >
              Benchmark Exam Readiness Before Booked Test Day
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Test scenario accuracy on CompTIA, Microsoft Azure, AWS &amp; Cisco practice exams,
              size cloud subnets live, and calculate voucher ROI in GBP, EUR, AED, or ZAR.
            </p>
          </div>

          <a
            href="/exam-prep"
            onClick={(e) => {
              e.preventDefault();
              onViewExamPrepHub();
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-sm font-semibold transition-colors shrink-0 min-h-[44px]"
          >
            <span>Explore All 22 Exam Prep Tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Featured Simulators & Interactive Calculators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_RESOURCES.map((item) => {
            const href = `/exam-prep/${item.slug}`;
            return (
              <a
                key={item.slug}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectResource(item.slug);
                }}
                className="group bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 hover:bg-white hover:border-[#ea6d24]/70 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea6d24]">
                      {item.eyebrow}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <CardIcon kind={item.kind} />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#152e4d] leading-snug group-hover:text-[#ea6d24] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-slate-500 font-mono tabular-nums">{item.meta}</span>
                  <span className="inline-flex items-center gap-1 text-[#ea6d24] shrink-0">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Quick Technical Cheat Sheets Index Strip */}
        <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#152e4d] shrink-0">
            <Terminal className="w-4 h-4 text-[#ea6d24]" />
            <span>1-Click Technical Cheat Sheets:</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-semibold">
            {QUICK_CHEAT_SHEETS.map((sheet, idx) => (
              <React.Fragment key={sheet.slug}>
                {idx > 0 && <span className="text-slate-300" aria-hidden="true">·</span>}
                <a
                  href={`/exam-prep/${sheet.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectResource(sheet.slug);
                  }}
                  className="inline-flex items-center gap-1 text-[#152e4d] hover:text-[#ea6d24] underline underline-offset-4 transition-colors"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-[#ea6d24]" />
                  <span>{sheet.label}</span>
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
