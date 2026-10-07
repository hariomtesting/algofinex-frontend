import React from 'react';
import { motion } from 'framer-motion';

export const PrinciplesSection: React.FC = () => {
  const principles = [
    {
      num: '01',
      keyword: 'CLARITY',
      statement: 'Remove the noise until only structure remains.',
      description: 'Most retail charting interfaces fail through sensory overload. Traders pile five lagging oscillators over raw price action and end up paralyzed by conflicting signals. AlgoFinex removes everything non-essential, leaving only mathematically validated swing pivots, structural breaks, and resting liquidity pools.',
      accentColor: '#C8A96B'
    },
    {
      num: '02',
      keyword: 'CONTEXT',
      statement: 'Local price action is meaningless without macro order flow.',
      description: 'A 5-minute bullish pattern inside a daily distribution corridor is a statistical trap. AlgoFinex enforces hierarchical multi-timeframe synchronization, ensuring you never risk capital without verifying that higher-timeframe institutional order flow supports your directional thesis.',
      accentColor: '#6FAF8A'
    },
    {
      num: '03',
      keyword: 'DISCIPLINE',
      statement: 'Deterministic rules replace emotional hesitation.',
      description: 'Discretionary trading fails when fear and greed dictate entries and exits. AlgoFinex indicators are non-repainting and enforce strict bar-close verification. A signal does not exist until the bar locks, and every verified setup carries an unambiguous, pre-calculated invalidation level.',
      accentColor: '#C8A96B'
    },
    {
      num: '04',
      keyword: 'CONSISTENCY',
      statement: 'A repeatable operational routine produces durable execution.',
      description: 'Superior indicators are useless without a structured trading routine. Through our 3-Day Session, we embed our indicator suite into a physical 7-step execution checklist—transforming erratic chart gazing into a calm, professional daily routine.',
      accentColor: '#6FAF8A'
    }
  ];

  return (
    <section id="principles" className="relative py-16 sm:py-20 lg:py-24 bg-[#080A0D] border-t border-[#20252C] overflow-hidden">
      
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#8B929C] mb-4">
              <span className="size-1.5 rounded-full bg-[#C8A96B]" />
              <span className="tracking-widest uppercase text-[11px] font-semibold text-[#C8A96B]">
                SYSTEM PHILOSOPHY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
              Why AlgoFinex:<br />
              <span className="text-[#C8A96B]">
                Built on four non-negotiable principles.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-left flex flex-col justify-end">
            <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed">
              We do not fabricate trading records, boast about win rates, or sell automated get-rich-quick schemes. AlgoFinex was engineered for traders who respect market realities and demand structural precision.
            </p>
          </div>
        </div>

        {/* 4 Distinct Principles */}
        <div className="border-t border-[#20252C]">
          {principles.map((p, idx) => {
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="py-10 sm:py-14 border-b border-[#20252C] transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  
                  {/* Left Column: Number & Principle Keyword */}
                  <div className="lg:col-span-3 text-left">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#4B5563] block mb-1">
                      {p.num}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-mono tracking-tight text-[#F3F4F6]">
                      {p.keyword}
                    </h3>
                  </div>

                  {/* Middle Column: Core Thesis Statement */}
                  <div className="lg:col-span-4 text-left">
                    <p className="text-base sm:text-lg font-bold text-[#F3F4F6] leading-snug">
                      "{p.statement}"
                    </p>
                  </div>

                  {/* Right Column: Detailed Elaboration */}
                  <div className="lg:col-span-5 text-left">
                    <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed">
                      {p.description}
                    </p>
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
