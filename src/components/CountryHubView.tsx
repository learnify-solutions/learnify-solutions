import React, { useState, useMemo } from 'react';
import {
  ALL_REGION_CODES,
  RegionCode,
  REGION_CONFIGS,
  getRegionalCoursePages,
  ResolvedRegionalCoursePage,
} from '../data/regionalSeoData';
import { normalizeImageUrl, getSvgCourseFallback } from '../utils/imageHelper';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Building2,
} from 'lucide-react';

interface CountryHubViewProps {
  regionCode: RegionCode;
  onNavigateRegionalCourse: (page: ResolvedRegionalCoursePage) => void;
  onSwitchRegion: (region: RegionCode) => void;
  onNavigateHome: () => void;
  onNavigateGuides: () => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

export const CountryHubView: React.FC<CountryHubViewProps> = ({
  regionCode,
  onNavigateRegionalCourse,
  onSwitchRegion,
  onNavigateHome,
  onNavigateGuides,
  onOpenAdvisorModal,
}) => {
  const region = REGION_CONFIGS[regionCode];
  const otherRegions = useMemo(
    () => ALL_REGION_CODES.filter((c) => c !== regionCode).map((c) => REGION_CONFIGS[c]),
    [regionCode]
  );

  const [vendorFilter, setVendorFilter] = useState<'all' | 'CompTIA' | 'Microsoft' | 'AWS' | 'Cloud Native'>('all');

  const regionalPages = useMemo(() => getRegionalCoursePages(regionCode), [regionCode]);

  const filteredPages = useMemo(() => {
    if (vendorFilter === 'all') return regionalPages;
    return regionalPages.filter((p) => p.course.certificationVendor === vendorFilter);
  }, [regionalPages, vendorFilter]);

  const { comptiaCount, msCount, awsCount, cloudNativeCount } = useMemo(() => {
    let comptia = 0;
    let ms = 0;
    let aws = 0;
    let cloudNative = 0;
    for (const p of regionalPages) {
      if (p.course.certificationVendor === 'CompTIA') comptia++;
      else if (p.course.certificationVendor === 'Microsoft') ms++;
      else if (p.course.certificationVendor === 'AWS') aws++;
      else if (p.course.certificationVendor === 'Cloud Native') cloudNative++;
    }
    return { comptiaCount: comptia, msCount: ms, awsCount: aws, cloudNativeCount: cloudNative };
  }, [regionalPages]);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* 1. Editorial Country Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Breadcrumbs + Region Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
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
              <span className="text-slate-900 font-semibold">{region.shortName} IT Training</span>
            </nav>

            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 max-w-full overflow-x-auto">
              {ALL_REGION_CODES.map((code) => {
                const cfg = REGION_CONFIGS[code];
                const isActive = regionCode === code;
                return (
                  <a
                    key={code}
                    href={cfg.hubPath}
                    onClick={(e) => {
                      e.preventDefault();
                      onSwitchRegion(code);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[36px] inline-flex items-center ${
                      isActive
                        ? 'bg-white text-[#152e4d] shadow-xs'
                        : 'text-slate-600 hover:text-[#152e4d]'
                    }`}
                  >
                    {cfg.switcherLabel}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-5">
              <p className="text-sm font-semibold text-[#ea6d24] tracking-wide">
                Regional Certification Academy · {region.countryName} ({region.timezone})
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                CompTIA, Microsoft &amp; AWS Certification Training in {region.countryName}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Live instructor-led certification bootcamps and corporate upskilling tailored for IT teams and
                professionals across {region.cities.join(', ')}. Every program includes 24/7 cloud sandbox labs,{' '}
                {region.timezone} live batches, and {region.currency} corporate invoicing.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 pt-1">
                <span>{regionalPages.length} Official CompTIA, Microsoft, AWS &amp; Cloud Tracks</span>
                <span aria-hidden="true">·</span>
                <span>98.4% First-Attempt Pass Rate</span>
                <span aria-hidden="true">·</span>
                <span>{region.currency} / USD Corporate Purchase Orders</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => onOpenAdvisorModal('corporate_quote', `${region.shortName} Corporate Training`)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs min-h-[44px]"
                >
                  <span>Request {region.shortName} Corporate Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAdvisorModal('advisor', `${region.shortName} Individual Certification`)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#152e4d] border border-slate-300 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Get {region.timezone} Batch Schedule</span>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Regional Snapshot */}
            <aside className="lg:col-span-4 bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-bold text-[#152e4d]">
                {region.shortName} Delivery Snapshot
              </h2>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#ea6d24] mt-0.5 shrink-0" />
                  <div>
                    <dt className="font-semibold text-slate-900">Primary Hubs Served</dt>
                    <dd className="text-slate-600">{region.cities.join(' · ')}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#ea6d24] mt-0.5 shrink-0" />
                  <div>
                    <dt className="font-semibold text-slate-900">Live Cohort Timezone</dt>
                    <dd className="text-slate-600">{region.timezone} — Weekday, Evening &amp; Weekend</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-[#ea6d24] mt-0.5 shrink-0" />
                  <div>
                    <dt className="font-semibold text-slate-900">Enterprise Invoicing</dt>
                    <dd className="text-slate-600">{region.invoicingNote}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#ea6d24] mt-0.5 shrink-0" />
                  <div>
                    <dt className="font-semibold text-slate-900">Regional Governance Context</dt>
                    <dd className="text-slate-600 capitalize">{region.complianceContext}</dd>
                  </div>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. Target Course Directory (All 19 CompTIA & Microsoft Regional Pages) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#152e4d] tracking-tight">
              Certified {region.shortName} Training Programs
            </h2>
            <p className="text-slate-600 mt-1.5 text-sm sm:text-base max-w-2xl">
              Select a certification track below for {region.shortName}-specific batch timings, compliance mapping,
              syllabus outlines, and corporate pricing.
            </p>
          </div>

          {/* Interactive Vendor Filter Tabs */}
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setVendorFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                vendorFilter === 'all'
                  ? 'bg-white text-[#152e4d] shadow-xs'
                  : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              All Tracks ({regionalPages.length})
            </button>
            <button
              type="button"
              onClick={() => setVendorFilter('CompTIA')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                vendorFilter === 'CompTIA'
                  ? 'bg-white text-[#152e4d] shadow-xs'
                  : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              CompTIA ({comptiaCount})
            </button>
            <button
              type="button"
              onClick={() => setVendorFilter('Microsoft')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                vendorFilter === 'Microsoft'
                  ? 'bg-white text-[#152e4d] shadow-xs'
                  : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              Microsoft ({msCount})
            </button>
            <button
              type="button"
              onClick={() => setVendorFilter('AWS')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                vendorFilter === 'AWS'
                  ? 'bg-white text-[#152e4d] shadow-xs'
                  : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              AWS ({awsCount})
            </button>
            <button
              type="button"
              onClick={() => setVendorFilter('Cloud Native')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                vendorFilter === 'Cloud Native'
                  ? 'bg-white text-[#152e4d] shadow-xs'
                  : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              Kubernetes ({cloudNativeCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page, index) => {
            const href = `/${region.code}/${page.slug}`;
            const roleDemand = page.roleDemand;
            const thumbSrc = normalizeImageUrl(page.course.imageUrl, 'course');
            const thumbFallback = getSvgCourseFallback(
              page.meta.shortName,
              page.course.certificationVendor
            );

            return (
              <article
                key={page.slug}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ea6d24]/60 hover:shadow-sm transition-all group"
              >
                <div>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateRegionalCourse(page);
                    }}
                    className="block aspect-video bg-slate-100 overflow-hidden border-b border-slate-100"
                  >
                    <img
                      src={thumbSrc}
                      alt={page.h1Title}
                      width={640}
                      height={360}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = thumbFallback;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <span className="text-[#ea6d24]">{page.course.certificationVendor}</span>
                      <span aria-hidden="true">·</span>
                      <span>{page.course.examCode || page.meta.categoryTag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{page.course.duration}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#152e4d] leading-snug">
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigateRegionalCourse(page);
                        }}
                        className="hover:text-[#ea6d24] transition-colors"
                      >
                        {page.meta.shortName} — {region.shortName}
                      </a>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {page.localizedOverview}
                    </p>

                    <p className="text-xs text-slate-500 pt-1">
                      <strong className="text-slate-700">Target Roles:</strong> {roleDemand}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-[#fcfdfe]">
                  <span className="text-xs font-medium text-slate-500">
                    {region.timezone} · 24/7 Labs
                  </span>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateRegionalCourse(page);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ea6d24] hover:text-[#c95716] transition-colors"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Local Schedules & Industries */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-[#152e4d]">
              {region.shortName} Cohort Schedules ({region.timezone})
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Flexible delivery schedules engineered for individual career acceleration and enterprise teams across{' '}
              {region.businessDistricts}.
            </p>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-[#f8fafc]">
              {region.schedules.map((sched) => (
                <div key={sched.name} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#152e4d]">{sched.name}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {sched.cadence} · {sched.format}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#ea6d24] font-mono tabular-nums">
                    {sched.timing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-[#152e4d]">
              Industries &amp; Corporate Readiness in {region.countryName}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {region.examCenterNote} Our enterprise instructors contextualize lab scenarios around{' '}
              {region.complianceContext}.
            </p>
            <ul className="space-y-3">
              {region.keyIndustries.map((ind) => (
                <li key={ind} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0 mt-0.5" />
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="/blogs"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateGuides();
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#ea6d24] hover:text-[#c95716] transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Read {region.shortName} Exam Center &amp; {region.currency} Blogs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#152e4d]">
                  <Globe2 className="w-4 h-4 text-[#ea6d24]" />
                  Other Regional Hubs:
                </span>
                {otherRegions.map((other, idx) => (
                  <React.Fragment key={other.code}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <a
                      href={other.hubPath}
                      onClick={(e) => {
                        e.preventDefault();
                        onSwitchRegion(other.code);
                      }}
                      className="font-semibold text-[#152e4d] hover:text-[#ea6d24] underline underline-offset-4 transition-colors"
                    >
                      {other.shortName} ({other.currency})
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Country-Specific FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <h2 className="text-2xl font-bold text-[#152e4d] mb-6">
          Frequently Asked Questions — {region.countryName}
        </h2>
        <div className="space-y-4">
          {region.hubFaqs.map((faq) => (
            <div key={faq.q} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <h3 className="text-base font-bold text-[#152e4d]">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
