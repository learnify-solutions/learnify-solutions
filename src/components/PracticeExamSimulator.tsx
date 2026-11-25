import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Flag,
  RotateCcw,
  Share2,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { ExamPrepResource, PracticeQuestion } from '../types';
import { ExamPrepUnlockedProfile } from './ExamPrepLeadGate';

interface PracticeExamSimulatorProps {
  resource: ExamPrepResource;
  unlockedProfile: ExamPrepUnlockedProfile;
  onNavigateLink: (href: string) => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const PracticeExamSimulator: React.FC<PracticeExamSimulatorProps> = ({
  resource,
  unlockedProfile,
  onNavigateLink,
  onOpenAdvisorModal,
}) => {
  const questions: PracticeQuestion[] = resource.questions || [];
  const totalSeconds = (questions.length >= 40 ? 60 : 25) * 60;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Record<string, boolean>>({});
  const [studyMode, setStudyMode] = useState(true);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect'>('all');
  const [copiedBadge, setCopiedBadge] = useState(false);

  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setFlaggedIds({});
    setRevealedIds({});
    setSecondsLeft(totalSeconds);
    setIsSubmitted(false);
    setReviewFilter('all');
  }, [resource.slug, totalSeconds]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQuestion = questions[currentIdx];

  const answeredCount = useMemo(
    () => questions.filter((q) => typeof answers[q.id] === 'number').length,
    [questions, answers]
  );

