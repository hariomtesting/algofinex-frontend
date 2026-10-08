import React, { useEffect, useRef, useState } from "react";

export interface BlurTextProps {
  readonly text: string;
  readonly delay?: number;
  readonly duration?: number;
  readonly blurAmount?: number;
  readonly animateBy?: "words" | "letters";
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly onAnimationComplete?: () => void;
}

/**
 * BlurText — React Bits Typography Component (TS + CSS variant)
 * Soft-focus text reveal transitioning from blur to crisp editorial focus.
 * Performance characteristics:
 * - Runs strictly once upon entering the viewport
 * - No continuous JavaScript animation loops or requestAnimationFrame overhead
 * - Hardware-accelerated transitions (filter, opacity, transform)
 * - Complete style cleanup to native sharp typography upon completion
 * - Immediate full visibility when prefers-reduced-motion is active
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  duration = 0.38,
  blurAmount = 5,
  animateBy = "words",
  className = "",
  style,
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const ref = useRef<HTMLHeadingElement | HTMLSpanElement | null>(null);

  useEffect(() => {
    // Immediate presentation if reduced motion is requested
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setInView(true);
      setIsCompleted(true);
      if (onAnimationComplete) onAnimationComplete();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [onAnimationComplete]);

  // Clean up animation styles after all words finish to guarantee razor-sharp text
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const totalDurationMs = elements.length * delay + duration * 1000;

  useEffect(() => {
    if (!inView || isCompleted) return undefined;

    const timer = window.setTimeout(() => {
      setIsCompleted(true);
      if (onAnimationComplete) onAnimationComplete();
    }, totalDurationMs);

    return () => window.clearTimeout(timer);
  }, [inView, isCompleted, totalDurationMs, onAnimationComplete]);

  return (
    <span
      ref={ref}
      className={`blur-text-wrapper ${className}`}
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      {elements.map((element, index) => {
        const transitionDelay = `${index * delay}ms`;

        // If completed, strip filters completely to preserve optimal subpixel font rendering
        const elementStyle: React.CSSProperties = isCompleted
          ? {
              display: "inline-block",
              marginRight: animateBy === "words" ? "0.28em" : "0",
            }
          : {
              display: "inline-block",
              willChange: "transform, filter, opacity",
              filter: inView ? "blur(0px)" : `blur(${blurAmount}px)`,
              opacity: inView ? 1 : 0,
              transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 4px, 0)",
              transition: `filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay},
                           opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay},
                           transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}`,
              marginRight: animateBy === "words" ? "0.28em" : "0",
            };

        return (
          <span
            key={`${element}-${index}`}
            className="blur-text-element"
            style={elementStyle}
          >
            {element === " " ? "\u00A0" : element}
          </span>
        );
      })}
    </span>
  );
};
