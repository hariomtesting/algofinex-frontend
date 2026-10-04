import React, { useState } from 'react';
import { SESSION_PILLARS, TRADING_ROUTINE_STEPS } from '../../data/productExperienceData';
import { 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Compass,
  Check
} from 'lucide-react';

export const SessionSection: React.FC = () => {
  const [activeRoutineIndex, setActiveRoutineIndex] = useState(4); // Default to Invalidation step

  const currentRoutine = TRADING_ROUTINE_STEPS[activeRoutineIndex];

  return (
    <section id="session" className="relative py-28 sm:py-36 overflow-hidden bg-[#06080D] border-t border-white/[0.08]">
      
      {/* Subtle Visual Environment - Editorial Surface */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-brand-blue/8 via-emerald-500/5 to-transparent rounded-full blur-[160px] opacity-70" />
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
              Master the execution routine.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Most traders fail not because their chart indicators are flawed, but because they lack a disciplined workflow to interpret them under live market pressure. The 3-Day Session bridges the gap between chart analysis and consistent execution.
          </p>
        </div>

        {/* Centerpiece Visual: The 7-Step Trading Workflow Protocol */}
        <div className="mb-16 sm:mb-24 rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#090C14] shadow-terminal p-6 sm:p-10 lg:p-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
            <div>
              <span className="text-[11px] font-mono text-brand-accent uppercase tracking-wider font-semibold">
                THE SYSTEMATIC ROUTINE
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mt-1">
                The 7-Step Trader Execution Sequence
              </h3>
            </div>
            <div className="text-xs font-mono text-text-muted">
              Taught, drilled, and audited in the 3-Day Session
            </div>
          </div>

          {/* Stepped Workflow Trace Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
            {TRADING_ROUTINE_STEPS.map((step, idx) => {
              const isSelected = idx === activeRoutineIndex;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveRoutineIndex(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-brand-blue/15 border-brand-blue shadow-glow-blue/50 text-white'
                      : 'bg-surface/50 border-white/[0.06] text-text-muted hover:text-text-secondary hover:border-white/[0.14]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={`font-bold ${isSelected ? 'text-brand-accent' : 'text-text-dim'}`}>
                      {step.num}
                    </span>
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: isSelected ? '#3B82F6' : '#4B5563' }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-dim truncate">
                      {step.phase}
                    </div>
                    <div className="text-xs font-semibold text-white truncate mt-0.5">
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector for Selected Routine Step */}
          <div className="p-6 rounded-2xl bg-[#06080E] border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-accent">
                <span>STEP {currentRoutine.num} • {currentRoutine.phase}</span>
                <span>•</span>
                <span className="text-signal-bull font-semibold">{currentRoutine.status}</span>
              </div>
              <h4 className="text-xl font-display font-bold text-white tracking-tight">
                {currentRoutine.title}
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {currentRoutine.objective}
              </p>
            </div>

            <div className="md:col-span-4 p-4 rounded-xl bg-surface/70 border border-white/[0.06] font-mono text-xs">
              <div className="text-[10px] text-text-dim uppercase tracking-wider mb-1">
                Non-Negotiable Execution Rule:
              </div>
              <div className="text-brand-accent font-medium leading-normal">
                "{currentRoutine.rule}"
              </div>
            </div>
          </div>

        </div>

        {/* Three Core Methodology Pillars - Integrated Editorial Rhythm */}
        <div className="mb-16 sm:mb-24">
          <div className="max-w-2xl mb-8 text-left">
            <span className="text-xs font-mono text-brand-accent uppercase tracking-wider font-semibold">
              METHODOLOGY PILLARS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-1">
              What the 3-Day Session Calibrates
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
            {SESSION_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-white/[0.08] bg-[#0A0D15] flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-accent px-2.5 py-1 rounded bg-brand-blue/15 border border-brand-blue/30">
                      PILLAR {pillar.number}
                    </span>
                    <span className="text-xs font-mono text-text-dim">
                      Live Lab Focus
                    </span>
                  </div>

                  <h4 className="text-xl font-display font-bold text-white tracking-tight mb-2">
                    {pillar.title}
                  </h4>

                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Focus List */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block mb-2">
                      Practical Drill:
                    </span>
                    {pillar.focusItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-text-primary leading-normal">
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-elevated/70 border border-white/[0.04] text-xs font-mono">
                  <span className="text-[10px] text-text-dim uppercase block">Practical Outcome:</span>
                  <span className="text-white font-medium text-[11px] mt-0.5 block">{pillar.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guided Cohort Transformation Action Card */}
        <div className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#0C1018] to-[#080B10] shadow-terminal p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-w-0">
          
          <div className="lg:col-span-8 flex flex-col gap-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal-bull/15 border border-signal-bull/30 text-xs font-mono text-signal-bull w-fit">
              <span className="size-2 rounded-full bg-signal-bull animate-pulse" />
              <span>Next Cohort: Registration Open</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Experience the complete routine in live market conditions.
            </h3>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Join a disciplined cohort of traders. You will receive complete access to the AlgoFinex indicator system, learn how to calibrate your charts, and practice the 7-step execution routine in interactive live chart labs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="flex items-center gap-2 text-text-primary">
                <Check className="size-4 text-brand-accent shrink-0" />
                <span>Full AlgoFinex Indicator System Access</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <Check className="size-4 text-brand-accent shrink-0" />
                <span>Live Interactive Chart Audits</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <Check className="size-4 text-brand-accent shrink-0" />
                <span>Documented 7-Step Execution Checklist</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <Check className="size-4 text-brand-accent shrink-0" />
                <span>Small Cohort Interactive Q&amp;A</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <a
              href="#enroll"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-200 shadow-glow-blue hover:shadow-xl active:scale-[0.99]"
            >
              <span>Join 3-Day Session</span>
              <ChevronRight className="size-4" />
            </a>

            <a
              href="#indicator-system"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-text-secondary hover:text-white bg-surface-elevated/70 hover:bg-surface-elevated border border-white/[0.08] transition-colors"
            >
              <Compass className="size-4 text-brand-accent" />
              <span>Explore Indicator System</span>
            </a>
          </div>

        </div>

        {/* Regulatory Risk Disclaimer */}
        <div className="mt-12 text-center text-text-dim text-[11px] font-mono max-w-3xl mx-auto leading-relaxed">
          AlgoFinex indicator systems and the 3-Day Session provide educational market structure analysis and workflow frameworks. Trading financial assets involves substantial risk of loss. Past performance is never indicative of future results.
        </div>

      </div>
    </section>
  );
};

export default SessionSection;
