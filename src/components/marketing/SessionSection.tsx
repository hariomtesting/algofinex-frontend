import React from 'react';
import { SESSION_PILLARS } from '../../data/productExperienceData';
import { 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

export const SessionSection: React.FC = () => {
  return (
    <section id="session" className="relative py-24 sm:py-36 overflow-hidden bg-canvas/95 border-t border-white/[0.08]">
      
      {/* Ambient Visual Environment (1% Club Inspired Depth & Atmosphere) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-brand-blue/10 via-emerald-500/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 w-full min-w-0">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-elevated border border-white/[0.12] text-xs font-mono text-brand-accent mb-4">
            <Calendar className="size-3.5 text-brand-accent shrink-0" />
            <span>THE 3-DAY SESSION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1] mb-5">
            Go beyond the indicator.<br />
            <span className="bg-gradient-to-r from-brand-accent via-white to-text-secondary bg-clip-text text-transparent">
              Master the workflow.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Most traders fail not because their chart indicators are flawed, but because they lack a disciplined workflow to interpret them under live market pressure. The 3-Day Session bridges the gap between chart analysis and consistent execution.
          </p>
        </div>

        {/* Three Core Experience Pillars (Structured around skills, NOT fabricated day-by-day curriculum) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 sm:mb-20 w-full min-w-0">
          {SESSION_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/[0.08] bg-surface/50 backdrop-blur-xl flex flex-col justify-between gap-6 hover:border-brand-blue/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-brand-accent px-2.5 py-1 rounded bg-brand-blue/15 border border-brand-blue/30">
                    PILLAR {pillar.number}
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    Core Capability
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-brand-accent transition-colors mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Focus Items List */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-2">
                    Key Practical Focus:
                  </span>
                  {pillar.focusItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-text-primary leading-normal">
                      <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillar Outcome Tag */}
              <div className="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.04] text-xs font-mono">
                <span className="text-[10px] text-text-dim uppercase block">Practical Outcome:</span>
                <span className="text-white font-medium text-[11px] mt-0.5 block">{pillar.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Centerpiece Enrollment & Workflow Transformation Module */}
        <div className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-gradient-to-b from-surface-elevated/90 to-surface/80 backdrop-blur-2xl shadow-terminal p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-w-0">
          
          {/* Left Side: Session Value & Enrollment Action (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal-bull/15 border border-signal-bull/30 text-xs font-mono text-signal-bull mb-3">
                <span className="size-2 rounded-full bg-signal-bull animate-pulse" />
                <span>Next 3-Day Session: Enrolling</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Refine your market vision with live mentorship.
              </h3>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
                Join a small cohort of disciplined traders. You will receive complete access to the AlgoFinex indicator suite, learn the exact multi-timeframe rules, and test your understanding in interactive sessions.
              </p>
            </div>

            {/* Included Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-text-primary">
                <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                <span>Full AlgoFinex Indicator Suite Access</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-primary">
                <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                <span>Live Interactive Chart Audits</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-primary">
                <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                <span>Documented Execution Checklist</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-primary">
                <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                <span>Direct Q&amp;A with Session Mentors</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <a
                href="#enroll"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-200 shadow-glow-blue hover:shadow-xl active:scale-[0.99]"
              >
                <span>Join the 3-Day Session</span>
                <ChevronRight className="size-4" />
              </a>

              <a
                href="#indicators"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-text-secondary hover:text-white bg-surface-card hover:bg-surface-elevated border border-white/[0.08] transition-colors"
              >
                <BookOpen className="size-4 text-brand-accent" />
                <span>Explore Indicator Suite</span>
              </a>
            </div>
          </div>

          {/* Right Side: Sculptural Workflow Card (5 cols on lg) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-canvas/80 border border-white/[0.08] font-mono text-xs flex flex-col gap-4 shadow-panel">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-[11px] text-text-muted uppercase">Trader Workflow Routine</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                SYSTEMATIC
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-text-muted">Step 1: Bias Mapping</div>
                  <div className="text-white font-semibold mt-0.5">4H / 1H Multi-Timeframe Alignment</div>
                </div>
                <span className="text-signal-bull text-[11px] font-bold">✓ Intact</span>
              </div>

              <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-text-muted">Step 2: Liquidity Check</div>
                  <div className="text-white font-semibold mt-0.5">Order Block Swept &amp; Defended</div>
                </div>
                <span className="text-brand-accent text-[11px] font-bold">✓ Confirmed</span>
              </div>

              <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-text-muted">Step 3: Bar-Close Signal</div>
                  <div className="text-white font-semibold mt-0.5">Strict Non-Repainting Trigger</div>
                </div>
                <span className="text-signal-bull text-[11px] font-bold">✓ Locked</span>
              </div>

              <div className="p-3 rounded-xl bg-surface/70 border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-text-muted">Step 4: Risk Boundaries</div>
                  <div className="text-white font-semibold mt-0.5">Pre-Calculated Invalidation Stop</div>
                </div>
                <span className="text-text-primary text-[11px] font-bold">Defined</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-text-dim text-center">
              The exact daily routine practiced in the 3-Day Session.
            </div>
          </div>

        </div>

        {/* Restrained & Honest Disclaimer */}
        <div className="mt-12 text-center text-text-dim text-[11px] font-mono max-w-3xl mx-auto leading-relaxed">
          AlgoFinex indicator suites and the 3-Day Session provide educational market structure analysis and workflow frameworks. Trading financial assets involves substantial risk of loss. Past performance is never indicative of future trading results.
        </div>

      </div>
    </section>
  );
};

export default SessionSection;
