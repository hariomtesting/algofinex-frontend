import React, { useState } from 'react';
import { WORKFLOW_STAGES } from '../../data/productExperienceData';
import { ArrowDown, Workflow } from 'lucide-react';

export const SceneTransitionBridge: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-background border-t border-white/[0.06]">
      
      {/* Dynamic Luminous Gradient Bridge */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-blue/10 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center w-full min-w-0">
        
        {/* Bridge Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-white/[0.1] text-xs font-mono text-brand-accent mb-6">
          <Workflow className="size-3.5 text-brand-accent shrink-0" />
          <span>THE TRANSFORMATION BRIDGE</span>
        </div>

        {/* Narrative Scale Transition Typography */}
        <h2 className="max-w-4xl text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.2] mb-6">
          An indicator reveals where the market is.{' '}
          <span className="block mt-2 bg-gradient-to-r from-brand-accent via-white to-text-secondary bg-clip-text text-transparent">
            Your workflow determines what you do next.
          </span>
        </h2>

        <p className="max-w-2xl text-sm sm:text-base text-text-secondary leading-relaxed mb-12 sm:mb-16">
          Indicators alone do not create profitable trading. Consistency comes from knowing how to synthesize chart signals into a repeatable execution habit.
        </p>

        {/* 4-Stage Progressive Workflow Conduit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-left">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer group ${
                  isActive
                    ? 'bg-surface-elevated border-brand-blue/60 shadow-glow-blue'
                    : 'bg-surface/30 border-white/[0.06] hover:border-white/[0.14] hover:bg-surface/60'
                }`}
              >
                {/* Step Connector Line on Desktop */}
                {idx < WORKFLOW_STAGES.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 size-4 text-border-medium z-10">
                    <ArrowDown className="size-3.5 -rotate-90 text-text-dim group-hover:text-brand-accent transition-colors" />
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-brand-accent">
                    {stage.step}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    stage.status === 'execution'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : stage.status === 'noise'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-white/[0.04] text-text-muted border border-white/[0.08]'
                  }`}>
                    {stage.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-mono mb-1.5 group-hover:text-brand-accent transition-colors">
                  {stage.title}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visual Continuity Arrow into the 3-Day Session */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-text-dim text-xs font-mono">
          <span>CONTINUE TO THE 3-DAY SESSION</span>
          <ArrowDown className="size-4 text-brand-accent animate-bounce" />
        </div>

      </div>
    </section>
  );
};

export default SceneTransitionBridge;
