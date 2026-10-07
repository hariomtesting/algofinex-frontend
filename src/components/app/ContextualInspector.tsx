import React from 'react';
import { X, Info, ShieldAlert, Layers } from 'lucide-react';
import { LensLayer } from './WorkspaceScreen';

export interface InspectorPoint {
  price: string;
  label: string;
  layer: LensLayer;
  type: 'STRUCTURE' | 'LIQUIDITY' | 'TREND' | 'CONFIRMATION';
  description: string;
  invalidation?: string;
  time: string;
}

interface ContextualInspectorProps {
  point: InspectorPoint | null;
  onClose: () => void;
}

export const ContextualInspector: React.FC<ContextualInspectorProps> = ({ point, onClose }) => {
  if (!point) return null;

  return (
    <>
      {/* Desktop Slide-Over Panel (380px) */}
      <aside data-component="ContextualInspector" className="hidden lg:flex w-[380px] bg-[#0A0E1A] border-l border-white/10 flex-col justify-between shrink-0 shadow-2xl z-30 select-none animate-in slide-in-from-right duration-200 text-left">
        <div>
          {/* Header */}
          <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between bg-[#060A12]">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-[#00F090]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Analytical Inspector
              </span>
            </div>
            <button
              onClick={onClose}
              className="size-7 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Point Context Details */}
          <div className="p-5 space-y-5">
            {/* Price Badge */}
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold mb-1">
                Selected Coordinate
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-bold text-white">{point.price}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/30 font-semibold">
                  {point.label}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                <span>Timestamp: {point.time}</span>
                <span>•</span>
                <span className="text-[#00F090] font-medium">SIMULATED FEED</span>
              </div>
            </div>

            {/* Layer & Type Metadata */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400 font-mono">Analytical Strata:</span>
                <span className="font-mono font-bold text-white uppercase">{point.layer}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400 font-mono">Classification:</span>
                <span className="font-mono font-bold text-white">{point.type}</span>
              </div>
              {point.invalidation && (
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-slate-400 font-mono">Invalidation Level:</span>
                  <span className="font-mono font-bold text-[#FF3B69]">{point.invalidation}</span>
                </div>
              )}
            </div>

            {/* Technical Explanation */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                <Info className="size-3.5 text-[#00E5FF]" />
                <span>Structural Context &amp; Rationale</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-lg border border-white/5">
                {point.description}
              </p>
            </div>

            {/* Prototype Disclaimer */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 flex gap-2.5 items-start text-[11px] text-purple-300">
              <ShieldAlert className="size-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1 font-mono">
                <div className="font-bold">PROTOTYPE SIMULATION</div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  // PROTOTYPE ASSUMPTION — Demo market coordinate for structural analysis only. Not financial advice or trade signals.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-white/10 bg-[#060A12]">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-lg bg-white/10 text-white text-xs font-mono font-bold hover:bg-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/10"
          >
            <span>Close Inspector</span>
            <X className="size-3.5" />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Sheet Drawer */}
      <div className="lg:hidden fixed inset-x-0 bottom-14 z-40 bg-[#0A0E1A] border-t border-white/15 rounded-t-2xl p-5 shadow-2xl space-y-4 max-h-[60vh] overflow-y-auto animate-in slide-in-from-bottom duration-200 text-left text-white">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-base font-mono font-bold text-white">{point.price}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-[#00E5FF] font-bold">
              {point.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {point.description}
        </p>

        {point.invalidation && (
          <div className="text-xs font-mono font-semibold text-[#FF3B69] bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
            Invalidation Stop: {point.invalidation}
          </div>
        )}
      </div>
    </>
  );
};

export default ContextualInspector;
