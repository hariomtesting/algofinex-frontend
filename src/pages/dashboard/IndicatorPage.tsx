import React, { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Link } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { accessApi } from "../../api/accessApi";
import { ProductAccess, ProductAccessStatus } from "../../types/models";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatusBadge,
  Button,
  Input,
  LoadingState,
  ErrorState,
} from "../../components/ui/app";

export const IndicatorPage: React.FC = () => {
  const [access, setAccess] = useState<ProductAccess | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form states
  const [tvUsername, setTvUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadAccess = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await accessApi.getProductAccess();
      setAccess(data);
      setTvUsername(data.tradingViewUsername || "");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to retrieve entitlement data";
      setFetchError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccess();
  }, []);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tvUsername.trim()) {
      setFormError("Please enter your TradingView username");
      return;
    }
    setSaving(true);
    setSaveSuccess(false);
    setFormError(null);
    try {
      const updated = await accessApi.updateTradingViewUsername({
        tradingViewUsername: tvUsername.trim(),
      });
      setAccess(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update TradingView handle";
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const renderStatusView = (status: ProductAccessStatus) => {
    switch (status) {
      case "not_entitled":
        return (
          <Card variant="elevated">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">ENTITLEMENT</span>
                <StatusBadge status="not_entitled" label="Not Entitled" />
              </div>
              <CardTitle>Indicator Access Required</CardTitle>
              <CardDescription>
                Your account does not currently hold an active AlgoFinex Indicator entitlement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="app-card-text-muted" style={{ marginBottom: "var(--space-6)" }}>
                To receive invite-only script permissions on TradingView, acquire indicator access or review the product overview.
              </p>
              <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
                <Link to={ROUTES.CHECKOUT}>
                  <Button variant="primary" size="md">
                    Proceed to Access Checkout →
                  </Button>
                </Link>
                <Link to={ROUTES.INDICATOR}>
                  <Button variant="secondary" size="md">
                    Product Specification
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );

      case "pending":
        return (
          <Card variant="elevated">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">STATUS</span>
                <StatusBadge status="pending" label="Username Pending" />
              </div>
              <CardTitle>TradingView Handle Required</CardTitle>
              <CardDescription>
                Your product entitlement is active. Provide your TradingView account handle below to initiate invite-only script provisioning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateUsername}>
                <Input
                  label="TradingView Username"
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  placeholder="e.g. tradingview_handle"
                  helperText="Usernames are case-sensitive on TradingView."
                  required
                />
                {formError && (
                  <div className="app-alert app-alert-error" role="alert">
                    {formError}
                  </div>
                )}
                <div style={{ marginTop: "var(--space-4)" }}>
                  <Button type="submit" variant="primary" size="md" isLoading={saving}>
                    Submit Handle for Provisioning
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        );

      case "provisioning":
        return (
          <Card variant="elevated">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">STATUS</span>
                <StatusBadge status="provisioning" label="Provisioning In Progress" />
              </div>
              <CardTitle>Script Authorization Queued</CardTitle>
              <CardDescription>
                Your script permissions are currently being synced with TradingView.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="app-alert app-alert-warning" style={{ marginBottom: "var(--space-6)" }}>
                TradingView handle: <strong className="font-mono">{access?.tradingViewUsername || tvUsername}</strong>.
                Permissions are typically synchronized within 12-24 hours.
              </div>

              <form onSubmit={handleUpdateUsername}>
                <Input
                  label="Update TradingView Username"
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  placeholder="e.g. tradingview_handle"
                  helperText="Entered the wrong username? You can update it here before batch processing."
                />
                {saveSuccess && (
                  <div className="app-alert app-alert-success">
                    Updated TradingView handle saved.
                  </div>
                )}
                <div style={{ marginTop: "var(--space-4)" }}>
                  <Button type="submit" variant="secondary" size="sm" isLoading={saving}>
                    Correct Username
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        );

      case "error":
        return (
          <Card variant="elevated">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">STATUS</span>
                <StatusBadge status="error" label="Provisioning Error" />
              </div>
              <CardTitle>Script Provisioning Failed</CardTitle>
              <CardDescription>
                TradingView could not locate the username specified or an entitlement sync error occurred.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="app-alert app-alert-error" style={{ marginBottom: "var(--space-6)" }}>
                {access?.errorMessage || "Please verify your exact TradingView username and re-submit below."}
              </div>

              <form onSubmit={handleUpdateUsername}>
                <Input
                  label="Re-enter TradingView Username"
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  placeholder="e.g. correct_handle"
                  required
                />
                <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-3)" }}>
                  <Button type="submit" variant="primary" size="md" isLoading={saving}>
                    Retry Provisioning
                  </Button>
                  <Link to={ROUTES.DASHBOARD_SUPPORT}>
                    <Button variant="secondary" size="md">
                      Contact Support Desk
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        );

      case "active":
      default:
        return (
          <>
            <Card variant="elevated">
              <CardHeader>
                <div className="app-card-badge-row">
                  <span className="app-card-tag">STATUS</span>
                  <StatusBadge status="active" label="Script Active" />
                </div>
                <CardTitle>TradingView Provisioning</CardTitle>
                <CardDescription>
                  Your TradingView handle has been granted invite-only script access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="app-meta-list" style={{ marginBottom: "var(--space-6)" }}>
                  <div className="app-meta-row">
                    <span className="app-meta-label">TradingView ID:</span>
                    <span className="app-meta-value font-mono">{access?.tradingViewUsername}</span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-label">Provisioned At:</span>
                    <span className="app-meta-value">
                      {access?.accessGrantedAt ? new Date(access.accessGrantedAt).toLocaleDateString() : "Active"}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleUpdateUsername}>
                  <Input
                    label="Transfer TradingView Username"
                    value={tvUsername}
                    onChange={(e) => setTvUsername(e.target.value)}
                    placeholder="e.g. new_handle"
                    helperText="If you changed your TradingView handle, update it here to re-authorize."
                    required
                  />

                  {saveSuccess && (
                    <div className="app-alert app-alert-success">
                      TradingView handle update requested.
                    </div>
                  )}

                  <div style={{ marginTop: "var(--space-4)" }}>
                    <Button type="submit" variant="secondary" size="sm" isLoading={saving}>
                      Update Handle
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Step-by-Step Activation Instructions */}
            <Card variant="default" style={{ marginTop: "var(--space-6)" }}>
              <CardHeader>
                <CardTitle>Activation Instructions</CardTitle>
                <CardDescription>
                  Follow these steps to add the indicator to your TradingView chart.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="app-ordered-steps">
                  {access?.instructions.map((step, idx) => (
                    <li key={idx} className="app-step-item">
                      <span className="app-step-num font-mono">0{idx + 1}</span>
                      <span className="app-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <AppShell pageTitle="Indicator Access">
      <div className="app-page-container">
        <div className="app-page-hero">
          <div>
            <span className="app-page-eyebrow">PRODUCT</span>
            <h2 className="app-page-title">AlgoFinex Indicator</h2>
            <p className="app-page-subtitle">
              Manage TradingView script provisioning and view configuration instructions.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Retrieving script permissions..." />
        ) : fetchError ? (
          <ErrorState
            title="Failed to load access"
            message={fetchError}
            onRetry={loadAccess}
          />
        ) : (
          <div className="app-layout-split">
            {/* Left Column: Explicit Product Access State View */}
            <div className="app-split-main">
              {access && renderStatusView(access.status)}
            </div>

            {/* Right Column: Help Desk Quick Card */}
            <div className="app-split-side">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Need Assistance?</CardTitle>
                  <CardDescription>
                    Having trouble viewing the script on TradingView?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="app-card-text-muted">
                    If you don't see the script under "Invite-Only Scripts", verify your username or reach out to our access desk.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to={ROUTES.DASHBOARD_SUPPORT}>
                    <Button variant="secondary" size="sm">
                      Submit Access Ticket →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
