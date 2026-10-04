import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Mail } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag?: string;
}

/**
 * SECTION 08 — FAQ
 * Clean editorial FAQ answering prospective user questions.
 * ZERO legally sensitive or fabricated claims.
 */
export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What is AlgoFinex?',
      answer: 'AlgoFinex is a specialized trading-support platform providing proprietary market structure indicators for TradingView and an intensive 3-Day live workflow masterclass. Our objective is to replace chaotic, lagging indicator clutter with mathematically objective market geometry, resting liquidity zones, and disciplined execution checklists.'
    },
    {
      id: 'faq-2',
      question: 'What does the indicator system focus on?',
      answer: 'The suite is engineered around four coordinated analytical dimensions: Market Structure (algorithmic swing highs, swing lows, and breaks of structure), Liquidity (unmitigated order blocks and fair value gap imbalances), Trend Context (dynamic multi-period momentum envelopes), and Confirmation (non-repainting bar-close execution triggers with predetermined invalidation levels).'
    },
    {
      id: 'faq-3',
      question: 'What markets and timeframes does it support?',
      answer: 'Because our algorithms model pure auction market theory and candlestick geometry, they function across any liquid market charted on TradingView—including cryptocurrency (BTC, ETH), major FX pairs, equity index futures (NQ, ES), and commodities (Gold, Crude). The suite is synchronized for multi-timeframe analysis, from 5-minute execution frames to daily macro trend perspectives.'
    },
    {
      id: 'faq-4',
      question: 'How does the 3-Day Session work?',
      answer: 'The 3-Day Session is an intensive cohort masterclass delivered live online across three consecutive market days: Arrival & Deconstruction (Day 1), Live Tape Observation (Day 2), and Application of the 7-Step Protocol (Day 3). Traders leave with an audited, personalized checklist and risk rules. (Prototype note: Cohort dates and schedules are finalized upon intake confirmation).'
    },
    {
      id: 'faq-5',
      question: 'Is AlgoFinex financial advice or an automated bot?',
      answer: 'No. AlgoFinex does not provide investment advice, financial planning, portfolio management, or automated "black-box" execution bots. Our products are educational decision-support tools created to help discretionary traders organize chart information objectively. All trade sizing and risk allocation remain strictly at your discretion.'
    },
    {
      id: 'faq-6',
      question: 'How does indicator access and installation work?',
      answer: 'Access is provisioned directly to your TradingView account handle. Once enrolled, the AlgoFinex scripts appear under the "Invite-Only Scripts" tab in your TradingView indicator search window. There are no files to download or code to compile; updates apply automatically in cloud real-time.'
    }
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 sm:py-36 lg:py-44 bg-[#F8F8F6] border-t border-black/[0.06] overflow-hidden">
      
      {/* Editorial Ambient Backing */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[170px] opacity-60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Editorial Asymmetric Grid: Left Header & Context vs Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Support Guidance */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
              <HelpCircle className="size-3.5 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">
                SECTION 08 • FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.04]">
              Clarifying<br />
              <span className="text-brand-blue">
                the system.
              </span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
              Direct, transparent answers regarding our analytical methodology, TradingView compatibility, cohort structure, and access mechanisms.
            </p>

            {/* Assistance Card */}
            <div className="mt-10 p-6 rounded-2xl bg-white border border-black/[0.08] shadow-xs text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Prototype Assistance
              </span>
              <h4 className="text-base font-display font-bold text-slate-900 mb-2">
                Have an unaddressed technical inquiry?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Our support desk assists with TradingView username verification, cohort scheduling, and platform compatibility.
              </p>
              <a
                href="#signin"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-blue hover:text-blue-800 transition-colors"
              >
                <Mail className="size-3.5" />
                <span>Contact Desk via Client Portal</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="size-3.5 text-signal-bull" />
              <span>Full terms and operational policies verified on enrollment</span>
            </div>

          </div>

          {/* Right Column: Editorial Accordion List (Unboxed, Hairline Dividers) */}
          <div className="lg:col-span-7 w-full border-t border-black/[0.1] divide-y divide-black/[0.08]">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`transition-colors duration-200 text-left ${
                    isOpen ? 'bg-black/[0.015]' : 'hover:bg-black/[0.008]'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-7 px-2 text-left flex items-start justify-between gap-6 cursor-pointer focus:outline-none group"
                  >
                    <div className="flex items-start gap-4 sm:gap-6 min-w-0">
                      <span className="font-mono text-xs text-slate-400 font-semibold pt-1 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug group-hover:text-brand-blue transition-colors">
                        {faq.question}
                      </span>
                    </div>

                    <div className="pt-1 shrink-0">
                      <span className={`size-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                        isOpen 
                          ? 'bg-brand-blue text-white border-brand-blue rotate-180 shadow-xs' 
                          : 'bg-white text-slate-400 border-black/[0.1] group-hover:border-black/[0.2] group-hover:text-slate-700'
                      }`}>
                        <ChevronDown className="size-3.5" />
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pl-8 sm:pl-12 pr-4 pb-7 pt-1">
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;
