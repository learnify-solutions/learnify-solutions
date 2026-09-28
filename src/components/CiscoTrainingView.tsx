import React, { useState, useMemo, useEffect } from 'react';
import {
  Network,
  Shield,
  Server,
  Terminal,
  Layers,
  Award,
  Clock,
  Star,
  Users,
  Search,
  CheckCircle2,
  Download,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen,
  Laptop,
  HelpCircle,
  ChevronDown,
  Building2,
  FileText,
  Radio,
  SlidersHorizontal,
  X,
  Target,
  Zap,
  BookmarkCheck,
  Check
} from 'lucide-react';
import { Course } from '../types';
import { normalizeImageUrl, getSvgCourseFallback } from '../utils/imageHelper';
import { SyllabusDownloadModal } from './SyllabusDownloadModal';
import { CISCO_PROFESSIONAL_TRACKS } from '../data/ciscoCoursesData';

interface CiscoTrainingViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenAdvisorModal: (type?: string, subject?: string) => void;
  onNavigateHome: () => void;
}

export const CiscoTrainingView: React.FC<CiscoTrainingViewProps> = ({
  courses,
  onSelectCourse,
  onOpenAdvisorModal,
  onNavigateHome,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Primary Level Tab: 'associate' or 'professional'
  const [activeCategory, setActiveCategory] = useState<'associate' | 'professional'>('associate');

  // Professional sub-division: 'all' | 'core' | 'concentration'
  const [activeExamType, setActiveExamType] = useState<'all' | 'core' | 'concentration'>('all');

  // Professional track filter: 'all' or specific track ID
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  // Search and modal states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseForSyllabus, setSelectedCourseForSyllabus] = useState<Course | null>(null);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Corporate Quote Form state
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    selectedTrack: 'Cisco CCNA & Enterprise Core (ENCOR 350-401)',
    seats: '5-15 Participants',
    deliveryMode: 'Live Instructor-Led Online',
    message: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Extract all Cisco courses using structured fields with graceful fallbacks
  const allCiscoCourses = useMemo(() => {
    return courses.filter((c) => {
      const vendor = (c.certificationVendor || '').toLowerCase();
      const domain = (c.domain || '').toLowerCase();
      const id = (c.id || '').toLowerCase();
      const title = (c.title || '').toLowerCase();

      return (
        c.ciscoCategory !== undefined ||
        vendor === 'cisco' ||
        vendor.includes('cisco') ||
        domain === 'cisco networking' ||
        domain.includes('cisco') ||
        id.startsWith('course-cisco') ||
        title.includes('cisco') ||
        title.includes('ccna') ||
        title.includes('ccnp') ||
        title.includes('encor') ||
        title.includes('scor')
      );
    });
  }, [courses]);

  // Total counts for badges
  const associateCoursesCount = useMemo(() => {
    return allCiscoCourses.filter((c) => {
      if (c.ciscoCategory) return c.ciscoCategory === 'associate';
      const t = c.title.toLowerCase();
      return t.includes('ccna') || t.includes('200-301') || t.includes('cyberops') || t.includes('support technician');
    }).length;
  }, [allCiscoCourses]);

  const professionalCoursesCount = useMemo(() => {
    return allCiscoCourses.filter((c) => {
      if (c.ciscoCategory) return c.ciscoCategory === 'professional';
      const t = c.title.toLowerCase();
      return t.includes('ccnp') || t.includes('encor') || t.includes('scor') || t.includes('350-') || t.includes('300-');
    }).length;
  }, [allCiscoCourses]);

  const coreCoursesCount = useMemo(() => {
    return allCiscoCourses.filter((c) => {
      const isProf = c.ciscoCategory === 'professional' || (!c.ciscoCategory && (c.title.includes('CCNP') || c.title.includes('350-')));
      if (!isProf) return false;
      if (c.ciscoExamType) return c.ciscoExamType === 'core';
      return c.title.toLowerCase().includes('core') || (c.examCode && c.examCode.includes('350-'));
    }).length;
  }, [allCiscoCourses]);

  const concentrationCoursesCount = useMemo(() => {
    return allCiscoCourses.filter((c) => {
      const isProf = c.ciscoCategory === 'professional' || (!c.ciscoCategory && (c.title.includes('CCNP') || c.title.includes('300-')));
      if (!isProf) return false;
      if (c.ciscoExamType) return c.ciscoExamType === 'concentration';
      return (c.examCode && c.examCode.includes('300-')) || !c.title.toLowerCase().includes('core');
    }).length;
  }, [allCiscoCourses]);

  // Main filter logic using user-requested hierarchy:
  // Level 1: Associate vs Professional
  // Level 2 (Under Professional): Core vs Concentration + Track selection
  const filteredCourses = useMemo(() => {
    return allCiscoCourses.filter((course) => {
      const title = course.title.toLowerCase();
      const summary = course.summary.toLowerCase();
      const id = course.id.toLowerCase();
      const examCode = (course.examCode || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      // 1. Search Query
      const matchesSearch =
        !query ||
        title.includes(query) ||
        summary.includes(query) ||
        id.includes(query) ||
        examCode.includes(query) ||
        (course.curriculum && course.curriculum.some((m) => m.toLowerCase().includes(query)));

      if (!matchesSearch) return false;

      // 2. Primary Category Filter: 'associate' vs 'professional'
      let courseCategory: 'associate' | 'professional' = course.ciscoCategory || 'professional';
      if (!course.ciscoCategory) {
        if (
          title.includes('ccna') ||
          title.includes('200-301') ||
          title.includes('200-201') ||
          title.includes('200-901') ||
          title.includes('support technician') ||
          title.includes('ccst')
        ) {
          courseCategory = 'associate';
        } else {
          courseCategory = 'professional';
        }
      }

      if (courseCategory !== activeCategory) {
        return false;
      }

      // 3. If in Professional Category, apply Exam Type and Track filters
      if (activeCategory === 'professional') {
        // Exam Type: Core vs Concentration
        if (activeExamType !== 'all') {
          let courseExamType = course.ciscoExamType;
          if (!courseExamType) {
            if (examCode.includes('350-') || title.includes('core') || title.includes('encor') || title.includes('scor') || title.includes('dccor')) {
              courseExamType = 'core';
            } else {
              courseExamType = 'concentration';
            }
          }

          if (courseExamType !== activeExamType) {
            return false;
          }
        }

        // Track Filter
        if (selectedTrack !== 'all') {
          if (course.ciscoTrack) {
            if (course.ciscoTrack !== selectedTrack) return false;
          } else {
            // Fallback match by track keyword
            const trackMap: Record<string, string[]> = {
              enterprise: ['enterprise', 'encor', 'enarsi', 'sd-wan', 'wireless'],
              security: ['security', 'scor', 'ise', 'firepower', 'sise', 'sncf', 'vpn'],
              datacenter: ['data center', 'dccor', 'aci', 'nexus', 'dcaci'],
              automation: ['automation', 'devnet', 'devcor', 'python', 'enauto', 'sauto'],
              collaboration: ['collaboration', 'clcor', 'cucm', 'clica', 'claui'],
              service_provider: ['service provider', 'spcor', 'spauto'],
              cybersecurity: ['cybersecurity', 'cyberops', 'cbrcor', 'cbrops'],
            };
            const keywords = trackMap[selectedTrack] || [];
            const matchesKeyword = keywords.some((kw) => title.includes(kw) || summary.includes(kw));
            if (!matchesKeyword) return false;
          }
        }
      }

      return true;
    });
  }, [allCiscoCourses, activeCategory, activeExamType, selectedTrack, searchQuery]);

  const handleOpenSyllabus = (course: Course) => {
    setSelectedCourseForSyllabus(course);
    setIsSyllabusModalOpen(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.fullName || !quoteForm.email) return;
    setQuoteSubmitted(true);
    onOpenAdvisorModal('corporate_quote', `Cisco Training Inquiry: ${quoteForm.selectedTrack}`);
  };

  const faqs = [
    {
      q: 'Do I need CCNA before taking CCNP Enterprise or CCNP Security?',
      a: 'No. Cisco removed formal prerequisites for CCNP certifications. You can take core exams (like ENCOR 350-401 or SCOR 350-701) directly. However, having CCNA-level networking fundamentals or equivalent field experience is strongly recommended for optimal comprehension.',
    },
    {
      q: 'How does the CCNP certification formula (Core + Concentration) work?',
      a: 'To earn any CCNP certification (e.g., CCNP Enterprise, CCNP Security, CCNP Data Center), you must pass two exams: (1) One Technology Core Exam (such as ENCOR 350-401), and (2) One Concentration Exam of your choice (such as ENARSI 300-410 or Cisco SD-WAN 300-415). Passing the Core exam also qualifies you to sit for the CCIE Lab examination.',
    },
    {
      q: 'How does Learnify Solutions provide remote lab access for Cisco courses?',
      a: 'Every student receives dedicated remote access to high-performance Cisco lab pods running physical Cisco hardware and virtual topology simulators (Cisco CML / EVE-NG). You can configure routers, switches, Firepower NGFWs, and Cisco ISE appliances from your browser with 24/7 availability during the course duration.',
    },
    {
      q: 'Can we schedule customized 1-on-1 or corporate team batches?',
      a: 'Yes! We deliver bespoke corporate training cohorts for enterprise teams worldwide, as well as personalized 1-on-1 mentorship programs. Schedules can be structured as 4-hour weekend sessions, full-day intensive bootcamps, or weekday evening tracks.',
    },
    {
      q: 'Are the instructors certified by Cisco?',
      a: 'All our Cisco trainers are CCSI (Certified Cisco Systems Instructor) or CCIE certified professionals with over 10–15 years of hands-on enterprise deployment and consulting experience.',
    },
    {
      q: 'Do you provide mock exams and certification guidance?',
      a: 'Yes. Each course includes comprehensive exam preparation drills, scenario-based practice questions, blueprint analysis, and post-training mentorship to ensure you pass your official Pearson VUE certification exam on the first attempt.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Breadcrumbs */}
      <div className="bg-slate-900 border-b border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-orange-400 font-semibold">Cisco Certification Training</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section: Official Cisco Training Ecosystem */}
      <section className="relative bg-gradient-to-b from-slate-900 via-[#10243e] to-[#152e4d] text-white py-14 lg:py-20 border-b border-slate-800 overflow-hidden">
        {/* Subtle background circuit grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea6d24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3.5 py-1.5 rounded-full">
                <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-xs font-bold text-orange-300 tracking-wide uppercase">
                  Authorized Cisco Certification Curriculum
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Master Cisco Networking, <br />
                <span className="text-[#ea6d24] bg-clip-text">Security & Cloud Infrastructure</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Advance your enterprise engineering career with official Cisco certification bootcamps.
                Featuring live instructor-led batches, 24/7 dedicated Cisco CML/EVE-NG lab pods, and guaranteed Pearson VUE exam readiness.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-800/60 backdrop-blur-xs border border-slate-700/60 rounded-lg p-3.5">
                  <div className="text-white text-base sm:text-lg font-black font-mono">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Hands-On Labs</div>
                </div>

                <div className="bg-slate-800/60 backdrop-blur-xs border border-slate-700/60 rounded-lg p-3.5">
                  <div className="text-orange-400 text-base sm:text-lg font-black font-mono">98.4%</div>
                  <div className="text-xs text-slate-400 mt-0.5">First-Pass Rate</div>
                </div>

                <div className="bg-slate-800/60 backdrop-blur-xs border border-slate-700/60 rounded-lg p-3.5">
                  <div className="text-white text-base sm:text-lg font-black font-mono">24/7</div>
                  <div className="text-xs text-slate-400 mt-0.5">Pod Access</div>
                </div>

                <div className="bg-slate-800/60 backdrop-blur-xs border border-slate-700/60 rounded-lg p-3.5">
                  <div className="text-white text-base sm:text-lg font-black font-mono">CCSI</div>
                  <div className="text-xs text-slate-400 mt-0.5">Certified Mentors</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#cisco-catalog-section"
                  className="bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <span>Explore Course Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onOpenAdvisorModal('corporate_quote', 'Cisco Enterprise Cohort Training')}
                  className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold px-6 py-3.5 rounded-lg transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-orange-400" />
                  <span>Request Corporate / 1-on-1 Quote</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Feature Box */}
            <div className="lg:col-span-4">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Live Cisco Lab Topology
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/60">
                    CML 2.7 / EVE-NG
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Full Cisco Rack Emulation</h4>
                      <p className="text-[11px] text-slate-400">Catalyst 9300, Nexus 9000, ASA/FTD & Cisco ISE appliances.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Guaranteed Batch Runs</h4>
                      <p className="text-[11px] text-slate-400">Fixed weekend & weekday schedules with 100% delivery guarantee.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Official Curriculum & Slides</h4>
                      <p className="text-[11px] text-slate-400">Mapped 100% to Pearson VUE exam blueprints and domain objectives.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 text-center">
                  <p className="text-xs text-orange-300 font-medium">
                    ⚡ Need immediate fast-track certification for your engineering team?
                  </p>
                  <button
                    onClick={() => onOpenAdvisorModal('advisor', 'Fast-Track Cisco Certification Inquiry')}
                    className="mt-2 text-xs font-bold text-white bg-[#ea6d24] hover:bg-[#d85e19] px-4 py-1.5 rounded-md transition-colors cursor-pointer inline-block"
                  >
                    Talk to a Cisco Advisor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cisco Certification Pathway Roadmap */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152e4d] tracking-tight">
              Cisco Certification Progression Hierarchy
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Follow Cisco's structured career ladder from foundational networking to enterprise mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Level 1: Associate */}
            <div 
              onClick={() => {
                setActiveCategory('associate');
                const el = document.getElementById('cisco-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`rounded-2xl p-6 border-2 transition-all shadow-xs cursor-pointer ${
                activeCategory === 'associate'
                  ? 'border-blue-500 bg-blue-50/40 shadow-md ring-2 ring-blue-200'
                  : 'border-slate-200 bg-slate-50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  Level 1 • Associate Level
                </span>
                <span className="text-xs text-slate-500 font-semibold">{associateCoursesCount} Courses Available</span>
              </div>
              <h3 className="text-xl font-bold text-[#152e4d] mb-2 flex items-center gap-2">
                <span>CCNA & Associate Programs</span>
                {activeCategory === 'associate' && <Check className="w-5 h-5 text-blue-600" />}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Foundational networking, IP subnetting, VLAN switching, OSPF routing, wireless essentials, and security baseline.
              </p>
              <div className="space-y-2 text-xs text-slate-700 font-medium border-t border-slate-200/80 pt-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>CCNA 200-301 (Network Associate)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>CBROPS 200-201 (CyberOps Associate)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>DEVASC 200-901 (DevNet Associate)</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-700">
                <span>Click to view Associate Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Level 2: Professional (CCNP) */}
            <div 
              onClick={() => {
                setActiveCategory('professional');
                const el = document.getElementById('cisco-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`rounded-2xl p-6 border-2 transition-all shadow-xs cursor-pointer relative ${
                activeCategory === 'professional'
                  ? 'border-[#ea6d24] bg-orange-50/40 shadow-md ring-2 ring-orange-200'
                  : 'border-slate-200 bg-slate-50 hover:border-orange-300'
              }`}
            >
              <div className="absolute -top-3 right-6 bg-[#ea6d24] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                Core + Concentration
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#ea6d24] bg-orange-100 px-3 py-1 rounded-full">
                  Level 2 • Professional Level (CCNP)
                </span>
                <span className="text-xs text-slate-500 font-semibold">{professionalCoursesCount} Courses Available</span>
              </div>
              <h3 className="text-xl font-bold text-[#152e4d] mb-2 flex items-center gap-2">
                <span>CCNP Core & Concentration Tracks</span>
                {activeCategory === 'professional' && <Check className="w-5 h-5 text-[#ea6d24]" />}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Specialized mastery divided into <strong>Core Exams</strong> (ENCOR, SCOR, DCCOR) and <strong>Concentration Exams</strong> (ENARSI, SD-WAN, ISE, ACI).
              </p>
              <div className="space-y-2 text-xs text-slate-700 font-medium border-t border-slate-200/80 pt-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0" />
                  <span>{coreCoursesCount} Core Exams (ENCOR 350-401, SCOR 350-701, etc.)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0" />
                  <span>{concentrationCoursesCount} Concentration Exams (ENARSI 300-410, ISE 300-715, etc.)</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#ea6d24]">
                <span>Click to view Professional Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Course Catalog Section with 2-Tier Structured Tabs */}
      <section id="cisco-catalog-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-[#ea6d24] uppercase tracking-wider">
                Official Cisco Catalog
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">
                {activeCategory === 'associate' ? 'Associate Level' : 'Professional Level'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152e4d] tracking-tight">
              {activeCategory === 'associate'
                ? 'Cisco Associate Level Courses'
                : 'Cisco Professional (CCNP) Certification Courses'}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Showing <strong>{filteredCourses.length}</strong> official course{filteredCourses.length !== 1 ? 's' : ''} in current view
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by exam code (200-301, 350-401, 300-410)..."
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:border-transparent transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* PRIMARY LEVEL SELECTOR TABS (Associate vs Professional) */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-2">
          {/* Associate Tab */}
          <button
            onClick={() => {
              setActiveCategory('associate');
              setActiveExamType('all');
              setSelectedTrack('all');
            }}
            className={`flex-1 flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
              activeCategory === 'associate'
                ? 'bg-white text-[#152e4d] shadow-md border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Layers className={`w-5 h-5 ${activeCategory === 'associate' ? 'text-blue-600' : 'text-slate-400'}`} />
            <div className="text-left">
              <div className="leading-tight">Associate Level</div>
              <div className="text-[11px] font-normal text-slate-500">
                CCNA, CyberOps & DevNet Associate ({associateCoursesCount})
              </div>
            </div>
          </button>

          {/* Professional Tab */}
          <button
            onClick={() => {
              setActiveCategory('professional');
            }}
            className={`flex-1 flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
              activeCategory === 'professional'
                ? 'bg-white text-[#152e4d] shadow-md border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Award className={`w-5 h-5 ${activeCategory === 'professional' ? 'text-[#ea6d24]' : 'text-slate-400'}`} />
            <div className="text-left">
              <div className="leading-tight">Professional Level (CCNP)</div>
              <div className="text-[11px] font-normal text-slate-500">
                Core & Concentration Specializations ({professionalCoursesCount})
              </div>
            </div>
          </button>
        </div>

        {/* SECONDARY SUB-DIVISION CONTROLS (Only visible when Professional Level is active) */}
        {activeCategory === 'professional' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            {/* Core vs Concentration Sub-Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Exam Division:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveExamType('all')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeExamType === 'all'
                      ? 'bg-[#152e4d] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Professional ({professionalCoursesCount})
                </button>

                <button
                  onClick={() => setActiveExamType('core')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeExamType === 'core'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Core Exams (350-Series) • {coreCoursesCount}</span>
                </button>

                <button
                  onClick={() => setActiveExamType('concentration')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeExamType === 'concentration'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Concentration Exams (300-Series) • {concentrationCoursesCount}</span>
                </button>
              </div>
            </div>

            {/* Track Filter Chips */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Filter by Technology Track:
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedTrack('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedTrack === 'all'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Tracks
                </button>

                {CISCO_PROFESSIONAL_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedTrack === track.id
                        ? 'bg-[#152e4d] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {track.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const examCode = course.examCode || 'CISCO CERT';
              const isCore = course.ciscoExamType === 'core';
              const isConcentration = course.ciscoExamType === 'concentration';
              const isAssociate = course.ciscoCategory === 'associate';

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Main Body */}
                  <div className="p-6 space-y-4">
                    {/* Top Badges Row */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-black px-2.5 py-1 rounded-md bg-slate-900 text-orange-400 tracking-wider">
                        <Radio className="w-3 h-3 text-orange-400 animate-pulse" />
                        {examCode}
                      </span>

                      {/* Division Pill */}
                      {isAssociate ? (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-blue-100 text-blue-800">
                          Associate
                        </span>
                      ) : isCore ? (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
                          CCNP Core Exam
                        </span>
                      ) : isConcentration ? (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          Concentration Exam
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-purple-100 text-purple-800">
                          Professional
                        </span>
                      )}
                    </div>

                    {/* Course Title */}
                    <h3
                      onClick={() => onSelectCourse(course)}
                      className="text-base sm:text-lg font-bold text-[#152e4d] group-hover:text-[#ea6d24] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {course.title}
                    </h3>

                    {/* Meta info row: Duration, Flexible Delivery Modes, Rating */}
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {course.duration}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span
                        className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]"
                        title="Available in Live Online, Classroom In-Person, On-Site & 1-on-1 Mentorship modes"
                      >
                        <Layers className="w-3 h-3 text-[#ea6d24]" />
                        <span>Online • Classroom • 1-on-1</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {course.rating || 4.9}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.summary}
                    </p>

                    {/* Key Curriculum Highlights */}
                    {course.curriculum && course.curriculum.length > 0 && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Key Syllabus Highlights:
                        </div>
                        {course.curriculum.slice(0, 3).map((mod, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 line-clamp-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="truncate">{mod}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenSyllabus(course)}
                      className="text-xs font-semibold text-slate-700 hover:text-[#ea6d24] flex items-center gap-1.5 py-1.5 px-2.5 rounded-md hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                      title="Download Syllabus PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-orange-500" />
                      <span>Syllabus</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="text-xs font-bold text-[#152e4d] hover:text-[#ea6d24] px-3 py-1.5 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => onOpenAdvisorModal('course_info', `Enroll in ${course.title}`)}
                        className="text-xs font-bold bg-[#ea6d24] hover:bg-[#d85e19] text-white px-3.5 py-1.5 rounded-md transition-all shadow-xs hover:shadow-orange-500/20 cursor-pointer"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <Network className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching Cisco courses found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any courses matching your current filter criteria or "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveExamType('all');
                setSelectedTrack('all');
              }}
              className="bg-[#152e4d] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 5. Why Choose Learnify Solutions for Cisco Certifications (4 Pillars) */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-[#152e4d] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-orange-400 uppercase tracking-wider">
              The Learnify Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise-Grade Cisco Training Infrastructure
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Engineered specifically for network engineers, SOC analysts, and enterprise IT teams aiming for 100% exam success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#ea6d24]">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Dedicated Cisco Pods</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                24/7 individual pod access with pre-configured topologies for Catalyst switches, Nexus, Firepower, and Cisco ISE.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">CCSI Certified Trainers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learn directly from Certified Cisco Systems Instructors and double-CCIE architects with real-world datacenter experience.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Pearson VUE Exam Prep</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scenario questions, performance-based question (PBQ) drills, and full exam simulations ensuring first-attempt victory.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Corporate Cohort Customization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tailored enterprise syllabus aligned to your organization's specific network topology, migration timeline, and SLAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Corporate & 1-on-1 Consultation Form */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-[#152e4d] to-slate-900 rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <span className="text-xs font-extrabold text-orange-400 uppercase tracking-wider">
                Enterprise Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 mb-3">
                Need Corporate Cohort or 1-on-1 Cisco Training?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Tell us your engineering team's target certification path, timeline, and batch size.
                Our Cisco solutions director will prepare a customized proposal with dedicated lab topologies within 24 hours.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {quoteSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-xl p-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Thank You! Inquiry Received</h4>
                  <p className="text-xs text-emerald-200">
                    Our Cisco enterprise advisor will reach out with customized batch details and pricing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteForm.fullName}
                        onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        placeholder="+1 555-0199"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                        placeholder="Enterprise Corp"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Desired Cisco Track
                      </label>
                      <select
                        value={quoteForm.selectedTrack}
                        onChange={(e) => setQuoteForm({ ...quoteForm, selectedTrack: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                      >
                        <option value="CCNA 200-301 Network Associate">CCNA 200-301 (Network Associate)</option>
                        <option value="CCNP Enterprise (ENCOR 350-401 + ENARSI 300-410)">CCNP Enterprise (ENCOR + ENARSI)</option>
                        <option value="CCNP Security (SCOR 350-701 + ISE / Firepower)">CCNP Security (SCOR + ISE / Firepower)</option>
                        <option value="CCNP Data Center (DCCOR 350-601 + ACI 300-620)">CCNP Data Center (DCCOR + ACI)</option>
                        <option value="DevNet Professional (DEVCOR 350-901 + Automation)">DevNet Professional (DEVCOR + Automation)</option>
                        <option value="Custom Cisco Multi-Track Cohort">Custom Cisco Multi-Track Cohort</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Cohort Size
                      </label>
                      <select
                        value={quoteForm.seats}
                        onChange={(e) => setQuoteForm({ ...quoteForm, seats: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
                      >
                        <option value="1 Participant (Personal 1-on-1 Mentorship)">1 Participant (1-on-1 Mentorship)</option>
                        <option value="2-5 Participants (Small Team)">2-5 Participants (Small Team)</option>
                        <option value="5-15 Participants (Standard Batch)">5-15 Participants (Standard Batch)</option>
                        <option value="15+ Participants (Enterprise Cohort)">15+ Participants (Enterprise Cohort)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold py-3 px-6 rounded-lg text-sm transition-all shadow-lg hover:shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Custom Cisco Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cisco Certification FAQs */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-[#ea6d24] uppercase tracking-wider">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152e4d] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Everything you need to know about Cisco certifications, exam codes, and remote lab topologies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-[#152e4d] hover:text-[#ea6d24] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-[#ea6d24]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Syllabus Download Modal */}
      {selectedCourseForSyllabus && (
        <SyllabusDownloadModal
          isOpen={isSyllabusModalOpen}
          course={selectedCourseForSyllabus}
          onClose={() => {
            setIsSyllabusModalOpen(false);
            setSelectedCourseForSyllabus(null);
          }}
        />
      )}
    </div>
  );
};
