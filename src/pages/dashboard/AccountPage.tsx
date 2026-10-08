import React, { useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input } from "../../components/ui/app";

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdNotice, setPwdNotice] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdNotice(null);

    if (newPassword.length < 8) {
      setPwdError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError("New passwords do not match.");
      return;
    }

    setPwdNotice("Security credentials updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPwdNotice(null), 4000);
  };

  return (
    <AppShell pageTitle="Account Settings">
      <div className="app-page-container">
        <div className="app-page-hero">
          <div>
            <span className="app-page-eyebrow">SETTINGS</span>
            <h2 className="app-page-title">Account & Security</h2>
            <p className="app-page-subtitle">
              Manage your personal credentials, contact email, and active sessions.
            </p>
          </div>
        </div>

        <div className="app-layout-split">
          <div className="app-split-main">
            {/* 1. Profile Information */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your primary name and account identifier.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="app-form-group">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    value={email}
                    disabled
                    helperText="Contact support to change your primary account email address."
                  />
                  <div className="app-meta-row" style={{ marginTop: "var(--space-2)" }}>
                    <span className="app-meta-label">User ID:</span>
                    <span className="app-meta-value font-mono">{user?.id || "usr_afx_8921"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Password & Security */}
            <Card variant="default" style={{ marginTop: "var(--space-6)" }}>
              <CardHeader>
                <CardTitle>Security & Password</CardTitle>
                <CardDescription>
                  Update your authentication password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate}>
                  <Input
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    helperText="Minimum 8 characters with a mix of letters and numbers."
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {pwdError && (
                    <div className="app-alert app-alert-error" role="alert">
                      {pwdError}
                    </div>
                  )}

                  {pwdNotice && (
                    <div className="app-alert app-alert-success" role="status">
                      {pwdNotice}
                    </div>
                  )}

                  <div style={{ marginTop: "var(--space-4)" }}>
                    <Button type="submit" variant="primary" size="md">
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* 3. Session Controls */}
            <Card variant="outline" style={{ marginTop: "var(--space-6)" }}>
              <CardHeader>
                <CardTitle>Session Controls</CardTitle>
                <CardDescription>
                  Terminate active browser sessions across all devices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="app-card-text-muted">
                  If you suspect unauthorized activity, logging out of all devices will revoke all active access tokens.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="danger" size="sm" onClick={() => logout()}>
                  Sign Out of All Sessions
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column: Account Meta */}
          <div className="app-split-side">
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Membership</CardTitle>
                <CardDescription>Account status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="app-meta-list">
                  <div className="app-meta-row">
                    <span className="app-meta-label">Status:</span>
                    <span className="app-meta-value font-mono">Active</span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-label">Member Since:</span>
                    <span className="app-meta-value">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "March 2026"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
