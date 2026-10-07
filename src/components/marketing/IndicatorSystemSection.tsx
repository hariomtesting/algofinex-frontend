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
    <section id="methodology" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#080C14] border-t border-white/[0.08] bg-blueprint-grid">
      
      {/* Anchor for alternate nav link */}
      <span id="indicator-system" className="absolute -top-20" />

      {/* Architectural Blueprint Ambience */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[180px] opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] opacity-50" />
        {/* Subtle architectural vertical axis ruler */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.03]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full min-w-0">
        
        {/* Asymmetric Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-4 shadow-xs backdrop-blur-md">
              <Layers className="size-3 text-emerald-400 shrink-0" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-semibold text-slate-300">
                ANALYTICAL SYSTEM &middot; HOW INFORMATION IS ORGANIZED
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.035em] text-white leading-[1.05]">
              Four analytical layers.<br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                One unified visual method.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 text-left flex flex-col justify-end">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
              Instead of loading disjointed indicators that contradict one another, the AlgoFinex method operates as a single coordinated system. Four spatial concepts intersect on one chart: Structure establishes boundaries, Liquidity reveals resting orders, Trend measures momentum, and Confirmation locks execution.
            </p>

            {/* Layer Confluence Principle */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>Confluence Rule: Trigger locks only when active layers agree</span>
            </div>
          </div>

        </div>

        {/* Optical Layer Selector Strips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 w-full">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeLayer === 'all'
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,144,0.35)] font-bold'
                : 'bg-[#0D1322] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Sliders className="size-4 shrink-0" />
            <span>Composite All 4 Layers</span>
          </button>

          <button
            onClick={() => setActiveLayer('structure')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeLayer === 'structure'
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,144,0.35)] font-bold'
                : 'bg-[#0D1322] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
            <span>01. Market Structure</span>
          </button>

          <button
            onClick={() => setActiveLayer('liquidity')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeLayer === 'liquidity'
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,144,0.35)] font-bold'
                : 'bg-[#0D1322] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <span className="size-2 rounded-full bg-purple-400 shadow-[0_0_6px_#A855F7]" />
            <span>02. Liquidity Pools</span>
          </button>

          <button
            onClick={() => setActiveLayer('trend')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeLayer === 'trend'
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,144,0.35)] font-bold'
                : 'bg-[#0D1322] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#00F090]" />
            <span>03. Trend Cloud</span>
          </button>

          <button
            onClick={() => setActiveLayer('confirmation')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              activeLayer === 'confirmation'
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,144,0.35)] font-bold'
                : 'bg-[#0D1322] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <span className="size-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
            <span>04. Execution Trigger</span>
          </button>
        </div>

        {/* Spatial Architecture Framing: 4 Analytical Dimensions surrounding the Instrument */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className={`p-4 rounded-xl border transition-all duration-150 text-left ${
            isStructureVisible ? 'bg-[#0E1528] border-cyan-500/40 shadow-xs' : 'bg-white/[0.02] border-white/5 opacity-50'
          }`}>
            <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-0.5">DIMENSION 01</span>
            <div className="font-display font-bold text-white text-sm">Market Structure</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Swing Pivots &amp; Breaks</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-150 text-left ${
            isLiquidityVisible ? 'bg-[#0E1528] border-purple-500/40 shadow-xs' : 'bg-white/[0.02] border-white/5 opacity-50'
          }`}>
            <span className="text-[10px] font-mono font-bold text-purple-400 block mb-0.5">DIMENSION 02</span>
            <div className="font-display font-bold text-white text-sm">Liquidity Pools</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Resting Orders &amp; Imbalance</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-150 text-left ${
            isTrendVisible ? 'bg-[#0E1528] border-emerald-500/40 shadow-xs' : 'bg-white/[0.02] border-white/5 opacity-50'
          }`}>
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-0.5">DIMENSION 03</span>
            <div className="font-display font-bold text-white text-sm">Trend Corridor</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Multi-Period Dynamic Ribbon</div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-150 text-left ${
            isConfirmationVisible ? 'bg-[#0E1528] border-amber-500/40 shadow-xs' : 'bg-white/[0.02] border-white/5 opacity-50'
          }`}>
            <span className="text-[10px] font-mono font-bold text-amber-400 block mb-0.5">DIMENSION 04</span>
            <div className="font-display font-bold text-white text-sm">Execution Trigger</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Bar-Close Non-Repainting Lock</div>
          </div>
        </div>

        {/* ONE LARGE CENTRAL TRADING INTERFACE (Unboxed Analytical Canvas) */}
        <div className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-[#060A12] shadow-2xl overflow-hidden w-full min-w-0">
          
          {/* Top Interface Status Strip */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0A0E1A]/90 px-4 sm:px-8 py-3.5 gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#00F090] animate-pulse shadow-[0_0_8px_#00F090]" />
              <span className="font-bold text-white tracking-wide">
                AlgoFinex Integrated Analytical Instrument
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 uppercase font-mono font-semibold">
                {activeLayer === 'all' ? '4 Dimensions Synchronized' : `Viewing: ${activeLayer}`}
              </span>
            </div>

            {/* Quick status */}
            <div className="text-[11px] text-slate-400 font-mono hidden sm:inline flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-cyan-400"></span>
              Pine Script v4.2 • Deterministic Real-Time Engine
            </div>
          </div>

          {/* Central Chart Surface */}
          <div className="relative p-4 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[440px] overflow-hidden bg-[#060A12]">
            
            {/* Fine Hairline Blueprint Grid */}
            <div className="absolute inset-0 grid grid-rows-5 grid-cols-8 pointer-events-none opacity-25">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="border-b border-r border-cyan-500/10" />
              ))}
            </div>

            {/* Price Scale Ticks */}
            <div className="absolute right-4 top-6 bottom-6 flex flex-col justify-between text-[10px] font-mono text-slate-500 pointer-events-none select-none">
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
                <linearGradient id="instrumentCloudDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#00F090" stopOpacity="0.04" />
                </linearGradient>

                <pattern id="obHatchDark2" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.3" />
                </pattern>
                <pattern id="obHatchBearDark2" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#FF3B69" strokeWidth="1" strokeOpacity="0.3" />
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
                          fill={isDemand ? 'url(#obHatchDark2)' : 'url(#obHatchBearDark2)'}
                          fillOpacity={1}
                          stroke={isDemand ? '#00E5FF' : '#FF3B69'}
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          rx="4"
                        />
                        <text
                          x={150}
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
                </g>
              )}

              {/* Layer 3: Trend Overlays */}
              {isTrendVisible && (
                <g className="transition-opacity duration-300">
                  <path
                    d={`M ${ema21Points} L ${chartWidth - 50},${getY(67700)} L ${stepX},${getY(66200)} Z`}
                    fill="url(#instrumentCloudDark)"
                  />
                  <path
                    d={`M ${ema21Points}`}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))"
                  />
                  <path
                    d={`M ${ema55Points}`}
                    fill="none"
                    stroke="#00F090"
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
                      filter={isBull ? 'drop-shadow(0 0 3px rgba(0,240,144,0.3))' : 'drop-shadow(0 0 3px rgba(255,59,105,0.3))'}
                    />

                    {/* Layer 1: Structure Overlays - Precision Pins */}
                    {isStructureVisible && (
                      <>
                        {isHighPivot && (
                          <g>
                            <circle cx={x} cy={yHigh - 6} r="3" fill="#00E5FF" filter="drop-shadow(0 0 4px #00E5FF)" />
                            <line x1={x} y1={yHigh - 16} x2={x} y2={yHigh - 6} stroke="#00E5FF" strokeWidth="1.2" />
                            <rect
                              x={x - 26}
                              y={yHigh - 28}
                              width="52"
                              height="14"
                              rx="3"
                              fill="#0A101D"
                              stroke="#00E5FF"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={yHigh - 18}
                              textAnchor="middle"
                              fill="#00E5FF"
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
                            <circle cx={x} cy={yLow + 6} r="3" fill="#00F090" filter="drop-shadow(0 0 4px #00F090)" />
                            <line x1={x} y1={yLow + 6} x2={x} y2={yLow + 16} stroke="#00F090" strokeWidth="1.2" />
                            <rect
                              x={x - 26}
                              y={yLow + 16}
                              width="52"
                              height="14"
                              rx="3"
                              fill="#0A101D"
                              stroke="#00F090"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={yLow + 26}
                              textAnchor="middle"
                              fill="#00F090"
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
                              stroke="#00E5FF"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                            <rect
                              x={x - 30}
                              y={getY(67400) - 18}
                              width="60"
                              height="15"
                              rx="3"
                              fill="#0A101D"
                              stroke="#00E5FF"
                              strokeWidth="1"
                            />
                            <text
                              x={x}
                              y={getY(67400) - 7}
                              textAnchor="middle"
                              fill="#00E5FF"
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
                        fill="#052E1B"
                        stroke="#00F090"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 0 8px rgba(0,240,144,0.4))"
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
                        ▲ {sig.label}
                      </text>

                      <line
                        x1={x}
                        y1={getY(sig.invalidation)}
                        x2={chartWidth - 50}
                        y2={getY(sig.invalidation)}
                        stroke="#FF3B69"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <text
                        x={chartWidth - 48}
                        y={getY(sig.invalidation) + 4}
                        fill="#FF3B69"
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
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />

              {/* Bottom Time Axis Baseline */}
              <line
                x1="0"
                y1={chartHeight - 20}
                x2={chartWidth - 50}
                y2={chartHeight - 20}
                stroke="rgba(255, 255, 255, 0.1)"
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
            </svg>

          </div>

          {/* Integrated Multi-Plane Optical Lens HUD Footer */}
          <div className="border-t border-white/10 bg-[#080C16] p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-2 text-left">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {activeLayer === 'all' ? 'Full System Confluence' : `Layer ${selectedLayerData.number}: ${selectedLayerData.name}`}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {activeLayer === 'all' ? 'All analytical layers working in strict alignment.' : selectedLayerData.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {activeLayer === 'all'
                  ? 'AlgoFinex calculates market geometry, resting liquidity blocks, multi-period trend envelopes, and execution triggers on every bar close.'
                  : selectedLayerData.description}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  System Role
                </span>
                <span className="text-white font-medium">
                  {activeLayer === 'all' ? 'Composite trade qualification and execution filtering' : selectedLayerData.role}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                <span>Non-repainting mathematical model</span>
                <span className="text-[#00F090] font-semibold">Deterministic Logic</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndicatorSystemSection;

