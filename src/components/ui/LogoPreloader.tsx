import React from 'react';

interface LogoPreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const LogoPreloader: React.FC<LogoPreloaderProps> = () => {
  // Snappy instant load without blocking preloader
  return null;
};

export default LogoPreloader;
