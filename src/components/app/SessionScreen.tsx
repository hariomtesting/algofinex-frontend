import React, { useState } from 'react';
import { Calendar, Play, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const SessionScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2' | 'day3'>('day1');

  const days = [
    {
      id: 'day1',
      title: 'Day 01 — Market Structure Arrival',
      subtitle: 'Mapping swing highs/lows and establishing structural bias.',
      routineStep: 'Steps 01 - 02: Instrument Selection & Structure Framing',
      tasks: [
        'Identify 4-hour swing highs and swing lows.',
        'Mark unmitigated Break of Structure (BOS) levels.',
        'Establish macro directional bias before market open.',
      ],
    },
    {
      id: 'day2',
      title: 'Day 02 — Liquidity Observation',
      subtitle: 'Locating institutional liquidity pools and equal highs/lows.',
      routineStep: 'Steps 03 - 04: Liquidity Mapping & Invalidation Check',
      tasks: [
        'Outline buy-side and sell-side liquidity pools.',
        'Calculate exact invalidation coordinates.',
        'Verify Trend Corridor alignment across timeframes.',
      ],
    },
    {
      id: 'day3',
      title: 'Day 03 — Structural Execution & Plan',
      subtitle: 'Applying the 7-Step Routine for risk-managed confirmation.',
      routineStep: 'Steps 05 - 07: Plan Execution & Routine Checklist',
      tasks: [
        'Wait for structural confirmation zone tap.',
        'Formulate execution plan with zero emotion.',
        'Document trade setup in 7-Step workout journal.',
      ],
    },
  ];

  const current = days.find((d) => d.id === selectedDay) || days[0];

  return (
    <div data-component="SessionScreen" className="bg-[#FAFAF7] min-h-screen p-6 md:p-10 select-none text-left text-[#17181C]">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-[#EAEAE5] pb-5 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-[#8B5CF6]" />
            <span className="text-xs font-semibold uppercase text-[#8B5CF6] tracking-wider">
              3-Day Session Companion
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17181C] tracking-tight">
            Live Masterclass Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-[#666B76] max-w-2xl">
            Access curriculum schedules, workout routine checklists, and simulated video recordings for the 3-Day Live Masterclass.
          </p>
        </div>

        {/* Day Stepper Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id as any)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedDay === d.id
                  ? 'bg-[#F4F0FF] border-2 border-[#8B5CF6] shadow-xs'
                  : 'bg-white border-[#EAEAE5] hover:border-[#D0D4DD] shadow-card'
              }`}
            >
              <div className="text-[11px] font-bold text-[#8B5CF6] uppercase">{d.id.toUpperCase()}</div>
              <div className="font-bold text-[#17181C] text-sm mt-1">{d.title.split('—')[1]}</div>
            </button>
          ))}
        </div>

        {/* Selected Day Content Container */}
        <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 md:p-8 space-y-6 shadow-card">
          <div className="border-b border-[#EAEAE5] pb-4 space-y-1">
            <div className="text-xs font-bold uppercase text-[#8B5CF6]">{current.routineStep}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17181C]">{current.title}</h2>
            <p className="text-xs sm:text-sm text-[#666B76]">{current.subtitle}</p>
          </div>

          {/* Simulated Video Player Placeholder */}
          <div className="bg-[#FAFAF7] border border-[#EAEAE5] rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 text-center min-h-[220px]">
            <div className="size-14 rounded-full bg-[#8B5CF6] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-xs">
              <Play className="size-6 text-white ml-0.5 fill-white" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#17181C]">{current.title} (Recording)</div>
              <div className="text-xs text-[#666B76]">Duration: 1h 45m · Simulated Session Recording</div>
            </div>
          </div>

          {/* Routine Exercise Checklist */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase text-[#17181C]">Day Exercise Checklist:</div>
            <div className="space-y-2.5">
              {current.tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] text-xs text-[#17181C]">
                  <CheckCircle2 className="size-4 text-[#35C99A] shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Workbook Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#EAEAE5] text-xs">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Download className="size-3.5 text-[#8B5CF6]" />}
            >
              Download Day Workbook (PDF)
            </Button>
            <span className="text-xs text-[#666B76]">
              Simulated masterclass material
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionScreen;
