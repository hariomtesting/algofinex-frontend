import React, { useState } from 'react';
import {
  ListFilter,
  BarChart3,
  Layers,
  BellRing,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { Instrument } from './AppShell';
import {
  WATCHLIST_DATA,
  ORDERBOOK_DATA,
  ALGORITHMIC_ALERTS
} from '../../data/mockChartData';
import { InspectorPoint } from './ContextualInspector';

export type TerminalPanelTab = 'watchlist' | 'orderbook' | 'inspector' | 'signals';

interface TerminalSidePanelProps {
  selectedInstrument: Instrument;
  onSelectInstrument: (inst: Instrument) => void;
  activeInspectPoint: InspectorPoint | null;
  onClearInspectPoint: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const TerminalSidePanel: React.FC<TerminalSidePanelProps> = ({
  selectedInstrument,
  onSelectInstrument,
  activeInspectPoint,
  onClearInspectPoint,
  isOpen,
  onToggleOpen,
}) => {
  const [activeTab, setActiveTab] = useState<TerminalPanelTab>('watchlist');

  // Mini sparkline SVG renderer
  const renderSparkline = (points: number[], isPositive: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 64;
    const height = 22;

    const pathD = points
      .map((p, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 4) - 2;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathD}
          fill="none"
          stroke={isPositive ? '#059669' : '#FF6B6B'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  if (!isOpen) {
    return (
      <div className="hidden lg:flex flex-col border-l border-[#EAEAE5] bg-white w-10 items-center py-3 select-none shadow-xs">
        <button
          onClick={onToggleOpen}
          className="size-8 rounded-lg flex items-center justify-center text-[#666B76] hover:text-[#17181C] hover:bg-[#FAFAF7] transition-colors cursor-pointer"
          title="Expand Terminal Panel"
        >
          <ChevronRight className="size-4 rotate-180" />
        </button>
        <div className="mt-8 [writing-mode:vertical-lr] text-[10px] font-mono uppercase text-[#666B76] tracking-widest flex items-center gap-2">
          <span>TERMINAL DOCK</span>
          <span className="size-1.5 rounded-full bg-[#4F6BFF]"></span>
        </div>
      </div>
    );
  }

  return (
    <aside
      data-component="TerminalSidePanel"
      className="hidden lg:flex w-[340px] xl:w-[380px] bg-white border-l border-[#EAEAE5] flex-col justify-between shrink-0 select-none z-30 shadow-xs"
    >
      {/* Top Tabs Header */}
      <div className="h-12 border-b border-[#EAEAE5] px-2 bg-white flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'watchlist'
                ? 'bg-[#EEF2FF] text-[#4F6BFF] font-bold border border-[#4F6BFF]/20 shadow-xs'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <ListFilter className="size-3.5" />
            <span>Watch</span>
          </button>

          <button
            onClick={() => setActiveTab('orderbook')}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'orderbook'
                ? 'bg-[#EEF2FF] text-[#4F6BFF] font-bold border border-[#4F6BFF]/20 shadow-xs'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <BarChart3 className="size-3.5" />
            <span>Depth</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer relative ${
              activeTab === 'inspector'
                ? 'bg-[#EEF2FF] text-[#4F6BFF] font-bold border border-[#4F6BFF]/20 shadow-xs'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <Layers className="size-3.5" />
            <span>Inspector</span>
            {activeInspectPoint && (
              <span className="size-1.5 rounded-full bg-[#4F6BFF] animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'signals'
                ? 'bg-[#EEF2FF] text-[#4F6BFF] font-bold border border-[#4F6BFF]/20 shadow-xs'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <BellRing className="size-3.5" />
            <span>Alerts</span>
          </button>
        </div>

        <button
          onClick={onToggleOpen}
          className="size-7 rounded-lg hover:bg-[#FAFAF7] flex items-center justify-center text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer"
          title="Collapse Panel"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Main Tab Body Content */}
      <div className="flex-1 overflow-y-auto">
        {/* TAB 1: WATCHLIST */}
        {activeTab === 'watchlist' && (
          <div className="divide-y divide-[#F0F1EE]">
            <div className="p-3 bg-[#FAFAF7] border-b border-[#EAEAE5] flex items-center justify-between text-[11px] font-semibold text-[#666B76] uppercase">
              <span>Instrument</span>
              <div className="flex items-center gap-6">
                <span>Trend</span>
                <span>Last / 24h</span>
              </div>
            </div>

            {WATCHLIST_DATA.map((item) => {
              const isSelected = selectedInstrument === item.symbol;
              const isPositive = item.change24h >= 0;

              return (
                <button
                  key={item.symbol}
                  onClick={() => onSelectInstrument(item.symbol as Instrument)}
                  className={`w-full p-3 flex items-center justify-between transition-colors text-left cursor-pointer group ${
                    isSelected
                      ? 'bg-[#EEF2FF] border-l-2 border-[#4F6BFF]'
                      : 'hover:bg-[#FAFAF7] border-l-2 border-transparent'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-[#17181C] group-hover:text-[#4F6BFF] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#EAEAE5] text-[#666B76]">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#666B76] truncate max-w-[120px]">
                      {item.name}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sparkline */}
                    <div className="hidden sm:block opacity-80 group-hover:opacity-100 transition-opacity">
                      {renderSparkline(item.sparkline, isPositive)}
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-[#17181C]">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-[11px] font-mono font-semibold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#059669]' : 'text-[#FF6B6B]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        <span>
                          {isPositive ? '+' : ''}
                          {item.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* TAB 2: ORDER BOOK DEPTH */}
        {activeTab === 'orderbook' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#666B76] pb-2 border-b border-[#EAEAE5]">
              <span>ORDER BOOK ({selectedInstrument})</span>
              <span className="text-[11px] text-[#059669] font-medium">LIVE FEED</span>
            </div>

            {/* Asks (Sell Orders - Top, Coral) */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-[#666B76] flex justify-between px-1">
                <span>Price (USD)</span>
                <span>Size</span>
                <span>Total</span>
              </div>
              {ORDERBOOK_DATA.asks.map((ask, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center justify-between px-2 py-1 text-xs font-mono rounded overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 bottom-0 bg-red-100/40 pointer-events-none"
                    style={{ width: `${ask.depthPercent}%` }}
                  />
                  <span className="text-[#FF6B6B] font-semibold relative z-10">
                    ${ask.price.toFixed(2)}
                  </span>
                  <span className="text-[#17181C] relative z-10">{ask.size.toFixed(3)}</span>
                  <span className="text-[#666B76] relative z-10">{ask.total.toFixed(3)}</span>
                </div>
              ))}
            </div>

            {/* Spread Divider */}
            <div className="bg-[#FAFAF7] border border-[#EAEAE5] rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#666B76]">Spread:</span>
                <span className="text-[#17181C] font-bold">${ORDERBOOK_DATA.spread.toFixed(2)}</span>
                <span className="text-[10px] text-[#666B76]">({ORDERBOOK_DATA.spreadPercent}%)</span>
              </div>
              <div className="text-[#059669] font-bold">
                ${ORDERBOOK_DATA.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Bids (Buy Orders - Bottom, Mint) */}
            <div className="space-y-1">
              {ORDERBOOK_DATA.bids.map((bid, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center justify-between px-2 py-1 text-xs font-mono rounded overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 bottom-0 bg-emerald-100/40 pointer-events-none"
                    style={{ width: `${bid.depthPercent}%` }}
                  />
                  <span className="text-[#059669] font-semibold relative z-10">
                    ${bid.price.toFixed(2)}
                  </span>
                  <span className="text-[#17181C] relative z-10">{bid.size.toFixed(3)}</span>
                  <span className="text-[#666B76] relative z-10">{bid.total.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTEXTUAL INSPECTOR */}
        {activeTab === 'inspector' && (
          <div className="p-4 space-y-4 text-left">
            {activeInspectPoint ? (
              <div className="space-y-4">
                <div className="bg-[#FAFAF7] border border-[#EAEAE5] rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#666B76] uppercase">
                    <span>Inspected Coordinate</span>
                    <button
                      onClick={onClearInspectPoint}
                      className="text-[#666B76] hover:text-[#17181C] p-0.5 cursor-pointer"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-mono font-bold text-[#17181C]">
                      {activeInspectPoint.price}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF] border border-[#4F6BFF]/20 font-bold">
                      {activeInspectPoint.label}
                    </span>
                  </div>
                  <div className="text-xs text-[#666B76] mt-2 flex items-center gap-1.5">
                    <span>Time: {activeInspectPoint.time}</span>
                    <span>•</span>
                    <span className="text-[#059669] font-semibold">LIVE STRATA</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
                    <span className="text-[#666B76]">Strata Layer:</span>
                    <span className="font-bold text-[#17181C] uppercase">{activeInspectPoint.layer}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
                    <span className="text-[#666B76]">Classification:</span>
                    <span className="font-bold text-[#17181C]">{activeInspectPoint.type}</span>
                  </div>
                  {activeInspectPoint.invalidation && (
                    <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
                      <span className="text-[#666B76]">Invalidation Stop:</span>
                      <span className="font-mono font-bold text-[#FF6B6B]">{activeInspectPoint.invalidation}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase text-[#666B76] flex items-center gap-1.5">
                    <Info className="size-3.5 text-[#4F6BFF]" />
                    <span>Structural Rationale</span>
                  </div>
                  <p className="text-xs text-[#17181C] leading-relaxed bg-[#FAFAF7] p-3.5 rounded-xl border border-[#EAEAE5]">
                    {activeInspectPoint.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <Layers className="size-8 text-[#9CA3AF] mx-auto" />
                <div className="text-xs font-semibold text-[#17181C]">
                  No Coordinate Selected
                </div>
                <p className="text-xs text-[#666B76] max-w-[240px] mx-auto leading-relaxed">
                  Click on any candle or structural annotation on the chart to inspect mathematical context and invalidation thresholds.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ALGORITHMIC ALERTS */}
        {activeTab === 'signals' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#666B76] pb-2 border-b border-[#EAEAE5]">
              <span>ALGO SIGNALS STREAM</span>
              <span className="size-2 rounded-full bg-[#059669] animate-pulse" />
            </div>

            <div className="space-y-2.5">
              {ALGORITHMIC_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#EAEAE5] rounded-2xl p-3.5 space-y-2 hover:border-[#D0D4DD] shadow-xs transition-colors text-left"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#17181C]">{alert.symbol}</span>
                      <span className="text-[#D0D4DD]">•</span>
                      <span className="text-[#4F6BFF] font-semibold">{alert.timeframe}</span>
                    </div>
                    <span className="text-[#666B76] text-[11px]">{alert.time}</span>
                  </div>

                  <div className="text-xs text-[#17181C] font-semibold">
                    {alert.title}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-1.5 border-t border-[#F0F1EE]">
                    <div>
                      <span className="text-[#666B76]">Trigger: </span>
                      <span className="text-[#17181C] font-bold">${alert.price.toLocaleString()}</span>
                    </div>
                    <div className="text-[#059669] font-bold">
                      Score: {alert.qualityScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer Telemetry */}
      <div className="p-3 border-t border-[#EAEAE5] bg-[#FAFAF7] text-[11px] font-medium text-[#666B76] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#059669]">
          <ShieldCheck className="size-3.5" />
          <span>VELA QUANT v4.2</span>
        </div>
        <span>BUFFER: 100% OK</span>
      </div>
    </aside>
  );
};

export default TerminalSidePanel;
