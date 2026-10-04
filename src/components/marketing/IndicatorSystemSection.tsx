import React, { useState } from 'react';
import { SYSTEM_LAYERS } from '../../data/productExperienceData';
import { BTC_15M_CANDLES, DEMO_ORDER_BLOCKS, DEMO_SIGNALS } from '../../data/mockChartData';
import { 
  Layers, 
  Sliders, 
  ShieldCheck
} from 'lucide-react';

export const IndicatorSystemSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'structure' | 'liquidity' | 'trend' | 'confirmation'>('all');

  const selectedLayerData = SYSTEM_LAYERS.find(l => l.id === activeLayer) || SYSTEM_LAYERS[0];

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

  // EMA Ribbon Points
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

  return (
    <section id="methodology" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#EDF2F7] border-t border-black/[0.06] bg-blueprint-grid">
      
      {/* Anchor for alternate nav link */}
      <span id="indicator-system" className="absolute -top-20" />

      {/* Architectural Blueprint Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[180px] opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[160px] opacity-50" />
        {/* Subtle architectural vertical axis ruler */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-black/[0.03]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
              <Layers className="size-3 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">
                SECTION 04 • THE ALGOFINEX METHODOLOGY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.05]">
              Four analytical layers.<br />
              <span className="text-brand-blue">
                One unified visual method.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Instead of loading disjointed indicators that contradict one another, the AlgoFinex method operates as a single coordinated system. Four spatial concepts intersect on one chart: Structure establishes boundaries, Liquidity reveals resting orders, Trend measures momentum, and Confirmation locks execution.
            </p>

            {/* Layer Confluence Principle */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <ShieldCheck className="size-4 text-signal-bull shrink-0" />
              <span>Confluence Rule: Trigger locks only when active layers agree</span>
            </div>
          </div>

        </div>

        {/* Optical Layer Selector Strips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 w-full">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'all'
                ? 'bg-brand-blue text-white shadow-sm border border-brand-blue'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08] hover:border-black/[0.18]'
            }`}
          >
            <Sliders className="size-4 shrink-0" />
            <span>Composite All 4 Layers</span>
          </button>

          <button
            onClick={() => setActiveLayer('structure')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'structure'
                ? 'bg-brand-blue text-white shadow-sm border border-brand-blue'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08] hover:border-black/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-brand-blue" />
            <span>01. Market Structure</span>
          </button>

          <button
            onClick={() => setActiveLayer('liquidity')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'liquidity'
                ? 'bg-brand-blue text-white shadow-sm border border-brand-blue'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08] hover:border-black/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-purple-600" />
            <span>02. Liquidity Pools</span>
          </button>

          <button
            onClick={() => setActiveLayer('trend')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'trend'
                ? 'bg-brand-blue text-white shadow-sm border border-brand-blue'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08] hover:border-black/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-emerald-600" />
            <span>03. Trend Cloud</span>
          </button>

          <button
            onClick={() => setActiveLayer('confirmation')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'confirmation'
                ? 'bg-brand-blue text-white shadow-sm border border-brand-blue'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08] hover:border-black/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-amber-600" />
            <span>04. Execution Trigger</span>
          </button>
        </div>

        {/* ONE LARGE CENTRAL TRADING INTERFACE (White Analytical Canvas) */}
        <div className="relative rounded-2xl md:rounded-3xl border border-black/[0.09] bg-white shadow-workstation overflow-hidden w-full min-w-0">
          
          {/* Top Interface Status Strip */}
          <div className="flex flex-wrap items-center justify-between border-b border-black/[0.07] bg-slate-50/80 px-4 sm:px-8 py-3 gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="font-bold text-slate-900 tracking-wide">
                AlgoFinex Composite Instrument
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-black/[0.08] uppercase shadow-2xs">
                {activeLayer === 'all' ? 'All 4 Strata Active' : `Strata: ${activeLayer.toUpperCase()}`}
              </span>
            </div>

            {/* Active Layers Pill Indicators */}
            <div className="flex items-center gap-2 text-[10px]">
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isStructureVisible ? 'bg-blue-50 text-brand-blue border-blue-200 font-semibold' : 'bg-slate-50 text-slate-400 border-transparent'
              }`}>
                01. Structure
              </span>
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isLiquidityVisible ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold' : 'bg-slate-50 text-slate-400 border-transparent'
              }`}>
                02. Liquidity
              </span>
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isTrendVisible ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold' : 'bg-slate-50 text-slate-400 border-transparent'
              }`}>
                03. Trend
              </span>
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isConfirmationVisible ? 'bg-amber-50 text-amber-700 border-amber-200 font-semibold' : 'bg-slate-50 text-slate-400 border-transparent'
              }`}>
                04. Confirmation
              </span>
            </div>
          </div>

          {/* Central Chart Surface */}
          <div className="relative p-4 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[440px] overflow-hidden bg-white">
            
            {/* Fine Hairline Blueprint Grid */}
            <div className="absolute inset-0 grid grid-rows-5 grid-cols-8 pointer-events-none opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="border-b border-r border-black/[0.04]" />
              ))}
            </div>

            {/* Price Scale Ticks */}
            <div className="absolute right-4 top-6 bottom-6 flex flex-col justify-between text-[10px] font-mono text-slate-400 pointer-events-none select-none">
              <span>$68,500</span>
              <span>$67,800</span>
              <span>$67,100</span>
              <span>$66,400</span>
              <span>$65,800</span>
            </div>

            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto max-w-[920px] overflow-visible select-none relative z-10"
            >
              <defs>
                <linearGradient id="instrumentCloudLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.03" />
                </linearGradient>

                <pattern id="obHatchLight2" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.25" />
                </pattern>
              </defs>

              {/* Layer 2: Liquidity Overlays */}
              {isLiquidityVisible && (
                <g className="transition-opacity duration-300">
                  {DEMO_ORDER_BLOCKS.map((ob, idx) => {
                    const yTop = getY(ob.topPrice);
                    const yBottom = getY(ob.bottomPrice);
                    const rectHeight = Math.abs(yBottom - yTop);
                    const isDemand = ob.type === 'BULLISH_OB';

                    return (
                      <g key={idx}>
                        <rect
                          x={140}
                          y={yTop}
                          width={chartWidth - 220}
                          height={rectHeight}
                          fill={isDemand ? 'url(#obHatchLight2)' : '#FEE2E2'}
                          fillOpacity={isDemand ? 1 : 0.6}
                          stroke={isDemand ? '#2563EB' : '#DC2626'}
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          rx="3"
                        />
                        <text
                          x={150}
                          y={yTop + 14}
                          fill={isDemand ? '#1D4ED8' : '#B91C1C'}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="700"
                        >
                          {ob.label} [Resting Pool]
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Layer 3: Trend Overlays */}
              {isTrendVisible && (
                <g className="transition-opacity duration-300">
                  <path
                    d={`M ${ema21Points} L ${chartWidth - 50},${getY(67700)} L ${stepX},${getY(66200)} Z`}
                    fill="url(#instrumentCloudLight)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    strokeOpacity="0.85"
                  />
                </g>
              )}

              {/* Candlesticks */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const candleWidth = 15;
                const isBull = c.isBullish;
                const color = isBull ? '#059669' : '#DC2626';
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const bodyY = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2.5);

                const isHighPivot = i === 4;
                const isLowPivot = i === 6;
                const isBOSCandle = i === 9;

                return (
                  <g key={i}>
                    <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.5" strokeOpacity="0.85" />
                    <rect
                      x={x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      rx="2"
                      fillOpacity={isBull ? 0.95 : 0.85}
                      stroke={color}
                      strokeWidth={isBull ? '1.2' : '1'}
                    />

                    {/* Layer 1: Structure Overlays - Precision Pins */}
                    {isStructureVisible && (
                      <>
                        {isHighPivot && (
                          <g>
                            <circle cx={x} cy={yHigh - 6} r="3" fill="#1D4ED8" />
                            <line x1={x} y1={yHigh - 16} x2={x} y2={yHigh - 6} stroke="#1D4ED8" strokeWidth="1.2" />
                            <rect
                              x={x - 26}
                              y={yHigh - 28}
                              width="52"
                              height="14"
                              rx="3"
                              fill="#FFFFFF"
                              stroke="#1D4ED8"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={yHigh - 18}
                              textAnchor="middle"
                              fill="#1D4ED8"
                              fontSize="8"
                              fontFamily="monospace"
                              fontWeight="700"
                            >
                              HH 67,400
                            </text>
                          </g>
                        )}
                        {isLowPivot && (
                          <g>
                            <circle cx={x} cy={yLow + 6} r="3" fill="#059669" />
                            <line x1={x} y1={yLow + 6} x2={x} y2={yLow + 16} stroke="#059669" strokeWidth="1.2" />
                            <rect
                              x={x - 26}
                              y={yLow + 16}
                              width="52"
                              height="14"
                              rx="3"
                              fill="#FFFFFF"
                              stroke="#059669"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={yLow + 26}
                              textAnchor="middle"
                              fill="#047857"
                              fontSize="8"
                              fontFamily="monospace"
                              fontWeight="700"
                            >
                              HL 66,100
                            </text>
                          </g>
                        )}
                        {isBOSCandle && (
                          <g>
                            <line
                              x1={x - 90}
                              y1={getY(67400)}
                              x2={x + 50}
                              y2={getY(67400)}
                              stroke="#1D4ED8"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                            <rect
                              x={x - 30}
                              y={getY(67400) - 18}
                              width="60"
                              height="15"
                              rx="3"
                              fill="#FFFFFF"
                              stroke="#1D4ED8"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={getY(67400) - 7}
                              textAnchor="middle"
                              fill="#1D4ED8"
                              fontSize="8"
                              fontFamily="monospace"
                              fontWeight="700"
                            >
                              BOS ▲
                            </text>
                          </g>
                        )}
                      </>
                    )}
                  </g>
                );
              })}

              {/* Layer 4: Confirmation Overlays */}
              {isConfirmationVisible &&
                DEMO_SIGNALS.map((sig, idx) => {
                  const candleIndex = 7;
                  const x = (candleIndex + 1) * stepX;
                  const y = getY(sig.price);

                  return (
                    <g key={idx}>
                      <rect
                        x={x - 48}
                        y={y + 16}
                        width="96"
                        height="22"
                        rx="4"
                        fill="#FFFFFF"
                        stroke="#059669"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                      />
                      <text
                        x={x}
                        y={y + 30}
                        textAnchor="middle"
                        fill="#059669"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        ▲ {sig.label}
                      </text>

                      <line
                        x1={x}
                        y1={getY(sig.invalidation)}
                        x2={chartWidth - 50}
                        y2={getY(sig.invalidation)}
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={chartWidth - 48}
                        y={getY(sig.invalidation) + 4}
                        fill="#DC2626"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        Stop: $66,180
                      </text>
                    </g>
                  );
                })}

              {/* Right Price Scale Axis Divider */}
              <line
                x1={chartWidth - 50}
                y1="0"
                x2={chartWidth - 50}
                y2={chartHeight - 20}
                stroke="rgba(15, 23, 42, 0.08)"
                strokeWidth="1"
              />

              {/* Bottom Time Axis Baseline */}
              <line
                x1="0"
                y1={chartHeight - 20}
                x2={chartWidth - 50}
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
            </svg>

          </div>

          {/* Integrated Multi-Plane Optical Lens HUD Footer */}
          <div className="border-t border-black/[0.07] bg-slate-50/70 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-2 text-left">
              <div className="text-[11px] font-mono text-brand-blue uppercase tracking-wider font-semibold">
                {activeLayer === 'all' ? 'Full System Confluence' : `Layer ${selectedLayerData.number}: ${selectedLayerData.name}`}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
                {activeLayer === 'all' ? 'All analytical layers working in strict alignment.' : selectedLayerData.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeLayer === 'all'
                  ? 'AlgoFinex calculates market geometry, resting liquidity blocks, multi-period trend envelopes, and execution triggers on every bar close.'
                  : selectedLayerData.description}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs text-left">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                  System Role
                </span>
                <span className="text-slate-900 font-medium">
                  {activeLayer === 'all' ? 'Composite trade qualification and execution filtering' : selectedLayerData.role}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
                <span>Non-repainting mathematical model</span>
                <span className="text-brand-blue font-semibold">Deterministic Logic</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndicatorSystemSection;

