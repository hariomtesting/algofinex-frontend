import React from 'react';
import {
  Calendar,
  Layers,
  ArrowRight,
  LineChart,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Compass
} from 'lucide-react';
import { AppTab, Instrument } from './AppShell';
import { WATCHLIST_DATA } from '../../data/mockChartData';
import { BorderBeam } from '../ui/BorderBeam';
import { SpotlightCard } from '../ui/SpotlightCard';

interface OverviewScreenProps {
  onNavigate: (tab: AppTab) => void;
  selectedInstrument: Instrument;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onNavigate,
  selectedInstrument,
}) => {
  return (
    <div
      data-component="OverviewScreen"
      className="p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto space-y-6 select-none text-left overflow-y-auto"
    >
      {/* 1. TOP QUANT TELEMETRY METRIC STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SpotlightCard
          spotlightColor="rgba(0, 240, 144, 0.15)"
          className="bg-[#0A0E1A] border-white/10 rounded-xl p-3.5 space-y-1 shadow-sm"
        >
          <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
            <span>Terminal Engine</span>
            <span className="size-1.5 rounded-full bg-[#00F090] animate-pulse" />
          </div>
          <div className="text-base font-mono font-bold text-white">VELA QUANT v4.2</div>
          <div className="text-[11px] font-mono text-emerald-400">100% OPERATIONAL</div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(0, 229, 255, 0.15)"
          className="bg-[#0A0E1A] border-white/10 rounded-xl p-3.5 space-y-1 shadow-sm"
        >
          <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
            <span>Active Preset</span>
            <Compass className="size-3 text-[#00E5FF]" />
          </div>
          <div className="text-base font-mono font-bold text-white">{selectedInstrument}</div>
          <div className="text-[11px] font-mono text-slate-400">15m TIMEFRAME ALIGNED</div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(168, 85, 247, 0.15)"
          className="bg-[#0A0E1A] border-white/10 rounded-xl p-3.5 space-y-1 shadow-sm"
        >
          <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
            <span>Indicator Suite</span>
            <Layers className="size-3 text-[#A855F7]" />
          </div>
          <div className="text-base font-mono font-bold text-white">4 STRATA READY</div>
          <div className="text-[11px] font-mono text-purple-400">PINE SCRIPT VERIFIED</div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(0, 240, 144, 0.15)"
          className="bg-[#0A0E1A] border-white/10 rounded-xl p-3.5 space-y-1 shadow-sm"
        >
          <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
            <span>License Pass</span>
            <ShieldCheck className="size-3 text-[#00F090]" />
          </div>
          <div className="text-base font-mono font-bold text-white">AF-8849-VALID</div>
          <div className="text-[11px] font-mono text-emerald-400">FULL ACCESS ACTIVE</div>
        </SpotlightCard>
      </div>

      {/* 2. PRIMARY HERO LAUNCHER CARD */}
      <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5 shadow-2xl relative overflow-hidden group">
        <BorderBeam duration={10} borderWidth={1.5} colorFrom="#00F090" colorTo="#00E5FF" />
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#00F090] animate-pulse shadow-[0_0_6px_#00F090]" />
            <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              Workstation Ready · LuxAlgo Vela Architecture
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 font-semibold">
            STATUS: REAL-TIME FEED READY
          </span>
        </div>

        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
            Read market structure with <span className="bg-gradient-to-r from-[#00F090] to-[#00E5FF] bg-clip-text text-transparent">institutional calm.</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed font-sans">
            Welcome to the AlgoFinex institutional quant workstation. Configure multi-layered market structure, unmitigated liquidity sweeps, and dynamic trend corridors directly on institutional TradingView Lightweight Charts.
          </p>
        </div>

        {/* Action Button & Quick Jump */}
        <div className="pt-2 flex flex-wrap items-center gap-4 relative z-10">
          <button
            onClick={() => onNavigate('workspace')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00F090] to-[#00E5FF] text-black text-xs font-mono font-bold hover:brightness-110 transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,240,144,0.3)] cursor-pointer"
          >
            <LineChart className="size-4 text-black" />
            <span>Launch Primary Trading Terminal ({selectedInstrument})</span>
            <ArrowRight className="size-4" />
          </button>

          <button
            onClick={() => onNavigate('indicators')}
            className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Layers className="size-4 text-[#00E5FF]" />
            <span>Review Indicator Code</span>
          </button>
        </div>
      </div>

      {/* 3. QUANTITATIVE MARKET OVERVIEW TABLE */}
      <div className="bg-[#080C14] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0A0E1A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="size-4 text-[#00E5FF]" />
            <span className="font-mono font-bold text-xs uppercase text-white tracking-wider">
              Live Quant Market Matrix
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            CLICK ANY ASSET TO OPEN DIRECTLY IN CHART
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#060A12] text-slate-400 border-b border-white/5 text-[10px] uppercase">
              <tr>
                <th className="p-3.5 pl-4">Asset</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-right">Price</th>
                <th className="p-3.5 text-right">24h Change</th>
                <th className="p-3.5 text-right">24h Volume</th>
                <th className="p-3.5">Structure State</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {WATCHLIST_DATA.slice(0, 5).map((item) => {
                const isPositive = item.change24h >= 0;
                return (
                  <tr
                    key={item.symbol}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => onNavigate('workspace')}
                  >
                    <td className="p-3.5 pl-4">
                      <div className="font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {item.symbol}
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans">{item.name}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-bold text-white">
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold ${
                          isPositive ? 'text-[#00F090]' : 'text-[#FF3B69]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        {isPositive ? '+' : ''}
                        {item.change24h}%
                      </span>
                    </td>
                    <td className="p-3.5 text-right text-slate-400">{item.volume24h}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/20 text-[10px]">
                        BULLISH BOS ALIGNED
                      </span>
                    </td>
                    <td className="p-3.5 pr-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('workspace');
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-[#00F090] hover:text-black text-slate-300 font-bold transition-all text-[11px]"
                      >
                        Chart →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. COMPANION ACCESS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Module A: TradingView Indicator Suite */}
        <div className="bg-[#080C14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-[#00E5FF]" />
                <span className="text-xs font-mono font-bold uppercase text-white">
                  TradingView Indicators
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#00F090] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                4/4 UNLOCKED
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Inspect technical specifications, mathematical logic formulas, and copy Pine Script invite keys for Market Structure, Liquidity Pools, Dynamic Cloud, and Invalidation models.
            </p>
          </div>
          <button
            onClick={() => onNavigate('indicators')}
            className="text-xs font-mono font-bold text-[#00E5FF] hover:text-cyan-300 flex items-center gap-1.5 pt-2 cursor-pointer"
          >
            <span>View Indicator Directory</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Module B: 3-Day Session Companion */}
        <div className="bg-[#080C14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all">
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
              Access the step-by-step masterclass curriculum: Day 01 Institutional Orientation, Day 02 Market Structure &amp; Liquidity Execution, and Day 03 Invalidation Mastery.
            </p>
          </div>
          <button
            onClick={() => onNavigate('session')}
            className="text-xs font-mono font-bold text-[#A855F7] hover:text-purple-300 flex items-center gap-1.5 pt-2 cursor-pointer"
          >
            <span>Open Session Companion</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Telemetry Footer Notice */}
      <div className="text-[11px] font-mono text-slate-500 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>// LUXALGO VELA WORKSTATION ARCHITECTURE · PASS AF-8849 VERIFIED</span>
        <span>CONNECTED TO ALGOFINEX REAL-TIME TELEMETRY</span>
      </div>
    </div>
  );
};

export default OverviewScreen;
