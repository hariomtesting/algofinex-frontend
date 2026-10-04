import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  ChevronRight,
  ArrowDown
} from 'lucide-react';

interface ContinuousStage {
  id: string;
  step: string;
  title: string;
  stateName: string;
  tagline: string;
  cognitiveRule: string;
  statusColor: string;
  waveformType: 'chaotic' | 'dampened' | 'pivoted' | 'cloud' | 'zone' | 'boundary' | 'trigger';
}

const CONTINUOUS_STAGES: ContinuousStage[] = [
  {
    id: 'raw',
    step: '01',
    title: 'Raw Market',
    stateName: 'Unfiltered Noise',
    tagline: 'Erratic candlestick wicks & emotional volatility',
    cognitiveRule: 'Do not react to isolated candles. Most intraday moves are predatory churn.',
    statusColor: '#DC2626',
    waveformType: 'chaotic'
  },
  {
    id: 'observe',
    step: '02',
    title: 'Observe',
    stateName: 'Noise Dampening',
    tagline: 'Filter false breakouts through higher-timeframe alignment',
    cognitiveRule: 'Wait for the current bar to mature before evaluating directional intent.',
    statusColor: '#D97706',
    waveformType: 'dampened'
  },
  {
    id: 'structure',
    step: '03',
    title: 'Structure',
    stateName: 'Pivot Mapping',
    tagline: 'Identify validated Higher-High and Higher-Low swing boundaries',
    cognitiveRule: 'Trend direction is defined strictly by swing geometry, not personal sentiment.',
    statusColor: '#2563EB',
    waveformType: 'pivoted'
  },
  {
    id: 'context',
    step: '04',
    title: 'Context',
    stateName: 'Adaptive Cloud',
    tagline: 'Align entry momentum with dynamic multi-period ribbon support',
    cognitiveRule: 'Trades taken against the adaptive cloud carry inherently higher drawdown risk.',
    statusColor: '#3B82F6',
    waveformType: 'cloud'
  },
  {
    id: 'setup',
    step: '05',
    title: 'Setup',
    stateName: 'Liquidity Anchor',
    tagline: 'Detect resting order blocks and mitigated imbalance voids',
    cognitiveRule: 'Execute only where institutional resting liquidity has been swept and defended.',
    statusColor: '#9333EA',
    waveformType: 'zone'
  },
  {
    id: 'invalidation',
    step: '06',
    title: 'Invalidation',
    stateName: 'Risk Boundary',
    tagline: 'Hard mathematical price level that invalidates the setup',
    cognitiveRule: 'Know your exact exit before your finger touches the entry button. No mental stops.',
    statusColor: '#DC2626',
    waveformType: 'boundary'
  },
  {
    id: 'decision',
    step: '07',
    title: 'Decision',
    stateName: 'Execution Confirmed',
    tagline: 'Non-repainting bar-close confirmation with calibrated size',
    cognitiveRule: 'Trade size is derived from stop distance, keeping capital variance strictly controlled.',
    statusColor: '#059669',
    waveformType: 'trigger'
  }
];

