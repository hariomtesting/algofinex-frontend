import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenPortal) {
      onOpenPortal();
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/90 border-b border-black/[0.06] w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-6 w-full min-w-0">
        
        {/* Brand Mark: Proprietary Geometric Coordinate Glyph + Tight Editorial Wordmark */}
        <a href="/" className="flex items-center gap-2.5 group focus:outline-none rounded-md shrink-0">
          <div className="size-7 sm:size-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-[1.03]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              {/* Intersecting technical coordinates */}
              <line x1="3" y1="20" x2="21" y2="20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
              <line x1="4" y1="20" x2="4" y2="4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
              {/* Upward 45-degree structural ray */}
              <path d="M4 17L11 10L15 14L20 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="6" r="2.2" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="font-display font-bold tracking-[-0.03em] text-slate-900 text-lg leading-none">
              Algo<span className="text-slate-600 font-semibold">Finex</span>
            </span>
            <span className="size-1 rounded-full bg-brand-blue ml-0.5" />
          </div>
        </a>

        {/* Minimal Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a
            href="#product-experience"
            className="hover:text-slate-900 transition-colors duration-150"
          >
            Indicators
          </a>
          <a
            href="#methodology"
            className="hover:text-slate-900 transition-colors duration-150"
          >
            Methodology
          </a>
          <a
            href="#session"
            className="hover:text-slate-900 transition-colors duration-150 flex items-center gap-1.5"
          >
            <span>3-Day Session</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-50 text-brand-blue border border-blue-200/60">
              LIVE
            </span>
          </a>
          <a
            href="#pricing"
            className="hover:text-slate-900 transition-colors duration-150"
          >
            Pricing
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <button
            onClick={handlePortalClick}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Client Portal
          </button>

          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-150 shadow-sm"
          >
            <span>Join 3-Day Session</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5 text-white/90" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-100/80 border border-slate-200/80 text-slate-700 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white/98 backdrop-blur-xl border-b border-black/[0.08] px-6 py-6 flex flex-col gap-5 shadow-xl">
          <nav className="flex flex-col gap-3.5 text-base font-medium text-slate-700">
            <a
              href="#product-experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-slate-900 py-1"
            >
              Indicators
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-slate-900 py-1"
            >
              Methodology
            </a>
            <a
              href="#session"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-slate-900 py-1 flex items-center justify-between"
            >
              <span>3-Day Session</span>
              <span className="text-xs font-mono font-bold text-brand-blue bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">LIVE</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-slate-900 py-1"
            >
              Pricing
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-colors"
            >
              <span>Join 3-Day Session</span>
              <ChevronRight className="size-4" />
            </a>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handlePortalClick(e);
              }}
              className="w-full py-2 text-center text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Client Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
