import React from 'react';

interface FinalCtaSectionProps {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCta,
  onSecondaryCta,
}) => {
  return (
    <section className="w-full bg-[#1c4466] py-20 md:py-24 text-white relative overflow-hidden">
      {/* Decorative ambient background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1c4466] to-[#15344f] opacity-95"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h2>

        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* 2 Centered Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="final-browse-catalog-btn"
            onClick={onPrimaryCta}
            className="w-full sm:w-auto bg-[#ea6d24] hover:bg-[#d85e19] text-white font-semibold text-sm px-8 py-3.5 rounded-md transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
          >
            {primaryCtaLabel}
          </button>

          <button
            id="final-request-demo-btn"
            onClick={onSecondaryCta}
            className="w-full sm:w-auto bg-[#183956] hover:bg-[#122c44] text-white font-semibold text-sm px-8 py-3.5 rounded-md border border-[#37658c] transition-all hover:border-slate-300 cursor-pointer text-center"
          >
            {secondaryCtaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};
