import React, { useMemo, useState } from 'react';
import { BlogSummary, BlogTopicTrack } from '../types';
import { RegionCode } from '../data/regionalSeoData';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  Globe2,
  MapPin,
  PenSquare,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

interface BlogsHubViewProps {
  summaries: BlogSummary[];
  isLoading?: boolean;
  isAdminAuthenticated?: boolean;
  onOpenBlogPublisher?: () => void;
  onSelectBlog: (slug: string) => void;
  onNavigateHub: (region: RegionCode) => void;
  onNavigateHome: () => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

const TOPIC_TRACKS: Array<'all' | BlogTopicTrack> = [
  'all',
  'Cloud & DevOps',
  'Cybersecurity',
  'Data & AI',
  'Exam & Fee Guides',
];

export const BlogsHubView: React.FC<BlogsHubViewProps> = ({
  summaries,
  isLoading = false,
  isAdminAuthenticated,
  onOpenBlogPublisher,
  onSelectBlog,
  onNavigateHub,
  onNavigateHome,
  onOpenAdvisorModal,
}) => {
  const [topicFilter, setTopicFilter] = useState<'all' | BlogTopicTrack>('all');
  const [regionFilter, setRegionFilter] = useState<'all' | 'global' | 'ae' | 'za'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    return summaries.filter((item) => {
      if (topicFilter !== 'all' && item.topicTrack !== topicFilter) return false;
      if (regionFilter !== 'all' && item.region !== regionFilter) return false;
      if (!term) return true;
      return (
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.regionLabel.toLowerCase().includes(term) ||
        item.citiesCovered.some((c) => c.toLowerCase().includes(term))
      );
    });
  }, [summaries, topicFilter, regionFilter, searchQuery]);

  const showFeaturedHero =
    topicFilter === 'all' &&
    regionFilter === 'all' &&
    searchQuery.trim() === '' &&
    filteredBlogs.length > 0;

  const featuredArticle = showFeaturedHero
    ? filteredBlogs.find((b) => b.featured) || filteredBlogs[0]
    : null;

  const gridArticles = featuredArticle
    ? filteredBlogs.filter((b) => b.slug !== featuredArticle.slug)
    : filteredBlogs;

  const resetFilters = () => {
    setTopicFilter('all');
    setRegionFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Global Editorial Masthead */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
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
              <span className="text-slate-900 font-semibold">Blogs</span>
            </nav>

            {isAdminAuthenticated && onOpenBlogPublisher && (
              <button
                type="button"
                onClick={onOpenBlogPublisher}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#152e4d] hover:bg-[#0f223a] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <PenSquare className="w-3.5 h-3.5 text-[#ea6d24]" />
                <span>Publish New Blog</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ea6d24]">
                Learnify Editorial · Global Certification Intelligence
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
                IT Certification Blogs, Roadmaps &amp; Exam Strategy
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
                Deep-dive architecture comparisons, CompTIA Security+ &amp; Cloud+ prep roadmaps, Power BI &amp;
                Copilot enterprise playbooks, and localized Pearson VUE exam insights worldwide.
              </p>
            </div>

            {/* Live Instant Search Input */}
            <div className="lg:col-span-4 w-full">
              <label htmlFor="blog-hub-search" className="sr-only">
                Search certification blogs
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="blog-hub-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Azure, CompTIA, Power BI, Dubai, Gauteng..."
                  className="w-full pl-10 pr-9 py-3 text-sm rounded-xl border border-slate-300 bg-[#f8fafc] text-[#152e4d] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#ea6d24] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Topic Track Tabs & Region Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {TOPIC_TRACKS.map((track) => {
                const active = topicFilter === track;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setTopicFilter(track)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer min-h-[38px] ${
                      active
                        ? 'bg-[#152e4d] text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#152e4d]'
                    }`}
                  >
                    {track === 'all' ? 'All Topics' : track}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="blog-region-scope" className="text-xs font-semibold text-slate-500">
                Scope:
              </label>
              <select
                id="blog-region-scope"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-[#152e4d] focus:outline-none focus:border-[#ea6d24] cursor-pointer min-h-[38px]"
              >
                <option value="all">All Regions ({summaries.length})</option>
                <option value="global">Global Enterprise</option>
                <option value="ae">Middle East &amp; UAE (AED)</option>
                <option value="za">South Africa (ZAR)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {isLoading && summaries.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl h-80" />
            ))}
          </div>
        ) : (
          <>
            {/* Featured Split Hero Article */}
            {featuredArticle && (
              <article className="group bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch hover:border-[#ea6d24]/70 hover:shadow-md transition-all duration-200">
                <a
                  href={`/blogs/${featuredArticle.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectBlog(featuredArticle.slug);
                  }}
                  className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[260px] bg-[#152e4d] overflow-hidden block"
                >
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#152e4d]/65 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#152e4d]/90 text-white text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#ea6d24]" />
                    <span>Featured Roadmap</span>
                  </div>
                </a>

                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                      <span className="text-[#ea6d24]">{featuredArticle.topicTrack}</span>
                      <span aria-hidden="true">·</span>
                      <span>{featuredArticle.regionLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152e4d] leading-snug">
                      <a
                        href={`/blogs/${featuredArticle.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectBlog(featuredArticle.slug);
                        }}
                        className="hover:text-[#ea6d24] transition-colors"
                      >
                        {featuredArticle.title}
                      </a>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                      Updated {featuredArticle.updatedDate}
                    </span>
                    <a
                      href={`/blogs/${featuredArticle.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectBlog(featuredArticle.slug);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* Editorial Articles Grid */}
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((post) => {
                  const href = `/blogs/${post.slug}`;
                  return (
                    <article
                      key={post.slug}
                      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ea6d24]/70 hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectBlog(post.slug);
                          }}
                          className="block aspect-video bg-[#152e4d] overflow-hidden"
                        >
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </a>

                        <div className="p-6 space-y-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                            <span className="text-[#ea6d24]">{post.topicTrack}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.regionLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="text-lg font-bold text-[#152e4d] leading-snug line-clamp-2">
                            <a
                              href={href}
                              onClick={(e) => {
                                e.preventDefault();
                                onSelectBlog(post.slug);
                              }}
                              className="hover:text-[#ea6d24] transition-colors"
                            >
                              {post.title}
                            </a>
                          </h3>

                          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          {post.citiesCovered && post.citiesCovered.length > 0 && (
                            <p className="text-xs text-slate-500 pt-1 flex items-start gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#ea6d24] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">
                                {post.citiesCovered.slice(0, 4).join(' · ')}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-[#fcfdfe]">
                        <span className="text-xs text-slate-500">{post.updatedDate}</span>
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectBlog(post.slug);
                          }}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ea6d24] hover:text-[#c95716] transition-colors"
                        >
                          <span>Read Blog</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : !featuredArticle ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                <p className="text-base font-bold text-[#152e4d]">
                  No articles match "{searchQuery || topicFilter}"
                </p>
                <p className="text-sm text-slate-600">
                  Clear your search or switch topic tracks to view all global and regional certification guides.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-[#152e4d] text-white text-xs font-semibold cursor-pointer hover:bg-[#0f223a]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : null}
          </>
        )}

        {/* Global Advisory & Regional Hubs Footer Strip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl font-bold text-[#152e4d] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#ea6d24]" />
              <span>Planning Enterprise Upskilling or Certification Cohorts?</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Request custom batch schedules across EST, GMT/BST, GST (UAE), SAST (South Africa), and IST
              with multi-seat corporate invoicing and official exam vouchers.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs font-semibold text-slate-500">
              <span>Regional Directories:</span>
              <a
                href="/ae"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHub('ae');
                }}
                className="text-[#152e4d] hover:text-[#ea6d24] underline underline-offset-4"
              >
                UAE &amp; Dubai Hub (AED)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/za"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHub('za');
                }}
                className="text-[#152e4d] hover:text-[#ea6d24] underline underline-offset-4"
              >
                South Africa Hub (ZAR)
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('corporate_quote', 'Global Enterprise Upskilling')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Request Corporate Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('advisor', 'Certification Roadmap')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#152e4d] border border-slate-300 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <Globe2 className="w-4 h-4 text-[#ea6d24]" />
              <span>Talk to Advisor</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
