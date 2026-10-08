import React, { useRef, useState, useCallback } from "react";

export interface SpotlightCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly spotlightColor?: string;
  readonly spotlightRadius?: number;
  readonly style?: React.CSSProperties;
}

/**
 * SpotlightCard — React Bits Interactive Surface Component (TS + CSS variant)
 * Soft, cursor-reactive radial luminescence that tracks movement across borders and surfaces.
 * Performance characteristics:
 * - Event-driven mouse tracking without requestAnimationFrame or tick loops
 * - Zero expensive idle rendering or continuous state cycles
 * - Hardware-accelerated opacity transition on entry and exit
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.035)",
  spotlightRadius = 380,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`spotlight-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Ambient Cursor Spotlight Layer */}
      <div
        className="spotlight-radial-overlay"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity,
          transition: "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          background: `radial-gradient(${spotlightRadius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};
