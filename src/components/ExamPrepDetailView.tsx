import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Globe2,
  Lock,
  LockOpen,
  Search,
} from 'lucide-react';
import { ExamPrepResource } from '../types';
import { EXAM_PREP_META } from '../data/examPrepMeta';
import {
  ExamPrepLeadGate,
  ExamPrepUnlockedProfile,
  getStoredExamPrepUnlock,
} from './ExamPrepLeadGate';
import { PracticeExamSimulator } from './PracticeExamSimulator';
import { ExamCostSalaryCalculator } from './ExamCostSalaryCalculator';
import { SubnetCidrCalculator } from './SubnetCidrCalculator';

interface ExamPrepDetailViewProps {
  resource: ExamPrepResource | null;
  onNavigateHome: () => void;
  onNavigateHub: () => void;
  onSelectResource: (slug: string) => void;
  onNavigateLink: (href: string) => void;
  onLeadSubmitted?: () => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const ExamPrepDetailView: React.FC<ExamPrepDetailViewProps> = ({
  resource,
  onNavigateHome,
  onNavigateHub,
  onSelectResource,
  onNavigateLink,
  onLeadSubmitted,
  onOpenAdvisorModal,
}) => {
  const [resolvedResource, setResolvedResource] = useState<ExamPrepResource | null>(resource);
  const [isLoadingBank, setIsLoadingBank] = useState<boolean>(false);
  const [unlockedProfile, setUnlockedProfile] = useState<ExamPrepUnlockedProfile | null>(() =>
    getStoredExamPrepUnlock()
  );
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, number>>({});
  const [cheatFilter, setCheatFilter] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [interviewCategory, setInterviewCategory] = useState<string>('all');
  const [openQaIndices, setOpenQaIndices] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({ 0: true });

  useEffect(() => {
    setPreviewAnswers({});
    setCheatFilter('');
    setInterviewCategory('all');
    setOpenQaIndices({ 0: true, 1: true, 2: true });
    setOpenFaqIndices({ 0: true });
    setUnlockedProfile(getStoredExamPrepUnlock());

    if (!resource) {
      setResolvedResource(null);
      setIsLoadingBank(false);
      return;
    }

    setResolvedResource(resource);
    const needsQuestions =
      resource.type === 'practice_test' && (!resource.questions || resource.questions.length === 0);
    const needsCheatSheet =
      (resource.type === 'cheat_sheet' || resource.type === 'subnet_calculator') &&
      (!resource.cheatSheetSections || resource.cheatSheetSections.length === 0);
    const needsInterview =
      resource.type === 'interview_qa' &&
      (!resource.interviewItems || resource.interviewItems.length === 0);

    if (!needsQuestions && !needsCheatSheet && !needsInterview) {
      setIsLoadingBank(false);
      return;
    }

    let cancelled = false;
    setIsLoadingBank(true);
    import('../data/examPrepLoader')
      .then((m) => m.loadExamPrepResourceClient(resource.slug))
      .then((full) => {
        if (cancelled) return;
        if (full) {
          setResolvedResource(full);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingBank(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [resource]);

  const activeResource = resolvedResource || resource;

  const otherResources = useMemo(
    () => EXAM_PREP_META.filter((r) => r.slug !== activeResource?.slug).slice(0, 3),
    [activeResource?.slug]
  );

  const interviewCategories = useMemo(() => {
    const items = activeResource?.interviewItems || [];
    const cats = Array.from(new Set(items.map((i) => i.category)));
    return ['all', ...cats];
  }, [activeResource?.interviewItems]);

  const filteredInterviewItems = useMemo(() => {
    const items = activeResource?.interviewItems || [];
    if (interviewCategory === 'all') return items;
    return items.filter((i) => i.category === interviewCategory);
  }, [activeResource?.interviewItems, interviewCategory]);

  if (!activeResource) {
    return (
      <div className="w-full bg-[#f8fafc] min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold text-[#152e4d]">Exam Prep Resource Not Found</h1>
          <p className="text-sm text-slate-600">
            Explore all practice exams, cheat sheets, interview banks, and cost calculators in the Exam Prep Hub.
          </p>
          <button
            type="button"
            onClick={onNavigateHub}
            className="px-5 py-2.5 rounded-xl bg-[#ea6d24] text-white text-sm font-semibold cursor-pointer"
          >
            Back to Exam Prep Hub
          </button>
        </div>
      </div>
    );
  }

  const handleCopyCommand = (text: string, rowKey: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(rowKey);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === rowKey ? null : prev));
    }, 1800);
  };

  const scrollToGate = () => {
    const el = document.getElementById('lead-unlock-gate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const previewCount = activeResource.openPreviewCount || 2;
  const allQuestions = activeResource.questions || [];
  const previewQuestions = allQuestions.slice(0, previewCount);
  const lockedQuestionsCount = Math.max(0, allQuestions.length - previewCount);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Masthead */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500"
          >
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
            <a
              href="/exam-prep"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHub();
              }}
              className="hover:text-[#ea6d24] transition-colors font-semibold"
            >
              Exam Prep
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">{activeResource.shortTitle}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="text-[#ea6d24] font-bold">{activeResource.topicTrack}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-bold text-[#152e4d]">{activeResource.examCode}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeResource.durationLabel}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activeResource.questionCountLabel}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                {activeResource.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeResource.excerpt}
              </p>
            </div>

            {activeResource.type === 'practice_test' && !unlockedProfile && (
              <button
                type="button"
                onClick={scrollToGate}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-bold text-sm transition-colors cursor-pointer shrink-0 min-h-[46px]"
              >
                <LockOpen className="w-4 h-4" />
                <span>Start Full Practice Exam</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Practice Test Mode */}
        {activeResource.type === 'practice_test' && (
          <div className="space-y-8">
            {/* Domain Weights Strip (Always Indexable) */}
            {activeResource.domainWeights && activeResource.domainWeights.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-[#152e4d] flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-[#ea6d24]" />
                    <span>Official {activeResource.examCode} Exam Blueprint &amp; Weightings</span>
                  </h2>
                  <span className="text-xs font-mono tabular-nums font-semibold text-slate-500">
                    Passing Target: {activeResource.passingScoreLabel}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {activeResource.domainWeights.map((dw) => (
                    <div
                      key={dw.name}
                      className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1"
                    >
                      <p className="text-base font-extrabold font-mono tabular-nums text-[#ea6d24]">
                        {dw.weight}
                      </p>
                      <p className="text-xs font-semibold text-[#152e4d] leading-snug">{dw.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isLoadingBank && allQuestions.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 flex items-center justify-center gap-3 text-sm font-semibold text-slate-600">
                <span className="w-4 h-4 rounded-full border-2 border-[#ea6d24] border-t-transparent animate-spin" />
                <span>Loading {activeResource.examCode} interactive question bank...</span>
              </div>
            ) : unlockedProfile ? (
              <PracticeExamSimulator
                resource={activeResource}
                unlockedProfile={unlockedProfile}
                onNavigateLink={onNavigateLink}
                onOpenAdvisorModal={onOpenAdvisorModal}
              />
            ) : (
              /* Hybrid Indexable Preview + Mandatory Lead Gate */
              <div className="space-y-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-bold text-[#152e4d]">
                      Open Sample Questions ({previewQuestions.length} of {allQuestions.length})
                    </h2>
                    <span className="text-xs font-semibold text-slate-500">
                      Try the interactive sample questions below before starting the full simulator
                    </span>
                  </div>

                  {previewQuestions.map((q, qIdx) => {
                    const chosen = previewAnswers[q.id];
                    const hasAnswered = typeof chosen === 'number';
                    return (
                      <article
                        key={q.id}
                        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
                            Sample Question {qIdx + 1} · {q.domain}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Free Open Preview
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#152e4d] leading-relaxed">
                          {q.prompt}
                        </h3>

                        <div className="grid grid-cols-1 gap-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isPicked = chosen === optIdx;
                            const isRight = optIdx === q.correctIndex;
                            let cls =
                              'border-slate-200 bg-white hover:border-[#ea6d24]/70 text-slate-800';
                            if (hasAnswered) {
                              if (isRight) {
                                cls = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                              } else if (isPicked && !isRight) {
                                cls = 'border-red-400 bg-red-50 text-red-900';
                              }
                            }
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setPreviewAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                                }
                                className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer ${cls}`}
                              >
                                <span className="w-6 h-6 rounded-md bg-[#f8fafc] border border-slate-300 font-mono text-xs font-bold text-[#152e4d] flex items-center justify-center shrink-0 mt-0.5">
                                  {OPTION_LETTERS[optIdx]}
                                </span>
                                <span className="text-sm flex-1">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && (
                          <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <strong className="text-[#152e4d]">
                              Correct Option {OPTION_LETTERS[q.correctIndex]} — Rationale:{' '}
                            </strong>
                            {q.explanation}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>

                {/* Gated Locked Notice + Inline Lead Gate */}
                <div id="lead-unlock-gate" className="scroll-mt-24 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm font-semibold text-[#152e4d]">
                      <Lock className="w-4 h-4 text-[#ea6d24] shrink-0" />
                      <span>
                        {lockedQuestionsCount} additional scenario questions + timed simulator &amp;
                        domain scorecard are ready below.
                      </span>
                    </div>
                  </div>

                  <ExamPrepLeadGate
                    resource={activeResource}
                    onUnlocked={(profile) => setUnlockedProfile(profile)}
                    onLeadSubmitted={onLeadSubmitted}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Subnet Calculator Header (when type === 'subnet_calculator') */}
        {activeResource.type === 'subnet_calculator' && (
          <SubnetCidrCalculator />
        )}

        {/* Cheat Sheet & CIDR Reference Tables Mode */}
        {(activeResource.type === 'cheat_sheet' || activeResource.type === 'subnet_calculator') && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={cheatFilter}
                  onChange={(e) => setCheatFilter(e.target.value)}
                  placeholder="Filter ports, CIDR masks, Linux flags, Terraform or kubectl..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-[#f8fafc] text-[#152e4d] focus:outline-none focus:bg-white focus:border-[#ea6d24]"
                />
              </div>
              <button
                type="button"
                onClick={() => onOpenAdvisorModal('advisor', activeResource.title)}
                className="px-4 py-2.5 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs font-semibold cursor-pointer shrink-0"
              >
                Request Live Lab Walkthrough
              </button>
            </div>

            {isLoadingBank && !(activeResource.cheatSheetSections || []).length ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 flex items-center justify-center gap-3 text-sm font-semibold text-slate-600">
                <span className="w-4 h-4 rounded-full border-2 border-[#ea6d24] border-t-transparent animate-spin" />
                <span>Loading command tables and quick reference...</span>
              </div>
            ) : (
              (activeResource.cheatSheetSections || []).map((section) => {
                const q = cheatFilter.trim().toLowerCase();
                const visibleRows = q
                  ? section.rows.filter((r) =>
                      r.cells.some((c) => c.toLowerCase().includes(q))
                    )
                  : section.rows;

                if (visibleRows.length === 0) return null;

                return (
                  <section
                    key={section.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4"
                  >
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-[#152e4d]">{section.title}</h2>
                      <p className="text-xs sm:text-sm text-slate-600">{section.subtitle}</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-slate-200 text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#152e4d]">
                            {section.headers.map((h) => (
                              <th key={h} className="py-3 px-4 font-bold uppercase tracking-wide text-xs">
                                {h}
                              </th>
                            ))}
                            <th className="py-3 px-3 font-bold uppercase tracking-wide text-xs text-right">
                              Copy
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 tabular-nums">
                          {visibleRows.map((row, rIdx) => {
                            const key = `${section.id}-${rIdx}`;
                            const textToCopy = row.copyText || row.cells.join(' — ');
                            const isCopied = copiedKey === key;
                            return (
                              <tr key={key} className="hover:bg-slate-50/80 transition-colors">
                                {row.cells.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-3 px-4 ${
                                      cIdx === 0
                                        ? 'font-bold text-[#152e4d]'
                                        : cIdx === 1 && activeResource.slug.includes('kubectl')
                                        ? 'font-mono text-xs text-[#152e4d] bg-slate-50'
                                        : 'text-slate-600'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                                <td className="py-3 px-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleCopyCommand(textToCopy, key)}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border cursor-pointer transition-colors ${
                                      isCopied
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-[#ea6d24] hover:text-[#ea6d24]'
                                    }`}
                                  >
                                    {isCopied ? (
                                      <>
                                        <Check className="w-3.5 h-3.5" />
                                        <span>Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        )}

        {/* Interview Q&A Bank Mode */}
        {activeResource.type === 'interview_qa' && (
          <div className="space-y-6">
            {isLoadingBank && !filteredInterviewItems.length && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 flex items-center justify-center gap-3 text-sm font-semibold text-slate-600">
                <span className="w-4 h-4 rounded-full border-2 border-[#ea6d24] border-t-transparent animate-spin" />
                <span>Loading technical interview Q&amp;A bank...</span>
              </div>
            )}
            {interviewCategories.length > 2 && (
              <div className="flex flex-wrap items-center gap-2">
                {interviewCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setInterviewCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      interviewCategory === cat
                        ? 'bg-[#152e4d] text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-[#ea6d24]'
                    }`}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filteredInterviewItems.map((item, idx) => {
                const isOpen = Boolean(openQaIndices[idx]);
                return (
                  <article
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenQaIndices((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
                          Q{idx + 1} · {item.category}
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-[#152e4d] leading-snug">
                          {item.question}
                        </h2>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#ea6d24] shrink-0 mt-1 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-[#fcfdfe] space-y-3">
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                          {item.answer}
                        </p>
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                          <strong className="text-[#152e4d]">Interviewer Follow-Up Tip: </strong>
                          {item.followUpTip}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Cost & Salary Calculator Mode */}
        {activeResource.type === 'cost_calculator' && (
          <ExamCostSalaryCalculator
            onNavigateLink={onNavigateLink}
            onOpenAdvisorModal={onOpenAdvisorModal}
          />
        )}

        {/* Recommended Official Course + Regional Hubs Strip */}
        <section className="bg-[#152e4d] text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#f7944d]">
              Turn Preparation into Certification
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold">{activeResource.relatedCourseLabel}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Learnify pairs live instructor mentorship, 24/7 hands-on labs, and exam readiness drills across UK (GBP), Europe (EUR), UAE (AED), and South Africa (ZAR).
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 text-white font-semibold">
                <Globe2 className="w-3.5 h-3.5 text-[#f7944d]" />
                Regional Cohorts:
              </span>
              {[
                { label: 'UK', href: '/uk' },
                { label: 'Europe', href: '/eu' },
                { label: 'Germany', href: '/de' },
                { label: 'Netherlands', href: '/nl' },
                { label: 'UAE', href: '/ae' },
                { label: 'South Africa', href: '/za' },
              ].map((hub, idx) => (
                <React.Fragment key={hub.href}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <a
                    href={hub.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLink(hub.href);
                    }}
                    className="hover:text-[#f7944d] underline underline-offset-4"
                  >
                    {hub.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`/course/${activeResource.relatedCourseId}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigateLink(`/course/${activeResource.relatedCourseId}`);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#152e4d] hover:bg-orange-50 font-bold text-sm transition-colors"
            >
              <span>View Course</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('advisor', activeResource.title)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Talk to Advisor</span>
            </button>
          </div>
        </section>

        {/* FAQs */}
        {activeResource.faqs.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[#152e4d]">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {activeResource.faqs.map((faq, idx) => {
                const isOpen = Boolean(openFaqIndices[idx]);
                return (
                  <div key={faq.q} className="bg-white">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaqIndices((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold text-[#152e4d]">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#ea6d24] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#fcfdfe] border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* More Exam Prep Resources */}
        {otherResources.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-[#152e4d]">More Exam Prep Tools</h2>
              <a
                href="/exam-prep"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHub();
                }}
                className="text-xs font-semibold text-[#ea6d24] hover:underline"
              >
                Explore All Resources
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherResources.map((item) => (
                <a
                  key={item.slug}
                  href={`/exam-prep/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectResource(item.slug);
                  }}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#ea6d24]/70 transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-[#ea6d24] font-mono tabular-nums">
                      {item.topicTrack} · {item.examCode}
                    </p>
                    <h3 className="text-sm font-bold text-[#152e4d] leading-snug">
                      {item.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ea6d24] pt-2">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
