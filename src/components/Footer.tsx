import React, { useState } from 'react';
import { FooterColumn } from '../types';
import { LearnifyLogo } from './LearnifyLogo';
import { 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Mail, 
  Globe2, 
  ShieldCheck, 
  Award,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  brandName: string;
  description: string;
  copyright: string;
  columns: FooterColumn[];
  onLinkClick?: (link: { label: string; href: string }) => void;
  isCiscoAuthorized?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  brandName,
  description,
  copyright,
  columns,
  onLinkClick,
  isCiscoAuthorized,
}) => {
  // Mobile accordion state for collapsible sections on phones
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true, // First column open by default on mobile
  });

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="site-footer"
      className="w-full bg-[#15344f] text-white pt-12 md:pt-16 pb-12 border-t border-[#1e486d] select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Quick Action Contact Strip */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#1b4366]/80 border border-[#2a5b88]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#ea6d24] flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Fast-Track Consultation</p>
              <p className="text-sm font-bold text-white">Have questions about a course or corporate batch?</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="https://wa.me/918810255422"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#15344f] font-semibold text-xs sm:text-sm hover:bg-orange-50 transition-colors shadow-sm min-h-[44px]"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 text-[#ea6d24]"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>Chat (+91 881 025 5422)</span>
            </a>
            <a
              href="mailto:info@learnify-solutions.com"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ea6d24] text-white font-semibold text-xs sm:text-sm hover:bg-[#d55e1b] transition-colors shadow-sm min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Main Grid: Desktop 5-columns, Mobile responsive accordion / 2-columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 border-b border-[#1e486d]/80">
          
          {/* Brand Col (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onLinkClick && onLinkClick({ label: 'Home', href: '#home' })}
              className="text-left cursor-pointer focus:outline-hidden inline-block"
              aria-label="Learnify Solutions Logo Home Link"
            >
              <LearnifyLogo variant="dark-bg" className="h-10 sm:h-12 w-auto" />
            </button>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {description}
            </p>
            
            {/* Global Accreditation & Trust Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a4163] text-slate-300 border border-[#255883]">
                <Globe2 className="w-3.5 h-3.5 text-orange-400" />
                <span>USA • Europe • UAE • Africa</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a4163] text-slate-300 border border-[#255883]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Authorized Curriculum</span>
              </span>
            </div>
          </div>

          {/* Dynamic Link Columns with Mobile Accordion on small screens */}
          {columns.map((column, index) => {
            const isOpen = openSections[index] ?? false;
            return (
              <div 
                key={column.title || index} 
                className="space-y-3 sm:space-y-4 border-t sm:border-t-0 border-[#1e486d] pt-4 sm:pt-0"
              >
                {/* Desktop static header / Mobile interactive accordion header */}
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex sm:hidden items-center justify-between py-1 text-left cursor-pointer min-h-[36px]"
                  aria-expanded={isOpen}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-300">
                    {column.title}
                  </h4>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {/* Desktop permanent header */}
                <h4 className="hidden sm:block text-xs font-bold uppercase tracking-wider text-slate-300">
                  {column.title}
                </h4>

                {/* Links list (always visible on tablet/desktop, collapsible on mobile) */}
                <ul className={`space-y-2 ${isOpen ? 'block' : 'hidden sm:block'}`}>
                  {column.links.map((link, lIndex) => (
                    <li key={lIndex}>
                      <button
                        onClick={() => onLinkClick && onLinkClick(link)}
                        className="text-sm text-slate-300 hover:text-orange-300 active:text-white transition-colors cursor-pointer text-left py-1.5 sm:py-0.5 block w-full focus:outline-hidden min-h-[36px] sm:min-h-0 flex items-center"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Legal, Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left space-y-1">
            <p className="font-medium text-slate-300">{copyright}</p>
            <p className="text-[11px] text-slate-400">All brand logos and certification trademarks belong to their respective owners (AWS, Microsoft, Cisco, CompTIA, Axelos).</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onLinkClick && onLinkClick({ label: 'Privacy Policy', href: '#privacy-policy' })}
              className="hover:text-white transition-colors underline underline-offset-4 py-1"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onLinkClick && onLinkClick({ label: 'Contact Us', href: '#contact' })}
              className="hover:text-white transition-colors underline underline-offset-4 py-1"
            >
              Contact Support
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a4163] hover:bg-[#255883] text-slate-200 transition-colors cursor-pointer min-h-[36px]"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
