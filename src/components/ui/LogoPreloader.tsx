import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoPreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // ms
}

export const LogoPreloader: React.FC<LogoPreloaderProps> = ({
  onComplete,
  minDuration = 1400,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING VELA QUANT ENGINE...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText('INITIALIZING VELA QUANT ENGINE v4.2...');
      } else if (pct < 65) {
        setStatusText('CONNECTING TO INSTITUTIONAL FEED (11ms)...');
      } else if (pct < 90) {
        setStatusText('CALIBRATING 4-STRATA MARKET GEOMETRY...');
      } else {
        setStatusText('SYSTEM ONLINE · WORKSTATION READY');
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] bg-[#05080E] flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden"
        >
          {/* Ambient Radial Core Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-transparent rounded-full blur-[140px] animate-pulse" />
            <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-7">
            {/* Concentric Rotating Reticle + Logo Mark */}
            <div className="relative flex items-center justify-center">
              {/* Outer Slow Rotating Dotted Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute size-28 rounded-full border border-dashed border-emerald-500/25 pointer-events-none"
              />

              {/* Middle Pulsing Ring */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute size-24 rounded-full border border-cyan-500/30 pointer-events-none"
              />

              {/* Logo Emblem Box */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="size-16 rounded-2xl bg-[#0A0E1A] border border-emerald-500/40 flex items-center justify-center shadow-[0_0_35px_rgba(0,240,144,0.35)] relative overflow-hidden"
              >
                {/* Internal gradient shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 to-cyan-500/10 pointer-events-none" />

                {/* Animated Logo SVG */}
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  {/* Grid Lines */}
                  <line
                    x1="3"
                    y1="20"
                    x2="21"
                    y2="20"
                    stroke="#00F090"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                  <line
                    x1="4"
                    y1="20"
                    x2="4"
                    y2="4"
                    stroke="#00F090"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                  {/* Animated Trajectory Path */}
                  <motion.path
                    d="M4 17L11 10L15 14L20 6"
                    stroke="#00F090"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                  {/* Beacon Node */}
                  <motion.circle
                    cx="20"
                    cy="6"
                    r="2.5"
                    fill="#00E5FF"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1">
              <div className="font-display font-extrabold text-white text-xl tracking-tight flex items-center justify-center gap-1">
                <span>Algo</span>
                <span className="text-[#00F090]">Finex</span>
                <span className="size-1.5 rounded-full bg-[#00F090] animate-ping ml-0.5" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
                Institutional Quant Workstation
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              <div className="h-1.5 w-full bg-[#0E1528] rounded-full overflow-hidden border border-white/10 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F090] to-[#00E5FF] rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glowing Leading Head */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px] opacity-80" />
                </motion.div>
              </div>

              {/* Telemetry Status Strip */}
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 truncate max-w-[240px] text-left">
                  {statusText}
                </span>
                <span className="text-[#00F090] font-bold shrink-0">{progress}%</span>
              </div>
            </div>

            {/* Skip hint */}
            <div className="text-[10px] font-mono text-slate-600 hover:text-slate-400 transition-colors pt-2">
              CLICK ANYWHERE TO ENTER IMMEDIATELY
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoPreloader;
