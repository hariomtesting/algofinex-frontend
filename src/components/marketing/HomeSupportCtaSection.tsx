import React from 'react';
import { Button } from '../ui/Button';
import { LifeBuoy, ArrowRight, MessageSquare } from 'lucide-react';

interface HomeSupportCtaSectionProps {
  onNavigate: (path: string) => void;
}

export const HomeSupportCtaSection: React.FC<HomeSupportCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#080A0D] border-t border-[#20252C] text-left">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#C8A96B] mb-3">
              <LifeBuoy className="size-3.5" />
              <span className="uppercase tracking-wider font-semibold">DIRECT ASSISTANCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] tracking-tight">
              Backed by technical engineers, not chatbots.
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-[#8B929C] leading-relaxed max-w-xl">
              Every client ticket is handled directly by our Pine Script developers and market analysts. Need custom webhook alert JSON schemas or assistance binding your TradingView username? We are here to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:justify-end">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/support')}
              leftIcon={<MessageSquare className="size-4 text-[#C8A96B]" />}
              rightIcon={<ArrowRight className="size-4" />}
            >
              Client Support Desk
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/how-it-works')}
            >
              Documentation
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
