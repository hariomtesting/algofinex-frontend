import React from 'react';
import { Button } from '../ui/Button';
import { LifeBuoy, ArrowRight, MessageSquare } from 'lucide-react';

interface HomeSupportCtaSectionProps {
  onNavigate: (path: string) => void;
}

export const HomeSupportCtaSection: React.FC<HomeSupportCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF7] border-b border-[#EAEAE5] text-left">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-xs font-semibold text-[#4F6BFF] mb-3">
              <LifeBuoy className="size-3.5" />
              <span>Direct Assistance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17181C] tracking-tight">
              Backed by real engineers, not chatbots.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#666B76] leading-relaxed max-w-xl">
              Every client ticket is reviewed directly by our Pine Script developers. Need help connecting your TradingView username or configuring alerts? We respond promptly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:justify-end">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/support')}
              leftIcon={<MessageSquare className="size-4 text-[#4F6BFF]" />}
              rightIcon={<ArrowRight className="size-4" />}
            >
              Client Support Desk
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/how-it-works')}
            >
              How It Works
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeSupportCtaSection;
