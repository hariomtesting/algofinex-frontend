import React from 'react';
import { motion } from 'framer-motion';
import { HeroProductTerminal } from './HeroProductTerminal';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero"
      aria-label="AlgoFinex Platform Introduction"
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-[#FAFAF7]"
    >
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-column layout: Left Thesis / Right Product Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Focused Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Small Colourful Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-xs font-medium text-[#4F6BFF] mb-5 w-fit shadow-xs">
              <Sparkles className="size-3.5 text-[#4F6BFF]" />
              <span>Modern Quantitative Indicator Suite</span>
            </div>

            {/* Clear, Controlled Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17181C] leading-[1.12]">
              Trading tools, <br className="hidden sm:inline" />
              <span className="text-[#4F6BFF]">without the noise.</span>
            </h1>

            {/* Short Supporting Paragraph */}
            <p className="mt-5 text-base sm:text-lg text-[#666B76] font-normal leading-relaxed max-w-lg">
              Simple, powerful tools designed to help traders read market structure, spot key imbalances, and execute with clarity.
            </p>

            {/* Clear Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/products')}
                rightIcon={<ChevronRight className="size-4" />}
              >
                Explore Products
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('/session')}
              >
                Try 3-Day Session
              </Button>
            </div>

            {/* Simple highlights */}
            <div className="mt-10 pt-6 border-t border-[#EAEAE5] flex flex-wrap items-center gap-6 text-xs text-[#666B76]">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#35C99A]" />
                <span className="font-medium text-[#17181C]">Non-repainting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#4F6BFF]" />
                <span className="font-medium text-[#17181C]">Bar-close verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#8B5CF6]" />
                <span className="font-medium text-[#17181C]">Pine Script v5</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Approchable Product Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-7 w-full min-w-0"
          >
            <HeroProductTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
