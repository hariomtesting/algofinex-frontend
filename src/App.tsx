import React, { useState } from 'react';
import { Navbar } from './components/marketing/Navbar';
import { Hero } from './components/marketing/Hero';
import { ProductRevealSection } from './components/marketing/ProductRevealSection';
import { MarketUnderstandingSection } from './components/marketing/MarketUnderstandingSection';
import { IndicatorSystemSection } from './components/marketing/IndicatorSystemSection';
import { SceneTransitionBridge } from './components/marketing/SceneTransitionBridge';
import { PrinciplesSection } from './components/marketing/PrinciplesSection';
import { SessionSection } from './components/marketing/SessionSection';
import { PrototypePricingSection } from './components/marketing/PrototypePricingSection';
import { FaqSection } from './components/marketing/FaqSection';
import { ClosingCtaSection } from './components/marketing/ClosingCtaSection';
import { ClientPortalModal } from './components/marketing/ClientPortalModal';

/**
 * ALGOFINEX — PHASE 3
 * COMPLETE PRODUCT EXPERIENCE & FRONTEND PROTOTYPE
 * 
 * Sequential Architecture:
 * INTRODUCTION  (Section 01 — Hero)
 * ↓
 * PRODUCT       (Section 02 — Product Experience: 5 Progressive Layers)
 * ↓
 * UNDERSTANDING (Section 03 — What AlgoFinex Actually Does: Read → Context → Plan)
 * ↓
 * METHOD        (Section 04 — Method: Structure, Liquidity, Trend, Confirmation)
 * ↓
 * PRINCIPLES    (Section 05 — Why AlgoFinex: Clarity, Context, Discipline, Consistency)
 * ↓
 * WORKFLOW      (Workflow Bridge: 7-Stage Continuous Execution Conduit)
 * ↓
 * EXPERIENCE    (Section 06 — 3-Day Session: Day 01 Arrival → Day 02 Observation → Day 03 Application)
 * ↓
 * OFFER         (Section 07 — Prototype Pricing: Suite, Cohort, All-Access)
 * ↓
 * CLARITY       (Section 08 — FAQ: 6 Core Answers)
 * ↓
 * CLOSING       (Section 09 — Final CTA: "Read the market differently.")
 */
export const App: React.FC = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-brand-blue/20 selection:text-slate-900 flex flex-col justify-between">
      {/* Top Persistent Navigation */}
      <Navbar onOpenPortal={() => setIsPortalOpen(true)} />

      {/* Main Sequential Experience Flow */}
      <main className="flex-1 w-full min-w-0">
        
        {/* SECTION 01 — INTRODUCTION (Hero Workstation & Editorial Thesis) */}
        <Hero />

        {/* SECTION 02 — PRODUCT (5-Stage Progressive Revelation Workstation) */}
        <ProductRevealSection />

        {/* SECTION 03 — UNDERSTANDING (Read the Market → Build Context → Make a Plan) */}
        <MarketUnderstandingSection />

        {/* SECTION 04 — METHOD (4 Coordinated Analytical Strata Spatial Diagram) */}
        <IndicatorSystemSection />

        {/* SECTION 05 — WHY ALGOFINEX (Clarity, Context, Discipline, Consistency) */}
        <PrinciplesSection />

        {/* CONTINUOUS WORKFLOW CONDUIT (7-Stage Execution Pipeline) */}
        <SceneTransitionBridge />

        {/* SECTION 06 — EXPERIENCE (3-Day Session Timeline & 7-Step Routine Object) */}
        <SessionSection />

        {/* SECTION 07 — OFFER (Prototype Pricing & Enrollment UX Validation) */}
        <PrototypePricingSection />

        {/* SECTION 08 — CLARITY (Editorial FAQ Accordion) */}
        <FaqSection />

        {/* SECTION 09 — CLOSING (Final Editorial CTA Scene) */}
        <ClosingCtaSection />

      </main>

      {/* Persistent Landing Footer */}
      <footer className="border-t border-black/[0.06] bg-[#F1F3F5] py-12 px-5 sm:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg bg-brand-blue flex items-center justify-center shadow-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <line x1="3" y1="20" x2="21" y2="20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
                  <line x1="4" y1="20" x2="4" y2="4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
                  <path d="M4 17L11 10L15 14L20 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="20" cy="6" r="2.2" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="font-display font-bold text-slate-900 tracking-[-0.03em] text-sm">
                Algo<span className="text-slate-600 font-medium">Finex</span>.
              </span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="text-slate-500 text-[11px]">
              Multi-Layered Market Structure &amp; 7-Step Trading Workflow
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <a href="#product-experience" className="text-slate-600 hover:text-slate-900 transition-colors">Indicators</a>
            <a href="#methodology" className="text-slate-600 hover:text-slate-900 transition-colors">Methodology</a>
            <a href="#session" className="text-slate-600 hover:text-slate-900 transition-colors">3-Day Session</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            <button 
              onClick={() => setIsPortalOpen(true)} 
              className="text-brand-blue font-semibold hover:text-blue-800 transition-colors cursor-pointer"
            >
              Client Portal
            </button>
          </div>

          <div className="text-slate-400 text-[10px] text-center md:text-right">
            © 2026 AlgoFinex. Educational market structure analysis. Not financial advice.
          </div>
        </div>
      </footer>

      {/* Prototype Client Portal Modal */}
      <ClientPortalModal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
      />
    </div>
  );
};

export default App;
