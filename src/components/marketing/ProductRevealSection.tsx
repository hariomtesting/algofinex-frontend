import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE_MODES } from '../../data/productExperienceData';
import { BTC_15M_CANDLES, DEMO_ORDER_BLOCKS, DEMO_SIGNALS } from '../../data/mockChartData';
import { ExperienceMode } from '../../types/productExperience';
import { BorderBeam } from '../ui/BorderBeam';
import { 
  Activity, 
  Layers, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

export const ProductRevealSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperienceMode>('STRUCTURE');
  const [activeCandleHover, setActiveCandleHover] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

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

  const getPriceFromY = (y: number) => {
    return maxPrice - (y / chartHeight) * priceRange;
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
    <section id="product-experience" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#080C14] border-t border-white/[0.08]">
      
      {/* Subtle Analytical Atmospheric Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] opacity-60" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] opacity-40" />
        <div className="absolute inset-0 bg-blueprint-grid opacity-25" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Section Header — Poster Staging */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          
          {/* Left Column: Big Editorial Typography */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-4 shadow-xs backdrop-blur-md">
              <Sparkles className="size-3 text-emerald-400 shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-300">PRODUCT INTERFACE &middot; PROGRESSIVE LENSES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-white leading-[1.05]">
              Market structure.<br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Progressively revealed.
              </span>
            </h2>
          </div>

          {/* Right Column: Explanatory Context Positioned Asymmetrically */}
          <div className="lg:col-span-5 text-left lg:text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
              Raw candlesticks conceal institutional order flow. AlgoFinex isolates swing pivots, resting liquidity pools, and dynamic momentum directly on your workstation surface.
            </p>

            {/* Micro Mode Step Indicators */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mr-1">Progression:</span>
              {modesList.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all duration-200 flex items-center gap-1 ${
                    activeMode === m.id
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,240,144,0.3)]'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{idx + 1}</span>
                  <span className="hidden sm:inline">{m.label.split('. ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Workstation Console Bar with 48px Touch Targets */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 px-2">
          {/* Lens Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full sm:w-auto">
            {modesList.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;

              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`px-3.5 sm:px-4 min-h-[48px] rounded-xl font-mono text-xs transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,144,0.35)] border border-emerald-400'
                      : 'bg-[#0D1322] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00F090]" />
              <span className="text-white font-semibold">15m Resolution</span>
            </div>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">Non-repainting geometry</span>
          </div>
        </div>

        {/* DOMINANT UNBOXED WORKSTATION CANVAS */}
        <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0E1A] shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden w-full min-w-0">
          <BorderBeam duration={12} borderWidth={1.5} colorFrom="#00F090" colorTo="#00E5FF" />
          
          {/* Top Hairline Telemetry Ribbon */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#0D1322] px-4 sm:px-8 py-3 gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00F090]" />
              <span className="font-bold text-white tracking-wider">
                BTC/USDT &middot; ANALYTICAL WORKSTATION
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold uppercase shadow-2xs">
                {currentMode.label}
              </span>
            </div>

            <div className="flex items-center gap-6 text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500">Structure: </span>
                <span className="text-emerald-400 font-semibold">Higher-High Sequence</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-500">Trigger: </span>
                <span className="text-slate-300 font-medium">Bar-Close Non-Repaint</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="size-3.5" />
                <span>Synchronized</span>
              </div>
            </div>
          </div>

          {/* Active Candle Hover Inspection HUD Ribbon */}
          <div className="px-4 sm:px-8 py-2 bg-[#070B14] border-b border-white/[0.08] flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono">
            {(() => {
              const c = activeCandleHover !== null ? BTC_15M_CANDLES[activeCandleHover] : BTC_15M_CANDLES[BTC_15M_CANDLES.length - 1];
              return (
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                  <span className="text-slate-400">Time: <span className="text-white font-semibold">{c.time}</span></span>
                  <span className="text-slate-400">Open: <span className="text-white">{c.open.toLocaleString()}</span></span>
                  <span className="text-slate-400">High: <span className="text-emerald-400 font-bold">{c.high.toLocaleString()}</span></span>
                  <span className="text-slate-400">Low: <span className="text-rose-400 font-bold">{c.low.toLocaleString()}</span></span>
                  <span className="text-slate-400">Close: <span className={c.isBullish ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{c.close.toLocaleString()}</span></span>
                  <span className="text-slate-400">Vol: <span className="text-cyan-400 font-semibold">{c.volume.toLocaleString()}</span></span>
                </div>
              );
            })()}
            <div className="text-[10px] text-slate-400 hidden sm:block">
              Hover/Scrub chart to inspect precise coordinates
            </div>
          </div>

          {/* Expanded SVG Chart Stage with Spatial Overlays */}
          <div className="relative p-3 sm:p-6 lg:p-8 flex items-center justify-center overflow-x-auto no-scrollbar min-h-[460px] sm:min-h-[520px] bg-[#060A12]">
            
            {/* Fine Hairline Coordinate Grid */}
            <div className="absolute inset-0 grid grid-rows-6 grid-cols-8 pointer-events-none opacity-20">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border-b border-r border-white/10" />
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

            {/* SVG Chart Drawing with Exact Mathematical Coordinate Pins */}
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto max-w-[980px] overflow-visible select-none relative z-10 cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
            >
              <defs>
                <linearGradient id="cloudRibbonDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00F090" stopOpacity="0.04" />
                </linearGradient>

                <pattern id="demandHatchDark" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.35" />
                </pattern>

                <pattern id="fvgHatchDark" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.35" />
                </pattern>
              </defs>

              {/* 1. LIQUIDITY LAYER OVERLAYS */}
              <AnimatePresence>
              {activeMode === 'LIQUIDITY' && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                          fill={isDemand ? 'url(#demandHatchDark)' : '#FF3B69'}
                          fillOpacity={isDemand ? 1 : 0.12}
                          stroke={isDemand ? '#00E5FF' : '#FF3B69'}
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          rx="4"
                        />
                        <text
                          x={170}
                          y={yTop + 14}
                          fill={isDemand ? '#00E5FF' : '#FF3B69'}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="700"
                        >
                          {ob.label} [Resting Pool]
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
                    fill="url(#fvgHatchDark)"
                    stroke="#A855F7"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    rx="4"
                  />
                  <text
                    x={310}
                    y={getY(67250) + 14}
                    fill="#C084FC"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    Fair Value Gap (FVG) Imbalance
                  </text>
                </motion.g>
              )}
              </AnimatePresence>

              {/* 2. TREND CONTEXT OVERLAYS */}
              {activeMode === 'TREND' && (
                <g className="transition-opacity duration-300">
                  <path
                    d={`M ${ema21Points} L ${chartWidth - 60},${getY(67700)} L ${stepX},${getY(66200)} Z`}
                    fill="url(#cloudRibbonDark)"
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
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    strokeOpacity="0.9"
                  />
                </g>
              )}

              {/* 3. CANDLESTICK SERIES */}
              {BTC_15M_CANDLES.map((c, i) => {
                const x = (i + 1) * stepX;
                const candleWidth = 16;
                const isBull = c.isBullish;
                const color = isBull ? '#00F090' : '#FF3B69';
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const bodyY = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2.5);

                const isHighPivot = i === 4;
                const isLowPivot = i === 6;
                const isBOSCandle = i === 9;

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

                    {/* Structure Overlays on Chart: Precision Architectural Pins */}
                    {activeMode === 'STRUCTURE' && (
                      <>
                        {isHighPivot && (
                          <g>
                            <circle cx={x} cy={yHigh - 6} r="3" fill="#00E5FF" />
                            <line x1={x} y1={yHigh - 16} x2={x} y2={yHigh - 6} stroke="#00E5FF" strokeWidth="1.2" />
                            <rect
                              x={x - 28}
                              y={yHigh - 30}
                              width="56"
                              height="15"
                              rx="3"
                              fill="#0A1322"
                              stroke="#00E5FF"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={yHigh - 19}
                              textAnchor="middle"
                              fill="#00E5FF"
                              fontSize="8.5"
                              fontFamily="monospace"
                              fontWeight="700"
                            >
                              HH 67,400
                            </text>
                          </g>
                        )}
                        {isLowPivot && (
                          <g>
                            <circle cx={x} cy={yLow + 6} r="3" fill="#00F090" />
                            <line x1={x} y1={yLow + 6} x2={x} y2={yLow + 16} stroke="#00F090" strokeWidth="1.2" />
                            <rect
                              x={x - 28}
                              y={yLow + 16}
                              width="56"
                              height="15"
                              rx="3"
                              fill="#0A1322"
                              stroke="#00F090"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={yLow + 27}
                              textAnchor="middle"
                              fill="#00F090"
                              fontSize="8.5"
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
                              x1={x - 110}
                              y1={getY(67400)}
                              x2={x + 60}
                              y2={getY(67400)}
                              stroke="#00E5FF"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                            <rect
                              x={x - 34}
                              y={getY(67400) - 18}
                              width="68"
                              height="15"
                              rx="3"
                              fill="#0A1322"
                              stroke="#00E5FF"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={getY(67400) - 7}
                              textAnchor="middle"
                              fill="#00E5FF"
                              fontSize="8.5"
                              fontFamily="monospace"
                              fontWeight="700"
                            >
                              BOS ▲ 67,400
                            </text>
                          </g>
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
                        x={x - 62}
                        y={y + 16}
                        width="124"
                        height="22"
                        rx="4"
                        fill="#0A1624"
                        stroke="#00F090"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 8px rgba(0,240,144,0.3))"
                      />
                      <text
                        x={x}
                        y={y + 30}
                        textAnchor="middle"
                        fill="#00F090"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        CONFIRMATION BUY ✦
                      </text>

                      {/* Invalidation Level */}
                      <line
                        x1={x}
                        y1={getY(sig.invalidation)}
                        x2={chartWidth - 58}
                        y2={getY(sig.invalidation)}
                        stroke="#FF3B69"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={chartWidth - 52}
                        y={getY(sig.invalidation) + 4}
                        fill="#FF3B69"
                        fontSize="8.5"
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        INVALIDATION — $66,180
                      </text>
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

              {/* Interactive Crosshair & Scrub Marker */}
              {mousePos && activeCandleHover !== null && (
                <g className="pointer-events-none">
                  <line
                    x1={(activeCandleHover + 1) * stepX}
                    y1="0"
                    x2={(activeCandleHover + 1) * stepX}
                    y2={chartHeight - 20}
                    stroke="#00E5FF"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="0"
                    y1={mousePos.y}
                    x2={chartWidth - 58}
                    y2={mousePos.y}
                    stroke="#00E5FF"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
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
                  <circle
                    cx={(activeCandleHover + 1) * stepX}
                    cy={getY(BTC_15M_CANDLES[activeCandleHover].close)}
                    r="4.5"
                    fill="#00F090"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                  />
                </g>
              )}
            </svg>

          </div>

          {/* Bottom Telemetry & Asymmetric Insight Strip */}
          <div className="border-t border-white/[0.08] bg-[#0D1322] p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex flex-col gap-1 max-w-xl text-left">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Active Lens: {currentMode.label}
              </div>
              <div className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                {currentMode.headline}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {currentMode.description}
              </p>
            </div>

            {/* Micro Metrics HUD: Streamlined 2-item summary on mobile <640px, full 4-item grid on >=640px */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {currentMode.activeMetrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0E1528] border border-white/[0.08] shadow-2xs text-left">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">{m.label}</div>
                  <div className={`font-semibold mt-1 truncate ${
                    m.state === 'bull' ? 'text-emerald-400' :
                    m.state === 'accent' ? 'text-cyan-400' :
                    m.state === 'bear' ? 'text-rose-400' : 'text-white'
                  }`}>
                    {m.value}
                  </div>
                </div>
              ))}
              {currentMode.activeMetrics.slice(2, 4).map((m, idx) => (
                <div key={idx + 2} className="hidden sm:block p-3 rounded-xl bg-[#0E1528] border border-white/[0.08] shadow-2xs text-left">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">{m.label}</div>
                  <div className={`font-semibold mt-1 truncate ${
                    m.state === 'bull' ? 'text-emerald-400' :
                    m.state === 'accent' ? 'text-cyan-400' :
                    m.state === 'bear' ? 'text-rose-400' : 'text-white'
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
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            NEXT: SEE HOW ALL 4 LAYERS INTEGRATE AS ONE INSTRUMENT
          </span>
          <a href="#indicator-system" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold">
            <span>Explore The 4-Layer Architecture</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProductRevealSection;

