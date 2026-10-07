import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { SubscriptionPlan } from '../../types/api';

interface PrototypePricingSectionProps {
  onNavigate?: (path: string, state?: any) => void;
}

export const PrototypePricingSection: React.FC<PrototypePricingSectionProps> = ({ onNavigate }) => {

  const plans = [
    {
      id: 'monthly' as SubscriptionPlan,
      name: 'Monthly Suite',
      badge: 'Flexible',
      price: '$79',
      period: 'per month',
      description: 'Full TradingView analytical suite for active traders seeking clean market structure.',
      popular: false,
      features: [
        'Complete 4-Layer Indicator Suite',
        'Market Structure Matrix (HH / HL / BOS)',
        'Order Block & Liquidity Pool Mapping',
        'Dynamic Momentum Cloud Ribbon',
        'Bar-close non-repainting triggers',
        'TradingView alerts & webhooks',
      ]
    },
    {
      id: 'annual' as SubscriptionPlan,
      name: 'Annual Suite',
      badge: 'Most Popular',
      price: '$59',
      period: 'per month ($708 / year)',
      savings: 'Save $240 / year',
      description: 'Our most complete package: full indicator license plus an included 3-Day Strategy Session.',
      popular: true,
      features: [
        'Everything in Monthly Suite',
        'Included 3-Day Strategy Session ($299 Value)',
        '7-Step Execution Routine Guide',
        'Priority technical & script support',
        'All future indicator releases & updates',
        'Invite-only Pine Script v5 access',
      ]
    },
    {
      id: 'lifetime' as SubscriptionPlan,
      name: 'Lifetime Founder',
      badge: 'Permanent',
      price: '$1,490',
      period: 'one-time payment',
      description: 'Perpetual access and future updates for proprietary desks and long-term operators.',
      popular: false,
      features: [
        'Perpetual license to all current & future scripts',
        'Included 3-Day Strategy Session pass',
        'Priority desk support with developers',
        'Unlimited TradingView account relocations',
        'Beta access to experimental algorithms',
        'Zero recurring subscription fees',
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-[#EEF2FF] px-3.5 py-1 rounded-full border border-[#E0E7FF] shadow-xs">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            Transparent plans. No hidden tiers.
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            Choose the membership that matches your trading routine. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between text-left transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#4F6BFF] shadow-card relative'
                    : 'bg-white border border-[#EAEAE5] shadow-xs hover:shadow-card-hover'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-lg font-bold text-[#17181C]">
                      {plan.name}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        plan.popular
                          ? 'bg-[#4F6BFF] text-white'
                          : 'bg-[#F4F5F8] text-[#666B76]'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#17181C] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-[#666B76]">
                      / {plan.period}
                    </span>
                  </div>

                  {plan.savings && (
                    <div className="mt-2 text-xs font-semibold text-[#059669]">
                      {plan.savings}
                    </div>
                  )}

                  <p className="mt-4 text-sm text-[#666B76] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-[#F0F1EE] space-y-3">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-[#17181C]">
                        <Check className="size-4 text-[#35C99A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F0F1EE]">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('/checkout', { selectedPlan: plan.id });
                      }
                    }}
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    Select {plan.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Note */}
        <div className="mt-12 text-center text-xs text-[#666B76]">
          All plans include instant TradingView invite provisioning &amp; non-repainting v5 scripts.
        </div>

      </div>
    </section>
  );
};

export default PrototypePricingSection;
