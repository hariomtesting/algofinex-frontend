import React from 'react';
import { Lock, Code2, Terminal, Zap } from 'lucide-react';

export const HomeTrustSection: React.FC = () => {
  const standards = [
    {
      icon: Lock,
      title: 'Zero-Repaint Guarantee',
      description: 'Calculations evaluate strictly upon bar completion. Signals never adjust, shift, or disappear once the candle closes.',
      accent: 'text-[#059669]',
      bg: 'bg-[#ECFBF6]',
    },
    {
      icon: Code2,
      title: 'Native Pine Script v5',
      description: 'Built natively in TradingView v5 with optimized array caching, ensuring smooth chart rendering without browser lag.',
      accent: 'text-[#4F6BFF]',
      bg: 'bg-[#EEF2FF]',
    },
    {
      icon: Terminal,
      title: 'Objective Market Math',
      description: 'Higher-high / higher-low sequences and breaks of structure (BOS) are mathematical, not discretionary trendlines.',
      accent: 'text-[#8B5CF6]',
      bg: 'bg-[#F4F0FF]',
    },
    {
      icon: Zap,
      title: 'Universal Markets',
      description: 'Fully compatible across Crypto, US Equities, Global Indices, Forex, and Commodities on all timeframe intervals.',
      accent: 'text-[#D97706]',
      bg: 'bg-[#FFF8E1]',
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-[#EEF2FF] px-3.5 py-1 rounded-full border border-[#E0E7FF] shadow-xs">
            Standards & Integrity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            Transparent by design.
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            No deceptive win-rate claims or black-box trading bots. Just rigorous mathematical tools.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-[#EAEAE5] shadow-xs hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`size-11 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                    <Icon className={`size-5 ${s.accent}`} />
                  </div>

                  <h3 className="text-base font-bold text-[#17181C] tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#666B76] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeTrustSection;
