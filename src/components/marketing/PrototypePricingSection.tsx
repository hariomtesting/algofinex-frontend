import React, { useState } from 'react';
import { CreditCard, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PrototypeCheckoutModal, PlanDetails } from './PrototypeCheckoutModal';
import { BorderBeam } from '../ui/BorderBeam';
import { ShinyText } from '../ui/ShinyText';

/**
 * SECTION 07 — PROTOTYPE PRICING
 * Redesigned in LuxAlgo Obsidian Dark aesthetic with neon tier styling.
 * UX validation of the tier structure and purchasing journey.
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
    <section id="pricing" className="relative py-14 sm:py-18 lg:py-20 bg-[#05080E] border-t border-white/10 overflow-hidden">
      
      {/* Editorial Ambient Backing */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-5 backdrop-blur-md">
              <CreditCard className="size-3.5 text-[#00F090] shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-300">
                SECTION 07 • PROTOTYPE ACCESS TIERS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-white leading-[1.08]">
              Transparent access.<br />
              <span className="bg-gradient-to-r from-[#00F090] via-teal-300 to-[#00E5FF] bg-clip-text text-transparent">
                Structured for your workflow.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-3">
              Explore prototype access options designed to validate user experience—whether you need pure TradingView indicator instrumentation, intensive live cohort training, or the complete system.
            </p>
            <div className="text-[10px] font-mono text-slate-400 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
              // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
            </div>
          </div>
        </div>

        {/* Frequency Selector for Indicator Tier */}
        <div className="flex items-center justify-center mb-12 sm:mb-16">
          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1.5 text-xs font-mono backdrop-blur-md">
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 rounded-lg transition-all duration-150 font-semibold cursor-pointer ${
                billingCycle === 'quarterly'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Quarterly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg transition-all duration-150 font-semibold flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#00F090] text-black shadow-[0_0_15px_rgba(0,240,144,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                billingCycle === 'annual' ? 'bg-black/20 text-black' : 'bg-emerald-500/20 text-[#00F090]'
              }`}>
                Save 22%
              </span>
            </button>
          </div>
        </div>

        {/* Bespoke LuxAlgo Architectural Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured All-Access Master Pass Unit (LuxAlgo Ultimate Plan) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border-2 border-[#00F090] bg-[#0A0E1A] p-6 sm:p-9 shadow-[0_0_40px_rgba(0,240,144,0.15)] ring-1 ring-[#00F090]/30 text-left relative overflow-hidden order-first lg:order-last group">
            <BorderBeam duration={8} borderWidth={2} colorFrom="#00F090" colorTo="#00E5FF" />

            {/* Top Recommended Tag */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00F090] text-black text-[10px] font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_10px_rgba(0,240,144,0.4)]">
                <ShinyText shimmerColor="rgba(0, 0, 0, 0.4)" duration="2.5s">
                  Recommended System Confluence
                </ShinyText>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                {plans[2].name}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {plans[2].description}
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                  {plans[2].price}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  / combined pass (PROTOTYPE)
                </span>
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs text-slate-300">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block font-sans">
                  Complete System Entitlements:
                </span>
                {plans[2].features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="size-4 text-[#00F090] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/10 mt-6 sm:mt-8">
              <button
                onClick={() => handleSelectPlan(plans[2])}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#00F090] to-[#00E5FF] hover:brightness-110 transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,144,0.3)] hover:shadow-[0_0_30px_rgba(0,240,144,0.5)] active:scale-[0.99] cursor-pointer"
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
            <div className="rounded-3xl border border-white/10 bg-[#080C14] p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00E5FF] font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                    Software Instrumentation
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">TradingView Pine Script v4.2</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {plans[0].name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="text-3xl font-display font-extrabold text-white">
                      {plans[0].price}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      / {plans[0].billingPeriod}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {plans[0].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 mb-6 font-mono text-[11px]">
                  {plans[0].features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[#00E5FF] shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Includes updates &amp; alerts</span>
                <button
                  onClick={() => handleSelectPlan(plans[0])}
                  className="min-h-[44px] py-2.5 px-5 rounded-xl font-semibold text-xs font-mono text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Select Suite</span>
                  <ArrowRight className="size-3.5 text-[#00E5FF]" />
                </button>
              </div>
            </div>

            {/* Pillar B: 3-Day Live Cohort */}
            <div className="rounded-3xl border border-white/10 bg-[#080C14] p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A855F7] font-bold px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">
                    Live Operational Masterclass
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Limited to 12 Traders</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {plans[1].name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="text-3xl font-display font-extrabold text-white">
                      {plans[1].price}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      / cohort fee
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {plans[1].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 mb-6 font-mono text-[11px]">
                  {plans[1].features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[#A855F7] shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">30-day indicator access included</span>
                <button
                  onClick={() => handleSelectPlan(plans[1])}
                  className="min-h-[44px] py-2.5 px-5 rounded-xl font-semibold text-xs font-mono text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="size-3.5 text-[#A855F7]" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Prototype Disclaimer Footer */}
        <div className="mt-16 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="size-4 text-[#00F090] shrink-0" />
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
