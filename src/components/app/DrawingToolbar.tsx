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
      className="w-10 bg-[#070B14] border-r border-white/10 flex flex-col items-center justify-between py-2 shrink-0 select-none z-20"
    >
      <div className="flex flex-col items-center gap-1">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTool(t.id)}
              title={t.label}
              className={`size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer relative group ${
                isActive
                  ? 'bg-emerald-500/15 text-[#00F090] border border-emerald-500/40 shadow-[0_0_10px_rgba(0,240,144,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="size-4" />
              {/* Tooltip */}
              <div className="absolute left-10 ml-1.5 px-2 py-1 bg-[#0A101D] border border-white/15 rounded text-[10px] font-mono font-medium text-white whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {t.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-white/10 pt-2 w-full px-1">
        {onFitChart && (
          <button
            onClick={onFitChart}
            title="Reset Chart View"
            className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer group relative"
          >
            <Maximize2 className="size-3.5" />
            <div className="absolute left-10 ml-1.5 px-2 py-1 bg-[#0A101D] border border-white/15 rounded text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              Reset View
            </div>
          </button>
        )}

        <button
          onClick={onClearDrawings}
          title="Clear Active Drawings"
          className="size-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer group relative"
        >
          <Trash2 className="size-3.5" />
          <div className="absolute left-10 ml-1.5 px-2 py-1 bg-[#0A101D] border border-white/15 rounded text-[10px] font-mono text-rose-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            Clear Annotations
          </div>
        </button>
      </div>
    </aside>
  );
};

export default DrawingToolbar;
