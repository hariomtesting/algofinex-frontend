import React from 'react';
import { TELEMETRY_TICKER_ITEMS } from '../../data/mockChartData';
import { ShieldCheck, Zap } from 'lucide-react';

export const TelemetryBar: React.FC = () => {
  return (
    <div className="w-full border-y border-white/[0.06] bg-canvas/70 backdrop-blur-md overflow-hidden py-2.5">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono w-full min-w-0">
        
        {/* Left Status Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5 text-signal-bull font-medium">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-bull opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-signal-bull"></span>
            </span>
            FEED ACTIVE
          </span>
          <span className="text-border-medium">|</span>
          <span className="text-text-muted flex items-center gap-1">
            <Zap className="size-3 text-brand-blue" />
            Indicator Engine: <span className="text-text-primary">Synchronized</span>
          </span>
        </div>

        {/* Ticker Items */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full max-w-full min-w-0 md:w-auto py-1 md:py-0">
          {TELEMETRY_TICKER_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="text-text-secondary font-semibold">{item.symbol}</span>
              <span className="text-text-primary">{item.price}</span>
              <span className={item.change.startsWith('+') ? 'text-signal-bull' : 'text-signal-bear'}>
                {item.change}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-text-muted">
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Right Assurance */}
        <div className="hidden xl:flex items-center gap-1.5 text-text-muted shrink-0">
          <ShieldCheck className="size-3.5 text-brand-blue" />
          <span>Non-repainting indicator logic</span>
        </div>
      </div>
    </div>
  );
};

export default TelemetryBar;
