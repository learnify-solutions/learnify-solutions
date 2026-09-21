import React from 'react';
import { PathwayStep } from '../types';

interface PathwaySectionProps {
  title: string;
  subtitle: string;
  steps: PathwayStep[];
}

export const PathwaySection: React.FC<PathwaySectionProps> = ({
  title,
  subtitle,
  steps,
}) => {
  return (
    <section className="w-full bg-[#fbfcfd] py-16 md:py-24 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1b5a88] tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 6 Steps Progression */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-[14px] left-[5%] right-[5%] h-[2px] bg-slate-200 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step) => {
              return (
                <div
                  key={step.stepNumber}
                  className="flex flex-col items-center text-center space-y-3 group"
                >
                  {/* Target Pin / Ring Icon */}
                  <div
                    className="w-7 h-7 rounded-full bg-white border-2 border-[#ea6d24] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#ea6d24]" />
                  </div>

                  {/* Step Marker Label */}
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#c24e0d]">
                    STEP {step.stepNumber}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-sm font-bold text-[#1b5a88] max-w-[130px] leading-tight group-hover:text-[#ea6d24] transition-colors">
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
