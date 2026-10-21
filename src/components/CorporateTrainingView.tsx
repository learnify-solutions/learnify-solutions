import React, { useEffect } from 'react';
import { 
  ArrowRight, Users, BookOpen, Award, Globe, TrendingDown, 
  Cloud, Shield, Cpu, Network, Layout, Terminal, Code, 
  CheckCircle2, MonitorPlay, Building2, Users2, RefreshCcw, 
  Search, PenTool, Rocket, LifeBuoy, Briefcase, Target, 
  ChevronRight, Check, PlayCircle, ShieldAlert, Sparkles, UserCheck, Star,
  MapPin, MessageSquare, ChevronLeft
} from 'lucide-react';
import { CmsData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';

interface CorporateTrainingViewProps {
  corporateSection?: CmsData['corporateTrainingSection'];
  onOpenAdvisorModal: (type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info') => void;
  onNavigate?: (page: string) => void;
}

export const CorporateTrainingView: React.FC<CorporateTrainingViewProps> = ({ corporateSection, onOpenAdvisorModal, onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [currentTestimonialPage, setCurrentTestimonialPage] = React.useState(0);
  const [currentDeliveryPage, setCurrentDeliveryPage] = React.useState(0);

  // Pre-cache all delivery card images immediately so scrolling down never lags
  useEffect(() => {
    if (corporateSection?.deliveryCards) {
      corporateSection.deliveryCards.forEach((c) => {
        if (c.imageUrl) {
          const img = new Image();
          img.decoding = 'async';
          img.src = normalizeImageUrl(c.imageUrl, 'course');
        }
      });
    }
  }, [corporateSection?.deliveryCards]);

  const data = corporateSection || {
    deliverySubtitle: 'Global Delivery at Scale',
    deliveryTitle: 'Real-World Corporate Training Delivery',
    deliveryDescription: 'From government ministries to global tech enterprises, our field-tested instructors deliver tailored technical programs onsite across the Middle East, Europe, Africa, and Asia.',
    deliveryCards: [
      {
        id: 'del-1',
        locationTag: 'Muscat, Oman',
        badgeText: 'Executive Engagement',
        title: 'Customized Enterprise Immersion',
        description: 'Dedicated sector engagement delivered for enterprise engineering leadership with live architecture labs.',
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'del-2',
        locationTag: 'Middle East Tech Facility',
        badgeText: 'Onsite Delivery',
        title: 'Corporate Training Delegation',
        description: '2-Week intensive program focusing on enterprise systems governance and production readiness.',
        imageUrl: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    cohortCards: [
      {
        id: 'coh-1',
        badgeText: 'UPCOMING COHORT',
        title: 'Riyadh, KSA',
        description: 'Onsite Executive Masterclass & Scenario Labs',
        footerText: '45 Senior Engineers Enrolled',
        theme: 'light' as const,
        imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'coh-2',
        badgeText: 'ENTERPRISE COHORT',
        title: 'Bengaluru',
        description: 'Hybrid Executive Lab & Practice Pods',
        footerText: '3-Week Delivery Track',
        theme: 'dark' as const,
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    testimonialsTitle: 'What Corporate Teams Say',
    testimonialsSubtitle: 'Swipe or scroll to view verified client reviews across global enterprise cohorts.',
    testimonials: [
      {
        id: 'test-1',
        quote: "The instructor's real-time problem-solving scenarios and deep domain authority made our cross-functional transition frictionless. One of the best corporate programs our unit has completed.",
        authorName: 'Saleem Mohd',
        authorTitle: 'Enterprise Systems Specialist',
        authorLocation: 'UAE',
        rating: 5,
      },
      {
        id: 'test-2',
        quote: "100% practical lab exercises directly mapped to our production environments. The customized curriculum saved us months of trial-and-error migration risks.",
        authorName: 'Vineet Tomar',
        authorTitle: 'DevOps Tech Lead',
        authorLocation: 'India',
        rating: 5,
      },
      {
        id: 'test-3',
        quote: "The trainer walked through defensive architecture and error mitigation using real enterprise scenarios. Outstanding engagement, depth, and interactive delivery.",
        authorName: 'Jyoti Negi',
        authorTitle: 'Security Operations',
        authorLocation: 'Gurgaon Cohort',
        rating: 5,
      },
      {
        id: 'test-4',
        quote: "The hybrid structure gave our distributed team identical quality, collaborative lab sandboxes, and personalized guidance from certified senior mentors.",
        authorName: 'Sachin Sharma',
        authorTitle: 'Solutions Architect',
        authorLocation: 'APAC',
        rating: 5,
      },
    ],
  };

  return (
    <div className="w-full bg-[#f8fafc] font-sans">
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 pointer-events-none rounded-bl-[100px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-8 lg:pb-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] sm:text-xs font-semibold text-slate-700 mb-4 border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-[#ea6d24]" />
                ENTERPRISE SOLUTIONS
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-[#152e4d] leading-[1.1] tracking-tight mb-4">
                Build capability across your <span className="text-[#ea6d24]">organization.</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-xl">
                Transform your workforce with bespoke learning pathways designed for high-stakes corporate environments. Drive innovation, close skill gaps, and measure real ROI with Learnify's premium enterprise training ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <button 
                  onClick={() => onOpenAdvisorModal('corporate_quote')}
                  className="w-full sm:w-auto bg-[#ea6d24] hover:bg-[#d85e19] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onOpenAdvisorModal('advisor')}
                  className="w-full sm:w-auto bg-white border border-slate-300 hover:border-[#152e4d] text-[#1b5a88] px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>View Case Studies</span>
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4 border-t border-slate-100">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1b5a88] mb-1">98%</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Completion Rate</div>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1b5a88] mb-1">500+</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Clients</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full h-[320px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=75&fm=webp" 
                alt="Corporate Training Session"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Element */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1b5a88] shrink-0">
                  <TrendingDown className="w-5 h-5 rotate-180" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">Team Productivity</div>
                  <div className="text-sm font-bold text-slate-800">+42% YoY Growth</div>
                </div>
                <div className="ml-auto sm:ml-6 px-2 py-1 bg-orange-100 text-[#ea6d24] text-[10px] font-bold rounded flex items-center gap-1 uppercase tracking-wide">
                  <TrendingDown className="w-3 h-3 rotate-180" />
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Logos Strip */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by forward-thinking enterprises worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple logo placeholders */}
            <div className="flex items-center gap-2 text-2xl font-black text-slate-800"><div className="w-6 h-6 border-2 border-current rounded-sm rotate-45"></div> AcmeCorp</div>
            <div className="flex items-center gap-2 text-2xl font-black text-slate-800"><div className="w-6 h-6 border-4 border-current rounded-full"></div> Globex</div>
            <div className="flex items-center gap-2 text-2xl font-black text-slate-800"><div className="w-6 h-6 bg-current rounded-full"></div> Soylent</div>
            <div className="flex items-center gap-2 text-2xl font-black text-slate-800"><div className="w-6 h-6 border-t-4 border-r-4 border-current"></div> Initech</div>
            <div className="flex items-center gap-2 text-2xl font-black text-slate-800"><div className="w-6 h-6 border-b-4 border-l-4 border-current rounded-full"></div> Umbrella</div>
          </div>
        </div>
      </section>

      {/* 3. Challenges */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#152e4d] mb-6">
              Technology is changing faster than your workforce.
            </h2>
            <p className="text-lg text-slate-600">
              The gap between the skills your team has and the skills they need is growing. We help you bridge it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cards */}
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Outdated Skills</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Legacy systems and outdated methodologies slowing down your innovation and go-to-market strategies.</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Cloud Adoption</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Struggling to migrate efficiently or maximize ROI from your AWS, Azure, or GCP investments.</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#ea6d24] flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Cybersecurity</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Increasing vulnerability to threats due to lack of advanced security awareness and specialized defense skills.</p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">AI Transformation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Falling behind competitors leveraging AI and ML for automation, insights, and operational efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Domains (What We Train) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#152e4d] mb-4">What We Train</h2>
              <p className="text-slate-600">Comprehensive curriculum across all major technology domains.</p>
            </div>
            <button 
              onClick={() => onNavigate?.('courses')}
              className="text-[#ea6d24] font-bold text-sm flex items-center gap-1 hover:text-[#d85e19] transition-colors cursor-pointer group"
            >
              <span>Explore All Training Areas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Cloud, label: 'Cloud Computing' },
              { icon: Shield, label: 'Cybersecurity' },
              { icon: RefreshCcw, label: 'DevOps' },
              { icon: Cpu, label: 'AI & Machine Learning' },
              { icon: Network, label: 'Networking' },
              { icon: Layout, label: 'Microsoft Tech Stack' },
              { icon: Terminal, label: 'Linux & Open Source' },
              { icon: Code, label: 'Programming' },
            ].map((domain, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 hover:border-[#ea6d24] hover:shadow-md transition-all cursor-pointer group bg-white">
                <domain.icon className="w-8 h-8 text-[#152e4d] mb-4 group-hover:text-[#ea6d24] transition-colors stroke-[1.5]" />
                <span className="text-sm font-bold text-slate-700">{domain.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Customization */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#152e4d] leading-tight">
                Your team isn't generic. Your training shouldn't be either.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We don't just deliver off-the-shelf courses. We adapt every aspect of the learning experience to match your precise organizational needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#ea6d24]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Curriculum & Tech Stack</h4>
                    <p className="text-sm text-slate-600">Tailored to the specific tools, versions, and frameworks your team uses daily.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#ea6d24]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Skill Level</h4>
                    <p className="text-sm text-slate-600">From absolute beginners to advanced architects, we pitch the content perfectly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#ea6d24]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Duration & Delivery</h4>
                    <p className="text-sm text-slate-600">Intensive bootcamps, half-day sessions, or multi-week programs designed around your schedule.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onOpenAdvisorModal('corporate_quote')}
                className="bg-[#ea6d24] hover:bg-[#d85e19] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-xs cursor-pointer inline-block"
              >
                Discuss Customization
              </button>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=75&fm=webp" 
                  alt="Corporate Training Session" 
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs">
                <div className="text-3xl font-extrabold text-[#ea6d24] mb-1">100%</div>
                <div className="text-sm text-slate-600 font-medium">Customizable curriculum to fit your specific enterprise stack.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Formats */}
      <section className="py-24 bg-[#152e4d] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">Flexible Delivery Formats</h2>
            <p className="text-blue-100 text-lg">
              Choose the learning environment that best suits your team's location and learning style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <MonitorPlay className="w-8 h-8 text-[#ea6d24] mb-6" />
              <h3 className="text-xl font-bold mb-3">Live Online</h3>
              <p className="text-sm text-blue-100 leading-relaxed">Interactive, instructor-led virtual classrooms for remote and distributed teams globally.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <Building2 className="w-8 h-8 text-[#ea6d24] mb-6" />
              <h3 className="text-xl font-bold mb-3">Onsite</h3>
              <p className="text-sm text-blue-100 leading-relaxed">We bring our expert instructors directly to your office for focused, in-person training.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <Users2 className="w-8 h-8 text-[#ea6d24] mb-6" />
              <h3 className="text-xl font-bold mb-3">Private Group</h3>
              <p className="text-sm text-blue-100 leading-relaxed">Dedicated training sessions exclusively for your team, allowing for confidential discussions.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <RefreshCcw className="w-8 h-8 text-[#ea6d24] mb-6" />
              <h3 className="text-xl font-bold mb-3">Hybrid</h3>
              <p className="text-sm text-blue-100 leading-relaxed">Blend virtual and in-person learning for maximum flexibility and engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Process */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#152e4d] text-center mb-16">The Learnify Training Process</h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-[#ea6d24]" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: '01', title: 'Discover', desc: 'We analyze your current skill gaps and business goals.' },
                { step: '02', title: 'Design', desc: 'Crafting a customized curriculum tailored to your stack.' },
                { step: '03', title: 'Deliver', desc: 'Engaging, expert-led training in your preferred format.' },
                { step: '04', title: 'Support', desc: 'Post-training resources and continuous learning paths.' }
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 mx-auto bg-white border-4 border-[#ea6d24] rounded-full flex items-center justify-center mb-6 shadow-xs shadow-orange-100">
                    <span className="text-[#ea6d24] font-extrabold text-xl">{s.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#152e4d] mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-600 px-4">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Roles / Goals */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: By Role */}
            <div>
              <h3 className="text-xl font-bold text-[#152e4d] mb-8">Training by Role</h3>
              <div className="space-y-4">
                {[
                  { icon: Cpu, label: 'Developers & Engineers' },
                  { icon: ShieldAlert, label: 'Cybersecurity Teams' },
                  { icon: Cloud, label: 'Cloud Architects' },
                  { icon: Briefcase, label: 'IT Management' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center p-5 bg-white border border-slate-200 rounded-xl hover:border-[#ea6d24] transition-colors shadow-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-slate-500" />
                      </div>
                      <span className="font-bold text-slate-700">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: By Goal */}
            <div>
              <h3 className="text-xl font-bold text-[#152e4d] mb-8">Training by Business Goal</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <h4 className="font-bold text-[#152e4d] mb-2 text-sm">Upskill Workforce</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Modernize your team's core competencies to stay competitive.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <h4 className="font-bold text-[#152e4d] mb-2 text-sm">Accelerate Cloud Adoption</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Smooth transition to cloud infrastructure with certified teams.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <h4 className="font-bold text-[#152e4d] mb-2 text-sm">Enhance Security Posture</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Train staff to defend against sophisticated cyber threats.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <h4 className="font-bold text-[#152e4d] mb-2 text-sm">Drive AI Transformation</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Implement AI solutions effectively with trained specialists.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Hands On */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f8fafc] rounded-3xl p-8 lg:p-12 border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-xs">
                  <span className="text-orange-500">▲</span>
                  Experiential Learning
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-extrabold text-[#152e4d] leading-tight">
                  Hands-On Learning that Sticks
                </h2>
                
                <p className="text-slate-600 leading-relaxed text-lg">
                  Theory is important, but practical application is where real learning happens. Our corporate training heavily emphasizes hands-on labs.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ea6d24]" />
                    <span className="text-slate-700 font-medium">Real-world scenario simulations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ea6d24]" />
                    <span className="text-slate-700 font-medium">Secure sandbox environments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ea6d24]" />
                    <span className="text-slate-700 font-medium">Project-based capstones</span>
                  </li>
                </ul>

                <button 
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('about');
                    } else {
                      window.location.hash = '#about';
                    }
                  }}
                  className="bg-[#ea6d24] hover:bg-[#d85e19] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  <span>See Our Methodology</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl aspect-video lg:aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=75&fm=webp" 
                  alt="Hands on tech lab" 
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Real-World Corporate Training Delivery (Dynamic CMS) */}
      <section className="py-12 lg:py-16 bg-[#f4f5f7]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Header & Stats */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 mb-4 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ea6d24]" />
                {data.deliverySubtitle}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#152e4d] leading-tight mb-4 tracking-tight">
                {data.deliveryTitle}
              </h2>
              <p className="text-[#475569] text-base leading-relaxed">
                {data.deliveryDescription}
              </p>
            </div>
            
            {/* Stats Card */}
            {data.deliveryStats && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 flex flex-row items-center gap-6 lg:gap-8 shadow-sm shrink-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-lg lg:text-xl font-bold text-[#152e4d] mb-1">
                    <Star className="w-5 h-5 text-[#ea6d24] fill-current" />
                    {data.deliveryStats.score}
                  </div>
                  <span className="text-[10px] lg:text-xs text-slate-500 font-medium uppercase tracking-wider">Instructor Score</span>
                </div>
                <div className="w-px h-10 lg:h-12 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <div className="text-lg lg:text-xl font-bold text-[#152e4d] mb-1">
                    {data.deliveryStats.upskilled}
                  </div>
                  <span className="text-[10px] lg:text-xs text-slate-500 font-medium uppercase tracking-wider">Pros Upskilled</span>
                </div>
                <div className="w-px h-10 lg:h-12 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <div className="text-lg lg:text-xl font-bold text-[#ea6d24] mb-1">
                    {data.deliveryStats.labs}
                  </div>
                  <span className="text-[10px] lg:text-xs text-slate-500 font-medium uppercase tracking-wider">Practical Labs</span>
                </div>
              </div>
            )}
          </div>

          {/* Grid Layout matching design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            
            {/* Image Cards */}
            {data.deliveryCards.slice(currentDeliveryPage * 2, (currentDeliveryPage + 1) * 2).map((card, idx) => (
              <div key={card.id} className="rounded-[24px] overflow-hidden relative group h-[250px] lg:h-[320px] shadow-sm gpu-accelerated bg-slate-800">
                <img 
                  src={normalizeImageUrl(card.imageUrl, 'course')} 
                  alt={card.title} 
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.webp')) {
                      target.src = target.src.replace('.webp', '.png');
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152e4d]/90 via-[#152e4d]/30 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
                      {idx === 0 ? <MapPin className="w-3 h-3 text-[#ea6d24]" /> : <Building2 className="w-3 h-3 text-[#ea6d24]" />}
                      {card.locationTag}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ea6d24] text-white text-[11px] font-bold mb-3 w-fit">
                    <CheckCircle2 className="w-3 h-3" />
                    {card.badgeText}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Pagination Indicators */}
          {data.deliveryCards.length > 2 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(data.deliveryCards.length / 2) }).map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${currentDeliveryPage === idx ? 'w-8 bg-[#ea6d24]' : 'w-2 bg-slate-300 cursor-pointer hover:bg-slate-400'}`}
                    onClick={() => setCurrentDeliveryPage(idx)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 11. What Corporate Teams Say (Dynamic CMS Testimonials) */}
      <section className="py-20 lg:py-24 bg-[#f4f5f7] border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#ea6d24] font-bold text-sm mb-3">
                <MessageSquare className="w-4 h-4" />
                Authentic Client Impact
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-[#152e4d] mb-2 tracking-tight">
                {data.testimonialsTitle}
              </h2>
              <p className="text-slate-600 text-lg">
                {data.testimonialsSubtitle}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={() => setCurrentTestimonialPage((prev) => Math.max(0, prev - 1))}
                disabled={currentTestimonialPage === 0}
                className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-colors shadow-sm cursor-pointer ${currentTestimonialPage === 0 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:text-[#ea6d24] hover:border-[#ea6d24]'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentTestimonialPage((prev) => Math.min(Math.ceil((data.testimonials?.length || 0) / 4) - 1, prev + 1))}
                disabled={currentTestimonialPage >= Math.ceil((data.testimonials?.length || 0) / 4) - 1}
                className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-colors shadow-sm cursor-pointer ${currentTestimonialPage >= Math.ceil((data.testimonials?.length || 0) / 4) - 1 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:text-[#ea6d24] hover:border-[#ea6d24]'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.testimonials.slice(currentTestimonialPage * 4, (currentTestimonialPage + 1) * 4).map((test) => (
              <div key={test.id} className="bg-white rounded-[24px] border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < test.rating ? 'text-[#ea6d24] fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Verified
                    </div>
                  </div>
                  <p className="text-[#334155] text-base leading-relaxed mb-8 italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-[#ea6d24] flex items-center justify-center font-bold text-lg shrink-0">
                    {test.initials || test.authorName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#152e4d] text-base leading-tight">{test.authorName}</h4>
                    <p className="text-xs text-slate-500 mt-1">{test.authorTitle} • {test.authorLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll / Pagination Indicators */}
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: Math.ceil((data.testimonials?.length || 0) / 4) }).map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${currentTestimonialPage === idx ? 'w-8 bg-[#ea6d24]' : 'w-2 bg-slate-300 cursor-pointer hover:bg-slate-400'}`}
                onClick={() => setCurrentTestimonialPage(idx)}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
