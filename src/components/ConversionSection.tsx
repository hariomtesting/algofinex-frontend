import React from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface ConversionSectionProps {
  readonly onOpenIndicator: () => void;
  readonly onOpenSession: () => void;
}

export const ConversionSection: React.FC<ConversionSectionProps> = ({
  onOpenIndicator,
  onOpenSession,
}) => {
  return (
    <section className="section-conversion" id="access" aria-labelledby="conversion-title">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="conversion-card">
            <div className="conversion-content">
              <div className="section-label">
                <span>04 / ACCESS</span>
              </div>
              <h2 className="conversion-title" id="conversion-title">
                READY TO EXPLORE ALGOFINEX?
              </h2>
              <p className="conversion-desc">
                A more structured approach to chart analysis and disciplined trading habits.
              </p>
              <div className="conversion-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  id="btn-conversion-indicator"
                  onClick={onOpenIndicator}
                >
                  <span>Explore Indicator</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  className="conversion-secondary-link"
                  id="btn-conversion-session"
                  onClick={onOpenSession}
                >
                  Join 3-Day Session
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
