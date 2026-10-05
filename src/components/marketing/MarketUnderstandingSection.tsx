import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

/**
 * SECTION 03 — WHAT ALGOFINEX ACTUALLY DOES
 * Conceptual Flow: READ THE MARKET → BUILD CONTEXT → MAKE A PLAN
 * 
 * An editorial explanation of the three-phase analytical discipline,
 * replacing generic cards with an interactive diagrammatic workstation fragment.
 */
export const MarketUnderstandingSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

  const steps = [
    {
      id: 'read',
      num: '01',
      title: 'Read the Market',
      subtitle: 'Isolate Structure from Noise',
      lead: 'Most traders fail because they react to every tick. AlgoFinex algorithmically filters intraday noise to identify genuine swing pivots, structural breaks, and resting liquidity pools on bar-close.',
      deliverables: [
        'Deterministic Swing Highs and Lows (HH, HL, LH, LL)',
        'Unmitigated Order Blocks & Fair Value Gap imbalances',
        'Break of Structure (BOS) lines locked only on bar close',
      ],
      terminalTag: 'STAGE 01: STRUCTURAL ISOLATION',
      focusArea: 'Swing Geometry & Imbalance Pools'
    },
    {
      id: 'context',
      num: '02',
      title: 'Build Context',
      subtitle: 'Align with Higher-Timeframe Flow',
      lead: 'Local chart setups fail when traded against the macroeconomic tide. AlgoFinex wraps price action in multi-period dynamic trend corridors that instantly clarify whether local pullbacks are buying opportunities or distribution.',
      deliverables: [
        'Multi-timeframe trend alignment ribbon (21 / 55 EMA corridor)',
        'Session liquidity boundaries and volume profile shelves',
        'Directional expansion state vs compression / range warnings',
      ],
      terminalTag: 'STAGE 02: MULTI-TIMEFRAME CONTEXT',
      focusArea: 'Directional Momentum Corridor'
    },
    {
      id: 'plan',
      num: '03',
      title: 'Make a Plan',
      subtitle: 'Define Risk Before Capital',
      lead: 'Execution is not discretionary guessing. Before any order is placed, AlgoFinex establishes the exact mathematical invalidation coordinate. If the price reaches that point, the thesis is void—no emotional hesitation.',
      deliverables: [
        'Objective non-repainting entry trigger coordinates',
        'Fixed mathematical invalidation stop level',
        'Defined liquidity target pool with structural risk units',
      ],
      terminalTag: 'STAGE 03: MATHEMATICAL EXECUTION PLAN',
      focusArea: 'Pre-Trade Invalidation & Trigger'
    }
  ];

  const current = steps[activeStep];

  return (
    <section id="understanding" className="relative py-24 sm:py-32 lg:py-40 bg-[#F4F6F9] border-t border-black/[0.06] overflow-hidden">
      {/* Editorial Ambient Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[160px] opacity-70" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-100/25 rounded-full blur-[140px] opacity-60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Section Header: Varied Editorial Pacing */}
        <div className="max-w-3xl text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
            <Compass className="size-3.5 text-brand-blue shrink-0" />
            <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">
              The Three-Phase Discipline
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.04]">
            How AlgoFinex organizes market information:<br />
            <span className="text-brand-blue">
              Three sequential decisions.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Trading is not about predicting the future. It is about systematically parsing market structure so you never commit capital without architectural justification and predetermined risk.
          </p>
        </div>

        {/* Sleek Architectural Stage Switcher with 48px Touch Targets */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 w-full border-b border-black/[0.06]">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx as 0 | 1 | 2)}
                className={`text-left min-h-[48px] px-5 sm:px-6 rounded-t-xl transition-all duration-150 relative flex items-center gap-3 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 font-medium hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeUnderlineTab"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-brand-blue rounded-t"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                  isActive ? 'bg-blue-50 text-brand-blue border border-blue-200' : 'bg-slate-100 text-slate-400'
                }`}>
                  {s.num}
                </span>
                <span className="font-display text-sm sm:text-base tracking-tight whitespace-nowrap">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Demonstration Plane */}
        <div className="rounded-3xl border border-black/[0.09] bg-white shadow-workstation overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* Left Column: Editorial Explanation & Deliverables */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/[0.07] bg-white">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-blue font-semibold uppercase tracking-wider mb-2">
                <span>Phase {current.num}</span>
                <span>•</span>
                <span>{current.focusArea}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
                {current.subtitle}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {current.lead}
              </p>

              {/* Specific Deliverables List */}
              <div className="space-y-3.5 mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  Observed Structural Output:
                </span>
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-signal-bull shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Footer Action */}
            <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Decision {activeStep + 1} of 3
              </span>
              <button
                onClick={() => setActiveStep(((activeStep + 1) % 3) as 0 | 1 | 2)}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-blue hover:text-blue-800 transition-colors"
              >
                <span>{activeStep === 2 ? 'Return to Phase 01' : 'Next Phase'}</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Diagrammatic Product Fragment */}
          <div className="lg:col-span-7 bg-[#F8FAFC] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Frame Telemetry */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-6">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-brand-blue" />
                <span className="font-semibold text-slate-800">{current.terminalTag}</span>
              </div>
              <span className="text-[11px] text-slate-400 bg-white px-2 py-0.5 rounded border border-black/[0.06]">
                Non-repainting logic
              </span>
            </div>

            {/* Dynamic Diagram SVG Representation */}
            <div className="relative flex-1 flex items-center justify-center min-h-[300px] w-full">
              
              {/* Hairline background coordinate lines */}
              <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 opacity-30 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border-b border-r border-black/[0.05]" />
                ))}
              </div>

              {/* State 0: Read the Market SVG (Clean Candlesticks with Pivots and Imbalance) */}
              {activeStep === 0 && (
                <svg viewBox="0 0 540 260" className="w-full h-auto max-w-[500px] select-none">
                  {/* Demand Zone Box */}
                  <rect x="60" y="140" width="380" height="45" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="4 3" rx="4" />
                  <text x="75" y="165" fill="#1D4ED8" fontSize="10" fontFamily="monospace" fontWeight="700">
                    Demand Zone [Unmitigated Resting Pool]
                  </text>

                  {/* Clean Candlesticks */}
                  {/* C1: Bearish */}
                  <line x1="80" y1="60" x2="80" y2="130" stroke="#DC2626" strokeWidth="1.5" />
                  <rect x="74" y="75" width="12" height="40" fill="#DC2626" rx="1.5" />

                  {/* C2: Low Pivot (HL) */}
                  <line x1="140" y1="110" x2="140" y2="175" stroke="#059669" strokeWidth="1.5" />
                  <rect x="134" y="125" width="12" height="40" fill="#059669" rx="1.5" />
                  {/* Pivot Pin */}
                  <circle cx="140" cy="180" r="3" fill="#059669" />
                  <line x1="140" y1="180" x2="140" y2="198" stroke="#059669" strokeWidth="1" />
                  <rect x="114" y="198" width="52" height="15" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="1" />
                  <text x="140" y="209" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="700">HL 66,100</text>

                  {/* C3: Bullish expansion */}
                  <line x1="200" y1="95" x2="200" y2="160" stroke="#059669" strokeWidth="1.5" />
                  <rect x="194" y="105" width="12" height="45" fill="#059669" rx="1.5" />

                  {/* C4: High Pivot (HH) */}
                  <line x1="260" y1="40" x2="260" y2="120" stroke="#1D4ED8" strokeWidth="1.5" />
                  <rect x="254" y="55" width="12" height="45" fill="#059669" rx="1.5" />
                  {/* Pivot Pin */}
                  <circle cx="260" cy="36" r="3" fill="#1D4ED8" />
                  <line x1="260" y1="20" x2="260" y2="36" stroke="#1D4ED8" strokeWidth="1" />
                  <rect x="234" y="6" width="52" height="15" rx="3" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1" />
                  <text x="260" y="17" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontFamily="monospace" fontWeight="700">HH 67,400</text>

                  {/* Break of Structure Line */}
                  <line x1="260" y1="40" x2="420" y2="40" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 2" />
                  <rect x="330" y="28" width="60" height="16" rx="3" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1" />
                  <text x="360" y="39" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontFamily="monospace" fontWeight="700">BOS ▲ 67,400</text>

                  {/* C5: Breakout candle */}
                  <line x1="390" y1="30" x2="390" y2="100" stroke="#059669" strokeWidth="1.5" />
                  <rect x="384" y="35" width="12" height="48" fill="#059669" rx="1.5" />

                  {/* C6: Confirmation candle */}
                  <line x1="450" y1="20" x2="450" y2="85" stroke="#059669" strokeWidth="1.5" />
                  <rect x="444" y="25" width="12" height="45" fill="#059669" rx="1.5" />
                </svg>
              )}

              {/* State 1: Build Context SVG (Dynamic Trend Envelope + Timeframe Confluence) */}
              {activeStep === 1 && (
                <svg viewBox="0 0 540 260" className="w-full h-auto max-w-[500px] select-none">
                  {/* Dynamic Trend Corridor Ribbon */}
                  <path
                    d="M 50,190 Q 200,160 320,110 T 500,50 L 500,105 Q 320,165 200,210 T 50,230 Z"
                    fill="#1D4ED8"
                    fillOpacity="0.08"
                  />
                  {/* Fast 21 EMA */}
                  <path
                    d="M 50,190 Q 200,160 320,110 T 500,50"
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {/* Slow 55 EMA */}
                  <path
                    d="M 50,230 Q 200,210 320,165 T 500,105"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                  />

                  {/* Multi-Timeframe Alignment Badges */}
                  <g transform="translate(60, 30)">
                    <rect x="0" y="0" width="120" height="28" rx="6" fill="#FFFFFF" stroke="rgba(15,23,42,0.12)" />
                    <circle cx="14" cy="14" r="3.5" fill="#059669" />
                    <text x="26" y="18" fill="#0F172A" fontSize="10" fontFamily="sans-serif" fontWeight="700">Daily: Bullish</text>
                  </g>

                  <g transform="translate(195, 30)">
                    <rect x="0" y="0" width="120" height="28" rx="6" fill="#FFFFFF" stroke="rgba(15,23,42,0.12)" />
                    <circle cx="14" cy="14" r="3.5" fill="#059669" />
                    <text x="26" y="18" fill="#0F172A" fontSize="10" fontFamily="sans-serif" fontWeight="700">4-Hour: Expansion</text>
                  </g>

                  <g transform="translate(330, 30)">
                    <rect x="0" y="0" width="140" height="28" rx="6" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.2" />
                    <circle cx="14" cy="14" r="3.5" fill="#1D4ED8" />
                    <text x="26" y="18" fill="#1D4ED8" fontSize="10" fontFamily="sans-serif" fontWeight="700">15-Min: Pullback Test</text>
                  </g>

                  {/* Trend Angle Vector Annotation */}
                  <line x1="320" y1="110" x2="420" y2="70" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="3 3" />
                  <text x="350" y="135" fill="#475569" fontSize="9" fontFamily="monospace">
                    Corridor Angle: +28° [Positive Slope]
                  </text>
                </svg>
              )}

              {/* State 2: Make a Plan SVG (Explicit Invalidation, Trigger, Target) */}
              {activeStep === 2 && (
                <svg viewBox="0 0 540 260" className="w-full h-auto max-w-[500px] select-none">
                  {/* Liquidity Target Line */}
                  <line x1="60" y1="50" x2="480" y2="50" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" />
                  <rect x="60" y="38" width="170" height="24" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="1" />
                  <text x="70" y="54" fill="#047857" fontSize="9" fontFamily="monospace" fontWeight="700">
                    TARGET: $68,900 [Liquidity Pool]
                  </text>

                  {/* Execution Trigger Bar & Point */}
                  <line x1="180" y1="70" x2="180" y2="170" stroke="#1D4ED8" strokeWidth="2" />
                  <rect x="174" y="100" width="12" height="40" fill="#1D4ED8" rx="2" />
                  <circle cx="180" cy="120" r="5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2.5" />

                  {/* Trigger Callout */}
                  <rect x="200" y="108" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="1.2" />
                  <text x="210" y="125" fill="#1D4ED8" fontSize="9" fontFamily="monospace" fontWeight="700">
                    ▲ TRIGGER: $67,420 (Bar Close)
                  </text>

                  {/* Risk Corridor Bracket */}
                  <rect x="180" y="120" width="160" height="70" fill="#DC2626" fillOpacity="0.06" stroke="#DC2626" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Hard Stop Invalidation Level */}
                  <line x1="60" y1="190" x2="480" y2="190" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="4 2" />
                  <rect x="60" y="178" width="180" height="24" rx="4" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1" />
                  <text x="70" y="194" fill="#B91C1C" fontSize="9" fontFamily="monospace" fontWeight="700">
                    INVALIDATION STOP: $66,180
                  </text>

                  {/* Risk Metric Box */}
                  <g transform="translate(370, 150)">
                    <rect x="0" y="0" width="120" height="44" rx="6" fill="#FFFFFF" stroke="rgba(15,23,42,0.12)" />
                    <text x="10" y="18" fill="#64748B" fontSize="9" fontFamily="monospace">Risk Unit (1.0R)</text>
                    <text x="10" y="34" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="700">Pre-set: $1,240</text>
                  </g>
                </svg>
              )}

            </div>

            {/* Bottom Methodology Note */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="size-3.5 text-slate-400" />
                <span>Deterministic rules • No arbitrary discretion</span>
              </span>
              <span className="text-slate-400">TradingView Pine Script v5 Engine</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default MarketUnderstandingSection;
