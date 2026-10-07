import React, { useState } from 'react';
import { 
  BTC_15M_CANDLES, 
  DEMO_SIGNALS, 
  DEMO_ORDER_BLOCKS, 
  INDICATOR_DATA_BY_MODE 
} from '../../data/mockChartData';
import { IndicatorMode } from '../../types/trading';
import { 
  TrendingUp, 
  Compass, 
  Layers 
} from 'lucide-react';

export const HeroProductTerminal: React.FC = () => {
  const [activeMode, setActiveMode] = useState<IndicatorMode>('TREND');
  const [showEMA] = useState(true);
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
    <div className="relative w-full rounded-2xl border border-[#EAEAE5] bg-white shadow-card overflow-hidden transition-all duration-200 text-left">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#EAEAE5] bg-[#FAFAF7] px-4 sm:px-5 py-3 gap-2">
        {/* Left Window Symbol Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-[#FF6B6B]/80" />
            <div className="size-2.5 rounded-full bg-[#F4C95D]/80" />
            <div className="size-2.5 rounded-full bg-[#35C99A]/80" />
          </div>

          <div className="h-3.5 w-px bg-[#EAEAE5]" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#17181C]">BTC/USD</span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F1F4FF] text-[#4F6BFF]">
              15m
            </span>
            <span className="text-xs font-medium text-[#35C99A]">+3.42%</span>
          </div>
        </div>

        {/* Right: Strata Selector Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EAEAE5]">
          <button
            onClick={() => setActiveMode('TREND')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'TREND'
                ? 'bg-[#EEF2FF] text-[#4F6BFF] font-semibold'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <TrendingUp className="size-3" />
            <span>Trend</span>
          </button>
          <button
            onClick={() => setActiveMode('LIQUIDITY')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'LIQUIDITY'
                ? 'bg-[#F4F0FF] text-[#8B5CF6] font-semibold'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <Compass className="size-3" />
            <span>Liquidity</span>
          </button>
          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'STRUCTURE'
                ? 'bg-[#ECFBF6] text-[#059669] font-semibold'
                : 'text-[#666B76] hover:text-[#17181C]'
            }`}
          >
            <Layers className="size-3" />
            <span>Structure</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative w-full bg-white select-none p-3 sm:p-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto cursor-crosshair overflow-visible relative z-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="cloudGradFintech" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F6BFF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#4F6BFF" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="bullGradMint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#35C99A" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#35C99A" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="bearGradCoral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal Reference Price Grid Lines */}
          {[66000, 67000, 68000].map((price) => (
            <g key={price}>
              <line
                x1="0"
                y1={getY(price)}
                x2={chartWidth}
                y2={getY(price)}
                stroke="#F0F1EE"
                strokeDasharray="4 4"
              />
              <text
                x={chartWidth - 8}
                y={getY(price) - 4}
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                textAnchor="end"
              >
                ${price.toLocaleString()}
              </text>
            </g>
          ))}

          {/* Mode 1: Order Blocks & Imbalances (Liquidity Mode) */}
          {(activeMode === 'LIQUIDITY' || showOrderBlocks) &&
            DEMO_ORDER_BLOCKS.map((ob, idx) => {
              const startX = (ob.startIndex + 1) * stepX;
              const endX = (ob.endIndex + 1) * stepX;
              const y1 = getY(ob.topPrice);
              const y2 = getY(ob.bottomPrice);
              const height = Math.abs(y2 - y1);
              const isBull = ob.type === 'BULLISH_OB';

              return (
                <g key={idx}>
                  <rect
                    x={startX}
                    y={Math.min(y1, y2)}
                    width={endX - startX}
                    height={height}
                    fill={isBull ? 'url(#bullGradMint)' : 'url(#bearGradCoral)'}
                    stroke={isBull ? '#35C99A' : '#FF6B6B'}
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    rx="4"
                  />
                  <text
                    x={startX + 8}
                    y={Math.min(y1, y2) + 13}
                    fill={isBull ? '#059669' : '#DC2626'}
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                  >
                    {ob.label}
                  </text>
                </g>
              );
            })}

          {/* Mode 2: Momentum Ribbon Cloud (Trend Mode) */}
          {(activeMode === 'TREND' || showEMA) && (
            <g>
              {/* Ribbon Corridor */}
              <path
                d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.998)} L ${ema21Points} L ${ema55Points
                  .split(' L ')
                  .reverse()
                  .join(' L ')} Z`}
                fill="url(#cloudGradFintech)"
              />
              {/* Fast baseline in Electric Blue */}
              <path
                d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.998)} L ${ema21Points}`}
                fill="none"
                stroke="#4F6BFF"
                strokeWidth="2"
                strokeOpacity="0.9"
              />
              {/* Slow baseline */}
              <path
                d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.994)} L ${ema55Points}`}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeOpacity="0.7"
                strokeDasharray="4 2"
              />
            </g>
          )}

          {/* Candlestick Series */}
          {BTC_15M_CANDLES.map((c, i) => {
            const x = (i + 1) * stepX;
            const openY = getY(c.open);
            const closeY = getY(c.close);
            const highY = getY(c.high);
            const lowY = getY(c.low);
            const isBull = c.isBullish;
            const candleBodyY = Math.min(openY, closeY);
            const candleBodyHeight = Math.max(Math.abs(closeY - openY), 2.5);
            const color = isBull ? '#35C99A' : '#FF6B6B';

            return (
              <g key={i}>
                {/* Candle Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth="1.4"
                  strokeOpacity="0.8"
                />
                {/* Candle Body */}
                <rect
                  x={x - 4}
                  y={candleBodyY}
                  width="8"
                  height={candleBodyHeight}
                  fill={color}
                  rx="1.5"
                />
              </g>
            );
          })}

          {/* Mode 3: Signal Triggers (Bar-close execution markers) */}
          {showSignals &&
            DEMO_SIGNALS.map((sig, idx) => {
              const x = (sig.index + 1) * stepX;
              const y = getY(sig.price);
              const isBuy = sig.type === 'BUY';
              const invalidationY = getY(sig.invalidation);

              return (
                <g key={idx}>
                  {/* Signal badge */}
                  <g transform={`translate(${x}, ${isBuy ? y + 18 : y - 18})`}>
                    <rect
                      x="-24"
                      y={isBuy ? 0 : -16}
                      width="48"
                      height="17"
                      rx="4"
                      fill={isBuy ? '#35C99A' : '#FF6B6B'}
                    />
                    <text
                      x="0"
                      y={isBuy ? 12 : -4}
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="Inter, sans-serif"
                      textAnchor="middle"
                    >
                      {sig.label}
                    </text>
                  </g>

                  {/* Structural Invalidation Line */}
                  <line
                    x1={x - 20}
                    y1={invalidationY}
                    x2={x + 70}
                    y2={invalidationY}
                    stroke="#FF6B6B"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={x + 74}
                    y={invalidationY + 3.5}
                    fill="#DC2626"
                    fontSize="8.5"
                    fontFamily="Inter, sans-serif"
                    fontWeight="500"
                  >
                    INV ${sig.invalidation}
                  </text>
                </g>
              );
            })}

          {/* Crosshair on Mouse Over */}
          {mousePos && (
            <g pointerEvents="none">
              <line
                x1={mousePos.x}
                y1="0"
                x2={mousePos.x}
                y2={chartHeight}
                stroke="#4F6BFF"
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeOpacity="0.5"
              />
              <line
                x1="0"
                y1={mousePos.y}
                x2={chartWidth}
                y2={mousePos.y}
                stroke="#4F6BFF"
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeOpacity="0.5"
              />
            </g>
          )}
        </svg>

        {/* Hovered Price Tooltip Pill */}
        {activeCandleHover !== null && BTC_15M_CANDLES[activeCandleHover] && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-xs border border-[#EAEAE5] px-3.5 py-1.5 rounded-xl text-xs text-[#17181C] shadow-sm">
            <span>
              O: <span className="text-[#666B76]">${BTC_15M_CANDLES[activeCandleHover].open}</span>
            </span>
            <span>
              H: <span className="text-[#666B76]">${BTC_15M_CANDLES[activeCandleHover].high}</span>
            </span>
            <span>
              L: <span className="text-[#666B76]">${BTC_15M_CANDLES[activeCandleHover].low}</span>
            </span>
            <span>
              C:{' '}
              <span
                className={
                  BTC_15M_CANDLES[activeCandleHover].isBullish ? 'text-[#059669] font-medium' : 'text-[#DC2626] font-medium'
                }
              >
                ${BTC_15M_CANDLES[activeCandleHover].close}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Terminal Telemetry Footer Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-[#EAEAE5] bg-[#FAFAF7] px-4 sm:px-5 py-2.5 text-xs text-[#666B76]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#35C99A]" />
            <span>Algorithm: {indicatorData.trendContext || 'Momentum Corridor'}</span>
          </span>
          <span className="text-[#D8D8D2]">•</span>
          <span>Regime: Expansion Validated</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOrderBlocks}
              onChange={(e) => setShowOrderBlocks(e.target.checked)}
              className="rounded accent-[#4F6BFF] size-3.5 cursor-pointer"
            />
            <span>Imbalances</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSignals}
              onChange={(e) => setShowSignals(e.target.checked)}
              className="rounded accent-[#4F6BFF] size-3.5 cursor-pointer"
            />
            <span>Signals</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default HeroProductTerminal;
