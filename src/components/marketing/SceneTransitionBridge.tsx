import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORKFLOW_JOURNEY_STEPS } from '../../data/productExperienceData';
import { 
  ArrowDown, 
  Workflow, 
  ChevronRight 
} from 'lucide-react';

export const SceneTransitionBridge: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(4); // Default to DECISION / WORKFLOW

  const currentStep = WORKFLOW_JOURNEY_STEPS[activeStepIndex];

  return (
    <section id="workflow" className="relative py-28 sm:py-36 overflow-hidden bg-[#070A0F] border-t border-white/[0.06]">
      
      {/* Dynamic Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-brand-blue/5 rounded-full blur-[140px] opacity-70" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center w-full min-w-0">
        
        {/* Bridge Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/[0.1] text-xs font-mono text-brand-accent mb-6">
          <Workflow className="size-3.5 text-brand-accent shrink-0" />
          <span>THE EXECUTION TRANSFORMATION</span>
        </div>

        {/* Narrative Scale Transition Typography */}
        <h2 className="max-w-4xl text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          An indicator reveals where the market is.{' '}
          <span className="block mt-2 bg-gradient-to-r from-brand-accent via-white to-text-secondary bg-clip-text text-transparent">
            Your workflow determines what you do.
          </span>
        </h2>

        <p className="max-w-2xl text-sm sm:text-base text-text-secondary leading-relaxed mb-14 sm:mb-20">
          Indicators alone do not create consistent trading. Consistency comes from knowing how to synthesize chart signals into a repeatable execution habit.
        </p>

        {/* Stepped Visual Journey Pipeline (Horizontal on desktop, vertical on mobile) */}
        <div className="w-full mb-12">
          
          {/* Conduit Track Line */}
          <div className="relative hidden lg:flex items-center justify-between max-w-5xl mx-auto mb-10 px-6">
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-white/[0.08]" />
            <div 
              className="absolute left-10 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-brand-blue to-brand-accent transition-all duration-300"
              style={{ width: `${(activeStepIndex / (WORKFLOW_JOURNEY_STEPS.length - 1)) * 90}%` }}
            />

            {WORKFLOW_JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none"
                >
                  <div className={`size-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20 scale-110 shadow-glow-blue'
                      : isPast
                      ? 'bg-surface-elevated text-brand-accent border border-brand-blue/40'
                      : 'bg-[#0B0F17] text-text-muted border border-white/[0.1] hover:border-white/[0.2]'
                  }`}>
                    {step.step}
                  </div>
                  <span className={`text-[11px] font-mono mt-2 tracking-wider uppercase transition-colors whitespace-nowrap ${
                    isActive ? 'text-white font-bold' : 'text-text-muted group-hover:text-text-secondary'
                  }`}>
                    {step.phase}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Step Buttons */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 w-full">
            {WORKFLOW_JOURNEY_STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-2 rounded-lg font-mono text-xs whitespace-nowrap shrink-0 border ${
                  idx === activeStepIndex
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-surface-elevated text-text-muted border-white/[0.08]'
                }`}
              >
                {step.step}. {step.phase}
              </button>
            ))}
          </div>

          {/* Active Step Visual Showcase Stage (Editorial Diagrammatic View) */}
          <div className="max-w-5xl mx-auto rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0D15] p-6 sm:p-10 text-left shadow-terminal">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Left Side: Step Narrative & Cognitive State (7 cols on md) */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider">
                    <span>STAGE {currentStep.step} OF 05</span>
                    <span>•</span>
                    <span className="text-white font-bold">{currentStep.phase}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    {currentStep.title}
                  </h3>

                  <div className="text-xs sm:text-sm font-mono text-text-muted">
                    {currentStep.tagline}
                  </div>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {currentStep.description}
                  </p>

                  {/* Trader Mindset Box */}
                  <div className="mt-2 p-3.5 rounded-xl bg-surface/70 border border-white/[0.06] text-xs font-mono">
                    <span className="text-[10px] text-text-dim uppercase tracking-wider block mb-1">
                      Trader Mental State:
                    </span>
                    <span className="text-white font-medium">
                      {currentStep.traderMindset}
                    </span>
                  </div>
                </div>

                {/* Right Side: Step Diagrammatic Schematic (5 cols on md) */}
                <div className="md:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#06080D] border border-white/[0.08] font-mono text-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-[11px] text-text-muted">
                    <span>PROGRESSION MONITOR</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      currentStep.visualState === 'noise' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : currentStep.visualState === 'execution'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-brand-blue/15 text-brand-accent border border-brand-blue/30'
                    }`}>
                      {currentStep.visualState.toUpperCase()}
                    </span>
                  </div>

                  {/* Diagram Representation */}
                  <div className="py-4 flex flex-col items-center justify-center text-center gap-2">
                    {currentStep.visualState === 'noise' && (
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between text-[10px] text-text-dim">
                          <span>Raw Candlestick Noise</span>
                          <span className="text-red-400 font-bold">Unfiltered</span>
                        </div>
                        <div className="h-10 border border-dashed border-red-500/30 rounded flex items-center justify-center text-red-400/80 text-[11px]">
                          ⚡ Erratic Wicks &amp; Emotional Chopping
                        </div>
                      </div>
                    )}

                    {currentStep.visualState === 'structure' && (
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between text-[10px] text-text-dim">
                          <span>Market Geometry Filter</span>
                          <span className="text-brand-accent font-bold">Active</span>
                        </div>
                        <div className="h-10 border border-brand-blue/30 bg-brand-blue/5 rounded flex items-center justify-center text-brand-accent text-[11px]">
                          Higher-High Sequences • Swing Levels Identified
                        </div>
                      </div>
                    )}

                    {currentStep.visualState === 'context' && (
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between text-[10px] text-text-dim">
                          <span>Adaptive Trend Cloud</span>
                          <span className="text-signal-bull font-bold">In Agreement</span>
                        </div>
                        <div className="h-10 border border-emerald-500/30 bg-emerald-500/5 rounded flex items-center justify-center text-emerald-400 text-[11px]">
                          Trend Momentum Synchronized • Chop Filtered
                        </div>
                      </div>
                    )}

                    {currentStep.visualState === 'setup' && (
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between text-[10px] text-text-dim">
                          <span>Liquidity Sweep &amp; Order Block</span>
                          <span className="text-purple-400 font-bold">Mitigated</span>
                        </div>
                        <div className="h-10 border border-purple-500/30 bg-purple-500/5 rounded flex items-center justify-center text-purple-300 text-[11px]">
                          Sell-Side Swept • Demand Block Defended
                        </div>
                      </div>
                    )}

                    {currentStep.visualState === 'execution' && (
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between text-[10px] text-text-dim">
                          <span>Bar-Close Trigger + Stop Locked</span>
                          <span className="text-signal-bull font-bold">Execution Ready</span>
                        </div>
                        <div className="h-10 border border-emerald-500/40 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-300 text-[11px] font-bold">
                          ✓ Stop: $66,180 • Strict Size: 1.5% • Signal Confirmed
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-text-dim">
                    <span>Workflow Stage {idxString(activeStepIndex + 1)}</span>
                    <button
                      onClick={() => setActiveStepIndex((activeStepIndex + 1) % WORKFLOW_JOURNEY_STEPS.length)}
                      className="text-brand-accent hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Next Phase</span>
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Visual Continuity into the 3-Day Session */}
        <div className="flex flex-col items-center gap-2 text-text-dim text-xs font-mono">
          <span>THE RESULTING TRADING ROUTINE</span>
          <ArrowDown className="size-4 text-brand-accent animate-bounce" />
        </div>

      </div>
    </section>
  );
};

function idxString(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export default SceneTransitionBridge;
