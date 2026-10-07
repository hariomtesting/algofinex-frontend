import React from 'react';
import { SYSTEM_LAYERS, TRADING_ROUTINE_STEPS } from '../../data/productExperienceData';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto pt-6 pb-12 border-b border-[#20252C]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141820] border border-[#20252C] text-xs font-mono text-[#C8A96B] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#C8A96B]" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
            How AlgoFinex Works.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B929C] leading-relaxed">
            A 4-strata analytical model engineered to eliminate discretionary noise and anchor every trading decision to verifiable market geometry.
          </p>
        </div>

        {/* 4 Strata Architecture Deep Dive */}
        <div className="mt-16 text-left">
          <SectionHeading
            eyebrow="ANALYTICAL STRATA"
            title="The 4 Coordinated System Layers"
            description="Indicators should never operate in isolation. AlgoFinex connects structure, liquidity, trend, and execution into one unified workflow."
          />

          <div className="mt-12 space-y-6">
            {SYSTEM_LAYERS.map((layer) => (
              <div
                key={layer.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#101318] border border-[#20252C] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-1 flex items-center justify-center">
                  <span className="text-2xl font-mono font-bold text-[#C8A96B]">
                    {layer.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <Badge variant="accent" className="mb-2">{layer.badge}</Badge>
                  <h3 className="text-xl font-bold text-[#F3F4F6]">{layer.name}</h3>
                  <p className="text-xs font-mono text-[#C8A96B] mt-1">{layer.tagline}</p>
                  <p className="text-xs sm:text-sm text-[#8B929C] mt-3 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-[#0B0E13] p-4 rounded-xl border border-[#20252C]">
                  <p className="text-[10px] font-mono text-[#6B7380] uppercase tracking-wider mb-2">
                    Key Algorithmic Checks:
                  </p>
                  <ul className="space-y-1.5">
                    {layer.capabilities.map((cap, capIdx) => (
                      <li key={capIdx} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                        <span className="size-1 rounded-full bg-[#C8A96B] mt-1.5 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 7-Step Discipline Routine */}
        <div className="mt-20 text-left border-t border-[#20252C] pt-16">
          <SectionHeading
            eyebrow="EXECUTION DISCIPLINE"
            title="The 7-Step Operational Routine"
            description="The exact pre-market to post-trade checklist built into our methodology."
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TRADING_ROUTINE_STEPS.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-xl bg-[#101318] border border-[#20252C] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#20252C] pb-2.5 mb-3">
                    <span className="text-xs font-mono font-bold text-[#C8A96B]">STEP {step.num}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#181E28] text-[#8B929C]">
                      {step.phase}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#F3F4F6]">{step.title}</h4>
                  <p className="text-xs text-[#8B929C] mt-2 leading-relaxed">
                    {step.objective}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#1C2128]">
                  <p className="text-[10px] font-mono text-[#6FAF8A] leading-snug">
                    RULE: {step.rule}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Standard: Zero-Repaint Guarantee */}
        <div className="mt-20 p-8 rounded-2xl bg-[#101318] border border-[#20252C] text-left">
          <div className="max-w-3xl">
            <Badge variant="success" className="mb-3">TECHNICAL CREDIBILITY</Badge>
            <h3 className="text-2xl font-bold text-[#F3F4F6]">
              Why Bar-Close Locking Matters
            </h3>
            <p className="mt-3 text-sm text-[#8B929C] leading-relaxed">
              Many commercial indicators create the illusion of profitability by moving historical arrows or repainting wicks after prices move.
              AlgoFinex enforces strict bar-close locking in Pine Script v5: when a candle closes, the algorithm evaluates conditions once, renders the marker permanently, and establishes a fixed risk invalidation line. What you see on backtests is identical to what occurred in live conditions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigate('/products')}
                rightIcon={<ArrowRight className="size-4" />}
              >
                Inspect Indicator Catalog
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigate('/session')}
              >
                Test in 3-Day Session
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
