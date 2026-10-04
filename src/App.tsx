import React from 'react';
import { Navbar } from './components/marketing/Navbar';
import { Hero } from './components/marketing/Hero';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-brand-blue/30 selection:text-white flex flex-col justify-between">
      {/* Top Persistent Navigation */}
      <Navbar />

      {/* Main Hero Phase 1 Viewport */}
      <main className="flex-1">
        <Hero />
      </main>

      {/* Phase 1 Review Footer Bar */}
      <footer className="border-t border-white/[0.08] bg-canvas/80 py-6 px-5 sm:px-8 text-center text-xs font-mono text-text-muted">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-blue" />
            <span className="font-semibold text-text-secondary">ALGOFINEX ENGINE</span>
            <span>• Phase 1 Hero Prototype</span>
          </div>
          <div>
            Built with React, TypeScript, Tailwind CSS &amp; Framer Motion
          </div>
          <div className="text-text-dim text-[11px]">
            Strict Non-Repainting Logic • Simulated Market Structure
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
