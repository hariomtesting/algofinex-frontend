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
      <aside className="hidden lg:flex w-[380px] bg-white border-l border-black/[0.08] flex-col justify-between shrink-0 shadow-lg z-30 select-none animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="h-12 border-b border-black/[0.08] px-4 flex items-center justify-between bg-[#F8F8F6]">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-brand-blue" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                Analytical Inspector
              </span>
            </div>
            <button
              onClick={onClose}
              className="size-7 rounded-md hover:bg-black/[0.06] flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Point Context Details */}
          <div className="p-5 space-y-5">
            {/* Price Badge */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-600 font-semibold mb-1">
                Selected Coordinate
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-bold text-slate-900">{point.price}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-200 font-semibold">
                  {point.label}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-600 mt-2 flex items-center gap-1.5">
                <span>Timestamp: {point.time}</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">SIMULATED FEED</span>
              </div>
            </div>

            {/* Layer & Type Metadata */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-black/[0.06]">
                <span className="text-slate-600 font-mono">Analytical Strata:</span>
                <span className="font-mono font-bold text-slate-900 uppercase">{point.layer}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-black/[0.06]">
                <span className="text-slate-600 font-mono">Classification:</span>
                <span className="font-mono font-bold text-slate-900">{point.type}</span>
              </div>
              {point.invalidation && (
                <div className="flex justify-between py-2 border-b border-black/[0.06]">
                  <span className="text-slate-600 font-mono">Invalidation Level:</span>
                  <span className="font-mono font-bold text-rose-700">{point.invalidation}</span>
                </div>
              )}
            </div>

            {/* Editorial Technical Explanation */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-semibold uppercase text-slate-600 flex items-center gap-1.5">
                <Info className="size-3.5 text-brand-blue" />
                <span>Structural Context &amp; Rationale</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 p-3.5 rounded-lg border border-slate-200/60">
                {point.description}
              </p>
            </div>

            {/* Prototype Disclaimer */}
            <div className="bg-amber-50/80 border border-amber-200/70 rounded-lg p-3 flex gap-2.5 items-start text-[11px] text-amber-900">
              <ShieldAlert className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 font-mono">
                <div className="font-bold">PROTOTYPE SIMULATION</div>
                <div className="text-[10px] text-amber-800 leading-tight">
                  // PROTOTYPE ASSUMPTION — Demo market coordinate for structural analysis only. Not financial advice or trade signals.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-black/[0.08] bg-[#F8F8F6]">
          <button
            onClick={onClose}
            className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-mono font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Close Inspector</span>
            <X className="size-3.5" />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Sheet Drawer */}
      <div className="lg:hidden fixed inset-x-0 bottom-14 z-40 bg-white border-t border-black/[0.12] rounded-t-2xl p-5 shadow-2xl space-y-4 max-h-[60vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-base font-mono font-bold text-slate-900">{point.price}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-bold">
              {point.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          {point.description}
        </p>

        {point.invalidation && (
          <div className="text-xs font-mono font-semibold text-rose-700 bg-rose-50 p-2.5 rounded border border-rose-200">
            Invalidation Coordinate: {point.invalidation}
          </div>
        )}

        <div className="text-[10px] font-mono text-slate-400">
          // PROTOTYPE ASSUMPTION — Simulated market coordinate
        </div>
      </div>
    </>
  );
};

export default ContextualInspector;
