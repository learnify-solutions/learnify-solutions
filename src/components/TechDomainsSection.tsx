import React from 'react';
import {
  Cloud,
  Shield,
  Sparkles,
  Layers,
  LayoutGrid,
  Network,
  ArrowUpRight,
  Database,
  Code2,
} from 'lucide-react';
import { TechDomain } from '../types';

interface TechDomainsSectionProps {
  title: string;
  subtitle: string;
  viewAllText: string;
  viewAllHref: string;
  domains: TechDomain[];
  onSelectDomain: (domain: TechDomain) => void;
  onViewAll: () => void;
}

export const TechDomainsSection: React.FC<TechDomainsSectionProps> = ({
  title,
  subtitle,
  viewAllText,
  domains,
  onSelectDomain,
  onViewAll,
}) => {
  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud':
        return <Cloud className="w-5 h-5 text-[#1b5a88]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#1b5a88]" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-[#ea6d24]" />;
      case 'devops':
        return <Layers className="w-5 h-5 text-[#1b5a88]" />;
      case 'microsoft':
        return <LayoutGrid className="w-5 h-5 text-[#1b5a88]" />;
      case 'cisco':
        return <Network className="w-5 h-5 text-[#1b5a88]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#1b5a88]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#1b5a88]" />;
    }
  };

  return (
    <section id="courses" className="w-full bg-white py-16 md:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b5a88] tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              {subtitle}
            </p>
          </div>

          <button
            id="view-all-domains-btn"
            onClick={onViewAll}
            className="text-[#ea6d24] hover:text-[#d85e19] text-sm font-bold flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>{viewAllText}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* 6 Technology Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => (
            <div
              key={domain.id}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${domain.name} enterprise training courses`}
              onClick={() => onSelectDomain(domain)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDomain(domain);
                }
              }}
              className="group bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-[#ea6d24] focus:ring-offset-2"
            >
              {/* Top Row: Icon + Arrow / Trending Badge */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors">
                  {getDomainIcon(domain.iconName)}
                </div>

                {domain.isTrending ? (
                  <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-[#c24e0d] uppercase border border-orange-200">
                    TRENDING
                  </span>
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1b5a88] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                )}
              </div>

              {/* Bottom: Domain Name and Tags */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#1b5a88] group-hover:text-[#ea6d24] transition-colors">
                  {domain.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  {domain.tags}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
