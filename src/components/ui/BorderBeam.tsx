import React from 'react';

interface BorderBeamProps {
  className?: string;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  duration = 7,
  borderWidth = 1.5,
  colorFrom = '#00F090',
  colorTo = '#00E5FF',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] z-20 overflow-hidden ${className}`}
      style={{
        padding: `${borderWidth}px`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
      }}
    >
      <div
        className="absolute inset-[-150%] animate-spin pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${colorFrom} 325deg, ${colorTo} 360deg)`,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      />
    </div>
  );
};

export default BorderBeam;
