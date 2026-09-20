import React, { useState } from 'react';
import { X, CheckCircle, Send, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { submitLead } from '../services/cmsService';
import { LeadSubmission } from '../types';
import { trackLeadSubmission } from '../utils/analytics';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryType?: LeadSubmission['inquiryType'];
  defaultDomain?: string;
  onLeadSubmitted?: () => void;
  isCiscoAuthorized?: boolean;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  inquiryType = 'advisor',
  defaultDomain = 'General',
  onLeadSubmitted,
  isCiscoAuthorized = false,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(defaultDomain);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await submitLead({
        fullName,
        email,
        company,
        phone,
        inquiryType: (inquiryType || 'advisor') as LeadSubmission['inquiryType'],
        selectedDomain,
        message,
      });

      setIsSuccess(true);
      trackLeadSubmission(inquiryType, selectedDomain);
      if (onLeadSubmitted) onLeadSubmitted();
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (inquiryType) {
      case 'corporate_quote':
        return 'Request Corporate Training Plan';
      case 'demo':
        return 'Request Enterprise Demo';
      case 'course_info':
        return 'Course Syllabus & Enrollment';
      default:
        return 'Talk to a Learning Advisor';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        id="advisor-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[94vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#1b5a88]">Request Received!</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Thank you, <span className="font-semibold">{fullName}</span>. Our enterprise team will connect with you at <span className="font-semibold">{email}</span> within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="bg-[#ea6d24] hover:bg-[#d85e19] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1b5a88]">
                {getTitle()}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Fill in your details below and our solution architects will tailor the ideal curriculum.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Primary Technology Domain
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
                >
                  <option value="General">All Domains / Customized Roadmap</option>
                  <option value="Cloud Computing">Cloud Computing (AWS / Azure / GCP)</option>
                  <option value="Cybersecurity">Cybersecurity (CompTIA / CISSP / SecOps)</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & LLMs</option>
                  <option value="DevOps">DevOps (Docker / Kubernetes / CI/CD)</option>
                  <option value="Microsoft Solutions">Microsoft Solutions & M365</option>
                  {isCiscoAuthorized ? (
                    <option value="Cisco Networking">Cisco Networking & CCNA</option>
                  ) : (
                    <option value="IT Infrastructure">IT Infrastructure & Linux</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Specific Requirements or Learner Count
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your team size, target delivery dates, or training goals..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white font-semibold text-sm py-3 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting to Backend...' : 'Submit Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
