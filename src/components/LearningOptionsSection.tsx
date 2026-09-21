import React from 'react';
import { InfoCard } from '../types';

interface LearningOptionsSectionProps {
  title: string;
  cards: InfoCard[];
  onSelectOption?: (option: InfoCard) => void;
}

export const LearningOptionsSection: React.FC<LearningOptionsSectionProps> = ({
  title,
  cards,
  onSelectOption,
}) => {
  return (
    <section id="solutions" className="w-full bg-white py-16 md:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ea6d24] tracking-tight">
            {title}
          </h2>
        </div>

        {/* 3 Learning Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${card.title} learning format`}
              onClick={() => onSelectOption && onSelectOption(card)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onSelectOption) onSelectOption(card);
                }
              }}
              className="bg-white rounded-xl p-7 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col text-center space-y-4 cursor-pointer hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:ring-offset-2"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#1b5a88] leading-snug">
                {card.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
