import React, { useState, useEffect } from 'react';
import {
  Clock,
  Activity,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Globe2
} from 'lucide-react';
import { MARKET_SESSIONS } from '../../data/mockChartData';

interface TerminalBottomDockProps {
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const TerminalBottomDock: React.FC<TerminalBottomDockProps> = ({
  isOpen,
  onToggleOpen,
}) => {
  const [activeStep, setActiveStep] = useState<number>(3); // Step 3 active by default
  const [currentTimeUTC, setCurrentTimeUTC] = useState<string>('');

  const routineSteps = [
    { num: 1, title: 'Market Regime', desc: 'Identify Range vs Expansion' },
    { num: 2, title: 'HTF Structure', desc: '4H/1H Directional Order Flow' },
    { num: 3, title: 'Liquidity Pools', desc: 'Mark Unmitigated Sweeps' },
    { num: 4, title: 'Order Blocks & FVG', desc: 'Locate Institutional Footprints' },
    { num: 5, title: 'LTF Confirmation', desc: '15m/5m BOS & Displacement' },
    { num: 6, title: 'Invalidation Stop', desc: 'Precise Invalidation Anchoring' },
    { num: 7, title: 'Execution & Scale', desc: 'Pre-Defined R:R Position Entry' },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getUTCHours().toString().padStart(2, '0');
      const minutes = now.getUTCMinutes().toString().padStart(2, '0');
      const seconds = now.getUTCSeconds().toString().padStart(2, '0');
      setCurrentTimeUTC(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      data-component="TerminalBottomDock"
      className="bg-[#060A12] border-t border-white/10 shrink-0 select-none transition-all z-20"
    >
      {/* Top Collapsible Strip */}
      <div className="h-9 px-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleOpen}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
            <span className="font-bold text-white uppercase text-[11px]">7-Step Routine</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
              {activeStep}/7 COMPLETED
            </span>
          </button>

          <span className="text-slate-600 hidden md:inline">•</span>

          {/* Active Step Teaser */}
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-[11px]">
            <span>Active:</span>
            <strong className="text-white">
              Step {activeStep}: {routineSteps[activeStep - 1]?.title}
            </strong>
          </div>
        </div>

        {/* Global Sessions & Latency Status */}
        <div className="flex items-center gap-4 text-[11px]">
          {/* Active Market Sessions Badges */}
          <div className="hidden sm:flex items-center gap-2">
            <Globe2 className="size-3 text-slate-500" />
            {MARKET_SESSIONS.map((session) => (
              <div
                key={session.city}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
                  session.isOpen
                    ? 'bg-emerald-500/10 text-[#00F090] border border-emerald-500/20'
                    : 'bg-white/5 text-slate-500'
                }`}
                title={`${session.name} (${session.hours})`}
              >
                <span
                  className={`size-1 rounded-full ${
                    session.isOpen ? 'bg-[#00F090] shadow-[0_0_4px_#00F090]' : 'bg-slate-600'
                  }`}
                />
                <span>{session.city}</span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Activity className="size-3 text-[#00E5FF]" />
            <span className="text-[#00E5FF]">11ms</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">VELA WS</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <Clock className="size-3 text-slate-500" />
            <span>{currentTimeUTC}</span>
          </div>
        </div>
      </div>

      {/* Expanded Routine Checklist Pane */}
      {isOpen && (
        <div className="p-4 border-t border-white/5 bg-[#070B14] space-y-3 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="text-slate-400">
              Institutional Trade Preparation Sequence (Discipline &amp; Risk Invalidation)
            </div>
            <div className="text-[10px] text-slate-500">
              CLICK A STEP TO TOGGLE CHECKLIST STATUS
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {routineSteps.map((step) => {
              const isPassed = step.num <= activeStep;
              const isCurrent = step.num === activeStep;

              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_12px_rgba(0,240,144,0.15)] ring-1 ring-emerald-500/20'
                      : isPassed
                      ? 'bg-[#0A0E1A] border-white/10 hover:border-white/20'
                      : 'bg-[#060A12] border-white/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-slate-500">0{step.num}</span>
                    {isPassed ? (
                      <CheckCircle2 className="size-3 text-[#00F090]" />
                    ) : (
                      <Circle className="size-3 text-slate-600" />
                    )}
                  </div>
                  <div className="font-mono font-bold text-xs text-white truncate">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans truncate mt-0.5">
                    {step.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </footer>
  );
};

export default TerminalBottomDock;
