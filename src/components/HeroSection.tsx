import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Award, ShieldCheck } from 'lucide-react';
import { normalizeImageUrl } from '../utils/imageHelper';
import defaultHeroImg from '../assets/images/learnify_hero_workstation_1787768560565.webp';

const FALLBACK_HERO_IMAGE = '/hero.webp';

interface HeroSectionProps {
  headline: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  imageUrl?: string;
  imageAlt?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCta,
  onSecondaryCta,
  imageUrl,
  imageAlt = 'Modern enterprise technology workstation',
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => normalizeImageUrl(imageUrl, 'hero') || defaultHeroImg);

  useEffect(() => {
    setImgSrc(normalizeImageUrl(imageUrl, 'hero') || defaultHeroImg);
  }, [imageUrl]);

  // Format headline with high-contrast accent highlight
  const renderHeadline = () => {
    if (headline.includes('Future')) {
      const parts = headline.split('Future');
      return (
        <>
          {parts[0]}
          <span className="text-[#ea6d24]">Future{parts[1] || ''}</span>
        </>
      );
    }
    if (headline.includes('.')) {
      const parts = headline.split('.');
      return (
        <>
          {parts[0]} <span className="text-[#ea6d24]">{parts[1] || '.'}</span>
        </>
      );
    }
    return headline;
  };

  return (
    <section
      id="hero-section"
      className="bg-white border-b border-slate-200 relative overflow-hidden"
    >
      {/* Subtle Geometric Background Corner Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/80 pointer-events-none rounded-bl-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] sm:text-xs font-semibold text-slate-700 mb-4 border border-slate-200 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#ea6d24] animate-pulse" />
              GLOBAL IT TRAINING & CERTIFICATION ECOSYSTEM
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold text-[#152e4d] leading-[1.12] tracking-tight mb-4">
              {renderHeadline()}
            </h1>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-xl font-normal">
              {description}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                id="hero-explore-courses-btn"
                onClick={onPrimaryCta}
                className="w-full sm:w-auto bg-[#ea6d24] hover:bg-[#d85e19] text-white px-6 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-talk-advisor-btn"
                onClick={onSecondaryCta}
                className="w-full sm:w-auto bg-white border border-slate-300 hover:border-[#152e4d] text-[#1b5a88] px-6 py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:bg-slate-50"
              >
                <Sparkles className="w-4 h-4 text-[#ea6d24]" />
                <span>{secondaryCtaLabel}</span>
              </button>
            </div>
          </div>

          {/* Right Image Column with Floating Glassmorphic Badge */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group bg-slate-100">
                <img
                  src={imgSrc}
                  alt={imageAlt}
                  width="600"
                  height="450"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={() => setImgSrc(FALLBACK_HERO_IMAGE)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#152e4d]/40 via-transparent to-transparent" />

                {/* Floating Glassmorphic Trust Card */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3.5 max-w-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#ea6d24] shrink-0 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-[#ea6d24]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold">Live Sandbox Labs</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">100% Practical IT Training</div>
                  </div>
                  <div className="ml-auto px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
