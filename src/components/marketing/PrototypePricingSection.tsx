import React from 'react';
import { CreditCard, Check, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
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
      badge: 'FLEXIBLE',
      price: '$79',
      period: 'per month',
      description: 'Full TradingView analytical suite for traders who have an existing execution routine and want objective market structure.',
      popular: false,
      features: [
        'Complete 4-Layer Indicator Suite',
        'Market Structure Swing Geometry (HH / HL / BOS)',
        'Order Block & Fair Value Gap Imbalance Pools',
        'Dynamic Momentum Cloud Ribbon',
        'Bar-close non-repainting execution triggers',
        'TradingView webhook alert integrations',
      ]
    },
    {
      id: 'annual' as SubscriptionPlan,
      name: 'Annual Suite',
      badge: 'RECOMMENDED CONFLUENCE',
      price: '$59',
      period: 'per month ($708 billed annually)',
      savings: 'Save $240 / Year',
      description: 'The definitive operational package: the live 3-Day Cohort calibration plus a full 12-month license to the complete indicator suite.',
      popular: true,
      features: [
        'Everything in Monthly Suite',
        'Complimentary Seat: 3-Day Execution Masterclass ($299 Value)',
        'Personal 7-Step Routine Certification',
        'Direct priority technical and mentor channel',
        'All future indicator releases & v5 scripts',
        'TradingView invite-only priority provisioning',
      ]
    },
    {
      id: 'lifetime' as SubscriptionPlan,
      name: 'Lifetime Founder',
      badge: 'PERMANENT ACCESS',
      price: '$1,490',
      period: 'one-time payment',
      description: 'Permanent whitelisting and perpetual updates for institutional desks and long-term operators.',
      popular: false,
      features: [
        'Perpetual Whitelisting for All Current & Future Scripts',
        'VIP Private Desk with AlgoFinex Developers',
        'Unlimited TradingView Account Relocations',
        'Full 3-Day Execution Masterclass & Recordings',
        'Custom Webhook Integration Consultation',
        'One-Time Fee — Never Pay Subscriptions Again',
      ]
    }
  ];

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (onNavigate) {
      onNavigate('/checkout', { selectedPlan: plan });
    }
  };

  return (
    <section id="pricing" className="relative py-20 sm:py-24 bg-[#080A0D] border-t border-[#20252C] overflow-hidden">
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 text-left">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#8B929C] mb-4">
              <CreditCard className="size-3.5 text-[#C8A96B]" />
              <span className="tracking-widest uppercase text-[11px] font-semibold text-[#C8A96B]">
                TRANSPARENT TIERS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
              Transparent pricing.<br />
              <span className="text-[#C8A96B]">
                Zero hidden fees or contracts.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed mb-4">
              All tiers grant instant invite-only Pine Script whitelisting for your linked TradingView username. Cancel anytime directly with 1 click.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
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

                <div className="mt-6">
                  <p className="text-[11px] font-mono text-[#8B929C] uppercase tracking-wider mb-3">
                    Included capabilities:
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

      </div>
    </section>
  );
};
