import React from "react";

/**
 * AlgoFinex — Restrained Suspense Fallback
 * Minimal, accessible route loading state.
 * No large decorative animations or heavy layout shifts.
 */
export const RouteSuspenseFallback: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: "45vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-8)",
        color: "var(--color-text-muted)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          fontSize: "0.8125rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--color-accent)",
            opacity: 0.85,
          }}
          aria-hidden="true"
        />
        <span>Loading workspace...</span>
      </div>
    </div>
  );
};
