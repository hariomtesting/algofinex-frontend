import React from "react";

export interface GridBackgroundProps {
  readonly size?: number;
}

/**
 * GridBackground — React Bits Ambient Environmental Background
 * Subtle coordinate grid with soft ambient radial illumination concentrated around hero/product area.
 * Quiets down progressively down the page.
 */
export const GridBackground: React.FC<GridBackgroundProps> = ({
  size = 56,
}) => {
  return (
    <>
      {/* Environmental Coordinate Grid with Concentrated Hero Mask */}
      <div
        className="ambient-grid-background"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          maskImage: "radial-gradient(ellipse 75% 45% at 50% 15%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 45% at 50% 15%, black 10%, transparent 75%)",
        }}
      />

      {/* Soft, Restrained Radial Illumination Behind Hero/Product */}
      <div
        className="ambient-hero-glow"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-12%",
          right: "0%",
          width: "65vw",
          height: "60vh",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.025) 0%, rgba(255, 255, 255, 0.008) 35%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </>
  );
};
