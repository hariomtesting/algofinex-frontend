import React, { useEffect, useRef, useState } from "react";

export interface ScrollRevealProps {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly distance?: number;
  readonly duration?: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

/**
 * ScrollReveal — React Bits / Motion Primitives Scroll Pattern (TS + CSS variant)
 * Cohesive, subtle scroll-driven entrance choreography with zero layout shift.
 * Performance characteristics:
 * - Uses native IntersectionObserver; unobserves immediately upon entering viewport
 * - No scroll event polling or continuous calculation
 * - Hardware-accelerated transform & opacity transitions
 * - Instant full presentation when prefers-reduced-motion is active
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  distance = 6,
  duration = 0.45,
  className = "",
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-container ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : `translate3d(0, ${distance}px, 0)`,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                     transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
