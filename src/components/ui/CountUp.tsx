import React, { useEffect, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from,
  duration = 0.9,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  // Start with target value so SSR and quick renders never show 0 or an arbitrary low number
  const [count, setCount] = useState(to);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(to);
      return;
    }

    const startVal = from !== undefined ? from : Math.max(0, to - (decimals > 0 ? 15 : 800));
    setCount(startVal);

    let start = startVal;
    const end = to;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const easeOutCubic = (t: number) => --t * t * t + 1;

    const counter = () => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      const current = start + (end - start) * progress;

      setCount(current);

      if (frame < totalFrames) {
        requestAnimationFrame(counter);
      } else {
        setCount(end);
      }
    };

    const animId = requestAnimationFrame(counter);
    return () => cancelAnimationFrame(animId);
  }, [to, from, duration, decimals]);

  const formattedNumber = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

export default CountUp;
