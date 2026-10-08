import React from "react";
import { PRICING_TIERS } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface PricingAccessSectionProps {
  readonly onOpenIndicator: () => void;
  readonly onOpenSession: () => void;
}

export const PricingAccessSection: React.FC<PricingAccessSectionProps> = ({
  onOpenIndicator,
  onOpenSession,
}) => {
  const primaryTier = PRICING_TIERS.find((t) => t.isPrimary) || PRICING_TIERS[0];
  const secondaryTier = PRICING_TIERS.find((t) => !t.isPrimary) || PRICING_TIERS[1];

  return (
    <section className="section-pricing-access" id="access" aria-labelledby="pricing-access-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          {/* Header */}
          <div className="pricing-access-header">
            <div className="section-label">
              <span>06 / COMMERCIAL ACCESS</span>
            </div>
            <div className="pricing-header-grid">
              <h2 className="pricing-title" id="pricing-access-heading">
                GET ACCESS.
              </h2>
              <p className="pricing-lead">
                Direct access to our TradingView indicator and guided educational curriculum. Clear setup guidance and direct support.
              </p>
            </div>
          </div>

          {/* Pricing Cards Grid (Asymmetric Prominence: Dominant Primary vs Compact Alternative) */}
          <div className="pricing-cards-grid">
            {/* Primary Product: AlgoFinex Indicator */}
            {primaryTier && (
              <div className="pricing-card pricing-card-featured" id="pricing-card-indicator">
                <div className="pricing-card-top">
                  <div className="pricing-badge font-mono">{primaryTier.badge}</div>
                  <h3 className="pricing-plan-name">{primaryTier.name}</h3>
                  <p className="pricing-plan-summary">{primaryTier.description}</p>
                </div>

                <div className="pricing-rate-box">
                  <div className="pricing-rate-label font-mono text-xs">PRICE</div>
                  <div className="pricing-rate-display">
                    <span className="pricing-tag-placeholder font-mono">{primaryTier.priceDisplay}</span>
                  </div>
                  <p className="pricing-rate-subtext">{primaryTier.priceSubtext}</p>
                </div>

                <div className="pricing-includes-block">
                  <div className="pricing-includes-label font-mono text-xs">WHAT'S INCLUDED</div>
                  <ul className="pricing-feature-list" aria-label="Included in Indicator Access">
                    {primaryTier.includedFeatures.map((feat, idx) => (
                      <li key={idx} className="pricing-feature-item">
                        <span className="feature-check" aria-hidden="true">✓</span>
                        <span className={feat.includes("PLACEHOLDER") ? "feature-placeholder font-mono text-xs" : ""}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-action">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    id="btn-pricing-indicator"
                    onClick={onOpenIndicator}
                  >
                    <span>{primaryTier.ctaLabel}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Smaller Alternative: 3-Day Session */}
            {secondaryTier && (
              <div className="pricing-card pricing-card-secondary" id="pricing-card-session">
                <div className="pricing-card-top">
                  <div className="pricing-badge font-mono">{secondaryTier.badge}</div>
                  <h3 className="pricing-plan-name">{secondaryTier.name}</h3>
                  <p className="pricing-plan-summary">{secondaryTier.description}</p>
                </div>

                <div className="pricing-rate-box">
                  <div className="pricing-rate-label font-mono text-xs">PRICE</div>
                  <div className="pricing-rate-display">
                    <span className="pricing-tag-placeholder font-mono">{secondaryTier.priceDisplay}</span>
                  </div>
                  <p className="pricing-rate-subtext">{secondaryTier.priceSubtext}</p>
                </div>

                <div className="pricing-includes-block">
                  <div className="pricing-includes-label font-mono text-xs">WHAT'S INCLUDED</div>
                  <ul className="pricing-feature-list" aria-label="Included in 3-Day Session">
                    {secondaryTier.includedFeatures.map((feat, idx) => (
                      <li key={idx} className="pricing-feature-item">
                        <span className="feature-check" aria-hidden="true">✓</span>
                        <span className={feat.includes("PLACEHOLDER") ? "feature-placeholder font-mono text-xs" : ""}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-action">
                  <button
                    type="button"
                    className="btn btn-secondary btn-block btn-lg"
                    id="btn-pricing-session"
                    onClick={onOpenSession}
                  >
                    <span>{secondaryTier.ctaLabel}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Access Clarity Journey Bar */}
          <div className="access-journey-bar" role="region" aria-label="Access Journey">
            <div className="access-journey-step">
              <span className="access-journey-num font-mono">01 / SELECT OPTION</span>
              <h4 className="access-journey-title">Select Desired Access</h4>
              <p className="access-journey-desc">
                Choose the standalone indicator or the 3-day guided educational session.
              </p>
            </div>
            <div className="access-journey-step">
              <span className="access-journey-num font-mono">02 / PROVISIONING</span>
              <h4 className="access-journey-title">Account Setup</h4>
              <p className="access-journey-desc">
                Provide your TradingView username so permissions can be granted to your account.
              </p>
            </div>
            <div className="access-journey-step">
              <span className="access-journey-num font-mono">03 / ONBOARDING</span>
              <h4 className="access-journey-title">Verification & Support</h4>
              <p className="access-journey-desc">
                Add the indicator to your charts with provided documentation and contact support if needed.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
