import React, { useState } from 'react';
import { 
  BTC_15M_CANDLES, 
  DEMO_SIGNALS, 
  DEMO_ORDER_BLOCKS, 
  INDICATOR_DATA_BY_MODE 
} from '../../data/mockChartData';
import { IndicatorMode } from '../../types/trading';
import { DecryptedText } from '../ui/DecryptedText';
import { 
  Layers, 
  TrendingUp, 
  Compass, 
  Info, 
  Calendar,
  ChevronRight,
  Shield,
  Eye
} from 'lucide-react';

export const HeroProductTerminal: React.FC = () => {
  const [activeMode, setActiveMode] = useState<IndicatorMode>('TREND');
  const [showEMA, setShowEMA] = useState(true);
  const [showOrderBlocks, setShowOrderBlocks] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [activeCandleHover, setActiveCandleHover] = useState<number | null>(null);

  const indicatorData = INDICATOR_DATA_BY_MODE[activeMode] || INDICATOR_DATA_BY_MODE.TREND;

  // Chart coordinate space setup
  const minPrice = 65800;
  const maxPrice = 68600;
  const priceRange = maxPrice - minPrice;
  const chartHeight = 360;
  const chartWidth = 780;
  const candleCount = BTC_15M_CANDLES.length;
  const stepX = chartWidth / (candleCount + 1);

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  // Generate dynamic path for EMA ribbon based on candles
  const ema21Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.998 - (c.isBullish ? 60 : 20);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  const ema55Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.994 - (i < 6 ? 120 : 180);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl border border-white/[0.1] bg-canvas/90 backdrop-blur-2xl shadow-terminal overflow-hidden transition-all duration-300">
      
      {/* Ambient Inner Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-96 rounded-full bg-brand-blue/15 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 size-96 rounded-full bg-emerald-500/10 blur-3xl opacity-50" />

      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-surface/70 px-4 md:px-6 py-3 gap-3">
        
        {/* Left Window Affordances & Symbol Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-white/20 border border-white/30" />
            <div className="size-2.5 rounded-full bg-white/20 border border-white/30" />
            <div className="size-2.5 rounded-full bg-white/20 border border-white/30" />
          </div>

          <div className="h-4 w-px bg-white/[0.1] hidden sm:block" />

          {/* Instrument Selector Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
            <span className="font-bold text-white tracking-wide">BTC/USDT</span>
            <span className="text-text-muted text-[10px]">SPOT/PERP</span>
            <span className="text-signal-bull text-[11px] font-semibold flex items-center">
              $68,220.50
            </span>
          </div>

          {/* Timeframe Badges */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-text-muted">
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">1m</button>
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">5m</button>
            <button className="px-2 py-0.5 rounded bg-brand-blue/20 text-brand-accent font-semibold border border-brand-blue/30">15m</button>
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">1H</button>
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">4H</button>
          </div>
        </div>

        {/* Center Indicator Mode Selector */}
        <div className="flex items-center p-1 rounded-lg bg-surface-elevated/90 border border-white/[0.08] gap-1 text-xs w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setActiveMode('TREND')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeMode === 'TREND'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <TrendingUp className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Trend</span><span className="hidden sm:inline">Trend Context</span></span>
          </button>

          <button
            onClick={() => setActiveMode('LIQUIDITY')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeMode === 'LIQUIDITY'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <Compass className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Liquidity</span><span className="hidden sm:inline">Liquidity Sweep</span></span>
          </button>

          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeMode === 'STRUCTURE'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <Layers className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Structure</span><span className="hidden sm:inline">Market Structure</span></span>
          </button>
        </div>

        {/* Right Status Tag */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-brand-blue/10 border border-brand-blue/20 text-[11px] font-mono text-brand-accent">
            <span className="size-1.5 rounded-full bg-brand-accent animate-pulse" />
            <DecryptedText text="INDICATOR SUITE v4.2" speed={45} />
          </div>
        </div>
      </div>

      {/* Layer Toggles Secondary Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.05] bg-canvas/40 px-4 md:px-6 py-2.5 sm:py-2 text-xs font-mono text-text-secondary gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-[10px] sm:text-[11px] text-text-muted uppercase tracking-wider flex items-center gap-1">
            <Eye className="size-3" />
            Indicator Overlays:
          </span>
          
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
              showEMA ? 'text-brand-accent bg-brand-blue/10 border border-brand-blue/20' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showEMA ? 'bg-brand-accent' : 'bg-text-dim'}`} />
            EMA Cloud (21/55)
          </button>

          <button
            onClick={() => setShowOrderBlocks(!showOrderBlocks)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
              showOrderBlocks ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showOrderBlocks ? 'bg-emerald-400' : 'bg-text-dim'}`} />
            Liquidity Zones
          </button>

          <button
            onClick={() => setShowSignals(!showSignals)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
              showSignals ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showSignals ? 'bg-amber-400' : 'bg-text-dim'}`} />
            Signal Confirmation
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-text-muted">
          <span>Non-repainting bar-close logic</span>
          <span className="text-border-medium">•</span>
          <span className="text-text-secondary">Multi-Timeframe Aligned</span>
        </div>
      </div>

      {/* Main Terminal Body Grid: Chart Area (Left) + Intelligence Strip (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] w-full min-w-0">
        
        {/* Left Chart Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 p-3 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative overflow-hidden bg-[#070A10] w-full min-w-0">
          
          {/* Subtle Chart Watermark Background */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
            <span className="font-display font-extrabold text-7xl md:text-9xl tracking-widest text-white">
              ALGOFINEX
            </span>
          </div>

          {/* Active Candle Inspection Bar */}
          {(() => {
            const inspectedCandle = activeCandleHover !== null ? BTC_15M_CANDLES[activeCandleHover] : BTC_15M_CANDLES[BTC_15M_CANDLES.length - 1];
            return (
              <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono mb-2 z-10 px-1 py-1 rounded bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-text-muted">Bar: <span className="text-text-primary">{inspectedCandle.time}</span></span>
                  <span className="text-text-muted">O: <span className="text-text-primary">{inspectedCandle.open.toLocaleString()}</span></span>
                  <span className="text-text-muted">H: <span className="text-signal-bull">{inspectedCandle.high.toLocaleString()}</span></span>
                  <span className="text-text-muted">L: <span className="text-signal-bear">{inspectedCandle.low.toLocaleString()}</span></span>
                  <span className="text-text-muted">C: <span className={inspectedCandle.isBullish ? 'text-signal-bull font-semibold' : 'text-signal-bear font-semibold'}>{inspectedCandle.close.toLocaleString()}</span></span>
                  <span className="text-text-muted">Vol: <span className="text-brand-accent">{inspectedCandle.volume.toLocaleString()}</span></span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-text-dim">
                  <span>Hover candles to inspect bar data</span>
                </div>
              </div>
            );
          })()}

          {/* Interactive SVG Chart */}
          <div className="relative w-full h-[300px] sm:h-[360px] select-none overflow-hidden">
            <svg
              className="w-full h-full overflow-hidden"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                {/* Horizontal Grid Gradients */}
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </linearGradient>

                <linearGradient id="fvgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              {/* Price Scale Gridlines */}
              {[66000, 66500, 67000, 67500, 68000, 68500].map((p, idx) => {
                const y = getY(p);
                return (
                  <g key={idx}>
                    <line
                      x1="0"
                      y1={y}
                      x2={chartWidth}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={chartWidth - 52}
                      y={y - 4}
                      fill="#64748B"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      ${p.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Order Blocks & Fair Value Gaps */}
              {showOrderBlocks &&
                DEMO_ORDER_BLOCKS.map((ob, idx) => {
                  const startX = (ob.startIndex + 0.5) * stepX;
                  const endX = (ob.endIndex + 0.5) * stepX;
                  const width = endX - startX;
                  const topY = getY(ob.topPrice);
                  const bottomY = getY(ob.bottomPrice);
                  const height = bottomY - topY;

                  return (
                    <g key={idx} className="transition-opacity duration-300">
                      <rect
                        x={startX}
                        y={topY}
                        width={width}
                        height={height}
                        fill={ob.type === 'BEARISH_OB' ? 'rgba(239, 68, 68, 0.12)' : 'url(#fvgGrad)'}
                        stroke={ob.type === 'BEARISH_OB' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}
                        strokeDasharray="3 3"
                        rx="4"
                      />
                      <text
                        x={startX + 6}
                        y={topY + 14}
                        fill={ob.type === 'BEARISH_OB' ? '#F87171' : '#34D399'}
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {ob.label}
                      </text>
                    </g>
                  );
                })}

              {/* EMA Ribbon Cloud */}
              {showEMA && (
                <>
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    strokeOpacity="0.7"
                  />
                </>
              )}

              {/* Candlestick sequence */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const highY = getY(c.high);
                const lowY = getY(c.low);
                const openY = getY(c.open);
                const closeY = getY(c.close);
                const bodyY = Math.min(openY, closeY);
                const bodyHeight = Math.max(Math.abs(closeY - openY), 2.5);
                const candleWidth = Math.max(stepX * 0.65, 8);

                const isBull = c.isBullish;
                const color = isBull ? '#10B981' : '#EF4444';

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setActiveCandleHover(i)}
                    onMouseLeave={() => setActiveCandleHover(null)}
                    className="cursor-crosshair transition-transform duration-150 hover:scale-y-105"
                  >
                    {/* Wick */}
                    <line
                      x1={x}
                      y1={highY}
                      x2={x}
                      y2={lowY}
                      stroke={color}
                      strokeWidth="1.5"
                      strokeOpacity="0.8"
                    />
                    {/* Body */}
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      stroke={color}
                      strokeWidth="1"
                      rx="1.5"
                      className={isBull ? 'drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]' : ''}
                    />
                  </g>
                );
              })}

              {/* Indicator Signal Markers (Demonstrating structural zones, not trade boasts) */}
              {showSignals &&
                DEMO_SIGNALS.map((sig, idx) => {
                  const targetCandle = BTC_15M_CANDLES[sig.index];
                  const x = (sig.index + 1) * stepX;
                  const y = getY(targetCandle.low) + 24;

                  return (
                    <g key={idx} className="transition-all duration-300">
                      {/* Signal Arrow / Callout */}
                      <path
                        d={`M ${x} ${y - 8} L ${x - 6} ${y} L ${x + 6} ${y} Z`}
                        fill="#10B981"
                      />
                      <rect
                        x={x - 64}
                        y={y}
                        width="128"
                        height="22"
                        rx="4"
                        fill="#0E1726"
                        stroke="#10B981"
                        strokeWidth="1.2"
                      />
                      <text
                        x={x}
                        y={y + 14}
                        textAnchor="middle"
                        fill="#34D399"
                        fontSize="8.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        ▲ {sig.label}
                      </text>

                      {/* Structural Reference Levels */}
                      {idx === 0 && (
                        <g>
                          {/* Upper Range Boundary */}
                          <line
                            x1={x}
                            y1={getY(sig.upperTarget)}
                            x2={chartWidth - 55}
                            y2={getY(sig.upperTarget)}
                            stroke="#3B82F6"
                            strokeWidth="1.2"
                            strokeDasharray="4 3"
                            strokeOpacity="0.8"
                          />
                          <text
                            x={chartWidth - 52}
                            y={getY(sig.upperTarget) + 3}
                            fill="#60A5FA"
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="600"
                          >
                            Range High (${sig.upperTarget.toLocaleString()})
                          </text>

                          {/* Local Range Midpoint */}
                          <line
                            x1={x}
                            y1={getY(sig.lowerTarget)}
                            x2={chartWidth - 55}
                            y2={getY(sig.lowerTarget)}
                            stroke="#10B981"
                            strokeWidth="1.2"
                            strokeDasharray="4 3"
                            strokeOpacity="0.8"
                          />
                          <text
                            x={chartWidth - 52}
                            y={getY(sig.lowerTarget) + 3}
                            fill="#10B981"
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="600"
                          >
                            Local Pivot (${sig.lowerTarget.toLocaleString()})
                          </text>

                          {/* Structure Invalidation Line */}
                          <line
                            x1={x}
                            y1={getY(sig.invalidation)}
                            x2={chartWidth - 55}
                            y2={getY(sig.invalidation)}
                            stroke="#EF4444"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                            strokeOpacity="0.6"
                          />
                          <text
                            x={chartWidth - 52}
                            y={getY(sig.invalidation) + 3}
                            fill="#EF4444"
                            fontSize="8"
                            fontFamily="monospace"
                          >
                            Invalidation (${sig.invalidation.toLocaleString()})
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

              {/* Current Market Price Beacon Line */}
              <line
                x1="0"
                y1={getY(68220)}
                x2={chartWidth - 58}
                y2={getY(68220)}
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <rect
                x={chartWidth - 58}
                y={getY(68220) - 10}
                width="56"
                height="20"
                rx="3"
                fill="#3B82F6"
              />
              <text
                x={chartWidth - 30}
                y={getY(68220) + 4}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="700"
                fontFamily="monospace"
              >
                68,220.5
              </text>
            </svg>
          </div>

          {/* Volume & Market Structure Summary Strip */}
          <div className="w-full pt-3 mt-1 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-text-muted">
            <div className="flex items-center gap-3">
              <span className="text-text-secondary font-medium">Structure Read:</span>
              <span className="text-signal-bull">{indicatorData.marketStructure}</span>
              <span className="hidden sm:inline text-text-dim">• {indicatorData.trendContext}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-text-dim">
              <Info className="size-3" />
              <span>Simulated preview</span>
            </div>
          </div>
        </div>

        {/* Right Intelligence & Indicator Telemetry Dock (4 cols on lg) */}
        <div className="lg:col-span-4 p-5 md:p-6 bg-surface/50 flex flex-col justify-between gap-5">
          
          {/* Header Section: What the Indicator Helps You See */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                Indicator Analysis
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-blue/15 text-brand-accent border border-brand-blue/30">
                ACTIVE MODE
              </span>
            </div>

            <div className="text-lg md:text-xl font-display font-bold text-white tracking-tight mb-1">
              {indicatorData.marketStructure}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Real-time structural mapping showing clear trend support, liquidity reclaim levels, and verified bar-close signals.
            </p>
          </div>

          {/* Core Indicator Parameters Cards (Neutral product concepts) */}
          <div className="flex flex-col gap-2 font-mono text-xs">
            
            {/* Market Structure Card */}
            <div className="p-2.5 rounded-xl bg-surface-elevated/70 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-text-muted uppercase block">Market Structure</span>
                <span className="text-white font-semibold text-xs mt-0.5 block">{indicatorData.marketStructure}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                VALIDATED
              </span>
            </div>

            {/* Liquidity State Card */}
            <div className="p-2.5 rounded-xl bg-surface-elevated/70 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-text-muted uppercase block">Liquidity State</span>
                <span className="text-white font-semibold text-xs mt-0.5 block">{indicatorData.liquidityState}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                SWEPT & HELD
              </span>
            </div>

            {/* Trend Context Card */}
            <div className="p-2.5 rounded-xl bg-surface-elevated/70 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-text-muted uppercase block">Trend Context</span>
                <span className="text-white font-semibold text-xs mt-0.5 block">{indicatorData.trendContext}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                SUPPORT
              </span>
            </div>

            {/* Multi-Timeframe Alignment Matrix */}
            <div className="p-2.5 rounded-xl bg-surface-elevated/70 border border-white/[0.06]">
              <span className="text-[10px] text-text-muted uppercase block mb-1.5">Multi-Timeframe Context</span>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="p-1.5 rounded bg-surface/80 border border-white/[0.04]">
                  <div className="text-text-muted text-[9px]">4H Macro</div>
                  <div className="text-signal-bull font-semibold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf4h}</div>
                </div>
                <div className="p-1.5 rounded bg-surface/80 border border-white/[0.04]">
                  <div className="text-text-muted text-[9px]">1H Intermediate</div>
                  <div className="text-brand-accent font-semibold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf1h}</div>
                </div>
                <div className="p-1.5 rounded bg-surface/80 border border-white/[0.04]">
                  <div className="text-text-muted text-[9px]">15m Execution</div>
                  <div className="text-emerald-400 font-semibold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf15m}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Day Session Callout (Flexible, clean, professional) */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-brand-blue/15 to-brand-blue/5 border border-brand-blue/30 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Calendar className="size-4 text-brand-accent shrink-0" />
              <span>Learn This System in the 3-Day Session</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-normal">
              Go beyond chart overlays. Learn the complete methodology, risk framework, and indicator workflow with live guidance.
            </p>
            <a
              href="#session"
              className="mt-1 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-brand-blue hover:bg-brand-cobalt transition-colors shadow-sm"
            >
              <span>Join the 3-Day Session</span>
              <ChevronRight className="size-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Terminal Footer Disclaimer */}
      <div className="border-t border-white/[0.06] bg-canvas px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-text-muted w-full min-w-0">
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <Shield className="size-3 text-brand-blue shrink-0" />
          <span className="text-[9px] sm:text-[10px] tracking-tight">ALGOFINEX INDICATOR SUITE • NON-REPAINTING STRUCTURE &amp; TREND ANALYSIS</span>
        </div>
        <div className="text-text-dim text-[9px] sm:text-[10px] text-center sm:text-right">
          Illustrative product demonstration. Indicators provide market analysis and are not financial advice.
        </div>
      </div>
    </div>
  );
};

export default HeroProductTerminal;

