import React from 'react';
import { ShinyText } from '../ui/ShinyText';
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
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 overflow-hidden bg-[#05070B] border-b border-white/[0.06]">
      
      {/* Editorial Ambient Atmospheric Lighting (Deep black/slate with subtle directional blue locus) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[900px] h-[700px] bg-brand-blue/8 rounded-full blur-[160px] opacity-70" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] opacity-40" />
        {/* Subtle architectural hairline horizon */}
        <div className="absolute top-1/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Poster Grid: Left Editorial Typography vs Right Visual Protagonist Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-start">
          
          {/* Left Column: Asymmetric Editorial Typography & Precision Controls (lg: 5 cols, xl: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left z-20 pt-2 lg:pt-6">
            
            {/* Editorial Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-6 w-fit shadow-panel">
              <span className="size-2 rounded-full bg-brand-blue animate-pulse shrink-0" />
              <span className="tracking-widest uppercase font-semibold text-[10px] sm:text-[11px]">
                ALGOFINEX // ANALYTICAL SUITE
              </span>
              <span className="text-border-medium shrink-0">•</span>
              <ShinyText className="text-white text-[11px] font-medium truncate">
                3-Day Session Open
              </ShinyText>
            </div>

            {/* Massive Display Headline with Tight Leading & Intentional Linebreaks */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[68px] xl:text-[78px] font-display font-extrabold tracking-[-0.038em] text-white leading-[1.03] select-none">
              Cut through<br />
              chart noise.<br />
              <span className="text-text-muted font-bold">Trade with</span><br />
              <span className="bg-gradient-to-r from-white via-text-primary to-brand-accent bg-clip-text text-transparent">
                structural clarity.
              </span>
            </h1>

            {/* Secondary Supporting Copy - Compact, Restrained, High-Contrast */}
            <p className="mt-7 text-sm sm:text-base lg:text-lg text-text-secondary font-normal leading-relaxed max-w-lg">
              AlgoFinex indicator suites map market structure, liquidity voids, and trend context directly onto your charts — paired with our 3-Day Session to refine your execution routine.
            </p>

            {/* Restrained CTA Cluster */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#session"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-200 shadow-glow-blue hover:shadow-xl active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <span>Join 3-Day Session</span>
                <ChevronRight className="size-4 text-white/80 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={scrollToWorkstation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-text-primary bg-surface-elevated/80 hover:bg-surface-elevated border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 active:scale-[0.99]"
              >
                <BarChart3 className="size-4 text-brand-accent" />
                <span>Inspect Workstation</span>
              </button>
            </div>

            {/* Micro Technical Telemetry Strip */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-signal-bull animate-ping" />
                <span className="text-white font-semibold">BTC/USDT 68,220.50</span>
              </div>
              <span className="text-border-medium">•</span>
              <span>Order Flow: <strong className="text-signal-bull font-medium">Bullish</strong></span>
              <span className="text-border-medium hidden sm:inline">•</span>
              <span className="hidden sm:inline">Logic: <strong className="text-text-primary font-medium">Bar-Close Only</strong></span>
            </div>

            {/* Subtle Operational Badge */}
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-text-dim">
              <ShieldCheck className="size-3.5 text-brand-blue shrink-0" />
              <span>Non-repainting algorithmic geometry • Multi-timeframe synchronized</span>
            </div>

          </div>

          {/* Right Column: Visual Protagonist Terminal (lg: 7 cols, xl: 7 cols) */}
          <div className="lg:col-span-7 relative z-10 w-full min-w-0 lg:-mr-4 xl:-mr-10 2xl:-mr-16">
            
            {/* Top Indicator Header Strip */}
            <div className="mb-3 flex items-center justify-between text-xs font-mono text-text-muted px-2">
              <div className="flex items-center gap-2">
                <Sliders className="size-3.5 text-brand-accent" />
                <span className="text-white font-semibold">LIVE INTERACTIVE WORKSTATION</span>
              </div>
              <div className="text-[11px] text-text-dim hidden sm:inline">
                Select analytical mode to inspect chart overlays
              </div>
            </div>

            {/* Centerpiece Trading Terminal Protagonist */}
            <div className="relative group">
              {/* Subtle ambient back-glow behind protagonist */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/15 to-emerald-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none" />
              
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
