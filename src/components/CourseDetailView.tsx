import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { sampleCourses } from '../data/coursesData';
import { normalizeImageUrl, getSvgCourseFallback } from '../utils/imageHelper';
import { 
  Check, 
  Clock, 
  Download, 
  ChevronRight, 
  MessageSquare, 
  FileText,
  Sparkles,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  HelpCircle,
  Laptop,
  Layers,
  CheckCircle2,
  Users,
  Target,
  ArrowRight,
  X
} from 'lucide-react';
import { SyllabusDownloadModal } from './SyllabusDownloadModal';

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
  onSubmitLead: (data: any) => void;
  onDownloadSyllabus?: (course: Course) => void;
  onNavigate?: (page: string) => void;
}

type TabType = 'overview' | 'learn' | 'prerequisites' | 'outline' | 'schedule' | 'faqs';

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  onBack,
  onSubmitLead,
  onDownloadSyllabus,
  onNavigate
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [course.id]);

  // Tab navigation state (matching the screenshot)
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [headerOffset, setHeaderOffset] = useState(120);

  useEffect(() => {
    const updateOffset = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderOffset(header.offsetHeight);
      }
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  const switchTab = (tabId: TabType) => {
    const el = document.getElementById('course-tab-content-area');
    if (el) {
      const yOffset = -(headerOffset + 54);
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset + yOffset);
      window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
    }
    setActiveTab(tabId);
  };

  const scrollToForm = () => {
    const el = document.getElementById('request-info-form');
    if (el) {
      const yOffset = -(headerOffset + 40);
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  // Reservation Modal state for batch booking
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveBatch, setReserveBatch] = useState('Weekend Track (Saturday & Sunday - 4 Weeks)');
  const [reserveMode, setReserveMode] = useState('Live Online (Instructor-Led)');
  const [reserveForm, setReserveForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [reserveSubmitted, setReserveSubmitted] = useState(false);

  const openReserveModal = (batchTitle: string, defaultMode: string = 'Live Online (Instructor-Led)') => {
    setReserveBatch(batchTitle);
    setReserveMode(defaultMode);
    setReserveSubmitted(false);
    setIsReserveModalOpen(true);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveForm.fullName || !reserveForm.email) return;

    onSubmitLead({
      fullName: reserveForm.fullName,
      email: reserveForm.email,
      phone: reserveForm.phone,
      company: reserveForm.company,
      inquiryType: 'batch_reservation',
      selectedDomain: course.domain,
      courseTitle: course.title,
      courseId: course.id,
      message: `Batch Reservation: ${reserveBatch} | Mode: ${reserveMode}. Notes: ${reserveForm.message || 'None'}`,
    });

    setReserveSubmitted(true);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;

    onSubmitLead({
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      inquiryType: 'course_info',
      selectedDomain: course.domain,
      courseTitle: course.title,
      courseId: course.id,
      message: `Requested more information for course: ${course.title}`,
    });

    setSubmitted(true);
  };

  const handleOpenSyllabus = () => {
    if (onDownloadSyllabus) {
      onDownloadSyllabus(resolvedCourse);
    } else {
      setIsSyllabusModalOpen(true);
    }
  };

  const getBadgeColor = (vendor: string) => {
    switch (vendor?.toLowerCase()) {
      case 'cisco':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'microsoft':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'comptia':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'aws':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Match sample course to guarantee rich official curriculum, domains, percentages, and subtopics
  const matchingSample = sampleCourses.find((sc) => sc.id === course.id);
  const resolvedCourse: Course = {
    ...matchingSample,
    ...course,
    imageUrl: course.imageUrl || matchingSample?.imageUrl || '',
    overview: (course.overview && course.overview.length > 150)
      ? course.overview
      : (matchingSample?.overview || course.overview || course.summary),
    learningObjectives: (course.learningObjectives && course.learningObjectives.length > 0)
      ? course.learningObjectives
      : (matchingSample?.learningObjectives || course.curriculum || []),
    prerequisites: (course.prerequisites && course.prerequisites.length > 0)
      ? course.prerequisites
      : (matchingSample?.prerequisites || ['Basic computer literacy and internet navigation skills.', 'Foundational knowledge of IP networking or relevant operating systems.']),
    outline: (course.outline && course.outline.length > 0)
      ? course.outline
      : (matchingSample?.outline || []),
    curriculum: (course.curriculum && course.curriculum.length > 0)
      ? course.curriculum
      : (matchingSample?.curriculum || []),
  };

  const overview = resolvedCourse.overview || resolvedCourse.summary;
  const learningObjectives = resolvedCourse.learningObjectives || [];
  const prerequisites = resolvedCourse.prerequisites || [];
  const outline = resolvedCourse.outline && resolvedCourse.outline.length > 0 
    ? resolvedCourse.outline 
    : (resolvedCourse.curriculum || []).map((item, idx) => {
        const cleanItem = item.replace(/^(Module|Domain)\s+\d+[\d\.]*:\s*/i, '');
        const parts = cleanItem.split(/[:–-]/);
        const title = parts[0] ? parts[0].trim() : `Module ${idx + 1} Deep Dive`;
        const description = parts.slice(1).join(' - ').trim() || `Comprehensive technical instruction, hands-on lab exercises, and practical implementation covering ${cleanItem}.`;
        return {
          title: `Module ${idx + 1}: ${title}`,
          description: description
        };
      });

  // Tab definitions
  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'learn', label: 'What You’ll Learn' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'outline', label: 'Course Content Outline', count: outline.length },
    { id: 'schedule', label: 'Schedule & Batches' },
    { id: 'faqs', label: 'FAQs' },
  ];

  // Dynamic FAQs based on vendor and course
  const courseFaqs = [
    {
      q: `What is the format of the ${course.title} examination?`,
      a: `The official examination includes multiple-choice, drag-and-drop, and scenario-based simulation questions administered globally through Pearson VUE testing centers and online proctoring.`
    },
    {
      q: 'Will I receive access to live hands-on labs?',
      a: 'Yes! Every enrolled participant receives dedicated remote lab access with pre-configured topologies for the entire course duration and practice period.'
    },
    {
      q: 'Are class sessions recorded for later review?',
      a: 'Yes, all live instructor-led sessions are recorded in high-definition and made available inside your student portal for 365 days.'
    },
    {
      q: 'Can our enterprise sponsor this training with corporate purchase orders?',
      a: 'Absolutely. We accept corporate purchase orders, training credits, and customized invoice arrangements for corporate engineering teams.'
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* 1. Hero Section (White background) */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <button onClick={onBack} className="hover:text-[#ea6d24] transition-colors cursor-pointer font-semibold">
              Courses
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#ea6d24] font-semibold">{course.certificationVendor || course.domain}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 line-clamp-1 font-medium">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left: Text & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${getBadgeColor(course.certificationVendor)}`}>
                  {course.certificationVendor || course.domain}
                </span>
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {course.skillLevel || course.level || 'Intermediate'}
                </span>
                {course.examCode && (
                  <span className="px-3 py-1 text-[11px] font-bold tracking-wider rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Exam: {course.examCode}</span>
                  </span>
                )}
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-orange-50 text-[#ea6d24] border border-orange-200 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#ea6d24]" />
                  <span>Online • Classroom • 1-on-1 Mentorship</span>
                </span>
                {course.fastTrack && (
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#ea6d24] text-white">
                    Fast-Track
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#152e4d] leading-tight tracking-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {course.summary}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={scrollToForm}
                  className="w-full sm:w-auto bg-[#ea6d24] hover:bg-[#d85e19] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-download-syllabus-btn"
                  onClick={handleOpenSyllabus}
                  className="w-full sm:w-auto bg-white border-2 border-[#ea6d24] text-[#ea6d24] hover:bg-orange-50 hover:border-[#d85e19] hover:text-[#d85e19] px-8 py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Syllabus</span>
                </button>
              </div>
            </div>

            {/* Hero Right: Image & Quick Stats */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-100 border border-slate-200 group">
                <img
                  src={normalizeImageUrl(course.imageUrl, 'course')}
                  alt={course.imageAlt || course.title}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = getSvgCourseFallback(course.title, course.certificationVendor || course.domain);
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152e4d]/70 via-transparent to-transparent" />
                
                {/* Floating Duration Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-[#ea6d24]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration</div>
                    <div className="text-xs font-bold text-[#152e4d]">{course.duration}</div>
                  </div>
                </div>

                {/* Floating Syllabus Ready Pill */}
                <div className="absolute top-4 right-4 bg-[#152e4d]/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow border border-white/10 flex items-center gap-1.5 text-white text-xs font-bold">
                  <FileText className="w-3.5 h-3.5 text-[#ea6d24]" />
                  <span>Official Curriculum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Tab Navigation Bar (Sticky with precise header offset) */}
      <div
        className="sticky z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-[top] duration-150"
        style={{ top: `${headerOffset}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto scrollbar-none py-0">
            {/* Tabs List */}
            <nav className="flex items-center space-x-6 sm:space-x-8" aria-label="Course Sections">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`relative py-3.5 text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-[#ea6d24] font-bold'
                        : 'text-slate-600 font-medium hover:text-slate-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                        isActive ? 'bg-orange-100 text-[#ea6d24]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                    {/* Active Underline Indicator Bar */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea6d24] rounded-t-sm" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div id="course-tab-content-area" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Dynamic Tab Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <section className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-[#152e4d] flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-[#ea6d24]" />
                      <span>Course Overview</span>
                    </h2>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    <div className="flex-1 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                      {overview.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#ea6d24]" />
                        <span>Target Audience</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Network Engineers, Systems Administrators, Cloud Architects, and IT specialists seeking formal certification.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Laptop className="w-4 h-4 text-blue-600" />
                        <span>Delivery Mode</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Interactive Live Instructor-Led online training with 24/7 access to remote cloud lab pods.
                      </p>
                    </div>
                  </div>

                  {/* Quick Next Tab Switcher */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={handleOpenSyllabus}
                      className="text-xs font-bold text-[#ea6d24] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Syllabus PDF</span>
                    </button>

                    <button
                      onClick={() => switchTab('learn')}
                      className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: What You’ll Learn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* TAB 2: WHAT YOU'LL LEARN */}
              {activeTab === 'learn' && (
                <section className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-[#152e4d] flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-[#ea6d24]" />
                      <span>What You’ll Learn</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Key technical capabilities, architecture concepts, and operational skills validated by this course.
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-800 font-semibold">
                    By completing this training program, participants will be able to:
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {learningObjectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-orange-50/40 border border-orange-100/80">
                        <CheckCircle2 className="w-5 h-5 text-[#ea6d24] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                          {obj}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => switchTab('overview')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Back to Overview
                    </button>

                    <button
                      onClick={() => switchTab('prerequisites')}
                      className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: Prerequisites</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* TAB 3: PREREQUISITES */}
              {activeTab === 'prerequisites' && (
                <section className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-[#152e4d] flex items-center gap-2">
                      <Target className="w-6 h-6 text-[#ea6d24]" />
                      <span>Course Prerequisites</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Recommended background knowledge and baseline technical competencies before enrollment.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {prerequisites.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-[#152e4d] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200/60 text-xs text-slate-800 leading-relaxed">
                    <strong className="text-[#ea6d24]">💡 Need prerequisite preparation?</strong> Talk to our technical advisors about complimentary refresher modules or foundation workshops.
                  </div>

                  {/* Navigation Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => switchTab('learn')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Back to What You’ll Learn
                    </button>

                    <button
                      onClick={() => switchTab('outline')}
                      className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: Course Content Outline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* TAB 4: COURSE CONTENT OUTLINE */}
              {activeTab === 'outline' && (
                <section className="space-y-8 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-2xl font-bold text-[#152e4d] flex items-center gap-2">
                        <FileText className="w-6 h-6 text-[#ea6d24]" />
                        <span>Course Content Outline</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Official certification domains, exam weighting, and core technical topics.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenSyllabus}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors shrink-0 cursor-pointer self-start sm:self-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Full Syllabus PDF</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {outline.map((item, idx) => (
                      <div key={idx} className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#152e4d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-[#152e4d]">{item.title}</h3>
                        </div>

                        <ul className="list-disc list-outside ml-9 space-y-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
                          {item.items && item.items.length > 0 ? (
                            item.items.map((sub, sIdx) => {
                              const colonIdx = sub.indexOf(':');
                              if (colonIdx > 0 && colonIdx < 45) {
                                const prefix = sub.substring(0, colonIdx + 1);
                                const rest = sub.substring(colonIdx + 1);
                                return (
                                  <li key={sIdx}>
                                    <strong className="font-semibold text-slate-900">{prefix}</strong>
                                    <span>{rest}</span>
                                  </li>
                                );
                              }
                              return <li key={sIdx}>{sub}</li>;
                            })
                          ) : item.description ? (
                            <li>{item.description}</li>
                          ) : null}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => switchTab('prerequisites')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Back to Prerequisites
                    </button>

                    <button
                      onClick={() => switchTab('schedule')}
                      className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: Schedule & Batches</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* TAB 5: SCHEDULE & BATCHES */}
              {activeTab === 'schedule' && (
                <section className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-[#152e4d] flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-[#ea6d24]" />
                      <span>Upcoming Batch Schedules</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Choose from flexible weekday, weekend, and fast-track bootcamps with 100% guaranteed delivery.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl border border-orange-200/80 bg-orange-50/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#ea6d24] uppercase tracking-wider bg-orange-100 px-2.5 py-0.5 rounded-full">
                          Weekend Track
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">4 Weeks</span>
                      </div>
                      <h4 className="text-base font-bold text-[#152e4d]">Saturday & Sunday Batch</h4>
                      <p className="text-xs text-slate-600">
                        4 Hours / Day • Morning (09:00 - 13:00 EST) or Evening (14:00 - 18:00 EST).
                      </p>
                      <button
                        onClick={() => openReserveModal('Weekend Track (Saturday & Sunday - 4 Weeks)', 'Live Online')}
                        className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] hover:underline pt-1 inline-block cursor-pointer"
                      >
                        Reserve Weekend Seat →
                      </button>
                    </div>

                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#152e4d] uppercase tracking-wider bg-slate-200/70 px-2.5 py-0.5 rounded-full">
                          Weekday Intensive
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">5 Days</span>
                      </div>
                      <h4 className="text-base font-bold text-[#152e4d]">Monday - Friday Bootcamp</h4>
                      <p className="text-xs text-slate-600">
                        8 Hours / Day • Full Immersion with dedicated lab instructor.
                      </p>
                      <button
                        onClick={() => openReserveModal('Weekday Intensive Bootcamp (Monday - Friday - 5 Days)', 'Classroom / Live Virtual')}
                        className="text-xs font-bold text-[#152e4d] hover:text-[#ea6d24] hover:underline pt-1 inline-block cursor-pointer"
                      >
                        Reserve Bootcamp Seat →
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-[#152e4d] text-white rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-orange-400">Need Custom Corporate Timings?</div>
                      <div className="text-xs text-slate-300">We customize cohort schedules for private enterprise teams.</div>
                    </div>
                    <button
                      onClick={() => openReserveModal('Custom Corporate Cohort & Timings', 'Dedicated Corporate Batch')}
                      className="bg-[#ea6d24] hover:bg-[#d85e19] text-white text-xs font-bold px-3.5 py-2 rounded-lg shrink-0 cursor-pointer transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>

                  {/* Navigation Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => switchTab('outline')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Back to Course Outline
                    </button>

                    <button
                      onClick={() => switchTab('faqs')}
                      className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: FAQs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* TAB 6: FAQS */}
              {activeTab === 'faqs' && (
                <section className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-[#152e4d] flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-[#ea6d24]" />
                      <span>Frequently Asked Questions</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Everything you need to know about exam registration, lab topologies, and certification readiness.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {courseFaqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <h4 className="text-sm font-bold text-[#152e4d]">{faq.q}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => switchTab('schedule')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Back to Schedule
                    </button>

                    <button
                      onClick={() => switchTab('overview')}
                      className="text-xs font-bold text-[#ea6d24] hover:text-[#d85e19] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Back to Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </section>
              )}

            </div>
          </div>

          {/* Right Column (Sticky Form) */}
          <div className="lg:col-span-1">
            <div
              id="request-info-form"
              className="sticky bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-lg shadow-slate-200/50 space-y-6 transition-[top] duration-150"
              style={{ top: `${headerOffset + 65}px` }}
            >
              <div className="text-center space-y-1.5 pb-2">
                <h3 className="text-xl font-extrabold text-[#152e4d]">Request Course Details</h3>
                <p className="text-xs text-slate-500">Contact us to schedule a free technical consultation or receive customized pricing.</p>
              </div>

              {/* Quick Actions (WhatsApp/Email tags) */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://wa.me/918810255422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="mailto:info@learnify-solutions.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <span className="text-blue-600">✉</span>
                  <span>Email</span>
                </a>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-emerald-800 text-lg">Request Sent!</h4>
                  <p className="text-xs text-emerald-600">
                    Thank you! An advisor will contact you shortly about this course.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-700 hover:underline pt-2 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24] transition-colors"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24] transition-colors"
                    />
                  </div>
                  
                  <input
                    type="email"
                    required
                    placeholder="Your Work Email*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24] transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24] transition-colors"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold text-xs sm:text-sm py-3 rounded-lg shadow-sm transition-all cursor-pointer mt-1"
                  >
                    Submit Enrollment Inquiry
                  </button>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleOpenSyllabus}
                      className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#ea6d24]" />
                      <span>Download Course Syllabus (PDF)</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-slate-400 mt-2 leading-relaxed px-2">
                    By submitting this form, you agree to our{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.('privacy');
                      }}
                      className="underline hover:text-slate-600 cursor-pointer"
                    >
                      Privacy Policy
                    </button>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Batch Reservation Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div
            id="batch-reservation-modal"
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[94vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {reserveSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#152e4d]">Seat Reservation Requested!</h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-800">{reserveForm.fullName}</span>. We have reserved your provisional seat for <span className="font-semibold text-[#ea6d24]">{reserveBatch}</span>.
                </p>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 text-left space-y-1">
                  <div><strong>Course:</strong> {course.title}</div>
                  <div><strong>Track:</strong> {reserveBatch}</div>
                  <div><strong>Mode:</strong> {reserveMode}</div>
                </div>
                <p className="text-xs text-slate-500">
                  Our training coordinator will contact you at <span className="font-semibold">{reserveForm.email}</span> with cohort confirmation and calendar invites.
                </p>
                <button
                  onClick={() => {
                    setIsReserveModalOpen(false);
                    setReserveSubmitted(false);
                  }}
                  className="w-full bg-[#152e4d] hover:bg-[#0f2238] text-white py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-5 pr-8">
                  <span className="text-[11px] font-bold text-[#ea6d24] uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Fast-Track Seat Reservation
                  </span>
                  <h3 className="text-xl font-bold text-[#152e4d] mt-2">
                    Reserve Batch Seat
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {course.title}
                  </p>
                </div>

                <form onSubmit={handleReserveSubmit} className="space-y-4">
                  {/* Selected Track / Batch */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Selected Cohort Track
                    </label>
                    <select
                      value={reserveBatch}
                      onChange={(e) => setReserveBatch(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-slate-50 font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24]"
                    >
                      <option value="Weekend Track (Saturday & Sunday - 4 Weeks)">Weekend Track (Saturday & Sunday - 4 Weeks)</option>
                      <option value="Weekday Intensive Bootcamp (Monday - Friday - 5 Days)">Weekday Intensive Bootcamp (Monday - Friday - 5 Days)</option>
                      <option value="1-on-1 Dedicated Mentorship (Flexible Timings)">1-on-1 Dedicated Mentorship (Flexible Timings)</option>
                      <option value="Custom Corporate Cohort & Timings">Custom Corporate Cohort & Timings</option>
                    </select>
                  </div>

                  {/* Delivery Mode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Delivery Mode
                    </label>
                    <select
                      value={reserveMode}
                      onChange={(e) => setReserveMode(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-slate-50 font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24]"
                    >
                      <option value="Live Online (Instructor-Led Virtual)">Live Online (Instructor-Led Virtual)</option>
                      <option value="Classroom In-Person Bootcamp">Classroom In-Person Bootcamp</option>
                      <option value="Hybrid / Dedicated Enterprise On-Site">Hybrid / Dedicated Enterprise On-Site</option>
                      <option value="Self-Paced with 24/7 Lab Access">Self-Paced with 24/7 Lab Access</option>
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={reserveForm.fullName}
                        onChange={(e) => setReserveForm({ ...reserveForm, fullName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={reserveForm.email}
                        onChange={(e) => setReserveForm({ ...reserveForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={reserveForm.phone}
                        onChange={(e) => setReserveForm({ ...reserveForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Company (Optional)</label>
                      <input
                        type="text"
                        placeholder="Organization Name"
                        value={reserveForm.company}
                        onChange={(e) => setReserveForm({ ...reserveForm, company: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Special Requirements / Timings</label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Morning slots preferred, need team invoice..."
                      value={reserveForm.message}
                      onChange={(e) => setReserveForm({ ...reserveForm, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#ea6d24] focus:ring-1 focus:ring-[#ea6d24] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Confirm Seat Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Internal Modal fallback */}
      {isSyllabusModalOpen && (
        <SyllabusDownloadModal
          isOpen={isSyllabusModalOpen}
          onClose={() => setIsSyllabusModalOpen(false)}
          course={course}
        />
      )}
    </div>
  );
};
