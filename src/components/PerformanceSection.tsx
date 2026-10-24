import React from 'react';

interface PerformanceSectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick: () => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  title,
  description,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <section id="corporate" className="w-full bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ea6d24] tracking-tight leading-snug">
          {title}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
          {description}
        </p>

        <div className="pt-2">
          <button
            id="performance-request-btn"
            onClick={onCtaClick}
            className="bg-[#ea6d24] hover:bg-[#d85e19] text-white font-semibold text-sm px-8 py-3.5 rounded-md transition-all shadow-xs hover:shadow cursor-pointer inline-flex items-center justify-center"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};
