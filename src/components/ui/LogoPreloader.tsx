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
          className="fixed inset-0 z-[9999] bg-[#080A0D] flex flex-col items-center justify-center p-6 select-none cursor-pointer overflow-hidden"
        >
          {/* Ambient Radial Core Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#C8A96B]/10 via-[#6FAF8A]/10 to-transparent rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-financial-grid opacity-40" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-7">
            {/* Concentric Rotating Reticle + Logo Mark */}
            <div className="relative flex items-center justify-center">
              {/* Outer Slow Rotating Dotted Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute size-28 rounded-full border border-dashed border-[#C8A96B]/20 pointer-events-none"
              />

              {/* Middle Pulsing Ring */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute size-24 rounded-full border border-[#20252C] pointer-events-none"
              />

              {/* Logo Emblem Box */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="size-16 rounded-2xl bg-[#101318] border border-[#C8A96B]/40 flex items-center justify-center shadow-[0_0_30px_rgba(200,169,107,0.2)] relative overflow-hidden"
              >
                {/* Internal subtle shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A96B]/10 to-transparent pointer-events-none" />

                {/* Animated Logo SVG */}
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  {/* Grid Lines */}
                  <line
                    x1="3"
                    y1="20"
                    x2="21"
                    y2="20"
                    stroke="#C8A96B"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                  <line
                    x1="4"
                    y1="20"
                    x2="4"
                    y2="4"
                    stroke="#C8A96B"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                  {/* Animated Trajectory Path */}
                  <motion.path
                    d="M4 17L11 10L15 14L20 6"
                    stroke="#6FAF8A"
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
                    fill="#C8A96B"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1">
              <div className="font-display font-extrabold text-[#F3F4F6] text-xl tracking-tight flex items-center justify-center gap-1">
                <span>Algo</span>
                <span className="text-[#C8A96B]">Finex</span>
                <span className="size-1.5 rounded-full bg-[#C8A96B] ml-0.5" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B929C]">
                Institutional Quant Workstation
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              <div className="h-1.5 w-full bg-[#101318] rounded-full overflow-hidden border border-[#20252C] relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C8A96B] to-[#6FAF8A] rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glowing Leading Head */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px] opacity-80" />
                </motion.div>
              </div>

              {/* Telemetry Status Strip */}
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#8B929C] truncate max-w-[240px] text-left">
                  {statusText}
                </span>
                <span className="text-[#C8A96B] font-bold shrink-0">{progress}%</span>
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
