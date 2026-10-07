import React from 'react';
import { Button } from '../ui/Button';
import { Users, ArrowRight, Percent, DollarSign } from 'lucide-react';

interface HomeReferralCtaSectionProps {
  onNavigate: (path: string) => void;
}

export const HomeReferralCtaSection: React.FC<HomeReferralCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#080A0D] border-t border-[#20252C]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#101318] border border-[#20252C] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#C8A96B]">
              <Users className="size-3.5" />
              <span className="uppercase tracking-wider font-semibold">PARTNER NETWORK</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] tracking-tight">
              Earn 25% recurring revenue with AlgoFinex.
            </h2>

            <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed max-w-2xl">
              Introduce your trading community, desk colleagues, or students to our institutional indicators. Every active referral generates 25% lifetime recurring commission paid monthly in USDT or direct wire.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#8B929C]">
              <span className="flex items-center gap-1.5 text-[#F3F4F6]">
                <Percent className="size-3.5 text-[#C8A96B]" /> 25% Recurring Rate
              </span>
              <span className="flex items-center gap-1.5 text-[#F3F4F6]">
                <DollarSign className="size-3.5 text-[#6FAF8A]" /> Monthly Automated Payouts
              </span>
              <span className="text-[#6B7380]">• 60-Day Cookie Tracking</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/referral')}
              rightIcon={<ArrowRight className="size-4" />}
            >
              Explore Partner Program
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate('/app')}
            >
              Open Partner Desk
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
