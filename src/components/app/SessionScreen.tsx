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
    <div data-component="SessionScreen" className="bg-[#05080E] min-h-screen p-6 md:p-10 select-none text-left text-white">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-5 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-[#00F090]" />
            <span className="text-xs font-mono font-bold uppercase text-[#00F090] tracking-wider">
              3-Day Session Companion
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            Live Masterclass Curriculum
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl font-sans">
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
                  ? 'bg-[#0E1528] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)] ring-1 ring-[#00E5FF]/30'
                  : 'bg-[#0A0E1A] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase">{d.id.toUpperCase()}</div>
              <div className="font-display font-bold text-white text-sm mt-1">{d.title.split('—')[1]}</div>
            </button>
          ))}
        </div>

        {/* Selected Day Content Container */}
        <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase text-[#00F090]">{current.routineStep}</div>
            <h2 className="text-xl font-display font-bold text-white">{current.title}</h2>
            <p className="text-xs text-slate-400 font-sans">{current.subtitle}</p>
          </div>

          {/* Simulated Video Player Placeholder */}
          <div className="bg-[#060A12] border border-white/10 rounded-xl p-8 text-white flex flex-col items-center justify-center space-y-3 text-center min-h-[220px]">
            <div className="size-14 rounded-full bg-gradient-to-tr from-[#00F090] to-[#00E5FF] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,144,0.4)]">
              <Play className="size-6 text-black ml-0.5 fill-black" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">{current.title} (Recording)</div>
              <div className="text-[10px] font-mono text-slate-400">Duration: 1h 45m · Simulated Session Recording</div>
            </div>
          </div>

          {/* Routine Exercise Checklist */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-white">Day Exercise Checklist:</div>
            <div className="space-y-2">
              {current.tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <CheckCircle2 className="size-4 text-[#00F090] shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Workbook Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-mono">
            <button className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 border border-white/15 transition-colors flex items-center gap-2 cursor-pointer">
              <Download className="size-3.5 text-[#00E5FF]" />
              <span>Download Day Workbook (PDF)</span>
            </button>
            <span className="text-[10px] text-slate-500">
              // LUXALGO VELA ENGINE — Simulated masterclass material
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionScreen;
