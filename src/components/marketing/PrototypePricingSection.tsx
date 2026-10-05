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

        {/* Bespoke Architectural Pricing Layout: Software Suite + Live Cohort + All-Access Confluence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured All-Access Master Pass Unit (First on mobile via order-first, last on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border-2 border-brand-blue bg-white p-6 sm:p-9 shadow-lg ring-1 ring-brand-blue/20 text-left relative order-first lg:order-last">

            {/* Top Recommended Tag */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-blue text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
                <span>Recommended System Confluence</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                {plans[2].name}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {plans[2].description}
              </p>

              <div className="mt-6 pt-5 border-t border-black/[0.06] flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                  {plans[2].price}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  / combined pass (PROTOTYPE)
                </span>
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs text-slate-700">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block font-sans">
                  Complete System Entitlements:
                </span>
                {plans[2].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="size-4 text-signal-bull shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-black/[0.06] mt-6 sm:mt-8">
              <button
                onClick={() => handleSelectPlan(plans[2])}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-brand-blue hover:bg-blue-800 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <span>Select All-Access Pass</span>
                <ArrowRight className="size-4" />
              </button>
              <div className="text-[10px] font-mono text-slate-400 text-center mt-2">
                UX Prototype Simulation • No real charge
              </div>
            </div>

          </div>

          {/* Pillar 1 & 2 Column: Core Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left order-last lg:order-first">
            
            {/* Pillar A: Indicator Suite Software */}
            <div className="rounded-3xl border border-black/[0.08] bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/[0.14] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-blue font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                    Software Instrumentation
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">TradingView Pine Script v4.2</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                    {plans[0].name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="text-3xl font-display font-extrabold text-slate-900">
                      {plans[0].price}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      / {plans[0].billingPeriod}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {plans[0].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 mb-6 font-mono text-[11px]">
                  {plans[0].features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand-blue shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Includes updates &amp; alerts</span>
                <button
                  onClick={() => handleSelectPlan(plans[0])}
                  className="min-h-[44px] py-2.5 px-5 rounded-xl font-semibold text-xs font-mono text-slate-800 bg-white hover:bg-slate-100 border border-black/[0.12] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Select Suite</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar B: 3-Day Live Cohort */}
            <div className="rounded-3xl border border-black/[0.08] bg-[#F4F2EC] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/[0.14] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold px-2 py-0.5 rounded bg-amber-100/60 border border-amber-300">
                    Live Operational Masterclass
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Limited to 12 Traders</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                    {plans[1].name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="text-3xl font-display font-extrabold text-slate-900">
                      {plans[1].price}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      / cohort fee
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {plans[1].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 mb-6 font-mono text-[11px]">
                  {plans[1].features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-amber-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">30-day indicator access included</span>
                <button
                  onClick={() => handleSelectPlan(plans[1])}
                  className="min-h-[44px] py-2.5 px-5 rounded-xl font-semibold text-xs font-mono text-slate-800 bg-white hover:bg-slate-100 border border-black/[0.12] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

          </div>

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
