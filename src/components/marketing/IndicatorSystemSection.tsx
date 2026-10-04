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
    <section id="indicator-system" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#05080E] border-t border-white/[0.06]">
      
      {/* Architectural Blueprint Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[180px] opacity-50" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] opacity-40" />
        {/* Subtle architectural vertical axis ruler */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.02]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-4 shadow-panel">
              <Layers className="size-3 text-brand-accent shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">COORDINATED SYSTEM ARCHITECTURE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-white leading-[1.05]">
              Four analytical layers.<br />
              <span className="bg-gradient-to-r from-white via-text-primary to-brand-accent bg-clip-text text-transparent">
                One unified instrument.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
              Instead of loading disjointed indicators that contradict one another, AlgoFinex operates as a single coordinated instrument. Every layer isolates one structural dimension and validates before execution.
            </p>

            {/* Layer Confluence Principle */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
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
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated/80 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <Sliders className="size-4 shrink-0" />
            <span>Composite All 4 Layers</span>
          </button>

          <button
            onClick={() => setActiveLayer('structure')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'structure'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated/80 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-brand-accent" />
            <span>01. Market Structure</span>
          </button>

          <button
            onClick={() => setActiveLayer('liquidity')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'liquidity'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated/80 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-purple-400" />
            <span>02. Liquidity Pools</span>
          </button>

          <button
            onClick={() => setActiveLayer('trend')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'trend'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated/80 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>03. Trend Cloud</span>
          </button>

          <button
            onClick={() => setActiveLayer('confirmation')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayer === 'confirmation'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated/80 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <span className="size-2 rounded-full bg-amber-400" />
            <span>04. Execution Trigger</span>
          </button>
        </div>

        {/* ONE LARGE CENTRAL TRADING INTERFACE (Spatial system showcase) */}
        <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#070A11] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden w-full min-w-0">
          
          {/* Top Interface Status Strip */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#0A0E18] px-4 sm:px-8 py-3 gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="font-bold text-white tracking-wide">
                ALGOFINEX COMPOSITE INSTRUMENT
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-text-dim uppercase">
                {activeLayer === 'all' ? 'All 4 Strata Active' : `Strata: ${activeLayer.toUpperCase()}`}
              </span>
            </div>

            {/* Active Layers Pill Indicators */}
            <div className="flex items-center gap-2 text-[10px]">
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isStructureVisible ? 'bg-brand-blue/15 text-brand-accent border-brand-blue/30' : 'bg-white/[0.02] text-text-dim border-transparent'
              }`}>
                01. STRUCTURE
              </span>
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isLiquidityVisible ? 'bg-purple-500/15 text-purple-300 border-purple-500/30' : 'bg-white/[0.02] text-text-dim border-transparent'
              }`}>
                02. LIQUIDITY
              </span>
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isTrendVisible ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-white/[0.02] text-text-dim border-transparent'
              }`}>
                03. TREND
              </span>
              <span className={`px-2 py-0.5 rounded border transition-colors ${
                isConfirmationVisible ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-white/[0.02] text-text-dim border-transparent'
              }`}>
                04. CONFIRMATION
              </span>
            </div>
          </div>

          {/* Central Chart Surface */}
          <div className="relative p-4 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[440px] overflow-hidden">
            
            {/* Fine Hairline Blueprint Grid */}
            <div className="absolute inset-0 grid grid-rows-5 grid-cols-8 pointer-events-none opacity-15">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="border-b border-r border-white/[0.08]" />
              ))}
            </div>

            {/* Price Scale Ticks */}
            <div className="absolute right-4 top-6 bottom-6 flex flex-col justify-between text-[10px] font-mono text-text-dim pointer-events-none select-none">
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
                <linearGradient id="instrumentCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </linearGradient>

                <pattern id="obHatch3" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.25" />
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
                          fill={isDemand ? 'url(#obHatch3)' : '#EF4444'}
                          fillOpacity={isDemand ? 1 : 0.08}
                          stroke={isDemand ? '#3B82F6' : '#EF4444'}
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          rx="3"
                        />
                        <text
                          x={150}
                          y={yTop + 14}
                          fill={isDemand ? '#60A5FA' : '#FCA5A5'}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="700"
                        >
                          {ob.label} [Institutional Liquidity Zone]
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
                    fill="url(#instrumentCloud)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    strokeOpacity="0.8"
                  />
                </g>
              )}

              {/* Candlesticks */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const candleWidth = 15;
                const isBull = c.isBullish;
                const color = isBull ? '#10B981' : '#EF4444';
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
                      fillOpacity={isBull ? 0.9 : 0.8}
                      stroke={color}
                      strokeWidth={isBull ? '1.2' : '1'}
                    />

                    {/* Layer 1: Structure Overlays */}
                    {isStructureVisible && (
                      <>
                        {isHighPivot && (
                          <g>
                            <circle cx={x} cy={yHigh - 8} r="3" fill="#60A5FA" />
                            <text x={x} y={yHigh - 14} textAnchor="middle" fill="#93C5FD" fontSize="8.5" fontFamily="monospace" fontWeight="700">
                              HH
                            </text>
                          </g>
                        )}
                        {isLowPivot && (
                          <g>
                            <circle cx={x} cy={yLow + 8} r="3" fill="#10B981" />
                            <text x={x} y={yLow + 18} textAnchor="middle" fill="#6EE7B7" fontSize="8.5" fontFamily="monospace" fontWeight="700">
                              HL
                            </text>
                          </g>
                        )}
                        {isBOSCandle && (
                          <line
                            x1={x - 80}
                            y1={getY(67400)}
                            x2={x + 80}
                            y2={getY(67400)}
                            stroke="#3B82F6"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
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
                        fill="#0E1726"
                        stroke="#10B981"
                        strokeWidth="1.5"
                      />
                      <text
                        x={x}
                        y={y + 30}
                        textAnchor="middle"
                        fill="#34D399"
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
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={chartWidth - 48}
                        y={getY(sig.invalidation) + 4}
                        fill="#EF4444"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        Stop: $66,180
                      </text>
                    </g>
                  );
                })}
            </svg>

          </div>

          {/* Integrated Multi-Plane Optical Lens HUD Footer */}
          <div className="border-t border-white/[0.08] bg-[#090C16] p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-2 text-left">
              <div className="text-[11px] font-mono text-brand-accent uppercase tracking-wider font-semibold">
                {activeLayer === 'all' ? 'FULL SYSTEM CONFLUENCE' : `LAYER ${selectedLayerData.number}: ${selectedLayerData.name.toUpperCase()}`}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {activeLayer === 'all' ? 'All analytical layers working in strict alignment.' : selectedLayerData.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {activeLayer === 'all'
                  ? 'AlgoFinex calculates market geometry, resting liquidity blocks, multi-period trend envelopes, and execution triggers on every bar close.'
                  : selectedLayerData.description}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <div className="p-3.5 rounded-xl bg-surface-elevated/70 border border-white/[0.06] text-xs font-mono text-left">
                <span className="text-[10px] text-text-dim uppercase tracking-wider block mb-1">
                  System Role
                </span>
                <span className="text-white font-medium">
                  {activeLayer === 'all' ? 'Composite trade qualification and execution filtering' : selectedLayerData.role}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted px-1">
                <span>Non-repainting mathematical model</span>
                <span className="text-brand-accent font-semibold">Deterministic Logic</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndicatorSystemSection;
