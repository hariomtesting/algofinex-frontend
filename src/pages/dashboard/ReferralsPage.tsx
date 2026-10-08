import React, { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { referralApi } from "../../api/referralApi";
import { Referral } from "../../types/models";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  LoadingState,
  EmptyState,
  ErrorState,
} from "../../components/ui/app";

export const ReferralsPage: React.FC = () => {
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadReferrals = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await referralApi.getUserReferrals();
      setReferral(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to retrieve referral data";
      setFetchError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReferrals();
  }, []);

  const handleCopyLink = () => {
    if (!referral?.referralUrl) return;
    navigator.clipboard.writeText(referral.referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AppShell pageTitle="Referrals">
      <div className="app-page-container">
        <div className="app-page-hero">
          <div>
            <span className="app-page-eyebrow">PROGRAM</span>
            <h2 className="app-page-title">Referrals & Sharing</h2>
            <p className="app-page-subtitle">
              Invite fellow traders to explore AlgoFinex.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading referral information..." />
        ) : fetchError ? (
          <ErrorState
            title="Failed to load referrals"
            message={fetchError}
            onRetry={loadReferrals}
          />
        ) : (
          <div className="app-layout-split">
            <div className="app-split-main">
              {/* Referral Link Box */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Your Personal Link</CardTitle>
                  <CardDescription>
                    Share this unique invitation link with other traders in your network.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="app-referral-input-row">
                    <Input
                      value={referral?.referralUrl || ""}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="primary" size="md" onClick={handleCopyLink}>
                      {copied ? "Copied" : "Copy Link"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Verified Invites Counter (Typed Domain Stats Only) */}
              <div className="app-grid-2cols" style={{ marginTop: "var(--space-6)" }}>
                <Card variant="default">
                  <CardHeader>
                    <span className="app-card-tag">METRIC</span>
                    <CardTitle style={{ fontSize: "1.75rem", fontFamily: "var(--font-mono)" }}>
                      {referral?.totalInvites ?? 0}
                    </CardTitle>
                    <CardDescription>Total Link Clicks / Invites</CardDescription>
                  </CardHeader>
                </Card>
                <Card variant="default">
                  <CardHeader>
                    <span className="app-card-tag">METRIC</span>
                    <CardTitle style={{ fontSize: "1.75rem", fontFamily: "var(--font-mono)" }}>
                      {referral?.successfulInvites ?? 0}
                    </CardTitle>
                    <CardDescription>Joined Members</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Activity Table / Empty State */}
              <Card variant="default" style={{ marginTop: "var(--space-6)" }}>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Logged referrals and account joins will be recorded here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {referral && referral.recentActivity.length > 0 ? (
                    <table className="app-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Event</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referral.recentActivity.map((act) => (
                          <tr key={act.id}>
                            <td className="font-mono">{act.date}</td>
                            <td>{act.event}</td>
                            <td>{act.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyState
                      title="No referral activity recorded"
                      description="Share your referral link above to introduce traders to the AlgoFinex ecosystem."
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right: Program Status Information */}
            <div className="app-split-side">
              <Card variant="outline">
                <CardHeader>
                  <div className="app-card-badge-row">
                    <span className="app-card-tag">STATUS</span>
                    <span className="app-badge app-badge-neutral app-badge-sm">Program Notice</span>
                  </div>
                  <CardTitle>Program Overview</CardTitle>
                  <CardDescription>
                    Rewards and incentive program structure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="app-card-text-muted">
                    {referral?.rewardStatus ||
                      "Specific rewards and incentive structures will be published once formalized by the team."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
