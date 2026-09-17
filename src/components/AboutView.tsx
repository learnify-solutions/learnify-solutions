import React, { useEffect } from 'react';
import {
  Eye,
  Rocket,
  Award,
  ShieldCheck,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { AboutPageData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';

interface AboutViewProps {
  data: AboutPageData;
  onRequestQuote: () => void;
  onExploreCourses: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  data,
  onRequestQuote,
  onExploreCourses,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const getCoreValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="w-5 h-5 text-white" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-white" />;
      case 'users':
        return <Users className="w-5 h-5 text-white" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5 text-white" />;
      default:
        return <Award className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div id="about-page-root" className="w-full bg-[#fbfcfd] text-slate-900">
      {/* 1. About Us Hero Section */}
      <section id="about-hero" className="w-full py-12 md:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div>
                <span className="inline-block text-xs font-semibold px-3.5 py-1 rounded-full bg-orange-100/80 text-[#ea6d24]">
                  {data.hero.badge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="block text-[#1b5a88]">{data.hero.titlePrefix}</span>
                <span className="block text-[#ea6d24] mt-1">{data.hero.titleSuffix}</span>
              </h1>

              {/* Paragraph 1 */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Learnify Solutions is a trusted name in professional training, committed to empowering individuals and organizations through high-impact learning. Founded with a vision to bridge the skills gap in today&apos;s dynamic tech landscape, we deliver expert-led, industry-recognized training programs across domains such as{' '}
                <span className="font-bold text-[#1b5a88]">Networking, (AI), Cloud Computing, DevOps, and more</span>.
              </p>

              {/* Paragraph 2 */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                {data.hero.paragraph2}
              </p>

              {/* Stylized Quote Box */}
              <div className="bg-[#f0f4f8] rounded-xl p-5 sm:p-6 border-l-4 border-[#1b5a88] text-slate-700">
                <p className="italic text-sm sm:text-base font-medium">
                  {data.hero.quote}
                </p>
              </div>

              {/* Tagline */}
              <div className="pt-2 text-sm sm:text-base text-slate-800">
                <span className="font-bold">{data.hero.taglineBold} </span>
                <span className="text-slate-600">{data.hero.taglineRest}</span>
              </div>
            </div>

            {/* Right Image Column (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 group">
                <img
                  src={normalizeImageUrl(data.hero.imageUrl, 'about')}
                  alt={data.hero.imageAlt || 'Learnify Solutions Training Team'}
                  className="w-full h-auto aspect-4/3 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('hero.webp')) {
                      target.src = '/hero.webp';
                    }
                  }}
                />
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#ea6d24] shadow-xs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Vision & Our Mission Section */}
      <section id="about-vision-mission" className="w-full py-16 md:py-20 bg-[#f4f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative flex flex-col space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ea6d24] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ea6d24] tracking-tight">
                {data.visionMission.vision.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1">
                {data.visionMission.vision.description}
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative flex flex-col space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ea6d24] flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ea6d24] tracking-tight">
                {data.visionMission.mission.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1">
                {data.visionMission.mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Values Section */}
      <section id="about-core-values" className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ea6d24] tracking-tight">
              {data.coreValues.title}
            </h2>
            <div className="w-12 h-1 bg-[#1b5a88] rounded-full mx-auto" />
          </div>

          {/* 2x2 Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-4">
            {data.coreValues.values.map((val) => (
              <div
                key={val.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs pt-9 pb-7 px-6 sm:px-8 relative text-center space-y-4 flex flex-col items-center hover:shadow-md transition-shadow"
              >
                {/* Floating Top Center Circular Icon */}
                <div className="absolute -top-5 w-11 h-11 rounded-full bg-[#ea6d24] flex items-center justify-center shadow-md border-2 border-white">
                  {getCoreValueIcon(val.icon)}
                </div>

                {/* Value Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1b5a88] pt-1">
                  {val.title}
                </h3>

                {/* Inset Light Grey/Blue Text Box */}
                <div className="w-full bg-[#f2f6fa] rounded-xl p-5 sm:p-6 text-slate-600 text-xs sm:text-sm leading-relaxed text-center flex-1 flex items-center justify-center">
                  <p>{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Elevate Team's Performance CTA Card */}
      <section id="about-performance-cta" className="w-full py-16 bg-[#fcf8f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-orange-200/60 shadow-xs text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ea6d24] tracking-tight leading-snug">
              {data.performanceCta.title}
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed max-w-3xl mx-auto font-normal">
              {data.performanceCta.description}
            </p>

            <div className="pt-2">
              <button
                id="about-raise-request-btn"
                onClick={onRequestQuote}
                className="bg-[#ea6d24] hover:bg-[#d85e19] text-white font-semibold text-sm px-8 py-3.5 rounded-md transition-all shadow-xs hover:shadow cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{data.performanceCta.buttonLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
