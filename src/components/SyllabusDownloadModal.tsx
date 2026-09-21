import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  CheckCircle2,
  Building,
  User,
  Mail,
  Phone,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCw,
} from 'lucide-react';
import { Course } from '../types';
import { submitLead } from '../services/cmsService';
import { downloadCourseSyllabus } from '../utils/syllabusPdf';
import { trackLeadSubmission } from '../utils/analytics';

interface SyllabusDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSuccess?: () => void;
}

export const SyllabusDownloadModal: React.FC<SyllabusDownloadModalProps> = ({
  isOpen,
  onClose,
  course,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobRole: 'IT Professional',
    preferredFormat: course?.format || 'Live Online',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !course) return null;

  const fileName =
    course.syllabusFileName ||
    `${course.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Syllabus_Learnify.pdf`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, email, and phone number to download the syllabus.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit the lead/enquiry to Backend
      await submitLead({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        jobRole: formData.jobRole,
        preferredFormat: formData.preferredFormat,
        inquiryType: 'syllabus_download',
        courseTitle: course.title,
        courseId: course.id,
        selectedDomain: course.domain,
        message: `Downloaded official syllabus PDF for ${course.title} (${course.certificationVendor}). Role: ${formData.jobRole}, Format: ${formData.preferredFormat}`,
      });

      // 2. Trigger the PDF download
      await downloadCourseSyllabus(course);

      trackLeadSubmission('syllabus_download', course.title);
      setIsDownloaded(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Failed to submit syllabus download lead:', err);
      // Even if network fails, allow user to get syllabus but notify
      await downloadCourseSyllabus(course);
      setIsDownloaded(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadAgain = async () => {
    await downloadCourseSyllabus(course);
  };

  const handleResetAndClose = () => {
    setIsDownloaded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        id="syllabus-download-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[94vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDownloaded ? (
          <div className="space-y-3.5">
            {/* Header with Course Badge */}
            <div className="space-y-1.5 pr-6">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="bg-orange-50 text-[#ea6d24] border border-orange-200 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Official Curriculum Syllabus
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {course.certificationVendor || course.domain}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-[#152e4d] leading-snug">
                Download {course.title} Syllabus
              </h2>

              <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">
                Enter your details to instantly get the verified course curriculum, module breakdown, lab blueprint, and exam guide.
              </p>
            </div>

            {/* Course Summary Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 flex items-center justify-between gap-2 text-xs">
              <div className="min-w-0">
                <div className="font-bold text-[#152e4d] text-xs truncate">{course.title}</div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span>⏳ {course.duration}</span>
                  <span>•</span>
                  <span>🎯 {course.skillLevel || 'Intermediate'}</span>
                  <span>•</span>
                  <span>🌐 {course.format || 'Live Online'}</span>
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3" />
                  PDF Ready
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Full Name */}
                <div>
                  <label htmlFor="syllabus-full-name" className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      id="syllabus-full-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-orange-200 bg-white h-9"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="syllabus-email" className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      id="syllabus-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-orange-200 bg-white h-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Phone Number */}
                <div>
                  <label htmlFor="syllabus-phone" className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      id="syllabus-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-orange-200 bg-white h-9"
                    />
                  </div>
                </div>

                {/* Company / College */}
                <div>
                  <label htmlFor="syllabus-company" className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      id="syllabus-company"
                      type="text"
                      placeholder="e.g. Infosys, TCS, or Self"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-orange-200 bg-white h-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Role / Experience */}
                <div>
                  <label htmlFor="syllabus-role" className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Current Job Role / Profile
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <select
                      id="syllabus-role"
                      value={formData.jobRole}
                      onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-orange-200 bg-white cursor-pointer h-9"
                    >
                      <option value="IT Professional">IT Professional / Engineer</option>
                      <option value="Network / Cloud Engineer">Network / Cloud Engineer</option>
                      <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                      <option value="Team Lead / Manager">Team Lead / Manager</option>
                      <option value="Student / Fresher">Student / Fresher</option>
                      <option value="Other">Other Profile</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Format */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Preferred Training Mode
                  </label>
                  <div className="relative">
                    <Layers className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <select
                      value={formData.preferredFormat}
                      onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-orange-200 bg-white cursor-pointer h-9"
                    >
                      <option value="Live Online">Live Online (Instructor-Led)</option>
                      <option value="Classroom Bootcamp">Classroom / Bootcamp</option>
                      <option value="Corporate Dedicated">Corporate Group Batch</option>
                      <option value="Self-Paced">Self-Paced with Labs</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-1.5">
                <button
                  type="submit"
                  id="submit-syllabus-download-btn"
                  disabled={isSubmitting}
                  className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Generating & Downloading Syllabus...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Submit & Download Syllabus PDF</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center mt-1.5">
                  🔒 We respect your privacy. No spam. Instant download begins immediately.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-extrabold text-[#152e4d]">
                Syllabus Downloaded!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you, <span className="font-bold text-slate-800">{formData.fullName}</span>. The official syllabus for <span className="font-bold text-[#152e4d]">{course.title}</span> has been downloaded to your device.
              </p>
            </div>

            {/* File Info Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 max-w-md mx-auto flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#ea6d24] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {fileName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    PDF Document • Verified Curriculum
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownloadAgain}
                className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                title="Download file again"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Re-download</span>
              </button>
            </div>

            {/* Next Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadAgain}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Again</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto bg-[#ea6d24] hover:bg-[#d85e19] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Continue Exploring Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
