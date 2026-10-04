import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDICATOR_PRODUCTS } from '../../data/productExperienceData';
import { 
  Layers, 
  TrendingUp, 
  Check, 
  ShieldCheck, 
  Terminal, 
  BellRing
} from 'lucide-react';

export const IndicatorSystemSection: React.FC = () => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const currentProduct = INDICATOR_PRODUCTS[selectedProductIndex];

  return (
    <section id="indicator-system" className="relative py-24 sm:py-32 overflow-hidden bg-tech-grid border-t border-white/[0.06]">
      
      {/* Subtle Radial Environment Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 w-full min-w-0">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-4">
            <Layers className="size-3 text-brand-accent shrink-0" />
            <span>INDICATOR ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mb-4">
            Three specialized tools.<br />
            <span className="bg-gradient-to-r from-white via-text-primary to-text-muted bg-clip-text text-transparent">
              One coherent trading system.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Rather than overloading charts with redundant indicators, AlgoFinex delivers three harmonized tools. Each serves a distinct phase in your analysis: defining structural bias, filtering trend health, and validating bar-close execution.
          </p>
        </div>

        {/* Large-Scale Interactive Showcase Canvas (FinanceX Inspiration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-14 w-full min-w-0">
          
          {/* Left Column: Product Selector Tabs (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {INDICATOR_PRODUCTS.map((prod, idx) => {
              const isSelected = idx === selectedProductIndex;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-surface-elevated/90 border-brand-blue/50 shadow-panel'
                      : 'bg-surface/40 border-white/[0.06] hover:bg-surface-elevated/50 hover:border-white/[0.14]'
                  }`}
                >
                  {/* Active Indicator Left Accent Line */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent font-semibold">
                      {prod.badge}
                    </span>
                    <span className="text-[11px] font-mono text-text-dim">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-brand-accent transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-text-muted mt-1 leading-normal line-clamp-2">
                    {prod.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dominant Interactive Visual & Feature Deep Dive (8 cols on lg) */}
          <div className="lg:col-span-8 rounded-2xl md:rounded-3xl border border-white/[0.1] bg-canvas/90 backdrop-blur-xl shadow-terminal p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between h-full gap-6"
              >
                {/* Product Detail Top Header */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-brand-blue/15 text-brand-accent border border-brand-blue/30">
                      {currentProduct.badge}
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      Native TradingView Script (Pine Script v5)
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    {currentProduct.name}
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-2">
                    {currentProduct.description}
                  </p>
                </div>

                {/* Simulated Product Visual Snapshot */}
                <div className="p-4 sm:p-5 rounded-xl bg-surface-elevated/80 border border-white/[0.08] relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-text-muted mb-3 pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-signal-bull" />
                      <span className="text-white font-semibold">Workflow Role:</span>
                      <span className="text-text-secondary">{currentProduct.role}</span>
                    </div>
                    <span className="text-brand-accent hidden sm:inline">Active Suite Layer</span>
                  </div>

                  {/* Feature Check Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {currentProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-text-primary font-mono">
                        <div className="p-1 rounded bg-brand-blue/15 text-brand-accent shrink-0">
                          <Check className="size-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {currentProduct.techSpecs.map((spec, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface/60 border border-white/[0.04]">
                      <div className="text-[10px] text-text-muted uppercase">{spec.label}</div>
                      <div className="font-semibold text-white mt-0.5 text-[11px] truncate">{spec.value}</div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Secondary Architectural Foundation Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          <div className="p-5 rounded-2xl bg-surface/40 border border-white/[0.06] flex flex-col justify-between gap-3">
            <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue w-fit">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Zero Repaint Logic</h4>
              <p className="text-xs text-text-secondary mt-1 leading-normal">
                Every calculation executes strictly at candle close. Markers will never shift or disappear retroactively.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface/40 border border-white/[0.06] flex flex-col justify-between gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Terminal className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Pine Script v5 Engine</h4>
              <p className="text-xs text-text-secondary mt-1 leading-normal">
                Written natively in optimized Pine Script v5 for instantaneous chart rendering with zero browser overhead.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface/40 border border-white/[0.06] flex flex-col justify-between gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Multi-Asset Agnostic</h4>
              <p className="text-xs text-text-secondary mt-1 leading-normal">
                Calculates structural order flow identically across Crypto, Forex, Stock Indices, and Commodities.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface/40 border border-white/[0.06] flex flex-col justify-between gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
              <BellRing className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Instant Alert Webhooks</h4>
              <p className="text-xs text-text-secondary mt-1 leading-normal">
                Deploy automated webhooks to Discord, Telegram, or custom execution bots on verified bar-close alerts.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default IndicatorSystemSection;
