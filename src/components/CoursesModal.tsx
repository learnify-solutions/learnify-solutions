import React, { useState } from 'react';
import { X, Search, BookOpen, Clock, Star, Users, Check, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface CoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  initialDomain?: string;
  onSelectCourse: (course: Course) => void;
  isCiscoAuthorized?: boolean;
}

export const CoursesModal: React.FC<CoursesModalProps> = ({
  isOpen,
  onClose,
  courses,
  initialDomain = 'all',
  onSelectCourse,
  isCiscoAuthorized = false,
}) => {
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const domains = [
    'all',
    'Cloud Computing',
    'Cybersecurity',
    'Artificial Intelligence',
    'DevOps',
    'Microsoft Solutions',
    ...(isCiscoAuthorized ? ['Cisco Networking'] : ['IT Infrastructure & Linux']),
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesDomain =
      selectedDomain === 'all' ||
      c.domain.toLowerCase() === selectedDomain.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        id="courses-modal-card"
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1b5a88]">
              Learnify Course Catalog
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Explore enterprise certifications and structured career pathways
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-6 pb-2 space-y-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, certification (e.g. AWS, CISSP, Docker)..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#ea6d24]"
            />
          </div>

          {/* Domain Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDomain.toLowerCase() === d.toLowerCase()
                    ? 'bg-[#1b5a88] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {d === 'all' ? 'All Domains' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Courses List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-sm">No matching courses found</p>
              <p className="text-xs text-slate-400">Try adjusting your search query or domain filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-orange-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#ea6d24] uppercase tracking-wide">
                        {course.domain}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {course.level}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#1b5a88] leading-snug">
                      {course.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {course.summary}
                    </p>

                    <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course.enrolled.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      {course.curriculum.length} Core Modules
                    </div>
                    <button
                      onClick={() => {
                        onSelectCourse(course);
                        onClose();
                      }}
                      className="bg-[#ea6d24] hover:bg-[#d85e19] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Enroll / Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
