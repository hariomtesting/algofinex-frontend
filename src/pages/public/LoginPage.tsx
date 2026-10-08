import React, { useState, useEffect } from "react";
import { Link, useRouter } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input } from "../../components/ui/app";
import { BRAND_CONFIG } from "../../data/mockData";

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { navigate, queryParams } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      const destination = queryParams.redirect || ROUTES.DASHBOARD;
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, queryParams.redirect, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please provide both email and password.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await login({ email: email.trim(), password });
      if (res.success) {
        const destination = queryParams.redirect || ROUTES.DASHBOARD;
        navigate(destination, { replace: true });
      } else {
        setError(res.error || "Invalid email or password.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your AlgoFinex workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />

              {error && (
                <div className="app-alert app-alert-error" role="alert">
                  {error}
                </div>
              )}

              <div style={{ marginTop: "var(--space-6)" }}>
                <Button type="submit" variant="primary" size="lg" style={{ width: "100%" }} isLoading={loading}>
                  Sign In →
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="app-auth-footer">
            <span className="app-card-text-muted">Don't have an account yet?</span>
            <Link
              to={queryParams.redirect ? `${ROUTES.SIGNUP}?redirect=${encodeURIComponent(queryParams.redirect)}` : ROUTES.SIGNUP}
              className="app-link-highlight"
            >
              Create an account
            </Link>
          </CardFooter>
        </Card>

        <div className="app-auth-back-link">
          <Link to={ROUTES.HOME} className="app-nav-item">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};