export const SceneTransitionBridge: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(6); // Default to DECISION

  const activeStage = CONTINUOUS_STAGES[activeStageIndex];

  return (
    <section id="workflow" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#F8FAFC] border-t border-black/[0.06]">
      
      {/* Dynamic Ambient Trace Path Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[350px] bg-blue-100/35 rounded-full blur-[160px] opacity-60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
              <Workflow className="size-3 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">The Continuous Execution Journey</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.05]">
              An indicator is an input.<br />
              <span className="text-brand-blue">
                Your routine is the outcome.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              Watch how chaotic market noise resolves into absolute geometric clarity through the seven stages of the AlgoFinex execution journey.
            </p>
            <div className="text-xs font-mono text-slate-500">
              Interactive transformation: Click any stage along the path to trace clarity.
            </div>
          </div>

        </div>

        {/* CONTINUOUS VISUAL PATH / CHART RIBBON */}
        <div className="w-full">
          
          {/* Continuous Journey Ribbon Track (Desktop & Tablet) */}
          <div className="relative hidden md:block w-full mb-12">
            
            {/* The Continuous Glowing Trace Line */}
            <div className="relative h-20 w-full flex items-center">
              
              {/* Background Datum Conduit */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200" />
              
              {/* Active Trace Line */}
              <div 
                className="absolute left-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-brand-blue via-indigo-600 to-emerald-600 transition-all duration-300"
                style={{ width: `${(activeStageIndex / (CONTINUOUS_STAGES.length - 1)) * 92}%` }}
              />

              {/* Stage Waypoints along the continuous path */}
              <div className="relative z-10 w-full flex items-center justify-between px-4">
                {CONTINUOUS_STAGES.map((stg, idx) => {
                  const isActive = idx === activeStageIndex;
                  const isPassed = idx < activeStageIndex;

                  return (
                    <button
                      key={stg.id}
                      onClick={() => setActiveStageIndex(idx)}
                      className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      <div className={`size-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-blue text-white ring-4 ring-blue-100 scale-125 shadow-sm'
                          : isPassed
                          ? 'bg-blue-50 text-brand-blue border border-blue-200'
                          : 'bg-white text-slate-400 border border-slate-200 group-hover:border-slate-400'
                      }`}>
                        {stg.step}
                      </div>

                      <span className={`text-[11px] font-mono mt-3 uppercase tracking-wider transition-colors whitespace-nowrap ${
                        isActive ? 'text-slate-900 font-bold' : 'text-slate-400 group-hover:text-slate-700'
                      }`}>
                        {stg.title}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Mobile Horizontal Stage Scroller */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 w-full">
            {CONTINUOUS_STAGES.map((stg, idx) => (
              <button
                key={stg.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`px-3 py-2 rounded-xl font-mono text-xs whitespace-nowrap shrink-0 border transition-all ${
                  idx === activeStageIndex
                    ? 'bg-brand-blue text-white border-brand-blue font-bold shadow-xs'
                    : 'bg-white text-slate-600 border-black/[0.08]'
                }`}
              >
                {stg.step}. {stg.title}
              </button>
            ))}
          </div>

          {/* THE STAGE TRANSFORMATION STAGE */}
          <div className="rounded-2xl md:rounded-3xl border border-black/[0.09] bg-white p-6 sm:p-10 lg:p-12 shadow-workstation">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Side: Cognitive Rule & Narrative */}
                <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                  
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      Stage {activeStage.step} of 07
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold uppercase tracking-wider" style={{ color: activeStage.statusColor }}>
                      {activeStage.stateName}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                    {activeStage.title} Phase
                  </h3>

                  <div className="text-sm font-mono text-slate-500">
                    {activeStage.tagline}
                  </div>

                  {/* Non-Negotiable Cognitive Rule Box */}
                  <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-black/[0.06] text-xs font-mono">
                    <span className="text-[10px] text-slate-500 block mb-1 font-sans">
                      Trader Cognitive Rule:
                    </span>
                    <div className="text-slate-900 font-semibold leading-relaxed text-sm">
                      "{activeStage.cognitiveRule}"
                    </div>
                  </div>

                </div>

                {/* Right Side: Continuous Waveform Transformation Graphic */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-black/[0.06] font-mono text-xs flex flex-col gap-4">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] text-[11px] text-slate-500">
                    <span>Signal Resolution State</span>
                    <span className="font-bold uppercase" style={{ color: activeStage.statusColor }}>
                      {activeStage.stateName}
                    </span>
                  </div>

                  {/* Graphic Waveform Metaphor */}
                  <div className="h-28 flex items-center justify-center relative overflow-hidden bg-white rounded-xl border border-black/[0.04]">
                    <svg viewBox="0 0 400 100" className="w-full h-full">
                      {activeStage.waveformType === 'chaotic' && (
                        <path
                          d="M 10 50 Q 30 10, 50 80 T 90 20 T 130 90 T 170 30 T 210 85 T 250 15 T 290 75 T 330 25 T 370 70 T 390 50"
                          fill="none"
                          stroke="#DC2626"
                          strokeWidth="2.5"
                          className="animate-pulse"
                        />
                      )}

                      {activeStage.waveformType === 'dampened' && (
                        <path
                          d="M 10 50 Q 50 35, 90 60 T 170 42 T 250 56 T 330 46 T 390 50"
                          fill="none"
                          stroke="#D97706"
                          strokeWidth="2"
                        />
                      )}

                      {activeStage.waveformType === 'pivoted' && (
                        <g>
                          <path
                            d="M 10 70 L 100 25 L 200 65 L 300 15 L 390 50"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="2.5"
                          />
                          <circle cx="100" cy="25" r="4" fill="#2563EB" />
                          <circle cx="200" cy="65" r="4" fill="#059669" />
                          <circle cx="300" cy="15" r="4" fill="#2563EB" />
                          <text x="100" y="16" fill="#1D4ED8" fontSize="9" textAnchor="middle" fontWeight="bold">HH</text>
                          <text x="200" y="80" fill="#047857" fontSize="9" textAnchor="middle" fontWeight="bold">HL</text>
                          <text x="300" y="8" fill="#1D4ED8" fontSize="9" textAnchor="middle" fontWeight="bold">BOS</text>
                        </g>
                      )}

                      {activeStage.waveformType === 'cloud' && (
                        <g>
                          <path
                            d="M 10 65 Q 100 45, 200 55 T 390 30 L 390 55 Q 290 75, 190 70 T 10 80 Z"
                            fill="rgba(37, 99, 235, 0.08)"
                          />
                          <path
                            d="M 10 65 Q 100 45, 200 55 T 390 30"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="2"
                          />
                          <path
                            d="M 10 80 Q 100 60, 200 70 T 390 45"
                            fill="none"
                            stroke="#059669"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                        </g>
                      )}

                      {activeStage.waveformType === 'zone' && (
                        <g>
                          <rect x="60" y="35" width="280" height="32" fill="rgba(147, 51, 234, 0.08)" stroke="#9333EA" strokeWidth="1.2" strokeDasharray="4 2" rx="3" />
                          <path d="M 20 80 L 100 80 L 160 40 L 260 40 L 340 20 L 380 20" fill="none" stroke="#7C3AED" strokeWidth="2" />
                          <text x="200" y="55" fill="#6D28D9" fontSize="9" textAnchor="middle" fontWeight="bold">INSTITUTIONAL DEMAND DEFENDED</text>
                        </g>
                      )}

                      {activeStage.waveformType === 'boundary' && (
                        <g>
                          <line x1="20" y1="75" x2="380" y2="75" stroke="#DC2626" strokeWidth="2" strokeDasharray="5 3" />
                          <path d="M 20 60 L 120 40 L 220 50 L 320 25 L 380 30" fill="none" stroke="#2563EB" strokeWidth="2" />
                          <rect x="220" y="65" width="150" height="20" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1" />
                          <text x="295" y="79" fill="#B91C1C" fontSize="9" textAnchor="middle" fontWeight="bold">HARD STOP: $66,180</text>
                        </g>
                      )}

                      {activeStage.waveformType === 'trigger' && (
                        <g>
                          <path d="M 20 65 L 120 55 L 200 65 L 280 35 L 380 20" fill="none" stroke="#059669" strokeWidth="3" />
                          <circle cx="280" cy="35" r="5" fill="#059669" />
                          <rect x="230" y="46" width="100" height="22" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="1.2" />
                          <text x="280" y="60" fill="#047857" fontSize="9" textAnchor="middle" fontWeight="bold">▲ ENTRY CONFIRMED</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                    <span>Step {activeStage.step} of 07</span>
                    <button
                      onClick={() => setActiveStageIndex((activeStageIndex + 1) % CONTINUOUS_STAGES.length)}
                      className="text-brand-blue hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="size-3" />
                    </button>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Continuous Runway Transition into 3-Day Session */}
        <div className="mt-12 flex flex-col items-center gap-2.5 text-slate-500 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-slate-300" />
            <span className="tracking-wider uppercase text-[11px] font-semibold text-slate-600">The Resulting Operational Routine</span>
            <span className="h-px w-10 bg-slate-300" />
          </div>
          <a
            href="#session"
            className="group inline-flex items-center gap-1.5 text-xs text-brand-blue font-semibold hover:text-blue-800 transition-colors pt-1"
          >
            <span>Proceed to 3-Day Session Experience</span>
            <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SceneTransitionBridge;

