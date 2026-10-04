import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

/**
 * SECTION 05 — WHY ALGOFINEX (FOUNDATIONAL PRINCIPLES)
 * Communicates core product and design principles:
 * CLARITY, CONTEXT, DISCIPLINE, CONSISTENCY.
 * 
 * ZERO fake testimonials, ZERO fake statistics.
 * Pure editorial elegance and visual restraint.
 */
export const PrinciplesSection: React.FC = () => {
  const principles = [
    {
      num: '01',
      keyword: 'CLARITY',
      statement: 'Remove the noise until only structure remains.',
      description: 'Most retail charting interfaces fail through sensory overload. Traders pile five lagging oscillators over raw price action and end up paralyzed by conflicting signals. AlgoFinex removes everything non-essential, leaving only mathematically validated swing pivots, structural breaks, and resting liquidity pools.',
      visualType: 'clarity'
    },
    {
      num: '02',
      keyword: 'CONTEXT',
      statement: 'Local price action is meaningless without macro order flow.',
      description: 'A 5-minute bullish pattern inside a daily distribution corridor is a statistical trap. AlgoFinex enforces hierarchical multi-timeframe synchronization, ensuring you never risk capital without verifying that higher-timeframe institutional order flow supports your directional thesis.',
      visualType: 'context'
    },
    {
      num: '03',
      keyword: 'DISCIPLINE',
      statement: 'Deterministic rules replace emotional hesitation.',
      description: 'Discretionary trading fails when fear and greed dictate entries and exits. AlgoFinex indicators are non-repainting and enforce strict bar-close verification. A signal does not exist until the bar locks, and every verified setup carries an unambiguous, pre-calculated invalidation level.',
      visualType: 'discipline'
    },
    {
      num: '04',
      keyword: 'CONSISTENCY',
      statement: 'A repeatable operational routine produces durable execution.',
      description: 'Superior indicators are useless without a structured trading routine. Through our 3-Day Session, we embed our indicator suite into a physical 7-step execution checklist—transforming erratic chart gazing into a calm, professional daily routine.',
      visualType: 'consistency'
    }
  ];

  return (
    <section id="principles" className="relative py-28 sm:py-36 lg:py-44 bg-[#F8F8F6] border-t border-black/[0.06] overflow-hidden">
      
      {/* Editorial Ambient Aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-blue-100/30 rounded-full blur-[180px] opacity-60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
              <Shield className="size-3.5 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">
                SECTION 05 • PRODUCT PHILOSOPHY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.04]">
              Why AlgoFinex:<br />
              <span className="text-brand-blue">
                Built on four non-negotiable principles.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We do not fabricate trading records, boast about win rates, or sell automated get-rich-quick schemes. AlgoFinex was engineered for traders who respect market realities and demand structural precision.
            </p>
          </div>
        </div>

        {/* 4 Distinct Principles - Editorial Staggered Layout (No generic 4-card grid) */}
        <div className="space-y-10 sm:space-y-16">
          {principles.map((p, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={p.num}
                className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Text Column */}
                  <div className={`lg:col-span-7 text-left ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-brand-blue border border-black/[0.06]">
                        PRINCIPLE {p.num}
                      </span>
                      <span className="font-mono text-xs tracking-widest text-slate-400 font-bold uppercase">
                        {p.keyword}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug mb-5">
                      "{p.statement}"
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                      {p.description}
                    </p>
                  </div>

                  {/* Visual / Product Fragment Column */}
                  <div className={`lg:col-span-5 w-full ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="rounded-2xl border border-black/[0.08] bg-[#F8FAFC] p-5 sm:p-7 relative overflow-hidden">
                      
                      {/* Fragment Header */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-black/[0.06] pb-3 mb-4">
                        <span className="text-slate-700 font-semibold uppercase">{p.keyword} SPECIFICATION</span>
                        <span>DETERMINISTIC</span>
                      </div>

                      {/* Visual Fragment 1: Clarity (Isolated Structural Geometry) */}
                      {p.visualType === 'clarity' && (
                        <div className="space-y-3">
                          <svg viewBox="0 0 320 100" className="w-full h-auto select-none">
                            <line x1="20" y1="80" x2="100" y2="30" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="100" y1="30" x2="180" y2="70" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="180" y1="70" x2="280" y2="20" stroke="#1D4ED8" strokeWidth="2" />
                            <circle cx="100" cy="30" r="4" fill="#1D4ED8" />
                            <text x="100" y="20" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontFamily="monospace" fontWeight="700">HH 67,400</text>
                            <circle cx="180" cy="70" r="4" fill="#059669" />
                            <text x="180" y="90" textAnchor="middle" fill="#059669" fontSize="8" fontFamily="monospace" fontWeight="700">HL 66,100</text>
                            <circle cx="280" cy="20" r="4" fill="#1D4ED8" />
                            <text x="280" y="14" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontFamily="monospace" fontWeight="700">BOS ▲</text>
                          </svg>
                          <div className="text-[11px] font-mono text-slate-500 bg-white p-2.5 rounded-lg border border-black/[0.06] flex items-center justify-between">
                            <span>Visual Clutter Reduction:</span>
                            <span className="font-semibold text-slate-800">100% Price-Native</span>
                          </div>
                        </div>
                      )}

                      {/* Visual Fragment 2: Context (Multi-Timeframe Horizon) */}
                      {p.visualType === 'context' && (
                        <div className="space-y-2.5 font-mono text-xs">
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-black/[0.06]">
                            <span className="text-slate-500">1D Trend Frame</span>
                            <span className="text-signal-bull font-bold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-signal-bull" />
                              BULLISH EXPANSION
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-black/[0.06]">
                            <span className="text-slate-500">4H Order Flow</span>
                            <span className="text-brand-blue font-bold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-brand-blue" />
                              DEMAND RETEST
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-black/[0.06]">
                            <span className="text-slate-500">15M Execution</span>
                            <span className="text-slate-800 font-bold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-slate-800" />
                              WAITING TRIGGER
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Visual Fragment 3: Discipline (Bar Close Non-Repainting Lock) */}
                      {p.visualType === 'discipline' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded-lg bg-white border border-black/[0.06] space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-400">Signal Verification State:</span>
                              <span className="text-signal-bull font-bold">LOCKED &amp; VERIFIED</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-signal-bull h-full rounded-full w-full" />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                              <span>Candle Status: CLOSED</span>
                              <span>Non-repainting guaranteed</span>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-red-50/60 border border-red-200/60 text-[11px] text-red-800 flex items-center justify-between">
                            <span>Hard Stop Invalidation:</span>
                            <span className="font-bold font-mono">$66,180.00</span>
                          </div>
                        </div>
                      )}

                      {/* Visual Fragment 4: Consistency (Routine Checklist) */}
                      {p.visualType === 'consistency' && (
                        <div className="space-y-2 font-mono text-[11px]">
                          <div className="p-2 rounded bg-white border border-black/[0.06] flex items-center gap-2 text-slate-700">
                            <CheckCircle className="size-3.5 text-signal-bull shrink-0" />
                            <span>Step 01 • Macro Structure Mapped</span>
                          </div>
                          <div className="p-2 rounded bg-white border border-black/[0.06] flex items-center gap-2 text-slate-700">
                            <CheckCircle className="size-3.5 text-signal-bull shrink-0" />
                            <span>Step 02 • Resting Liquidity Identified</span>
                          </div>
                          <div className="p-2 rounded bg-white border border-black/[0.06] flex items-center gap-2 text-slate-700">
                            <CheckCircle className="size-3.5 text-signal-bull shrink-0" />
                            <span>Step 03 • Invalidation Coordinate Fixed</span>
                          </div>
                          <div className="p-2 rounded bg-blue-50 border border-blue-200 flex items-center gap-2 text-brand-blue font-semibold">
                            <span className="size-2 rounded-full bg-brand-blue animate-pulse" />
                            <span>Step 04 • Ready for Execution Trigger</span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PrinciplesSection;
