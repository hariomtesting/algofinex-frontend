/**
 * AlgoFinex — 404 Not Found Page
 * Provides clean fallback for unknown routes with navigation back to safety.
 */

import React from "react";
import { Link } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/app";
import { BRAND_CONFIG } from "../../data/mockData";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="app-auth-container">
      <div className="app-auth-box">
        <div className="app-auth-brand-row">
          <Link to={ROUTES.HOME} className="brand" aria-label="AlgoFinex Homepage">
            <div className="brand-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="m7 15 4-5 4 3 6-8" />
              </svg>
            </div>
            <span className="brand-name">{BRAND_CONFIG.name}</span>
          </Link>
        </div>

        <Card variant="elevated" className="app-auth-card">
          <CardHeader>
            <span className="app-card-tag font-mono">ERROR 404</span>
            <CardTitle>Page Not Found</CardTitle>
            <CardDescription>
              The requested destination does not exist or may have been relocated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="app-card-text-muted" style={{ marginBottom: "var(--space-6)" }}>
              Check the web address or return to your authenticated workspace or the AlgoFinex home page.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <Link to={ROUTES.DASHBOARD}>
                <Button variant="primary" size="md" style={{ width: "100%" }}>
                  Go to Workspace →
                </Button>
              </Link>
              <Link to={ROUTES.HOME}>
                <Button variant="secondary" size="md" style={{ width: "100%" }}>
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
