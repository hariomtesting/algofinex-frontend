import React from 'react';
import { motion } from 'framer-motion';
import { HeroProductTerminal } from './HeroProductTerminal';
import { 
  ChevronRight, 
  BarChart3 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToWorkstation = () => {
    const el = document.getElementById('product-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 overflow-hidden bg-[#05080E] border-b border-white/[0.08]">
      
      {/* Editorial Ambient Atmospheric Lighting (LuxAlgo Neon Emerald & Cyan Glows) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-[140px] opacity-75" />
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] opacity-40" />
        
        {/* Subtle architectural hairline horizon & tech grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
        <div className="absolute top-1/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Poster Grid: Left Editorial Typography vs Right Visual Protagonist Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
          
          {/* Left Column: Editorial Typography & Precision Controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-start text-left z-20 pt-2 lg:pt-4"
          >
            
            {/* Editorial Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-6 w-fit shadow-xs backdrop-blur-md"
            >
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_#00F090]" />
              <span className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px] text-slate-300">
                ALGOFINEX • NEXT-GEN SUITE
              </span>
              <span className="text-white/20 shrink-0">•</span>
              <span className="text-emerald-400 text-[11px] font-semibold truncate">
                30 Days Risk Free
              </span>
            </motion.div>

            {/* Massive Display Headline with Tight Leading & Intentional Linebreaks */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[66px] xl:text-[74px] font-display font-extrabold tracking-[-0.038em] text-white leading-[1.04] select-none"
            >
              Cut through<br />
              chart noise.<br />
              <span className="text-slate-400 font-bold">Trade with</span><br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                structural clarity.
              </span>
            </motion.h1>

            {/* Secondary Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.18 }}
              className="mt-6 text-sm sm:text-base lg:text-lg text-slate-400 font-normal leading-relaxed max-w-lg"
            >
              State-of-the-art algorithmic indicators mapping market structure, smart money footprints, non-repainting signals, and liquidity zones — paired with our intensive 3-Day Live Execution Masterclass.
            </motion.p>

            {/* Product Deliverable Badges */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22 }}
              className="mt-4 text-[11px] font-mono flex items-center gap-2 flex-wrap"
            >
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 font-medium tracking-wide">
                TRADINGVIEW SUITE &middot; 3-DAY LIVE SESSION &middot; VELA READY
              </span>
            </motion.div>

            {/* CTA Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.26 }}
              className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full"
            >
              <a
                href="#pricing"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 min-h-[48px] rounded-xl text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-[0_0_25px_rgba(0,240,144,0.35)] hover:shadow-[0_0_35px_rgba(0,240,144,0.55)] active:scale-[0.99] w-full sm:w-auto"
              >
                <span>Get 30 Days Risk Free</span>
                <ChevronRight className="size-4 text-slate-950 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={scrollToWorkstation}
                className="inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl text-base font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-xs transition-all duration-200 active:scale-[0.99] w-full sm:w-auto cursor-pointer backdrop-blur-sm"
              >
                <BarChart3 className="size-4 text-emerald-400" />
                <span>Explore Indicators</span>
              </button>
            </motion.div>

            {/* Trust Metrics Pill (LuxAlgo Style) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">★★★★★</span>
                <span className="text-white font-semibold">4.9/5</span>
                <span className="text-slate-500">(1,400+ reviews)</span>
              </div>
              <span className="text-white/15">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Non-Repainting Signals</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Visual Protagonist Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease: 'easeOut' }}
            className="lg:col-span-7 relative z-10 w-full min-w-0"
          >
            
            {/* Centerpiece Trading Terminal Protagonist with Ambient Neon Aura */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition duration-500" />
              <div className="relative">
                <HeroProductTerminal />
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;

