import React, { useMemo, useState } from 'react';
import { BlogPost } from '../types';
import { getMergedBlogs } from '../data/blogsData';
import { ArrowRight, BookOpen, MapPin } from 'lucide-react';

interface BlogSectionProps {
  customBlogs?: BlogPost[];
  onSelectBlog: (post: BlogPost) => void;
  onViewAllBlogs: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  customBlogs,
  onSelectBlog,
  onViewAllBlogs,
}) => {
  const [regionFilter, setRegionFilter] = useState<'all' | 'ae' | 'za'>('all');

  const allBlogs = useMemo(() => getMergedBlogs(customBlogs), [customBlogs]);

  const { aeCount, zaCount } = useMemo(() => {
    let ae = 0;
    let za = 0;
    for (const post of allBlogs) {
      if (post.region === 'ae') ae++;
      else if (post.region === 'za') za++;
    }
    return { aeCount: ae, zaCount: za };
  }, [allBlogs]);

  const visibleBlogs = useMemo(() => {
    const list =
      regionFilter === 'all' ? allBlogs : allBlogs.filter((p) => p.region === regionFilter);
    return list.slice(0, 6);
  }, [allBlogs, regionFilter]);

  return (
    <section
      id="blogs"
      className="w-full bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-semibold text-[#ea6d24] tracking-wide">
              Certification Insights &amp; Exam Guides
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152e4d] tracking-tight [text-wrap:balance]">
              Latest High-Demand IT Certification Blogs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Daily-updated exam center directories, AED &amp; ZAR fee breakdowns, and career roadmaps
              for Dubai, UAE, Gauteng, Johannesburg, Cape Town &amp; global learners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            {/* Functional Region Filter Tabs */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                type="button"
                onClick={() => setRegionFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[36px] ${
                  regionFilter === 'all'
                    ? 'bg-white text-[#152e4d] shadow-xs'
                    : 'text-slate-600 hover:text-[#152e4d]'
                }`}
              >
                All ({allBlogs.length})
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('ae')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[36px] ${
                  regionFilter === 'ae'
                    ? 'bg-white text-[#152e4d] shadow-xs'
                    : 'text-slate-600 hover:text-[#152e4d]'
                }`}
              >
                UAE ({aeCount})
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('za')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[36px] ${
                  regionFilter === 'za'
                    ? 'bg-white text-[#152e4d] shadow-xs'
                    : 'text-slate-600 hover:text-[#152e4d]'
                }`}
              >
                South Africa ({zaCount})
              </button>
            </div>

            <a
              id="home-view-all-blogs-btn"
              href="/blogs"
              onClick={(e) => {
                e.preventDefault();
                onViewAllBlogs();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBlogs.map((post) => {
            const href = `/blogs/${post.slug}`;
            return (
              <article
                key={post.slug}
                className="bg-[#fcfdfe] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#ea6d24]/60 transition-colors"
              >
                <div className="space-y-3">
                  {/* Unboxed Typographic Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-[#ea6d24]">{post.regionLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#152e4d] leading-snug">
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectBlog(post);
                      }}
                      className="hover:text-[#ea6d24] transition-colors"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.intro}
                  </p>

                  {post.citiesCovered && post.citiesCovered.length > 0 && (
                    <p className="text-xs text-slate-500 pt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ea6d24] shrink-0 mt-0.5" />
                      <span>{post.citiesCovered.slice(0, 5).join(' · ')}</span>
                    </p>
                  )}
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{post.updatedDate}</span>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectBlog(post);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ea6d24] hover:text-[#c95716] transition-colors whitespace-nowrap"
                  >
                    <span>Read Blog</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
