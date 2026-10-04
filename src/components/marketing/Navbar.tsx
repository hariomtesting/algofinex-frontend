import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/90 border-b border-black/[0.06] w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-6 w-full min-w-0">
        
        {/* Brand Mark */}
        <a href="/" className="flex items-center gap-2.5 group focus:outline-none rounded-md shrink-0">
          <div className="size-8 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 18L10 8L14 14L20 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="6" r="2.2" fill="#059669" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-slate-900 text-base leading-none group-hover:text-brand-blue transition-colors">
              ALGOFINEX
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-500 mt-1 uppercase font-semibold">
              INDICATORS &amp; WORKFLOW
            </span>
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
            href="#workflow"
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
          <a
            href="#signin"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Client Portal
          </a>

          <a
            href="#session"
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
              href="#session"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-colors"
            >
              <span>Join 3-Day Session</span>
              <ChevronRight className="size-4" />
            </a>
            <a
              href="#signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Client Portal
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
