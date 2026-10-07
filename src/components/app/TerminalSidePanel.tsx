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
          stroke={isPositive ? '#00F090' : '#FF3B69'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  if (!isOpen) {
    return (
      <div className="hidden lg:flex flex-col border-l border-white/10 bg-[#070B14] w-10 items-center py-3 select-none">
        <button
          onClick={onToggleOpen}
          className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Expand Terminal Panel"
        >
          <ChevronRight className="size-4 rotate-180" />
        </button>
        <div className="mt-8 [writing-mode:vertical-lr] text-[10px] font-mono uppercase text-slate-500 tracking-widest flex items-center gap-2">
          <span>TERMINAL DOCK</span>
          <span className="size-1 rounded-full bg-[#00F090]"></span>
        </div>
      </div>
    );
  }

  return (
    <aside
      data-component="TerminalSidePanel"
      className="hidden lg:flex w-[340px] xl:w-[380px] bg-[#070B14] border-l border-white/10 flex-col justify-between shrink-0 select-none z-30"
    >
      {/* Top Tabs Header */}
      <div className="h-12 border-b border-white/10 px-2 bg-[#060A12] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'watchlist'
                ? 'bg-emerald-500/15 text-[#00F090] font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListFilter className="size-3.5" />
            <span>Watch</span>
          </button>

          <button
            onClick={() => setActiveTab('orderbook')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'orderbook'
                ? 'bg-cyan-500/15 text-[#00E5FF] font-bold border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="size-3.5" />
            <span>Depth</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer relative ${
              activeTab === 'inspector'
                ? 'bg-purple-500/15 text-[#D8B4FE] font-bold border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="size-3.5" />
            <span>Inspector</span>
            {activeInspectPoint && (
              <span className="size-1.5 rounded-full bg-[#00F090] animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'signals'
                ? 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BellRing className="size-3.5" />
            <span>Alerts</span>
          </button>
        </div>

        <button
          onClick={onToggleOpen}
          className="size-7 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Collapse Panel"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Main Tab Body Content */}
      <div className="flex-1 overflow-y-auto">
        {/* TAB 1: WATCHLIST */}
        {activeTab === 'watchlist' && (
          <div className="divide-y divide-white/5">
            <div className="p-3 bg-[#0A0E1A] border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
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
                      ? 'bg-emerald-500/10 border-l-2 border-[#00F090]'
                      : 'hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-white group-hover:text-[#00E5FF] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans truncate max-w-[110px]">
                      {item.name}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sparkline */}
                    <div className="hidden sm:block opacity-75 group-hover:opacity-100 transition-opacity">
                      {renderSparkline(item.sparkline, isPositive)}
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-white">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-[10px] font-mono font-semibold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#00F090]' : 'text-[#FF3B69]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
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
          <div className="p-3 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/10">
              <span>ORDER BOOK ({selectedInstrument})</span>
              <span className="text-[10px] text-emerald-400">LIVE FEED</span>
            </div>

            {/* Asks (Sell Orders - Top, Red) */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500 flex justify-between px-1">
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
                    className="absolute top-0 right-0 bottom-0 bg-rose-500/10 pointer-events-none"
                    style={{ width: `${ask.depthPercent}%` }}
                  />
                  <span className="text-[#FF3B69] font-semibold relative z-10">
                    ${ask.price.toFixed(2)}
                  </span>
                  <span className="text-slate-300 relative z-10">{ask.size.toFixed(3)}</span>
                  <span className="text-slate-500 relative z-10">{ask.total.toFixed(3)}</span>
                </div>
              ))}
            </div>

            {/* Spread Divider */}
            <div className="bg-[#0A0E1A] border border-white/10 rounded-lg p-2 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Spread:</span>
                <span className="text-white font-bold">${ORDERBOOK_DATA.spread.toFixed(2)}</span>
                <span className="text-[10px] text-slate-500">({ORDERBOOK_DATA.spreadPercent}%)</span>
              </div>
              <div className="text-[#00F090] font-bold">
                ${ORDERBOOK_DATA.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Bids (Buy Orders - Bottom, Green) */}
            <div className="space-y-1">
              {ORDERBOOK_DATA.bids.map((bid, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center justify-between px-2 py-1 text-xs font-mono rounded overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 bottom-0 bg-emerald-500/10 pointer-events-none"
                    style={{ width: `${bid.depthPercent}%` }}
                  />
                  <span className="text-[#00F090] font-semibold relative z-10">
                    ${bid.price.toFixed(2)}
                  </span>
                  <span className="text-slate-300 relative z-10">{bid.size.toFixed(3)}</span>
                  <span className="text-slate-500 relative z-10">{bid.total.toFixed(3)}</span>
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
                <div className="bg-[#0A0E1A] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                    <span>Inspected Coordinate</span>
                    <button
                      onClick={onClearInspectPoint}
                      className="text-slate-500 hover:text-white p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-mono font-bold text-white">
                      {activeInspectPoint.price}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/30 font-semibold">
                      {activeInspectPoint.label}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                    <span>Time: {activeInspectPoint.time}</span>
                    <span>•</span>
                    <span className="text-[#00F090] font-medium">LIVE STRATA</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400 font-mono">Strata Layer:</span>
                    <span className="font-mono font-bold text-white uppercase">{activeInspectPoint.layer}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400 font-mono">Classification:</span>
                    <span className="font-mono font-bold text-white">{activeInspectPoint.type}</span>
                  </div>
                  {activeInspectPoint.invalidation && (
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-slate-400 font-mono">Invalidation Stop:</span>
                      <span className="font-mono font-bold text-[#FF3B69]">{activeInspectPoint.invalidation}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-semibold uppercase text-slate-400 flex items-center gap-1.5">
                    <Info className="size-3.5 text-[#00E5FF]" />
                    <span>Structural Rationale</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    {activeInspectPoint.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <Layers className="size-8 text-slate-600 mx-auto" />
                <div className="text-xs font-mono font-semibold text-slate-400">
                  No Coordinate Selected
                </div>
                <p className="text-[11px] text-slate-500 max-w-[240px] mx-auto font-sans">
                  Click on any candle or structural annotation on the chart to inspect mathematical context and invalidation thresholds.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ALGORITHMIC ALERTS */}
        {activeTab === 'signals' && (
          <div className="p-3 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/10">
              <span>ALGO SIGNALS STREAM</span>
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2.5">
              {ALGORITHMIC_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-[#0A0E1A] border border-white/10 rounded-xl p-3 space-y-2 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">{alert.symbol}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-[#00E5FF]">{alert.timeframe}</span>
                    </div>
                    <span className="text-slate-500 text-[10px]">{alert.time}</span>
                  </div>

                  <div className="text-xs font-sans text-slate-300 font-medium">
                    {alert.title}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/5">
                    <div>
                      <span className="text-slate-500">Trigger: </span>
                      <span className="text-white font-bold">${alert.price.toLocaleString()}</span>
                    </div>
                    <div className="text-[#00F090] font-bold">
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
      <div className="p-3 border-t border-white/10 bg-[#060A12] text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="size-3" />
          <span>VELA QUANT v4.2</span>
        </div>
        <span>BUFFER: 100% OK</span>
      </div>
    </aside>
  );
};

export default TerminalSidePanel;
