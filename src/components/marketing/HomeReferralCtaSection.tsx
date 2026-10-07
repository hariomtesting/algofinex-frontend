import React from 'react';
import { Button } from '../ui/Button';
import { Users, ArrowRight, Percent, DollarSign } from 'lucide-react';

interface HomeReferralCtaSectionProps {
  onNavigate: (path: string) => void;
}

export const HomeReferralCtaSection: React.FC<HomeReferralCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF7] border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#ECFBF6]/80 border border-[#A7F3D0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left shadow-xs">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#A7F3D0] text-xs font-semibold text-[#059669]">
              <Users className="size-3.5" />
              <span>Partner &amp; Affiliate Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17181C] tracking-tight">
              Earn 25% recurring commission with AlgoFinex.
            </h2>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
              Introduce your trading peers, desk colleagues, or community to our tools. Earn a 25% lifetime recurring share on every active subscription.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#4B5563]">
              <span className="flex items-center gap-1.5 font-medium text-[#17181C]">
                <Percent className="size-3.5 text-[#059669]" /> 25% Lifetime Share
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#17181C]">
                <DollarSign className="size-3.5 text-[#059669]" /> Monthly Automated Payouts
              </span>
              <span className="text-[#6B7280]">• Transparent Affiliate Telemetry</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-[#059669] hover:bg-[#047857]"
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
              Open Affiliate Dashboard
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeReferralCtaSection;
