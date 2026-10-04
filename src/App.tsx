import React from 'react';
import { Navbar } from './components/marketing/Navbar';
import { Hero } from './components/marketing/Hero';
import { ProductRevealSection } from './components/marketing/ProductRevealSection';
import { IndicatorSystemSection } from './components/marketing/IndicatorSystemSection';
import { SceneTransitionBridge } from './components/marketing/SceneTransitionBridge';
import { SessionSection } from './components/marketing/SessionSection';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-brand-blue/30 selection:text-white flex flex-col justify-between">
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
      <footer className="border-t border-white/[0.08] bg-[#07090E] py-10 px-5 sm:px-8 text-xs font-mono text-text-muted">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-blue" />
              <span className="font-semibold text-white tracking-wide">ALGOFINEX</span>
              <span className="text-text-dim text-[11px]">INDICATORS &amp; ANALYSIS</span>
            </div>
            <span className="hidden sm:inline text-border-medium">•</span>
            <div className="text-text-secondary text-[11px]">
              Multi-Layered Market Structure • 7-Step Trading Workflow
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#indicator-system" className="hover:text-white transition-colors">Indicators</a>
            <a href="#workflow" className="hover:text-white transition-colors">Methodology</a>
            <a href="#session" className="hover:text-white transition-colors">3-Day Session</a>
            <a href="#signin" className="hover:text-white transition-colors">Client Portal</a>
          </div>

          <div className="text-text-dim text-[10px] text-center md:text-right">
            © 2026 AlgoFinex. Educational market structure analysis. Not financial advice.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
