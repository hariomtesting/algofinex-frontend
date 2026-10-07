import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface ClosingCtaSectionProps {
  onNavigate?: (path: string) => void;
}

export const ClosingCtaSection: React.FC<ClosingCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#EEF2FF]/70 border-b border-[#E0E7FF] text-center">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Icon Glyph */}
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-3xl bg-white border border-[#E0E7FF] flex items-center justify-center shadow-card">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 18L10 11L14 15L20 7" stroke="#4F6BFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="7" r="2.5" fill="#4F6BFF" />
            </svg>
          </div>
        </div>

        {/* Small Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E0E7FF] text-xs font-semibold text-[#4F6BFF] mb-4 shadow-xs">
          <span>Disciplined Execution</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17181C] tracking-tight leading-[1.15]">
          Ready to trade with <br className="hidden sm:inline" />
          <span className="text-[#4F6BFF]">objective clarity?</span>
        </h2>

        {/* Short Supporting Paragraph */}
        <p className="mt-4 text-base sm:text-lg text-[#666B76] max-w-xl mx-auto leading-relaxed">
          Step away from indicator clutter, redraw frustration, and emotional chart-chasing. Trade with clear mathematical structure.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
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
            leftIcon={<ShieldCheck className="size-4 text-[#4F6BFF]" />}
          >
            Try 3-Day Session
          </Button>
        </div>

      </div>
    </section>
  );
};

export default ClosingCtaSection;
