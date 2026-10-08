import React, { useRef, useEffect, useCallback } from "react";

interface CurvePoint {
  readonly x: number;
  readonly price: number;
}

export interface ChartPreviewProps {
  readonly label?: string;
  readonly isHeroMain?: boolean;
}

/**
 * ChartPreview — Hero Visual Product Teaser
 * Simple, immediate, elegant product teaser for the AlgoFinex Indicator.
 * Differentiated from the interactive Product Showcase section.
 * Contains clean abstract linework and calm reference baseline without unverified claims or fake trading metrics.
 */
export const ChartPreview: React.FC<ChartPreviewProps> = ({
  label = "ALGOFINEX INDICATOR",
  isHeroMain = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const pointsRef = useRef<CurvePoint[]>([]);
  const minPriceRef = useRef<number>(0);
  const maxPriceRef = useRef<number>(0);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 920, height: 480 });

  // 1. Generate calm, organic curve for the hero teaser
  const generateCurve = useCallback(() => {
    const count = 48;
    const pts: CurvePoint[] = [];
    let current = 1000;

    const deltas: readonly number[] = [
      -3, -5, -2, 4, -3, -1, 5, 4, -1, 4,
      7, 10, 13, 16, 12, 8, 16, 20, 24, 21,
      18, 25, 29, 25, 32, 36, 40, 35, 39, 44,
      41, 48, 52, 47, 55, 60, 57, 65, 70, 66,
      73, 78, 82, 80, 87, 92, 96, 102
    ];

    for (let i = 0; i < count; i++) {
      current += deltas[i % deltas.length] * 0.7;
      pts.push({
        x: i / (count - 1),
        price: current,
      });
    }

    let min = Infinity;
    let max = -Infinity;
    for (const p of pts) {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    }
    const pad = (max - min) * 0.35;
    minPriceRef.current = min - pad;
    maxPriceRef.current = max + pad;
    pointsRef.current = pts;
  }, []);

  const getY = useCallback((price: number, height: number): number => {
    const range = maxPriceRef.current - minPriceRef.current;
    if (range <= 0) return height / 2;
    return height - ((price - minPriceRef.current) / range) * height;
  }, []);

  // 2. Render Elegant, Clean Linework (Simple, Immediate, Elegant)
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) return;

    const { width: w, height: h } = dimensionsRef.current;
    ctx.clearRect(0, 0, w, h);

    const pts = pointsRef.current;
    if (pts.length === 0) return;

    // Faint horizontal reference lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;

    for (let i = 1; i <= 3; i++) {
      const gy = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(32, gy);
      ctx.lineTo(w - 32, gy);
      ctx.stroke();
    }

    const coords = pts.map((p) => ({
      x: 32 + p.x * (w - 64),
      y: getY(p.price, h),
    }));

    // Ambient soft wash beneath price path
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.04)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
    ctx.lineTo(coords[coords.length - 1].x, h - 24);
    ctx.lineTo(coords[0].x, h - 24);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Subtle reference boundary hairlines
    const bandOffset = 36;
    ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y - bandOffset);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2 - bandOffset;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y - bandOffset, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y - bandOffset);
    ctx.stroke();

    // High Contrast Primary Price Spline
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

    // Subtle leading focal dot
    const lastCoord = coords[coords.length - 1];
    ctx.beginPath();
    ctx.arc(lastCoord.x, lastCoord.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }, [getY]);

  // 3. Resize and High-DPI Canvas Setup
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

      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
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

  return (
    <div
      className={`product-preview-frame ${isHeroMain ? "hero-visual-artifact" : ""}`}
      role="img"
      aria-label="AlgoFinex indicator preview showing clean market path and reference baseline"
    >
      {/* Top Chrome: Simple and restrained */}
      <div className="preview-header">
        <div className="preview-header-left">
          <span className="app-status-dot" aria-hidden="true" />
          <span className="preview-label">{label}</span>
        </div>

        <div className="preview-header-right">
          <span className="preview-tag">PRODUCT PREVIEW</span>
        </div>
      </div>

      {/* Main Canvas Teaser */}
      <div className="preview-canvas-wrap" ref={containerRef}>
        <canvas className="preview-canvas" ref={canvasRef} />
        <div className="preview-edge-mask" aria-hidden="true" />
      </div>

      {/* Calm Dock Caption */}
      <div className="preview-footer-dock">
        <div className="preview-dock-meta">
          <span className="preview-dock-label">ANALYTICAL OVERLAY</span>
        </div>
        <div className="preview-dock-status">
          <span className="preview-coord-caption">TRADINGVIEW COMPATIBLE</span>
        </div>
      </div>
    </div>
  );
};
