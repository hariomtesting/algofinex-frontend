import React, { useState, useRef, useEffect, useCallback } from "react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SpotlightCard } from "./ui/SpotlightCard";

type ShowcaseMode = "view" | "interpret" | "decide";

interface ModeDetail {
  readonly id: ShowcaseMode;
  readonly label: string;
  readonly tagline: string;
  readonly description: string;
  readonly highlightKey: string;
}

const MODES: readonly ModeDetail[] = [
  {
    id: "view",
    label: "01 / VIEW",
    tagline: "Market View",
    description: "A clean price path and reference baseline designed to help organize market information directly on the chart.",
    highlightKey: "Baseline Reference",
  },
  {
    id: "interpret",
    label: "02 / INTERPRET",
    tagline: "Context",
    description: "Chart-based references for interpreting changing market conditions.",
    highlightKey: "Reference Bands",
  },
  {
    id: "decide",
    label: "03 / DECIDE",
    tagline: "Decision Process",
    description: "Designed to support a more structured approach to chart analysis.",
    highlightKey: "Chart Reference Markers",
  },
];

interface Point {
  readonly x: number;
  readonly price: number;
}

export interface ProductShowcaseSectionProps {
  readonly onExploreClick?: () => void;
  readonly onOpenIndicator?: () => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  onExploreClick,
  onOpenIndicator,
}) => {
  const handleAction = onExploreClick || onOpenIndicator || (() => {});
  const [activeMode, setActiveMode] = useState<ShowcaseMode>("interpret");
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number; priceNorm: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 920, height: 480 });

  // Generate reference market curve
  const generateCurve = useCallback(() => {
    const count = 52;
    const pts: Point[] = [];
    let current = 1000;

    const deltas = [
      -3, -6, -2, 4, -4, -1, 5, 3, -1, 4,
      8, 11, 14, 16, 12, 9, 17, 21, 24, 22,
      19, 26, 30, 27, 34, 38, 41, 36, 40, 45,
      42, 49, 53, 48, 57, 61, 59, 67, 72, 69,
      76, 80, 84, 82, 89, 94, 98, 102, 100, 105, 110, 114
    ];

    for (let i = 0; i < count; i++) {
      current += deltas[i % deltas.length] * 0.75;
      pts.push({
        x: i / (count - 1),
        price: current,
      });
    }

    pointsRef.current = pts;
  }, []);

  // Draw chart based on active mode
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: w, height: h } = dimensionsRef.current;
    ctx.clearRect(0, 0, w, h);

    const pts = pointsRef.current;
    if (pts.length === 0) return;

    let min = Infinity;
    let max = -Infinity;
    for (const p of pts) {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    }
    const pad = (max - min) * 0.35;
    const minP = min - pad;
    const maxP = max + pad;

    const getY = (price: number) => {
      const range = maxP - minP;
      if (range <= 0) return h / 2;
      return h - ((price - minP) / range) * h;
    };

    // 1. Gridlines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const gy = (h / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    const coords = pts.map((p) => ({
      x: p.x * w,
      y: getY(p.price),
    }));

    // 2. Reference Bands (Visible in "interpret" & "decide" modes)
    if (activeMode === "interpret" || activeMode === "decide") {
      const bandOffset = 38;

      // Fill envelope
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y - bandOffset);
      for (let i = 1; i < coords.length; i++) {
        const xc = (coords[i - 1].x + coords[i].x) / 2;
        const yc = (coords[i - 1].y + coords[i].y) / 2 - bandOffset;
        ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y - bandOffset, xc, yc);
      }
      ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y - bandOffset);

      for (let i = coords.length - 1; i >= 0; i--) {
        ctx.lineTo(coords[i].x, coords[i].y + bandOffset);
      }
      ctx.closePath();
      ctx.fillStyle = activeMode === "interpret" ? "rgba(16, 185, 129, 0.035)" : "rgba(16, 185, 129, 0.015)";
      ctx.fill();

      // Upper Envelope line
      ctx.strokeStyle = activeMode === "interpret" ? "rgba(16, 185, 129, 0.28)" : "rgba(16, 185, 129, 0.12)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y - bandOffset);
      for (let i = 1; i < coords.length; i++) {
        const xc = (coords[i - 1].x + coords[i].x) / 2;
        const yc = (coords[i - 1].y + coords[i].y) / 2 - bandOffset;
        ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y - bandOffset, xc, yc);
      }
      ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y - bandOffset);
      ctx.stroke();

      // Lower Envelope line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y + bandOffset);
      for (let i = 1; i < coords.length; i++) {
        const xc = (coords[i - 1].x + coords[i].x) / 2;
        const yc = (coords[i - 1].y + coords[i].y) / 2 + bandOffset;
        ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y + bandOffset, xc, yc);
      }
      ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y + bandOffset);
      ctx.stroke();
    }

    // 3. Reference Markers (Visible in "decide" mode)
    if (activeMode === "decide") {
      const referenceIndexes = [14, 28, 44];
      ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      referenceIndexes.forEach((idx) => {
        if (coords[idx]) {
          const pt = coords[idx];
          // Horizontal reference axis
          ctx.beginPath();
          ctx.moveTo(pt.x - 28, pt.y);
          ctx.lineTo(pt.x + 28, pt.y);
          ctx.stroke();

          // Circular reference point
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.setLineDash([4, 4]);
        }
      });
      ctx.setLineDash([]);
    }

    // 4. Ambient Price Spline Wash
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 5. Main Price Spline
    ctx.strokeStyle = "rgba(243, 244, 246, 0.95)";
    ctx.lineWidth = 1.85;
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
    ctx.stroke();

    // 6. Interactive Cursor Overlay
    if (hoverCoord) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(hoverCoord.x, 0);
      ctx.lineTo(hoverCoord.x, h);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, hoverCoord.y);
      ctx.lineTo(w, hoverCoord.y);
      ctx.stroke();

      ctx.setLineDash([]);
      // Focal point
      ctx.beginPath();
      ctx.arc(hoverCoord.x, hoverCoord.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "var(--color-accent)";
      ctx.fill();
    }
  }, [activeMode, hoverCoord]);

  // Setup Canvas and resize handler
  useEffect(() => {
    generateCurve();

    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width || 920;
      const h = rect.height || 480;

      dimensionsRef.current = { width: w, height: h };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
      draw();
    };

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [generateCurve, draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const priceNorm = 1 - y / rect.height;
    setHoverCoord({ x, y, priceNorm });
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
  };

  const currentModeDetail = MODES.find((m) => m.id === activeMode) || MODES[0];

  return (
    <section className="section-showcase" id="showcase" aria-labelledby="showcase-title">
      <div className="container">
        <ScrollReveal distance={8}>
          {/* Header */}
          <div className="showcase-header">
            <div className="section-label">
              <span>02 / PRODUCT SHOWCASE</span>
            </div>
            <div className="showcase-header-grid">
              <div>
                <h2 className="showcase-title" id="showcase-title">
                  ALGOFINEX INDICATOR
                </h2>
                <p className="showcase-subtitle">
                  A native TradingView analytical overlay designed to bring calm, visual clarity to market interpretation.
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="showcase-mode-switcher" role="tablist" aria-label="Product Showcase Mode">
                {MODES.map((mode) => {
                  const isActive = activeMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`showcase-mode-btn ${isActive ? "active" : ""}`}
                      onClick={() => setActiveMode(mode.id)}
                    >
                      <span className="mode-btn-label">{mode.label}</span>
                      <span className="mode-btn-tagline">{mode.tagline}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Large Visual Product Showcase Artifact */}
          <div className="showcase-artifact-wrap">
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.05)"
              spotlightRadius={540}
              className="showcase-card"
            >
              <div className="showcase-preview-frame">
                {/* Artifact Top Bar */}
                <div className="showcase-topbar">
                  <div className="showcase-status-pill">
                    <span className="app-status-dot" aria-hidden="true" />
                    <span className="showcase-status-text">ALGOFINEX INDICATOR</span>
                  </div>

                  <div className="showcase-mode-indicator">
                    <span className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>ACTIVE LAYER:</span>
                    <span className="showcase-active-layer-tag font-mono text-xs">{currentModeDetail.highlightKey}</span>
                  </div>

                  <span className="showcase-disclaimer-tag">PRODUCT PREVIEW</span>
                </div>

                {/* Canvas Render Area */}
                <div
                  className="showcase-canvas-wrap"
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <canvas className="showcase-canvas" ref={canvasRef} />

                  {/* Dynamic Coordinate Tag */}
                  {hoverCoord && (
                    <div
                      className="showcase-coord-tag font-mono text-xs"
                      style={{
                        position: "absolute",
                        left: `${Math.min(hoverCoord.x + 12, dimensionsRef.current.width - 120)}px`,
                        top: `${Math.max(hoverCoord.y - 28, 12)}px`,
                        pointerEvents: "none",
                      }}
                    >
                      REF POINT {hoverCoord.priceNorm.toFixed(3)}
                    </div>
                  )}
                </div>

                {/* Artifact Bottom Details */}
                <div className="showcase-bottom-meta">
                  <div className="showcase-mode-desc">
                    <span className="showcase-desc-title">{currentModeDetail.tagline}</span>
                    <p className="showcase-desc-text">{currentModeDetail.description}</p>
                  </div>

                  <div className="showcase-action">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={handleAction}
                    >
                      <span>Explore Indicator</span>
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
