import React from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export const TrustSection: React.FC = () => {
  return (
    <section className="section-trust" id="trust" aria-labelledby="trust-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="trust-inner">
            <div className="section-label">
              <span>06 / BUILT WITH CLARITY</span>
            </div>

            <div className="trust-editorial-grid">
              <div className="trust-editorial-lead">
                <h2 className="trust-title" id="trust-heading">
                  Built with clarity.
                </h2>
                <p className="trust-lead">
                  Straightforward tools, transparent access, and direct support. AlgoFinex provides clear visual tools and disciplined education designed for rules-based market analysis.
                </p>
                <div className="trust-pledge-badge">
                  <span className="trust-status-dot" aria-hidden="true" />
                  <span className="trust-status-text">COMMITMENT: CLARITY &amp; RESTRAINT</span>
                </div>
              </div>

              <div className="trust-signals-grid">
                <div className="trust-card">
                  <div className="trust-card-header">
                    <span className="trust-card-idx">01</span>
                    <span className="trust-card-tag">TRANSPARENCY</span>
                  </div>
                  <h3 className="trust-card-title">Clear Product Information</h3>
                  <p className="trust-card-desc">
                    Honest, accurate descriptions of visual charting tools without exaggerated claims, simulated performance, or artificial promises.
                  </p>
                  <div className="trust-card-meta">
                    <span className="meta-label">FOCUS</span>
                    <span className="meta-value">Disciplined Analysis</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card-header">
                    <span className="trust-card-idx">02</span>
                    <span className="trust-card-tag">ACCESS</span>
                  </div>
                  <h3 className="trust-card-title">Straightforward Access</h3>
                  <p className="trust-card-desc">
                    Direct invite-only script provisioning to your TradingView username with clear onboarding and setup instructions.
                  </p>
                  <div className="trust-card-meta">
                    <span className="meta-label">PLATFORM</span>
                    <span className="meta-value">TradingView Native</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card-header">
                    <span className="trust-card-idx">03</span>
                    <span className="trust-card-tag">ASSISTANCE</span>
                  </div>
                  <h3 className="trust-card-title">Direct Support</h3>
                  <p className="trust-card-desc">
                    Dedicated desk assistance for installation questions, account permissions, and curriculum guidance.
                  </p>
                  <div className="trust-card-meta">
                    <span className="meta-label">DESK</span>
                    <span className="meta-value">Responsive Assistance</span>
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
