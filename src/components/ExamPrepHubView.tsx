import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCode2,
  Globe2,
  HelpCircle,
  LockOpen,
  Network,
  Search,
  Terminal,
  X,
} from 'lucide-react';
import { ExamPrepCategory, ExamPrepResource, ExamPrepTopicTrack } from '../types';
import { EXAM_PREP_RESOURCES } from '../data/examPrepData';
import { getStoredExamPrepUnlock } from './ExamPrepLeadGate';

interface ExamPrepHubViewProps {
  onSelectResource: (slug: string) => void;
  onNavigateHome: () => void;
  onNavigateLink: (href: string) => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

type HubFilterTab = 'all' | 'practice_test' | 'cheat_sheet' | 'interview_qa' | 'calculators';

const FORMAT_TABS: Array<{ id: HubFilterTab; label: string }> = [
  { id: 'all', label: 'All Resources' },
  { id: 'practice_test', label: 'Practice Tests' },
  { id: 'cheat_sheet', label: 'Cheat Sheets' },
  { id: 'interview_qa', label: 'Interview Prep' },
  { id: 'calculators', label: 'Calculators & ROI' },
];

const TOPIC_TRACKS: Array<'all' | ExamPrepTopicTrack> = [
  'all',
  'Cybersecurity',
  'Cloud & DevOps',
  'Data & AI',
  'Networking & Infrastructure',
  'Career & Exam ROI',
];

function getFormatLabel(type: ExamPrepCategory): string {
  switch (type) {
    case 'practice_test':
      return 'Practice Simulator';
    case 'cheat_sheet':
      return 'Technical Cheat Sheet';
    case 'interview_qa':
      return 'Interview Q&A Bank';
    case 'subnet_calculator':
      return 'Interactive CIDR Tool';
    case 'cost_calculator':
      return 'Cost & Salary Tool';
  }
}

function getActionLabel(type: ExamPrepCategory): string {
  switch (type) {
    case 'practice_test':
      return 'Start Practice Test';
    case 'cheat_sheet':
      return 'Open Cheat Sheet';
    case 'interview_qa':
      return 'Read Interview Q&As';
    case 'subnet_calculator':
      return 'Open Subnet Calculator';
    case 'cost_calculator':
      return 'Calculate Fees & ROI';
  }
}

function FormatIcon({ type }: { type: ExamPrepCategory }) {
  switch (type) {
    case 'practice_test':
      return <BookOpenCheck className="w-4 h-4 text-[#ea6d24]" />;
    case 'cheat_sheet':
      return <Terminal className="w-4 h-4 text-[#ea6d24]" />;
    case 'interview_qa':
      return <HelpCircle className="w-4 h-4 text-[#ea6d24]" />;
    case 'subnet_calculator':
      return <Network className="w-4 h-4 text-[#ea6d24]" />;
    case 'cost_calculator':
      return <Calculator className="w-4 h-4 text-[#ea6d24]" />;
  }
}

export const ExamPrepHubView: React.FC<ExamPrepHubViewProps> = ({
  onSelectResource,
  onNavigateHome,
  onNavigateLink,
  onOpenAdvisorModal,
}) => {
  const [formatFilter, setFormatFilter] = useState<HubFilterTab>('all');
  const [topicFilter, setTopicFilter] = useState<'all' | ExamPrepTopicTrack>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isUnlocked = Boolean(getStoredExamPrepUnlock());

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EXAM_PREP_RESOURCES.filter((item) => {
      if (formatFilter === 'calculators') {
        if (item.type !== 'cost_calculator' && item.type !== 'subnet_calculator') return false;
      } else if (formatFilter !== 'all' && item.type !== formatFilter) {
        return false;
      }
      if (topicFilter !== 'all' && item.topicTrack !== topicFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.examCode.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.topicTrack.toLowerCase().includes(q)
      );
    });
  }, [formatFilter, topicFilter, searchQuery]);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Masthead */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-11 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#ea6d24] transition-colors font-semibold"
              >
                Home
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">Exam Prep Hub</span>
            </nav>

            {isUnlocked && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <LockOpen className="w-3.5 h-3.5" />
                <span>Practice Simulators Unlocked</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ea6d24]">
                Learnify Exam Prep · Simulators, Cheat Sheets &amp; ROI Tools
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                Certification Practice Tests, Cheat Sheets &amp; Interview Bank
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
                Prepare for CompTIA Security+ (SY0-701), Microsoft Azure (AZ-104 &amp; AI-102), AWS
                SAA-C03, Power BI (PL-300), Network+, and Kubernetes CKA with scenario exams, printable
                port/kubectl references, interview Q&amp;As, and local fee estimators.
              </p>
            </div>

            <div className="lg:col-span-4 w-full">
              <label htmlFor="exam-prep-search" className="sr-only">
                Search practice tests and cheat sheets
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="exam-prep-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search SY0-701, AZ-104, kubectl, ports..."
                  className="w-full pl-10 pr-9 py-3 text-sm rounded-xl border border-slate-300 bg-[#f8fafc] text-[#152e4d] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#ea6d24] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {FORMAT_TABS.map((tab) => {
                const active = formatFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFormatFilter(tab.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer min-h-[38px] ${
                      active
                        ? 'bg-[#152e4d] text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#152e4d]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="prep-topic-filter" className="text-xs font-semibold text-slate-500">
                Track:
              </label>
              <select
                id="prep-topic-filter"
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-[#152e4d] focus:outline-none focus:border-[#ea6d24] cursor-pointer min-h-[38px]"
              >
                {TOPIC_TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? `All Tracks (${EXAM_PREP_RESOURCES.length})` : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item: ExamPrepResource) => {
              const href = `/exam-prep/${item.slug}`;
              return (
                <article
                  key={item.slug}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ea6d24]/70 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    {/* Crisp Brand Header Bar */}
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectResource(item.slug);
                      }}
                      className="block bg-[#152e4d] px-6 py-5 text-white border-b border-slate-200"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-[#f7944d]">
                        <span className="truncate">{getFormatLabel(item.type)}</span>
                        <span className="font-mono tabular-nums text-white/85 shrink-0">
                          {item.examCode}
                        </span>
                      </div>
                      <p className="text-lg font-extrabold text-white mt-2 leading-snug group-hover:text-[#f7944d] transition-colors">
                        {item.shortTitle}
                      </p>
                    </a>

                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                        <span className="inline-flex items-center gap-1 text-[#152e4d]">
                          <FormatIcon type={item.type} />
                          <span>{item.topicTrack}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{item.questionCountLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.durationLabel}</span>
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-[#152e4d] leading-snug line-clamp-2">
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectResource(item.slug);
                          }}
                          className="hover:text-[#ea6d24] transition-colors"
                        >
                          {item.title}
                        </a>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 bg-[#fcfdfe] flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500 font-mono tabular-nums">
                      {item.passingScoreLabel}
                    </span>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectResource(item.slug);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ea6d24] hover:text-[#c95716] transition-colors whitespace-nowrap"
                    >
                      <span>{getActionLabel(item.type)}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
            <p className="text-base font-bold text-[#152e4d]">
              No exam prep resources match "{searchQuery || topicFilter}"
            </p>
            <button
              type="button"
              onClick={() => {
                setFormatFilter('all');
                setTopicFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#152e4d] text-white text-xs font-semibold cursor-pointer hover:bg-[#0f223a]"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Regional Study Hubs + Instructor Advisor Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl font-bold text-[#152e4d] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#ea6d24]" />
              <span>Combine Practice Tests with Live 1-on-1 Lab Cohorts</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Need structured instructor guidance, Pearson VUE voucher bundles, or corporate team prep
              across UK, Europe, UAE, or South Africa?
            </p>
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 pt-1 text-xs font-semibold text-slate-500">
              <span>Regional Hubs:</span>
              {[
                { label: 'UK Hub (GBP)', href: '/uk' },
                { label: 'Europe Hub (EUR)', href: '/eu' },
                { label: 'Germany (EUR)', href: '/de' },
                { label: 'Netherlands (EUR)', href: '/nl' },
                { label: 'UAE & Dubai (AED)', href: '/ae' },
                { label: 'South Africa (ZAR)', href: '/za' },
              ].map((hub, idx) => (
                <React.Fragment key={hub.href}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <a
                    href={hub.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLink(hub.href);
                    }}
                    className="text-[#152e4d] hover:text-[#ea6d24] underline underline-offset-4"
                  >
                    {hub.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('advisor', 'Exam Prep Roadmap')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Talk to Study Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('corporate_quote', 'Corporate Exam Readiness')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#152e4d] border border-slate-300 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <Globe2 className="w-4 h-4 text-[#ea6d24]" />
              <span>Team Vouchers</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
