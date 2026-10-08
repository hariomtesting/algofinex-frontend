import React from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface PricingAccessSectionProps {
  readonly onOpenIndicator: () => void;
  readonly onOpenSession: () => void;
}

export const PricingAccessSection: React.FC<PricingAccessSectionProps> = ({
  onOpenIndicator,
  onOpenSession,
}) => {
  return (
    <section className="section-pricing-access" id="access" aria-labelledby="pricing-access-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="pricing-access-header">
            <div className="section-label">
              <span>07 / PRODUCT ACCESS</span>
            </div>
            <div className="pricing-header-grid">
              <h2 className="pricing-title" id="pricing-access-heading">
                GET ALGOFINEX.
              </h2>
              <p className="pricing-lead">
                Direct access to our TradingView analytical tools and educational curriculum. Clear terms with direct account provisioning.
              </p>
            </div>
          </div>

          <div className="pricing-cards-grid">
            {/* Primary Product Card: Indicator Access */}
            <div className="pricing-card pricing-card-featured">
              <div className="pricing-card-top">
                <div className="pricing-badge">INDICATOR ACCESS</div>
                <h3 className="pricing-plan-name">AlgoFinex Indicator</h3>
                <p className="pricing-plan-summary">
                  Visual tools designed to provide chart clarity and support a disciplined approach to technical analysis on TradingView.
                </p>
              </div>

              <div className="pricing-rate-box">
                <div className="pricing-rate-display">
                  <span className="pricing-tag-placeholder">Pricing available at checkout</span>
                </div>
                <p className="pricing-rate-subtext">
                  Official license pricing available at checkout. No hidden fees.
                </p>
              </div>

              <ul className="pricing-feature-list" aria-label="Indicator features">
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Direct TradingView invite-only script permission</span>
                </li>
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Market view and contextual reference tools</span>
                </li>
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Complete configuration and setup documentation</span>
                </li>
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Direct support for installation and account linking</span>
                </li>
              </ul>

              <div className="pricing-action">
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  id="btn-pricing-indicator"
                  onClick={onOpenIndicator}
                >
                  <span>Explore Indicator Access</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Educational Companion Card: 3-Day Session */}
            <div className="pricing-card">
              <div className="pricing-card-top">
                <div className="pricing-badge">CURRICULUM</div>
                <h3 className="pricing-plan-name">3-Day Session</h3>
                <p className="pricing-plan-summary">
                  A structured cohort curriculum covering foundational chart orientation, analytical consistency, and daily trading habits.
                </p>
              </div>

              <div className="pricing-rate-box">
                <div className="pricing-rate-display">
                  <span className="pricing-tag-placeholder">Enrollment details available at checkout</span>
                </div>
                <p className="pricing-rate-subtext">
                  Cohort schedule and enrollment details provided at checkout.
                </p>
              </div>

              <ul className="pricing-feature-list" aria-label="3-Day Session features">
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Day 01 — Market context &amp; foundational orientation</span>
                </li>
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Day 02 — Practical execution routines &amp; scenarios</span>
                </li>
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Day 03 — Process construction &amp; objective review habits</span>
                </li>
                <li className="pricing-feature-item">
                  <span className="feature-check" aria-hidden="true">✓</span>
                  <span>Dedicated participant workspace &amp; desk support</span>
                </li>
              </ul>

              <div className="pricing-action">
                <button
                  type="button"
                  className="btn btn-secondary btn-block btn-lg"
                  id="btn-pricing-session"
                  onClick={onOpenSession}
                >
                  <span>Join 3-Day Session</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Access Clarity: What You Buy, What You Get, What Happens Next */}
          <div className="access-journey-bar" role="region" aria-label="Access Journey">
            <div className="access-journey-step">
              <span className="access-journey-num">01 / WHAT YOU BUY</span>
              <h4 className="access-journey-title">Select Your Tool or Session</h4>
              <p className="access-journey-desc">
                Choose the standalone AlgoFinex Indicator or enroll in the guided 3-Day educational curriculum.
              </p>
            </div>
            <div className="access-journey-step">
              <span className="access-journey-num">02 / WHAT YOU GET</span>
              <h4 className="access-journey-title">TradingView Account Access</h4>
              <p className="access-journey-desc">
                Invite-only script access provisioned to your TradingView handle with comprehensive setup guides.
              </p>
            </div>
            <div className="access-journey-step">
              <span className="access-journey-num">03 / WHAT HAPPENS NEXT</span>
              <h4 className="access-journey-title">Onboarding &amp; Support</h4>
              <p className="access-journey-desc">
                Receive access confirmation by email and contact our support desk for setup verification.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
