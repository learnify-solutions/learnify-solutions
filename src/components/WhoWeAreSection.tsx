import React from 'react';
import { InfoCard } from '../types';

interface WhoWeAreSectionProps {
  title: string;
  description: string;
  cards: InfoCard[];
  ctaLabel: string;
  onCtaClick: () => void;
}

export const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = ({
  title,
  description,
  cards,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <section id="about" className="w-full bg-[#fbfcfd] py-16 md:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ea6d24] tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-start text-center space-y-3"
            >
              <h3 className="text-base sm:text-lg font-bold text-[#1b5a88] leading-snug">
                {card.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-2">
          <button
            id="who-we-are-read-more-btn"
            onClick={onCtaClick}
            className="bg-[#ea6d24] hover:bg-[#d85e19] text-white font-semibold text-sm px-8 py-3 rounded-md transition-all shadow-xs hover:shadow cursor-pointer"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};
