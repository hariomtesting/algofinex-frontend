import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRADING_ROUTINE_STEPS } from '../../data/productExperienceData';
import { 
  Calendar, 
  ChevronRight, 
  Shield, 
  Clock
} from 'lucide-react';

export const SessionSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(3); // Default to Invalidation step

  const activeStep = TRADING_ROUTINE_STEPS[activeStepIndex];

  return (
    <section id="session" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#070A10] border-t border-white/[0.08]">
      
      {/* Matte Dark Editorial Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[1000px] h-[500px] bg-gradient-to-b from-brand-blue/6 to-emerald-500/4 rounded-full blur-[180px] opacity-60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Display Typography & Intentional Intake Action (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-6 w-fit shadow-panel">
              <Calendar className="size-3.5 text-brand-accent shrink-0" />
              <span className="tracking-widest uppercase font-semibold text-[10px] sm:text-[11px]">
                INTENSIVE COHORT // MASTERCLASS
              </span>
            </div>

            {/* Editorial Display Typography */}
            <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-display font-extrabold tracking-[-0.04em] text-white leading-[1.02] select-none">
              3 DAYS<br />
              TO REFINE<br />
              <span className="text-text-muted font-bold">THE</span><br />
              <span className="bg-gradient-to-r from-brand-accent via-white to-text-secondary bg-clip-text text-transparent">
                ROUTINE.
              </span>
            </h2>

            <p className="mt-8 text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed max-w-lg">
              Indicators reveal market geometry. Only an iron routine protects your capital under live market pressure. In 3 intensive live sessions, we calibrate your charts, audit execution habits, and enforce disciplined trade invalidation.
            </p>

            {/* Restrained Intake Action Module */}
            <div className="mt-10 p-6 rounded-2xl bg-[#090D16] border border-white/[0.08] shadow-panel flex flex-col gap-4 max-w-md">
              
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-dim uppercase tracking-wider">Cohort Intake</span>
                <span className="flex items-center gap-1.5 text-signal-bull font-semibold">
                  <span className="size-1.5 rounded-full bg-signal-bull animate-ping" />
                  October Cohort Open
                </span>
              </div>

              <div className="text-sm font-mono text-text-muted flex items-center justify-between border-t border-b border-white/[0.06] py-2.5">
                <span>Cohort Limit: <strong className="text-white">12 Traders</strong></span>
                <span>Enrolled: <strong className="text-brand-accent">8 / 12</strong></span>
              </div>

              <a
                href="#enroll"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-all duration-200 shadow-glow-blue hover:shadow-xl active:scale-[0.99]"
              >
                <span>Reserve Intake Seat</span>
                <ChevronRight className="size-4" />
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-text-dim">
                <Shield className="size-3 text-brand-blue" />
                <span>Includes full indicator suite access &amp; session recordings</span>
              </div>

            </div>

            {/* Small Technical Reassurance */}
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-text-muted">
              <Clock className="size-3.5 text-brand-accent shrink-0" />
              <span>Three 90-minute live market labs • Non-recorded interactive audits</span>
            </div>

          </div>

          {/* Right Column: Trading Workflow as a Sculptural Visual Object (7 cols on lg) */}
          <div className="lg:col-span-7 w-full min-w-0">
            
            <div className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0E18] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] p-6 sm:p-8 lg:p-10">
              
              {/* Sculptural Object Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest font-semibold block">
                    THE SCULPTURAL PROTOCOL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mt-0.5">
                    The 7-Step Trader Routine Object
                  </h3>
                </div>

                <div className="text-[11px] font-mono text-text-dim">
                  Interactive Sequence Rail
                </div>
              </div>

              {/* Vertical Precision Routine Rail */}
              <div className="flex flex-col gap-2.5 mb-8">
                {TRADING_ROUTINE_STEPS.map((step, idx) => {
                  const isSelected = idx === activeStepIndex;

                  return (
                    <button
                      key={step.num}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? 'bg-surface-elevated/95 border-brand-blue/60 shadow-glow-blue/40'
                          : 'bg-surface/30 border-white/[0.04] hover:bg-surface/60 hover:border-white/[0.1]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`size-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isSelected ? 'bg-brand-blue text-white shadow-sm' : 'bg-white/[0.05] text-text-dim'
                        }`}>
                          {step.num}
                        </div>

                        <div className="min-w-0">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-text-dim truncate">
                            {step.phase}
                          </div>
                          <div className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                            isSelected ? 'text-white' : 'text-text-secondary'
                          }`}>
                            {step.title}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase hidden sm:inline ${
                          isSelected ? 'bg-signal-bull/15 text-signal-bull border border-signal-bull/30' : 'text-text-dim'
                        }`}>
                          {step.status}
                        </span>
                        <ChevronRight className={`size-4 transition-transform ${isSelected ? 'text-brand-accent translate-x-1' : 'text-text-dim'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Rule Showcase */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.num}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="p-5 rounded-2xl bg-[#06080E] border border-white/[0.08] flex flex-col gap-3 text-left"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-accent font-semibold">
                      STEP {activeStep.num} // {activeStep.phase.toUpperCase()}
                    </span>
                    <span className="text-signal-bull font-bold text-[11px]">
                      {activeStep.status}
                    </span>
                  </div>

                  <div className="text-base font-display font-bold text-white tracking-tight">
                    {activeStep.title}
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {activeStep.objective}
                  </p>

                  <div className="mt-1 pt-3 border-t border-white/[0.06] text-xs font-mono">
                    <span className="text-[10px] text-text-dim uppercase tracking-wider block mb-1">
                      Non-Negotiable Execution Rule:
                    </span>
                    <div className="text-brand-accent font-semibold">
                      "{activeStep.rule}"
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* Regulatory Risk Notice */}
        <div className="mt-16 text-center text-text-dim text-[11px] font-mono max-w-3xl mx-auto leading-relaxed border-t border-white/[0.06] pt-8">
          AlgoFinex indicator suites and the 3-Day Session deliver educational market structure frameworks. Trading financial instruments carries substantial capital risk. Historical performance never guarantees future returns.
        </div>

      </div>
    </section>
  );
};

export default SessionSection;
