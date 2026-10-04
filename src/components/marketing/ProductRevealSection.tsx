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
  ArrowRight,
  ShieldCheck,
  Activity,
  Crosshair
} from 'lucide-react';

export const ProductRevealSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperienceMode>('STRUCTURE');

  const currentMode = EXPERIENCE_MODES[activeMode] || EXPERIENCE_MODES.STRUCTURE;

  // Chart coordinate geometry (Expanded wide-canvas workstation)
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

  // EMA Ribbon points for Trend mode
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

  const modesList: { id: ExperienceMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'RAW', label: '01. Raw Price', icon: Activity },
    { id: 'STRUCTURE', label: '02. Market Structure', icon: Layers },
    { id: 'LIQUIDITY', label: '03. Liquidity', icon: Compass },
    { id: 'TREND', label: '04. Trend Context', icon: TrendingUp },
    { id: 'CONFIRMATION', label: '05. Decision Frame', icon: CheckCircle2 },
  ];

  return (
    <section id="product-experience" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#F4F6F9] border-t border-black/[0.06]">
      
      {/* Subtle Analytical Atmospheric Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-blue-100/35 rounded-full blur-[160px] opacity-70" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[140px] opacity-50" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Section Header — Poster Staging */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          
          {/* Left Column: Big Editorial Typography */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-slate-700 mb-4 shadow-xs">
              <Sparkles className="size-3 text-brand-blue shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-600">THE PROGRESSIVE CLARITY SEQUENCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.05]">
              Market structure.<br />
              <span className="text-brand-blue">
                Progressively revealed.
              </span>
            </h2>
          </div>

          {/* Right Column: Explanatory Context Positioned Asymmetrically */}
          <div className="lg:col-span-5 text-left lg:text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Raw candlesticks reveal where transactions occurred. AlgoFinex isolates swing pivots, resting liquidity pools, and dynamic momentum directly on your workstation surface.
            </p>

            {/* Micro Mode Step Indicators */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-1">Progression:</span>
              {modesList.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all duration-200 flex items-center gap-1 ${
                    activeMode === m.id
                      ? 'bg-brand-blue text-white shadow-xs font-semibold'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08]'
                  }`}
                >
                  <span>{idx + 1}</span>
                  <span className="hidden sm:inline">{m.label.split('. ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Workstation Console Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 px-2">
          {/* Lens Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {modesList.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;

              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm border border-brand-blue font-semibold'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-black/[0.08] hover:border-black/[0.18]'
                  }`}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-signal-bull animate-ping" />
              <span className="text-slate-900 font-semibold">15m Resolution</span>
            </div>
            <span className="text-slate-300">•</span>
            <span>Non-repainting geometry</span>
          </div>
        </div>

        {/* DOMINANT UNBOXED WORKSTATION CANVAS (Pure White Precision Surface) */}
        <div className="relative rounded-2xl md:rounded-3xl border border-black/[0.09] bg-white shadow-workstation overflow-hidden w-full min-w-0">
          
          {/* Top Hairline Telemetry Ribbon */}
          <div className="flex flex-wrap items-center justify-between border-b border-black/[0.07] bg-slate-50/80 px-4 sm:px-8 py-3 gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="font-bold text-slate-900 tracking-wider">
                BTC/USDT • ANALYTICAL WORKSTATION
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-brand-blue border border-black/[0.08] font-semibold uppercase shadow-2xs">
                {currentMode.label}
              </span>
            </div>

            <div className="flex items-center gap-6 text-[11px] text-slate-500">
              <div>
                <span className="text-slate-400">Structure: </span>
                <span className="text-signal-bull font-semibold">Higher-High Sequence</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-400">Trigger: </span>
                <span className="text-slate-800 font-medium">Bar-Close Non-Repaint</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="size-3.5" />
                <span>Synchronized</span>
              </div>
            </div>
          </div>

          {/* Expanded SVG Chart Stage with Spatial Overlays */}
          <div className="relative p-3 sm:p-6 lg:p-8 flex items-center justify-center overflow-x-auto no-scrollbar min-h-[460px] sm:min-h-[520px] bg-white">
            
            {/* Fine Hairline Coordinate Grid */}
            <div className="absolute inset-0 grid grid-rows-6 grid-cols-8 pointer-events-none opacity-40">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border-b border-r border-black/[0.04]" />
              ))}
            </div>

            {/* Price Scale Y-Axis Ticks */}
            <div className="absolute right-4 top-8 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-400 pointer-events-none select-none z-20">
              <span>$68,600</span>
              <span>$68,000</span>
              <span>$67,400</span>
              <span>$66,800</span>
              <span>$66,200</span>
              <span>$65,800</span>
            </div>

            {/* Floating Spatial Annotation HUD Badges (Positioned over key coordinates) */}
            <AnimatePresence>
              {activeMode === 'STRUCTURE' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute inset-0 z-30"
                >
                  {/* High Pivot Callout */}
                  <div className="absolute top-[22%] left-[28%] -translate-x-1/2 p-2 rounded-lg bg-white/95 border border-blue-200 shadow-md text-[11px] font-mono flex items-center gap-1.5 text-slate-800">
                    <span className="size-1.5 rounded-full bg-brand-blue animate-ping" />
                    <span className="text-brand-blue font-bold">HH:</span>
                    <span>$67,400 Validated</span>
                  </div>

                  {/* Low Pivot Callout */}
                  <div className="absolute bottom-[28%] left-[38%] -translate-x-1/2 p-2 rounded-lg bg-white/95 border border-emerald-300 shadow-md text-[11px] font-mono flex items-center gap-1.5 text-slate-800">
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                    <span className="text-emerald-700 font-bold">HL:</span>
                    <span>$66,100 Structural Support</span>
                  </div>

                  {/* BOS Callout */}
                  <div className="absolute top-[22%] left-[58%] -translate-x-1/2 p-2 rounded-lg bg-white border border-brand-blue shadow-md text-[11px] font-mono flex items-center gap-1.5 text-slate-900">
                    <Crosshair className="size-3 text-brand-blue" />
                    <span className="font-extrabold text-brand-blue">BOS ▲</span>
                    <span className="text-slate-500 text-[10px]">Break of Structure</span>
                  </div>
                </motion.div>
              )}

              {activeMode === 'LIQUIDITY' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute inset-0 z-30"
                >
                  <div className="absolute bottom-[20%] left-[36%] -translate-x-1/2 p-2.5 rounded-xl bg-white border border-purple-300 shadow-md text-[11px] font-mono flex items-center gap-2 text-slate-900">
                    <span className="size-2 rounded-full bg-purple-600 animate-pulse" />
                    <span className="text-purple-700 font-bold">Sell-Side Swept &amp; Reclaimed</span>
                  </div>

                  <div className="absolute top-[32%] right-[22%] p-2 rounded-lg bg-white border border-black/[0.1] shadow-sm text-[10px] font-mono text-slate-600">
                    <span>Unmitigated Resting Pool: </span>
                    <strong className="text-slate-900">$68,200</strong>
                  </div>
                </motion.div>
              )}

              {activeMode === 'CONFIRMATION' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute inset-0 z-30"
                >
                  <div className="absolute bottom-[35%] left-[54%] p-2.5 rounded-xl bg-white border border-emerald-400 shadow-md text-xs font-mono flex items-center gap-2 text-slate-900">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Bar-Close Trigger Confirmed</span>
                    <span className="text-slate-500 text-[10px]">| Stop: $66,180</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG Chart Drawing */}
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto max-w-[980px] overflow-visible select-none relative z-10"
            >
              <defs>
                <linearGradient id="cloudRibbonLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.04" />
                </linearGradient>

                <pattern id="demandHatchLight" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.25" />
                </pattern>

                <pattern id="fvgHatchLight" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.25" />
                </pattern>
              </defs>

              {/* 1. LIQUIDITY LAYER OVERLAYS */}
              {activeMode === 'LIQUIDITY' && (
                <g className="transition-opacity duration-300">
                  {DEMO_ORDER_BLOCKS.map((ob, idx) => {
                    const yTop = getY(ob.topPrice);
                    const yBottom = getY(ob.bottomPrice);
                    const rectHeight = Math.abs(yBottom - yTop);
                    const isDemand = ob.type === 'BULLISH_OB';

                    return (
                      <g key={idx}>
                        <rect
                          x={160}
                          y={yTop}
                          width={chartWidth - 240}
                          height={rectHeight}
                          fill={isDemand ? 'url(#demandHatchLight)' : '#FEE2E2'}
                          fillOpacity={isDemand ? 1 : 0.6}
                          stroke={isDemand ? '#2563EB' : '#DC2626'}
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          rx="4"
                        />
                        <text
                          x={170}
                          y={yTop + 14}
                          fill={isDemand ? '#1D4ED8' : '#B91C1C'}
                          fontSize="9.5"
                          fontFamily="monospace"
                          fontWeight="700"
                        >
                          {ob.label} [Institutional Liquidity Anchor]
                        </text>
                      </g>
                    );
                  })}

                  {/* FVG Imbalance Box */}
                  <rect
                    x={300}
                    y={getY(67250)}
                    width={320}
                    height={Math.abs(getY(66850) - getY(67250))}
                    fill="url(#fvgHatchLight)"
                    stroke="#7C3AED"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    rx="4"
                  />
                  <text
                    x={310}
                    y={getY(67250) + 14}
                    fill="#6D28D9"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    Fair Value Gap (FVG) Imbalance Zone
                  </text>
                </g>
              )}

              {/* 2. TREND CONTEXT OVERLAYS */}
              {activeMode === 'TREND' && (
                <g className="transition-opacity duration-300">
                  <path
                    d={`M ${ema21Points} L ${chartWidth - 60},${getY(67700)} L ${stepX},${getY(66200)} Z`}
                    fill="url(#cloudRibbonLight)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.5"
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

              {/* 3. CANDLESTICK SERIES */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const candleWidth = 16;
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

                // In RAW mode, make candles slightly dimmer to emphasize raw noise
                const opacity = activeMode === 'RAW' ? 0.65 : 1.0;

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
                      strokeOpacity={opacity}
                    />

                    {/* Body */}
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

                    {/* Structure Overlays on Chart */}
                    {activeMode === 'STRUCTURE' && (
                      <>
                        {isHighPivot && (
                          <g>
                            <circle cx={x} cy={yHigh - 8} r="3" fill="#2563EB" />
                            <line x1={x} y1={yHigh - 16} x2={x} y2={yHigh - 6} stroke="#2563EB" strokeWidth="1.5" />
                          </g>
                        )}
                        {isLowPivot && (
                          <g>
                            <circle cx={x} cy={yLow + 8} r="3" fill="#059669" />
                            <line x1={x} y1={yLow + 6} x2={x} y2={yLow + 16} stroke="#059669" strokeWidth="1.5" />
                          </g>
                        )}
                        {isBOSCandle && (
                          <line
                            x1={x - 90}
                            y1={getY(67400)}
                            x2={x + 90}
                            y2={getY(67400)}
                            stroke="#2563EB"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                        )}
                      </>
                    )}
                  </g>
                );
              })}

              {/* 4. SIGNAL CONFIRMATION OVERLAYS */}
              {activeMode === 'CONFIRMATION' &&
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
                        height="24"
                        rx="4"
                        fill="#FFFFFF"
                        stroke="#059669"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                      />
                      <text
                        x={x}
                        y={y + 32}
                        textAnchor="middle"
                        fill="#059669"
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        ▲ {sig.label}
                      </text>

                      {/* Hard Stop Line */}
                      <line
                        x1={x}
                        y1={getY(sig.invalidation)}
                        x2={chartWidth - 40}
                        y2={getY(sig.invalidation)}
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={chartWidth - 36}
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
            </svg>

          </div>

          {/* Bottom Telemetry & Asymmetric Insight Strip */}
          <div className="border-t border-black/[0.07] bg-slate-50/70 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex flex-col gap-1 max-w-xl text-left">
              <div className="text-[11px] font-mono text-brand-blue uppercase tracking-wider font-semibold">
                ACTIVE COGNITIVE LENS: {currentMode.label}
              </div>
              <div className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight">
                {currentMode.headline}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentMode.description}
              </p>
            </div>

            {/* Micro Metrics HUD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {currentMode.activeMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-black/[0.06] shadow-2xs text-left">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider truncate">{m.label}</div>
                  <div className={`font-semibold mt-1 truncate ${
                    m.state === 'bull' ? 'text-signal-bull' :
                    m.state === 'accent' ? 'text-brand-blue' :
                    m.state === 'bear' ? 'text-signal-bear' : 'text-slate-900'
                  }`}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Transition cue into the Layered System */}
        <div className="mt-12 text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            NEXT: SEE HOW ALL 4 LAYERS INTEGRATE AS ONE INSTRUMENT
          </span>
          <a href="#indicator-system" className="text-brand-blue hover:text-blue-800 transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold">
            <span>Explore The 4-Layer Architecture</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProductRevealSection;

