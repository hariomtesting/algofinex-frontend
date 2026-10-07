import React, { useState, useCallback } from 'react';
import type { Instrument, Timeframe } from './AppShell';
import { ContextualInspector, InspectorPoint } from './ContextualInspector';
import type { ChartType, ChartCrosshairData } from './TradingChart';
import { DrawingToolbar } from './DrawingToolbar';

const TradingChart = React.lazy(() => import('./TradingChart'));
import { TerminalSidePanel } from './TerminalSidePanel';
import { TerminalBottomDock } from './TerminalBottomDock';
import { DrawingToolType } from '../../types/trading';
import {
  SlidersHorizontal,
  Columns,
  Square,
  ChevronDown,
  Check
} from 'lucide-react';
import { WATCHLIST_DATA } from '../../data/mockChartData';

export type LensLayer = 'RAW' | 'STRUCTURE' | 'LIQUIDITY' | 'TREND' | 'CONFIRMATION';

interface WorkspaceScreenProps {
  selectedInstrument: Instrument;
  selectedTimeframe: Timeframe;
  activeLens: LensLayer;
  onLensChange: (lens: LensLayer) => void;
  onSelectInstrument?: (inst: Instrument) => void;
}

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  selectedInstrument,
  selectedTimeframe,
  activeLens,
  onLensChange,
  onSelectInstrument,
}) => {
  // Chart visual configurations
  const [chartType, setChartType] = useState<ChartType>('candles');
  const [showEMA, setShowEMA] = useState(true);
  const [showOrderBlocks, setShowOrderBlocks] = useState(true);
  const [showLiquidity, setShowLiquidity] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [isDualSplit, setIsDualSplit] = useState(false);

  // Indicators menu toggle
  const [isIndicatorsMenuOpen, setIsIndicatorsMenuOpen] = useState(false);

  // Active drawing tool
  const [activeDrawingTool, setActiveDrawingTool] = useState<DrawingToolType>('cursor');

  // Terminal side panel toggle & active inspector point
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isBottomDockOpen, setIsBottomDockOpen] = useState(false);
  const [activeInspectorPoint, setActiveInspectorPoint] = useState<InspectorPoint | null>({
    price: '$67,400',
    label: 'BOS ▲ 67,400',
    layer: 'STRUCTURE',
    type: 'STRUCTURE',
    description: 'Clean Break of Structure confirming higher timeframe bullish momentum continuation with institutional volume displacement.',
    invalidation: '$66,180',
    time: '10:15 UTC',
  });

  // Crosshair live scrub data
  const [crosshairData, setCrosshairData] = useState<ChartCrosshairData | null>(null);

  // Active quote fallback
  const quote = WATCHLIST_DATA.find((w) => w.symbol === selectedInstrument) || {
    symbol: selectedInstrument,
    price: 68220.50,
    change24h: 3.42,
    high24h: 68450,
    low24h: 65920,
    volume24h: '$38.4B',
  };

  const handleCrosshairMove = useCallback((data: ChartCrosshairData | null) => {
    setCrosshairData(data);
  }, []);

  const handleSelectInspectPoint = useCallback((point: InspectorPoint) => {
    setActiveInspectorPoint(point);
    setIsSidePanelOpen(true);
  }, []);

  // Display values for top legend
  const displayOpen = crosshairData ? crosshairData.open : quote.price * 0.995;
  const displayHigh = crosshairData ? crosshairData.high : quote.high24h;
  const displayLow = crosshairData ? crosshairData.low : quote.low24h;
  const displayClose = crosshairData ? crosshairData.close : quote.price;
  const isBullish = crosshairData ? crosshairData.isBull : quote.change24h >= 0;
  const displayChangePercent = crosshairData ? crosshairData.changePercent : quote.change24h;

  return (
    <div
      data-component="WorkspaceScreen"
      className="flex-1 flex flex-col h-full min-h-0 bg-[#05080E] text-white select-none overflow-hidden"
    >
      {/* 1. UPPER WORKSPACE TOOLBAR / LENS & INDICATORS BAR */}
      <div className="h-11 border-b border-white/10 px-3 bg-[#060A12] flex items-center justify-between shrink-0 overflow-x-auto gap-2 z-20">
        {/* Left: Strata Lenses (Raw, Structure, Liquidity, Trend, Confirmation) */}
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 mr-1 hidden sm:inline">
            Strata Lens:
          </span>
          {(['RAW', 'STRUCTURE', 'LIQUIDITY', 'TREND', 'CONFIRMATION'] as LensLayer[]).map(
            (lens) => (
              <button
                key={lens}
                onClick={() => onLensChange(lens)}
                className={`px-2 py-0.5 text-[11px] font-mono font-medium rounded-md transition-all cursor-pointer ${
                  activeLens === lens
                    ? 'bg-[#00F090] text-black font-bold shadow-[0_0_8px_#00F090]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {lens}
              </button>
            )
          )}
        </div>

        {/* Right Controls: Indicators Dropdown, Chart Style, Dual Split */}
        <div className="flex items-center gap-2 min-w-max">
          {/* Indicators Toggle Popover */}
          <div className="relative">
            <button
              onClick={() => setIsIndicatorsMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A0E1A] border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <SlidersHorizontal className="size-3 text-[#00E5FF]" />
              <span>Indicators</span>
              <span className="size-4 rounded-full bg-emerald-500/20 text-[#00F090] text-[9px] flex items-center justify-center font-bold">
                {[showEMA, showOrderBlocks, showLiquidity, showVolume, showRSI].filter(Boolean).length}
              </span>
              <ChevronDown className="size-3 text-slate-500 ml-0.5" />
            </button>

            {/* Popover Menu */}
            {isIndicatorsMenuOpen && (
              <div className="absolute right-0 top-9 w-60 bg-[#0A0E1A] border border-white/15 rounded-xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in-50 duration-100">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-500 font-bold border-b border-white/5 mb-1">
                  Active Overlays
                </div>

                {[
                  { label: 'Dynamic EMA 21/55 Cloud', state: showEMA, setter: setShowEMA },
                  { label: 'Order Blocks & FVG Zones', state: showOrderBlocks, setter: setShowOrderBlocks },
                  { label: 'Liquidity Pools (Equal H/L)', state: showLiquidity, setter: setShowLiquidity },
                  { label: 'Volume Histogram', state: showVolume, setter: setShowVolume },
                  { label: 'RSI (14) Momentum Sub-Pane', state: showRSI, setter: setShowRSI },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => item.setter(!item.state)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-left hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className={item.state ? 'text-white font-medium' : 'text-slate-500'}>
                      {item.label}
                    </span>
                    <div
                      className={`size-4 rounded flex items-center justify-center border ${
                        item.state
                          ? 'bg-[#00F090] border-[#00F090] text-black'
                          : 'border-white/20'
                      }`}
                    >
                      {item.state && <Check className="size-3 stroke-[3]" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chart Style (Candles / Line / Area) */}
          <div className="flex items-center bg-[#0A0E1A] border border-white/10 rounded-lg p-0.5">
            {(['candles', 'line', 'area'] as ChartType[]).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded capitalize transition-all cursor-pointer ${
                  chartType === type
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Dual Split Toggle */}
          <button
            onClick={() => setIsDualSplit((prev) => !prev)}
            title={isDualSplit ? 'Single Chart Layout' : 'Dual Split Layout'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDualSplit
                ? 'bg-cyan-500/20 text-[#00E5FF] border-cyan-500/40'
                : 'text-slate-500 hover:text-white border-white/10 bg-[#0A0E1A]'
            }`}
          >
            {isDualSplit ? <Columns className="size-3.5" /> : <Square className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. OHLCV LIVE COORDINATE INSPECTION STRIP */}
      <div className="h-8 border-b border-white/10 px-3 bg-[#080C14] flex items-center justify-between text-xs font-mono shrink-0 overflow-x-auto gap-3">
        <div className="flex items-center gap-2.5 min-w-max">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span>{selectedInstrument}</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-white/5 text-[#00E5FF]">
              {selectedTimeframe}
            </span>
          </div>

          <span className="text-slate-600">•</span>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>
              O: <strong className="text-white">${displayOpen.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </span>
            <span>
              H: <strong className="text-white">${displayHigh.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </span>
            <span>
              L: <strong className="text-white">${displayLow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </span>
            <span>
              C:{' '}
              <strong className={isBullish ? 'text-[#00F090]' : 'text-[#FF3B69]'}>
                ${displayClose.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </strong>
            </span>
            <span
              className={`font-semibold ${isBullish ? 'text-[#00F090]' : 'text-[#FF3B69]'}`}
            >
              ({isBullish ? '+' : ''}
              {displayChangePercent}%)
            </span>
          </div>
        </div>

        {/* Status / Invalidation Badge */}
        <div className="flex items-center gap-3 min-w-max text-[11px]">
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <span>Invalidation:</span>
            <strong className="text-[#FF3B69] font-bold">
              ${(quote.price * 0.985).toFixed(0)}
            </strong>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/20 font-semibold">
            {activeLens} ACTIVE
          </span>
        </div>
      </div>

      {/* 3. MAIN WORKSTATION CENTER: TOOLBAR + CHARTS + RIGHT PANEL */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* Left Drawing Toolbar */}
        <DrawingToolbar
          activeTool={activeDrawingTool}
          onSelectTool={setActiveDrawingTool}
          onClearDrawings={() => setActiveInspectorPoint(null)}
          onFitChart={() => {}}
        />

        {/* Primary Chart Canvas (Single or Dual) */}
        <div className="flex-1 flex flex-col md:flex-row min-w-0 h-full relative overflow-hidden">
          <React.Suspense
            fallback={
              <div className="flex-1 flex flex-col items-center justify-center bg-[#070B14] text-[#8B929C] font-mono text-xs gap-3">
                <div className="w-6 h-6 border-2 border-[#C8A96B] border-t-transparent rounded-full animate-spin" />
                <span className="tracking-widest text-[11px] text-[#A6AEB8]">INITIALIZING TRADING ENGINE...</span>
              </div>
            }
          >
            {/* Primary Chart */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
              <TradingChart
                instrument={selectedInstrument}
                timeframe={selectedTimeframe}
                chartType={chartType}
                activeLens={activeLens}
                showEMA={showEMA}
                showOrderBlocks={showOrderBlocks}
                showLiquidity={showLiquidity}
                showVolume={showVolume}
                showRSI={showRSI}
                onCrosshairMove={handleCrosshairMove}
                onSelectInspectPoint={handleSelectInspectPoint}
              />
            </div>

            {/* Secondary Chart (if Dual Split is enabled) */}
            {isDualSplit && (
              <div className="flex-1 flex flex-col min-w-0 h-full border-t md:border-t-0 md:border-l border-white/10 relative">
                <div className="h-7 bg-[#070B14] px-3 flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/5">
                  <span>ETH/USD · 1H CORRELATION PANE</span>
                  <span className="text-[#00F090]">SYNCED FEED</span>
                </div>
                <TradingChart
                  instrument="ETH/USD"
                  timeframe="1h"
                  chartType="candles"
                  activeLens={activeLens}
                  showEMA={showEMA}
                  showOrderBlocks={showOrderBlocks}
                  showLiquidity={false}
                  showVolume={showVolume}
                  showRSI={false}
                />
              </div>
            )}
          </React.Suspense>
        </div>

        {/* Right Multi-Tab Terminal Panel */}
        <TerminalSidePanel
          selectedInstrument={selectedInstrument}
          onSelectInstrument={(inst) => {
            if (onSelectInstrument) onSelectInstrument(inst);
          }}
          activeInspectPoint={activeInspectorPoint}
          onClearInspectPoint={() => setActiveInspectorPoint(null)}
          isOpen={isSidePanelOpen}
          onToggleOpen={() => setIsSidePanelOpen((prev) => !prev)}
        />
      </div>

      {/* 4. BOTTOM WORKSTATION DOCK (7-Step Routine & Global Telemetry) */}
      <TerminalBottomDock
        isOpen={isBottomDockOpen}
        onToggleOpen={() => setIsBottomDockOpen((prev) => !prev)}
      />

      {/* Mobile Drawer Contextual Inspector */}
      <div className="lg:hidden">
        <ContextualInspector
          point={activeInspectorPoint}
          onClose={() => setActiveInspectorPoint(null)}
        />
      </div>
    </div>
  );
};

export default WorkspaceScreen;
