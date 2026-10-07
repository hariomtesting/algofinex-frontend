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
      <aside data-component="ContextualInspector" className="hidden lg:flex w-[380px] bg-white border-l border-[#EAEAE5] flex-col justify-between shrink-0 shadow-card z-30 select-none animate-in slide-in-from-right duration-200 text-left text-[#17181C]">
        <div>
          {/* Header */}
          <div className="h-12 border-b border-[#EAEAE5] px-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-[#4F6BFF]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#17181C]">
                Analytical Inspector
              </span>
            </div>
            <button
              onClick={onClose}
              className="size-7 rounded-lg hover:bg-[#FAFAF7] flex items-center justify-center text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Point Context Details */}
          <div className="p-5 space-y-5">
            {/* Price Badge */}
            <div className="bg-[#FAFAF7] border border-[#EAEAE5] rounded-2xl p-4 shadow-xs">
              <div className="text-[11px] font-semibold uppercase text-[#666B76] mb-1">
                Selected Coordinate
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-mono font-bold text-[#17181C]">{point.price}</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF] border border-[#4F6BFF]/20 font-bold">
                  {point.label}
                </span>
              </div>
              <div className="text-xs text-[#666B76] mt-2 flex items-center gap-1.5 font-mono">
                <span>Timestamp: {point.time}</span>
                <span>•</span>
                <span className="text-[#059669] font-medium font-sans">LIVE FEED</span>
              </div>
            </div>

            {/* Layer & Type Metadata */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">Analytical Strata:</span>
                <span className="font-bold text-[#17181C] uppercase">{point.layer}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">Classification:</span>
                <span className="font-bold text-[#17181C]">{point.type}</span>
              </div>
              {point.invalidation && (
                <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
                  <span className="text-[#666B76]">Invalidation Level:</span>
                  <span className="font-mono font-bold text-[#FF6B6B]">{point.invalidation}</span>
                </div>
              )}
            </div>

            {/* Technical Explanation */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase text-[#666B76] flex items-center gap-1.5">
                <Info className="size-3.5 text-[#4F6BFF]" />
                <span>Structural Context &amp; Rationale</span>
              </div>
              <p className="text-xs text-[#17181C] leading-relaxed bg-[#FAFAF7] p-3.5 rounded-2xl border border-[#EAEAE5]">
                {point.description}
              </p>
            </div>

            {/* Prototype Disclaimer */}
            <div className="bg-[#F4F0FF] border border-[#8B5CF6]/20 rounded-2xl p-3.5 flex gap-2.5 items-start text-xs text-[#8B5CF6]">
              <ShieldAlert className="size-4 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-xs">DEMO SIMULATION</div>
                <div className="text-[11px] text-[#666B76] leading-tight font-sans">
                  Demo market coordinate for structural analysis only. Not financial advice or trade signals.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-[#EAEAE5] bg-white">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-xl bg-[#FAFAF7] text-[#17181C] text-xs font-semibold hover:bg-[#F0F1EE] transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#EAEAE5]"
          >
            <span>Close Inspector</span>
            <X className="size-3.5" />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Sheet Drawer */}
      <div className="lg:hidden fixed inset-x-0 bottom-14 z-40 bg-white border-t border-[#EAEAE5] rounded-t-3xl p-6 shadow-card space-y-4 max-h-[60vh] overflow-y-auto animate-in slide-in-from-bottom duration-200 text-left text-[#17181C]">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEAE5]">
          <div className="flex items-center gap-2.5">
            <span className="text-base font-mono font-bold text-[#17181C]">{point.price}</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF] font-bold">
              {point.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-[#FAFAF7] flex items-center justify-center text-[#666B76] hover:text-[#17181C] cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs text-[#666B76] leading-relaxed">
          {point.description}
        </p>

        {point.invalidation && (
          <div className="text-xs font-mono font-bold text-[#FF6B6B] bg-red-50 p-3 rounded-xl border border-red-200">
            Invalidation Stop: {point.invalidation}
          </div>
        )}
      </div>
    </>
  );
};

export default ContextualInspector;
