import React from 'react';
import { motion } from 'framer-motion';
import { HeroProductTerminal } from './HeroProductTerminal';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero"
      aria-label="AlgoFinex Platform Introduction"
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-[#080A0D] border-b border-[#20252C]"
    >
      {/* Restrained institutional ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-financial-grid opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-radial-ambient opacity-50" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-column layout: Left Thesis / Right Terminal Prototype */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Institutional Thesis */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#8B929C] mb-4 w-fit">
              <span className="size-1.5 rounded-full bg-[#C8A96B]" />
              <span className="uppercase tracking-widest text-[11px] font-medium text-[#C8A96B]">
                TRADING TECHNOLOGY
              </span>
              <span className="text-[#3B4654]">•</span>
              <span className="text-[11px] text-[#8B929C]">Pine Script v5 Standard</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
              Trade with a <br className="hidden sm:inline" />
              <span className="text-[#C8A96B]">clearer system.</span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 text-sm sm:text-base text-[#8B929C] font-normal leading-relaxed max-w-lg">
              Professional trading tools built to help traders structure, analyse and execute their ideas with greater clarity. Deterministic swing pivots, institutional order imbalances, and strictly non-repainting execution triggers.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/products')}
                rightIcon={<ChevronRight className="size-4" />}
              >
                Explore Indicators
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('/session')}
                leftIcon={<ShieldCheck className="size-4 text-[#C8A96B]" />}
              >
                Try the 3-Day Session
              </Button>
            </div>

            {/* Trust points - Technically credible standards */}
            <div className="mt-8 pt-6 border-t border-[#20252C] grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-mono font-medium text-[#F3F4F6]">100%</p>
                <p className="text-[11px] text-[#8B929C] mt-0.5">Bar-close locked</p>
              </div>
              <div>
                <p className="text-xs font-mono font-medium text-[#F3F4F6]">Zero Repaint</p>
                <p className="text-[11px] text-[#8B929C] mt-0.5">Deterministic logic</p>
              </div>
              <div>
                <p className="text-xs font-mono font-medium text-[#F3F4F6]">All Assets</p>
                <p className="text-[11px] text-[#8B929C] mt-0.5">Crypto, FX, Indices</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Realistic Chart Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-7 w-full min-w-0"
          >
            <HeroProductTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
