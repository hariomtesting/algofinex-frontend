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
    <div className="relative w-full rounded-xl border border-[#20252C] bg-[#101318] shadow-workstation overflow-hidden transition-all duration-300">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#20252C] bg-[#141820] px-4 py-2.5 gap-2">
        {/* Left Window Affordances & Symbol Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#3B4654]" />
            <div className="size-2 rounded-full bg-[#3B4654]" />
            <div className="size-2 rounded-full bg-[#3B4654]" />
          </div>

          <div className="h-3.5 w-px bg-[#20252C]" />

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[#F3F4F6]">BTC/USD</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181E28] text-[#8B929C] border border-[#20252C]">
              15m
            </span>
            <span className="text-xs font-mono text-[#6FAF8A] font-medium">+3.42%</span>
          </div>
        </div>

        {/* Right: Strata Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#101318] p-1 rounded-lg border border-[#20252C]">
          <button
            onClick={() => setActiveMode('TREND')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
              activeMode === 'TREND'
                ? 'bg-[#1E2532] text-[#F3F4F6] font-medium'
                : 'text-[#8B929C] hover:text-[#F3F4F6]'
            }`}
          >
            <TrendingUp className="size-3" />
            <span>Trend</span>
          </button>
          <button
            onClick={() => setActiveMode('LIQUIDITY')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
              activeMode === 'LIQUIDITY'
                ? 'bg-[#1E2532] text-[#F3F4F6] font-medium'
                : 'text-[#8B929C] hover:text-[#F3F4F6]'
            }`}
          >
            <Compass className="size-3" />
            <span>Liquidity</span>
          </button>
          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${
              activeMode === 'STRUCTURE'
                ? 'bg-[#1E2532] text-[#F3F4F6] font-medium'
                : 'text-[#8B929C] hover:text-[#F3F4F6]'
            }`}
          >
            <Layers className="size-3" />
            <span>Structure</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative w-full bg-[#0B0E13] select-none p-2 sm:p-3">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-financial-grid opacity-50 pointer-events-none" />

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto cursor-crosshair overflow-visible relative z-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="cloudGradInstitutional" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#C8A96B" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="bullGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6FAF8A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6FAF8A" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="bearGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C87878" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C87878" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Horizontal Reference Price Levels */}
          {[66000, 67000, 68000].map((price) => (
            <g key={price} opacity="0.3">
              <line
                x1="0"
                y1={getY(price)}
                x2={chartWidth}
                y2={getY(price)}
                stroke="#20252C"
                strokeDasharray="3 3"
              />
              <text
                x={chartWidth - 5}
                y={getY(price) - 3}
                fill="#6B7380"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
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
                    fill={isBull ? 'url(#bullGrad)' : 'url(#bearGrad)'}
                    stroke={isBull ? '#6FAF8A' : '#C87878'}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    rx="3"
                  />
                  <text
                    x={startX + 6}
                    y={Math.min(y1, y2) + 12}
                    fill={isBull ? '#6FAF8A' : '#C87878'}
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
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
                fill="url(#cloudGradInstitutional)"
              />
              {/* Fast baseline */}
              <path
                d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.998)} L ${ema21Points}`}
                fill="none"
                stroke="#C8A96B"
                strokeWidth="1.6"
                strokeOpacity="0.85"
              />
              {/* Slow baseline */}
              <path
                d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.994)} L ${ema55Points}`}
                fill="none"
                stroke="#8B929C"
                strokeWidth="1.2"
                strokeOpacity="0.6"
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
            const candleBodyHeight = Math.max(Math.abs(closeY - openY), 2);
            const color = isBull ? '#6FAF8A' : '#C87878';

            return (
              <g key={i} className="transition-opacity">
                {/* Candle Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                />
                {/* Candle Body */}
                <rect
                  x={x - 4}
                  y={candleBodyY}
                  width="8"
                  height={candleBodyHeight}
                  fill={isBull ? '#6FAF8A' : '#C87878'}
                  rx="1"
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
                  {/* Signal glyph */}
                  <g transform={`translate(${x}, ${isBuy ? y + 16 : y - 16})`}>
                    <rect
                      x="-22"
                      y={isBuy ? 0 : -16}
                      width="44"
                      height="16"
                      rx="3"
                      fill={isBuy ? '#6FAF8A' : '#C87878'}
                    />
                    <text
                      x="0"
                      y={isBuy ? 11 : -5}
                      fill="#080A0D"
                      fontSize="8"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
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
                    stroke="#C87878"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={x + 74}
                    y={invalidationY + 3}
                    fill="#C87878"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono, monospace"
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
                stroke="#C8A96B"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                strokeOpacity="0.6"
              />
              <line
                x1="0"
                y1={mousePos.y}
                x2={chartWidth}
                y2={mousePos.y}
                stroke="#C8A96B"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                strokeOpacity="0.6"
              />
            </g>
          )}
        </svg>

        {/* Hovered Price / Telemetry Pill */}
        {activeCandleHover !== null && BTC_15M_CANDLES[activeCandleHover] && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-[#141820]/90 backdrop-blur-sm border border-[#20252C] px-3 py-1.5 rounded-lg text-[11px] font-mono text-[#F3F4F6] shadow-sm">
            <span>
              O: <span className="text-[#8B929C]">${BTC_15M_CANDLES[activeCandleHover].open}</span>
            </span>
            <span>
              H: <span className="text-[#8B929C]">${BTC_15M_CANDLES[activeCandleHover].high}</span>
            </span>
            <span>
              L: <span className="text-[#8B929C]">${BTC_15M_CANDLES[activeCandleHover].low}</span>
            </span>
            <span>
              C:{' '}
              <span
                className={
                  BTC_15M_CANDLES[activeCandleHover].isBullish ? 'text-[#6FAF8A]' : 'text-[#C87878]'
                }
              >
                ${BTC_15M_CANDLES[activeCandleHover].close}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Terminal Telemetry Footer Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-[#20252C] bg-[#141820] px-4 py-2 text-[11px] font-mono text-[#8B929C]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#6FAF8A]" />
            <span>Algorithm: {indicatorData.trendContext || 'Momentum Corridor'}</span>
          </span>
          <span className="text-[#3B4654]">•</span>
          <span>Regime: Expansion Validated</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showOrderBlocks}
              onChange={(e) => setShowOrderBlocks(e.target.checked)}
              className="rounded accent-[#C8A96B] size-3"
            />
            <span>Imbalances</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showSignals}
              onChange={(e) => setShowSignals(e.target.checked)}
              className="rounded accent-[#C8A96B] size-3"
            />
            <span>Signals</span>
          </label>
        </div>
      </div>
    </div>
  );
};
