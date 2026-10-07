import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { 
  DollarSign, 
  Percent, 
  ArrowRight, 
  TrendingUp 
} from 'lucide-react';

interface ReferralPageProps {
  onNavigate: (path: string) => void;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({ onNavigate }) => {
  const [estimatedTraders, setEstimatedTraders] = useState<number>(10);
  const monthlyCommissionPerTrader = 79 * 0.25; // 25% of $79
  const estimatedMonthlyIncome = Math.round(estimatedTraders * monthlyCommissionPerTrader);

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto pt-6 pb-12 border-b border-[#20252C]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141820] border border-[#20252C] text-xs font-mono text-[#C8A96B] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#C8A96B]" />
            <span>PARTNER PROGRAM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
            AlgoFinex Partner &amp; Referral Program.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B929C] leading-relaxed">
            Earn 25% recurring monthly and annual commissions by introducing serious traders, analysts, and trading communities to our institutional indicator suite.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/app')}
              rightIcon={<ArrowRight className="size-4" />}
            >
              Open Referral Dashboard
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/login')}
            >
              Partner Login
            </Button>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-xl bg-[#101318] border border-[#20252C]">
            <Percent className="size-6 text-[#C8A96B] mb-3" />
            <h3 className="text-base font-bold text-[#F3F4F6]">25% Recurring Lifetime</h3>
            <p className="text-xs sm:text-sm text-[#8B929C] mt-2 leading-relaxed">
              Receive 25% on every renewal for as long as your referred trader remains an active subscriber.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#101318] border border-[#20252C]">
            <DollarSign className="size-6 text-[#6FAF8A] mb-3" />
            <h3 className="text-base font-bold text-[#F3F4F6]">Monthly Payouts</h3>
            <p className="text-xs sm:text-sm text-[#8B929C] mt-2 leading-relaxed">
              Automated payouts via USDT (TRC20/ERC20) or direct international bank wire on the 1st of every calendar month.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#101318] border border-[#20252C]">
            <TrendingUp className="size-6 text-[#C8A96B] mb-3" />
            <h3 className="text-base font-bold text-[#F3F4F6]">60-Day Cookie Window</h3>
            <p className="text-xs sm:text-sm text-[#8B929C] mt-2 leading-relaxed">
              First-touch tracking with 60-day cookie attribution ensures you receive full credit when visitors convert.
            </p>
          </div>
        </div>

        {/* Interactive Partner Earnings Calculator */}
        <div className="mt-16 p-8 rounded-2xl bg-[#101318] border border-[#20252C] text-left">
          <SectionHeading
            eyebrow="EARNINGS ESTIMATOR"
            title="Calculate your monthly partner revenue"
            align="left"
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <label className="text-xs font-mono uppercase text-[#8B929C] block mb-2">
                Referred Active Subscribers: <strong className="text-[#F3F4F6] text-base">{estimatedTraders}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={estimatedTraders}
                onChange={(e) => setEstimatedTraders(Number(e.target.value))}
                className="w-full accent-[#C8A96B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#6B7380] mt-1">
                <span>1 trader</span>
                <span>50 traders</span>
                <span>100 traders</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-[#0B0E13] border border-[#20252C] text-center">
              <p className="text-xs font-mono text-[#8B929C] uppercase">Estimated Monthly Recurring</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C8A96B] font-mono mt-1">
                ${estimatedMonthlyIncome.toLocaleString()} / mo
              </p>
              <p className="text-[11px] text-[#6B7380] mt-1">
                Based on $79/mo suite subscription @ 25% commission rate
              </p>
            </div>
          </div>
        </div>

        {/* Program Rules */}
        <div className="mt-16 text-left border-t border-[#20252C] pt-12">
          <h3 className="text-xl font-bold text-[#F3F4F6] mb-4">Partner Ethics &amp; Program Standards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#8B929C]">
            <div className="p-4 rounded-xl bg-[#101318] border border-[#20252C]">
              <strong className="text-[#F3F4F6] block mb-1">Ethical Marketing Only:</strong>
              No spam, misleading get-rich-quick claims, or deceptive advertising permitted. Violators are immediately removed.
            </div>
            <div className="p-4 rounded-xl bg-[#101318] border border-[#20252C]">
              <strong className="text-[#F3F4F6] block mb-1">Minimum Payout Threshold:</strong>
              $100.00 USD minimum balance required to initiate withdrawal to your connected crypto wallet or bank account.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
