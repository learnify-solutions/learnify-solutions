import React, { useState, useMemo } from 'react';
import { SEO_GUIDES, SeoGuide } from '../data/guidesData';
import { RegionCode } from '../data/regionalSeoData';
import { ArrowRight, BookOpen, ChevronRight, Globe2, MapPin } from 'lucide-react';

interface GuidesHubViewProps {
  onSelectGuide: (guide: SeoGuide) => void;
  onNavigateHub: (region: RegionCode) => void;
  onNavigateHome: () => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

export const GuidesHubView: React.FC<GuidesHubViewProps> = ({
  onSelectGuide,
  onNavigateHub,
  onNavigateHome,
  onOpenAdvisorModal,
}) => {
  const [regionFilter, setRegionFilter] = useState<'all' | RegionCode>('all');

  const filteredGuides = useMemo(() => {
    if (regionFilter === 'all') return SEO_GUIDES;
    return SEO_GUIDES.filter((g) => g.region === regionFilter);
  }, [regionFilter]);

  const { aeCount, zaCount } = useMemo(() => {
    let ae = 0;
    let za = 0;
    for (const g of SEO_GUIDES) {
      if (g.region === 'ae') ae++;
      else if (g.region === 'za') za++;
    }
    return { aeCount: ae, zaCount: za };
  }, []);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Editorial Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
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
            <span className="text-slate-900 font-semibold">Exam Center &amp; Cost Guides</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm font-semibold text-[#ea6d24] tracking-wide">
                Certification Planning · UAE (AED / GST) &amp; South Africa (ZAR / SAST)
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                Exam Centers, Fees &amp; Certification Roadmaps for UAE &amp; South Africa
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Practical city-by-city guides covering where to write Pearson VUE exams across Gauteng, Johannesburg,
                Pretoria, Cape Town, Dubai, Abu Dhabi &amp; Sharjah—plus 2026 fee breakdowns in AED and ZAR for CompTIA,
                Microsoft Azure, Power BI, AWS, and Kubernetes.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 pt-1">
                <span>Pearson VUE &amp; OnVUE Prep</span>
                <span aria-hidden="true">·</span>
                <span>AED &amp; ZAR Voucher &amp; Course Fees</span>
                <span aria-hidden="true">·</span>
                <span>All 7 Emirates &amp; SA Metros</span>
              </div>
            </div>

            <aside className="lg:col-span-4 bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#152e4d]">Explore Regional Course Catalogs</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jump directly to live cohort schedules, corporate PO invoicing, and 24/7 cloud labs in your timezone.
              </p>
              <div className="space-y-2.5">
                <a
                  href="/ae"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHub('ae');
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-[#ea6d24]/60 text-sm font-semibold text-[#152e4d] transition-colors"
                >
                  <span>Dubai &amp; UAE Hub (GST · AED)</span>
                  <ArrowRight className="w-4 h-4 text-[#ea6d24]" />
                </a>
                <a
                  href="/za"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHub('za');
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-[#ea6d24]/60 text-sm font-semibold text-[#152e4d] transition-colors"
                >
                  <span>South Africa Hub (SAST · ZAR)</span>
                  <ArrowRight className="w-4 h-4 text-[#ea6d24]" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#152e4d]">Featured Regional Certification Guides</h2>

          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setRegionFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                regionFilter === 'all' ? 'bg-white text-[#152e4d] shadow-xs' : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              All Guides ({SEO_GUIDES.length})
            </button>
            <button
              type="button"
              onClick={() => setRegionFilter('ae')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                regionFilter === 'ae' ? 'bg-white text-[#152e4d] shadow-xs' : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              Dubai &amp; UAE ({aeCount})
            </button>
            <button
              type="button"
              onClick={() => setRegionFilter('za')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer min-h-[38px] ${
                regionFilter === 'za' ? 'bg-white text-[#152e4d] shadow-xs' : 'text-slate-700 hover:text-[#152e4d]'
              }`}
            >
              South Africa ({zaCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const href = `/guides/${guide.slug}`;
            return (
              <article
                key={guide.slug}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#ea6d24]/60 hover:shadow-sm transition-all"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-[#ea6d24]">{guide.regionLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#152e4d] leading-snug">
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectGuide(guide);
                      }}
                      className="hover:text-[#ea6d24] transition-colors"
                    >
                      {guide.title}
                    </a>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{guide.intro}</p>

                  <p className="text-xs text-slate-500 pt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ea6d24] shrink-0 mt-0.5" />
                    <span>{guide.citiesCovered.join(' · ')}</span>
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Updated {guide.updatedDate}</span>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectGuide(guide);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ea6d24] hover:text-[#c95716] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl font-bold text-[#152e4d] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#ea6d24]" />
              <span>Need a Custom UAE (AED) or South Africa (ZAR) Training Quote?</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Get upcoming GST or SAST cohort dates, exam voucher bundles, and multi-seat Purchase Order invoices for your
              engineering or analytics team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('corporate_quote', 'Regional Exam & Cost Advisory')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Request Corporate Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/courses"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHub('ae');
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#152e4d] border border-slate-300 font-semibold text-sm transition-colors min-h-[44px]"
            >
              <Globe2 className="w-4 h-4 text-[#ea6d24]" />
              <span>View Regional Hubs</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
