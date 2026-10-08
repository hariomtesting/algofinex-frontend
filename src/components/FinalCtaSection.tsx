import React from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface FinalCtaSectionProps {
  readonly onExploreClick: () => void;
  readonly onSessionClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onExploreClick,
  onSessionClick,
}) => {
  return (
    <section className="section-final-cta" aria-labelledby="final-cta-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="final-cta-card">
            {/* Subtle background surface depth */}
            <div className="final-cta-decor" aria-hidden="true" />

            <div className="section-label">
              <span>GET STARTED</span>
            </div>

            <h2 className="final-cta-title" id="final-cta-heading">
              READY TO EXPLORE<br />
              <span className="final-cta-brand-glow">ALGOFINEX?</span>
            </h2>

            <p className="final-cta-subhead">
              Approach market analysis with clarity, structured habits, and disciplined risk awareness.
            </p>

            <div className="final-cta-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                id="btn-final-explore"
                onClick={onExploreClick}
              >
                <span>Explore Indicator</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                id="btn-final-session"
                onClick={onSessionClick}
              >
                <span>Join 3-Day Session</span>
              </button>
            </div>

            <div className="final-cta-specs font-mono text-xs" aria-hidden="true">
              <span>TRADINGVIEW COMPATIBLE</span>
              <span className="specs-dot">·</span>
              <span>DIRECT DESK SUPPORT</span>
              <span className="specs-dot">·</span>
              <span>RESTRICTED COHORTS</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
