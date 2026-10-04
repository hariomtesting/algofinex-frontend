import React from 'react';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  duration?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.55)',
  duration = '3.5s',
}) => {
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, transparent 20%, ${shimmerColor} 50%, transparent 80%)`,
        backgroundSize: '200% 100%',
        animation: `shimmer-text ${duration} infinite linear`,
        WebkitBackgroundClip: 'text',
      }}
    >
      <style>{`
        @keyframes shimmer-text {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {children}
    </span>
  );
};

export default ShinyText;
