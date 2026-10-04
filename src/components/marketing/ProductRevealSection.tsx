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
  Eye,
  Filter
} from 'lucide-react';

export const ProductRevealSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperienceMode>('STRUCTURE');
  const [filterNoise, setFilterNoise] = useState(true);

  const currentMode = EXPERIENCE_MODES[activeMode];

  // SVG Chart Dimensions
  const chartWidth = 720;
  const chartHeight = 340;
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
    const emaValue = c.close * 0.998 - (c.isBullish ? 60 : 20);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  const ema55Points = BTC_15M_CANDLES.map((c, i) => {
    const x = (i + 1) * stepX;
    const emaValue = c.close * 0.994 - (i < 6 ? 120 : 180);
    return `${x},${getY(emaValue)}`;
  }).join(' L ');

  return (
    <section id="product-experience" className="relative py-24 sm:py-32 overflow-hidden bg-tech-grid border-t border-white/[0.06]">
      
      {/* Ambient Lighting Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 w-full min-w-0">
        
        {/* Section Narrative Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-4">
            <Sparkles className="size-3 text-brand-accent shrink-0" />
            <span>THE ALGOFINEX LENS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mb-4">
            Your chart should show more than raw price.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Raw candlesticks show where transactions happened. AlgoFinex shows why price moved, where resting liquidity sits, and how market structure guides the next high-probability setup.
          </p>
        </div>

        {/* Mode Selector Tabs (Large, Tactile, High-Contrast) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 w-full">
          <button
            onClick={() => setActiveMode('STRUCTURE')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
              activeMode === 'STRUCTURE'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
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
                : 'bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <Compass className="size-4 shrink-0" />
            <span>02. Liquidity Dynamics</span>
          </button>

          <button
            onClick={() => setActiveMode('TREND')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
              activeMode === 'TREND'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
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
                : 'bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <CheckCircle2 className="size-4 shrink-0" />
            <span>04. Signal Confirmation</span>
          </button>
        </div>

        {/* Main Product Showcase Stage (Two Column Grid: Chart Visual + Deep Explanation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full min-w-0">
          
          {/* Left Column: Interactive Product Visualization (7 cols on lg) */}
          <div className="lg:col-span-7 rounded-2xl md:rounded-3xl border border-white/[0.1] bg-canvas/90 backdrop-blur-xl shadow-terminal overflow-hidden flex flex-col justify-between relative min-h-[460px]">
            
            {/* Stage Title Bar with View Controls */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-surface/80 px-4 sm:px-6 py-3 gap-3">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  {currentMode.label.toUpperCase()} LENS
                </span>
                <span className="text-border-medium hidden sm:inline">•</span>
                <span className="text-[11px] font-mono text-text-muted hidden sm:inline">
                  {currentMode.tagline}
                </span>
              </div>

              {/* Noise Filter Toggle */}
              <button
                onClick={() => setFilterNoise(!filterNoise)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors border ${
                  filterNoise
                    ? 'bg-brand-blue/15 text-brand-accent border-brand-blue/30'
                    : 'bg-white/[0.04] text-text-muted border-white/[0.08] hover:text-white'
                }`}
                title="Toggle between filtered structural view and chaotic noise view"
              >
                <Filter className="size-3" />
                <span>{filterNoise ? 'Noise Filter: ACTIVE' : 'Noise Filter: OFF'}</span>
              </button>
            </div>

            {/* SVG Chart Area */}
            <div className="relative p-4 sm:p-6 flex-1 flex flex-col justify-center select-none overflow-hidden min-h-[320px]">
              
              {/* Noise Clutter Overlay (Simulated chaotic manual lines when filter is OFF) */}
              {!filterNoise && (
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                  <svg className="w-full h-full opacity-40" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                    <line x1="20" y1="40" x2="700" y2="300" stroke="#EF4444" strokeWidth="1" strokeDasharray="5 5" />
                    <line x1="50" y1="280" x2="680" y2="100" stroke="#F59E0B" strokeWidth="1" />
                    <line x1="120" y1="310" x2="620" y2="60" stroke="#A855F7" strokeWidth="1.2" />
                    <line x1="200" y1="20" x2="450" y2="330" stroke="#EC4899" strokeWidth="0.8" strokeDasharray="3 3" />
                    <circle cx="280" cy="210" r="35" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 2" />
                    <circle cx="480" cy="140" r="50" fill="none" stroke="#F59E0B" strokeWidth="1" />
                    <text x="30" y="30" fill="#EF4444" fontSize="10" fontFamily="monospace">Subjective Trendline #1</text>
                    <text x="500" y="80" fill="#F59E0B" fontSize="10" fontFamily="monospace">Lagging Indicator Overlap</text>
                  </svg>
                  <div className="absolute bottom-6 px-3 py-1.5 rounded-lg bg-surface-elevated/90 border border-[#EF4444]/40 text-xs font-mono text-[#F87171] shadow-lg">
                    Traditional Chart: Manual Clutter &amp; Subjective Guesswork
                  </div>
                </div>
              )}

              {/* Clean AlgoFinex Structured Chart */}
              <svg
                className="w-full h-full overflow-hidden"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="expCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>

                  <linearGradient id="expDemandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Subtle Price Grid */}
                {[66000, 66500, 67000, 67500, 68000, 68500].map((p, idx) => {
                  const y = getY(p);
                  return (
                    <g key={idx}>
                      <line
                        x1="0"
                        y1={y}
                        x2={chartWidth}
                        y2={y}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={chartWidth - 48}
                        y={y - 4}
                        fill="#64748B"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        ${p.toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                {/* MODE: LIQUIDITY — Order Blocks & Imbalance Gaps */}
                {(activeMode === 'LIQUIDITY' || activeMode === 'STRUCTURE') &&
                  DEMO_ORDER_BLOCKS.map((ob, idx) => {
                    const startX = (ob.startIndex + 0.5) * stepX;
                    const endX = (ob.endIndex + 0.5) * stepX;
                    const width = endX - startX;
                    const topY = getY(ob.topPrice);
                    const bottomY = getY(ob.bottomPrice);
                    const height = bottomY - topY;

                    return (
                      <g key={idx} className="transition-all duration-300">
                        <rect
                          x={startX}
                          y={topY}
                          width={width}
                          height={height}
                          fill={ob.type === 'BEARISH_OB' ? 'rgba(239, 68, 68, 0.12)' : 'url(#expDemandGrad)'}
                          stroke={ob.type === 'BEARISH_OB' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)'}
                          strokeDasharray="3 3"
                          rx="4"
                        />
                        <text
                          x={startX + 6}
                          y={topY + 14}
                          fill={ob.type === 'BEARISH_OB' ? '#F87171' : '#34D399'}
                          fontSize="8.5"
                          fontFamily="monospace"
                          fontWeight="600"
                        >
                          {ob.label}
                        </text>
                      </g>
                    );
                  })}

                {/* MODE: TREND — Dynamic Cloud Ribbon */}
                {(activeMode === 'TREND' || activeMode === 'CONFIRMATION') && (
                  <>
                    <path
                      d={`M ${ema21Points}`}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth={activeMode === 'TREND' ? '2.5' : '1.8'}
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    />
                    <path
                      d={`M ${ema55Points}`}
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="1.5"
                      strokeDasharray="5 3"
                      strokeOpacity="0.8"
                    />
                  </>
                )}

                {/* Candlestick sequence */}
                {BTC_15M_CANDLES.map((c, i) => {
                  const x = (i + 1) * stepX;
                  const highY = getY(c.high);
                  const lowY = getY(c.low);
                  const openY = getY(c.open);
                  const closeY = getY(c.close);
                  const bodyY = Math.min(openY, closeY);
                  const bodyHeight = Math.max(Math.abs(closeY - openY), 2.5);
                  const candleWidth = Math.max(stepX * 0.65, 8);
                  const color = c.isBullish ? '#10B981' : '#EF4444';

                  return (
                    <g key={i}>
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={color}
                        strokeWidth="1.5"
                        strokeOpacity="0.8"
                      />
                      <rect
                        x={x - candleWidth / 2}
                        y={bodyY}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={color}
                        stroke={color}
                        strokeWidth="1"
                        rx="1.5"
                      />
                    </g>
                  );
                })}

                {/* MODE: STRUCTURE — Swing Structure Markers & BOS Lines */}
                {activeMode === 'STRUCTURE' && (
                  <g>
                    {/* BOS Line */}
                    <line
                      x1={(4 + 1) * stepX}
                      y1={getY(66420)}
                      x2={(11 + 1) * stepX}
                      y2={getY(66420)}
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <text
                      x={(8 + 1) * stepX}
                      y={getY(66420) - 5}
                      fill="#60A5FA"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      BOS (Break of Structure)
                    </text>

                    {/* Swing Higher-Low Indicator */}
                    <circle cx={(4 + 1) * stepX} cy={getY(65950)} r="4" fill="#10B981" />
                    <text
                      x={(4 + 1) * stepX + 8}
                      y={getY(65950) + 4}
                      fill="#34D399"
                      fontSize="8.5"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      Higher-Low (HL)
                    </text>
                  </g>
                )}

                {/* MODE: CONFIRMATION — Bar-Close Signal Trigger & Invalidation Line */}
                {(activeMode === 'CONFIRMATION' || activeMode === 'STRUCTURE') &&
                  DEMO_SIGNALS.map((sig, idx) => {
                    const targetCandle = BTC_15M_CANDLES[sig.index];
                    const x = (sig.index + 1) * stepX;
                    const y = getY(targetCandle.low) + 24;

                    return (
                      <g key={idx}>
                        <path
                          d={`M ${x} ${y - 8} L ${x - 6} ${y} L ${x + 6} ${y} Z`}
                          fill="#10B981"
                        />
                        <rect
                          x={x - 60}
                          y={y}
                          width="120"
                          height="20"
                          rx="4"
                          fill="#0E1726"
                          stroke="#10B981"
                          strokeWidth="1.2"
                        />
                        <text
                          x={x}
                          y={y + 13}
                          textAnchor="middle"
                          fill="#34D399"
                          fontSize="8"
                          fontWeight="700"
                          fontFamily="monospace"
                        >
                          ▲ {sig.label}
                        </text>

                        {/* Invalidation Line */}
                        <line
                          x1={x}
                          y1={getY(sig.invalidation)}
                          x2={chartWidth - 50}
                          y2={getY(sig.invalidation)}
                          stroke="#EF4444"
                          strokeWidth="1.2"
                          strokeDasharray="4 2"
                        />
                        <text
                          x={chartWidth - 48}
                          y={getY(sig.invalidation) + 3}
                          fill="#EF4444"
                          fontSize="8"
                          fontFamily="monospace"
                        >
                          Invalidation
                        </text>
                      </g>
                    );
                  })}
              </svg>
            </div>

            {/* Bottom Telemetry Strip of Visual Stage */}
            <div className="border-t border-white/[0.06] bg-surface-elevated/50 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-text-muted">Observation:</span>
                <span className="text-white font-semibold">{currentMode.tagline}</span>
              </div>
              <div className="flex items-center gap-1.5 text-text-dim text-[11px]">
                <ShieldCheck className="size-3.5 text-brand-blue" />
                <span>Non-repainting calculation guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Product Lens Breakdown (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 p-6 rounded-2xl md:rounded-3xl border border-white/[0.08] bg-surface/40 backdrop-blur-xl">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                {/* Header */}
                <div>
                  <div className="text-xs font-mono text-brand-accent uppercase tracking-wider font-semibold mb-1">
                    {currentMode.label} Architecture
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-snug">
                    {currentMode.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-2.5">
                    {currentMode.description}
                  </p>
                </div>

                {/* What You See Checklist */}
                <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Eye className="size-3.5 text-brand-blue" />
                    <span>What You See With AlgoFinex:</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {currentMode.whatYouSee.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-primary leading-normal">
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Noise vs Advantage Contrast Card */}
                <div className="p-4 rounded-xl bg-surface-card border border-white/[0.06] flex flex-col gap-2.5">
                  <div>
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block">
                      Traditional Problem
                    </span>
                    <span className="text-xs text-text-muted leading-relaxed block mt-0.5">
                      {currentMode.traditionalNoise}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono text-brand-accent uppercase tracking-wider block">
                      AlgoFinex Advantage
                    </span>
                    <span className="text-xs text-white font-medium leading-relaxed block mt-0.5">
                      {currentMode.indicatorAdvantage}
                    </span>
                  </div>
                </div>

                {/* Mode Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {currentMode.activeMetrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-surface-elevated/50 border border-white/[0.04]">
                      <div className="text-[10px] text-text-dim uppercase">{m.label}</div>
                      <div className={`font-semibold mt-0.5 truncate ${
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

            {/* Seamless Transition Hint */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-text-muted">
              <span>Next: Indicator Suite Ecosystem</span>
              <a href="#indicator-system" className="text-brand-accent hover:underline flex items-center gap-1 font-semibold">
                <span>View Products</span>
                <ArrowRight className="size-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductRevealSection;
