import React, { useState, useEffect } from 'react';
import { MapPin, MessageCircle, Mail } from 'lucide-react';

interface ContactViewProps {
  onSubmitLead: (data: any) => Promise<void>;
  onNavigate?: (page: string) => void;
  isCiscoAuthorized?: boolean;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSubmitLead, onNavigate, isCiscoAuthorized = false }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    company: '',
    trainingInterest: '',
    preferredFormat: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmitLead({
        fullName: formData.fullName,
        email: formData.workEmail,
        phone: formData.phoneNumber,
        company: formData.company,
        inquiryType: 'general_contact',
        selectedDomain: formData.trainingInterest || 'General',
        preferredFormat: formData.preferredFormat,
        message: formData.message
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fafafa] font-sans relative min-h-screen pb-20">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', 
          backgroundSize: '4rem 4rem' 
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#152e4d] tracking-tight mb-2 leading-tight">
            Let's build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea6d24] to-[#f59e0b]">learning path.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed px-4 max-w-2xl mx-auto">
            Connect with our advisory team to discuss custom training solutions, enterprise upskilling, or find the perfect course.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-start">
          
          {/* Left Column: Direct Connections */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl p-5 lg:p-6 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-[#152e4d] mb-4">Direct Connections</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin className="w-5 h-5 text-[#1b5a88]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Global Headquarters</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Faridabad, Haryana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5 text-[#ea6d24]"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">WhatsApp Chat</h3>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">+91 881 025 5422</p>
                    <a href="https://wa.me/918810255422" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] transition-colors inline-flex items-center gap-1 mt-0.5">
                      Message Us &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Mail className="w-5 h-5 text-[#1b5a88]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">General Inquiries</h3>
                    <a href="mailto:info@learnify-solutions.com" className="text-xs text-[#1b5a88] hover:underline break-all mt-0.5 block">
                      info@learnify-solutions.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-orange-50/60 rounded-xl p-4 border border-orange-100/80 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ea6d24] animate-ping" />
              <p className="text-xs font-medium text-slate-700">
                Average advisor response time: <span className="font-bold text-[#ea6d24]">Under 2 hours</span> during business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-5 lg:p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#152e4d]">Request a Consultation</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill out the form below and an educational advisor will get back to you promptly.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Work Email *</label>
                    <input 
                      type="email" 
                      placeholder="jane@company.com"
                      required
                      value={formData.workEmail}
                      onChange={e => setFormData({...formData, workEmail: e.target.value})}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phoneNumber}
                      onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Company / Organization</label>
                    <input 
                      type="text" 
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Training Interest *</label>
                    <select
                      required
                      value={formData.trainingInterest}
                      onChange={e => setFormData({...formData, trainingInterest: e.target.value})}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-700 appearance-none"
                    >
                      <option value="">Select an area</option>
                      <option value="cloud">Cloud Computing (AWS / Azure / GCP)</option>
                      <option value="security">Cybersecurity & SOC</option>
                      <option value="ai">AI & Machine Learning</option>
                      <option value="devops">DevOps & Kubernetes</option>
                      {isCiscoAuthorized ? (
                        <option value="cisco">Cisco Enterprise Networking</option>
                      ) : (
                        <option value="infrastructure">IT Infrastructure & Systems</option>
                      )}
                      <option value="other">Other / Custom Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Preferred Format</label>
                    <select
                      value={formData.preferredFormat}
                      onChange={e => setFormData({...formData, preferredFormat: e.target.value})}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-700 appearance-none"
                    >
                      <option value="">Select format</option>
                      <option value="online">Live Online (Instructor-Led)</option>
                      <option value="onsite">Onsite Bootcamp</option>
                      <option value="hybrid">Hybrid Corporate Pathway</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Your Requirements / Message</label>
                  <textarea 
                    rows={2}
                    placeholder="Briefly describe team size, goals, or timeline..."
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs resize-none"
                  />
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[10px] text-slate-400 max-w-xs leading-tight">
                    By submitting, you agree to our <button type="button" onClick={(e) => { e.preventDefault(); onNavigate?.('privacy'); }} className="text-[#1b5a88] hover:underline cursor-pointer">Privacy Policy</button>.
                  </p>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#ea6d24] hover:bg-[#d85e19] disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
                  </button>
                </div>
                {submitted && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-semibold flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    Thank you! Your request has been received.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Logos Strip */}
      <div className="max-w-5xl mx-auto px-4 mt-6 text-center">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">
          Trusted by global enterprises
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-1.5 text-base font-black text-slate-800"><div className="w-4 h-4 border-2 border-current rounded-sm rotate-45"></div> AcmeCorp</div>
          <div className="flex items-center gap-1.5 text-base font-black text-slate-800"><div className="w-4 h-4 border-3 border-current rounded-full"></div> Globex</div>
          <div className="flex items-center gap-1.5 text-base font-black text-slate-800"><div className="w-4 h-4 bg-current rounded-full"></div> Soylent</div>
          <div className="flex items-center gap-1.5 text-base font-black text-slate-800"><div className="w-4 h-4 border-t-3 border-r-3 border-current"></div> Initech</div>
          <div className="flex items-center gap-1.5 text-base font-black text-slate-800"><div className="w-4 h-4 border-b-3 border-l-3 border-current rounded-full"></div> Umbrella</div>
        </div>
      </div>
    </div>
  );
};
