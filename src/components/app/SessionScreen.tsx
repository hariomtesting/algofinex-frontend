import React, { useState } from 'react';
import { Calendar, Play, Download, CheckCircle2 } from 'lucide-react';

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
    <div className="bg-[#F4F2EC] min-h-screen p-6 md:p-10 select-none">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-amber-900/10 pb-5 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-amber-900" />
            <span className="text-xs font-mono font-bold uppercase text-amber-900 tracking-wider">
              3-Day Session Companion
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
            Live Masterclass Curriculum
          </h1>
          <p className="text-xs text-slate-700/80 max-w-2xl font-sans">
            Access curriculum schedules, workout routine checklists, and simulated video recordings for the 3-Day Live Masterclass.
          </p>
        </div>

        {/* Day Stepper Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id as any)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedDay === d.id
                  ? 'bg-white border-amber-900/30 shadow-xs'
                  : 'bg-white/60 border-amber-900/10 hover:bg-white/80'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-amber-900 uppercase">{d.id.toUpperCase()}</div>
              <div className="font-display font-bold text-slate-900 text-sm mt-1">{d.title.split('—')[1]}</div>
            </button>
          ))}
        </div>

        {/* Selected Day Content Container */}
        <div className="bg-white border border-amber-900/15 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-200 pb-4 space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase text-brand-blue">{current.routineStep}</div>
            <h2 className="text-xl font-display font-bold text-slate-900">{current.title}</h2>
            <p className="text-xs text-slate-600 font-sans">{current.subtitle}</p>
          </div>

          {/* Simulated Video Player Placeholder */}
          <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col items-center justify-center space-y-3 text-center min-h-[220px]">
            <div className="size-12 rounded-full bg-brand-blue flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <Play className="size-5 text-white ml-0.5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider">{current.title} (Recording)</div>
              <div className="text-[10px] font-mono text-slate-400">Duration: 1h 45m · Simulated Session Recording</div>
            </div>
          </div>

          {/* Routine Exercise Checklist */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-900">Day Exercise Checklist:</div>
            <div className="space-y-2">
              {current.tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-900/10 text-xs text-slate-800">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Workbook Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs font-mono">
            <button className="px-4 py-2 rounded-lg bg-amber-900 text-white font-bold hover:bg-amber-950 transition-colors flex items-center gap-2 cursor-pointer">
              <Download className="size-3.5" />
              <span>Download Day Workbook (PDF)</span>
            </button>
            <span className="text-[10px] text-slate-400">
              // PROTOTYPE ASSUMPTION — Simulated masterclass material
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionScreen;
