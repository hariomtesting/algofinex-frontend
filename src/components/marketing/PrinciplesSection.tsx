import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

/**
 * SECTION 05 — WHY ALGOFINEX (FOUNDATIONAL PRINCIPLES)
 * Redesigned in LuxAlgo Obsidian Dark aesthetic with neon precision accents.
 * Communicates core product and design principles:
 * CLARITY, CONTEXT, DISCIPLINE, CONSISTENCY.
 */
export const PrinciplesSection: React.FC = () => {
  const principles = [
    {
      num: '01',
      keyword: 'CLARITY',
      statement: 'Remove the noise until only structure remains.',
      description: 'Most retail charting interfaces fail through sensory overload. Traders pile five lagging oscillators over raw price action and end up paralyzed by conflicting signals. AlgoFinex removes everything non-essential, leaving only mathematically validated swing pivots, structural breaks, and resting liquidity pools.',
      visualType: 'clarity',
      accentColor: '#00F090'
    },
    {
      num: '02',
      keyword: 'CONTEXT',
      statement: 'Local price action is meaningless without macro order flow.',
      description: 'A 5-minute bullish pattern inside a daily distribution corridor is a statistical trap. AlgoFinex enforces hierarchical multi-timeframe synchronization, ensuring you never risk capital without verifying that higher-timeframe institutional order flow supports your directional thesis.',
      visualType: 'context',
      accentColor: '#00E5FF'
    },
    {
      num: '03',
      keyword: 'DISCIPLINE',
      statement: 'Deterministic rules replace emotional hesitation.',
      description: 'Discretionary trading fails when fear and greed dictate entries and exits. AlgoFinex indicators are non-repainting and enforce strict bar-close verification. A signal does not exist until the bar locks, and every verified setup carries an unambiguous, pre-calculated invalidation level.',
      visualType: 'discipline',
      accentColor: '#A855F7'
    },
    {
      num: '04',
      keyword: 'CONSISTENCY',
      statement: 'A repeatable operational routine produces durable execution.',
      description: 'Superior indicators are useless without a structured trading routine. Through our 3-Day Session, we embed our indicator suite into a physical 7-step execution checklist—transforming erratic chart gazing into a calm, professional daily routine.',
      visualType: 'consistency',
      accentColor: '#00F090'
    }
  ];

  return (
    <section id="principles" className="relative py-16 sm:py-28 lg:py-40 bg-[#05080E] border-t border-white/10 overflow-hidden">
      
      {/* Editorial Atmospheric Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-5 backdrop-blur-md">
              <Shield className="size-3.5 text-[#00F090] shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-300">
                SECTION 05 • SYSTEM PHILOSOPHY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-white leading-[1.08]">
              Why AlgoFinex:<br />
              <span className="bg-gradient-to-r from-[#00F090] via-teal-300 to-[#00E5FF] bg-clip-text text-transparent">
                Built on four non-negotiable principles.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              We do not fabricate trading records, boast about win rates, or sell automated get-rich-quick schemes. AlgoFinex was engineered for traders who respect market realities and demand structural precision.
            </p>
          </div>
        </div>

        {/* 4 Distinct Principles - Editorial Manifesto Flow (Unboxed, Hairline Separators) */}
        <div className="border-t border-white/10">
          {principles.map((p, idx) => {
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="py-12 sm:py-16 lg:py-20 border-b border-white/10 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  
                  {/* Left Column: Number & Principle Keyword */}
                  <div className="lg:col-span-2 text-left">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white/20 block mb-1">
                      {p.num}
                    </span>
                    <span 
                      className="font-mono text-xs tracking-widest font-bold uppercase"
                      style={{ color: p.accentColor }}
                    >
                      {p.keyword}
                    </span>
                  </div>

                  {/* Middle Column: Monumental Typographic Statement & Editorial Copy */}
                  <div className="lg:col-span-6 text-left">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-snug mb-5">
                      "{p.statement}"
                    </h3>

                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>

                  {/* Right Column: Minimalist Visual Fragment */}
                  <div className="lg:col-span-4 w-full">
                    <div className="rounded-2xl border border-white/10 bg-[#0A0E1A]/80 backdrop-blur-md p-5 sm:p-6 shadow-xl">
                      
                      {/* Fragment Header */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/10 pb-2.5 mb-3.5">
                        <span className="text-white font-bold uppercase">{p.keyword} SPECIFICATION</span>
                        <span className="text-[#00F090] font-semibold">DETERMINISTIC</span>
                      </div>

                      {/* Visual Fragment 1: Clarity */}
                      {p.visualType === 'clarity' && (
                        <div className="space-y-3">
                          <svg viewBox="0 0 320 85" className="w-full h-auto select-none">
                            <line x1="20" y1="70" x2="100" y2="25" stroke="#00E5FF" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="100" y1="25" x2="180" y2="60" stroke="#00F090" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="180" y1="60" x2="280" y2="15" stroke="#00E5FF" strokeWidth="2" />
                            <circle cx="100" cy="25" r="3.5" fill="#00E5FF" filter="drop-shadow(0 0 4px #00E5FF)" />
                            <text x="100" y="16" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace" fontWeight="700">HH 67,400</text>
                            <circle cx="180" cy="60" r="3.5" fill="#00F090" filter="drop-shadow(0 0 4px #00F090)" />
                            <text x="180" y="78" textAnchor="middle" fill="#00F090" fontSize="8" fontFamily="monospace" fontWeight="700">HL 66,100</text>
                            <circle cx="280" cy="15" r="3.5" fill="#00E5FF" filter="drop-shadow(0 0 4px #00E5FF)" />
                            <text x="280" y="10" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace" fontWeight="700">BOS ▲</text>
                          </svg>
                          <div className="text-[10px] font-mono text-slate-400 bg-white/[0.03] p-2 rounded-lg border border-white/5 flex items-center justify-between">
                            <span>Visual Clutter Reduction:</span>
                            <span className="font-semibold text-[#00F090]">100% Price-Native</span>
                          </div>
                        </div>
                      )}

                      {/* Visual Fragment 2: Context */}
                      {p.visualType === 'context' && (
                        <div className="space-y-2 font-mono text-[11px]">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
                            <span className="text-slate-400">1D Trend Frame</span>
                            <span className="text-[#00F090] font-bold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-[#00F090] shadow-[0_0_6px_#00F090]" />
                              BULLISH
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
                            <span className="text-slate-400">4H Order Flow</span>
                            <span className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
                              DEMAND RETEST
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
                            <span className="text-slate-400">15M Trigger</span>
                            <span className="text-slate-300 font-bold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-emerald-400" />
                              ALIGNED
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Visual Fragment 3: Discipline */}
                      {p.visualType === 'discipline' && (
                        <div className="space-y-2.5 font-mono text-[11px]">
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Signal Verification:</span>
                              <span className="text-[#00F090] font-bold">LOCKED &amp; VERIFIED</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                              <span>Candle Status: CLOSED</span>
                              <span className="text-[#00E5FF]">Non-repainting</span>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[10px] text-[#FF3B69] flex items-center justify-between">
                            <span>Hard Stop Invalidation:</span>
                            <span className="font-bold font-mono">$66,180.00</span>
                          </div>
                        </div>
                      )}

                      {/* Visual Fragment 4: Consistency */}
                      {p.visualType === 'consistency' && (
                        <div className="space-y-1.5 font-mono text-[10px]">
                          <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2 text-slate-300">
                            <CheckCircle className="size-3 text-[#00F090] shrink-0" />
                            <span>Step 01 • Macro Structure Mapped</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2 text-slate-300">
                            <CheckCircle className="size-3 text-[#00F090] shrink-0" />
                            <span>Step 02 • Resting Liquidity Identified</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2 text-[#00E5FF] font-semibold">
                            <span className="size-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_6px_#00E5FF]" />
                            <span>Step 03 • Invalidation Coordinate Fixed</span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PrinciplesSection;
