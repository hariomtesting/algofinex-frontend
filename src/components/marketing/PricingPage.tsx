import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { SubscriptionPlan } from '../../types/api';

interface PricingPageProps {
  onNavigate: (path: string, state?: any) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'monthly' as SubscriptionPlan,
      name: 'Monthly Suite',
      badge: 'FLEXIBLE',
      price: '$79',
      period: 'per month',
      description: 'Ideal for testing algorithmic market structure tools with zero long-term commitment.',
      features: [
        'Complete AlgoFinex Indicator Suite (4 Indicators)',
        'TradingView Pine Script v5 Access',
        'Strict Bar-Close Non-Repainting Signals',
        'Standard Discord Community Access',
        'Real-Time Webhook Alert Templates',
        'Cancel Anytime With 1 Click',
      ],
      popular: false,
    },
    {
      id: 'annual' as SubscriptionPlan,
      name: 'Annual Suite',
      badge: 'MOST POPULAR',
      savings: 'Save $240 / Year',
      price: '$59',
      period: 'per month ($708 billed annually)',
      description: 'The standard choice for active traders committed to a disciplined systematic framework.',
      features: [
        'Everything in Monthly Suite',
        'Complimentary Seat: 3-Day Execution Masterclass ($299 Value)',
        'Multi-Timeframe Structure Presets (Crypto & NQ)',
        'Priority Technical Support Desk',
        'Dedicated Indicator Sensitivity Customizer',
        'Early Access to New Pine Script Modules',
      ],
      popular: true,
    },
    {
      id: 'lifetime' as SubscriptionPlan,
      name: 'Lifetime Founder',
      badge: 'PERMANENT ACCESS',
      price: '$1,490',
      period: 'one-time payment',
      description: 'Permanent whitelisting and perpetual updates for institutional desks and long-term operators.',
      features: [
        'Perpetual Whitelisting for All Current & Future Scripts',
        'VIP Private Desk with AlgoFinex Developers',
        'Unlimited TradingView Account Relocations',
        'Full 3-Day Execution Masterclass & Recordings',
        'Custom Webhook Integration Consultation',
        'One-Time Fee — Never Pay Subscriptions Again',
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    onNavigate('/checkout', { selectedPlan: plan });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#4F6BFF]/20 text-xs font-medium text-[#4F6BFF] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#4F6BFF]" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17181C] tracking-tight leading-tight">
            Institutional tools. Honest terms.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#666B76] leading-relaxed">
            All plans include the complete indicator suite, TradingView script whitelisting, and strict non-repainting guarantees.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-white border border-[#EAEAE5] shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#4F6BFF] text-white shadow-xs'
                  : 'text-[#666B76] hover:text-[#17181C]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#4F6BFF] text-white shadow-xs'
                  : 'text-[#666B76] hover:text-[#17181C]'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-[#EEF2FF] text-[#4F6BFF]'
              }`}>
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 border ${
                p.popular
                  ? 'bg-white border-2 border-[#4F6BFF] shadow-card-hover relative'
                  : 'bg-white border border-[#EAEAE5] hover:border-[#D0D4DD] shadow-card'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4F6BFF] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Most Popular
                </div>
              )}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-[#666B76] tracking-wider">
                    {p.name}
                  </span>
                  <Badge variant={p.popular ? 'accent' : 'neutral'}>{p.badge}</Badge>
                </div>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-[#17181C] font-mono tracking-tight">
                    {p.price}
                  </span>
                  <span className="text-xs text-[#666B76]">{p.period}</span>
                </div>

                {p.savings && (
                  <p className="text-xs text-[#059669] font-medium mt-1.5">
                    {p.savings}
                  </p>
                )}

                <p className="mt-4 text-xs sm:text-sm text-[#666B76] leading-relaxed pb-6 border-b border-[#EAEAE5]">
                  {p.description}
                </p>

                {/* Features List */}
                <div className="mt-6">
                  <p className="text-[11px] font-semibold text-[#666B76] uppercase tracking-wider mb-3">
                    Included in this plan:
                  </p>
                  <ul className="space-y-3">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#17181C]">
                        <Check className="size-4 text-[#35C99A] mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#EAEAE5]">
                <Button
                  variant={p.popular ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                  onClick={() => handleSelectPlan(p.id)}
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  Choose {p.name}
                </Button>
                <p className="text-[11px] text-[#666B76] text-center mt-3">
                  Instant TradingView whitelisting upon checkout.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#EEF2FF] border border-[#4F6BFF]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#4F6BFF]/15">
              <ShieldCheck className="size-6 text-[#4F6BFF]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#17181C]">No-Questions-Asked Refund Window</h4>
              <p className="text-xs sm:text-sm text-[#666B76] mt-0.5">
                If the algorithmic indicator suite does not provide structural clarity for your charts, contact desk within 14 days for a full refund.
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate('/support')}
          >
            Review Policy
          </Button>
        </div>

      </div>
    </div>
  );
};
