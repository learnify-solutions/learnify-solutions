import React, { useState } from 'react';
import { MessageSquare, ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonials?: Array<{
    id: string;
    author: string;
    role: string;
    company: string;
    quote: string;
    rating?: number;
  }>;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonialsTitle = 'What Corporate Teams Say',
  testimonialsSubtitle = 'Explore verified client reviews and feedback across our global enterprise training cohorts.',
  testimonials = []
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const defaultTestimonials = [
    {
      id: 'test-1',
      author: 'Aiden Vance',
      role: 'VP of Engineering',
      company: 'Apex Technologies, UAE',
      quote: 'Learnify delivered exceptional onsite and virtual training for our cloud migration team. Their instructors are highly knowledgeable and kept our engineers fully engaged.',
      rating: 5,
    },
    {
      id: 'test-2',
      author: 'Fatima Al-Hassani',
      role: 'Head of IT Infrastructure',
      company: 'Muscat Global Bank, Oman',
      quote: 'The security and networking bootcamps significantly boosted our team’s confidence. Passing rates for our certifications were outstanding.',
      rating: 5,
    },
    {
      id: 'test-3',
      author: 'Marcus Sterling',
      role: 'Director of Security',
      company: 'Vanguard Systems, UK',
      quote: 'Professional, punctual, and intensely practical. The lab environments provided during the live sessions mirrored real-world enterprise scenarios.',
      rating: 5,
    },
    {
      id: 'test-4',
      author: 'Priya Sharma',
      role: 'Cloud Operations Lead',
      company: 'TechCorp Solutions, India',
      quote: 'The flexibility of scheduling and tailored enterprise curriculum made all the difference for our multi-region workforce upskilling.',
      rating: 5,
    },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-3">
              <MessageSquare className="w-4 h-4" />
              Authentic Client Impact
            </div>
            <h2 className="text-3xl lg:text-[40px] font-bold text-slate-900 mb-2 tracking-tight">
              {testimonialsTitle}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              {testimonialsSubtitle}
            </p>
          </div>
          {totalPages > 1 && (
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-colors shadow-xs cursor-pointer ${currentPage === 0 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:text-orange-600 hover:border-orange-600'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
                className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-colors shadow-xs cursor-pointer ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-600 hover:text-orange-600 hover:border-orange-600'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((test) => (
            <div key={test.id} className="bg-slate-50 rounded-[24px] border border-slate-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange-500 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{test.author}</h4>
                  <p className="text-xs text-slate-500">{test.role}</p>
                  <p className="text-[11px] text-orange-600 font-semibold mt-0.5">{test.company}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
