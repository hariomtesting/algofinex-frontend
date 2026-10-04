import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  characters?: string;
  animateOnHover?: boolean;
}

const DEFAULT_CHARS = '0123456789ABCDEF$#@%&<>~[]_';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 8,
  className = '',
  characters = DEFAULT_CHARS,
  animateOnHover = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = () => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    iterationRef.current = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < Math.floor(iterationRef.current)) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iterationRef.current += 1 / (maxIterations / text.length);

      if (iterationRef.current >= text.length) {
        setDisplayText(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOnHover && !isHovered) {
      setIsHovered(true);
      startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOnHover) {
      setIsHovered(false);
    }
  };

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
