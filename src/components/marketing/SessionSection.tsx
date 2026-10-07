import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  Clock,
  BookOpen,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface SessionSectionProps {
  onNavigate?: (path: string) => void;
}

export const SessionSection: React.FC<SessionSectionProps> = ({ onNavigate }) => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const daysData = [
    {
      day: 1,
      tag: 'DAY 01 • ARRIVAL & DECONSTRUCTION',
      phase: 'System Calibration',
      title: 'Deconstruct the Clutter & Map Pure Structure',
      focus: 'Workspace Calibration & Geometric Anchors',
      milestones: [
        'Strip away lagging oscillators to reclaim clean price action',
        'Configure TradingView workspace with synchronized multi-timeframe templates',
        'Isolate algorithmic swing highs, swing lows, and structural breaks (BOS)'
      ]
    },
    {
      day: 2,
      tag: 'DAY 02 • OBSERVATION & CONFLUENCE',
      phase: 'Liquidity Analysis',
      title: 'Read Institutional Imbalances & Resting Liquidity',
      focus: 'Real-Time Order Flow & Non-Repainting Signals',
      milestones: [
        'Identify unmitigated order blocks and fair value gap imbalances',
        'Differentiate genuine expansion from false breakout traps',
        'Verify non-repainting bar-close execution criteria under live pressure'
      ]
    },
    {
      day: 3,
      tag: 'DAY 03 • APPLICATION & ROUTINE',
      phase: 'Execution Protocol',
      title: 'Cement the 7-Step Discretionary Execution Protocol',
      focus: 'Fixed Invalidation & Operational Checklist',
      milestones: [
        'Calculate exact mathematical invalidation points before entry',
        'Establish personal risk budgets and position sizing matrices',
        'Formalize your written 7-step pre-session and post-session checklist'
      ]
    }
  ];

  const currentDayData = daysData[activeDay - 1];

  return (
    <section id="session" className="relative py-20 sm:py-24 overflow-hidden bg-[#080A0D] border-t border-[#20252C]">
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 text-left">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141820] border border-[#20252C] text-xs font-mono text-[#8B929C] mb-4">
              <Calendar className="size-3.5 text-[#C8A96B]" />
              <span className="tracking-widest uppercase font-semibold text-[11px] text-[#C8A96B]">
                3-DAY EXECUTION MASTERCLASS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
              Three days to formalize <br className="hidden sm:inline" />
              <span className="text-[#C8A96B]">your execution routine.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed mb-4">
              Indicators reveal market geometry; only a disciplined routine protects your capital under pressure. In 3 structured sessions, calibrate your charts, define risk invalidation, and cement a repeatable habits framework.
            </p>
          </div>
        </div>

        {/* 4 Pillars of the Session Conversion Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14 text-left">
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C]">
            <Clock className="size-5 text-[#C8A96B] mb-2.5" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">3 Structured Days</h4>
            <p className="text-xs text-[#8B929C] mt-1">Modular curriculum with chart exercises and permanent recordings.</p>
          </div>
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C]">
            <BookOpen className="size-5 text-[#C8A96B] mb-2.5" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">72-Hr Indicator Pass</h4>
            <p className="text-xs text-[#8B929C] mt-1">Temporary whitelisting for all 4 indicators to test during the session.</p>
          </div>
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C]">
            <Users className="size-5 text-[#C8A96B] mb-2.5" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">Open Eligibility</h4>
            <p className="text-xs text-[#8B929C] mt-1">Open to all traders with a TradingView handle. Zero payment required.</p>
          </div>
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C]">
            <CheckCircle2 className="size-5 text-[#6FAF8A] mb-2.5" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">No Deceptive Urgency</h4>
            <p className="text-xs text-[#8B929C] mt-1">Honest intake queue without countdown clocks or pressure tactics.</p>
          </div>
        </div>

        {/* Day-by-Day Interactive Syllabus Card */}
        <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-8 text-left">
          {/* Day Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#20252C] pb-5 mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d as 1 | 2 | 3)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeDay === d
                      ? 'bg-[#141820] text-[#C8A96B] border border-[#C8A96B] font-bold shadow-xs'
                      : 'bg-[#0B0E13] text-[#8B929C] border border-[#20252C] hover:text-[#F3F4F6]'
                  }`}
                >
                  Day 0{d}
                </button>
              ))}
            </div>

            <Badge variant="accent">{currentDayData.phase}</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-mono text-[#8B929C]">{currentDayData.tag}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
                {currentDayData.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#C8A96B] font-mono">
                Focus: {currentDayData.focus}
              </p>

              <div className="mt-5 pt-4 border-t border-[#20252C]">
                <p className="text-xs font-mono text-[#8B929C] uppercase tracking-wider mb-2">
                  Session Milestones:
                </p>
                <ul className="space-y-2">
                  {currentDayData.milestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F3F4F6]">
                      <span className="size-1 rounded-full bg-[#C8A96B] mt-1.5 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0B0E13] border border-[#20252C] rounded-xl p-6 text-center space-y-4">
              <h4 className="text-sm font-semibold text-[#F3F4F6]">Ready to begin?</h4>
              <p className="text-xs text-[#8B929C] leading-relaxed">
                Activate your 3-day evaluation seat to unlock the complete syllabus, templates, and script access pass.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => onNavigate ? onNavigate('/session') : undefined}
                  rightIcon={<ChevronRight className="size-4" />}
                >
                  Learn More &amp; Enroll
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
