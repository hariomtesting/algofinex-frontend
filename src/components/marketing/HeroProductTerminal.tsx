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
  const chartHeight = 280;
  const chartWidth = 740;
  const candleCount = BTC_15M_CANDLES.length;
  const stepX = chartWidth / (candleCount + 1);

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
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
    <div className="relative w-full rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0E1A] shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300">
      {/* Terminal Title Bar (LuxAlgo Vela Header) */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#0D1322] px-3.5 sm:px-5 py-2.5 gap-2">
        {/* Left Window Affordances & Symbol Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#FF5F56]/80" />
            <div className="size-2 rounded-full bg-[#FFBD2E]/80" />
            <div className="size-2 rounded-full bg-[#27C93F]/80" />
          </div>

          <div className="h-3.5 w-px bg-white/10 hidden sm:block" />

          {/* Instrument Selector Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono shadow-xs">
            <span className="font-bold text-white tracking-wide">BTC/USD</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">PERP</span>
            <span className="text-emerald-400 text-[11px] font-bold flex items-center shadow-[0_0_10px_rgba(0,240,144,0.3)]">
              $68,220.50
            </span>
          </div>

          {/* Timeframe Badges */}
          <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <span className="px-1.5 py-0.5 rounded hover:text-white transition-colors cursor-pointer">5m</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">15m</span>
            <span className="px-1.5 py-0.5 rounded hover:text-white transition-colors cursor-pointer">1H</span>
            <span className="px-1.5 py-0.5 rounded hover:text-white transition-colors cursor-pointer">4H</span>
          </div>
        </div>

        {/* Center Indicator Mode Selector */}
        <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10 gap-0.5 text-xs w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setActiveMode('TREND')}
            className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer text-[11px] font-mono ${
              activeMode === 'TREND'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,240,144,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="size-3 shrink-0" />
            <span>Trend</span>
          </button>

          <button
            onClick={() => setActiveMode('LIQUIDITY')}
            className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer text-[11px] font-mono ${
              activeMode === 'LIQUIDITY'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="size-3 shrink-0" />
            <span>Liquidity</span>
          </button>

          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md font-medium transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer text-[11px] font-mono ${
              activeMode === 'STRUCTURE'
                ? 'bg-purple-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="size-3 shrink-0" />
            <span>Structure</span>
          </button>
        </div>

        {/* Right Status Tag */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-300">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00F090]" />
            <span className="font-semibold text-white">VELA ENGINE</span>
          </div>
        </div>
      </div>

      {/* Layer Toggles Secondary Ribbon */}
      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] bg-[#070B14] px-4 py-1.5 text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[10px]">
          <span className="text-slate-400 tracking-wide flex items-center gap-1 font-medium">
            <Eye className="size-3 text-emerald-400" />
            Lenses:
          </span>
          
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors cursor-pointer ${
              showEMA ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`size-1 rounded-full ${showEMA ? 'bg-cyan-400 shadow-[0_0_4px_#00E5FF]' : 'bg-slate-600'}`} />
            EMA Cloud
          </button>

          <button
            onClick={() => setShowOrderBlocks(!showOrderBlocks)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors cursor-pointer ${
              showOrderBlocks ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`size-1 rounded-full ${showOrderBlocks ? 'bg-emerald-400 shadow-[0_0_4px_#00F090]' : 'bg-slate-600'}`} />
            Order Blocks
          </button>

          <button
            onClick={() => setShowSignals(!showSignals)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors cursor-pointer ${
              showSignals ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className={`size-1 rounded-full ${showSignals ? 'bg-amber-400 shadow-[0_0_4px_#F59E0B]' : 'bg-slate-600'}`} />
            Signals
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <span className="text-emerald-400/90 font-medium">Non-repainting bar-close</span>
        </div>
      </div>

      {/* Main Terminal Body Grid: Chart Area (Left) + Intelligence Strip (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-w-0 bg-[#060A12]">
        {/* Left Chart Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 p-2.5 sm:p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative overflow-hidden bg-[#060A12] w-full min-w-0">
          {/* Active Candle Inspection Bar */}
          {(() => {
            const inspectedCandle = activeCandleHover !== null ? BTC_15M_CANDLES[activeCandleHover] : BTC_15M_CANDLES[BTC_15M_CANDLES.length - 1];
            return (
              <div className="flex flex-wrap items-center justify-between text-[10px] font-mono mb-1.5 z-10 px-2 py-1 rounded bg-[#0D1322] border border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  <span className="text-slate-400">Bar: <span className="text-white font-semibold">{inspectedCandle.time}</span></span>
                  <span className="text-slate-400">O: <span className="text-white font-semibold">{inspectedCandle.open.toLocaleString()}</span></span>
                  <span className="text-slate-400">H: <span className="text-emerald-400 font-bold">{inspectedCandle.high.toLocaleString()}</span></span>
                  <span className="text-slate-400">L: <span className="text-rose-400 font-bold">{inspectedCandle.low.toLocaleString()}</span></span>
                  <span className="text-slate-400">C: <span className={inspectedCandle.isBullish ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{inspectedCandle.close.toLocaleString()}</span></span>
                  <span className="text-slate-400">Vol: <span className="text-cyan-400 font-semibold">{inspectedCandle.volume.toLocaleString()}</span></span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[9px] text-slate-400">
                  <Crosshair className="size-2.5 text-emerald-400" />
                  <span>Crosshair Scrub</span>
                </div>
              </div>
            );
          })()}

          {/* Interactive SVG Chart */}
          <div className="relative w-full h-[210px] sm:h-[240px] md:h-[260px] lg:h-[250px] xl:h-[270px] select-none overflow-hidden">
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
                <linearGradient id="heroCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#00F090" stopOpacity="0.04" />
                </linearGradient>

                <linearGradient id="heroDemandHatch" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.03" />
                </linearGradient>

                <linearGradient id="heroSupplyHatch" x1="0%" y1="0%" x2="100%" y2="0%">
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
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={chartWidth - 48}
                      y={y - 3}
                      fill="#64748B"
                      fontSize="8.5"
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
                    <g key={idx}>
                      <rect
                        x={startX}
                        y={topY}
                        width={width}
                        height={height}
                        fill={isDemand ? 'url(#heroDemandHatch)' : 'url(#heroSupplyHatch)'}
                        stroke={isDemand ? '#00E5FF' : '#FF3B69'}
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        rx="2"
                      />
                      <text
                        x={startX + 4}
                        y={topY + 11}
                        fill={isDemand ? '#00E5FF' : '#FF3B69'}
                        fontSize="8"
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
                    fill="url(#heroCloudGrad)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#00F090"
                    strokeWidth="1.4"
                    strokeDasharray="4 2"
                    strokeOpacity="0.9"
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
                const candleWidth = Math.max(stepX * 0.65, 7);

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
                      strokeWidth="1.2"
                    />
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      stroke={color}
                      strokeWidth="0.8"
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
                  const y = getY(targetCandle.low) + 20;

                  return (
                    <g key={idx}>
                      <rect
                        x={x - 48}
                        y={y}
                        width="96"
                        height="18"
                        rx="3"
                        fill="#0A1624"
                        stroke="#00F090"
                        strokeWidth="1.2"
                        filter="drop-shadow(0 2px 6px rgba(0,240,144,0.25))"
                      />
                      <text
                        x={x}
                        y={y + 12}
                        textAnchor="middle"
                        fill="#00F090"
                        fontSize="7.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        CONFIRM BUY ✦
                      </text>
                    </g>
                  );
                })}

              {/* Price Scale Right Line */}
              <line
                x1={chartWidth - 52}
                y1="0"
                x2={chartWidth - 52}
                y2={chartHeight - 18}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />

              {/* Bottom Time Axis Baseline */}
              <line
                x1="0"
                y1={chartHeight - 18}
                x2={chartWidth - 52}
                y2={chartHeight - 18}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />

              {/* Current Price Beacon Line */}
              <line
                x1="0"
                y1={getY(68220)}
                x2={chartWidth - 52}
                y2={getY(68220)}
                stroke="#00F090"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              <rect
                x={chartWidth - 52}
                y={getY(68220) - 8}
                width="50"
                height="16"
                rx="2"
                fill="#00F090"
              />
              <text
                x={chartWidth - 27}
                y={getY(68220) + 4}
                textAnchor="middle"
                fill="#05080E"
                fontSize="8"
                fontWeight="800"
                fontFamily="monospace"
              >
                68,220.5
              </text>

              {/* Crosshair Hover Tracking */}
              {mousePos && activeCandleHover !== null && (
                <g className="pointer-events-none">
                  <line
                    x1={(activeCandleHover + 1) * stepX}
                    y1="0"
                    x2={(activeCandleHover + 1) * stepX}
                    y2={chartHeight - 18}
                    stroke="#00E5FF"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="0"
                    y1={mousePos.y}
                    x2={chartWidth - 52}
                    y2={mousePos.y}
                    stroke="#00E5FF"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={(activeCandleHover + 1) * stepX}
                    cy={getY(BTC_15M_CANDLES[activeCandleHover].close)}
                    r="3.5"
                    fill="#00F090"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Volume & Market Structure Summary Strip */}
          <div className="w-full pt-2 mt-1 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-semibold">Structure:</span>
              <span className="text-emerald-400 font-bold">{indicatorData.marketStructure}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
              <span className="size-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#00F090]" />
              <span>Real-Time Engine</span>
            </div>
          </div>
        </div>

        {/* Right Intelligence Strip (4 cols on lg) */}
        <div className="lg:col-span-4 p-3.5 sm:p-4 bg-[#0A0F1D] flex flex-col justify-between gap-3 border-l border-white/[0.08]">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                Indicator Analysis
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                Active Lens
              </span>
            </div>

            <div className="text-sm sm:text-base font-display font-bold text-white tracking-tight mb-1">
              {indicatorData.marketStructure}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-2">
              Algorithmic mapping showing clean trend support, resting liquidity reclaim levels, and verified signals.
            </p>
          </div>

          {/* Core Indicator Parameters Cards */}
          <div className="flex flex-col gap-1.5 font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-[#0E1528] border border-white/[0.08] flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Market Structure</span>
              <span className="text-emerald-400 font-bold text-[10px]">BULLISH BOS</span>
            </div>

            <div className="p-2 rounded-lg bg-[#0E1528] border border-white/[0.08] flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Liquidity State</span>
              <span className="text-cyan-400 font-bold text-[10px]">SWEPT &amp; HELD</span>
            </div>

            <div className="p-2 rounded-lg bg-[#0E1528] border border-white/[0.08] flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Trend Context</span>
              <span className="text-purple-400 font-bold text-[10px]">DYNAMIC SUPPORT</span>
            </div>

            {/* Multi-Timeframe Alignment */}
            <div className="p-2 rounded-lg bg-[#0E1528] border border-white/[0.08]">
              <span className="text-[9px] text-slate-400 block mb-1">Multi-Timeframe Context</span>
              <div className="grid grid-cols-3 gap-1 text-center text-[9px]">
                <div className="p-1 rounded bg-[#070B14] border border-white/[0.06]">
                  <div className="text-slate-500 text-[8px]">4H</div>
                  <div className="text-emerald-400 font-bold truncate">Bullish</div>
                </div>
                <div className="p-1 rounded bg-[#070B14] border border-white/[0.06]">
                  <div className="text-slate-500 text-[8px]">1H</div>
                  <div className="text-cyan-400 font-bold truncate">Expansion</div>
                </div>
                <div className="p-1 rounded bg-[#070B14] border border-white/[0.06]">
                  <div className="text-slate-500 text-[8px]">15m</div>
                  <div className="text-emerald-400 font-bold truncate">Confirmed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Analytical Telemetry Panel */}
          <div className="p-2.5 rounded-lg bg-[#070B14] border border-white/[0.08] flex flex-col gap-1.5 font-mono text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Invalidation Stop:</span>
              <span className="text-rose-400 font-bold">$66,180.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Liquidity Pool:</span>
              <span className="text-cyan-400 font-bold">$68,900.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-white/[0.08] bg-[#070B14] px-3.5 sm:px-5 py-2 flex items-center justify-between gap-2 text-[9px] sm:text-[10px] font-mono text-slate-400 w-full min-w-0">
        <div className="flex items-center gap-1.5 text-left">
          <Shield className="size-3 text-emerald-400 shrink-0" />
          <span className="text-slate-300">ALGOFINEX SUITE • NON-REPAINTING STRUCTURE ANALYSIS</span>
        </div>
        <div className="text-slate-500 text-right hidden sm:block">
          Educational market analysis only.
        </div>
      </div>
    </div>
  );
};

export default HeroProductTerminal;
