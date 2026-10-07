import React, { useState } from 'react';
import { EXPERIENCE_MODES } from '../../data/productExperienceData';
import { BTC_15M_CANDLES, DEMO_ORDER_BLOCKS, DEMO_SIGNALS } from '../../data/mockChartData';
import { ExperienceMode } from '../../types/productExperience';
import { 
  Activity, 
  Layers, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const ProductRevealSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperienceMode>('STRUCTURE');
  const [activeCandleHover, setActiveCandleHover] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const currentMode = EXPERIENCE_MODES[activeMode] || EXPERIENCE_MODES.STRUCTURE;

  // Chart coordinate geometry
  const chartWidth = 980;
  const chartHeight = 440;
  const minPrice = 65800;
  const maxPrice = 68600;
  const priceRange = maxPrice - minPrice;
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

  const modesList: { id: ExperienceMode; label: string; icon: any }[] = [
    { id: 'RAW', label: '1. Raw Price', icon: Activity },
    { id: 'STRUCTURE', label: '2. Structure', icon: Layers },
    { id: 'LIQUIDITY', label: '3. Liquidity', icon: Compass },
    { id: 'TREND', label: '4. Trend', icon: TrendingUp },
    { id: 'CONFIRMATION', label: '5. Confirmation', icon: CheckCircle2 },
  ];

  // EMA Ribbon calculation
  const ema21Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaVal = c.close * 0.9985 - (c.isBullish ? 40 : 10);
    return `${x},${getY(emaVal)}`;
  }).join(' L ');

  const ema55Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaVal = c.close * 0.995 - (i < 8 ? 90 : 160);
    return `${x},${getY(emaVal)}`;
  }).join(' L ');

  return (
    <section id="product-experience" className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-[#EEF2FF] px-3.5 py-1 rounded-full border border-[#E0E7FF] shadow-xs">
            Interactive Product Visual
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            Market structure, <br className="hidden sm:inline" />
            <span className="text-[#4F6BFF]">progressively revealed.</span>
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            Click through each analytical layer to experience how raw candlestick noise is resolved into clean institutional structure.
          </p>
        </div>

        {/* 5 Lens Pills Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6">
          {modesList.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#4F6BFF] text-white shadow-xs'
                    : 'bg-white text-[#666B76] border border-[#EAEAE5] hover:text-[#17181C] hover:border-[#D8D8D2]'
                }`}
              >
                <Icon className="size-4" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modern Clean Workstation Canvas Container */}
        <div className="rounded-3xl border border-[#EAEAE5] bg-white shadow-card overflow-hidden text-left">
          
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#EAEAE5] bg-[#FAFAF7] px-6 py-3.5 gap-3 text-xs text-[#666B76]">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#35C99A]" />
              <span className="font-semibold text-[#17181C]">BTC/USDT · 15m Frame</span>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF]">
                {currentMode.label}
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-[#666B76]">
              <span className="hidden sm:inline">Deterministic Math</span>
              <span className="text-[#D8D8D2] hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-[#059669] font-medium">
                <ShieldCheck className="size-3.5 text-[#35C99A]" />
                <span>Non-Repainting</span>
              </div>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full bg-white select-none p-4 sm:p-6">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto cursor-crosshair overflow-visible relative z-10"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <linearGradient id="cloudGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F6BFF" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#4F6BFF" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id="bullGradMintWide" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#35C99A" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#35C99A" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="bearGradCoralWide" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Faint Horizontal Price Grid Lines */}
              {[66000, 66500, 67000, 67500, 68000, 68500].map((price) => (
                <g key={price}>
                  <line
                    x1="0"
                    y1={getY(price)}
                    x2={chartWidth - 60}
                    y2={getY(price)}
                    stroke="#F0F1EE"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={chartWidth - 8}
                    y={getY(price) + 3}
                    fill="#9CA3AF"
                    fontSize="10"
                    fontFamily="Inter, sans-serif"
                    textAnchor="end"
                  >
                    ${price.toLocaleString()}
                  </text>
                </g>
              ))}

              {/* Mode 2: Structure Matrices */}
              {activeMode === 'STRUCTURE' && (
                <g>
                  {/* Equilibrium Range */}
                  <rect
                    x="0"
                    y={getY(67650)}
                    width={chartWidth - 60}
                    height={getY(66300) - getY(67650)}
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  {/* BOS Line */}
                  <line
                    x1={(4 + 1) * stepX}
                    y1={getY(67620)}
                    x2={(9 + 1) * stepX + 40}
                    y2={getY(67620)}
                    stroke="#4F6BFF"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                  />
                  <rect
                    x={(6 + 1) * stepX - 10}
                    y={getY(67620) - 20}
                    width="110"
                    height="18"
                    rx="4"
                    fill="#EEF2FF"
                    stroke="#E0E7FF"
                  />
                  <text
                    x={(6 + 1) * stepX + 45}
                    y={getY(67620) - 7}
                    textAnchor="middle"
                    fill="#4F6BFF"
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                  >
                    BOS (Break of Structure)
                  </text>
                </g>
              )}

              {/* Mode 3: Liquidity Zones */}
              {activeMode === 'LIQUIDITY' &&
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
                        fill={isBull ? 'url(#bullGradMintWide)' : 'url(#bearGradCoralWide)'}
                        stroke={isBull ? '#35C99A' : '#FF6B6B'}
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        rx="4"
                      />
                      <text
                        x={startX + 8}
                        y={Math.min(y1, y2) + 14}
                        fill={isBull ? '#059669' : '#DC2626'}
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="Inter, sans-serif"
                      >
                        {ob.label}
                      </text>
                    </g>
                  );
                })}

              {/* Mode 4: Trend Ribbon */}
              {activeMode === 'TREND' && (
                <g>
                  <path
                    d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.9985)} L ${ema21Points} L ${ema55Points
                      .split(' L ')
                      .reverse()
                      .join(' L ')} Z`}
                    fill="url(#cloudGradLight)"
                  />
                  <path
                    d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.9985)} L ${ema21Points}`}
                    fill="none"
                    stroke="#4F6BFF"
                    strokeWidth="2.2"
                  />
                  <path
                    d={`M ${stepX},${getY(BTC_15M_CANDLES[0].close * 0.995)} L ${ema55Points}`}
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="1.6"
                    strokeDasharray="4 2"
                  />
                </g>
              )}

              {/* Candlestick Series */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const candleWidth = 14;
                const isBull = c.isBullish;
                const color = isBull ? '#35C99A' : '#FF6B6B';
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const bodyY = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2.5);

                return (
                  <g key={c.time + i}>
                    <line
                      x1={x}
                      y1={yHigh}
                      x2={x}
                      y2={yLow}
                      stroke={color}
                      strokeWidth="1.4"
                    />
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      rx="2"
                    />
                  </g>
                );
              })}

              {/* Mode 5: Confirmation Signals */}
              {activeMode === 'CONFIRMATION' &&
                DEMO_SIGNALS.map((sig, idx) => {
                  const x = (sig.index + 1) * stepX;
                  const y = getY(sig.price);
                  return (
                    <g key={idx}>
                      <g transform={`translate(${x}, ${y + 20})`}>
                        <rect
                          x="-32"
                          y="0"
                          width="64"
                          height="20"
                          rx="4"
                          fill="#35C99A"
                        />
                        <text
                          x="0"
                          y="14"
                          fill="#FFFFFF"
                          fontSize="10"
                          fontWeight="700"
                          textAnchor="middle"
                          fontFamily="Inter, sans-serif"
                        >
                          CONFIRM BUY
                        </text>
                      </g>
                      <line
                        x1={x - 20}
                        y1={getY(sig.invalidation)}
                        x2={chartWidth - 60}
                        y2={getY(sig.invalidation)}
                        stroke="#FF6B6B"
                        strokeWidth="1.4"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={chartWidth - 65}
                        y={getY(sig.invalidation) - 5}
                        textAnchor="end"
                        fill="#DC2626"
                        fontSize="9.5"
                        fontWeight="600"
                      >
                        INVALIDATION $66,180
                      </text>
                    </g>
                  );
                })}

              {/* Crosshair Overlay */}
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
                    strokeOpacity="0.6"
                  />
                  <line
                    x1="0"
                    y1={mousePos.y}
                    x2={chartWidth - 60}
                    y2={mousePos.y}
                    stroke="#4F6BFF"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    strokeOpacity="0.6"
                  />
                  {activeCandleHover !== null && BTC_15M_CANDLES[activeCandleHover] && (
                    <circle
                      cx={(activeCandleHover + 1) * stepX}
                      cy={getY(BTC_15M_CANDLES[activeCandleHover].close)}
                      r="4.5"
                      fill="#4F6BFF"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  )}
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Telemetry & Insight Strip */}
          <div className="border-t border-[#EAEAE5] bg-[#FAFAF7] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF]">
                Layer Objective: {currentMode.label}
              </span>
              <h4 className="text-lg font-bold text-[#17181C] tracking-tight mt-1">
                {currentMode.headline}
              </h4>
              <p className="mt-1.5 text-sm text-[#666B76] leading-relaxed">
                {currentMode.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              {currentMode.activeMetrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#EAEAE5] shadow-xs">
                  <div className="text-[11px] font-medium text-[#666B76]">{m.label}</div>
                  <div className="text-sm font-bold text-[#17181C] mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductRevealSection;
