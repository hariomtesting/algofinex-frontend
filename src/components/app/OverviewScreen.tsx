import React from 'react';
import { Calendar, Layers, ArrowRight } from 'lucide-react';
import { AppTab, Instrument } from './AppShell';

interface OverviewScreenProps {
  onNavigate: (tab: AppTab) => void;
  selectedInstrument: Instrument;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate, selectedInstrument }) => {
  return (
    <div data-component="OverviewScreen" className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none text-left">
      {/* 1. PRIMARY HERO SECTION — Orientation & Active State */}
      <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#00F090] animate-pulse shadow-[0_0_6px_#00F090]" />
            <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              System Active · LuxAlgo Vela Architecture
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 font-semibold">
            PASS: AF-8849-VALIDATED
          </span>
        </div>

        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
            Read market structure with <span className="bg-gradient-to-r from-[#00F090] to-[#00E5FF] bg-clip-text text-transparent">calm precision.</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed font-sans">
            Welcome to the AlgoFinex product workstation. The application is configured to your active market analysis preset (`{selectedInstrument}`). Use the workstation canvas to inspect market structure, liquidity pools, and trend corridors.
          </p>
        </div>

        {/* Hero Primary Continuation Action */}
        <div className="pt-2 flex flex-wrap items-center gap-4 relative z-10">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00F090] to-[#00E5FF] text-black text-xs font-mono font-bold hover:brightness-110 transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,240,144,0.3)] cursor-pointer"
          >
            <span>Launch Primary Workspace ({selectedInstrument})</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* 2. SECONDARY SECTION — Next Step & Companion Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module A: TradingView Indicator Suite */}
        <div className="bg-[#080C14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.1)] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-[#00E5FF]" />
                <span className="text-xs font-mono font-bold uppercase text-white">
                  TradingView Indicators
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#00F090] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                UNLOCKED
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Inspect technical specifications, mathematical logic formulas, and simulated access keys for the 4 indicator strata modules.
            </p>
          </div>
          <button
            onClick={() => onNavigate('indicators')}
            className="text-xs font-mono font-bold text-[#00E5FF] hover:text-cyan-300 flex items-center gap-1.5 pt-2 cursor-pointer"
          >
            <span>View Indicator Suite</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Module B: 3-Day Session Companion */}
        <div className="bg-[#080C14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.1)] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-[#A855F7]" />
                <span className="text-xs font-mono font-bold uppercase text-[#D8B4FE]">
                  3-Day Live Masterclass
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#C084FC] bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                ENROLLED
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Access curriculum schedules, exercise checklists, and workout journals for Day 01 Arrival, Day 02 Observation, and Day 03 Application.
            </p>
          </div>
          <button
            onClick={() => onNavigate('session')}
            className="text-xs font-mono font-bold text-[#A855F7] hover:text-purple-300 flex items-center gap-1.5 pt-2 cursor-pointer"
          >
            <span>Enter Session Companion</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Prototype Status Footer Note */}
      <div className="text-[11px] font-mono text-slate-500 border-t border-white/10 pt-4">
        // PROTOTYPE ASSUMPTION — Client-side orientation surface. All market feeds and access pass states are simulated.
      </div>
    </div>
  );
};

export default OverviewScreen;
