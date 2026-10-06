import React from 'react';
import { Calendar, Layers, ArrowRight } from 'lucide-react';
import { AppTab, Instrument } from './AppShell';

interface OverviewScreenProps {
  onNavigate: (tab: AppTab) => void;
  selectedInstrument: Instrument;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate, selectedInstrument }) => {
  return (
    <div data-component="OverviewScreen" className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none">
      {/* 1. PRIMARY HERO SECTION — Orientation & Active State */}
      <div className="bg-[#F8F8F6] border border-black/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
              System Active · Simulated Workstation
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 text-brand-blue border border-blue-200/60 font-semibold">
            PASS: AF-8849-VALIDATED
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Read market structure with calm precision.
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-sans">
            Welcome to the AlgoFinex product workstation. The application is configured to your active market analysis preset (`{selectedInstrument}`). Use the workstation canvas to inspect market structure, liquidity pools, and trend corridors.
          </p>
        </div>

        {/* Hero Primary Continuation Action */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-mono font-bold hover:bg-blue-700 transition-all flex items-center gap-2.5 shadow-xs cursor-pointer"
          >
            <span>Launch Primary Workspace ({selectedInstrument})</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* 2. SECONDARY SECTION — Next Step & Companion Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module A: TradingView Indicator Suite */}
        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-brand-blue/30 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-brand-blue" />
                <span className="text-xs font-mono font-bold uppercase text-slate-800">
                  TradingView Indicators
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                UNLOCKED
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Inspect technical specifications, mathematical logic formulas, and simulated access keys for the 4 indicator strata modules.
            </p>
          </div>
          <button
            onClick={() => onNavigate('indicators')}
            className="text-xs font-mono font-bold text-brand-blue hover:text-blue-800 flex items-center gap-1.5 pt-2 cursor-pointer"
          >
            <span>View Indicator Suite</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Module B: 3-Day Session Companion */}
        <div className="bg-[#F4F2EC] border border-amber-900/15 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-900/30 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-amber-900" />
                <span className="text-xs font-mono font-bold uppercase text-amber-900">
                  3-Day Live Masterclass
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-900/20">
                ENROLLED
              </span>
            </div>
            <p className="text-xs text-slate-700/80 leading-relaxed font-sans">
              Access curriculum schedules, exercise checklists, and workout journals for Day 01 Arrival, Day 02 Observation, and Day 03 Application.
            </p>
          </div>
          <button
            onClick={() => onNavigate('session')}
            className="text-xs font-mono font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 pt-2 cursor-pointer"
          >
            <span>Enter Session Companion</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Prototype Status Footer Note */}
      <div className="text-[11px] font-mono text-slate-400 border-t border-black/[0.06] pt-4">
        // PROTOTYPE ASSUMPTION — Client-side orientation surface. All market feeds and access pass states are simulated.
      </div>
    </div>
  );
};

export default OverviewScreen;
