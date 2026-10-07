import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { 
  Code2, 
  Lock, 
  Terminal, 
  Zap 
} from 'lucide-react';

export const HomeTrustSection: React.FC = () => {
  const standards = [
    {
      icon: Lock,
      title: 'Zero-Repaint Guarantee',
      description: 'Calculations evaluate only upon bar completion. Signals never adjust, shift, or disappear once the candle closes.',
      badge: 'DETERMINISTIC'
    },
    {
      icon: Code2,
      title: 'Native Pine Script v5',
      description: 'Built natively in TradingView v5 with optimized array caching, ensuring smooth chart rendering without browser lag.',
      badge: 'OFFICIAL STANDARD'
    },
    {
      icon: Terminal,
      title: 'Objective Market Geometry',
      description: 'Higher-high / higher-low sequences and breaks of structure (BOS) are mathematical, not discretionary trendlines.',
      badge: 'STRUCTURAL EDGE'
    },
    {
      icon: Zap,
      title: 'Universal Market Compatibility',
      description: 'Operational across Crypto, US Equities, Global Indices, Forex, and Commodities on all timeframe intervals.',
      badge: 'CROSS-ASSET'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#080A0D] border-t border-[#20252C] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ENGINEERING INTEGRITY"
          title="Verifiable technical standards."
          description="We do not make deceptive claims, publish fabricated trading screenshots, or promote get-rich-quick narratives. AlgoFinex is built on sound financial engineering."
        />

        {/* Standards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#101318] border border-[#20252C] hover:border-[#2E3642] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="size-9 rounded-lg bg-[#141820] border border-[#20252C] flex items-center justify-center">
                    <Icon className="size-4 text-[#C8A96B]" />
                  </div>
                  <Badge variant="neutral">{s.badge}</Badge>
                </div>

                <h3 className="text-base font-bold text-[#F3F4F6] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-[#8B929C] leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
