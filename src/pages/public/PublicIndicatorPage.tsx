import React from "react";
import { Link } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { BRAND_CONFIG, INDICATOR_PRODUCT } from "../../data/mockData";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/app";

export const PublicIndicatorPage: React.FC = () => {
  return (
    <div className="app-public-page">
      {/* Navigation */}
      <header className="site-header">
        <div className="container nav-container">
          <Link to={ROUTES.HOME} className="brand" aria-label="AlgoFinex Homepage">
            <div className="brand-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="m7 15 4-5 4 3 6-8" />
              </svg>
            </div>
            <span className="brand-name">{BRAND_CONFIG.name}</span>
          </Link>

          <nav className="nav-links" aria-label="Public Navigation">
            <Link to={ROUTES.HOME} className="nav-link">Overview</Link>
            <Link to={ROUTES.INDICATOR} className="nav-link active">Indicator</Link>
            <Link to={ROUTES.SESSION} className="nav-link">3-Day Session</Link>
          </nav>

          <div className="nav-actions">
            <Link to={ROUTES.LOGIN} className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to={ROUTES.CHECKOUT} className="btn btn-primary btn-sm">
              <span>Explore Indicator</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: "clamp(3.5rem, 6vw, 6rem) var(--container-pad)" }}>
        {/* Editorial Product Header */}
        <div className="app-page-hero" style={{ maxWidth: "780px" }}>
          <span className="app-page-eyebrow">PRODUCT OVERVIEW</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)", margin: "var(--space-3) 0" }}>
            {INDICATOR_PRODUCT.headline}
          </h1>
          <p className="hero-description" style={{ maxWidth: "620px" }}>
            {INDICATOR_PRODUCT.summary}
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
            <Link to={ROUTES.CHECKOUT}>
              <Button variant="primary" size="lg">
                <span>Explore Indicator</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Button>
            </Link>
            <Link to={ROUTES.SESSION}>
              <Button variant="secondary" size="lg">
                View 3-Day Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Core Capabilities */}
        <div style={{ marginTop: "clamp(4rem, 7vw, 6rem)" }}>
          <div className="section-label" style={{ marginBottom: "var(--space-6)" }}>
            <span>CAPABILITIES</span>
          </div>
          <div className="app-grid-3cols">
            {INDICATOR_PRODUCT.capabilities.map((cap) => (
              <Card key={cap.index} variant="elevated">
                <CardHeader>
                  <span className="font-mono" style={{ color: "var(--color-accent)", fontSize: "0.8125rem" }}>
                    {cap.index}
                  </span>
                  <CardTitle style={{ marginTop: "var(--space-2)" }}>{cap.title}</CardTitle>
                  <CardDescription>{cap.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Overview */}
        <div style={{ marginTop: "clamp(4rem, 7vw, 6rem)" }}>
          <Card variant="outline">
            <CardHeader>
              <CardTitle>TradingView Compatibility</CardTitle>
              <CardDescription>
                Zero third-party terminal installations required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="app-grid-2cols">
                <div>
                  <h4 style={{ color: "var(--color-text-primary)", fontSize: "1rem", marginBottom: "var(--space-2)" }}>
                    Multi-Device Support
                  </h4>
                  <p className="app-card-text-muted">
                    Compatible across TradingView desktop applications, web browsers, and mobile iOS/Android charts.
                  </p>
                </div>
                <div>
                  <h4 style={{ color: "var(--color-text-primary)", fontSize: "1rem", marginBottom: "var(--space-2)" }}>
                    Account Assignment
                  </h4>
                  <p className="app-card-text-muted">
                    Scripts are assigned via invite-only permissions directly linked to your TradingView username.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-bottom-row" style={{ borderTop: "none" }}>
            <span className="footer-copyright">© {new Date().getFullYear()} {BRAND_CONFIG.name}.</span>
            <Link to={ROUTES.HOME} className="footer-link">Back to Homepage →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
