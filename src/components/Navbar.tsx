import React, { useState } from 'react';
import { Search, Menu, X, Settings2 } from 'lucide-react';
import { NavigationLink } from '../types';
import { LearnifyLogo } from './LearnifyLogo';

interface NavbarProps {
  isAdminAuthenticated?: boolean;
  logoTitle: string;
  logoSubtitle: string;
  links: NavigationLink[];
  ctaLabel: string;
  onCtaClick: () => void;
  onSearchClick: () => void;
  onOpenCmsAdmin: () => void;
  onNavLinkClick: (link: NavigationLink) => void;
  activeNavId: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logoTitle,
  logoSubtitle,
  links,
  ctaLabel,
  onCtaClick,
  onSearchClick,
  onOpenCmsAdmin,
  onNavLinkClick,
  activeNavId,
  isAdminAuthenticated,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#home"
              id="brand-logo-btn"
              aria-label="Learnify Solutions - Global Enterprise IT Training Homepage"
              className="flex items-center group cursor-pointer text-left py-1"
              onClick={(e) => {
                e.preventDefault();
                onNavLinkClick({ id: 'nav-home', label: 'Home', href: '#home' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <LearnifyLogo className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-102" />
            </a>
          </div>

          {/* Desktop Navigation Links & Inline Search */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7" aria-label="Main Navigation">
            {links.map((link) => {
              const isActive = activeNavId === link.id || (link.id === 'nav-about' && activeNavId === 'about') || (link.id === 'nav-home' && activeNavId === 'home');
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavLinkClick(link)}
                  className={`text-sm font-medium transition-all relative py-2 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#1b5a88] font-bold'
                      : 'text-slate-600 hover:text-[#ea6d24]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea6d24] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Inline Search Bar */}
            <div
              onClick={onSearchClick}
              className="relative flex items-center cursor-pointer group"
            >
              <input
                type="text"
                id="navbar-search-input"
                aria-label="Search courses and IT certifications"
                readOnly
                placeholder="What do you want to learn"
                className="w-44 xl:w-52 pl-3 pr-8 py-1.5 text-xs rounded-md border border-slate-300 bg-slate-50/70 text-slate-700 placeholder-slate-400 group-hover:border-[#ea6d24] group-hover:bg-white transition-all cursor-pointer select-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ea6d24] absolute right-2.5 pointer-events-none transition-colors" />
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {isAdminAuthenticated && (
              <button
                onClick={onOpenCmsAdmin}
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all flex items-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Settings2 className="w-4 h-4" />
                Backend CMS
              </button>
            )}
            <button
              id="navbar-cta-advisor-btn"
              onClick={onCtaClick}
              className="bg-[#ea6d24] hover:bg-[#d85e19] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all shadow-xs hover:shadow cursor-pointer whitespace-nowrap"
            >
              {ctaLabel}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-search-btn"
              onClick={onSearchClick}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {links.map((link) => {
              const isActive = activeNavId === link.id || (link.id === 'nav-about' && activeNavId === 'about');
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavLinkClick(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-[#ea6d24] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  onOpenCmsAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-md transition-colors text-center flex items-center justify-center gap-2 mb-2 cursor-pointer"
              >
                <Settings2 className="w-4 h-4" />
                Backend CMS
              </button>
            )}
            <button
              onClick={() => {
                onCtaClick();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#ea6d24] hover:bg-[#d85e19] text-white text-sm font-semibold py-2.5 rounded-md transition-colors text-center cursor-pointer"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
