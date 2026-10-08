import React, { useState, useEffect } from "react";
import { Link, useRouter } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input } from "../../components/ui/app";
import { BRAND_CONFIG } from "../../data/mockData";

export const SignupPage: React.FC = () => {
  const { signup, isAuthenticated } = useAuth();
  const { navigate, queryParams } = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      const destination = queryParams.redirect || ROUTES.DASHBOARD;
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, queryParams.redirect, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await signup({ name: name.trim(), email: email.trim(), password });
      if (res.success) {
        const destination = queryParams.redirect || ROUTES.DASHBOARD;
        navigate(destination, { replace: true });
      } else {
        setError(res.error || "Could not complete account creation.");
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
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Set up your AlgoFinex workspace to manage indicator access and curriculum.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Sterling"
                autoComplete="name"
                required
              />

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
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                autoComplete="new-password"
                required
              />

              {error && (
                <div className="app-alert app-alert-error" role="alert">
                  {error}
                </div>
              )}

              <div style={{ marginTop: "var(--space-6)" }}>
                <Button type="submit" variant="primary" size="lg" style={{ width: "100%" }} isLoading={loading}>
                  Create Workspace Account →
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="app-auth-footer">
            <span className="app-card-text-muted">Already have an account?</span>
            <Link
              to={queryParams.redirect ? `${ROUTES.LOGIN}?redirect=${encodeURIComponent(queryParams.redirect)}` : ROUTES.LOGIN}
              className="app-link-highlight"
            >
              Sign in
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
