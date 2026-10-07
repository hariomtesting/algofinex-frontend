import React from 'react';
import { motion } from 'framer-motion';
import { HeroProductTerminal } from './HeroProductTerminal';
import { ChevronRight, BarChart3 } from 'lucide-react';
import { Squares } from '../ui/Squares';
import { DecryptedText } from '../ui/DecryptedText';
import { ShinyText } from '../ui/ShinyText';
import { CountUp } from '../ui/CountUp';

export const Hero: React.FC = () => {
  const scrollToWorkstation = () => {
    const el = document.getElementById('product-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="AlgoFinex Platform Introduction"
      className="relative pt-20 sm:pt-24 lg:pt-24 xl:pt-28 pb-10 sm:pb-14 lg:pb-16 overflow-hidden bg-[#05080E] border-b border-white/[0.08]"
    >
      {/* Editorial Ambient Atmospheric Lighting & Living Reactive Squares Grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Living interactive drifting grid from React Bits */}
        <div className="absolute inset-0 opacity-40">
          <Squares
            direction="diagonal"
            speed={0.35}
            squareSize={46}
            borderColor="rgba(255, 255, 255, 0.04)"
            hoverFillColor="rgba(0, 240, 144, 0.12)"
          />
        </div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-[130px] opacity-75" />
        <div className="absolute top-1/4 -left-28 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] opacity-40" />
        <div className="absolute top-1/4 -right-28 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] opacity-40" />
        <div className="absolute top-1/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Responsive Grid: Left Typography vs Right Visual Protagonist Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Headline, Rationale & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center text-left z-20"
          >
            {/* Eyebrow Tag with DecryptedText and ShinyText */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-3 sm:mb-4 w-fit shadow-xs backdrop-blur-md hover:border-emerald-500/40 transition-colors"
            >
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_#00F090]" />
              <DecryptedText
                text="ALGOFINEX • QUANT SUITE"
                animateOnHover={true}
                speed={35}
                className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px] text-slate-300"
              />
              <span className="text-white/20 shrink-0">•</span>
              <ShinyText
                className="text-emerald-400 text-[11px] font-semibold truncate"
                shimmerColor="rgba(0, 240, 144, 0.9)"
              >
                30 Days Risk Free
              </ShinyText>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-display font-extrabold tracking-[-0.035em] text-white leading-[1.08] select-none"
            >
              Cut through chart noise.<br />
              <span className="text-slate-400 font-bold">Trade with</span>{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                structural clarity.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16 }}
              className="mt-3.5 sm:mt-4 text-xs sm:text-sm lg:text-[15px] text-slate-400 font-normal leading-relaxed max-w-lg"
            >
              Institutional-grade algorithmic indicators mapping market structure, smart money footprints, non-repainting signals, and liquidity zones — paired with our intensive 3-Day Live Execution Masterclass.
            </motion.p>

            {/* Product Deliverable Badges */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="mt-3 text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 flex-wrap"
            >
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 font-medium tracking-wide">
                TRADINGVIEW PINE SCRIPT v5 &middot; 3-DAY MASTERCLASS &middot; VELA READY
              </span>
            </motion.div>

            {/* CTA Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 }}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"
            >
              <a
                href="#pricing"
                className="group relative inline-flex items-center justify-center gap-2 px-6 min-h-[44px] sm:min-h-[46px] rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-[0_0_25px_rgba(0,240,144,0.35)] hover:shadow-[0_0_35px_rgba(0,240,144,0.55)] active:scale-[0.99] w-full sm:w-auto text-center"
              >
                <span>Get 30 Days Risk Free</span>
                <ChevronRight className="size-4 text-slate-950 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={scrollToWorkstation}
                className="inline-flex items-center justify-center gap-2 px-5 min-h-[44px] sm:min-h-[46px] rounded-xl text-sm sm:text-base font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-xs transition-all duration-200 active:scale-[0.99] w-full sm:w-auto cursor-pointer backdrop-blur-sm"
              >
                <BarChart3 className="size-4 text-emerald-400" />
                <span>Explore Indicators</span>
              </button>
            </motion.div>

            {/* Trust Metrics Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center gap-5 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">★★★★★</span>
                <span className="text-white font-semibold">
                  <CountUp to={4.9} decimals={1} duration={0.8} />/5
                </span>
                <span className="text-slate-500">
                  (<CountUp to={1400} suffix="+" duration={1.2} /> traders)
                </span>
              </div>
              <span className="text-white/15">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Non-Repainting Bar-Close</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Protagonist Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
            className="lg:col-span-7 relative z-10 w-full min-w-0"
          >
            {/* Centerpiece Trading Terminal Protagonist with Ambient Aura */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition duration-500" />
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
