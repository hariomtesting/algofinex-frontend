import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface ClosingCtaSectionProps {
  onNavigate?: (path: string) => void;
}

export const ClosingCtaSection: React.FC<ClosingCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-20 sm:py-24 bg-[#080A0D] border-t border-[#20252C] overflow-hidden text-center">
      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Brand Glyph Display */}
        <div className="flex justify-center mb-6">
          <div className="size-14 rounded-2xl bg-[#141820] border border-[#20252C] flex items-center justify-center shadow-xs">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 18L10 11L14 15L20 7" stroke="#C8A96B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="7" r="2.5" fill="#C8A96B" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#8B929C] mb-4">
          <span className="size-1.5 rounded-full bg-[#C8A96B]" />
          <span className="tracking-widest uppercase font-semibold text-[11px] text-[#C8A96B]">
            DISCIPLINED EXECUTION
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
          Read the market with <br />
          <span className="text-[#C8A96B]">institutional clarity.</span>
        </h2>

        {/* Supporting Thought */}
        <p className="mt-4 text-sm sm:text-base text-[#8B929C] max-w-xl mx-auto leading-relaxed">
          Step away from subjective guessing, indicator overlap, and emotional chart chasing. Experience how disciplined market structure, multi-timeframe context, and an iron 7-step routine transform your trading.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => onNavigate ? onNavigate('/pricing') : undefined}
            rightIcon={<ChevronRight className="size-4" />}
          >
            Get Started with AlgoFinex
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => onNavigate ? onNavigate('/session') : undefined}
            leftIcon={<ShieldCheck className="size-4 text-[#C8A96B]" />}
          >
            Try the 3-Day Session
          </Button>
        </div>

      </div>
    </section>
  );
};
