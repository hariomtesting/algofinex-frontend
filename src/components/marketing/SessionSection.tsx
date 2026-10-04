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
    <section id="session" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#F4F2EC] border-t border-black/[0.06]">
      
      {/* Matte Warm Editorial Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[900px] h-[500px] bg-amber-100/30 rounded-full blur-[180px] opacity-70" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Display Typography & Intentional Intake Action */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-6 w-fit shadow-xs">
              <Calendar className="size-3.5 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px] text-slate-600">
                Intensive Cohort Masterclass
              </span>
            </div>

            {/* Editorial Display Typography */}
            <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-display font-extrabold tracking-[-0.04em] text-slate-900 leading-[1.02] select-none">
              3 DAYS<br />
              TO REFINE<br />
              <span className="text-slate-400 font-bold">THE</span><br />
              <span className="text-brand-blue">
                ROUTINE.
              </span>
            </h2>

            <p className="mt-8 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-lg">
              Indicators reveal market geometry. Only an iron routine protects your capital under live market pressure. In 3 intensive live sessions, we calibrate your charts, audit execution habits, and enforce disciplined trade invalidation.
            </p>

            {/* Restrained Intake Action Module */}
            <div className="mt-10 p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-4 max-w-md">
              
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 uppercase tracking-wider font-medium">Cohort Intake</span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="size-1.5 rounded-full bg-signal-bull animate-ping" />
                  October Cohort Open
                </span>
              </div>

              <div className="text-sm font-mono text-slate-600 flex items-center justify-between border-t border-b border-black/[0.06] py-2.5">
                <span>Cohort Limit: <strong className="text-slate-900">12 Traders</strong></span>
                <span>Enrolled: <strong className="text-brand-blue">8 / 12</strong></span>
              </div>

              <a
                href="#enroll"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-brand-blue hover:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99]"
              >
                <span>Reserve Intake Seat</span>
                <ChevronRight className="size-4" />
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
                <Shield className="size-3 text-brand-blue" />
                <span>Includes full indicator suite access &amp; session recordings</span>
              </div>

            </div>

            {/* Small Technical Reassurance */}
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
              <Clock className="size-3.5 text-brand-blue shrink-0" />
              <span>Three 90-minute live market labs • Non-recorded interactive audits</span>
            </div>

          </div>

          {/* Right Column: Trading Workflow as a Sculptural Visual Object */}
          <div className="lg:col-span-7 w-full min-w-0">
            
            <div className="rounded-2xl md:rounded-3xl border border-black/[0.09] bg-white shadow-workstation p-6 sm:p-8 lg:p-10">
              
              {/* Sculptural Object Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-black/[0.07] mb-6">
                <div>
                  <span className="text-[10px] font-mono text-brand-blue uppercase tracking-wider font-semibold block">
                    The Operational Protocol
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight mt-0.5">
                    The 7-Step Trader Routine Object
                  </h3>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
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
                          ? 'bg-blue-50/70 border-brand-blue shadow-xs'
                          : 'bg-slate-50/50 border-black/[0.05] hover:bg-slate-50 hover:border-black/[0.1]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`size-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isSelected ? 'bg-brand-blue text-white shadow-xs' : 'bg-white text-slate-500 border border-black/[0.06]'
                        }`}>
                          {step.num}
                        </div>

                        <div className="min-w-0">
                          <div className={`text-[10px] font-mono uppercase tracking-wider truncate ${isSelected ? 'text-brand-blue font-semibold' : 'text-slate-400'}`}>
                            {step.phase}
                          </div>
                          <div className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                            isSelected ? 'text-slate-900' : 'text-slate-600'
                          }`}>
                            {step.title}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase hidden sm:inline ${
                          isSelected ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold' : 'text-slate-400'
                        }`}>
                          {step.status}
                        </span>
                        <ChevronRight className={`size-4 transition-transform ${isSelected ? 'text-brand-blue translate-x-1' : 'text-slate-300'}`} />
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
                  className="p-5 rounded-2xl bg-slate-50 border border-black/[0.06] flex flex-col gap-3 text-left"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-blue font-semibold">
                      Step {activeStep.num} • {activeStep.phase}
                    </span>
                    <span className="text-emerald-700 font-bold text-[11px]">
                      {activeStep.status}
                    </span>
                  </div>

                  <div className="text-base font-display font-bold text-slate-900 tracking-tight">
                    {activeStep.title}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeStep.objective}
                  </p>

                  <div className="mt-1 pt-3 border-t border-black/[0.06] text-xs font-mono">
                    <span className="text-[10px] text-slate-500 block mb-1 font-sans">
                      Non-Negotiable Execution Rule:
                    </span>
                    <div className="text-slate-900 font-semibold">
                      "{activeStep.rule}"
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* Regulatory Risk Notice */}
        <div className="mt-16 text-center text-slate-500 text-[11px] font-mono max-w-3xl mx-auto leading-relaxed border-t border-black/[0.06] pt-8">
          AlgoFinex indicator suites and the 3-Day Session deliver educational market structure frameworks. Trading financial instruments carries substantial capital risk. Historical performance never guarantees future returns.
        </div>

      </div>
    </section>
  );
};

export default SessionSection;

