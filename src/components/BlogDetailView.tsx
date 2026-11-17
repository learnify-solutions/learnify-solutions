import React, { useMemo } from 'react';
import { BlogPost } from '../types';
import { getMergedBlogs } from '../data/blogsData';
import { RegionCode } from '../data/regionalSeoData';
import { ArrowRight, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';

interface BlogDetailViewProps {
  post: BlogPost;
  customBlogs?: BlogPost[];
  onNavigateHome: () => void;
  onNavigateBlogs: () => void;
  onSelectBlog: (post: BlogPost) => void;
  onNavigateHub: (region: RegionCode) => void;
  onNavigateRegionalPath: (path: string) => void;
  onOpenAdvisorModal: (
    type: 'advisor' | 'corporate_quote' | 'demo' | 'course_info',
    domain?: string
  ) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  post,
  customBlogs,
  onNavigateHome,
  onNavigateBlogs,
  onSelectBlog,
  onNavigateHub,
  onNavigateRegionalPath,
  onOpenAdvisorModal,
}) => {
  const otherBlogs = useMemo(
    () => getMergedBlogs(customBlogs).filter((g) => g.slug !== post.slug).slice(0, 3),
    [customBlogs, post.slug]
  );

  const targetHub: RegionCode = post.region === 'za' ? 'za' : 'ae';

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-5">
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

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-[#ea6d24]">{post.regionLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>Updated {post.updatedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#152e4d] leading-tight tracking-tight [text-wrap:balance]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{post.intro}</p>

          {post.citiesCovered && post.citiesCovered.length > 0 && (
            <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-[#ea6d24] shrink-0" />
              <span>
                <strong className="text-slate-800">Cities &amp; Hubs Covered:</strong> {post.citiesCovered.join(' · ')}
              </span>
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Key Takeaways */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-[#152e4d]">Key Takeaways</h2>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#ea6d24] shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Detailed Sections & Tables */}
        {post.sections.map((section) => (
          <section key={section.id} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#152e4d]">{section.heading}</h2>
            {section.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}

            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-2 pt-1">
                {section.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-[#ea6d24] font-bold">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.table && (
              <div className="pt-2 overflow-x-auto">
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
                      <tr key={row.label} className="hover:bg-slate-50/80">
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

        {/* Related Regional Course Pages */}
        {post.relatedRegionalLinks && post.relatedRegionalLinks.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-[#152e4d]">
                Recommended Live Certification Bootcamps ({post.regionLabel})
              </h2>
              <a
                href={`/${targetHub}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHub(targetHub);
                }}
                className="text-xs font-semibold text-[#ea6d24] hover:underline"
              >
                View All {targetHub === 'ae' ? 'UAE' : 'South Africa'} Courses
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {post.relatedRegionalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRegionalPath(link.href);
                  }}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ea6d24]/60 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-[#152e4d] leading-snug">{link.label}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{link.subtitle}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ea6d24]">
                    <span>View Syllabus &amp; Batches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-[#152e4d]">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <div key={faq.q} className="border border-slate-200 rounded-xl p-4 bg-[#f8fafc] space-y-1.5">
                  <h3 className="text-sm font-bold text-[#152e4d]">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="bg-[#152e4d] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold">
              Plan Your {post.region === 'za' ? 'South Africa (ZAR / SAST)' : post.region === 'ae' ? 'UAE (AED / GST)' : 'Global Live'} Certification
            </h2>
            <p className="text-sm text-slate-300">
              Speak with an advisor for upcoming live batch dates, exam voucher bundles, and corporate Purchase Orders.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenAdvisorModal('advisor', post.regionLabel)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ea6d24] hover:bg-[#d55e1b] text-white font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Talk to Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* More Blogs */}
        {otherBlogs.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-[#152e4d]">More High-Demand Blogs</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherBlogs.map((g) => (
                <a
                  key={g.slug}
                  href={`/blogs/${g.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectBlog(g);
                  }}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:border-[#ea6d24]/60 transition-colors space-y-1.5"
                >
                  <p className="text-xs font-semibold text-[#ea6d24]">{g.regionLabel}</p>
                  <h3 className="text-sm font-bold text-[#152e4d] line-clamp-2">{g.title}</h3>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
