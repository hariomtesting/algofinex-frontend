import React from "react";
import { BRAND_CONFIG } from "../data/mockData";

export interface FooterProps {
  readonly onOpenLogin: () => void;
  readonly onOpenSupport: () => void;
  readonly onShowToast: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSupport,
  onShowToast,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="footer-wordmark">{BRAND_CONFIG.name}</span>
            <span className="footer-tagline">Discipline over noise.</span>
          </div>

          <nav className="footer-nav-groups" aria-label="Footer navigation">
            <div className="footer-nav-col">
              <a href="#showcase" className="footer-link">Indicator</a>
              <a href="#workflow" className="footer-link">Workflow</a>
              <a href="#session" className="footer-link">3-Day Session</a>
              <a href="#faq" className="footer-link">FAQ</a>
              <button
                type="button"
                className="footer-btn-link"
                id="footer-support-link"
                onClick={onOpenSupport}
              >
                Support
              </button>
            </div>

            <div className="footer-nav-col">
              <button
                type="button"
                className="footer-btn-link"
                id="link-legal"
                onClick={() => {
                  onShowToast("Legal: AlgoFinex provides proprietary charting tools and educational material for analytical purposes.");
                }}
              >
                Legal
              </button>
              <button
                type="button"
                className="footer-btn-link"
                id="link-risk-disclosure"
                onClick={() => {
                  onShowToast(
                    "Risk Disclosure: Trading financial instruments involves risk of loss. Software and education are provided for analytical purposes only."
                  );
                }}
              >
                Risk Disclosure
              </button>
              <button
                type="button"
                className="footer-btn-link"
                id="link-terms"
                onClick={() => {
                  onShowToast("Terms: Standard single-user license for software access and live educational workshops.");
                }}
              >
                Terms
              </button>
            </div>
          </nav>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-legal-note">
            Trading financial instruments involves risk of loss. AlgoFinex provides technical analysis tools and education, not investment advice.
          </p>
          <span className="footer-copyright">
            © {currentYear} {BRAND_CONFIG.name}.
          </span>
        </div>
      </div>
    </footer>
  );
};
