import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_MODES } from '../../data/productExperienceData';
import { BTC_15M_CANDLES, DEMO_ORDER_BLOCKS, DEMO_SIGNALS } from '../../data/mockChartData';
import { ExperienceMode } from '../../types/productExperience';
import { 
  Layers, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Filter,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const ProductRevealSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperienceMode>('STRUCTURE');
  const [filterNoise, setFilterNoise] = useState(true);

  const currentMode = EXPERIENCE_MODES[activeMode];

  // SVG Chart Geometry
  const chartWidth = 780;
  const chartHeight = 380;
  const minPrice = 65800;
  const maxPrice = 68600;
  const priceRange = maxPrice - minPrice;
  const candleCount = BTC_15M_CANDLES.length;
  const stepX = chartWidth / (candleCount + 1);

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  // EMA Ribbon Points for Trend Mode
  const ema21Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.998 - (c.isBullish ? 50 : 20);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  const ema55Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.993 - (i < 6 ? 110 : 170);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  return (
    <section id="product-experience" className="relative py-28 sm:py-36 overflow-hidden bg-[#06090E] border-t border-white/[0.06]">
      
      {/* Ambient Lighting Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 w-full min-w-0">
        
        {/* Section Narrative Header - Editorial Pacing */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-4">
            <Sparkles className="size-3 text-brand-accent shrink-0" />
            <span>THE ALGOFINEX LENS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mb-4">
            Your chart should show more than price.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Raw candlesticks show where transactions happened. AlgoFinex reveals why price moved, where resting liquidity sits, and how market structure guides the next setup.
          </p>
        </div>

        {/* Integrated Product Console Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveMode('STRUCTURE')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
                activeMode === 'STRUCTURE'
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                  : 'bg-surface-elevated/90 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              <Layers className="size-4 shrink-0" />
              <span>01. Market Structure</span>
            </button>

            <button
              onClick={() => setActiveMode('LIQUIDITY')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
                activeMode === 'LIQUIDITY'
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                  : 'bg-surface-elevated/90 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              <Compass className="size-4 shrink-0" />
              <span>02. Liquidity</span>
            </button>

            <button
              onClick={() => setActiveMode('TREND')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
                activeMode === 'TREND'
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                  : 'bg-surface-elevated/90 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              <TrendingUp className="size-4 shrink-0" />
              <span>03. Trend Context</span>
            </button>

            <button
              onClick={() => setActiveMode('CONFIRMATION')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
                activeMode === 'CONFIRMATION'
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                  : 'bg-surface-elevated/90 text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              <CheckCircle2 className="size-4 shrink-0" />
              <span>04. Confirmation</span>
            </button>
          </div>

          {/* Noise Filter Toggle */}
          <button
            onClick={() => setFilterNoise(!filterNoise)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all shrink-0 self-start md:self-auto border ${
              filterNoise 
                ? 'bg-brand-blue/15 text-brand-accent border-brand-blue/40 shadow-glow-blue/50' 
                : 'bg-surface-elevated text-text-muted border-white/[0.08] hover:text-white'
            }`}
          >
            <Filter className={`size-3.5 ${filterNoise ? 'text-brand-accent' : 'text-text-muted'}`} />
            <span>Noise Filter: <strong className="font-semibold">{filterNoise ? 'Active' : 'Bypassed'}</strong></span>
          </button>
        </div>

        {/* Dominant Chart Workstation & Integrated Side Inspector */}
        <div className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0E15] shadow-terminal overflow-hidden grid grid-cols-1 xl:grid-cols-12 w-full min-w-0">
          
          {/* Main Chart Canvas (8 cols on xl) */}
          <div className="xl:col-span-8 flex flex-col justify-between border-b xl:border-b-0 xl:border-r border-white/[0.08] relative min-h-[480px] sm:min-h-[520px]">
            
            {/* Chart Top Header Strip */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#0C1119] px-4 sm:px-6 py-3 gap-3">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  BTC/USD • 15M • {currentMode.label.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-text-muted border border-white/[0.06] hidden sm:inline">
                  Interactive Product View
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="text-text-dim">Bias:</span>
                  <span className="text-signal-bull font-bold">Bullish Order Flow</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-text-dim">Trigger:</span>
                  <span className="text-white">Bar-Close Only</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Chart Stage */}
            <div className="relative flex-1 p-4 sm:p-6 flex items-center justify-center overflow-x-auto no-scrollbar">
              
              {/* Background Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-5 grid-cols-6 pointer-events-none opacity-20">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="border-b border-r border-white/[0.05]" />
                ))}
              </div>

              {/* Price Scale Y Axis */}
              <div className="absolute right-4 top-6 bottom-6 flex flex-col justify-between text-[10px] font-mono text-text-dim pointer-events-none select-none">
                <span>$68,500</span>
                <span>$67,800</span>
                <span>$67,100</span>
                <span>$66,400</span>
                <span>$65,800</span>
              </div>

              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-auto max-w-[780px] overflow-visible relative z-10 select-none"
              >
                <defs>
                  {/* Trend Cloud Gradient */}
                  <linearGradient id="trendRibbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>

                  {/* Demand Box Pattern */}
                  <pattern id="demandHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.25" />
                  </pattern>

                  {/* FVG Box Pattern */}
                  <pattern id="fvgHatch" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
                  </pattern>
                </defs>

                {/* 1. LIQUIDITY LAYER OVERLAYS */}
                {(activeMode === 'LIQUIDITY' || (filterNoise && activeMode !== 'TREND')) && (
                  <g className="transition-opacity duration-300">
                    {DEMO_ORDER_BLOCKS.map((ob, idx) => {
                      const yTop = getY(ob.topPrice);
                      const yBottom = getY(ob.bottomPrice);
                      const rectHeight = Math.abs(yBottom - yTop);
                      const isDemand = ob.type === 'BULLISH_OB';

                      return (
                        <g key={idx}>
                          <rect
                            x={120}
                            y={yTop}
                            width={chartWidth - 180}
                            height={rectHeight}
                            fill={isDemand ? 'url(#demandHatch)' : '#EF4444'}
                            fillOpacity={isDemand ? 1 : 0.08}
                            stroke={isDemand ? '#3B82F6' : '#EF4444'}
                            strokeWidth="1.2"
                            strokeDasharray="4 3"
                            rx="3"
                          />
                          <text
                            x={128}
                            y={yTop + 14}
                            fill={isDemand ? '#60A5FA' : '#FCA5A5'}
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="600"
                          >
                            {ob.label} [15m]
                          </text>
                        </g>
                      );
                    })}

                    {/* Fair Value Gap (FVG) */}
                    {activeMode === 'LIQUIDITY' && (
                      <g>
                        <rect
                          x={260}
                          y={getY(67250)}
                          width={240}
                          height={Math.abs(getY(66850) - getY(67250))}
                          fill="url(#fvgHatch)"
                          stroke="#8B5CF6"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          rx="3"
                        />
                        <text
                          x={268}
                          y={getY(67250) + 14}
                          fill="#C4B5FD"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="600"
                        >
                          FVG Imbalance Zone (Mitigated)
                        </text>

                        {/* Sell-side sweep arrow indicator */}
                        <path
                          d={`M ${stepX * 6} ${getY(66000) + 12} L ${stepX * 6} ${getY(66000) - 8}`}
                          stroke="#F59E0B"
                          strokeWidth="2"
                          markerEnd="url(#arrow)"
                        />
                        <text
                          x={stepX * 6 - 36}
                          y={getY(66000) + 26}
                          fill="#FBBF24"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="700"
                        >
                          Sell-Side Sweep
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* 2. TREND CONTEXT OVERLAYS */}
                {activeMode === 'TREND' && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={`M ${ema21Points} L ${chartWidth - 50},${getY(67700)} L ${stepX},${getY(66200)} Z`}
                      fill="url(#trendRibbonGrad)"
                    />
                    <path
                      d={`M ${ema21Points}`}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d={`M ${ema55Points}`}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      strokeOpacity="0.8"
                    />
                    <text
                      x={chartWidth - 110}
                      y={getY(67950)}
                      fill="#60A5FA"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      21 EMA Cloud
                    </text>
                    <text
                      x={chartWidth - 110}
                      y={getY(67500)}
                      fill="#34D399"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      55 Baseline
                    </text>
                  </g>
                )}

                {/* 3. CANDLESTICK SERIES */}
                {BTC_15M_CANDLES.map((c, i) => {
                  const x = (i + 1) * stepX;
                  const candleWidth = 14;
                  const isBull = c.isBullish;
                  const color = isBull ? '#10B981' : '#EF4444';
                  const yHigh = getY(c.high);
                  const yLow = getY(c.low);
                  const yOpen = getY(c.open);
                  const yClose = getY(c.close);
                  const bodyY = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);

                  // Structure markers
                  const isHighPivot = i === 4;
                  const isLowPivot = i === 6;
                  const isBOSCandle = i === 9;

                  return (
                    <g key={c.time + i}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.5"
                        strokeOpacity={filterNoise ? 0.9 : 0.4}
                      />

                      {/* Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={bodyY}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={color}
                        rx="2"
                        fillOpacity={filterNoise ? (isBull ? 0.85 : 0.75) : 0.3}
                        stroke={color}
                        strokeWidth={isBull ? '1.2' : '1'}
                      />

                      {/* Market Structure Overlays */}
                      {activeMode === 'STRUCTURE' && (
                        <>
                          {isHighPivot && (
                            <g>
                              <circle cx={x} cy={yHigh - 10} r="3" fill="#60A5FA" />
                              <text
                                x={x}
                                y={yHigh - 16}
                                textAnchor="middle"
                                fill="#93C5FD"
                                fontSize="9"
                                fontWeight="700"
                                fontFamily="monospace"
                              >
                                HH (67,400)
                              </text>
                            </g>
                          )}

                          {isLowPivot && (
                            <g>
                              <circle cx={x} cy={yLow + 10} r="3" fill="#10B981" />
                              <text
                                x={x}
                                y={yLow + 20}
                                textAnchor="middle"
                                fill="#6EE7B7"
                                fontSize="9"
                                fontWeight="700"
                                fontFamily="monospace"
                              >
                                HL (66,100)
                              </text>
                            </g>
                          )}

                          {isBOSCandle && (
                            <g>
                              <line
                                x1={x - 80}
                                y1={getY(67400)}
                                x2={x + 80}
                                y2={getY(67400)}
                                stroke="#3B82F6"
                                strokeWidth="1.5"
                                strokeDasharray="4 2"
                              />
                              <rect
                                x={x - 22}
                                y={getY(67400) - 9}
                                width="44"
                                height="16"
                                rx="3"
                                fill="#1E3A8A"
                                stroke="#3B82F6"
                                strokeWidth="1"
                              />
                              <text
                                x={x}
                                y={getY(67400) + 2}
                                textAnchor="middle"
                                fill="#FFFFFF"
                                fontSize="9"
                                fontWeight="800"
                                fontFamily="monospace"
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

                {/* 4. SIGNAL CONFIRMATION & INVALIDATION OVERLAY */}
                {activeMode === 'CONFIRMATION' &&
                  DEMO_SIGNALS.map((sig, idx) => {
                    const candleIndex = 7;
                    const x = (candleIndex + 1) * stepX;
                    const y = getY(sig.price);

                    return (
                      <g key={idx}>
                        {/* Signal Trigger Marker */}
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
                          ▲ {sig.label} (Bar-Close)
                        </text>

                        {/* Invalidation Hard Line */}
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

            {/* Bottom Console Telemetry Bar */}
            <div className="border-t border-white/[0.08] bg-[#0C1119] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-text-muted">Observation:</span>
                <span className="text-white font-semibold">{currentMode.tagline}</span>
              </div>
              <div className="flex items-center gap-2 text-text-dim text-[11px]">
                <SlidersHorizontal className="size-3 text-brand-blue" />
                <span>Deterministic Bar-Close Logic</span>
              </div>
            </div>
          </div>

          {/* Integrated Side Inspector Panel (4 cols on xl) */}
          <div className="xl:col-span-4 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-[#080B10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Mode Title & Principle */}
                <div>
                  <div className="text-xs font-mono text-brand-accent uppercase tracking-wider font-semibold mb-2">
                    {currentMode.label} Architecture
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-snug">
                    {currentMode.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-3">
                    {currentMode.description}
                  </p>
                </div>

                {/* What The Indicator Isolates */}
                <div className="p-4 rounded-xl bg-surface/70 border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2.5">
                    What AlgoFinex Maps:
                  </div>
                  <ul className="flex flex-col gap-2">
                    {currentMode.whatYouSee.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-text-primary leading-normal">
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Lens Metrics HUD */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {currentMode.activeMetrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-elevated/60 border border-white/[0.06]">
                      <div className="text-[10px] text-text-dim uppercase">{m.label}</div>
                      <div className={`font-semibold mt-1 truncate ${
                        m.state === 'bull' ? 'text-signal-bull' :
                        m.state === 'accent' ? 'text-brand-accent' :
                        m.state === 'bear' ? 'text-signal-bear' : 'text-text-primary'
                      }`}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Seamless Transition Link into the Indicator System */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-text-muted">
              <span>Explore The System</span>
              <a href="#indicator-system" className="text-brand-accent hover:underline flex items-center gap-1 font-semibold">
                <span>View All 4 Layers</span>
                <ChevronRight className="size-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductRevealSection;
