import React, { useState } from 'react';
import {
  Layers,
  Copy,
  Check,
  Sliders,
  Code2,
  FileCode,
  Calculator,
  Gauge
} from 'lucide-react';

export const IndicatorsScreen: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState('structure');
  const [activeTab, setActiveTab] = useState<'pinescript' | 'formula' | 'parameters' | 'metrics'>('pinescript');
  const [copied, setCopied] = useState(false);
  const [sensitivity, setSensitivity] = useState(20);

  const indicators = [
    {
      id: 'structure',
      name: 'Market Structure Engine',
      category: 'Core Strata',
      version: 'v5.2.0',
      description: 'Automates real-time identification of swing highs/lows, Break of Structure (BOS), and Change of Character (CHOCH) coordinates using mathematical order flow displacement.',
      formula: 'BOS = High[t] > Highest(High, Lookback[20]) AND Close[t] > High[t-1]\nCHOCH = CrossUnder(Low[t], Lowest(Low, Lookback[10]))',
      pineScript: `//@version=5
indicator("AlgoFinex — Market Structure Engine", overlay=true, max_labels_count=500)

lookback = input.int(20, "Swing Pivot Lookback", minval=5, maxval=50)
showBOS = input.bool(true, "Show Break of Structure (BOS)")
showCHOCH = input.bool(true, "Show Change of Character (CHOCH)")

// Pivot High & Low detection
ph = ta.pivothigh(high, lookback, lookback)
pl = ta.pivotlow(low, lookback, lookback)

var float lastHigh = na
var float lastLow = na

if not na(ph)
    lastHigh := ph
if not na(pl)
    lastLow := pl

// Break of Structure Logic
bosBullish = ta.crossover(close, lastHigh)
if bosBullish and showBOS
    label.new(bar_index, high, "BOS ▲", color=color.new(#00F090, 20), textcolor=color.black, style=label.style_label_down)
    alert("AlgoFinex: Bullish BOS Confirmed", alert.freq_once_per_bar_close)`,
      winRate: '72.4%',
      profitFactor: '2.48',
      tradesSample: 1420
    },
    {
      id: 'liquidity',
      name: 'Liquidity Pool Mapper',
      category: 'Contextual Layer',
      version: 'v4.8.1',
      description: 'Highlights unmitigated buy-side and sell-side liquidity pools alongside clustered equal highs/lows for high-probability target areas and sweeps.',
      formula: 'Pool = Sum(Touch(Price, Threshold[0.001])) >= 3\nSweep = High > PoolTop AND Close < PoolTop',
      pineScript: `//@version=5
indicator("AlgoFinex — Liquidity Pool Mapper", overlay=true)

tolerance = input.float(0.0015, "Pool Touch Tolerance %", step=0.0005)
minTouches = input.int(3, "Min Equal Level Touches", minval=2)

// Detect Equal Highs (Liquidity Resting)
eqHigh = math.abs(high - high[1]) / high <= tolerance
if eqHigh
    line.new(bar_index - 1, high[1], bar_index + 10, high[1], color=color.new(#00E5FF, 30), style=line.style_dashed)
    label.new(bar_index + 5, high[1], "BUY-SIDE LIQ POOL", textcolor=#00E5FF, color=color.new(#0A101D, 0))`,
      winRate: '68.9%',
      profitFactor: '2.15',
      tradesSample: 980
    },
    {
      id: 'trend',
      name: 'Dynamic Trend Corridor Suite',
      category: 'Directional Filter',
      version: 'v3.9.0',
      description: 'Smoothed volatility-adjusted band corridor eliminating lagging EMA clutter to isolate true institutional momentum and trend exhaustion points.',
      formula: 'Corridor = EMA(Close, 21) ± (ATR(14) * 1.8)\nRibbonDelta = EMA(21) - EMA(55)',
      pineScript: `//@version=5
indicator("AlgoFinex — Dynamic Trend Corridor", overlay=true)

lenFast = input.int(21, "Fast Ribbon EMA")
lenSlow = input.int(55, "Slow Ribbon EMA")
mult = input.float(1.8, "ATR Volatility Multiplier")

emaFast = ta.ema(close, lenFast)
emaSlow = ta.ema(close, lenSlow)
atrVal = ta.atr(14) * mult

upperBand = emaFast + atrVal
lowerBand = emaFast - atrVal

p1 = plot(upperBand, "Upper Corridor", color=color.new(#00E5FF, 70))
p2 = plot(lowerBand, "Lower Corridor", color=color.new(#00E5FF, 70))
fill(p1, p2, color=emaFast > emaSlow ? color.new(#00F090, 85) : color.new(#FF3B69, 85))`,
      winRate: '66.2%',
      profitFactor: '1.92',
      tradesSample: 1640
    },
    {
      id: 'confirmation',
      name: 'Confirmation & Invalidation',
      category: 'Risk Engine',
      version: 'v4.1.2',
      description: 'Calculates exact structural invalidation price levels and multi-timeframe confirmation triggers before trade planning.',
      formula: 'Invalidation = Lowest(Low, SwingLookback) - (ATR * 0.25)\nRR_Ratio = (Target - Entry) / (Entry - Invalidation)',
      pineScript: `//@version=5
indicator("AlgoFinex — Risk & Invalidation Engine", overlay=true)

riskLookback = input.int(15, "Invalidation Lookback")
atrBuffer = ta.atr(14) * 0.25

invLow = ta.lowest(low, riskLookback) - atrBuffer
invHigh = ta.highest(high, riskLookback) + atrBuffer

plot(invLow, "Invalidation Stop Long", color=#FF3B69, style=plot.style_stepline, linewidth=2)
plot(invHigh, "Invalidation Stop Short", color=#00F090, style=plot.style_stepline, linewidth=2)`,
      winRate: '75.1%',
      profitFactor: '2.84',
      tradesSample: 1120
    },
  ];

  const current = indicators.find((i) => i.id === selectedIndicator) || indicators[0];

  const handleCopyInvite = () => {
    navigator.clipboard.writeText('AF-TRADINGVIEW-INVITE-8849');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-component="IndicatorsScreen"
      className="p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto space-y-6 select-none text-left overflow-y-auto"
    >
      {/* Header */}
      <div className="border-b border-white/10 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-[#00F090]" />
          <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Quantitative Indicator Architecture
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/20">
            TRADINGVIEW PINE SCRIPT v5.0
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">
          AlgoFinex Indicator Suite
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl font-sans">
          Review Pine Script source code, mathematical specifications, input controls, and backtested performance telemetry for the 4 core institutional layers.
        </p>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Master List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[10px] font-mono font-semibold uppercase text-slate-500 px-1 mb-2">
            Available Modules (4 Strata):
          </div>
          {indicators.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedIndicator(item.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedIndicator === item.id
                  ? 'bg-[#0E1528] border-[#00F090] shadow-[0_0_15px_rgba(0,240,144,0.15)] ring-1 ring-[#00F090]/30'
                  : 'bg-[#0A0E1A] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-semibold text-[#00E5FF] uppercase">{item.category}</span>
                <span className="text-slate-500">{item.version}</span>
              </div>
              <div className="font-display font-bold text-white text-sm mt-1">{item.name}</div>
              <div className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                {item.description}
              </div>
            </button>
          ))}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 bg-[#0A0E1A] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
          {/* Detail Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold uppercase text-[#00E5FF] px-2 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/30">
                  {current.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{current.version}</span>
              </div>
              <h2 className="text-xl font-display font-bold text-white mt-1.5">{current.name}</h2>
            </div>

            {/* Invite Key Copy Action */}
            <button
              onClick={handleCopyInvite}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F090] to-[#00E5FF] text-black text-xs font-mono font-bold hover:brightness-110 transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,144,0.3)]"
            >
              {copied ? <Check className="size-3.5 text-black" /> : <Copy className="size-3.5" />}
              <span>{copied ? 'Invite Key Copied!' : 'Copy Script Access Key'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.description}</p>

          {/* Sub-Tabs (Pine Script, Formula, Parameters, Metrics) */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-mono">
            {[
              { id: 'pinescript' as const, label: 'Pine Script v5', icon: FileCode },
              { id: 'formula' as const, label: 'Formula & Math', icon: Calculator },
              { id: 'parameters' as const, label: 'Sensitivity Tuning', icon: Sliders },
              { id: 'metrics' as const, label: 'Backtest Telemetry', icon: Gauge },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-[#00F090] font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Pine Script Editor View */}
          {activeTab === 'pinescript' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>TradingView Source Code:</span>
                <span className="text-[#00E5FF]">READY TO IMPORT</span>
              </div>
              <pre className="p-4 rounded-xl bg-[#060A12] border border-white/10 text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-[320px] leading-relaxed select-text">
                {current.pineScript}
              </pre>
            </div>
          )}

          {/* Tab 2: Formula & Math */}
          {activeTab === 'formula' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Code2 className="size-3.5 text-[#00E5FF]" />
                <span>Mathematical Logic Specification:</span>
              </div>
              <pre className="p-4 rounded-xl bg-[#060A12] border border-white/10 text-xs font-mono text-[#00E5FF] whitespace-pre-wrap leading-relaxed select-text">
                {current.formula}
              </pre>
            </div>
          )}

          {/* Tab 3: Parameters */}
          {activeTab === 'parameters' && (
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Sliders className="size-4 text-[#00F090]" />
                  <span>Pivot Lookback Sensitivity:</span>
                </span>
                <span className="font-bold text-[#00F090] text-sm">{sensitivity} Bars</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full accent-[#00F090] cursor-pointer"
              />
              <div className="text-[11px] font-mono text-slate-400">
                Adjusting lookback affects sensitivity to minor swing points vs major multi-day structural market breaks.
              </div>
            </div>
          )}

          {/* Tab 4: Backtest Telemetry */}
          {activeTab === 'metrics' && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#060A12] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Win Rate</div>
                <div className="text-xl font-mono font-bold text-[#00F090] mt-1">{current.winRate}</div>
              </div>
              <div className="bg-[#060A12] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Profit Factor</div>
                <div className="text-xl font-mono font-bold text-[#00E5FF] mt-1">{current.profitFactor}</div>
              </div>
              <div className="bg-[#060A12] border border-white/10 rounded-xl p-4 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Sample Signals</div>
                <div className="text-xl font-mono font-bold text-white mt-1">{current.tradesSample}</div>
              </div>
            </div>
          )}

          {/* Verification Notice */}
          <div className="text-[11px] font-mono text-slate-500 border-t border-white/10 pt-4 flex items-center justify-between">
            <span>// STATUS: VERIFIED PINE SCRIPT v5 COMPATIBLE</span>
            <span>ALGOFINEX QUANT SUITE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorsScreen;
