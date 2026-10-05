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

  // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const daysData = [
    {
      day: 1,
      tag: 'DAY 01 • ARRIVAL & DECONSTRUCTION',
      phase: 'Arrival',
      title: 'Deconstruct the Clutter & Map Pure Structure',
      focus: 'Workspace Calibration & Geometric Anchors',
      schedule: '09:00 – 11:30 UTC • Live Interactive Lab',
      milestones: [
        'Strip away lagging oscillators to reclaim clean price action',
        'Configure TradingView workspace with synchronized multi-timeframe templates',
        'Isolate algorithmic swing highs, swing lows, and structural breaks (BOS)'
      ]
    },
    {
      day: 2,
      tag: 'DAY 02 • OBSERVATION & CONFLUENCE',
      phase: 'Observation',
      title: 'Read Live Institutional Tape & Resting Liquidity',
      focus: 'Real-Time Order Flow & Non-Repainting Signals',
      schedule: '09:00 – 11:30 UTC • Live Market Session',
      milestones: [
        'Identify unmitigated order blocks and fair value gap imbalances',
        'Differentiate genuine expansion from false breakout traps',
        'Verify non-repainting bar-close execution criteria under live pressure'
      ]
    },
    {
      day: 3,
      tag: 'DAY 03 • APPLICATION & ROUTINE',
      phase: 'Application',
      title: 'Cement the 7-Step Execution Protocol',
      focus: 'Fixed Invalidation & Operational Checklist',
      schedule: '09:00 – 11:30 UTC • Portfolio Calibration',
      milestones: [
        'Calculate exact mathematical invalidation points before entry',
        'Establish personal risk budgets and position sizing matrices',
        'Formalize your written 7-step pre-session and post-session checklist'
      ]
    }
  ];

  const currentDayData = daysData[activeDay - 1];

  return (
    <section id="session" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#F4F2EC] border-t border-black/[0.06]">
      
      {/* Matte Warm Editorial Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[900px] h-[500px] bg-amber-100/30 rounded-full blur-[180px] opacity-70" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
              <Calendar className="size-3.5 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px] text-slate-600">
                LIVE MASTERCLASS &middot; WHAT EXPERIENCE YOU RECEIVE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-display font-extrabold tracking-[-0.04em] text-slate-900 leading-[1.02] select-none">
              3 DAYS<br />
              TO REFINE<br />
              <span className="text-slate-400 font-bold">THE</span><br />
              <span className="text-brand-blue">
                ROUTINE.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              Indicators reveal market geometry. Only an iron routine protects your capital under live market pressure. In 3 consecutive live sessions, we calibrate your charts, audit execution habits, and enforce disciplined trade invalidation.
            </p>
            <div className="text-[11px] font-mono text-slate-500 bg-white/80 p-2.5 rounded-lg border border-black/[0.06]">
              // PROTOTYPE COHORT CURRICULUM • DRAFT STRUCTURE
            </div>
          </div>
        </div>

        {/* Physical 3-Day Editorial Timeline Progression Rail */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {daysData.map((d) => {
              const isSelected = activeDay === d.day;
              return (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(d.day as 1 | 2 | 3)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-brand-blue shadow-sm ring-1 ring-brand-blue/20'
                      : 'bg-white/70 hover:bg-white border-black/[0.08] hover:border-black/[0.14]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-blue-50 text-brand-blue border border-blue-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      DAY 0{d.day}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                      {d.phase}
                    </span>
                  </div>

                  <h3 className={`font-display text-lg font-bold tracking-tight mb-1 ${
                    isSelected ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {d.focus}
                  </h3>

                  <div className="text-xs text-slate-500 font-mono mt-2">
                    {d.schedule}
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeDayRail"
                      className="absolute bottom-0 inset-x-6 h-0.5 bg-brand-blue rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Day Detail Card */}
          <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-xs text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] mb-5">
              <div>
                <span className="text-xs font-mono font-semibold text-brand-blue uppercase tracking-wider block">
                  {currentDayData.tag}
                </span>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1">
                  {currentDayData.title}
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-black/[0.06] shrink-0">
                {currentDayData.schedule}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentDayData.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-black/[0.05]">
                  <span className="size-5 rounded-full bg-brand-blue text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                    {m}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Intake Action Module */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left">
            
            {/* Restrained Intake Action Module */}
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col gap-4 w-full">
              
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
                href="#pricing"
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
              <span>Three 2.5-hour live market labs • Direct mentor review</span>
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

