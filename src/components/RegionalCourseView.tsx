import React, { useState, useEffect, useMemo } from 'react';
import {
  ResolvedRegionalCoursePage,
  RegionCode,
  REGION_CONFIGS,
  getRegionalCoursePages,
} from '../data/regionalSeoData';
import { normalizeImageUrl, getSvgCourseFallback } from '../utils/imageHelper';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Globe2,
  Laptop,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { SyllabusDownloadModal } from './SyllabusDownloadModal';

interface RegionalCourseViewProps {
  page: ResolvedRegionalCoursePage;
  onNavigateHome: () => void;
  onNavigateHub: (region: RegionCode) => void;
  onNavigateGlobalCourse: (courseId: string) => void;
  onSwitchCourseRegion: (targetRegion: RegionCode, courseId: string) => void;
  onNavigateRegionalCourse: (page: ResolvedRegionalCoursePage) => void;
  onSubmitLead: (data: any) => void;
}

export const RegionalCourseView: React.FC<RegionalCourseViewProps> = ({
  page,
  onNavigateHome,
  onNavigateHub,
  onNavigateGlobalCourse,
  onSwitchCourseRegion,
  onNavigateRegionalCourse,
  onSubmitLead,
}) => {
  const { region, meta, course, localizedOverview, localizedFaqs } = page;
  const otherRegionCode: RegionCode = region.code === 'ae' ? 'za' : 'ae';
  const otherRegion = REGION_CONFIGS[otherRegionCode];

  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [page.slug, region.code]);

  const scrollToInquiryForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('regional-inquiry-form');
    if (el) {
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight + 24 : 130;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    onSubmitLead({
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      inquiryType: 'course_info',
      selectedDomain: course.domain,
      courseTitle: `${course.title} (${region.shortName})`,
      courseId: course.id,
      message: `Regional SEO Inquiry (${region.countryName} / ${region.currency}): ${page.h1Title} | URL: ${page.canonicalUrl}`,
    });

    setSubmitted(true);
  };

  const relatedRegionalCourses = useMemo(
    () =>
      getRegionalCoursePages(region.code)
        .filter((p) => p.course.id !== course.id && p.course.certificationVendor === course.certificationVendor)
        .slice(0, 3),
    [region.code, course.id, course.certificationVendor]
  );

  const outlineItems = useMemo(
    () =>
      course.outline && course.outline.length > 0
        ? course.outline
        : (course.curriculum || []).map((c, idx) => ({
            title: c,
            items: [`Module ${idx + 1} instructor-led walkthrough and cloud sandbox practice`],
          })),
    [course.outline, course.curriculum]
  );

  // Note: getSvgCourseFallback(title, vendor) expects title first, vendor second
  const fallbackImg = useMemo(
    () => getSvgCourseFallback(meta.shortName, course.certificationVendor),
    [meta.shortName, course.certificationVendor]
  );
  const heroImageSrc = normalizeImageUrl(course.imageUrl, 'course') || fallbackImg;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* 1. Balanced 2-Column Localized Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
          {/* Breadcrumbs + Region Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#ea6d24] transition-colors font-semibold"
              >
                Home
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <a
                href={`/${region.code}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHub(region.code);
                }}
                className="hover:text-[#ea6d24] transition-colors font-semibold"
              >
                {region.shortName} Training
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">{meta.shortName}</span>
            </nav>

            {/* Bidirectional Region Switcher */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs max-w-full overflow-x-auto">
              <a
                href={`/ae/${meta.aeSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchCourseRegion('ae', course.id);
                }}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  region.code === 'ae'
                    ? 'bg-white text-[#152e4d] shadow-xs'
                    : 'text-slate-600 hover:text-[#152e4d]'
                }`}
              >
                UAE ({REGION_CONFIGS.ae.currency})
              </a>
              <a
                href={`/za/${meta.zaSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchCourseRegion('za', course.id);
                }}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  region.code === 'za'
                    ? 'bg-white text-[#152e4d] shadow-xs'
                    : 'text-slate-600 hover:text-[#152e4d]'
                }`}
              >
                South Africa ({REGION_CONFIGS.za.currency})
              </a>
              <a
                href={`/course/${course.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateGlobalCourse(course.id);
                }}
                className="px-3 py-1.5 rounded-md font-semibold text-slate-600 hover:text-[#152e4d] transition-colors whitespace-nowrap"
              >
                Global
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="text-[#ea6d24]">{course.certificationVendor} Authorized Curriculum</span>
                <span aria-hidden="true">·</span>
                <span>{region.countryName}</span>
                {course.examCode && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Exam {course.examCode}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                {page.h1Title}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">{localizedOverview}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="text-sm font-bold text-[#152e4d] mt-0.5">{course.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Live Timezone</p>
                  <p className="text-sm font-bold text-[#152e4d] mt-0.5">{region.timezone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Cities Served</p>
                  <p className="text-sm font-bold text-[#152e4d] mt-0.5">{region.cities.slice(0, 2).join(', ')}+</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Corporate Invoicing</p>
                  <p className="text-sm font-bold text-[#152e4d] mt-0.5">{region.currency} / PO</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#regional-inquiry-form"
                  onClick={scrollToInquiryForm}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors shadow-xs min-h-[44px]"
                >
                  <span>Request {region.shortName} Batch &amp; Fee</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsSyllabusModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#152e4d] border border-slate-300 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                >
                  <Download className="w-4 h-4 text-[#ea6d24]" />
                  <span>Download Official Syllabus</span>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Visual Card Matching CourseDetailView */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-video shadow-md group">
                <img
                  src={heroImageSrc}
                  alt={page.h1Title}
                  width={640}
                  height={360}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = fallbackImg;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#152e4d]/80 via-[#152e4d]/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
                  <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold text-[#152e4d] flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-[#ea6d24]" />
                    <span>{region.timezone} Live Cohorts</span>
                  </div>
                  <div className="bg-[#152e4d]/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/15">
                    24/7 Cloud Sandbox Labs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content + Sticky Regional Lead Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 8 Columns: Value Props, Schedules, Objectives, Outline */}
          <div className="lg:col-span-8 space-y-10">
            {/* 3 Regional Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <MapPin className="w-5 h-5 text-[#ea6d24]" />
                <h2 className="text-sm font-bold text-[#152e4d]">
                  Regional Demand in {region.shortName}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {region.code === 'ae' ? meta.aeIndustryAngle : meta.zaIndustryAngle}
                </p>
                <p className="text-xs text-slate-500 pt-1">
                  <strong className="text-slate-700">Key Roles:</strong>{' '}
                  {region.code === 'ae' ? meta.aeRoleDemand : meta.zaRoleDemand}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <Laptop className="w-5 h-5 text-[#ea6d24]" />
                <h2 className="text-sm font-bold text-[#152e4d]">24/7 Cloud Sandbox Labs</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Practice every exam domain hands-on in browser-based cloud environments with zero local hardware
                  requirements and 365-day HD recordings.
                </p>
                <p className="text-xs text-slate-500 pt-1">{region.examCenterNote}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#ea6d24]" />
                <h2 className="text-sm font-bold text-[#152e4d]">
                  {region.currency} Corporate Delivery
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">{region.invoicingNote}</p>
                <p className="text-xs text-slate-500 pt-1">
                  Serving teams across {region.businessDistricts}.
                </p>
              </div>
            </div>

            {/* Batch Schedule Table */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-[#152e4d]">
                    Upcoming {meta.shortName} Cohorts — {region.timezone}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Guaranteed-to-run live batches with instructor mentorship and exam prep.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#ea6d24]">
                  Timezone: {region.timezone}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {region.schedules.map((sched) => (
                  <div key={sched.name} className="border border-slate-200 rounded-xl p-4 bg-[#f8fafc] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-[#ea6d24]" />
                      <span>{sched.format}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#152e4d]">{sched.name}</h3>
                    <p className="text-sm font-semibold text-[#ea6d24] font-mono tabular-nums">{sched.timing}</p>
                    <p className="text-xs text-slate-600">{sched.cadence}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#152e4d] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ea6d24]" />
                <span>What You Will Master</span>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(course.learningObjectives || course.curriculum || []).map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Curriculum Outline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#152e4d] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#ea6d24]" />
                <span>Official Curriculum Outline ({course.examCode || course.certificationVendor})</span>
              </h2>
              <div className="space-y-4">
                {outlineItems.map((section, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-[#f8fafc]">
                    <h3 className="text-sm font-bold text-[#152e4d] mb-2">{section.title}</h3>
                    {'items' in section && Array.isArray(section.items) && (
                      <ul className="space-y-1.5">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-[#ea6d24] font-bold">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Localized FAQs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-bold text-[#152e4d]">
                {meta.shortName} in {region.countryName} — Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {localizedFaqs.map((faq) => (
                  <div key={faq.q} className="border border-slate-200 rounded-xl p-4 bg-[#f8fafc] space-y-1.5">
                    <h3 className="text-sm font-bold text-[#152e4d]">{faq.q}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Sticky Inquiry Form */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <div
              id="regional-inquiry-form"
              className="scroll-mt-32 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div>
                <h2 className="text-lg font-bold text-[#152e4d]">
                  Get {region.shortName} Pricing ({region.currency}) &amp; {region.timezone} Dates
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  For individuals or corporate teams in {region.primaryCitiesLabel}.
                </p>
              </div>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm space-y-1.5">
                  <p className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Inquiry Received for {region.shortName}
                  </p>
                  <p className="text-xs leading-relaxed">
                    Our regional {region.shortName} advisor will send the {region.timezone} batch calendar and{' '}
                    {region.currency} fee breakdown shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#ea6d24] focus:outline-hidden min-h-[42px]"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#ea6d24] focus:outline-hidden min-h-[42px]"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Work or Personal Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#ea6d24] focus:outline-hidden min-h-[42px]"
                  />
                  <input
                    type="tel"
                    placeholder={`Phone (${region.code === 'ae' ? '+971...' : '+27...'})`}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#ea6d24] focus:outline-hidden min-h-[42px]"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#ea6d24] focus:outline-hidden min-h-[42px]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                  >
                    Request {region.shortName} Schedule &amp; Quote
                  </button>
                </form>
              )}

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>98.4% First-Attempt Pass Rate</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{region.currency} &amp; USD Corporate PO Accepted</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>24/7 Browser Cloud Labs + HD Replays</span>
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Internal Linking: Related Courses in Same Region + Cross-Region Link */}
        {relatedRegionalCourses.length > 0 && (
          <div className="mt-14 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-[#152e4d]">
                More {course.certificationVendor} Courses in {region.shortName}
              </h2>
              <a
                href={`/${otherRegion.code}/${otherRegion.code === 'ae' ? meta.aeSlug : meta.zaSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchCourseRegion(otherRegion.code, course.id);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ea6d24] hover:underline"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>View {meta.shortName} in {otherRegion.countryName}</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedRegionalCourses.map((rel) => {
                const relHref = `/${region.code}/${rel.slug}`;
                return (
                  <a
                    key={rel.slug}
                    href={relHref}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateRegionalCourse(rel);
                    }}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ea6d24]/60 transition-colors space-y-2 block"
                  >
                    <p className="text-xs font-semibold text-[#ea6d24]">
                      {rel.course.certificationVendor} · {rel.course.examCode}
                    </p>
                    <h3 className="text-sm font-bold text-[#152e4d]">
                      {rel.meta.shortName} ({region.shortName})
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{rel.course.summary}</p>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {isSyllabusModalOpen && (
        <SyllabusDownloadModal
          isOpen={isSyllabusModalOpen}
          onClose={() => setIsSyllabusModalOpen(false)}
          course={course}
          onSubmitLead={onSubmitLead}
        />
      )}
    </div>
  );
};
