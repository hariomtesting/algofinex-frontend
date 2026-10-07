import React, { useState } from 'react';
import { Layers, Copy, Check, Sliders, Code2 } from 'lucide-react';

export const IndicatorsScreen: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState('structure');
  const [copied, setCopied] = useState(false);

  const indicators = [
    {
      id: 'structure',
      name: 'Market Structure Engine',
      category: 'Core Strata',
      description: 'Automates real-time identification of swing highs/lows, Break of Structure (BOS), and Change of Character (CHOCH) coordinates.',
      formula: 'BOS = High[t] > Highest(High, Lookback[20]) AND Close[t] > High[t-1]',
    },
    {
      id: 'liquidity',
      name: 'Liquidity Pool Mapper',
      category: 'Contextual Layer',
      description: 'Highlights unmitigated buy-side and sell-side liquidity pools alongside equal highs/lows for high-probability target areas.',
      formula: 'Pool = Sum(Touch(Price, Threshold[0.001])) >= 3',
    },
    {
      id: 'trend',
      name: 'Trend Corridor Suite',
      category: 'Directional Filter',
      description: 'Smoothed volatility-adjusted band corridor eliminating lagging EMA clutter to isolate true institutional momentum.',
      formula: 'Corridor = EMA(Close, 21) ± (ATR(14) * 1.8)',
    },
    {
      id: 'confirmation',
      name: 'Confirmation & Invalidation',
      category: 'Risk Engine',
      description: 'Calculates exact structural invalidation price levels and multi-timeframe confirmation triggers before trade planning.',
      formula: 'Invalidation = Lowest(Low, SwingLookback) - (ATR * 0.25)',
    },
  ];

  const current = indicators.find((i) => i.id === selectedIndicator) || indicators[0];

  const handleCopyInvite = () => {
    navigator.clipboard.writeText('AF-TRADINGVIEW-INVITE-8849');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div data-component="IndicatorsScreen" className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none text-left">
      {/* Header */}
      <div className="border-b border-white/10 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-[#00F090]" />
          <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Indicator Suite Directory
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">
          TradingView Indicator Architecture
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl font-sans">
          Review technical specifications, mathematical logic, and simulated invite access for the 4 core AlgoFinex indicator components.
        </p>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Master List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-[10px] font-mono font-semibold uppercase text-slate-500 px-1 mb-2">
            Available Modules:
          </div>
          {indicators.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedIndicator(item.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                selectedIndicator === item.id
                  ? 'bg-[#0E1528] border-[#00F090] shadow-[0_0_15px_rgba(0,240,144,0.15)] ring-1 ring-[#00F090]/30'
                  : 'bg-[#0A0E1A] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-[10px] font-mono font-semibold text-[#00E5FF] uppercase">{item.category}</div>
              <div className="font-display font-bold text-white text-sm mt-0.5">{item.name}</div>
            </button>
          ))}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase text-[#00E5FF] px-2.5 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/30">
                {current.category}
              </span>
              <h2 className="text-xl font-display font-bold text-white mt-2">{current.name}</h2>
            </div>

            {/* Prototype Invite Action */}
            <button
              onClick={handleCopyInvite}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F090] to-[#00E5FF] text-black text-xs font-mono font-bold hover:brightness-110 transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,144,0.3)]"
            >
              {copied ? <Check className="size-3.5 text-black" /> : <Copy className="size-3.5" />}
              <span>{copied ? 'Invite Key Copied!' : 'Copy Script Access Key'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.description}</p>

          {/* Mathematical Logic Formula */}
          <div className="bg-[#060A12] border border-white/10 rounded-xl p-4 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <Code2 className="size-3.5 text-[#00E5FF]" />
              <span>Logic Specification:</span>
            </div>
            <pre className="text-xs font-mono text-[#00E5FF] whitespace-pre-wrap break-all bg-black/40 p-3 rounded-lg border border-cyan-500/20">
              {current.formula}
            </pre>
          </div>

          {/* Simulated Sensitivity Parameter Slider */}
          <div className="bg-[#060A12] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Sliders className="size-3.5 text-[#00F090]" />
                <span>Preset Sensitivity Lookback:</span>
              </span>
              <span className="font-bold text-[#00F090]">20 Bars</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              defaultValue="20"
              className="w-full accent-[#00F090] cursor-pointer"
            />
            <div className="text-[10px] font-mono text-slate-500">
              // LUXALGO VELA ENGINE — Dynamic client-side sensitivity tuner.
            </div>
          </div>

          {/* Verification Notice */}
          <div className="text-[11px] font-mono text-slate-500 border-t border-white/10 pt-4">
            // STATUS: VERIFIED PINE SCRIPT v4.2 COMPATIBILITY
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorsScreen;
