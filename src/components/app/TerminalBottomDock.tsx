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
      className="bg-white border-t border-[#EAEAE5] shrink-0 select-none transition-all z-20 shadow-xs"
    >
      {/* Top Collapsible Strip */}
      <div className="h-9 px-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleOpen}
            className="flex items-center gap-1.5 text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
            <span className="font-bold text-[#17181C] uppercase text-[11px]">7-Step Routine</span>
            <span className="text-[10px] text-[#059669] bg-[#ECFBF6] px-2 py-0.5 rounded-full border border-[#35C99A]/30 font-bold">
              {activeStep}/7 COMPLETED
            </span>
          </button>

          <span className="text-[#D0D4DD] hidden md:inline">•</span>

          {/* Active Step Teaser */}
          <div className="hidden md:flex items-center gap-2 text-[#666B76] text-xs">
            <span>Active:</span>
            <strong className="text-[#17181C]">
              Step {activeStep}: {routineSteps[activeStep - 1]?.title}
            </strong>
          </div>
        </div>

        {/* Global Sessions & Latency Status */}
        <div className="flex items-center gap-4 text-xs">
          {/* Active Market Sessions Badges */}
          <div className="hidden sm:flex items-center gap-2">
            <Globe2 className="size-3.5 text-[#666B76]" />
            {MARKET_SESSIONS.map((session) => (
              <div
                key={session.city}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  session.isOpen
                    ? 'bg-[#ECFBF6] text-[#059669] border border-[#35C99A]/20'
                    : 'bg-[#FAFAF7] text-[#666B76] border border-[#EAEAE5]'
                }`}
                title={`${session.name} (${session.hours})`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    session.isOpen ? 'bg-[#35C99A]' : 'bg-[#D0D4DD]'
                  }`}
                />
                <span>{session.city}</span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[#666B76]">
            <Activity className="size-3.5 text-[#4F6BFF]" />
            <span className="text-[#4F6BFF] font-semibold">11ms</span>
            <span className="text-[#D0D4DD]">/</span>
            <span>VELA WS</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#17181C] font-semibold">
            <Clock className="size-3.5 text-[#666B76]" />
            <span>{currentTimeUTC}</span>
          </div>
        </div>
      </div>

      {/* Expanded Routine Checklist Pane */}
      {isOpen && (
        <div className="p-4 border-t border-[#EAEAE5] bg-[#FAFAF7] space-y-3 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between text-xs">
            <div className="text-[#666B76] font-medium">
              Institutional Trade Preparation Sequence (Discipline &amp; Risk Invalidation)
            </div>
            <div className="text-[10px] text-[#666B76] uppercase tracking-wider font-semibold">
              CLICK A STEP TO TOGGLE CHECKLIST STATUS
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {routineSteps.map((step) => {
              const isPassed = step.num <= activeStep;
              const isCurrent = step.num === activeStep;

              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-white border-2 border-[#4F6BFF] shadow-xs ring-2 ring-[#4F6BFF]/10'
                      : isPassed
                      ? 'bg-white border-[#EAEAE5] hover:border-[#D0D4DD]'
                      : 'bg-white/60 border-[#EAEAE5] opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#666B76] font-bold">0{step.num}</span>
                    {isPassed ? (
                      <CheckCircle2 className="size-3.5 text-[#059669]" />
                    ) : (
                      <Circle className="size-3.5 text-[#D0D4DD]" />
                    )}
                  </div>
                  <div className="font-bold text-xs text-[#17181C] truncate">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-[#666B76] truncate mt-0.5">
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
