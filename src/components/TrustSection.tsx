import React from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export const TrustSection: React.FC = () => {
  return (
    <section className="section-trust" id="trust" aria-labelledby="trust-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="trust-inner">
            <div className="section-label">
              <span>07 / COMMITMENT</span>
            </div>

            <div className="trust-editorial-grid">
              <div className="trust-editorial-lead">
                <h2 className="trust-title" id="trust-heading">
                  BUILT WITH CLARITY.
                </h2>
                <p className="trust-lead">
                  Clear product information. Straightforward access. Direct support. AlgoFinex provides clear visual tools and disciplined education designed for rules-based market analysis.
                </p>
                <div className="trust-pledge-badge">
                  <span className="trust-status-dot" aria-hidden="true" />
                  <span className="trust-status-text font-mono text-xs">DISCIPLINE OVER NOISE</span>
                </div>
              </div>

              <div className="trust-signals-grid" role="list">
                <div className="trust-card" role="listitem">
                  <div className="trust-card-header">
                    <span className="trust-card-idx font-mono">01</span>
                    <span className="trust-card-tag font-mono">TRANSPARENCY</span>
                  </div>
                  <h3 className="trust-card-title">Clear Product Information</h3>
                  <p className="trust-card-desc">
                    Honest, accurate descriptions of visual charting tools without exaggerated claims, simulated performance, or artificial promises.
                  </p>
                  <div className="trust-card-meta">
                    <span className="meta-label font-mono">FOCUS</span>
                    <span className="meta-value font-mono">Disciplined Analysis</span>
                  </div>
                </div>

                <div className="trust-card" role="listitem">
                  <div className="trust-card-header">
                    <span className="trust-card-idx font-mono">02</span>
                    <span className="trust-card-tag font-mono">ACCESS</span>
                  </div>
                  <h3 className="trust-card-title">Straightforward Access</h3>
                  <p className="trust-card-desc">
                    Direct script access provisioned to your TradingView account with setup instructions and documentation.
                  </p>
                  <div className="trust-card-meta">
                    <span className="meta-label font-mono">PLATFORM</span>
                    <span className="meta-value font-mono">TradingView Native</span>
                  </div>
                </div>

                <div className="trust-card" role="listitem">
                  <div className="trust-card-header">
                    <span className="trust-card-idx font-mono">03</span>
                    <span className="trust-card-tag font-mono">SUPPORT</span>
                  </div>
                  <h3 className="trust-card-title">Direct Support</h3>
                  <p className="trust-card-desc">
                    Direct assistance for account configuration, setup questions, and curriculum onboarding.
                  </p>
                  <div className="trust-card-meta">
                    <span className="meta-label font-mono">ASSISTANCE</span>
                    <span className="meta-value font-mono">Direct Help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
