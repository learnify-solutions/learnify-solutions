import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { normalizeImageUrl, getSvgCourseFallback } from '../utils/imageHelper';
import {
  Search,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Monitor,
  Users,
  Laptop,
  X,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Star,
  Layers,
  Award,
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenAdvisorModal: (type?: string, subject?: string) => void;
  onNavigateToCisco?: () => void;
  isCiscoAuthorized?: boolean;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onSelectCourse,
  onOpenAdvisorModal,
  onNavigateToCisco,
  isCiscoAuthorized = false,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Filter states
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'title' | 'level' | 'rating'>('relevance');

  // Mobile drawer filter toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter option definitions
  const vendorOptions = useMemo(() => {
    const list = [
      { id: 'Microsoft', label: 'Microsoft' },
      { id: 'CompTIA', label: 'CompTIA' },
      { id: 'AWS', label: 'AWS' },
      { id: 'Google Cloud', label: 'Google Cloud' },
    ];
    if (isCiscoAuthorized) {
      return [
        { id: 'Microsoft', label: 'Microsoft' },
        { id: 'Cisco', label: 'Cisco (CCNA/CCNP) ↗' },
        { id: 'CompTIA', label: 'CompTIA' },
        { id: 'AWS', label: 'AWS' },
        { id: 'Google Cloud', label: 'Google Cloud' },
      ];
    }
    return list;
  }, [isCiscoAuthorized]);

  const levelOptions = [
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' },
  ];

  const formatOptions = [
    { id: 'Live Online', label: 'Live Online' },
    { id: 'Classroom', label: 'Classroom' },
    { id: 'Self-Paced', label: 'Self-Paced' },
  ];

  // Toggle helpers
  const toggleVendor = (vendorId: string) => {
    if (vendorId === 'Cisco' && onNavigateToCisco) {
      onNavigateToCisco();
      return;
    }
    setSelectedVendors((prev) =>
      prev.includes(vendorId) ? prev.filter((v) => v !== vendorId) : [...prev, vendorId]
    );
    setCurrentPage(1);
  };

  const toggleLevel = (lvl: string) => {
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
    setCurrentPage(1);
  };

  const toggleFormat = (fmt: string) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedVendors([]);
    setSelectedLevels([]);
    setSelectedFormats([]);
    setSearchTerm('');
    setAppliedSearch('');
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchTerm.trim());
    setCurrentPage(1);
  };

  // Suggestion Logic for search dropdown
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.certificationVendor && c.certificationVendor.toLowerCase().includes(q)) ||
          c.domain.toLowerCase().includes(q)
      )
      .slice(0, 5); // Max 5 suggestions
  }, [searchTerm, courses]);

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // 1. Search Query Filter
    if (appliedSearch) {
      const q = appliedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          (c.certificationVendor && c.certificationVendor.toLowerCase().includes(q)) ||
          c.domain.toLowerCase().includes(q)
      );
    }

    // 2. Vendor / Certification Filter
    if (selectedVendors.length > 0) {
      result = result.filter((c) => {
        const vendor = c.certificationVendor || '';
        return selectedVendors.some(
          (v) =>
            vendor.toLowerCase().includes(v.toLowerCase()) ||
            c.title.toLowerCase().includes(v.toLowerCase()) ||
            c.domain.toLowerCase().includes(v.toLowerCase())
        );
      });
    }

    // 3. Skill Level Filter
    if (selectedLevels.length > 0) {
      result = result.filter((c) => {
        const lvl = c.skillLevel || c.level || 'Intermediate';
        return selectedLevels.includes(lvl);
      });
    }

    // 4. Format Filter
    if (selectedFormats.length > 0) {
      result = result.filter((c) => {
        const fmt = c.format || 'Live Online';
        return selectedFormats.includes(fmt);
      });
    }

    // 5. Sorting
    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'level') {
      const rank: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      result.sort((a, b) => (rank[a.skillLevel || ''] || 2) - (rank[b.skillLevel || ''] || 2));
    }

    return result;
  }, [courses, appliedSearch, selectedVendors, selectedLevels, selectedFormats, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Active filter chips list
  const activeChips: { type: 'vendor' | 'level' | 'format' | 'search'; id: string; label: string }[] = [];
  if (appliedSearch) {
    activeChips.push({ type: 'search', id: appliedSearch, label: `"${appliedSearch}"` });
  }
  selectedVendors.forEach((v) => {
    const opt = vendorOptions.find((o) => o.id === v);
    activeChips.push({ type: 'vendor', id: v, label: opt ? opt.label : v });
  });
  selectedLevels.forEach((l) => {
    activeChips.push({ type: 'level', id: l, label: l });
  });
  selectedFormats.forEach((f) => {
    activeChips.push({ type: 'format', id: f, label: f });
  });

  const removeChip = (chip: { type: string; id: string }) => {
    if (chip.type === 'search') {
      setSearchTerm('');
      setAppliedSearch('');
    } else if (chip.type === 'vendor') {
      toggleVendor(chip.id);
    } else if (chip.type === 'level') {
      toggleLevel(chip.id);
    } else if (chip.type === 'format') {
      toggleFormat(chip.id);
    }
  };

  const getFormatIcon = (format?: string) => {
    if (format === 'Classroom') return <Users className="w-3 h-3 text-slate-500" />;
    if (format === 'Self-Paced') return <Laptop className="w-3 h-3 text-slate-500" />;
    return <Monitor className="w-3 h-3 text-slate-500" />;
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Header & Search Card */}
        <header className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-xs text-center space-y-5 sm:space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#152e4d] tracking-tight">
              Explore Technology Training
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal">
              Master the skills that drive modern enterprise. From cloud architecture to cybersecurity.
            </p>
          </div>

          {/* Search Bar & Dropdown */}
          <div className="max-w-2xl mx-auto relative w-full">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full bg-white border border-slate-300 rounded-xl p-1 sm:p-1.5 focus-within:border-[#ea6d24] focus-within:ring-2 focus-within:ring-orange-100 transition-all shadow-xs relative z-20 overflow-hidden"
            >
              <div className="pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 text-slate-400 shrink-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                id="course-search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (appliedSearch) setAppliedSearch(''); // clear applied search if user types again
                }}
                placeholder="What do you want to learn?"
                className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden py-1.5 sm:py-2 pr-1"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setAppliedSearch('');
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-1 shrink-0"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                id="course-search-submit-btn"
                className="bg-[#ea6d24] hover:bg-[#d85e19] text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer shrink-0 shadow-xs whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {searchTerm.trim() && !appliedSearch && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-30 text-left">
                {searchSuggestions.length > 0 ? (
                  <ul className="py-2">
                    {searchSuggestions.map((course) => (
                      <li key={course.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm(course.title);
                            setAppliedSearch(course.title);
                            onSelectCourse(course);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex flex-col transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                        >
                          <span className="text-sm font-bold text-[#152e4d]">{course.title}</span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            {course.certificationVendor} • {course.domain}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    No courses found matching "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Mobile Filter Toggle Bar */}
        <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#152e4d]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#ea6d24]" />
            <span>{isMobileFilterOpen ? 'Hide Filters' : `Filter Courses (${activeChips.length})`}</span>
          </button>
          <div className="flex items-center gap-3">
            {activeChips.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-red-500 hover:underline"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              {isMobileFilterOpen ? 'Apply & Close' : 'Filter'}
            </button>
          </div>
        </div>

        {/* 2. Main Content Grid: Filters Sidebar + Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* LEFT SIDEBAR: FILTERS */}
          <aside
            className={`${
              isMobileFilterOpen ? 'block' : 'hidden'
            } lg:block lg:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-6 space-y-6 shadow-md lg:shadow-xs lg:sticky lg:top-24 relative z-30`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#152e4d]">Filters</h2>
              <div className="flex items-center gap-3">
                {activeChips.length > 0 && (
                  <button
                    id="clear-filters-btn"
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-slate-400 hover:text-[#ea6d24] transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="lg:hidden text-xs font-bold bg-[#152e4d] text-white px-2.5 py-1 rounded-md"
                >
                  Done
                </button>
              </div>
            </div>

            {/* Group 1: VENDORS */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                VENDORS
              </h3>
              <div className="space-y-2">
                {vendorOptions.map((opt) => {
                  const isChecked = selectedVendors.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900 select-none group"
                    >
                      <div
                        onClick={() => toggleVendor(opt.id)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#152e4d] border-[#152e4d] text-white'
                            : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span onClick={() => toggleVendor(opt.id)}>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Group 2: SKILL LEVEL */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                SKILL LEVEL
              </h3>
              <div className="space-y-2">
                {levelOptions.map((opt) => {
                  const isChecked = selectedLevels.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900 select-none group"
                    >
                      <div
                        onClick={() => toggleLevel(opt.id)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#152e4d] border-[#152e4d] text-white'
                            : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span onClick={() => toggleLevel(opt.id)}>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Group 3: FORMAT */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                FORMAT
              </h3>
              <div className="space-y-2">
                {formatOptions.map((opt) => {
                  const isChecked = selectedFormats.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900 select-none group"
                    >
                      <div
                        onClick={() => toggleFormat(opt.id)}
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#152e4d] border-[#152e4d] text-white'
                            : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span onClick={() => toggleFormat(opt.id)}>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: ACTIVE FILTERS BAR + COURSES GRID */}
          <div className="lg:col-span-3 space-y-6">
            {/* Active Filters Bar & Sort By Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-2 flex-wrap min-h-[32px]">
                <span className="text-xs font-semibold text-slate-600">Active Filters:</span>
                {activeChips.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">None (showing all courses)</span>
                ) : (
                  activeChips.map((chip, idx) => (
                    <button
                      key={`${chip.type}-${chip.id}-${idx}`}
                      onClick={() => removeChip(chip)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-200/70 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                    >
                      <span>{chip.label}</span>
                      <X className="w-3 h-3 text-slate-500 hover:text-slate-800" />
                    </button>
                  ))
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                <select
                  id="course-sort-select"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  aria-label="Sort courses"
                  className="text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-[#ea6d24] cursor-pointer shadow-2xs"
                >
                  <option value="relevance">Relevance</option>
                  <option value="title">Course Name (A-Z)</option>
                  <option value="level">Skill Level</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Courses Cards Grid */}
            {paginatedCourses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#ea6d24] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#152e4d]">No matching courses found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting or clearing your active filters to browse our comprehensive enterprise training catalog.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#ea6d24] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#d85e19] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => {
                  const vendor = course.certificationVendor || 'Tech';
                  const level = course.skillLevel || course.level || 'Intermediate';
                  const format = course.format || 'Live Online';

                  return (
                    <div
                      key={course.id}
                      id={`course-card-${course.id}`}
                      className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden flex flex-col shadow-xs hover:shadow-md hover:border-slate-300 transition-all gpu-accelerated"
                    >
                      {/* Course Image & Floating Badges */}
                      <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
                        <img
                          src={normalizeImageUrl(course.imageUrl, 'course')}
                          alt={course.imageAlt || course.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = getSvgCourseFallback(course.title, vendor);
                          }}
                        />

                        {/* Top-Left Vendor Badge */}
                        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-sm px-2 py-0.5 text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-[#ea6d24]" />
                          <span>{vendor}</span>
                        </div>

                        {/* Top-Right Fast-Track Badge */}
                        {course.fastTrack && (
                          <div className="absolute top-2.5 right-2.5 bg-[#ea6d24] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-xs shadow-xs tracking-wider">
                            Fast-Track
                          </div>
                        )}
                      </div>

                      {/* Course Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          {/* Tags: Level + Format */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                level === 'Beginner'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : level === 'Advanced'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {level}
                            </span>

                            <span
                              className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-700 bg-orange-50/60 border border-orange-200/80 px-2 py-0.5 rounded-full"
                              title="Available in Live Online, In-Person Classroom & 1-on-1 modes"
                            >
                              <Layers className="w-3 h-3 text-[#ea6d24]" />
                              <span>Online • Classroom • 1:1</span>
                            </span>
                          </div>

                          {/* Course Title */}
                          <h3 className="text-sm sm:text-base font-bold text-[#152e4d] leading-snug line-clamp-2 group-hover:text-[#ea6d24] transition-colors">
                            {course.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {course.summary}
                          </p>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                          <button
                            onClick={() => onSelectCourse(course)}
                            id={`view-course-btn-${course.id}`}
                            className="w-full border border-slate-300 hover:border-[#152e4d] hover:bg-[#152e4d] hover:text-white text-[#152e4d] font-bold text-xs py-2 rounded-lg transition-all text-center cursor-pointer shadow-2xs"
                          >
                            View Course
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-6 select-none">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#152e4d] text-white shadow-xs'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Bottom Callout Banner: "Not sure where to start?" */}
        <section
          id="course-catalog-advisor-cta"
          className="relative bg-[#dbeafe]/80 border border-blue-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-xs"
        >
          {/* Subtle background decorative shapes */}
          <div className="absolute right-0 top-0 bottom-0 w-64 opacity-15 pointer-events-none flex items-center justify-end pr-6">
            <Award className="w-44 h-44 text-blue-900" />
          </div>

          <div className="space-y-1 z-10 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#152e4d]">
              Not sure where to start?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Our training advisors can help map out the perfect certification pathway for your team&apos;s goals.
            </p>
          </div>

          <button
            onClick={() => onOpenAdvisorModal('advisor', 'Course Pathway Consultation')}
            id="speak-to-advisor-cta-btn"
            className="z-10 bg-[#ea6d24] hover:bg-[#d85e19] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Speak to an Advisor</span>
          </button>
        </section>
      </div>
    </div>
  );
};
