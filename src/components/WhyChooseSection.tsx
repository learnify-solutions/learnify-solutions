import React from 'react';

interface WhyChooseCard {
  id: string;
  title: string;
  description: string;
}

interface WhyChooseSectionProps {
  title: string;
  subtitle: string;
  cards: WhyChooseCard[];
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  title,
  subtitle,
  cards,
}) => {
  return (
    <section className="w-full bg-[#fbfcfd] py-16 md:py-20 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ea6d24] tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#f0f4f8] rounded-xl p-6 sm:p-8 border border-slate-200/60 shadow-xs flex flex-col justify-center text-center space-y-2.5 transition-all hover:bg-[#e9f0f6]"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#1b5a88]">
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
