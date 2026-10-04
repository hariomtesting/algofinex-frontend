import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_LAYERS } from '../../data/productExperienceData';
import { 
  Layers, 
  CheckCircle2, 
  Eye, 
  Workflow, 
  Sliders
} from 'lucide-react';

export const IndicatorSystemSection: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('all');

  const selectedLayer = SYSTEM_LAYERS.find(l => l.id === activeLayerId) || SYSTEM_LAYERS[0];

  return (
    <section id="indicator-system" className="relative py-28 sm:py-36 overflow-hidden bg-[#05070B] border-t border-white/[0.06]">
      
      {/* Subtle Atmospheric Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] opacity-50" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] opacity-40" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 w-full min-w-0">
        
        {/* Section Header - Serious, Minimal, Art-Directed */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated/90 border border-white/[0.1] text-xs font-mono text-brand-accent mb-4">
            <Layers className="size-3 text-brand-accent shrink-0" />
            <span>THE UNIFIED INDICATOR SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight mb-4">
            One unified system.<br />
            <span className="bg-gradient-to-r from-white via-text-primary to-text-muted bg-clip-text text-transparent">
              Four analytical layers.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Rather than loading isolated indicators that generate contradictory signals, AlgoFinex operates as a single coordinated system. Each layer isolates a distinct structural dimension, stacking into a clean, decisive market picture.
          </p>
        </div>

        {/* Multi-Layer System Control Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 w-full">
          <button
            onClick={() => setActiveLayerId('all')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeLayerId === 'all'
                ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                : 'bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08]'
            }`}
          >
            <Sliders className="size-4 shrink-0" />
            <span>Full Composite System (All Layers)</span>
          </button>

          {SYSTEM_LAYERS.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayerId(layer.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeLayerId === layer.id
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-brand-blue'
                  : 'bg-surface-elevated text-text-secondary hover:text-white border border-white/[0.08]'
              }`}
            >
              <span className="size-2 rounded-full" style={{ backgroundColor: layer.color }} />
              <span>{layer.number}. {layer.name}</span>
            </button>
          ))}
        </div>

        {/* Large-Scale System Architectural Showcase */}
        <div className="rounded-2xl md:rounded-3xl border border-white/[0.1] bg-[#080C14] shadow-terminal overflow-hidden grid grid-cols-1 lg:grid-cols-12 w-full min-w-0 mb-12">
          
          {/* Left Column: Visual Layer Stack Schematic (7 cols on lg) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative min-h-[460px]">
            
            {/* Schematic Top Status Strip */}
            <div className="flex items-center justify-between text-xs font-mono text-text-muted pb-4 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-signal-bull animate-pulse" />
                <span className="text-white font-bold">SYSTEM ARCHITECTURE SCHEMATIC</span>
              </div>
              <span className="text-text-dim hidden sm:inline">Modular Confluence Engine</span>
            </div>

            {/* Interactive Layer Visualizer */}
            <div className="space-y-3.5 my-auto">
              {SYSTEM_LAYERS.map((layer) => {
                const isFocused = activeLayerId === 'all' || activeLayerId === layer.id;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isFocused
                        ? 'bg-surface-elevated/90 border-white/[0.16] shadow-panel'
                        : 'bg-surface/30 border-white/[0.04] opacity-40 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="size-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0"
                        style={{ backgroundColor: `${layer.color}20`, color: layer.color, border: `1px solid ${layer.color}40` }}
                      >
                        {layer.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-display font-bold text-white tracking-tight">
                            {layer.name}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-text-dim uppercase">
                            {layer.badge}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                          {layer.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-right text-text-muted shrink-0 flex items-center sm:flex-col sm:items-end justify-between">
                      <span className="text-text-dim text-[10px]">CHART ELEMENT:</span>
                      <span className="text-white font-semibold">{layer.inChartElement}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Schematic Footer Principle */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-text-muted mt-6">
              <span>Confluence Principle:</span>
              <span className="text-text-primary">Signals validate only when all active layers agree</span>
            </div>
          </div>

          {/* Right Column: Layer Technical Inspector (5 cols on lg) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#06080E] gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayerId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider font-semibold mb-2">
                    <Eye className="size-3.5" />
                    <span>Layer {selectedLayer.number} • {selectedLayer.badge}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {activeLayerId === 'all' ? 'Unified Composite Engine' : selectedLayer.name}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mt-3">
                    {activeLayerId === 'all' 
                      ? 'The complete AlgoFinex indicator system layers market structure, resting liquidity, adaptive trend clouds, and bar-close execution confirmation into one clean charting interface.'
                      : selectedLayer.description}
                  </p>
                </div>

                {/* Core Capabilities */}
                <div className="p-4 rounded-xl bg-surface/70 border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Workflow className="size-3.5 text-brand-accent" />
                    <span>Analytical Capabilities:</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {selectedLayer.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-text-primary leading-normal">
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decision Role */}
                <div className="p-4 rounded-xl bg-surface-elevated/70 border border-white/[0.06] text-xs font-mono">
                  <div className="text-[10px] text-text-dim uppercase tracking-wider mb-1">
                    Workflow Role
                  </div>
                  <div className="text-white font-medium leading-relaxed">
                    {selectedLayer.role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-text-dim">
              Integrated indicator system. No contradictory standalone scripts.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default IndicatorSystemSection;
