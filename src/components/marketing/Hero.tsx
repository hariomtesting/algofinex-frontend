import React from 'react';
import { HeroProductTerminal } from './HeroProductTerminal';
import { 
  ChevronRight, 
  BarChart3,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToWorkstation = () => {
    const el = document.getElementById('product-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 overflow-hidden bg-[#F8F8F6] border-b border-black/[0.06]">
      
      {/* Editorial Ambient Atmospheric Lighting (Warm off-white with delicate directional locus) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[140px] opacity-40" />
        {/* Subtle architectural hairline horizon */}
        <div className="absolute top-1/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Poster Grid: Left Editorial Typography vs Right Visual Protagonist Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
          
          {/* Left Column: Asymmetric Editorial Typography & Precision Controls */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left z-20 pt-2 lg:pt-6">
            
            {/* Editorial Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-6 w-fit shadow-xs">
              <span className="size-2 rounded-full bg-brand-blue animate-pulse shrink-0" />
              <span className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px] text-slate-600">
                ALGOFINEX • ANALYTICAL SUITE
              </span>
              <span className="text-slate-300 shrink-0">•</span>
              <span className="text-brand-blue text-[11px] font-semibold truncate">
                October Cohort Open
              </span>
            </div>

            {/* Massive Display Headline with Tight Leading & Intentional Linebreaks */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[76px] font-display font-extrabold tracking-[-0.038em] text-slate-900 leading-[1.03] select-none">
              Cut through<br />
              chart noise.<br />
              <span className="text-slate-400 font-bold">Trade with</span><br />
              <span className="text-brand-blue">
                structural clarity.
              </span>
            </h1>

            {/* Secondary Supporting Copy - Compact, Restrained, High-Contrast */}
            <p className="mt-7 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-lg">
              AlgoFinex indicator suites map market structure, liquidity voids, and trend context directly onto your charts — paired with our 3-Day Session to refine your execution routine.
            </p>

            {/* Restrained CTA Cluster */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#session"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-brand-blue hover:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <span>Join 3-Day Session</span>
                <ChevronRight className="size-4 text-white/80 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={scrollToWorkstation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-slate-800 bg-white hover:bg-slate-50 border border-black/[0.08] hover:border-black/[0.16] shadow-xs transition-all duration-200 active:scale-[0.99]"
              >
                <BarChart3 className="size-4 text-brand-blue" />
                <span>Inspect Workstation</span>
              </button>
            </div>

            {/* Micro Technical Telemetry Strip */}
            <div className="mt-10 pt-6 border-t border-black/[0.07] flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-signal-bull animate-ping" />
                <span className="text-slate-900 font-semibold">BTC/USDT 68,220.50</span>
              </div>
              <span className="text-slate-300">•</span>
              <span>Order Flow: <strong className="text-signal-bull font-medium">Bullish</strong></span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="hidden sm:inline">Logic: <strong className="text-slate-800 font-medium">Bar-Close Only</strong></span>
            </div>

            {/* Subtle Operational Badge */}
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <ShieldCheck className="size-3.5 text-brand-blue shrink-0" />
              <span>Non-repainting algorithmic geometry • Multi-timeframe synchronized</span>
            </div>

          </div>

          {/* Right Column: Visual Protagonist Terminal */}
          <div className="lg:col-span-7 relative z-10 w-full min-w-0 lg:-mr-4 xl:-mr-10 2xl:-mr-16">
            
            {/* Top Indicator Header Strip */}
            <div className="mb-3 flex items-center justify-between text-xs font-mono text-slate-500 px-2">
              <div className="flex items-center gap-2">
                <Sliders className="size-3.5 text-brand-blue" />
                <span className="text-slate-900 font-semibold">Interactive Workstation Preview</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:inline">
                Select analytical mode to inspect chart overlays
              </div>
            </div>

            {/* Centerpiece Trading Terminal Protagonist */}
            <div className="relative group">
              <div className="relative">
                <HeroProductTerminal />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;

