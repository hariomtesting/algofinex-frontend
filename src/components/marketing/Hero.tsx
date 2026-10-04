import React from 'react';
import { ShinyText } from '../ui/ShinyText';
import { SpotlightCard } from '../ui/SpotlightCard';
import { HeroProductTerminal } from './HeroProductTerminal';
import { TelemetryBar } from './TelemetryBar';
import { 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Calendar,
  BarChart3
} from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToTerminal = () => {
    const el = document.getElementById('product-terminal-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 md:pb-28 overflow-hidden bg-tech-grid">
      
      {/* Ambient Radial Environment Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-radial-subtle opacity-70" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col items-center text-center w-full min-w-0">
        
        {/* Announcement Pill Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-surface-elevated/90 border border-white/[0.12] text-xs font-medium text-text-secondary shadow-panel hover:border-white/[0.22] transition-colors mb-6 group cursor-pointer max-w-[95%] sm:max-w-none">
          <span className="flex size-2 rounded-full bg-brand-blue animate-pulse shrink-0" />
          <span className="font-mono text-text-primary text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold shrink-0">
            AlgoFinex Indicator Suite v4.2
          </span>
          <span className="text-border-medium shrink-0">|</span>
          <ShinyText className="text-brand-accent font-medium text-[11px] sm:text-xs truncate">
            Next 3-Day Session Enrolling
          </ShinyText>
          <ChevronRight className="size-3.5 text-text-muted group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>

        {/* Hero Title - Distinctive, grounded, clear */}
        <h1 className="max-w-5xl text-[32px] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[74px] font-display font-extrabold tracking-tighter text-white leading-[1.1] mb-5 sm:mb-6">
          Cut through chart noise.{' '}
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-white via-text-primary to-text-muted bg-clip-text text-transparent">
            Trade with structural clarity.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-text-secondary font-normal leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
          AlgoFinex indicators map market structure, trend context, and liquidity zones directly on your charts — paired with our 3-Day Session to refine your trading workflow.
        </p>

        {/* Primary Call to Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-14">
          <a
            href="#session"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-200 shadow-glow-blue hover:shadow-xl active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <span>Join 3-Day Session</span>
            <ChevronRight className="size-4 text-white/80 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={scrollToTerminal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-medium text-text-primary bg-surface-elevated hover:bg-surface-card border border-white/[0.1] hover:border-white/[0.2] transition-all duration-200 active:scale-[0.99]"
          >
            <BarChart3 className="size-4 text-brand-accent" />
            <span>Explore Indicator Suite</span>
          </button>
        </div>

        {/* Product Value Cards (Focused on actual indicator tools and workflow) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl w-full mb-12 sm:mb-16 text-left">
          <SpotlightCard className="p-3.5 bg-surface/40 border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue shrink-0">
                <ShieldCheck className="size-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Non-Repainting Logic</div>
                <div className="text-[11px] text-text-muted">Strict bar-close validation</div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-3.5 bg-surface/40 border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Calendar className="size-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">3-Day Session</div>
                <div className="text-[11px] text-text-muted">Hands-on workflow guidance</div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-3.5 bg-surface/40 border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Layers className="size-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Multi-Timeframe Context</div>
                <div className="text-[11px] text-text-muted">Macro to entry alignment</div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-3.5 bg-surface/40 border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                <Compass className="size-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Structure &amp; Liquidity</div>
                <div className="text-[11px] text-text-muted">Dynamic zones &amp; invalidation</div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Live Telemetry Ticker Strip */}
        <div className="w-full mb-8 sm:mb-10">
          <TelemetryBar />
        </div>

        {/* Centerpiece Product Terminal Display */}
        <div id="product-terminal-container" className="w-full relative scroll-mt-24">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-left">
            <div>
              <span className="text-[11px] sm:text-xs font-mono text-brand-accent uppercase tracking-wider font-semibold">
                Live Interactive Demonstration
              </span>
              <h2 className="text-lg sm:text-2xl font-display font-bold text-white tracking-tight">
                What AlgoFinex Helps You See
              </h2>
            </div>
            <div className="text-[11px] sm:text-xs font-mono text-text-muted">
              Select modes to inspect trend context, liquidity sweeps, and market structure
            </div>
          </div>

          <HeroProductTerminal />
        </div>

      </div>
    </section>
  );
};

export default Hero;
