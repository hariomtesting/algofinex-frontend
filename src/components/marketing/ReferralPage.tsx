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
    <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-2xl mx-auto pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFBF6] border border-[#35C99A]/20 text-xs font-medium text-[#059669] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#35C99A]" />
            <span>PARTNER PROGRAM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17181C] tracking-tight leading-tight">
            AlgoFinex Partner &amp; Referral Program.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#666B76] leading-relaxed">
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
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/login')}
            >
              Partner Login
            </Button>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-8 rounded-3xl bg-white border border-[#EAEAE5] shadow-card">
            <div className="size-12 rounded-2xl bg-[#ECFBF6] flex items-center justify-center mb-4">
              <Percent className="size-6 text-[#059669]" />
            </div>
            <h3 className="text-base font-bold text-[#17181C]">25% Recurring Lifetime</h3>
            <p className="text-xs sm:text-sm text-[#666B76] mt-2 leading-relaxed">
              Receive 25% on every renewal for as long as your referred trader remains an active subscriber.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#EAEAE5] shadow-card">
            <div className="size-12 rounded-2xl bg-[#ECFBF6] flex items-center justify-center mb-4">
              <DollarSign className="size-6 text-[#059669]" />
            </div>
            <h3 className="text-base font-bold text-[#17181C]">Monthly Payouts</h3>
            <p className="text-xs sm:text-sm text-[#666B76] mt-2 leading-relaxed">
              Automated payouts via USDT (TRC20/ERC20) or direct international bank wire on the 1st of every calendar month.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#EAEAE5] shadow-card">
            <div className="size-12 rounded-2xl bg-[#ECFBF6] flex items-center justify-center mb-4">
              <TrendingUp className="size-6 text-[#059669]" />
            </div>
            <h3 className="text-base font-bold text-[#17181C]">60-Day Cookie Window</h3>
            <p className="text-xs sm:text-sm text-[#666B76] mt-2 leading-relaxed">
              First-touch tracking with 60-day cookie attribution ensures you receive full credit when visitors convert.
            </p>
          </div>
        </div>

        {/* Interactive Partner Earnings Calculator */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-[#EAEAE5] shadow-card text-left">
          <SectionHeading
            eyebrow="EARNINGS ESTIMATOR"
            title="Calculate your monthly partner revenue"
            align="left"
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <label className="text-xs font-semibold uppercase text-[#666B76] block mb-3">
                Referred Active Subscribers: <strong className="text-[#17181C] text-lg ml-1 font-mono">{estimatedTraders}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={estimatedTraders}
                onChange={(e) => setEstimatedTraders(Number(e.target.value))}
                className="w-full accent-[#35C99A] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#666B76] mt-2">
                <span>1 trader</span>
                <span>50 traders</span>
                <span>100 traders</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-[#ECFBF6] border border-[#35C99A]/20 text-center">
              <p className="text-xs font-semibold text-[#059669] uppercase tracking-wider">Estimated Monthly Recurring</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#059669] font-mono mt-2">
                ${estimatedMonthlyIncome.toLocaleString()} <span className="text-base font-normal">/ mo</span>
              </p>
              <p className="text-[11px] text-[#666B76] mt-2">
                Based on $79/mo suite subscription @ 25% commission rate
              </p>
            </div>
          </div>
        </div>

        {/* Program Rules */}
        <div className="mt-16 text-left border-t border-[#EAEAE5] pt-12">
          <h3 className="text-xl font-bold text-[#17181C] mb-4">Partner Ethics &amp; Program Standards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-[#666B76]">
            <div className="p-6 rounded-2xl bg-white border border-[#EAEAE5] shadow-xs">
              <strong className="text-[#17181C] font-bold block mb-1">Ethical Marketing Only:</strong>
              No spam, misleading get-rich-quick claims, or deceptive advertising permitted. Violators are immediately removed.
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#EAEAE5] shadow-xs">
              <strong className="text-[#17181C] font-bold block mb-1">Minimum Payout Threshold:</strong>
              $100.00 USD minimum balance required to initiate withdrawal to your connected crypto wallet or bank account.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
