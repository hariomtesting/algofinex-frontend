import React from 'react';
import { Navbar } from './components/marketing/Navbar';
import { Hero } from './components/marketing/Hero';
import { ProductRevealSection } from './components/marketing/ProductRevealSection';
import { IndicatorSystemSection } from './components/marketing/IndicatorSystemSection';
import { SceneTransitionBridge } from './components/marketing/SceneTransitionBridge';
import { SessionSection } from './components/marketing/SessionSection';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-brand-blue/20 selection:text-slate-900 flex flex-col justify-between">
      {/* Top Persistent Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="flex-1 w-full min-w-0">
        {/* Phase 1 Approved Hero (Refined with generous whitespace & card reduction) */}
        <Hero />

        {/* Phase 2: Section A — Product Reveal (Dominant Interactive Workstation) */}
        <ProductRevealSection />

        {/* Phase 2: Section B — Unified Indicator System (4 Analytical Layers) */}
        <IndicatorSystemSection />

        {/* Phase 2: Stepped Visual Workflow Transformation Pipeline */}
        <SceneTransitionBridge />

        {/* Phase 2: Section C — 3-Day Session Storytelling & 7-Step Routine */}
        <SessionSection />
      </main>

      {/* Persistent Landing Footer */}
      <footer className="border-t border-black/[0.06] bg-[#F1F3F5] py-10 px-5 sm:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-md bg-brand-blue flex items-center justify-center shadow-2xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M4 17L11 10L15 14L20 6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-display font-bold text-slate-900 tracking-[-0.03em] text-sm">
                Algo<span className="text-slate-600 font-medium">Finex</span>
              </span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="text-slate-500 text-[11px]">
              Multi-Layered Market Structure &amp; 7-Step Trading Workflow
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#indicator-system" className="text-slate-600 hover:text-slate-900 transition-colors">Indicators</a>
            <a href="#workflow" className="text-slate-600 hover:text-slate-900 transition-colors">Methodology</a>
            <a href="#session" className="text-slate-600 hover:text-slate-900 transition-colors">3-Day Session</a>
            <a href="#signin" className="text-slate-600 hover:text-slate-900 transition-colors">Client Portal</a>
          </div>

          <div className="text-slate-400 text-[10px] text-center md:text-right">
            © 2026 AlgoFinex. Educational market structure analysis. Not financial advice.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

