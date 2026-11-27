import React, { useState } from 'react';
import {
  CheckCircle2,
  Globe2,
  LockOpen,
  Mail,
  ShieldCheck,
  User,
  Briefcase,
} from 'lucide-react';
import { submitLead } from '../services/cmsService';
import { trackLeadSubmission } from '../utils/analytics';
import { ExamPrepResource } from '../types';
import { PhoneCountryInput } from './PhoneCountryInput';

export const EXAM_PREP_UNLOCK_KEY = 'learnify_exam_prep_unlocked_v1';

export interface ExamPrepUnlockedProfile {
  fullName: string;
  email: string;
  region: string;
  unlockedAt: string;
}

export function getStoredExamPrepUnlock(): ExamPrepUnlockedProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(EXAM_PREP_UNLOCK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
      return parsed as ExamPrepUnlockedProfile;
    }
  } catch {
    // ignore invalid JSON
  }
  return null;
}

interface ExamPrepLeadGateProps {
  resource: ExamPrepResource;
  onUnlocked: (profile: ExamPrepUnlockedProfile) => void;
  onLeadSubmitted?: () => void;
  variant?: 'inline' | 'modal';
  onCloseModal?: () => void;
}

const REGION_OPTIONS = [
  'United Kingdom (GMT / GBP)',
  'Europe (Germany / Netherlands / EU)',
  'UAE & Middle East (Dubai / Riyadh)',
  'South Africa (Johannesburg / Cape Town)',
  'United States & Canada',
  'India & APAC',
  'Other (Specify custom city / country)',
];

export const ExamPrepLeadGate: React.FC<ExamPrepLeadGateProps> = ({
  resource,
  onUnlocked,
  onLeadSubmitted,
  variant = 'inline',
  onCloseModal,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState(REGION_OPTIONS[0]);
  const [customRegion, setCustomRegion] = useState('');
  const [jobRole, setJobRole] = useState('IT / Cloud / Security Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      setErrorMessage('Please enter your full name to unlock the practice simulator.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid work or personal email address.');
      return;
    }
    if (cleanPhone.length < 6) {
      setErrorMessage('Please provide your phone or WhatsApp number with country code.');
      return;
    }

    const finalRegion = region.startsWith('Other') ? customRegion.trim() : region;
    if (region.startsWith('Other') && !finalRegion) {
      setErrorMessage('Please specify your custom city, country, or region.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        inquiryType: 'exam_prep',
        selectedDomain: resource.topicTrack,
        courseTitle: resource.title,
        courseId: resource.relatedCourseId,
        jobRole,
        preferredFormat: finalRegion,
        message: `Unlocked interactive exam prep: ${resource.examCode} (${resource.shortTitle}) from ${finalRegion}`,
      });

      trackLeadSubmission('exam_prep', resource.title);
      if (onLeadSubmitted) onLeadSubmitted();

      const profile: ExamPrepUnlockedProfile = {
        fullName: cleanName,
        email: cleanEmail,
        region: finalRegion,
        unlockedAt: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(EXAM_PREP_UNLOCK_KEY, JSON.stringify(profile));
      }
      onUnlocked(profile);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unable to process form right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-[#152e4d] text-white px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[#f7944d]">
            Interactive Exam Prep Access
          </p>
          <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
            Unlock Full {resource.examCode} Simulator &amp; Domain Scorecard
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Complete quick registration once to access all {resource.questionCountLabel}, timed mock testing, and answer rationales across every quiz.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/10 border border-white/15 items-center justify-center shrink-0">
          <LockOpen className="w-6 h-6 text-[#ea6d24]" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-[#f8fafc] border border-slate-200 rounded-xl p-3.5">
          <div className="flex items-center gap-2 font-semibold text-[#152e4d]">
            <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0" />
            <span>Timed + Instant Study Mode</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-[#152e4d]">
            <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0" />
            <span>Weak-Domain Accuracy Breakdown</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-[#152e4d]">
            <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0" />
            <span>Full Step-by-Step Rationales</span>
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
          >
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`prep-gate-name-${variant}`}
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id={`prep-gate-name-${variant}`}
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#152e4d] focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`prep-gate-email-${variant}`}
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id={`prep-gate-email-${variant}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#152e4d] focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`prep-gate-phone-${variant}`}
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Phone / WhatsApp *
            </label>
            <PhoneCountryInput
              id={`prep-gate-phone-${variant}`}
              required
              value={phone}
              onChange={(val) => setPhone(val)}
            />
          </div>

          <div>
            <label
              htmlFor={`prep-gate-region-${variant}`}
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Target Region *
            </label>
            <div className="space-y-2">
              <div className="relative">
                <Globe2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <select
                  id={`prep-gate-region-${variant}`}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#152e4d] focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent cursor-pointer"
                >
                  {REGION_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              {region.startsWith('Other') && (
                <input
                  type="text"
                  required
                  value={customRegion}
                  onChange={(e) => setCustomRegion(e.target.value)}
                  placeholder="Enter your City, State or Country..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#ea6d24] bg-white text-[#152e4d] focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor={`prep-gate-role-${variant}`}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Current Role or Goal
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <select
              id={`prep-gate-role-${variant}`}
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#152e4d] focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent cursor-pointer"
            >
              <option value="IT / Cloud / Security Engineer">IT / Cloud / Security Engineer</option>
              <option value="SOC / Network Support Candidate">SOC / Network Support Candidate</option>
              <option value="Data / BI Analyst">Data / BI Analyst</option>
              <option value="Career Switcher / Upcoming Exam">Career Switcher / Upcoming Exam</option>
              <option value="Team Lead / L&D Manager">Team Lead / L&amp;D Manager</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Immediate unlock after submit. Optional 1-on-1 study plan advice available.</span>
          </p>

          <div className="flex items-center gap-2 shrink-0">
            {variant === 'modal' && onCloseModal && (
              <button
                type="button"
                onClick={onCloseModal}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-bold text-sm transition-colors cursor-pointer disabled:opacity-60 min-h-[44px]"
            >
              <LockOpen className="w-4 h-4" />
              <span>{isSubmitting ? 'Unlocking Simulator...' : 'Start Practice Exam'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div className="max-w-2xl w-full my-6">{formContent}</div>
      </div>
    );
  }

  return formContent;
};
