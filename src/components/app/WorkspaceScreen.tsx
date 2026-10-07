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
      className="flex-1 flex flex-col h-full min-h-0 bg-[#FAFAF7] text-[#17181C] select-none overflow-hidden"
    >
      {/* 1. UPPER WORKSPACE TOOLBAR / LENS & INDICATORS BAR */}
      <div className="h-11 border-b border-[#EAEAE5] px-4 bg-white flex items-center justify-between shrink-0 overflow-x-auto gap-3 z-20">
        {/* Left: Strata Lenses (Raw, Structure, Liquidity, Trend, Confirmation) */}
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[11px] font-semibold uppercase text-[#666B76] mr-1 hidden sm:inline">
            Strata Lens:
          </span>
          {(['RAW', 'STRUCTURE', 'LIQUIDITY', 'TREND', 'CONFIRMATION'] as LensLayer[]).map(
            (lens) => (
              <button
                key={lens}
                onClick={() => onLensChange(lens)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                  activeLens === lens
                    ? 'bg-[#4F6BFF] text-white font-bold shadow-xs'
                    : 'text-[#666B76] hover:text-[#17181C] hover:bg-[#FAFAF7]'
                }`}
              >
                {lens}
              </button>
            )
          )}
        </div>

        {/* Right Controls: Indicators Dropdown, Chart Style, Dual Split */}
        <div className="flex items-center gap-2.5 min-w-max">
          {/* Indicators Toggle Popover */}
          <div className="relative">
            <button
              onClick={() => setIsIndicatorsMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#FAFAF7] hover:bg-white border border-[#EAEAE5] hover:border-[#4F6BFF]/40 text-xs font-medium text-[#17181C] transition-all cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="size-3.5 text-[#4F6BFF]" />
              <span>Indicators</span>
              <span className="size-4 rounded-full bg-[#EEF2FF] text-[#4F6BFF] text-[10px] flex items-center justify-center font-bold">
                {[showEMA, showOrderBlocks, showLiquidity, showVolume, showRSI].filter(Boolean).length}
              </span>
              <ChevronDown className="size-3 text-[#666B76] ml-0.5" />
            </button>

            {/* Popover Menu */}
            {isIndicatorsMenuOpen && (
              <div className="absolute right-0 top-10 w-64 bg-white border border-[#EAEAE5] rounded-2xl shadow-card p-2 space-y-1 z-50 animate-in fade-in-50 duration-100">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase text-[#666B76] border-b border-[#F0F1EE] mb-1">
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
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left hover:bg-[#FAFAF7] transition-colors cursor-pointer font-medium"
                  >
                    <span className={item.state ? 'text-[#17181C] font-semibold' : 'text-[#666B76]'}>
                      {item.label}
                    </span>
                    <div
                      className={`size-4 rounded flex items-center justify-center border ${
                        item.state
                          ? 'bg-[#4F6BFF] border-[#4F6BFF] text-white'
                          : 'border-[#EAEAE5]'
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
          <div className="flex items-center bg-[#FAFAF7] border border-[#EAEAE5] rounded-xl p-0.5 shadow-xs">
            {(['candles', 'line', 'area'] as ChartType[]).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-2.5 py-1 text-xs font-mono uppercase rounded-lg capitalize transition-all cursor-pointer ${
                  chartType === type
                    ? 'bg-[#4F6BFF] text-white font-bold shadow-xs'
                    : 'text-[#666B76] hover:text-[#17181C]'
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
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              isDualSplit
                ? 'bg-[#EEF2FF] text-[#4F6BFF] border-[#4F6BFF]/30 shadow-xs'
                : 'text-[#666B76] hover:text-[#17181C] border-[#EAEAE5] bg-[#FAFAF7]'
            }`}
          >
            {isDualSplit ? <Columns className="size-3.5" /> : <Square className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. OHLCV LIVE COORDINATE INSPECTION STRIP */}
      <div className="h-8 border-b border-[#EAEAE5] px-4 bg-[#FAFAF7] flex items-center justify-between text-xs font-mono shrink-0 overflow-x-auto gap-3">
        <div className="flex items-center gap-3 min-w-max">
          <div className="flex items-center gap-2 font-bold text-[#17181C]">
            <span>{selectedInstrument}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#EAEAE5] text-[#4F6BFF]">
              {selectedTimeframe}
            </span>
          </div>

          <span className="text-[#D0D4DD]">•</span>

          <div className="flex items-center gap-3 text-[#666B76] text-xs">
            <span>
              O: <strong className="text-[#17181C]">${displayOpen.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </span>
            <span>
              H: <strong className="text-[#17181C]">${displayHigh.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </span>
            <span>
              L: <strong className="text-[#17181C]">${displayLow.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </span>
            <span>
              C:{' '}
              <strong className={isBullish ? 'text-[#059669]' : 'text-[#FF6B6B]'}>
                ${displayClose.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </strong>
            </span>
            <span
              className={`font-semibold ${isBullish ? 'text-[#059669]' : 'text-[#FF6B6B]'}`}
            >
              ({isBullish ? '+' : ''}
              {displayChangePercent}%)
            </span>
          </div>
        </div>

        {/* Status / Invalidation Badge */}
        <div className="flex items-center gap-3 min-w-max text-xs">
          <div className="hidden md:flex items-center gap-1.5 text-[#666B76]">
            <span>Invalidation:</span>
            <strong className="text-[#FF6B6B] font-bold">
              ${(quote.price * 0.985).toFixed(0)}
            </strong>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF] border border-[#4F6BFF]/20 font-bold">
            {activeLens} ACTIVE
          </span>
        </div>
      </div>

      {/* 3. MAIN WORKSTATION CENTER: TOOLBAR + CHARTS + RIGHT PANEL */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden bg-white">
        {/* Left Drawing Toolbar */}
        <DrawingToolbar
          activeTool={activeDrawingTool}
          onSelectTool={setActiveDrawingTool}
          onClearDrawings={() => setActiveInspectorPoint(null)}
          onFitChart={() => {}}
        />

        {/* Primary Chart Canvas (Single or Dual) */}
        <div className="flex-1 flex flex-col md:flex-row min-w-0 h-full relative overflow-hidden bg-white">
          <React.Suspense
            fallback={
              <div className="flex-1 flex flex-col items-center justify-center bg-white text-[#666B76] text-xs gap-3 font-medium">
                <div className="w-7 h-7 border-2 border-[#4F6BFF] border-t-transparent rounded-full animate-spin" />
                <span className="tracking-wider text-xs text-[#17181C]">INITIALIZING TRADING ENGINE...</span>
              </div>
            }
          >
            {/* Primary Chart */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative bg-white">
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
              <div className="flex-1 flex flex-col min-w-0 h-full border-t md:border-t-0 md:border-l border-[#EAEAE5] relative bg-white">
                <div className="h-8 bg-[#FAFAF7] px-3 flex items-center justify-between text-xs font-mono text-[#666B76] border-b border-[#EAEAE5]">
                  <span>ETH/USD · 1H CORRELATION PANE</span>
                  <span className="text-[#059669] font-bold">SYNCED FEED</span>
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
