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

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const svgX = ((touch.clientX - rect.left) / rect.width) * chartWidth;
      const svgY = ((touch.clientY - rect.top) / rect.height) * chartHeight;

      setMousePos({ x: svgX, y: svgY });

      const index = Math.min(
        Math.max(0, Math.round(svgX / stepX) - 1),
        candleCount - 1
      );
      setActiveCandleHover(index);
    }
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
    <div className="relative w-full rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0E1A] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300">
      
      {/* Terminal Title Bar (LuxAlgo Vela Header) */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#0D1322] px-4 md:px-6 py-3 gap-3">
        
        {/* Left Window Affordances & Symbol Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-[#FF5F56]/80" />
            <div className="size-2.5 rounded-full bg-[#FFBD2E]/80" />
            <div className="size-2.5 rounded-full bg-[#27C93F]/80" />
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Instrument Selector Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono shadow-xs">
            <span className="font-bold text-white tracking-wide">BTC/USDT</span>
            <span className="text-slate-400 text-[10px]">SPOT &middot; PERP</span>
            <span className="text-emerald-400 text-[11px] font-bold flex items-center shadow-[0_0_10px_rgba(0,240,144,0.3)]">
              $68,220.50
            </span>
          </div>

          {/* Timeframe Badges */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">1m</button>
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">5m</button>
            <button className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 shadow-[0_0_8px_rgba(0,240,144,0.2)]">15m</button>
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">1H</button>
            <button className="px-2 py-0.5 rounded hover:text-white transition-colors">4H</button>
          </div>
        </div>

        {/* Center Indicator Mode Selector with Touch Target Support */}
        <div className="flex items-center p-1 rounded-lg bg-black/40 border border-white/10 gap-1 text-xs w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setActiveMode('TREND')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 min-h-[40px] sm:min-h-[32px] rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'TREND'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,144,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Trend</span><span className="hidden sm:inline">Trend Corridor</span></span>
          </button>

          <button
            onClick={() => setActiveMode('LIQUIDITY')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 min-h-[40px] sm:min-h-[32px] rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'LIQUIDITY'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,229,255,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Liquidity</span><span className="hidden sm:inline">Liquidity Sweep</span></span>
          </button>

          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 min-h-[40px] sm:min-h-[32px] rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'STRUCTURE'
                ? 'bg-purple-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="size-3.5 shrink-0" />
            <span><span className="sm:hidden">Structure</span><span className="hidden sm:inline">Market Structure</span></span>
          </button>
        </div>

        {/* Right Status Tag */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00F090]" />
            <span className="font-semibold text-white">Live Engine</span>
            <span className="text-white/20">•</span>
            <span className="text-emerald-400 font-mono">v4.2 PRO</span>
          </div>
        </div>
      </div>

      {/* Layer Toggles Secondary Ribbon */}
      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] bg-[#070B14] px-4 md:px-6 py-2 text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-[10px] sm:text-[11px] text-slate-400 tracking-wide flex items-center gap-1 font-medium">
            <Eye className="size-3 text-emerald-400" />
            Active Lenses:
          </span>
          
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              showEMA ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showEMA ? 'bg-cyan-400 shadow-[0_0_6px_#00E5FF]' : 'bg-slate-600'}`} />
            Trend Corridor
          </button>

          <button
            onClick={() => setShowOrderBlocks(!showOrderBlocks)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              showOrderBlocks ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showOrderBlocks ? 'bg-emerald-400 shadow-[0_0_6px_#00F090]' : 'bg-slate-600'}`} />
            Liquidity Zones (OB)
          </button>

          <button
            onClick={() => setShowSignals(!showSignals)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              showSignals ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`size-1.5 rounded-full ${showSignals ? 'bg-amber-400 shadow-[0_0_6px_#F59E0B]' : 'bg-slate-600'}`} />
            Confirmation Signals
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span className="text-emerald-400/90 font-medium">Non-repainting bar-close</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Multi-Timeframe Aligned</span>
        </div>
      </div>

      {/* Main Terminal Body Grid: Chart Area (Left) + Intelligence Strip (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] w-full min-w-0 bg-[#060A12]">
        
        {/* Left Chart Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 p-3 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative overflow-hidden bg-[#060A12] w-full min-w-0">
          
          {/* Active Candle Inspection Bar */}
          {(() => {
            const inspectedCandle = activeCandleHover !== null ? BTC_15M_CANDLES[activeCandleHover] : BTC_15M_CANDLES[BTC_15M_CANDLES.length - 1];
            return (
              <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono mb-2 z-10 px-2.5 py-1.5 rounded-md bg-[#0D1322] border border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-slate-400">Bar: <span className="text-white font-semibold">{inspectedCandle.time}</span></span>
                  <span className="text-slate-400">O: <span className="text-white font-semibold">{inspectedCandle.open.toLocaleString()}</span></span>
                  <span className="text-slate-400">H: <span className="text-emerald-400 font-bold">{inspectedCandle.high.toLocaleString()}</span></span>
                  <span className="text-slate-400">L: <span className="text-rose-400 font-bold">{inspectedCandle.low.toLocaleString()}</span></span>
                  <span className="text-slate-400">C: <span className={inspectedCandle.isBullish ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{inspectedCandle.close.toLocaleString()}</span></span>
                  <span className="text-slate-400">Vol: <span className="text-cyan-400 font-semibold">{inspectedCandle.volume.toLocaleString()}</span></span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Crosshair className="size-3 text-emerald-400" />
                  <span>Interactive Scrub</span>
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
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
            >
              <defs>
                <linearGradient id="cloudGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#00F090" stopOpacity="0.04" />
                </linearGradient>

                <linearGradient id="demandHatchDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.03" />
                </linearGradient>

                <linearGradient id="supplyHatchDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF3B69" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#FF3B69" stopOpacity="0.03" />
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
                        fill={isDemand ? 'url(#demandHatchDark)' : 'url(#supplyHatchDark)'}
                        stroke={isDemand ? '#00E5FF' : '#FF3B69'}
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        rx="3"
                      />
                      <text
                        x={startX + 6}
                        y={topY + 14}
                        fill={isDemand ? '#00E5FF' : '#FF3B69'}
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
                    fill="url(#cloudGradDark)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#00F090"
                    strokeWidth="1.6"
                    strokeDasharray="4 2"
                    strokeOpacity="0.9"
                  />
                </>
              )}

              {/* Candlesticks (LuxAlgo Confirmation Colors) */}
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
                const color = isBull ? '#00F090' : '#FF3B69';

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
                        x={x - 56}
                        y={y}
                        width="112"
                        height="22"
                        rx="4"
                        fill="#0A1624"
                        stroke="#00F090"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 8px rgba(0,240,144,0.25))"
                      />
                      <text
                        x={x}
                        y={y + 14}
                        textAnchor="middle"
                        fill="#00F090"
                        fontSize="8.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        CONFIRMATION BUY ✦
                      </text>

                      {idx === 0 && (
                        <g>
                          <line
                            x1={x}
                            y1={getY(sig.invalidation)}
                            x2={chartWidth - 55}
                            y2={getY(sig.invalidation)}
                            stroke="#FF3B69"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                          />
                          <text
                            x={chartWidth - 52}
                            y={getY(sig.invalidation) + 3}
                            fill="#FF3B69"
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="700"
                          >
                            INVALIDATION — $66,180
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
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />

              {/* Bottom Time Axis Baseline */}
              <line
                x1="0"
                y1={chartHeight - 20}
                x2={chartWidth - 58}
                y2={chartHeight - 20}
                stroke="rgba(255, 255, 255, 0.08)"
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
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={chartHeight - 6}
                      textAnchor="middle"
                      fill="#64748B"
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
                stroke="#00F090"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <rect
                x={chartWidth - 58}
                y={getY(68220) - 10}
                width="56"
                height="20"
                rx="3"
                fill="#00F090"
              />
              <text
                x={chartWidth - 30}
                y={getY(68220) + 4}
                textAnchor="middle"
                fill="#05080E"
                fontSize="9"
                fontWeight="800"
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
                    stroke="#00E5FF"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  {/* Horizontal Crosshair Price Line */}
                  <line
                    x1="0"
                    y1={mousePos.y}
                    x2={chartWidth - 58}
                    y2={mousePos.y}
                    stroke="#00E5FF"
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
                    fill="#0D1322"
                    stroke="#00E5FF"
                    strokeWidth="1"
                  />
                  <text
                    x={chartWidth - 30}
                    y={Math.min(Math.max(mousePos.y + 4, 13), chartHeight - 25)}
                    textAnchor="middle"
                    fill="#00E5FF"
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
                    fill="#00F090"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Volume & Market Structure Summary Strip */}
          <div className="w-full pt-3 mt-1 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-slate-300 font-semibold">Structure:</span>
              <span className="text-emerald-400 font-bold">{indicatorData.marketStructure}</span>
              <span className="hidden sm:inline text-slate-500">• {indicatorData.trendContext}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00F090]" />
              <span>Real-Time Analytical Engine</span>
            </div>
          </div>
        </div>

        {/* Right Intelligence Strip (4 cols on lg) */}
        <div className="lg:col-span-4 p-5 md:p-6 bg-[#0A0F1D] flex flex-col justify-between gap-5 border-l border-white/[0.08]">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 tracking-wide font-medium">
                Indicator Analysis
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                Active Lens
              </span>
            </div>

            <div className="text-lg md:text-xl font-display font-bold text-white tracking-tight mb-1">
              {indicatorData.marketStructure}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Algorithmic mapping showing clean trend support, resting liquidity reclaim levels, and verified bar-close signals.
            </p>
          </div>

          {/* Core Indicator Parameters Cards */}
          <div className="flex flex-col gap-2 font-mono text-xs">
            
            <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/[0.08] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Market Structure</span>
                <span className="text-white font-bold text-xs mt-0.5 block">{indicatorData.marketStructure}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Validated
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/[0.08] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Liquidity State</span>
                <span className="text-white font-bold text-xs mt-0.5 block">{indicatorData.liquidityState}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                Swept &amp; Held
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/[0.08] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Trend Context</span>
                <span className="text-white font-bold text-xs mt-0.5 block">{indicatorData.trendContext}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                Support
              </span>
            </div>

            {/* Multi-Timeframe Alignment */}
            <div className="p-2.5 rounded-xl bg-[#0E1528] border border-white/[0.08] shadow-xs">
              <span className="text-[10px] text-slate-400 block mb-1.5 font-sans">Multi-Timeframe Context</span>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="p-1.5 rounded bg-[#070B14] border border-white/[0.06]">
                  <div className="text-slate-400 text-[9px]">4H Macro</div>
                  <div className="text-emerald-400 font-bold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf4h}</div>
                </div>
                <div className="p-1.5 rounded bg-[#070B14] border border-white/[0.06]">
                  <div className="text-slate-400 text-[9px]">1H Interm.</div>
                  <div className="text-cyan-400 font-bold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf1h}</div>
                </div>
                <div className="p-1.5 rounded bg-[#070B14] border border-white/[0.06]">
                  <div className="text-slate-400 text-[9px]">15m Entry</div>
                  <div className="text-emerald-400 font-bold mt-0.5 truncate">{indicatorData.timeframeAlignment.tf15m}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Analytical Telemetry Panel */}
          <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/[0.08] flex flex-col gap-2.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Operational Regime</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00F090]" />
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E1528] border border-white/[0.06]">
              <span className="text-slate-400">Structural Invalidation:</span>
              <span className="text-rose-400 font-bold font-mono">$66,180.00</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E1528] border border-white/[0.06]">
              <span className="text-slate-400">Resting Liquidity Pool:</span>
              <span className="text-cyan-400 font-bold font-mono">$68,900.00</span>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-white/[0.06]">
              <span>Pine Script &amp; Vela Engine</span>
              <span className="text-emerald-400 font-medium">Bar-Close Only</span>
            </div>
          </div>

        </div>
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-white/[0.08] bg-[#070B14] px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-slate-400 w-full min-w-0">
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <Shield className="size-3 text-emerald-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] tracking-tight font-medium text-slate-300">ALGOFINEX INDICATOR SUITE • NON-REPAINTING STRUCTURE &amp; TREND ANALYSIS</span>
        </div>
        <div className="text-slate-500 text-[9px] sm:text-[10px] text-center sm:text-right">
          Illustrative product demonstration. Indicators provide market analysis and are not financial advice.
        </div>
      </div>
    </div>
  );
};

export default HeroProductTerminal;
