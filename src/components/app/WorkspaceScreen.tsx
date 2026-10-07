import React, { useState, useRef } from 'react';
import { Instrument, Timeframe } from './AppShell';
import { ContextualInspector, InspectorPoint } from './ContextualInspector';

export type LensLayer = 'RAW' | 'STRUCTURE' | 'LIQUIDITY' | 'TREND' | 'CONFIRMATION';

interface WorkspaceScreenProps {
  selectedInstrument: Instrument;
  selectedTimeframe: Timeframe;
  activeLens: LensLayer;
  onLensChange: (lens: LensLayer) => void;
}

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  selectedInstrument,
  selectedTimeframe,
  activeLens,
  onLensChange,
}) => {
  const [activeInspectorPoint, setActiveInspectorPoint] = useState<InspectorPoint | null>(null);
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Demo candlestick dataset
  const candleData = [
    { x: 40, open: 180, high: 195, low: 175, close: 190, bull: true, time: '09:00', price: '$66,200' },
    { x: 80, open: 190, high: 205, low: 185, close: 178, bull: false, time: '09:15', price: '$66,100' },
    { x: 120, open: 178, high: 210, low: 170, close: 202, bull: true, time: '09:30', price: '$66,450' },
    { x: 160, open: 202, high: 225, low: 195, close: 218, bull: true, time: '09:45', price: '$66,800' },
    { x: 200, open: 218, high: 235, low: 210, close: 228, bull: true, time: '10:00', price: '$67,100' },
    { x: 240, open: 228, high: 245, low: 220, close: 240, bull: true, time: '10:15', price: '$67,400' },
    { x: 280, open: 240, high: 250, low: 215, close: 222, bull: false, time: '10:30', price: '$66,900' },
    { x: 320, open: 222, high: 238, low: 218, close: 235, bull: true, time: '10:45', price: '$67,250' },
    { x: 360, open: 235, high: 260, low: 230, close: 255, bull: true, time: '11:00', price: '$67,850' },
    { x: 400, open: 255, high: 268, low: 248, close: 262, bull: true, time: '11:15', price: '$68,100' },
  ];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Map X to nearest candle
    const index = Math.min(
      candleData.length - 1,
      Math.max(0, Math.floor((x / rect.width) * candleData.length))
    );
    setHoveredCandle(index);
  };

  const handleMouseLeave = () => {
    setHoveredCandle(null);
  };

  const currentCandle = hoveredCandle !== null ? candleData[hoveredCandle] : candleData[candleData.length - 1];

  return (
    <div data-component="WorkspaceScreen" className="flex-1 flex flex-col lg:flex-row h-full min-h-[calc(100vh-3.5rem)] bg-[#05080E] text-white select-none overflow-hidden">
      {/* Primary Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Workspace Toolbar / Lens Selector Bar */}
        <div className="h-12 border-b border-white/10 px-4 bg-[#060A12] flex items-center justify-between shrink-0 overflow-x-auto gap-3">
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 mr-2">
              Strata Lens:
            </span>
            {(['RAW', 'STRUCTURE', 'LIQUIDITY', 'TREND', 'CONFIRMATION'] as LensLayer[]).map((lens) => (
              <button
                key={lens}
                onClick={() => onLensChange(lens)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                  activeLens === lens
                    ? 'bg-[#00F090] text-black font-bold shadow-[0_0_8px_#00F090]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {lens}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>Chart: <strong className="text-white font-bold">{selectedInstrument}</strong></span>
            <span>TF: <strong className="text-[#00F090] font-bold">{selectedTimeframe}</strong></span>
          </div>
        </div>

        {/* Main Interactive Chart Canvas Area */}
        <div
          ref={containerRef}
          className="flex-1 relative bg-[#060A12] border-b border-white/10 p-4 flex flex-col justify-between min-h-[380px] sm:min-h-[460px] cursor-crosshair overflow-hidden"
        >
          {/* Top Crosshair / OHLC Inspection Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono bg-[#0A0E1A] border border-white/10 px-3 py-2 rounded-lg z-10 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white">{selectedInstrument}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">O: <strong className="text-white">${currentCandle.open}</strong></span>
              <span className="text-slate-400">H: <strong className="text-white">${currentCandle.high}</strong></span>
              <span className="text-slate-400">L: <strong className="text-white">${currentCandle.low}</strong></span>
              <span className="text-slate-400">C: <strong className={currentCandle.bull ? 'text-[#00F090]' : 'text-[#FF3B69]'}>${currentCandle.close}</strong></span>
            </div>

            <div className="text-[10px] text-slate-500 font-mono hidden md:block">
              // LUXALGO VELA WORKSTATION · Touch/Drag Scrubbing Enabled
            </div>
          </div>

          {/* SVG Candlestick & Layer Blueprint Rendering */}
          <div className="flex-1 my-2 relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 440 280"
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Grid Background Lines */}
              <line x1="0" y1="70" x2="440" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="440" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="0" y1="210" x2="440" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* LAYER 3: LIQUIDITY */}
              {(activeLens === 'LIQUIDITY' || activeLens === 'TREND' || activeLens === 'CONFIRMATION') && (
                <g>
                  <rect x="20" y="50" width="400" height="24" fill="rgba(0, 229, 255, 0.08)" stroke="#00E5FF" strokeWidth="0.8" strokeDasharray="4 2" rx="4" />
                  <text x="28" y="66" fill="#00E5FF" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                    UNMITIGATED BUY-SIDE LIQUIDITY POOL ($68,200)
                  </text>

                  <rect x="20" y="240" width="400" height="20" fill="rgba(255, 59, 105, 0.08)" stroke="#FF3B69" strokeWidth="0.8" strokeDasharray="4 2" rx="4" />
                  <text x="28" y="254" fill="#FF3B69" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                    SELL-SIDE LIQUIDITY / EQUAL LOWS ($65,800)
                  </text>
                </g>
              )}

              {/* LAYER 4: TREND CORRIDOR */}
              {(activeLens === 'TREND' || activeLens === 'CONFIRMATION') && (
                <path
                  d="M 40 185 Q 160 210, 240 220 T 400 250"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2.5"
                  strokeOpacity="0.8"
                  strokeDasharray="4 2"
                  filter="drop-shadow(0 0 6px rgba(0,229,255,0.4))"
                />
              )}

              {/* Candlesticks Series */}
              {candleData.map((c, idx) => {
                const isHovered = hoveredCandle === idx;
                const candleColor = c.bull ? '#00F090' : '#FF3B69';

                return (
                  <g key={idx}>
                    {/* Wick */}
                    <line x1={c.x} y1={280 - c.high} x2={c.x} y2={280 - c.low} stroke={candleColor} strokeWidth="1.5" />
                    {/* Body */}
                    <rect
                      x={c.x - 6}
                      y={280 - Math.max(c.open, c.close)}
                      width="12"
                      height={Math.max(4, Math.abs(c.open - c.close))}
                      fill={candleColor}
                      rx="1"
                    />
                    {/* Hover Highlight Ring */}
                    {isHovered && (
                      <circle cx={c.x} cy={280 - c.close} r="8" fill="none" stroke="#00E5FF" strokeWidth="2" filter="drop-shadow(0 0 4px #00E5FF)" />
                    )}
                  </g>
                );
              })}

              {/* LAYER 2: STRUCTURE ANNOTATIONS */}
              {activeLens !== 'RAW' && (
                <g>
                  {/* High Swing Point */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorPoint({
                        price: '$67,400',
                        label: 'BOS ▲ 67,400',
                        layer: activeLens,
                        type: 'STRUCTURE',
                        description: 'Clean Break of Structure confirming higher timeframe bullish momentum continuation.',
                        invalidation: '$66,180',
                        time: '10:15',
                      })
                    }
                  >
                    <line x1="240" y1="40" x2="240" y2="80" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="2 2" />
                    <rect x="205" y="22" width="70" height="18" fill="#0A101D" stroke="#00E5FF" strokeWidth="1" rx="3" />
                    <text x="240" y="34" fill="#00E5FF" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
                      BOS ▲ 67,400
                    </text>
                  </g>

                  {/* Low Swing Invalidation Point */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorPoint({
                        price: '$66,180',
                        label: 'INVALIDATION',
                        layer: activeLens,
                        type: 'CONFIRMATION',
                        description: 'Structural Higher Low acting as the primary invalidation threshold for active trade context.',
                        invalidation: '$66,180',
                        time: '09:15',
                      })
                    }
                  >
                    <rect x="45" y="195" width="110" height="18" fill="#2A0B13" stroke="#FF3B69" strokeWidth="1" rx="3" />
                    <text x="100" y="207" fill="#FF3B69" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
                      INVALIDATION — $66,180
                    </text>
                  </g>
                </g>
              )}

              {/* LAYER 5: CONFIRMATION Context Overlay */}
              {activeLens === 'CONFIRMATION' && (
                <g>
                  <line x1="240" y1="60" x2="400" y2="60" stroke="#00F090" strokeWidth="2" strokeDasharray="4 4" />
                  <rect x="330" y="46" width="90" height="18" fill="#052E1B" stroke="#00F090" strokeWidth="1" rx="3" />
                  <text x="375" y="58" fill="#00F090" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
                    CONFIRMATION ZN
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Context Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#00F090] shadow-[0_0_6px_#00F090]" />
              <span>Status: <strong className="text-white">STRUCTURE CONFIRMED</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <span>Invalidation: <strong className="text-[#FF3B69] font-bold">$66,180</strong></span>
              <button
                onClick={() =>
                  setActiveInspectorPoint({
                    price: '$67,400',
                    label: 'BOS ▲ 67,400',
                    layer: activeLens,
                    type: 'STRUCTURE',
                    description: 'Interactive analytical inspector displaying structural context for selected chart coordinate.',
                    invalidation: '$66,180',
                    time: '10:15',
                  })
                }
                className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
              >
                Inspect Point →
              </button>
            </div>
          </div>
        </div>

        {/* Routine Steps / Execution Context Summary Bar */}
        <div className="p-4 bg-[#060A12] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-white">7-STEP ROUTINE:</span>
            <span>Step 03 / 07 — Contextual Invalidation Verified</span>
          </div>

          <div className="text-[10px] text-slate-500">
            // LUXALGO VELA ENGINE — High-precision mathematical feed
          </div>
        </div>
      </div>

      {/* Right Contextual Inspector Slide-Over / Panel */}
      <ContextualInspector
        point={activeInspectorPoint}
        onClose={() => setActiveInspectorPoint(null)}
      />
    </div>
  );
};

export default WorkspaceScreen;
