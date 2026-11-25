import React, { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Globe2, TrendingUp } from 'lucide-react';
import { CALCULATOR_COURSES, CALCULATOR_REGIONS } from '../data/examPrepResources';

interface ExamCostSalaryCalculatorProps {
  onNavigateLink: (href: string) => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

export const ExamCostSalaryCalculator: React.FC<ExamCostSalaryCalculatorProps> = ({
  onNavigateLink,
  onOpenAdvisorModal,
}) => {
  const [regionCode, setRegionCode] = useState<'uk' | 'eu' | 'ae' | 'za' | 'us' | 'in'>('uk');
  const [courseId, setCourseId] = useState<string>('security-plus');
  const [includeTraining, setIncludeTraining] = useState<boolean>(true);
  const [includeRetakeBuffer, setIncludeRetakeBuffer] = useState<boolean>(false);

  const region = useMemo(
    () => CALCULATOR_REGIONS.find((r) => r.code === regionCode) || CALCULATOR_REGIONS[0],
    [regionCode]
  );

  const course = useMemo(
    () => CALCULATOR_COURSES.find((c) => c.id === courseId) || CALCULATOR_COURSES[0],
    [courseId]
  );

  const formatMoney = (amount: number, roundToHundred = false) => {
    const val = roundToHundred ? Math.round(amount / 100) * 100 : Math.round(amount);
    return `${region.symbol}${val.toLocaleString('en-US')}`;
  };

  const voucherLocal = course.voucherUsd * region.fxFromUsd;
  const retakeBundleLocal = course.retakeBundleUsd * region.fxFromUsd;
  const trainingLocal = course.trainingUsd * region.fxFromUsd;

  const examSubtotal = includeRetakeBuffer ? retakeBundleLocal : voucherLocal;
  const totalBudget = examSubtotal + (includeTraining ? trainingLocal : 0);

  const salaryMin = course.baseSalaryMinUsd * region.salaryMultiplier;
  const salaryMax = course.baseSalaryMaxUsd * region.salaryMultiplier;
  const midpointSalary = (salaryMin + salaryMax) / 2;
  const annualUpliftEstimate = Math.round(
    (midpointSalary * (course.avgSalaryUpliftPct / 100)) / 100
  ) * 100;
  const paybackMonths = Math.max(
    1,
    Math.ceil((totalBudget / Math.max(1, annualUpliftEstimate)) * 12)
  );

  return (
    <div className="space-y-8">
      {/* Interactive Configuration Deck */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-[#152e4d] text-white px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#f7944d]">
              Interactive Multi-Region Calculator
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Certification Fee, Retake &amp; Salary ROI Estimator
            </h2>
          </div>
          <Calculator className="w-8 h-8 text-[#ea6d24] shrink-0" />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="calc-region-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                1. Select Country / Billing Currency
              </label>
              <select
                id="calc-region-select"
                value={regionCode}
                onChange={(e) => setRegionCode(e.target.value as any)}
                className="w-full px-3.5 py-3 text-sm font-semibold rounded-xl border border-slate-300 bg-[#f8fafc] text-[#152e4d] focus:outline-none focus:border-[#ea6d24] cursor-pointer"
              >
                {CALCULATOR_REGIONS.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.label} ({r.currency})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="calc-course-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
              >
                2. Select Certification Track
              </label>
              <select
                id="calc-course-select"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-3.5 py-3 text-sm font-semibold rounded-xl border border-slate-300 bg-[#f8fafc] text-[#152e4d] focus:outline-none focus:border-[#ea6d24] cursor-pointer"
              >
                {CALCULATOR_COURSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.examCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#152e4d] cursor-pointer bg-[#f8fafc] border border-slate-200 px-4 py-2.5 rounded-xl">
              <input
                type="checkbox"
                checked={includeTraining}
                onChange={(e) => setIncludeTraining(e.target.checked)}
                className="w-4 h-4 accent-[#ea6d24] cursor-pointer"
              />
              <span>Include Live Instructor Bootcamp + Sandbox Labs</span>
            </label>

            <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#152e4d] cursor-pointer bg-[#f8fafc] border border-slate-200 px-4 py-2.5 rounded-xl">
              <input
                type="checkbox"
                checked={includeRetakeBuffer}
                onChange={(e) => setIncludeRetakeBuffer(e.target.checked)}
                className="w-4 h-4 accent-[#ea6d24] cursor-pointer"
              />
              <span>Add Official Retake Safety Voucher</span>
            </label>
          </div>

          {/* Numeric Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Exam Voucher Cost
              </p>
              <p className="text-2xl font-extrabold font-mono tabular-nums text-[#152e4d]">
                {formatMoney(examSubtotal)}
              </p>
              <p className="text-[11px] text-slate-500">
                {includeRetakeBuffer ? 'Includes Retake Voucher' : 'Single Exam Attempt'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estimated Total Budget
              </p>
              <p className="text-2xl font-extrabold font-mono tabular-nums text-[#ea6d24]">
                {formatMoney(totalBudget)}
              </p>
              <p className="text-[11px] text-slate-500">{region.currency} · {region.vatNote}</p>
            </div>

            <div className="p-5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Certified Market Salary
              </p>
              <p className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-[#152e4d]">
                {formatMoney(salaryMin, true)} – {formatMoney(salaryMax, true)}
              </p>
              <p className="text-[11px] text-slate-500">Annual median range ({region.currency})</p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Est. Year-1 Uplift</span>
              </p>
              <p className="text-2xl font-extrabold font-mono tabular-nums text-emerald-900">
                +{formatMoney(annualUpliftEstimate, true)}
              </p>
              <p className="text-[11px] text-emerald-800 font-semibold">
                Est. Payback: ~{paybackMonths} month{paybackMonths > 1 ? 's' : ''} (+{course.avgSalaryUpliftPct}% avg uplift)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={course.courseHref}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateLink(course.courseHref);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <span>Open {course.examCode} Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={region.hubHref}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateLink(region.hubHref);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-[#152e4d] text-xs sm:text-sm font-semibold transition-colors"
              >
                <Globe2 className="w-4 h-4 text-[#ea6d24]" />
                <span>View {region.currency} Regional Hub</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenAdvisorModal(
                  'corporate_quote',
                  `${course.name} (${region.currency} Budget Quote)`
                )
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Request Voucher + Batch Bundle Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Certification Comparison Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#152e4d]">
            2026 Exam Voucher &amp; Salary Benchmark Table ({region.label})
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Live conversion reference in {region.currency} across Learnify’s top-enrolled IT and Cloud certifications.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#152e4d]">
                <th className="py-3 px-4 font-bold">Certification &amp; Code</th>
                <th className="py-3 px-4 font-bold">Exam Voucher ({region.currency})</th>
                <th className="py-3 px-4 font-bold">Retake Bundle ({region.currency})</th>
                <th className="py-3 px-4 font-bold">Certified Salary Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 tabular-nums">
              {CALCULATOR_COURSES.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setCourseId(row.id)}
                  className={`cursor-pointer transition-colors ${
                    row.id === courseId ? 'bg-orange-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-[#152e4d]">
                    {row.name}{' '}
                    <span className="font-mono text-xs text-[#ea6d24] ml-1">({row.examCode})</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {formatMoney(row.voucherUsd * region.fxFromUsd)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {formatMoney(row.retakeBundleUsd * region.fxFromUsd)}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-[#152e4d]">
                    {formatMoney(row.baseSalaryMinUsd * region.salaryMultiplier, true)} –{' '}
                    {formatMoney(row.baseSalaryMaxUsd * region.salaryMultiplier, true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
