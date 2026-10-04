import React, { useState } from 'react';
import { 
  BTC_15M_CANDLES, 
  DEMO_SIGNALS, 
  DEMO_ORDER_BLOCKS, 
  INDICATOR_DATA_BY_MODE 
} from '../../data/mockChartData';
import { IndicatorMode } from '../../types/trading';
import { 
  Layers, 
  TrendingUp, 
  Compass, 
  Shield,
  Eye,
  Crosshair
} from 'lucide-react';

export const HeroProductTerminal: React.FC = () => {
  const [activeMode, setActiveMode] = useState<IndicatorMode>('TREND');
  const [showEMA, setShowEMA] = useState(true);
  const [showOrderBlocks, setShowOrderBlocks] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [activeCandleHover, setActiveCandleHover] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

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

  const getPriceFromY = (y: number) => {
    return maxPrice - (y / chartHeight) * priceRange;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * chartWidth;
    const svgY = ((e.clientY - rect.top) / rect.height) * chartHeight;

    setMousePos({ x: svgX, y: svgY });

    // Calculate nearest candle index
    const index = Math.min(
      Math.max(0, Math.round(svgX / stepX) - 1),
      candleCount - 1
    );
    setActiveCandleHover(index);
  };

  const handleMouseLeave = () => {
    setActiveCandleHover(null);
    setMousePos(null);
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
    <div className="relative w-full rounded-2xl md:rounded-3xl border border-slate-200/90 bg-white shadow-workstation overflow-hidden transition-all duration-300">
      
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200/80 bg-slate-50/80 px-4 md:px-6 py-3 gap-3">
        
        {/* Left Window Affordances & Symbol Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-slate-300" />
            <div className="size-2.5 rounded-full bg-slate-300" />
            <div className="size-2.5 rounded-full bg-slate-300" />
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Instrument Selector Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono shadow-xs">
            <span className="font-bold text-slate-900 tracking-wide">BTC/USDT</span>
            <span className="text-slate-500 text-[10px]">SPOT/PERP</span>
            <span className="text-emerald-600 text-[11px] font-bold flex items-center">
              $68,220.50
            </span>
          </div>

          {/* Timeframe Badges */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-slate-600">
            <button className="px-2 py-0.5 rounded hover:text-slate-900 transition-colors">1m</button>
            <button className="px-2 py-0.5 rounded hover:text-slate-900 transition-colors">5m</button>
            <button className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue font-bold border border-blue-200/70">15m</button>
            <button className="px-2 py-0.5 rounded hover:text-slate-900 transition-colors">1H</button>
            <button className="px-2 py-0.5 rounded hover:text-slate-900 transition-colors">4H</button>
          </div>
        </div>

        {/* Center Indicator Mode Selector */}
        <div className="flex items-center p-1 rounded-lg bg-slate-200/70 border border-slate-300/60 gap-1 text-xs w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setActiveMode('TREND')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
              activeMode === 'TREND'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Trend</span><span className="hidden sm:inline">Trend Context</span></span>
          </button>

          <button
            onClick={() => setActiveMode('LIQUIDITY')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
              activeMode === 'LIQUIDITY'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Liquidity</span><span className="hidden sm:inline">Liquidity Sweep</span></span>
          </button>

          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1.5 ${
              activeMode === 'STRUCTURE'
                ? 'bg-brand-blue text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Structure</span><span className="hidden sm:inline">Market Structure</span></span>
          </button>
        </div>

        {/* Right Status Tag */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-700 shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-900">Synchronized</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">v4.2</span>
          </div>
        </div>
      </div>

      {/* Layer Toggles Secondary Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/70 bg-slate-50/40 px-4 md:px-6 py-2 text-xs font-mono text-slate-600 gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-[10px] sm:text-[11px] text-slate-500 tracking-wide flex items-center gap-1 font-medium">
            <Eye className="size-3 text-slate-400" />
            Active Lenses:
          </span>
          
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
              showEMA ? 'text-brand-blue bg-blue-50 border border-blue-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showEMA ? 'bg-brand-blue' : 'bg-slate-300'}`} />
            EMA Cloud (21/55)
          </button>

          <button
            onClick={() => setShowOrderBlocks(!showOrderBlocks)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
              showOrderBlocks ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showOrderBlocks ? 'bg-emerald-600' : 'bg-slate-300'}`} />
            Liquidity Zones
          </button>

          <button
            onClick={() => setShowSignals(!showSignals)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] transition-colors ${
              showSignals ? 'text-slate-800 bg-amber-50 border border-amber-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showSignals ? 'bg-amber-500' : 'bg-slate-300'}`} />
            Signal Confirmation
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
          <span>Non-repainting bar-close logic</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-700">Multi-Timeframe Aligned</span>
        </div>
      </div>

      {/* Main Terminal Body Grid: Chart Area (Left) + Intelligence Strip (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] w-full min-w-0">
        
        {/* Left Chart Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 p-3 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 relative overflow-hidden bg-white w-full min-w-0">
          
          {/* Active Candle Inspection Bar */}
          {(() => {
            const inspectedCandle = activeCandleHover !== null ? BTC_15M_CANDLES[activeCandleHover] : BTC_15M_CANDLES[BTC_15M_CANDLES.length - 1];
            return (
              <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono mb-2 z-10 px-2.5 py-1.5 rounded-md bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-slate-500">Bar: <span className="text-slate-900 font-semibold">{inspectedCandle.time}</span></span>
                  <span className="text-slate-500">O: <span className="text-slate-900 font-semibold">{inspectedCandle.open.toLocaleString()}</span></span>
                  <span className="text-slate-500">H: <span className="text-emerald-700 font-bold">{inspectedCandle.high.toLocaleString()}</span></span>
                  <span className="text-slate-500">L: <span className="text-red-700 font-bold">{inspectedCandle.low.toLocaleString()}</span></span>
                  <span className="text-slate-500">C: <span className={inspectedCandle.isBullish ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>{inspectedCandle.close.toLocaleString()}</span></span>
                  <span className="text-slate-500">Vol: <span className="text-brand-blue font-semibold">{inspectedCandle.volume.toLocaleString()}</span></span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Crosshair className="size-3" />
                  <span>Hover to inspect coordinates</span>
                </div>
              </div>
            );
          })()}

          {/* Interactive SVG Chart */}
          <div className="relative w-full h-[300px] sm:h-[360px] select-none overflow-hidden">
            <svg
              className="w-full h-full overflow-hidden cursor-crosshair"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="cloudGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.04" />
                </linearGradient>

                <linearGradient id="demandHatchLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
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
                      stroke="rgba(15, 23, 42, 0.05)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={chartWidth - 52}
                      y={y - 4}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      ${p.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Order Blocks */}
              {showOrderBlocks &&
                DEMO_ORDER_BLOCKS.map((ob, idx) => {
                  const startX = (ob.startIndex + 0.5) * stepX;
                  const endX = (ob.endIndex + 0.5) * stepX;
                  const width = endX - startX;
                  const topY = getY(ob.topPrice);
                  const bottomY = getY(ob.bottomPrice);
                  const height = bottomY - topY;
                  const isDemand = ob.type === 'BULLISH_OB';

                  return (
                    <g key={idx} className="transition-opacity duration-300">
                      <rect
                        x={startX}
                        y={topY}
                        width={width}
                        height={height}
                        fill={isDemand ? 'url(#demandHatchLight)' : 'rgba(220, 38, 38, 0.06)'}
                        stroke={isDemand ? '#2563EB' : '#DC2626'}
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        rx="3"
                      />
                      <text
                        x={startX + 6}
                        y={topY + 14}
                        fill={isDemand ? '#1D4ED8' : '#B91C1C'}
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="700"
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
                    d={`M ${ema21Points} L ${chartWidth - 40},${getY(67700)} L ${stepX},${getY(66200)} Z`}
                    fill="url(#cloudGradLight)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    strokeOpacity="0.8"
                  />
                </>
              )}

              {/* Candlesticks */}
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
                const color = isBull ? '#059669' : '#DC2626';

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setActiveCandleHover(i)}
                    onMouseLeave={() => setActiveCandleHover(null)}
                    className="cursor-crosshair"
                  >
                    <line
                      x1={x}
                      y1={highY}
                      x2={x}
                      y2={lowY}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      stroke={color}
                      strokeWidth="1"
                      rx="1"
                    />
                  </g>
                );
              })}

              {/* Indicator Signal Markers */}
              {showSignals &&
                DEMO_SIGNALS.map((sig, idx) => {
                  const targetCandle = BTC_15M_CANDLES[sig.index];
                  const x = (sig.index + 1) * stepX;
                  const y = getY(targetCandle.low) + 24;

                  return (
                    <g key={idx}>
                      <rect
                        x={x - 52}
                        y={y}
                        width="104"
                        height="22"
                        rx="4"
                        fill="#FFFFFF"
                        stroke="#059669"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                      />
                      <text
                        x={x}
                        y={y + 14}
                        textAnchor="middle"
                        fill="#047857"
                        fontSize="8.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        ▲ {sig.label}
                      </text>

                      {idx === 0 && (
                        <g>
                          <line
                            x1={x}
                            y1={getY(sig.invalidation)}
                            x2={chartWidth - 55}
                            y2={getY(sig.invalidation)}
                            stroke="#DC2626"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                          />
                          <text
                            x={chartWidth - 52}
                            y={getY(sig.invalidation) + 3}
                            fill="#DC2626"
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="700"
                          >
                            Stop: ${sig.invalidation.toLocaleString()}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

              {/* Right Price Scale Axis Divider */}
              <line
                x1={chartWidth - 58}
                y1="0"
                x2={chartWidth - 58}
                y2={chartHeight - 20}
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth="1"
              />

              {/* Bottom Time Axis Baseline */}
              <line
                x1="0"
                y1={chartHeight - 20}
                x2={chartWidth - 58}
                y2={chartHeight - 20}
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth="1"
              />

              {/* Bottom Time Axis Ticks */}
              {[0, 4, 8, 12, 16, 19].map((candleIdx) => {
                const candle = BTC_15M_CANDLES[candleIdx];
                if (!candle) return null;
                const x = (candleIdx + 1) * stepX;
                return (
                  <g key={candleIdx}>
                    <line
                      x1={x}
                      y1={chartHeight - 20}
                      x2={x}
                      y2={chartHeight - 15}
                      stroke="rgba(15, 23, 42, 0.2)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={chartHeight - 6}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {candle.time}
                    </text>
                  </g>
                );
              })}

              {/* Price Beacon Line */}
              <line
                x1="0"
                y1={getY(68220)}
                x2={chartWidth - 58}
                y2={getY(68220)}
                stroke="#1D4ED8"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <rect
                x={chartWidth - 58}
                y={getY(68220) - 10}
                width="56"
                height="20"
                rx="3"
                fill="#1D4ED8"
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

              {/* Interactive Scrub Crosshair & Floating Coordinate Callout */}
              {mousePos && activeCandleHover !== null && (
                <g className="pointer-events-none">
                  {/* Vertical Crosshair Trace */}
                  <line
                    x1={(activeCandleHover + 1) * stepX}
                    y1="0"
                    x2={(activeCandleHover + 1) * stepX}
                    y2={chartHeight - 20}
                    stroke="#1D4ED8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  {/* Horizontal Crosshair Price Line */}
                  <line
                    x1="0"
                    y1={mousePos.y}
                    x2={chartWidth - 58}
                    y2={mousePos.y}
                    stroke="#1D4ED8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Y-Axis Hover Price Label */}
                  <rect
                    x={chartWidth - 58}
                    y={Math.min(Math.max(mousePos.y - 9, 0), chartHeight - 38)}
                    width="56"
                    height="18"
                    rx="2"
                    fill="#0F172A"
                  />
                  <text
                    x={chartWidth - 30}
                    y={Math.min(Math.max(mousePos.y + 4, 13), chartHeight - 25)}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    ${Math.round(getPriceFromY(mousePos.y)).toLocaleString()}
                  </text>
                  {/* Active Candlestick Highlight Ring */}
                  <circle
                    cx={(activeCandleHover + 1) * stepX}
                    cy={getY(BTC_15M_CANDLES[activeCandleHover].close)}
                    r="4"
                    fill="#1D4ED8"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Volume & Market Structure Summary Strip */}
          <div className="w-full pt-3 mt-1 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span className="text-slate-700 font-semibold">Structure:</span>
              <span className="text-emerald-700 font-bold">{indicatorData.marketStructure}</span>
              <span className="hidden sm:inline text-slate-400">• {indicatorData.trendContext}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>Real-Time Analytical Canvas</span>
            </div>
          </div>
        </div>

        {/* Right Intelligence Strip (4 cols on lg) */}
        <div className="lg:col-span-4 p-5 md:p-6 bg-slate-50/70 flex flex-col justify-between gap-5">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-500 tracking-wide font-medium">
                Indicator Analysis
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-brand-blue border border-blue-200">
                Active Lens
              </span>
            </div>

            <div className="text-lg md:text-xl font-display font-bold text-slate-900 tracking-tight mb-1">
              {indicatorData.marketStructure}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Structural mapping showing clean trend support, resting liquidity reclaim levels, and verified bar-close signals.
            </p>
          </div>

          {/* Core Indicator Parameters Cards */}
          <div className="flex flex-col gap-2 font-mono text-xs">
            
            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Market Structure</span>
                <span className="text-slate-900 font-bold text-xs mt-0.5 block">{indicatorData.marketStructure}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Validated
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Liquidity State</span>
                <span className="text-slate-900 font-bold text-xs mt-0.5 block">{indicatorData.liquidityState}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-brand-blue border border-blue-200">
                Swept &amp; Held
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Trend Context</span>
                <span className="text-slate-900 font-bold text-xs mt-0.5 block">{indicatorData.trendContext}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Support
              </span>
            </div>

            {/* Multi-Timeframe Alignment */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-[10px] text-slate-400 block mb-1.5 font-sans">Multi-Timeframe Context</span>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200/60">
                  <div className="text-slate-400 text-[9px]">4H Macro</div>
                  <div className="text-emerald-700 font-bold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf4h}</div>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200/60">
                  <div className="text-slate-400 text-[9px]">1H Interm.</div>
                  <div className="text-brand-blue font-bold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf1h}</div>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200/60">
                  <div className="text-slate-400 text-[9px]">15m Entry</div>
                  <div className="text-emerald-700 font-bold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf15m}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Analytical Telemetry Panel */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider">
              <span>Operational Regime</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-signal-bull" />
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/[0.04]">
              <span className="text-slate-500">Structural Invalidation:</span>
              <span className="text-red-700 font-bold font-mono">$66,180.00</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/[0.04]">
              <span className="text-slate-500">Resting Liquidity Pool:</span>
              <span className="text-brand-blue font-bold font-mono">$68,900.00</span>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-black/[0.04]">
              <span>Pine Script Engine v4.2</span>
              <span className="text-slate-700 font-medium">Bar-Close Only</span>
            </div>
          </div>

        </div>
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-slate-200/80 bg-slate-50/70 px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-500 w-full min-w-0">
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <Shield className="size-3 text-brand-blue shrink-0" />
          <span className="text-[9px] sm:text-[10px] tracking-tight font-medium">ALGOFINEX INDICATOR SUITE • NON-REPAINTING STRUCTURE &amp; TREND ANALYSIS</span>
        </div>
        <div className="text-slate-400 text-[9px] sm:text-[10px] text-center sm:text-right">
          Illustrative product demonstration. Indicators provide market analysis and are not financial advice.
        </div>
      </div>
    </div>
  );
};

export default HeroProductTerminal;
