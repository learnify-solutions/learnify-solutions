import React, { useState } from 'react';
import { X, Search, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { Course, TechDomain } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  domains: TechDomain[];
  onSelectCourse: (course: Course) => void;
  onSelectDomain: (domain: TechDomain) => void;
  isCiscoAuthorized?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  domains,
  onSelectCourse,
  onSelectDomain,
  isCiscoAuthorized = false,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredCourses = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.domain.toLowerCase().includes(query.toLowerCase()) ||
          c.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredDomains = query.trim()
    ? domains.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.tags.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div
        id="search-modal-card"
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isCiscoAuthorized
                ? 'Search courses, domains (e.g. AWS, AI, Cybersecurity, Cisco, Kubernetes)...'
                : 'Search courses, domains (e.g. AWS, AI, Cybersecurity, CompTIA, Kubernetes)...'
            }
            className="w-full text-base bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-medium">Type a certification, domain, or technology to search</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {domains.slice(0, 4).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      onSelectDomain(d);
                      onClose();
                    }}
                    className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-[#ea6d24] transition-colors"
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filteredDomains.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Matching Technology Domains</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredDomains.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onSelectDomain(d);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-slate-200 text-left hover:border-[#ea6d24] hover:bg-orange-50/40 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-bold text-[#1b5a88]">
                            {d.name}
                          </div>
                          <div className="text-xs text-slate-500">{d.tags}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#ea6d24] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredCourses.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Matching Courses & Certifications</span>
                  </div>
                  <div className="space-y-2">
                    {filteredCourses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCourse(c);
                          onClose();
                        }}
                        className="w-full p-3 rounded-lg border border-slate-200 text-left hover:border-[#ea6d24] hover:bg-orange-50/40 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-[#ea6d24]">
                            {c.domain} · {c.duration}
                          </div>
                          <div className="text-sm font-bold text-[#1b5a88]">
                            {c.title}
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 group-hover:bg-[#ea6d24] group-hover:text-white transition-colors">
                          View
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredDomains.length === 0 && filteredCourses.length === 0 && (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No courses or domains found for "{query}".
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
