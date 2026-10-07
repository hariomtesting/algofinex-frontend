import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  onNavigate?: (path: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What is AlgoFinex?',
      answer: 'AlgoFinex is a specialized trading-support platform providing proprietary market structure indicators for TradingView and an intensive 3-Day live workflow masterclass. Our objective is to replace chaotic, lagging indicator clutter with mathematically objective market geometry, resting liquidity zones, and disciplined execution checklists.'
    },
    {
      id: 'faq-2',
      question: 'What does the indicator system focus on?',
      answer: 'The suite is engineered around four coordinated analytical dimensions: Market Structure (algorithmic swing highs, swing lows, and breaks of structure), Liquidity (unmitigated order blocks and fair value gap imbalances), Trend Context (dynamic volatility-adaptive momentum clouds), and Confirmation (non-repainting bar-close execution triggers with predetermined invalidation levels).'
    },
    {
      id: 'faq-3',
      question: 'What markets and timeframes does it support?',
      answer: 'Because our algorithms model pure auction market theory and candlestick geometry, they function across any liquid market charted on TradingView—including cryptocurrency (BTC, ETH), major FX pairs, equity index futures (NQ, ES), and commodities (Gold, Crude). The suite is synchronized for multi-timeframe analysis, from 1-minute execution frames to daily macro trend perspectives.'
    },
    {
      id: 'faq-4',
      question: 'How does the 3-Day Session work?',
      answer: 'The 3-Day Session is an intensive cohort masterclass delivered across three consecutive phases: System Calibration (Day 1), Live Liquidity & Tape Observation (Day 2), and Application of the 7-Step Protocol (Day 3). Traders leave with an audited, personalized checklist and risk rules.'
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
    <section id="faq" className="relative py-20 sm:py-24 bg-[#080A0D] border-t border-[#20252C] overflow-hidden">
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Editorial Grid: Left Header & Context vs Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-left">
          
          {/* Left Column: Heading and Support Guidance */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#8B929C] mb-4">
              <HelpCircle className="size-3.5 text-[#C8A96B]" />
              <span className="tracking-widest uppercase font-semibold text-[11px] text-[#C8A96B]">
                QUESTIONS &middot; CLARITY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
              Clarifying <br />
              <span className="text-[#C8A96B]">the system.</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[#8B929C] leading-relaxed max-w-md">
              Direct, transparent answers regarding our analytical methodology, TradingView compatibility, cohort structure, and access mechanisms.
            </p>

            {/* Assistance Card */}
            <div className="mt-8 p-6 rounded-xl bg-[#101318] border border-[#20252C]">
              <span className="text-xs font-mono uppercase text-[#C8A96B] font-semibold block mb-1">
                Technical Assistance
              </span>
              <h4 className="text-sm font-bold text-[#F3F4F6] mb-1.5">
                Have an unaddressed technical inquiry?
              </h4>
              <p className="text-xs text-[#8B929C] leading-relaxed mb-4">
                Our technical desk assists with TradingView username verification, webhook configurations, and indicator presets.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate ? onNavigate('/support') : undefined}
                leftIcon={<Mail className="size-3.5" />}
              >
                Open Support Desk
              </Button>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#101318] border-[#C8A96B]/50'
                      : 'bg-[#101318] border-[#20252C] hover:border-[#2E3642]'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#F3F4F6] hover:text-[#C8A96B] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`size-4 text-[#8B929C] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C8A96B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#8B929C] leading-relaxed border-t border-[#1C2128] pt-3.5">
                      {faq.answer}
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
