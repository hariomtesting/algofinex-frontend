import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Clock, Users } from 'lucide-react';
import { Button } from '../ui/Button';

interface SessionSectionProps {
  onNavigate?: (path: string) => void;
}

export const SessionSection: React.FC<SessionSectionProps> = ({ onNavigate }) => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const daysData = [
    {
      day: 1,
      phase: 'Day 1 · Calibration',
      title: 'Deconstruct the clutter & map pure structure',
      description: 'Strip away lagging noise. Set up your TradingView layout with clean swing pivots, equilibrium zones, and multi-timeframe boundaries.',
      milestones: [
        'Clean, synchronized chart workspace',
        'Deterministic swing highs & lows',
        'Break of structure (BOS) rules'
      ]
    },
    {
      day: 2,
      phase: 'Day 2 · Liquidity',
      title: 'Read order imbalances & liquidity traps',
      description: 'Locate institutional order blocks, spot fair value gaps, and distinguish between true trend continuation and false breakout traps.',
      milestones: [
        'Unmitigated order block mapping',
        'Liquidity sweep recognition',
        'Bar-close signal verification'
      ]
    },
    {
      day: 3,
      phase: 'Day 3 · Protocol',
      title: 'Cement your 7-step execution checklist',
      description: 'Lock in mathematical invalidation levels before every trade. Turn chaotic chart-watching into an objective, repeatable daily routine.',
      milestones: [
        'Pre-calculated invalidation levels',
        'Capital preservation checklists',
        'Daily operational preparation flow'
      ]
    }
  ];

  const current = daysData[activeDay - 1];

  return (
    <section id="session" className="py-20 sm:py-28 bg-[#F4F0FF]/60 border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6] bg-white px-3.5 py-1 rounded-full border border-[#DDD6FE] shadow-xs">
            Structured Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            The 3-Day Strategy Session.
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            Move from discretionary guesswork to a structured, repeatable daily routine.
          </p>
        </div>

        {/* 3 Day Switcher Pills */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {daysData.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDay === d.day
                  ? 'bg-[#8B5CF6] text-white shadow-xs'
                  : 'bg-white text-[#666B76] border border-[#EAEAE5] hover:text-[#17181C] hover:border-[#D8D8D2]'
              }`}
            >
              Day 0{d.day}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-[#EAEAE5] p-8 sm:p-10 shadow-card text-left">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6] bg-[#F4F0FF] px-3 py-1 rounded-full">
              {current.phase}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#666B76]">
              <Clock className="size-3.5 text-[#8B5CF6]" />
              <span>45 Mins · Hands-On</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#17181C] tracking-tight">
            {current.title}
          </h3>

          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            {current.description}
          </p>

          <div className="mt-6 pt-6 border-t border-[#F0F1EE] space-y-3">
            {current.milestones.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-[#17181C]">
                <CheckCircle2 className="size-4 text-[#8B5CF6] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#F0F1EE] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#666B76]">
              <Users className="size-4 text-[#8B5CF6]" />
              <span>Small cohort · Direct mentor walkthrough</span>
            </div>

            <Button
              variant="primary"
              onClick={() => onNavigate && onNavigate('/session')}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              rightIcon={<ChevronRight className="size-4" />}
            >
              Explore 3-Day Session
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SessionSection;
