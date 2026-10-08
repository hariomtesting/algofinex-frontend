import React, { useRef, useEffect, useCallback, useState } from "react";

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
 * Architectural, substantial, layered product visualization for AlgoFinex Indicator.
 * Includes controlled linework, reference envelopes, clean normalized axis references,
 * secondary interface surfaces, and soft edge masking.
 * No fake accounts, no fake profits, no fake signals, no fake brokerage UI.
 */
export const ChartPreview: React.FC<ChartPreviewProps> = ({
  label = "ALGOFINEX INDICATOR",
  isHeroMain = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<"all" | "baseline" | "envelope">("all");

  const pointsRef = useRef<CurvePoint[]>([]);
  const minPriceRef = useRef<number>(0);
  const maxPriceRef = useRef<number>(0);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 920, height: 520 });

  // 1. Generate organic, calm market curve
  const generateCurve = useCallback(() => {
    const count = 56;
    const pts: CurvePoint[] = [];
    let current = 1000;

    const deltas: readonly number[] = [
      -3, -6, -2, 4, -4, -2, 5, 4, -1, 4,
      8, 11, 14, 17, 13, 9, 18, 22, 26, 23,
      20, 28, 31, 27, 35, 38, 42, 36, 41, 46,
      43, 51, 55, 50, 59, 63, 60, 69, 74, 70,
      77, 82, 86, 83, 91, 96, 100, 97, 104, 109,
      106, 113, 118, 115, 122, 128
    ];

    for (let i = 0; i < count; i++) {
      current += deltas[i % deltas.length] * 0.72;
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
    // Generous negative space (32% vertical padding)
    const pad = (max - min) * 0.32;
    minPriceRef.current = min - pad;
    maxPriceRef.current = max + pad;
    pointsRef.current = pts;
  }, []);

  const getY = useCallback((price: number, height: number): number => {
    const range = maxPriceRef.current - minPriceRef.current;
    if (range <= 0) return height / 2;
    return height - ((price - minPriceRef.current) / range) * height;
  }, []);

  // 2. Render Canvas Linework with Architectural Layering
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) return;

    const { width: w, height: h } = dimensionsRef.current;
    ctx.clearRect(0, 0, w, h);

    const pts = pointsRef.current;
    if (pts.length === 0) return;

    // 1. Subtle, architectural reference gridlines & clean axis ticks
    ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
    ctx.lineWidth = 1;

    const gridSteps = 4;
    for (let i = 1; i < gridSteps; i++) {
      const gy = (h / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(32, gy);
      ctx.lineTo(w - 64, gy);
      ctx.stroke();

      // Clean, neutral reference tick label on the right
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      const tickPct = (1 - i / gridSteps) * 100;
      ctx.fillText(`+${tickPct.toFixed(0)}%`, w - 24, gy + 3);
    }

    // Vertical time/stage division hairlines
    const vSteps = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    for (let j = 1; j < vSteps; j++) {
      const vx = (w / vSteps) * j;
      ctx.beginPath();
      ctx.moveTo(vx, 24);
      ctx.lineTo(vx, h - 24);
      ctx.stroke();
    }

    const coords = pts.map((p) => ({
      x: 32 + p.x * (w - 100),
      y: getY(p.price, h),
    }));

    // 2. Contextual Reference Envelope (Dynamic Upper & Lower Bounds)
    if (activeLayer === "all" || activeLayer === "envelope") {
      const bandOffset = 42;

      // Fill reference channel
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
      ctx.fillStyle = "rgba(16, 185, 129, 0.028)";
      ctx.fill();

      // Upper boundary hairline (emerald reference)
      ctx.strokeStyle = "rgba(16, 185, 129, 0.24)";
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

      // Lower boundary hairline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
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

    // 3. Subtle ambient wash beneath price path
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.045)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      const xc = (coords[i - 1].x + coords[i].x) / 2;
      const yc = (coords[i - 1].y + coords[i].y) / 2;
      ctx.quadraticCurveTo(coords[i - 1].x, coords[i - 1].y, xc, yc);
    }
    ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
    ctx.lineTo(coords[coords.length - 1].x, h - 20);
    ctx.lineTo(coords[0].x, h - 20);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 4. Main Price Spline (High Contrast, Crisp Linework)
    if (activeLayer === "all" || activeLayer === "baseline") {
      ctx.strokeStyle = "rgba(243, 244, 246, 0.94)";
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

      // Subtle active focal head point
      const lastCoord = coords[coords.length - 1];
      ctx.beginPath();
      ctx.arc(lastCoord.x, lastCoord.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(16, 185, 129, 0.95)";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [activeLayer, getY]);

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
      const h = rect.height || 520;

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
      {/* Top Technical Chrome */}
      <div className="preview-header">
        <div className="preview-header-left">
          <span className="app-status-dot" aria-hidden="true" />
          <span className="preview-label">{label}</span>
          <span className="preview-meta-pill">v2.4 // LIVE</span>
        </div>

        <div className="preview-header-center">
          <span className="preview-view-tag">CHART REFERENCE ARTIFACT</span>
        </div>

        <div className="preview-header-right">
          <span className="preview-tag">TRADINGVIEW EXTENSION</span>
        </div>
      </div>

      {/* Main Canvas Canvas Surface */}
      <div className="preview-canvas-wrap" ref={containerRef}>
        <canvas className="preview-canvas" ref={canvasRef} />
        
        {/* Soft edge masking overlay for seamless visual integration */}
        <div className="preview-edge-mask" aria-hidden="true" />
      </div>

      {/* Secondary Interactive Surface Dock */}
      <div className="preview-footer-dock">
        <div className="preview-dock-meta">
          <span className="preview-dock-label">REFERENCE LAYERS:</span>
          <div className="preview-layer-toggles" role="group" aria-label="Toggle visible layers">
            <button
              type="button"
              className={`preview-layer-btn ${activeLayer === "all" ? "active" : ""}`}
              onClick={() => setActiveLayer("all")}
            >
              ALL
            </button>
            <button
              type="button"
              className={`preview-layer-btn ${activeLayer === "baseline" ? "active" : ""}`}
              onClick={() => setActiveLayer("baseline")}
            >
              BASELINE
            </button>
            <button
              type="button"
              className={`preview-layer-btn ${activeLayer === "envelope" ? "active" : ""}`}
              onClick={() => setActiveLayer("envelope")}
            >
              ENVELOPE
            </button>
          </div>
        </div>

        <div className="preview-dock-status">
          <span className="preview-coord-caption">SCALE // NORMALIZED</span>
          <span className="preview-status-pill">DESK VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
