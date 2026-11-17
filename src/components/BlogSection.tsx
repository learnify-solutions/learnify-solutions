import React, { useMemo, useState } from 'react';
import { BlogSummary, BlogTopicTrack } from '../types';
import { ArrowRight, BookOpen, Clock, Globe2, Sparkles } from 'lucide-react';

interface BlogSectionProps {
  summaries: BlogSummary[];
  isLoading?: boolean;
  onSelectBlog: (slug: string) => void;
  onViewAllBlogs: () => void;
}

const TOPIC_TABS: Array<'all' | BlogTopicTrack> = [
  'all',
  'Cloud & DevOps',
  'Cybersecurity',
  'Data & AI',
  'Exam & Fee Guides',
];

export const BlogSection: React.FC<BlogSectionProps> = ({
  summaries,
  isLoading = false,
  onSelectBlog,
  onViewAllBlogs,
}) => {
  const [topicFilter, setTopicFilter] = useState<'all' | BlogTopicTrack>('all');

  const filteredSummaries = useMemo(() => {
    if (topicFilter === 'all') return summaries;
    return summaries.filter((item) => item.topicTrack === topicFilter);
  }, [summaries, topicFilter]);

  const spotlightPost = useMemo(() => {
    if (filteredSummaries.length === 0) return null;
    return filteredSummaries.find((b) => b.featured) || filteredSummaries[0];
  }, [filteredSummaries]);

  const secondaryPosts = useMemo(() => {
    if (!spotlightPost) return [];
    return filteredSummaries.filter((b) => b.slug !== spotlightPost.slug).slice(0, 4);
  }, [filteredSummaries, spotlightPost]);

  return (
    <section
      id="blogs"
      className="w-full bg-[#f8fafc] py-16 md:py-24 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ea6d24]">
              Enterprise Learning Insights
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#152e4d] tracking-tight [text-wrap:balance]">
              IT Certification Roadmaps, Cloud Strategy &amp; Exam Guides
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Practical architecture comparisons, cybersecurity study blueprints, data analytics workflows,
              and certification exam insights for engineering teams worldwide.
            </p>
          </div>

          <a
            id="home-view-all-blogs-btn"
            href="/blogs"
            onClick={(e) => {
              e.preventDefault();
              onViewAllBlogs();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#152e4d] hover:bg-[#0f223b] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto min-h-[42px]"
          >
            <BookOpen className="w-4 h-4 text-[#ea6d24]" />
            <span>Explore All Articles ({summaries.length || 9})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Interactive Topic Track Bar */}
        <div
          role="tablist"
          aria-label="Filter articles by technology track"
          className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200"
        >
          {TOPIC_TABS.map((tab) => {
            const isActive = topicFilter === tab;
            const count =
              tab === 'all'
                ? summaries.length
                : summaries.filter((s) => s.topicTrack === tab).length;
            if (tab !== 'all' && count === 0) return null;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTopicFilter(tab)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'border-[#ea6d24] text-[#152e4d]'
                    : 'border-transparent text-slate-500 hover:text-[#152e4d]'
                }`}
              >
                {tab === 'all' ? `All Insights (${count})` : `${tab} (${count})`}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Showcase */}
        {isLoading && summaries.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl h-[440px]" />
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl h-32" />
              <div className="bg-white border border-slate-200 rounded-2xl h-32" />
              <div className="bg-white border border-slate-200 rounded-2xl h-32" />
            </div>
          </div>
        ) : spotlightPost ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Spotlight Hero Card */}
            <article className="lg:col-span-5 group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ea6d24]/70 hover:shadow-md transition-all duration-200">
              <div>
                <a
                  href={`/blogs/${spotlightPost.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectBlog(spotlightPost.slug);
                  }}
                  className="block relative aspect-video bg-[#152e4d] overflow-hidden"
                >
                  <img
                    src={spotlightPost.coverImage}
                    alt={spotlightPost.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#152e4d]/75 via-[#152e4d]/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#ea6d24]" />
                      <span>Featured Guide</span>
                    </span>
                    <span className="text-slate-200">{spotlightPost.readTime}</span>
                  </div>
                </a>

                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-[#ea6d24]">{spotlightPost.topicTrack}</span>
                    <span aria-hidden="true">·</span>
                    <span>{spotlightPost.regionLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{spotlightPost.updatedDate}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#152e4d] leading-snug">
                    <a
                      href={`/blogs/${spotlightPost.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectBlog(spotlightPost.slug);
                      }}
                      className="hover:text-[#ea6d24] transition-colors"
                    >
                      {spotlightPost.title}
                    </a>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                    {spotlightPost.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-[#fcfdfe]">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Globe2 className="w-3.5 h-3.5 text-[#152e4d]" />
                  <span>{spotlightPost.category}</span>
                </span>
                <a
                  href={`/blogs/${spotlightPost.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectBlog(spotlightPost.slug);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ea6d24] hover:text-[#c95716] transition-colors whitespace-nowrap"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </div>
            </article>

            {/* Right Interactive Editorial List */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {secondaryPosts.map((post) => {
                const href = `/blogs/${post.slug}`;
                return (
                  <article
                    key={post.slug}
                    className="group bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center hover:border-[#ea6d24]/70 hover:shadow-sm transition-all duration-200"
                  >
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectBlog(post.slug);
                      }}
                      className="sm:w-44 md:w-48 aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden bg-[#152e4d] shrink-0 block"
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

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                        <span className="text-[#ea6d24]">{post.topicTrack}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.regionLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#152e4d] leading-snug line-clamp-2">
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

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center justify-center shrink-0 pl-2">
                      <a
                        href={href}
                        aria-label={`Read ${post.title}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectBlog(post.slug);
                        }}
                        className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-[#152e4d] group-hover:bg-[#ea6d24] group-hover:border-[#ea6d24] group-hover:text-white transition-colors duration-200"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                );
              })}

              {secondaryPosts.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center gap-3">
                  <p className="text-sm text-slate-600">
                    More articles in this track are available in the full editorial library.
                  </p>
                  <button
                    type="button"
                    onClick={onViewAllBlogs}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ea6d24] hover:underline cursor-pointer"
                  >
                    <span>Browse All Blogs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
