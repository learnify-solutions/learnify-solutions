import React from 'react';
import { Star, Users, BookOpen, Award, Globe } from 'lucide-react';
import { StatItem } from '../types';

interface StatsBarProps {
  stats: StatItem[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'star':
        return <Star className="w-5 h-5 text-amber-400 fill-amber-400" />;
      case 'users':
        return <Users className="w-5 h-5 text-sky-200" />;
      case 'book':
        return <BookOpen className="w-5 h-5 text-sky-200" />;
      case 'award':
        return <Award className="w-5 h-5 text-sky-200" />;
      default:
        return <Globe className="w-5 h-5 text-sky-200" />;
    }
  };

  return (
    <section id="stats-banner" className="w-full bg-[#1c4466] py-6 text-white border-y border-[#26537a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#2b5880]">
          {stats.map((stat, index) => (
            <div
              key={stat.id || index}
              className={`flex items-center justify-center gap-3.5 ${
                index !== 0 ? 'pt-4 md:pt-0' : ''
              }`}
            >
              <div className="p-2 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                {getIcon(stat.icon)}
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-sky-100 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

