import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.5,
  borderColor = 'rgba(255, 255, 255, 0.05)',
  squareSize = 44,
  hoverFillColor = 'rgba(0, 240, 144, 0.14)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number; alpha: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        const startX = Math.floor((mouseX - (gridOffset.current.x % squareSize)) / squareSize);
        const startY = Math.floor((mouseY - (gridOffset.current.y % squareSize)) / squareSize);

        hoveredSquare.current = { x: startX, y: startY, alpha: 1.0 };
      } else {
        hoveredSquare.current = null;
      }
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update offset for living ambient drift
      if (speed > 0) {
        switch (direction) {
          case 'right':
            gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
            break;
          case 'left':
            gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize;
            break;
          case 'up':
            gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize;
            break;
          case 'down':
            gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
            break;
          case 'diagonal':
            gridOffset.current.x = (gridOffset.current.x + speed * 0.7) % squareSize;
            gridOffset.current.y = (gridOffset.current.y + speed * 0.7) % squareSize;
            break;
        }
      }

      const offsetX = gridOffset.current.x % squareSize;
      const offsetY = gridOffset.current.y % squareSize;

      const numCols = Math.ceil(width / squareSize) + 2;
      const numRows = Math.ceil(height / squareSize) + 2;

      // Draw hovered active cell highlight with smooth phosphor decay
      if (hoveredSquare.current) {
        const { x, y, alpha } = hoveredSquare.current;
        const cellX = x * squareSize + offsetX;
        const cellY = y * squareSize + offsetY;

        ctx.save();
        ctx.fillStyle = hoverFillColor;
        ctx.globalAlpha = alpha;
        ctx.fillRect(cellX, cellY, squareSize, squareSize);

        // Subtly highlight adjacent neighbor cells like quant phosphor bleeding
        ctx.globalAlpha = alpha * 0.35;
        ctx.fillRect(cellX - squareSize, cellY, squareSize, squareSize);
        ctx.fillRect(cellX + squareSize, cellY, squareSize, squareSize);
        ctx.fillRect(cellX, cellY - squareSize, squareSize, squareSize);
        ctx.fillRect(cellX, cellY + squareSize, squareSize, squareSize);
        ctx.restore();

        // Decay alpha
        hoveredSquare.current.alpha = Math.max(0, alpha - 0.025);
        if (hoveredSquare.current.alpha <= 0) {
          hoveredSquare.current = null;
        }
      }

      // Draw grid lines
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = -1; i <= numCols; i++) {
        const xPos = i * squareSize + offsetX;
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height);
      }

      for (let j = -1; j <= numRows; j++) {
        const yPos = j * squareSize + offsetY;
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
      }

      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none select-none ${className}`}
      style={{ display: 'block' }}
    />
  );
};

export default Squares;
