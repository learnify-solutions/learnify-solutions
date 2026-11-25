import React, { useEffect, useState } from 'react';
import { Shield, Scale, RefreshCcw, RotateCcw, Globe, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('privacy');

  // Handle scroll spy for sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveSection(intersectingEntry.target.id);
        }
      },
      { 
        rootMargin: '-20% 0px -70% 0px' // Trigger when section is near top of viewport
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for fixed header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'refund', label: 'Refund Policy' },
    { id: 'retake', label: 'Retake Policy' },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar */}
        <aside className="lg:w-64 shrink-0 lg:sticky lg:top-28 w-full">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              Legal & Policies
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'text-[#ea6d24] font-semibold bg-orange-50/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      activeSection === item.id ? 'bg-[#ea6d24]' : 'bg-slate-300'
                    }`}
                  />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-2xl border-t-4 border-t-[#ea6d24] border-x border-b border-slate-200 shadow-sm p-8 sm:p-12">
          
          {/* Header Info */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#152e4d] mb-4">
              Legal Information
            </h1>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Please read these policies carefully. They govern your use of Learnify Solutions
              platforms, corporate training services, and digital learning environments.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Privacy Policy Section */}
            <section id="privacy" className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#ea6d24]" strokeWidth={2.5} />
                <h2 className="text-2xl font-extrabold text-[#152e4d]">Privacy Policy</h2>
              </div>

              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-[#152e4d]">What information do we collect?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  At Learnify Solutions, we collect personal and financial information resulting from your interactions with us. This may include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 marker:text-[#ea6d24] mt-2">
                  <li>Name</li>
                  <li>Contact number</li>
                  <li>Email address</li>
                  <li>Location</li>
                  <li>Work information</li>
                </ul>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  Some information, such as IP addresses and browser/device details, may be automatically collected. We collect information only as necessary to maintain the operation of our services and do not acquire any information to personally identify you.
                </p>
                <div className="border-l-4 border-[#ea6d24] bg-white rounded-r-xl p-4 mt-4">
                  <p className="text-sm font-semibold text-[#152e4d]">
                    The fine point: We at Learnify Solutions only collect the information only as a necessity to maintain the operation of our services and we do not acquire any information to personally identify you.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-[#152e4d]">How do we use your information?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  At Learnify Solutions, we handle your information with care and transparency. Here's a breakdown of how we use the personal information collected through our services:
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We use the information we collect or receive:
                </p>
                <ul className="list-disc pl-5 space-y-4 text-sm text-slate-600 marker:text-[#ea6d24] mt-4">
                  <li>
                    <strong className="text-slate-800">To facilitate account creation and logon process:</strong> If you choose to link your account with us to a third-party account like Google or Facebook, we use the information provided by those third parties to facilitate the account creation and logon process as part of our service agreement.
                  </li>
                  <li>
                    <strong className="text-slate-800">sending you marketing and promotional communications.</strong> We may send you marketing and promotional communications based on your preferences. You have the option to opt-out of these communications at any time.
                  </li>
                  <li>
                    <strong className="text-slate-800">sending administrative information to you.</strong> Your personal information may be used to send you updates about our products, services, and any changes to our terms, conditions, and policies.
                  </li>
                  <li>
                    <strong className="text-slate-800">Fulfilling and Managing Orders</strong> We utilize your information to fulfil and manage orders, payments, returns, and exchanges made through our services.
                  </li>
                  <li>
                    <strong className="text-slate-800">Deliver targeted advertising to you.</strong> Your information may be used to tailor content and advertising based on your interests and location, helping us measure its effectiveness.
                  </li>
                  <li>
                    <strong className="text-slate-800">Request Feedback.</strong> We value your input and may use your information to request feedback on our services, contacting you to gather insights about your user experience.
                  </li>
                  <li>
                    <strong className="text-slate-800">To manage user accounts</strong> Your information helps us manage user accounts effectively, ensuring they remain functional and secure.
                  </li>
                  <li>
                    <strong className="text-slate-800">To deliver services to the user.</strong> We use your information to provide you with the services you've requested from us.
                  </li>
                  <li>
                    <strong className="text-slate-800">To respond to user inquiries/offer support to users.</strong> Your information enables us to address any inquiries or issues you may have with our services promptly and effectively.
                  </li>
                  <li>
                    <strong className="text-slate-800">For other Business Purposes.</strong> We may use your information for various business purposes, such as data analysis, identifying usage trends, assessing the effectiveness of our promotional efforts, and enhancing our services, products, and overall user experience. Rest assured, we prioritize your privacy and may store this information in an aggregated and anonymized format, ensuring it cannot be traced back to individual end-users without your consent.
                  </li>
                </ul>
              </div>
            </section>

            {/* Terms and Conditions Section */}
            <section id="terms" className="space-y-6 scroll-mt-28 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-6 h-6 text-[#ea6d24]" strokeWidth={2.5} />
                <h2 className="text-2xl font-extrabold text-[#152e4d]">Terms and Conditions</h2>
              </div>
              
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-6 sm:p-8 space-y-4">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      As our domicile country is India, any dispute or claim arising from this website shall be governed by Indian laws.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Users above 18 years old are eligible to register and use the website for transactions. Minors under 18 are prohibited from doing so.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Details shared on our website for payments are submitted securely to our payment provider.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Online payments are accepted through specific modes only and in certain currencies.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Online payments are accepted through MasterCard/Visa credit/Debit cards/UPI/Wallets in USD, GBP, EUR, INR and INR currencies only.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Refund Policy Section */}
            <section id="refund" className="space-y-6 scroll-mt-28 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCcw className="w-6 h-6 text-[#ea6d24]" strokeWidth={2.5} />
                <h2 className="text-2xl font-extrabold text-[#152e4d]">Refund Policy</h2>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                At Learnify Solutions, refunds are issued through the original mode of payment after reviewing the terms and conditions associated with the chosen service/product. Here’s how our refund policy works:
              </p>

              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-6 sm:p-8 space-y-4">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      If a client is enrolled in a training program that has been withdrawn by Learnify Solutions, they are entitled to a 100% refund or can opt for services of equal value in exchange.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      In case a client is unable to attend the training due to personal reasons and notifies us at least 15 working days prior to the batch schedule, a 100% refund will be processed.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      In case, client requests cancellation within 15 days of training start date, an Administrative charge of INR 5000 + 18% GST will be deducted from the deposit.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Refunds will be made through the original mode of payment only, after reviewing the terms and conditions applied to the chosen service/ product.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      If a client requests cancellation within 15 days of the training start date, an administrative charge of INR 5000 + 18% GST will be deducted from the deposit.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Retake Policy Section */}
            <section id="retake" className="space-y-6 scroll-mt-28 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <RotateCcw className="w-6 h-6 text-[#ea6d24]" strokeWidth={2.5} />
                <h2 className="text-2xl font-extrabold text-[#152e4d]">Retake Policy</h2>
              </div>
              
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-6 sm:p-8 space-y-4">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Clients must fill out interim and final feedback forms to avail of post-training services.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Feedback or escalation must be shared before 30% of the class is over to qualify for a redo batch.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      Individuals unsatisfied with training can retake it within 3 months of the first batch end date.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      If an individual fails the exam on the first attempt, a free redo is available within 3 months of the exam result date.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      80% attendance is mandatory for qualifying for revision or redo sessions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24] mt-2 shrink-0" />
                    <div>
                      One reschedules is allowed for medical emergencies or unavoidable situations. Further reschedules are charged at 100% of actual fees.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};


