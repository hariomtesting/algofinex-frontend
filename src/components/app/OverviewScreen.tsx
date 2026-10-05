import React from 'react';
import { LineChart, Calendar, Layers, ArrowRight } from 'lucide-react';
import { AppTab, Instrument } from './AppShell';

interface OverviewScreenProps {
  onNavigate: (tab: AppTab) => void;
  selectedInstrument: Instrument;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate, selectedInstrument }) => {
  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none">
      {/* Welcome & System Status Banner */}
      <div className="bg-[#F8F8F6] border border-black/[0.08] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
              Prototype Workstation · Active Member
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-blue-50 text-brand-blue border border-blue-200/60 font-semibold">
            PASS: AF-8849-VALIDATED
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Read market structure with calm precision.
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-sans">
            Welcome to the AlgoFinex product workstation. Use the primary workspace to inspect multi-layered market structure, unmitigated liquidity pools, and smoothed trend corridors.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-5 py-2.5 rounded-lg bg-brand-blue text-white text-xs font-mono font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Open Primary Workspace ({selectedInstrument})</span>
            <ArrowRight className="size-4" />
          </button>
          <button
            onClick={() => onNavigate('session')}
            className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium hover:bg-slate-50 transition-colors cursor-pointer"
          >
            View 3-Day Masterclass
          </button>
        </div>
      </div>

      {/* Quick Access Orientation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Workspace Continuation */}
        <div className="bg-white border border-black/[0.08] rounded-xl p-6 space-y-4 hover:border-brand-blue/40 transition-all">
          <div className="flex items-center justify-between">
            <LineChart className="size-5 text-brand-blue" />
            <span className="text-[10px] font-mono text-slate-400">APP-02</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-base">Interactive Workspace</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              5 progressive clarity lenses (`RAW` → `CONFIRMATION`) across high-fidelity demo candlestick charts.
            </p>
          </div>
          <button
            onClick={() => onNavigate('workspace')}
            className="text-xs font-mono font-bold text-brand-blue hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            Launch Chart →
          </button>
        </div>

        {/* Card 2: Indicator Suite Catalog */}
        <div className="bg-white border border-black/[0.08] rounded-xl p-6 space-y-4 hover:border-brand-blue/40 transition-all">
          <div className="flex items-center justify-between">
            <Layers className="size-5 text-brand-blue" />
            <span className="text-[10px] font-mono text-slate-400">APP-03</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-base">Indicator Suite Directory</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Explore TradingView indicator architecture, formula documentation, and access invite parameters.
            </p>
          </div>
          <button
            onClick={() => onNavigate('indicators')}
            className="text-xs font-mono font-bold text-brand-blue hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            View Suite →
          </button>
        </div>

        {/* Card 3: 3-Day Live Session */}
        <div className="bg-[#F4F2EC] border border-amber-900/10 rounded-xl p-6 space-y-4 hover:border-amber-900/20 transition-all">
          <div className="flex items-center justify-between">
            <Calendar className="size-5 text-amber-900" />
            <span className="text-[10px] font-mono text-amber-800/60">APP-04</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-base">3-Day Live Masterclass</h3>
            <p className="text-xs text-slate-700/80 mt-1 leading-relaxed">
              Access Day 01 Arrival, Day 02 Observation, and Day 03 Application exercises and workout checklists.
            </p>
          </div>
          <button
            onClick={() => onNavigate('session')}
            className="text-xs font-mono font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
          >
            Enter Companion →
          </button>
        </div>
      </div>

      {/* Prototype Status Note */}
      <div className="text-[11px] font-mono text-slate-400 border-t border-black/[0.06] pt-4">
        // PROTOTYPE ASSUMPTION — Simulated client-side application hub. No real financial services attached.
      </div>
    </div>
  );
};

export default OverviewScreen;
