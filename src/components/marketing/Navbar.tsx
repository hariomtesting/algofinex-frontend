import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl bg-background/85 border-b border-white/[0.06] w-full overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-6 w-full min-w-0">
        
        {/* Brand Mark */}
        <a href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md shrink-0">
          <div className="relative size-9 rounded-lg bg-surface-elevated border border-white/[0.12] flex items-center justify-center overflow-hidden shadow-panel group-hover:border-brand-blue/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-60" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
              <path d="M4 18L10 8L14 14L20 6" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="6" r="2.5" fill="#10B981" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-white text-base leading-none group-hover:text-brand-accent transition-colors">
              ALGOFINEX
            </span>
            <span className="text-[10px] font-mono tracking-widest text-text-muted mt-1 uppercase">
              INDICATORS &amp; ANALYSIS
            </span>
          </div>
        </a>

        {/* Streamlined Desktop Navigation (Preferred Hierarchy) */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#indicator-system"
            className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
          >
            Indicators
          </a>
          <a
            href="#workflow"
            className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
          >
            Methodology
          </a>
          <a
            href="#session"
            className="relative text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 flex items-center gap-1.5"
          >
            <span>3-Day Session</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-brand-blue/15 text-brand-accent border border-brand-blue/30">
              LIVE
            </span>
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
          >
            Pricing
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#signin"
            className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
          >
            Client Portal
          </a>

          <a
            href="#session"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-200 shadow-glow-blue hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <span>Join 3-Day Session</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5 text-white/80" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-surface border border-white/[0.08] text-text-secondary hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bg-surface-elevated/98 backdrop-blur-2xl border-b border-white/[0.1] px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200 shadow-terminal">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a
              href="#indicator-system"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-white py-1"
            >
              Indicators
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-white py-1"
            >
              Methodology
            </a>
            <a
              href="#session"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-white py-1 flex items-center justify-between"
            >
              <span>3-Day Session</span>
              <span className="text-xs font-mono text-brand-accent bg-brand-blue/15 px-2 py-0.5 rounded">LIVE</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-white py-1"
            >
              Pricing
            </a>
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <a
              href="#session"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-colors"
            >
              <span>Join 3-Day Session</span>
              <ChevronRight className="size-4" />
            </a>
            <a
              href="#signin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium text-text-secondary hover:text-white"
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
