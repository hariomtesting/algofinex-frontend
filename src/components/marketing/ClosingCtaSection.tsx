import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BarChart3, Compass, ShieldCheck } from 'lucide-react';
import { Squares } from '../ui/Squares';
import { DecryptedText } from '../ui/DecryptedText';

/**
 * SECTION 09 — FINAL CTA (CLOSING SCENE)
 * Redesigned in LuxAlgo Obsidian Dark aesthetic with neon atmospheric glows.
 * Headline: "Read the market differently."
 */
export const ClosingCtaSection: React.FC = () => {
  const scrollToIndicators = () => {
    const el = document.getElementById('product-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#05080E] border-t border-white/10 overflow-hidden text-center">
      
      {/* Directional Atmospheric Glow & Living Squares Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Squares
            direction="up"
            speed={0.4}
            squareSize={50}
            borderColor="rgba(255, 255, 255, 0.04)"
            hoverFillColor="rgba(0, 229, 255, 0.12)"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-emerald-500/10 rounded-full blur-[200px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Proprietary Brand Glyph Display with Concentric Technical Reticle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="relative flex justify-center mb-10"
        >
          <div className="relative flex items-center justify-center">
            {/* Concentric hairline rings */}
            <div className="absolute size-36 rounded-full border border-emerald-500/20 animate-pulse" />
            <div className="absolute size-26 rounded-full border border-cyan-500/20" />
            
            <div className="relative size-16 rounded-2xl bg-gradient-to-tr from-[#00F090] to-[#00E5FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,240,144,0.4)]">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                {/* Intersecting technical coordinates */}
                <line x1="3" y1="20" x2="21" y2="20" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
                <line x1="4" y1="20" x2="4" y2="4" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
                {/* Upward 45-degree structural ray */}
                <path d="M4 17L11 10L15 14L20 6" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="6" r="2.2" fill="#000000" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-6 backdrop-blur-md">
          <Compass className="size-3.5 text-[#00F090] shrink-0" />
          <DecryptedText
            text="THE CONCLUSION OF CHART CHAOS"
            animateOnHover={true}
            speed={40}
            className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-300"
          />
        </div>

        {/* Monumental Editorial Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-display font-extrabold tracking-[-0.04em] text-white leading-[1.02] max-w-4xl mx-auto"
        >
          Read the market<br />
          <span className="bg-gradient-to-r from-[#00F090] via-teal-300 to-[#00E5FF] bg-clip-text text-transparent">
            differently.
          </span>
        </motion.h2>

        {/* Supporting Editorial Thought */}
        <p className="mt-8 text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Step away from subjective guessing, indicator overlap, and emotional chart chasing. Experience how disciplined market structure, multi-timeframe context, and an iron 7-step routine transform your trading.
        </p>

        {/* Dual Action Cluster with 48px Touch Targets */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto w-full">
          <a
            href="#pricing"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-black bg-gradient-to-r from-[#00F090] to-[#00E5FF] hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(0,240,144,0.3)] hover:shadow-[0_0_35px_rgba(0,240,144,0.5)] active:scale-[0.99] cursor-pointer"
          >
            <span>Join the 3-Day Session</span>
            <ChevronRight className="size-4" />
          </a>

          <button
            onClick={scrollToIndicators}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-medium text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-xs transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <BarChart3 className="size-4 text-[#00E5FF]" />
            <span>Explore the Indicators</span>
          </button>
        </div>

        {/* Closing Product Architectural Fragment */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#0A0E1A]/90 p-6 sm:p-8 shadow-2xl text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#00F090] shadow-[0_0_6px_#00F090]" />
              <span className="font-semibold text-white">Final Verification Frame</span>
              <span className="text-slate-400">• BTC/USDT 15M</span>
            </div>
            <span className="text-[#00F090] font-semibold">
              Confluence Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#060A12] border border-white/5">
              <span className="text-[10px] text-slate-400 block mb-1">Pivots</span>
              <span className="text-[#00E5FF] font-bold">HH 67,400 • HL 66,100</span>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-white/5">
              <span className="text-[10px] text-slate-400 block mb-1">Execution Trigger</span>
              <span className="text-[#00F090] font-bold">▲ $67,420 (Bar Close)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-white/5">
              <span className="text-[10px] text-slate-400 block mb-1">Hard Invalidation</span>
              <span className="text-[#FF3B69] font-bold">Stop: $66,180.00</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#00F090]" />
              <span>Non-repainting algorithmic architecture</span>
            </div>
            <span className="text-cyan-400">TradingView Pine Script v5</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClosingCtaSection;
