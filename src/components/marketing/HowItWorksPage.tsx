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
    <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-2xl mx-auto pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#4F6BFF]/20 text-xs font-medium text-[#4F6BFF] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#4F6BFF]" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17181C] tracking-tight leading-tight">
            How AlgoFinex Works.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#666B76] leading-relaxed">
            A 4-strata analytical model engineered to eliminate discretionary noise and anchor every trading decision to verifiable market geometry.
          </p>
        </div>

        {/* 4 Strata Architecture Deep Dive */}
        <div className="mt-12 text-left">
          <SectionHeading
            eyebrow="ANALYTICAL STRATA"
            title="The 4 Coordinated System Layers"
            description="Indicators should never operate in isolation. AlgoFinex connects structure, liquidity, trend, and execution into one unified workflow."
          />

          <div className="mt-10 space-y-6">
            {SYSTEM_LAYERS.map((layer) => (
              <div
                key={layer.id}
                className="p-8 rounded-3xl bg-white border border-[#EAEAE5] shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-1 flex items-center justify-center">
                  <span className="size-12 rounded-2xl bg-[#EEF2FF] text-[#4F6BFF] flex items-center justify-center font-mono font-bold text-lg">
                    {layer.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <Badge variant="accent" className="mb-2">{layer.badge}</Badge>
                  <h3 className="text-xl font-bold text-[#17181C]">{layer.name}</h3>
                  <p className="text-xs font-semibold text-[#4F6BFF] mt-1">{layer.tagline}</p>
                  <p className="text-xs sm:text-sm text-[#666B76] mt-3 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-[#FAFAF7] p-5 rounded-2xl border border-[#EAEAE5]">
                  <p className="text-[11px] font-semibold text-[#666B76] uppercase tracking-wider mb-2.5">
                    Key Algorithmic Checks:
                  </p>
                  <ul className="space-y-2">
                    {layer.capabilities.map((cap, capIdx) => (
                      <li key={capIdx} className="text-xs text-[#17181C] flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-[#4F6BFF] mt-1.5 shrink-0" />
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
        <div className="mt-20 text-left border-t border-[#EAEAE5] pt-16">
          <SectionHeading
            eyebrow="EXECUTION DISCIPLINE"
            title="The 7-Step Operational Routine"
            description="The exact pre-market to post-trade checklist built into our methodology."
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TRADING_ROUTINE_STEPS.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-white border border-[#EAEAE5] shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#F0F1EE] pb-3 mb-3">
                    <span className="text-xs font-mono font-bold text-[#4F6BFF]">STEP {step.num}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF]">
                      {step.phase}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#17181C]">{step.title}</h4>
                  <p className="text-xs text-[#666B76] mt-2 leading-relaxed">
                    {step.objective}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F0F1EE]">
                  <p className="text-[11px] font-medium text-[#059669] leading-snug">
                    RULE: {step.rule}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Standard: Zero-Repaint Guarantee */}
        <div className="mt-20 p-10 rounded-3xl bg-[#EEF2FF] border border-[#4F6BFF]/20 text-left">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-3">TECHNICAL CREDIBILITY</Badge>
            <h3 className="text-2xl font-bold text-[#17181C]">
              Why Bar-Close Locking Matters
            </h3>
            <p className="mt-3 text-sm text-[#666B76] leading-relaxed">
              Many commercial indicators create the illusion of profitability by moving historical arrows or repainting wicks after prices move.
              AlgoFinex enforces strict bar-close locking in Pine Script v5: when a candle closes, the algorithm evaluates conditions once, renders the marker permanently, and establishes a fixed risk invalidation line. What you see on backtests is identical to what occurred in live conditions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
