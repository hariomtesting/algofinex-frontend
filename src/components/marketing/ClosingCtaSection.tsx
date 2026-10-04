import React from 'react';
import { ChevronRight, BarChart3, ShieldCheck, Compass } from 'lucide-react';

/**
 * SECTION 09 — FINAL CTA (CLOSING SCENE)
 * A powerful editorial closing scene completing the visual story.
 * Headline: "Read the market differently."
 * Featuring the brand glyph and a crisp product fragment.
 */
export const ClosingCtaSection: React.FC = () => {
  const scrollToIndicators = () => {
    const el = document.getElementById('product-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 sm:py-36 lg:py-48 bg-[#F8F8F6] border-t border-black/[0.06] overflow-hidden text-center">
      
      {/* Directional Atmospheric Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[170px] opacity-70" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Proprietary Brand Glyph Display */}
        <div className="flex justify-center mb-8">
          <div className="size-16 rounded-2xl bg-brand-blue flex items-center justify-center shadow-md">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              {/* Intersecting technical coordinates */}
              <line x1="3" y1="20" x2="21" y2="20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
              <line x1="4" y1="20" x2="4" y2="4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.4" />
              {/* Upward 45-degree structural ray */}
              <path d="M4 17L11 10L15 14L20 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="6" r="2.2" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-6 shadow-xs">
          <Compass className="size-3.5 text-brand-blue shrink-0" />
          <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">
            THE CONCLUSION OF CHART CHAOS
          </span>
        </div>

        {/* Monumental Editorial Statement */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-display font-extrabold tracking-[-0.04em] text-slate-900 leading-[1.02] max-w-4xl mx-auto">
          Read the market<br />
          <span className="text-brand-blue">differently.</span>
        </h2>

        {/* Supporting Editorial Thought */}
        <p className="mt-8 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Step away from subjective guessing, indicator overlap, and emotional chart chasing. Experience how disciplined market structure, multi-timeframe context, and an iron 7-step routine transform your trading.
        </p>

        {/* Dual Action Cluster */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-brand-blue hover:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99]"
          >
            <span>Join the 3-Day Session</span>
            <ChevronRight className="size-4" />
          </a>

          <button
            onClick={scrollToIndicators}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-medium text-slate-800 bg-white hover:bg-slate-50 border border-black/[0.1] hover:border-black/[0.18] shadow-xs transition-all duration-200 active:scale-[0.99]"
          >
            <BarChart3 className="size-4 text-brand-blue" />
            <span>Explore the Indicators</span>
          </button>
        </div>

        {/* Closing Product Architectural Fragment */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-8 shadow-workstation text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/[0.06] mb-5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-signal-bull" />
              <span className="font-semibold text-slate-800">Final Verification Frame</span>
              <span className="text-slate-400">• BTC/USDT 15M</span>
            </div>
            <span className="text-brand-blue font-semibold">
              Confluence Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 border border-black/[0.05]">
              <span className="text-[10px] text-slate-400 block mb-1">Pivots</span>
              <span className="text-slate-800 font-bold">HH 67,400 • HL 66,100</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-black/[0.05]">
              <span className="text-[10px] text-slate-400 block mb-1">Execution Trigger</span>
              <span className="text-signal-bull font-bold">▲ $67,420 (Bar Close)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-black/[0.05]">
              <span className="text-[10px] text-slate-400 block mb-1">Hard Invalidation</span>
              <span className="text-red-700 font-bold">Stop: $66,180.00</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-brand-blue" />
              <span>Non-repainting algorithmic architecture</span>
            </div>
            <span>TradingView Pine Script v5</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClosingCtaSection;
