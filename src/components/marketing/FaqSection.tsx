import React, { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
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
      answer: 'AlgoFinex is a trading-support platform providing proprietary market structure indicators for TradingView alongside an intensive 3-Day live workflow masterclass. Our goal is to replace chaotic, lagging indicator clutter with mathematically objective market geometry, resting liquidity zones, and disciplined execution checklists.'
    },
    {
      id: 'faq-2',
      question: 'What does the indicator system focus on?',
      answer: 'The suite is engineered around four key dimensions: Market Structure (swing pivots and breaks of structure), Liquidity (unmitigated order blocks and fair value gap imbalances), Trend (dynamic momentum cloud ribbons), and Confirmation (non-repainting bar-close execution triggers with predetermined invalidation levels).'
    },
    {
      id: 'faq-3',
      question: 'What markets and timeframes does it support?',
      answer: 'Because our algorithms model pure auction market geometry, they work across any liquid market charted on TradingView—including cryptocurrency (BTC, ETH), major FX pairs, equity index futures (NQ, ES), and commodities (Gold, Crude).'
    },
    {
      id: 'faq-4',
      question: 'How does the 3-Day Session work?',
      answer: 'The 3-Day Session is an intensive cohort masterclass delivered across three consecutive steps: System Calibration (Day 1), Live Liquidity & Tape Observation (Day 2), and Application of the 7-Step Protocol (Day 3).'
    },
    {
      id: 'faq-5',
      question: 'Is AlgoFinex financial advice or an automated bot?',
      answer: 'No. AlgoFinex does not provide investment advice, financial planning, portfolio management, or automated execution bots. Our products are educational decision-support tools created to help discretionary traders organize chart information objectively.'
    },
    {
      id: 'faq-6',
      question: 'How does indicator access and installation work?',
      answer: 'Access is provisioned directly to your TradingView account handle. Once enrolled, the AlgoFinex scripts appear under the "Invite-Only Scripts" tab in your TradingView indicator search window. No files to download or code to compile.'
    }
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Left Editorial Header */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-[#EEF2FF] px-3.5 py-1 rounded-full border border-[#E0E7FF] shadow-xs">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-base text-[#666B76] leading-relaxed">
              Everything you need to know about our indicators, access provisioning, and the 3-Day Strategy Session.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-white border border-[#EAEAE5] shadow-xs">
              <h4 className="text-sm font-bold text-[#17181C]">Have a custom technical question?</h4>
              <p className="text-xs text-[#666B76] mt-1 leading-relaxed">
                Our Pine Script engineers are ready to walk through your trading setup.
              </p>
              <div className="mt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate && onNavigate('/support')}
                  leftIcon={<Mail className="size-3.5 text-[#4F6BFF]" />}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-[#EAEAE5] bg-white transition-all duration-150 overflow-hidden shadow-xs hover:border-[#D8D8D2]"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#17181C] hover:text-[#4F6BFF] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`size-4 text-[#9CA3AF] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#4F6BFF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-sm text-[#666B76] leading-relaxed border-t border-[#F0F1EE] mt-1 pt-3.5">
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

export default FaqSection;
