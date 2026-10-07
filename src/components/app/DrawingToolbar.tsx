import React from 'react';
import {
  MousePointer2,
  TrendingUp,
  Minus,
  Percent,
  Target,
  Type,
  Trash2,
  Maximize2
} from 'lucide-react';
import { DrawingToolType } from '../../types/trading';

interface DrawingToolbarProps {
  activeTool: DrawingToolType;
  onSelectTool: (tool: DrawingToolType) => void;
  onClearDrawings: () => void;
  onFitChart?: () => void;
}

export const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  activeTool,
  onSelectTool,
  onClearDrawings,
  onFitChart,
}) => {
  const tools: { id: DrawingToolType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'cursor', label: 'Crosshair / Pointer', icon: MousePointer2 },
    { id: 'trendline', label: 'Trendline Ray', icon: TrendingUp },
    { id: 'horizontal_ray', label: 'Horizontal S/R Ray', icon: Minus },
    { id: 'fibonacci', label: 'Fibonacci Retracement', icon: Percent },
    { id: 'position', label: 'Long / Short Risk Calculator', icon: Target },
    { id: 'text', label: 'Text Annotation', icon: Type },
  ];

  return (
    <aside
      data-component="DrawingToolbar"
      className="w-12 bg-white border-r border-[#EAEAE5] flex flex-col items-center justify-between py-3 shrink-0 select-none z-20 shadow-xs"
    >
      <div className="flex flex-col items-center gap-1.5">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTool(t.id)}
              title={t.label}
              className={`size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-[#EEF2FF] text-[#4F6BFF] border border-[#4F6BFF]/30 shadow-xs'
                  : 'text-[#666B76] hover:text-[#17181C] hover:bg-[#FAFAF7] border border-transparent'
              }`}
            >
              <Icon className="size-4" />
              {/* Tooltip */}
              <div className="absolute left-12 ml-2 px-2.5 py-1 bg-white border border-[#EAEAE5] rounded-xl text-[11px] font-medium text-[#17181C] whitespace-nowrap shadow-card opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {t.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1.5 border-t border-[#EAEAE5] pt-3 w-full px-1.5">
        {onFitChart && (
          <button
            onClick={onFitChart}
            title="Reset Chart View"
            className="size-9 rounded-xl flex items-center justify-center text-[#666B76] hover:text-[#17181C] hover:bg-[#FAFAF7] transition-colors cursor-pointer group relative"
          >
            <Maximize2 className="size-4" />
            <div className="absolute left-12 ml-2 px-2.5 py-1 bg-white border border-[#EAEAE5] rounded-xl text-[11px] font-medium text-[#17181C] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-card">
              Reset View
            </div>
          </button>
        )}

        <button
          onClick={onClearDrawings}
          title="Clear Active Drawings"
          className="size-9 rounded-xl flex items-center justify-center text-[#666B76] hover:text-[#FF6B6B] hover:bg-red-50 transition-colors cursor-pointer group relative"
        >
          <Trash2 className="size-4" />
          <div className="absolute left-12 ml-2 px-2.5 py-1 bg-white border border-[#EAEAE5] rounded-xl text-[11px] font-medium text-[#FF6B6B] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-card">
            Clear Annotations
          </div>
        </button>
      </div>
    </aside>
  );
};

export default DrawingToolbar;
