import React, { useEffect, useMemo, useState } from 'react';
import { BlogPost, BlogSummary } from '../types';
import { REGION_CONFIGS, RegionCode } from '../data/regionalSeoData';
import { getRelatedExamPrepResources } from '../data/examPrepMeta';
import { BlogEditorialCover } from './BlogEditorialCover';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Globe2,
  ListOrdered,
  Loader2,
  MapPin,
} from 'lucide-react';

interface BlogDetailViewProps {
  post: BlogPost | null;
  isLoading?: boolean;
  summaries: BlogSummary[];
  onNavigateHome: () => void;
  onNavigateBlogs: () => void;
  onSelectBlog: (slug: string) => void;
  onNavigateHub: (region: RegionCode) => void;
  onNavigateLink: (href: string) => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  post,
  isLoading = false,
  summaries,
  onNavigateHome,
  onNavigateBlogs,
  onSelectBlog,
  onNavigateHub,
  onNavigateLink,
  onOpenAdvisorModal,
}) => {
  const [readProgress, setReadProgress] = useState(0);
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({ 0: true });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        setReadProgress(0);
        return;
      }
      setReadProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [post?.slug]);

  const otherBlogs = useMemo(
    () =>
      summaries
        .filter((g) => g.slug !== post?.slug)
        .slice(0, 3),
    [summaries, post?.slug]
  );

  const relatedPrepTools = useMemo(
    () =>
      post
        ? getRelatedExamPrepResources({
            titleOrDomain: `${post.slug} ${post.topicTrack || ''} ${post.category} ${post.title}`,
            limit: 3,
          })
        : [],
    [post?.slug, post?.topicTrack, post?.category, post?.title]
  );

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (isLoading && !post) {
    return (
      <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-xs sm:text-sm font-semibold text-[#152e4d]">
              <Loader2 className="w-4 h-4 text-[#ea6d24] animate-spin" />
              <span>Loading certification article &amp; study blueprint...</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-pulse">
              <div className="lg:col-span-7 space-y-4">
                <div className="h-3.5 w-52 bg-slate-200 rounded" />
                <div className="h-9 w-11/12 bg-slate-200 rounded" />
                <div className="h-9 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
              </div>
              <div className="lg:col-span-5">
                <div className="aspect-video rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="h-5 w-40 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-11/12 bg-slate-100 rounded" />
              <div className="h-4 w-4/5 bg-slate-100 rounded" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3 h-72">
              <div className="h-6 w-64 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 h-64">
              <div className="h-4 w-36 bg-slate-200 rounded" />
              <div className="h-3.5 w-full bg-slate-100 rounded" />
              <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
              <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full bg-[#f8fafc] min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold text-[#152e4d]">Article Not Found</h1>
          <p className="text-sm text-slate-600">
            The requested certification guide could not be loaded. Browse all available articles below.
          </p>
          <button
            type="button"
            onClick={onNavigateBlogs}
            className="px-5 py-2.5 rounded-xl bg-[#ea6d24] text-white text-sm font-semibold cursor-pointer"
          >
            Back to All Blogs
          </button>
        </div>
      </div>
    );
  }

  const targetHub: RegionCode | null =
    post.region !== 'global' && post.region in REGION_CONFIGS
      ? (post.region as RegionCode)
      : null;

  const tocItems = [
    ...(post.keyTakeaways && post.keyTakeaways.length > 0
      ? [{ id: 'key-takeaways', label: 'Key Takeaways' }]
      : []),
    ...(post.sections || []).map((s) => ({ id: s.id, label: s.heading })),
    ...(post.faqs && post.faqs.length > 0
      ? [{ id: 'article-faqs', label: 'Frequently Asked Questions' }]
      : []),
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Sticky Reading Progress Hairline */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-[#ea6d24] origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${readProgress})` }}
        />
      </div>

      {/* Article Masthead */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500"
          >
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
              href="/blogs"
              onClick={(e) => {
                e.preventDefault();
                onNavigateBlogs();
              }}
              className="hover:text-[#ea6d24] transition-colors font-semibold"
            >
              Blogs
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">{post.regionLabel}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="text-[#ea6d24]">
                  {post.topicTrack || post.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{post.regionLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span aria-hidden="true">·</span>
                <span>Updated {post.updatedDate}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                {post.title}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">{post.intro}</p>

              {post.citiesCovered && post.citiesCovered.length > 0 && (
                <p className="text-xs text-slate-500 flex items-start gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-[#ea6d24] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Coverage:</strong>{' '}
                    {post.citiesCovered.join(' · ')}
                  </span>
                </p>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-[#152e4d] shadow-sm">
                <BlogEditorialCover
                  slug={post.slug}
                  title={post.title}
                  topicTrack={post.topicTrack || post.category}
                  regionLabel={post.regionLabel}
                  category={post.category}
                  readTime={post.readTime}
                  coverImage={post.coverImage}
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Reading Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-8 space-y-8 min-w-0">
          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <section
              id="key-takeaways"
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-[#152e4d]">Key Takeaways</h2>
              <ul className="space-y-3">
                {post.keyTakeaways.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* High-Converting Mid-Article Action Strip (Mobile & Desktop) */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ea6d24]">
                {targetHub
                  ? `${REGION_CONFIGS[targetHub].shortName} Cohorts · ${REGION_CONFIGS[targetHub].currency} Corporate POs`
                  : '2026 Syllabus, Exam Prep & Live Labs'}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-[#152e4d]">
                Ready to turn this guide into a first-attempt pass?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Get free syllabus guidance, batch schedules, and 1-on-1 pricing tailored to your timezone.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenAdvisorModal('advisor', post.title)}
                className="px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
              >
                Get Free Syllabus &amp; Quote
              </button>
              {relatedPrepTools[0] ? (
                <a
                  href={`/exam-prep/${relatedPrepTools[0].slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateLink(`/exam-prep/${relatedPrepTools[0].slug}`);
                  }}
                  className="px-5 py-3 rounded-xl border border-[#152e4d]/20 bg-[#f8fafc] hover:border-[#ea6d24] text-[#152e4d] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap min-h-[44px] inline-flex items-center gap-1.5"
                >
                  <span>Try {relatedPrepTools[0].examCode} Practice Test</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ea6d24]" />
                </a>
              ) : post.relatedRegionalLinks?.[0] ? (
                <a
                  href={post.relatedRegionalLinks[0].href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateLink(post.relatedRegionalLinks[0].href);
                  }}
                  className="px-5 py-3 rounded-xl border border-[#152e4d]/20 bg-[#f8fafc] hover:border-[#ea6d24] text-[#152e4d] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap min-h-[44px] inline-flex items-center gap-1.5"
                >
                  <span>Explore Bootcamp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ea6d24]" />
                </a>
              ) : null}
            </div>
          </section>

          {/* Structured Sections & Data Tables */}
          {post.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-24"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#152e4d]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2.5 pt-1">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="text-[#ea6d24] font-bold mt-0.5">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="pt-3 overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-slate-200 text-sm">
                    <caption className="text-left text-xs font-semibold text-slate-500 mb-2">
                      {section.table.caption}
                    </caption>
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-200 text-[#152e4d]">
                        {section.table.headers.map((h) => (
                          <th key={h} className="py-3 px-4 font-bold text-xs uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 tabular-nums">
                      {section.table.rows.map((row) => (
                        <tr key={row.label} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-semibold text-[#152e4d]">{row.label}</td>
                          <td className="py-3 px-4 text-slate-600">{row.col2}</td>
                          <td className="py-3 px-4 text-slate-600 font-medium">{row.col3}</td>
                          <td className="py-3 px-4 text-slate-600">{row.col4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Interactive Expandable FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <section
              id="article-faqs"
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 scroll-mt-24"
            >
              <h2 className="text-xl font-bold text-[#152e4d]">Frequently Asked Questions</h2>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {post.faqs.map((faq, idx) => {
                  const isOpen = Boolean(openFaqIndices[idx]);
                  return (
                    <div key={faq.q} className="bg-white">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                      >
                        <span className="text-sm font-bold text-[#152e4d]">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#ea6d24] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#fcfdfe] border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <section className="bg-[#152e4d] text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold">
                Plan Your{' '}
                {targetHub
                  ? `${REGION_CONFIGS[targetHub].shortName} (${REGION_CONFIGS[targetHub].currency} / ${REGION_CONFIGS[targetHub].timezone.split(' ')[0]})`
                  : 'Global Enterprise'}{' '}
                Certification
              </h2>
              <p className="text-sm text-slate-300">
                Speak with a senior advisor for live batch timings, 24/7 sandbox labs, exam vouchers, and corporate quotes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {relatedPrepTools[0] && (
                <a
                  href={`/exam-prep/${relatedPrepTools[0].slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateLink(`/exam-prep/${relatedPrepTools[0].slug}`);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors min-h-[44px]"
                >
                  <span>Free {relatedPrepTools[0].examCode} Practice Test</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => onOpenAdvisorModal('advisor', post.title)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Talk to Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </article>

        {/* Right Sticky Navigation & Related Programs Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Interactive Table of Contents */}
          {tocItems.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5 text-[#ea6d24]" />
                <span>On This Page</span>
              </h2>
              <nav aria-label="Article table of contents" className="space-y-1.5">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left text-xs font-semibold text-slate-600 hover:text-[#ea6d24] py-1.5 px-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer block"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Recommended Courses / Regional Programs */}
          {post.relatedRegionalLinks && post.relatedRegionalLinks.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-[#152e4d]">Recommended Programs</h2>
                {targetHub ? (
                  <a
                    href={`/${targetHub}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateHub(targetHub);
                    }}
                    className="text-xs font-semibold text-[#ea6d24] hover:underline"
                  >
                    {REGION_CONFIGS[targetHub].shortName} Hub
                  </a>
                ) : (
                  <a
                    href="/courses"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLink('/courses');
                    }}
                    className="text-xs font-semibold text-[#ea6d24] hover:underline"
                  >
                    All Courses
                  </a>
                )}
              </div>

              <div className="space-y-2.5">
                {post.relatedRegionalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLink(link.href);
                    }}
                    className="block p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 hover:border-[#ea6d24]/60 transition-colors space-y-1"
                  >
                    <p className="text-xs font-bold text-[#152e4d] leading-snug">{link.label}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{link.subtitle}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related Exam Prep & Study Tools */}
          {relatedPrepTools.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-[#152e4d]">Practice Tests &amp; Cheat Sheets</h2>
                <a
                  href="/exam-prep"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateLink('/exam-prep');
                  }}
                  className="text-xs font-semibold text-[#ea6d24] hover:underline"
                >
                  All Tools
                </a>
              </div>
              <div className="space-y-2.5">
                {relatedPrepTools.map((prep) => (
                  <a
                    key={prep.slug}
                    href={`/exam-prep/${prep.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLink(`/exam-prep/${prep.slug}`);
                    }}
                    className="block p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 hover:border-[#ea6d24]/60 transition-colors space-y-1"
                  >
                    <p className="text-[11px] font-mono font-bold text-[#ea6d24]">
                      {prep.examCode}
                    </p>
                    <p className="text-xs font-bold text-[#152e4d] leading-snug">
                      {prep.shortTitle}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {prep.excerpt}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Global Consultation Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#152e4d] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#ea6d24]" />
              <span>Need a Custom Team Schedule?</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get upcoming 1-on-1 or corporate cohort dates aligned to your team’s timezone with official vendor sandboxes.
            </p>
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('corporate_quote', post.topicTrack || post.category)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Request Team Quote
            </button>
          </div>
        </aside>
      </div>

      {/* More Articles */}
      {otherBlogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-[#152e4d]">More Certification Articles</h2>
            <a
              href="/blogs"
              onClick={(e) => {
                e.preventDefault();
                onNavigateBlogs();
              }}
              className="text-xs font-semibold text-[#ea6d24] hover:underline"
            >
              View All Blogs
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherBlogs.map((g) => (
              <a
                key={g.slug}
                href={`/blogs/${g.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectBlog(g.slug);
                }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#ea6d24]/70 transition-all duration-200 flex flex-col"
              >
                <div className="aspect-video bg-[#152e4d] overflow-hidden">
                  <BlogEditorialCover
                    slug={g.slug}
                    title={g.title}
                    topicTrack={g.topicTrack}
                    regionLabel={g.regionLabel}
                    category={g.category}
                    readTime={g.readTime}
                    coverImage={g.coverImage}
                    variant="card"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="text-xs font-semibold text-[#ea6d24]">
                    {g.topicTrack} · {g.regionLabel}
                  </p>
                  <h3 className="text-sm font-bold text-[#152e4d] line-clamp-2 leading-snug">
                    {g.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
