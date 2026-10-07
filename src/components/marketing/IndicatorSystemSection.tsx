import React, { useState } from 'react';
import { SYSTEM_LAYERS } from '../../data/productExperienceData';
import { BTC_15M_CANDLES, DEMO_ORDER_BLOCKS, DEMO_SIGNALS } from '../../data/mockChartData';
import { ShieldCheck } from 'lucide-react';

export const IndicatorSystemSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'structure' | 'liquidity' | 'trend' | 'confirmation'>('all');

  // SVG Chart Geometry
  const chartWidth = 920;
  const chartHeight = 380;
  const minPrice = 65800;
  const maxPrice = 68600;
  const priceRange = maxPrice - minPrice;
  const candleCount = BTC_15M_CANDLES.length;
  const stepX = chartWidth / (candleCount + 1);

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  const ema21Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.998 - (c.isBullish ? 45 : 15);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  const ema55Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.993 - (i < 6 ? 100 : 160);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  const isStructureVisible = activeLayer === 'all' || activeLayer === 'structure';
  const isLiquidityVisible = activeLayer === 'all' || activeLayer === 'liquidity';
  const isTrendVisible = activeLayer === 'all' || activeLayer === 'trend';
  const isConfirmationVisible = activeLayer === 'all' || activeLayer === 'confirmation';

  const layersList = [
    { id: 'all', label: 'All Layers Active' },
    { id: 'structure', label: '1. Market Structure' },
    { id: 'liquidity', label: '2. Liquidity Pools' },
    { id: 'trend', label: '3. Trend & Momentum' },
    { id: 'confirmation', label: '4. Execution Trigger' },
  ];

  return (
    <section id="methodology" className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#EAEAE5]">
      <span id="indicator-system" className="sr-only" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-[#EEF2FF] px-3.5 py-1 rounded-full border border-[#E0E7FF] shadow-xs">
            4-Layer Framework
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            Four coordinated layers. <br className="hidden sm:inline" />
            <span className="text-[#4F6BFF]">One cohesive workflow.</span>
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            Each indicator answers a critical trading question before you risk capital: structure, liquidity, trend, and trigger.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {layersList.map((layer) => {
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#4F6BFF] text-white shadow-xs'
                    : 'bg-white text-[#666B76] border border-[#EAEAE5] hover:text-[#17181C] hover:border-[#D8D8D2]'
                }`}
              >
                {layer.label}
              </button>
            );
          })}
        </div>

        {/* Clean Workstation Preview Container */}
        <div className="rounded-3xl border border-[#EAEAE5] bg-white shadow-card overflow-hidden text-left mb-12">
          <div className="flex flex-wrap items-center justify-between border-b border-[#EAEAE5] bg-[#FAFAF7] px-6 py-3.5 text-xs text-[#666B76]">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#35C99A]" />
              <span className="font-semibold text-[#17181C]">Multi-Layer Analytical Composite</span>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF]">
                Active: {activeLayer.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#059669] font-medium">
              <ShieldCheck className="size-3.5" />
              <span>Non-Repainting Pine Script v5</span>
            </div>
          </div>

          <div className="relative w-full bg-white select-none p-4 sm:p-6">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible relative z-10"
            >
              <defs>
                <linearGradient id="trendLightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F6BFF" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#4F6BFF" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Price Levels Grid */}
              {[66000, 67000, 68000].map((price) => (
                <g key={price}>
                  <line
                    x1="0"
                    y1={getY(price)}
                    x2={chartWidth - 50}
                    y2={getY(price)}
                    stroke="#F0F1EE"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={chartWidth - 8}
                    y={getY(price) + 3}
                    fill="#9CA3AF"
                    fontSize="9.5"
                    fontFamily="Inter, sans-serif"
                    textAnchor="end"
                  >
                    ${price.toLocaleString()}
                  </text>
                </g>
              ))}

              {/* Liquidity Layer */}
              {isLiquidityVisible &&
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
                        fill={isBull ? '#F4F0FF' : '#FEF2F2'}
                        stroke={isBull ? '#8B5CF6' : '#FF6B6B'}
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        rx="4"
                      />
                      <text
                        x={startX + 6}
                        y={Math.min(y1, y2) + 12}
                        fill={isBull ? '#7C3AED' : '#DC2626'}
                        fontSize="8.5"
                        fontWeight="600"
                        fontFamily="Inter, sans-serif"
                      >
                        {ob.label}
                      </text>
                    </g>
                  );
                })}

              {/* Trend Layer */}
              {isTrendVisible && (
                <g>
                  <path
                    d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.998)} L ${ema21Points} L ${ema55Points
                      .split(' L ')
                      .reverse()
                      .join(' L ')} Z`}
                    fill="url(#trendLightGrad)"
                  />
                  <path
                    d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.998)} L ${ema21Points}`}
                    fill="none"
                    stroke="#4F6BFF"
                    strokeWidth="2"
                  />
                  <path
                    d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.993)} L ${ema55Points}`}
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                </g>
              )}

              {/* Candlesticks */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const candleWidth = 13;
                const isBull = c.isBullish;
                const color = isBull ? '#35C99A' : '#FF6B6B';
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const bodyY = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2.5);

                const isHighPivot = i === 4;
                const isLowPivot = i === 6;

                return (
                  <g key={i}>
                    <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.4" />
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      rx="1.5"
                    />

                    {/* Structure Pins */}
                    {isStructureVisible && isHighPivot && (
                      <g>
                        <circle cx={x} cy={yHigh - 6} r="3" fill="#4F6BFF" />
                        <rect x={x - 24} y={yHigh - 24} width="48" height="15" rx="3" fill="#EEF2FF" stroke="#E0E7FF" />
                        <text x={x} y={yHigh - 13} textAnchor="middle" fill="#4F6BFF" fontSize="8" fontWeight="600">
                          HH 67,400
                        </text>
                      </g>
                    )}

                    {isStructureVisible && isLowPivot && (
                      <g>
                        <circle cx={x} cy={yLow + 6} r="3" fill="#4F6BFF" />
                        <rect x={x - 24} y={yLow + 14} width="48" height="15" rx="3" fill="#EEF2FF" stroke="#E0E7FF" />
                        <text x={x} y={yLow + 25} textAnchor="middle" fill="#4F6BFF" fontSize="8" fontWeight="600">
                          HL 66,100
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Confirmation Layer */}
              {isConfirmationVisible &&
                DEMO_SIGNALS.map((sig, idx) => {
                  const x = (sig.index + 1) * stepX;
                  const y = getY(sig.price);
                  return (
                    <g key={idx}>
                      <g transform={`translate(${x}, ${y + 18})`}>
                        <rect x="-26" y="0" width="52" height="18" rx="4" fill="#35C99A" />
                        <text x="0" y="12" fill="#FFFFFF" fontSize="8.5" fontWeight="700" textAnchor="middle">
                          CONFIRM
                        </text>
                      </g>
                      <line
                        x1={x - 20}
                        y1={getY(sig.invalidation)}
                        x2={chartWidth - 50}
                        y2={getY(sig.invalidation)}
                        stroke="#FF6B6B"
                        strokeWidth="1.2"
                        strokeDasharray="4 2"
                      />
                    </g>
                  );
                })}
            </svg>
          </div>
        </div>

        {/* 4 Strata Cards Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {SYSTEM_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              onClick={() => setActiveLayer(layer.id as any)}
              className={`p-6 rounded-3xl bg-white border transition-all duration-150 cursor-pointer ${
                activeLayer === layer.id
                  ? 'border-[#4F6BFF] shadow-card'
                  : 'border-[#EAEAE5] shadow-xs hover:border-[#D8D8D2]'
              }`}
            >
              <div className="text-xs font-bold text-[#4F6BFF] mb-2">
                0{idx + 1} · {layer.tagline.toUpperCase()}
              </div>
              <h4 className="text-base font-bold text-[#17181C]">
                {layer.name}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#666B76] leading-relaxed">
                {layer.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndicatorSystemSection;
