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
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pt-6 pb-12 border-b border-[#20252C]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141820] border border-[#20252C] text-xs font-mono text-[#C8A96B] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#C8A96B]" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
            Institutional tools. Honest terms.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B929C] leading-relaxed">
            All plans include the complete indicator suite, TradingView script whitelisting, and strict bar-close non-repainting guarantees.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-[#101318] border border-[#20252C]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#1E2532] text-[#F3F4F6] font-medium shadow-xs'
                  : 'text-[#8B929C] hover:text-[#F3F4F6]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#1E2532] text-[#F3F4F6] font-medium shadow-xs'
                  : 'text-[#8B929C] hover:text-[#F3F4F6]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-[#C8A96B]/20 text-[#C8A96B] px-1.5 py-0.2 rounded font-bold">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 border ${
                p.popular
                  ? 'bg-[#12161E] border-[#C8A96B] shadow-workstation'
                  : 'bg-[#101318] border-[#20252C] hover:border-[#2E3642]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#8B929C] tracking-wider font-semibold">
                    {p.name}
                  </span>
                  <Badge variant={p.popular ? 'accent' : 'neutral'}>{p.badge}</Badge>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#F3F4F6] font-mono tracking-tight">
                    {p.price}
                  </span>
                  <span className="text-xs text-[#8B929C] font-mono">{p.period}</span>
                </div>

                {p.savings && (
                  <p className="text-xs text-[#6FAF8A] font-mono font-medium mt-1">
                    {p.savings}
                  </p>
                )}

                <p className="mt-4 text-xs sm:text-sm text-[#8B929C] leading-relaxed pb-6 border-b border-[#20252C]">
                  {p.description}
                </p>

                {/* Features List */}
                <div className="mt-6">
                  <p className="text-[11px] font-mono text-[#8B929C] uppercase tracking-wider mb-3">
                    Included in this plan:
                  </p>
                  <ul className="space-y-2.5">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F3F4F6]">
                        <Check className="size-3.5 text-[#6FAF8A] mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#20252C]">
                <Button
                  variant={p.popular ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                  onClick={() => handleSelectPlan(p.id)}
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  Choose {p.name}
                </Button>
                <p className="text-[10px] font-mono text-[#6B7380] text-center mt-2.5">
                  Instant TradingView whitelisting upon checkout.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-6 rounded-xl bg-[#101318] border border-[#20252C] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-8 text-[#C8A96B] shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-[#F3F4F6]">No-Questions-Asked Refund Window</h4>
              <p className="text-xs text-[#8B929C] mt-0.5">
                If the algorithmic indicator suite does not provide structural clarity for your charts, contact desk within 14 days for a full refund.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('/support')}
          >
            Review Policy
          </Button>
        </div>

      </div>
    </div>
  );
};
