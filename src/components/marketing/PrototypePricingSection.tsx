import React, { useState } from 'react';
import { CreditCard, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PrototypeCheckoutModal, PlanDetails } from './PrototypeCheckoutModal';

/**
 * SECTION 07 — PROTOTYPE PRICING
 * UX validation of the tier structure and purchasing journey.
 * 
 * IMPORTANT:
 * // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
 * No real payment processing, transactions, or production subscriptions.
 */
export const PrototypePricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'quarterly' | 'annual'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
  const plans: PlanDetails[] = [
    {
      id: 'suite',
      name: 'Indicator Suite Access',
      price: billingCycle === 'annual' ? '$69' : '$89',
      billingPeriod: 'month',
      description: 'Full TradingView analytical suite for traders who have an existing execution routine and want objective market structure.',
      badge: undefined,
      features: [
        'Complete 4-Layer Indicator Suite',
        'Market Structure Swing Geometry (HH / HL / BOS)',
        'Order Block & Fair Value Gap Imbalance Pools',
        'Dynamic Trend Cloud Momentum Corridors',
        'Bar-close non-repainting execution triggers',
        'TradingView webhook alert integrations',
        'Regular Pine Script algorithm enhancements'
      ]
    },
    {
      id: 'cohort',
      name: '3-Day Intensive Session',
      price: '$495',
      billingPeriod: 'cohort intake',
      description: 'Live interactive masterclass to audit execution habits, calibrate charts, and cement a personalized 7-step trading routine.',
      badge: 'Cohort Intake Open',
      features: [
        'Three 2.5-hour live interactive market labs',
        'Hands-on personal execution routine audit',
        'Pre-session TradingView workspace calibration',
        'Fixed mathematical invalidation risk matrices',
        'Permanent access to all live lab recordings',
        'Direct mentor Q&A and trade teardowns',
        '30-Day Full Indicator Suite access included'
      ]
    },
    {
      id: 'all-access',
      name: 'All-Access Master Pass',
      price: '$645',
      billingPeriod: 'complete pass',
      description: 'The definitive operational package: the live 3-Day Cohort calibration plus a full 12-month license to the complete indicator suite.',
      badge: 'Recommended Confluence',
      features: [
        'Full 3-Day Intensive Live Cohort Access',
        '12 Months Unrestricted Indicator Suite Access',
        'Personal 7-Step Routine Certification',
        'Monthly live market teardowns & debriefs',
        'Direct priority technical and mentor channel',
        'All future indicator releases & v5 scripts',
        'TradingView invite-only priority provisioning'
      ]
    }
  ];

  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="relative py-28 sm:py-36 lg:py-44 bg-white border-t border-black/[0.06] overflow-hidden">
      
      {/* Editorial Ambient Backing */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-50/70 rounded-full blur-[180px] opacity-80" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-2xs">
              <CreditCard className="size-3.5 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">
                SECTION 07 • PROTOTYPE ACCESS TIERS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.04]">
              Transparent access.<br />
              <span className="text-brand-blue">
                Structured for your workflow.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
              Explore prototype access options designed to validate user experience—whether you need pure TradingView indicator instrumentation, intensive live cohort training, or the complete system.
            </p>
            <div className="text-[10px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-black/[0.06]">
              // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
            </div>
          </div>
        </div>

        {/* Frequency Selector for Indicator Tier */}
        <div className="flex items-center justify-center mb-12 sm:mb-16">
          <div className="p-1 rounded-xl bg-slate-100 border border-black/[0.06] flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 rounded-lg transition-all duration-150 font-semibold ${
                billingCycle === 'quarterly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Quarterly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg transition-all duration-150 font-semibold flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                Save 22%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards - Clean Hairline Editorial Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((p) => {
            const isFeatured = p.id === 'all-access';

            return (
              <div
                key={p.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative text-left ${
                  isFeatured
                    ? 'bg-[#F8FAFC] border-2 border-brand-blue shadow-lg ring-1 ring-brand-blue/30'
                    : 'bg-white border border-black/[0.08] shadow-sm hover:shadow-md hover:border-black/[0.14]'
                }`}
              >
                {/* Featured Badge */}
                {p.badge && (
                  <div className="mb-4">
                    <span className={`inline-block text-[11px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                      isFeatured 
                        ? 'bg-brand-blue text-white shadow-2xs' 
                        : 'bg-blue-50 text-brand-blue border border-blue-200'
                    }`}>
                      {p.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
                    {p.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[44px]">
                    {p.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="mt-6 pt-6 border-t border-black/[0.06] flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                      {p.price}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      / {p.billingPeriod}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-8 space-y-3 pb-8">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Included Capabilities:
                    </span>
                    {p.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="size-4 text-signal-bull shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-4 border-t border-black/[0.06]">
                  <button
                    onClick={() => handleSelectPlan(p)}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] ${
                      isFeatured
                        ? 'bg-brand-blue text-white hover:bg-blue-800'
                        : 'bg-white text-slate-800 hover:bg-slate-50 border border-black/[0.12] hover:border-black/[0.22]'
                    }`}
                  >
                    <span>Select {p.name.split(' ')[0]}</span>
                    <ArrowRight className="size-4" />
                  </button>
                  <span className="block text-[10px] font-mono text-slate-400 text-center mt-2">
                    UX Simulation • No real charge
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype Disclaimer Footer */}
        <div className="mt-16 p-4 rounded-2xl bg-slate-50 border border-black/[0.06] text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
          <ShieldCheck className="size-4 text-brand-blue shrink-0" />
          <span>This tier structure represents prototype testing data. Final production pricing will be announced at commercial launch.</span>
        </div>

      </div>

      {/* Interactive Prototype Review Modal */}
      <PrototypeCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </section>
  );
};

export default PrototypePricingSection;
