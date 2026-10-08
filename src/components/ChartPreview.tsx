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
 * ChartPreview — Proprietary Product Visual Artifact
 * Clean, restrained, architectural product visualization.
 * No telemetry badge, no trading terminal clutter, no fake prices or fake trades.
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
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 880, height: 480 });

  // 1. Generate organic, calm market curve
  const generateCurve = useCallback(() => {
    const count = 48;
    const pts: CurvePoint[] = [];
    let current = 1000;

    const deltas: readonly number[] = [
      -4, -7, -2, 3, -5, -3, 6, 4, -2, 5,
      9, 12, 15, 18, 14, 10, 19, 23, 27, 24,
      21, 29, 32, 28, 36, 39, 43, 37, 42, 47,
      44, 52, 56, 51, 60, 64, 61, 70, 75, 71,
      78, 83, 87, 84, 92, 97, 101, 106,
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
    // Generous negative space (35% vertical padding)
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

  // 2. Render Canvas Linework
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) return;

    const { width: w, height: h } = dimensionsRef.current;
    ctx.clearRect(0, 0, w, h);

    const pts = pointsRef.current;
    if (pts.length === 0) return;

    // 1. Subtle, restrained horizontal reference gridlines (no numeric axis spam)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;

    for (let i = 1; i <= 3; i++) {
      const gy = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    const coords = pts.map((p) => ({
      x: p.x * w,
      y: getY(p.price, h),
    }));

    // 2. Proprietary Reference Envelope (Restrained Upper & Lower Bounds)
    const bandOffset = 36;

    // Upper boundary line
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y - bandOffset);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2 - bandOffset;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y - bandOffset, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y - bandOffset);

    // Lower boundary reverse for fill
    for (let i = coords.length - 1; i >= 0; i--) {
      ctx.lineTo(coords[i].x, coords[i].y + bandOffset);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(16, 185, 129, 0.02)";
    ctx.fill();

    // Upper boundary hairline (subtle emerald reference)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.16)";
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

    // Lower boundary hairline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y + bandOffset);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2 + bandOffset;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y + bandOffset, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y + bandOffset);
    ctx.stroke();

    // 3. Subtle ambient wash beneath price path
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.035)");
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

    // 4. Main Price Spline (High Contrast, Crisp Linework)
    ctx.strokeStyle = "rgba(243, 244, 246, 0.92)";
    ctx.lineWidth = 1.75;
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
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
      const w = rect.width || 880;
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
      aria-label="AlgoFinex indicator preview showing clean market path and reference bounds"
    >
      <div className="preview-header">
        <span className="preview-label">{label}</span>
        <span className="preview-tag">PRODUCT PREVIEW</span>
      </div>

      <div className="preview-canvas-wrap" ref={containerRef}>
        <canvas className="preview-canvas" ref={canvasRef} />
      </div>
    </div>
  );
};
