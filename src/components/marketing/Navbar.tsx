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
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl bg-[#05080E]/80 border-b border-white/[0.08] w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-6 w-full min-w-0">
        
        {/* Brand Mark: Geometric Coordinate Glyph + Tight Editorial Wordmark */}
        <a href="/" className="flex items-center gap-2.5 group focus:outline-none rounded-md shrink-0">
          <div className="size-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-[1.05] group-hover:border-emerald-400/60 shadow-[0_0_15px_rgba(0,240,144,0.15)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="3" y1="20" x2="21" y2="20" stroke="#00F090" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.8" />
              <line x1="4" y1="20" x2="4" y2="4" stroke="#00F090" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.8" />
              <path d="M4 17L11 10L15 14L20 6" stroke="#00F090" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="6" r="2.2" fill="#00E5FF" />
            </svg>
          </div>
          <div className="flex items-baseline">
            <span className="font-display font-bold tracking-[-0.03em] text-white text-lg leading-none">
              Algo<span className="text-emerald-400 font-semibold">Finex</span>
            </span>
            <span className="size-1 rounded-full bg-emerald-400 ml-0.5 shadow-[0_0_8px_#00F090]" />
          </div>
        </a>

        {/* Minimal Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#product-experience"
            className="hover:text-emerald-400 transition-colors duration-150"
          >
            Indicators
          </a>
          <a
            href="#methodology"
            className="hover:text-emerald-400 transition-colors duration-150"
          >
            Methodology
          </a>
          <a
            href="#session"
            className="hover:text-emerald-400 transition-colors duration-150 flex items-center gap-1.5"
          >
            <span>3-Day Session</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              LIVE
            </span>
          </a>
          <a
            href="#pricing"
            className="hover:text-emerald-400 transition-colors duration-150"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-emerald-400 transition-colors duration-150"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <button
            onClick={handlePortalClick}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5"
          >
            Launch Workstation
          </button>

          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-150 shadow-[0_0_20px_rgba(0,240,144,0.3)] hover:shadow-[0_0_28px_rgba(0,240,144,0.5)]"
          >
            <span>Get Started</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5 text-slate-950" />
          </a>
        </div>

        {/* Mobile Hamburger Button (48px Touch Target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden min-h-[48px] min-w-[48px] p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white flex items-center justify-center focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer with 48px+ Touch Targets */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-[#080C14]/98 backdrop-blur-2xl border-b border-white/[0.1] px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <nav className="flex flex-col text-base font-medium text-slate-200">
            <a
              href="#product-experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 min-h-[48px] flex items-center border-b border-white/[0.06]"
            >
              Indicators
            </a>
            <a
              href="#understanding"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 min-h-[48px] flex items-center border-b border-white/[0.06]"
            >
              Methodology
            </a>
            <a
              href="#session"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 min-h-[48px] flex items-center justify-between border-b border-white/[0.06]"
            >
              <span>3-Day Session</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">LIVE</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 min-h-[48px] flex items-center border-b border-white/[0.06]"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 min-h-[48px] flex items-center border-b border-white/[0.06]"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-[0_0_20px_rgba(0,240,144,0.3)]"
            >
              <span>Get Started</span>
              <ChevronRight className="size-4" />
            </a>
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handlePortalClick(e);
              }}
              className="w-full min-h-[48px] flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl cursor-pointer"
            >
              Launch Workstation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