  const scoreSummary = useMemo(() => {
    let correct = 0;
    const domainMap: Record<string, { total: number; correct: number }> = {};

    for (const q of questions) {
      if (!domainMap[q.domain]) {
        domainMap[q.domain] = { total: 0, correct: 0 };
      }
      domainMap[q.domain].total += 1;
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
        domainMap[q.domain].correct += 1;
      }
    }

    const total = questions.length || 1;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= 75;
    return {
      correct,
      total,
      percent,
      passed,
      domains: Object.entries(domainMap).map(([name, stats]) => ({
        name,
        correct: stats.correct,
        total: stats.total,
        percent: Math.round((stats.correct / stats.total) * 100),
      })),
    };
  }, [questions, answers]);

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted || !currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIdx }));
    if (studyMode) {
      setRevealedIds((prev) => ({ ...prev, [currentQuestion.id]: true }));
    }
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedIds((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleResetExam = () => {
    setCurrentIdx(0);
    setAnswers({});
    setFlaggedIds({});
    setRevealedIds({});
    setSecondsLeft(totalSeconds);
    setIsSubmitted(false);
    setReviewFilter('all');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isSubmitted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName || '')) {
        return;
      }
      if (e.key === '1' || e.key === 'a' || e.key === 'A') handleSelectOption(0);
      else if (e.key === '2' || e.key === 'b' || e.key === 'B') handleSelectOption(1);
      else if (e.key === '3' || e.key === 'c' || e.key === 'C') handleSelectOption(2);
      else if (e.key === '4' || e.key === 'd' || e.key === 'D') handleSelectOption(3);
      else if (e.key === 'ArrowRight' && currentIdx < questions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
        setCurrentIdx((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (questions.length === 0) {
    return null;
  }

  if (isSubmitted) {
    const reviewQuestions =
      reviewFilter === 'incorrect'
        ? questions.filter((q) => answers[q.id] !== q.correctIndex)
        : questions;

    return (
      <div className="space-y-8">
        {/* Shareable LinkedIn / Twitter Scorecard Badge Generator */}
        <div className="bg-gradient-to-br from-[#152e4d] via-[#1a385d] to-[#0f223a] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-6">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold tracking-wider uppercase border border-orange-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Scorecard &amp; Digital Badge</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Share Your {resource.examCode} Achievement on LinkedIn &amp; X
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Showcase your readiness score ({scoreSummary.percent}%) to recruiters and engineering peers with our instant badge generator.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const shareText = `I just scored ${scoreSummary.percent}% on the ${resource.title} Practice Exam simulator on Learnify! 🚀 Preparing for official certification day. Check out Learnify Exam Prep: https://www.learnify-solutions.com`;
                  navigator.clipboard.writeText(shareText);
                  setCopiedBadge(true);
                  setTimeout(() => setCopiedBadge(false), 3000);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedBadge ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBadge ? 'Copied Badge Text!' : 'Copy Share Text'}</span>
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.learnify-solutions.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#095196] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Share to LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Digital Badge Preview Card */}
          <div className="bg-white text-[#152e4d] rounded-xl p-6 border-2 border-orange-500/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#152e4d] text-orange-400 flex items-center justify-center font-black text-2xl shadow-inner shrink-0 border border-orange-500/30">
                {scoreSummary.percent}%
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  Learnify Verified Scorecard
                </p>
                <h4 className="text-base sm:text-lg font-extrabold text-[#152e4d] leading-snug">
                  {resource.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  Awarded to <span className="font-bold text-[#152e4d]">{unlockedProfile.fullName}</span> · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0 text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{scoreSummary.correct}/{scoreSummary.total} Correct</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">ID: LFY-{resource.examCode}-{Math.abs(unlockedProfile.email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0))}-2026</span>
            </div>
          </div>
        </div>

        {/* Domain Readiness Scorecard */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="bg-[#152e4d] text-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#f7944d]">
                Scorecard · {unlockedProfile.fullName}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {resource.examCode} Readiness: {scoreSummary.percent}% ({scoreSummary.correct}/{scoreSummary.total})
              </h2>
              <p className="text-sm text-slate-300 flex items-center gap-2">
                {scoreSummary.passed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Strong exam readiness — above 75% benchmark for {resource.examCode}.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-[#f7944d] shrink-0" />
                    <span>Needs targeted domain review below 75% benchmark before booking official testing.</span>
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleResetExam}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Mock Test</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenAdvisorModal(
                    'advisor',
                    `${resource.examCode} Score Review (${scoreSummary.percent}%)`
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Book Free Weak-Domain Review</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-bold text-[#152e4d]">Domain-by-Domain Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoreSummary.domains.map((dom) => (
                <div
                  key={dom.name}
                  className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#152e4d]">
                    <span className="truncate">{dom.name}</span>
                    <span className="font-mono tabular-nums shrink-0">
                      {dom.correct}/{dom.total} ({dom.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        dom.percent >= 75 ? 'bg-emerald-600' : 'bg-[#ea6d24]'
                      } ${
                        dom.percent === 100
                          ? 'w-full'
                          : dom.percent >= 75
                          ? 'w-3/4'
                          : dom.percent >= 50
                          ? 'w-1/2'
                          : dom.percent > 0
                          ? 'w-1/4'
                          : 'w-[4%]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
                  Recommended Live Bootcamp
                </p>
                <p className="text-sm font-bold text-[#152e4d]">{resource.relatedCourseLabel}</p>
                <p className="text-xs text-slate-600">
                  Close remaining weak domains with 1-on-1 certified trainers, hands-on lab sandboxes, and full exam prep.
                </p>
              </div>
              <a
                href={`/course/${resource.relatedCourseId}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateLink(`/course/${resource.relatedCourseId}`);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
              >
                <span>View Official Course</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-[#152e4d]">Detailed Answer Rationales</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  reviewFilter === 'all'
                    ? 'bg-[#152e4d] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  reviewFilter === 'incorrect'
                    ? 'bg-[#152e4d] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Missed / Unanswered ({questions.length - scoreSummary.correct})
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {reviewQuestions.map((q) => {
              const userChoice = answers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              const qNumber = questions.findIndex((item) => item.id === q.id) + 1;
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-xl border border-slate-200 bg-[#fcfdfe] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-500">
                      Question {qNumber} · {q.domain}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{typeof userChoice === 'number' ? 'Incorrect' : 'Unanswered'}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-[#152e4d] leading-snug">
                    {q.prompt}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isRightOption = oIdx === q.correctIndex;
                      const isUserWrong = userChoice === oIdx && !isRightOption;
                      return (
                        <div
                          key={opt}
                          className={`px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${
                            isRightOption
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                              : isUserWrong
                              ? 'bg-red-50 border-red-300 text-red-900'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="font-mono font-bold shrink-0">
                            {OPTION_LETTERS[oIdx]}.
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isRightOption && (
                            <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                              Correct Answer
                            </span>
                          )}
                          {isUserWrong && (
                            <span className="text-[11px] font-bold text-red-700 shrink-0">
                              Your Pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-[#152e4d]">Rationale: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}

            {reviewQuestions.length === 0 && (
              <p className="text-sm text-emerald-700 font-semibold py-4 text-center">
                Zero missed questions—you answered every item correctly!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const chosenIdx = answers[currentQuestion.id];
  const isRevealed = Boolean(revealedIds[currentQuestion.id]);
  const isAnsweredCorrectly = chosenIdx === currentQuestion.correctIndex;

  return (
    <div className="space-y-6">
      {/* Top Telemetry Bar */}
      <div className="bg-[#152e4d] text-white rounded-2xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          <span className="font-bold text-[#f7944d]">
            Unlocked: {unlockedProfile.fullName}
          </span>
          <span className="text-white/30">|</span>
          <span className="font-mono tabular-nums font-bold">
            Q{currentIdx + 1} / {questions.length}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono tabular-nums bg-white/10 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-[#f7944d]" />
            <span>{formatTimer(secondsLeft)}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStudyMode(!studyMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              studyMode
                ? 'bg-[#ea6d24] border-[#ea6d24] text-white'
                : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20'
            }`}
          >
            {studyMode ? 'Mode: Instant Study Rationale' : 'Mode: Timed Blind Exam'}
          </button>
          <button
            type="button"
            onClick={() => setIsSubmitted(true)}
            className="px-4 py-1.5 rounded-lg bg-white text-[#152e4d] hover:bg-orange-50 text-xs font-bold transition-colors cursor-pointer"
          >
            Finish &amp; Score ({answeredCount}/{questions.length})
          </button>
        </div>
      </div>

      {/* Two-Zone EdTech Simulator Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Main Stage (65% -> 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
              Domain · {currentQuestion.domain}
            </span>
            <button
              type="button"
              onClick={toggleFlag}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
                flaggedIds[currentQuestion.id]
                  ? 'bg-orange-50 border-[#ea6d24] text-[#ea6d24]'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{flaggedIds[currentQuestion.id] ? 'Flagged' : 'Flag Question'}</span>
            </button>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-[#152e4d] leading-relaxed">
            {currentQuestion.prompt}
          </h2>

          <div className="space-y-3" role="radiogroup" aria-label="Answer options">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = chosenIdx === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let rowClasses =
                'border-slate-200 bg-white hover:border-[#ea6d24]/70 hover:bg-[#fcfdfe] text-slate-800';
              if (isRevealed) {
                if (isCorrectOption) {
                  rowClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrectOption) {
                  rowClasses = 'border-red-400 bg-red-50 text-red-950';
                }
              } else if (isSelected) {
                rowClasses = 'border-[#ea6d24] bg-orange-50/70 text-[#152e4d] font-semibold';
              }

              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${rowClasses}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-[#152e4d] text-white border-[#152e4d]'
                        : 'bg-[#f8fafc] text-[#152e4d] border-slate-300'
                    }`}
                  >
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="text-sm leading-relaxed flex-1">{option}</span>
                  {isRevealed && isCorrectOption && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct</span>
                    </span>
                  )}
                  {isRevealed && isSelected && !isCorrectOption && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isRevealed && (
            <div
              className={`p-4 rounded-xl border space-y-1.5 ${
                isAnsweredCorrectly
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : 'bg-orange-50/70 border-orange-200'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[#152e4d] flex items-center gap-1.5">
                {isAnsweredCorrectly ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct Selection ({OPTION_LETTERS[currentQuestion.correctIndex]})</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-[#ea6d24]" />
                    <span>
                      Answer Key: Option {OPTION_LETTERS[currentQuestion.correctIndex]}
                    </span>
                  </>
                )}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-[#152e4d] hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <span>Submit &amp; View Scorecard</span>
                <CheckCircle2 className="w-4 h-4 text-[#ea6d24]" />
              </button>
            )}
          </div>
        </div>

        {/* Right Control Deck (35% -> 4 cols) */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Question Navigator
              </h3>
              <span className="text-xs font-mono tabular-nums font-bold text-[#152e4d]">
                {answeredCount}/{questions.length} Done
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isActive = idx === currentIdx;
                const isAnswered = typeof answers[q.id] === 'number';
                const isFlagged = Boolean(flaggedIds[q.id]);

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    aria-label={`Jump to question ${idx + 1}${isFlagged ? ', flagged' : ''}${
                      isAnswered ? ', answered' : ', unanswered'
                    }`}
                    className={`relative h-10 rounded-lg font-mono tabular-nums text-xs font-bold border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#152e4d] text-white border-[#152e4d]'
                        : isAnswered
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-[#f8fafc] text-slate-700 border-slate-200 hover:border-[#ea6d24]'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ea6d24] border border-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#152e4d]" />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea6d24]" />
                Flagged
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Keyboard shortcuts: Keys 1–4 select options; Left/Right arrows switch questions.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
              Instructor-Led Lab Support
            </p>
            <h4 className="text-sm font-bold text-[#152e4d]">{resource.relatedCourseLabel}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need guided sandbox labs and live PBQ exam coaching before sitting {resource.examCode}?
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={`/course/${resource.relatedCourseId}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateLink(`/course/${resource.relatedCourseId}`);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs font-semibold text-center transition-colors"
              >
                Explore Course Syllabus
              </a>
              <button
                type="button"
                onClick={() => onOpenAdvisorModal('advisor', resource.title)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#152e4d] text-xs font-semibold cursor-pointer transition-colors"
              >
                Request Exam Voucher &amp; Dates
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
