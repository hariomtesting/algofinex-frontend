import React, { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Link } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { useAuth } from "../../context/AuthContext";
import { accessApi } from "../../api/accessApi";
import { sessionApi } from "../../api/sessionApi";
import { supportApi } from "../../api/supportApi";
import { ProductAccess, SessionEnrollment, SupportTicket } from "../../types/models";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatusBadge,
  Button,
  LoadingState,
  ErrorState,
} from "../../components/ui/app";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [access, setAccess] = useState<ProductAccess | null>(null);
  const [enrollment, setEnrollment] = useState<SessionEnrollment | null>(null);
  const [tickets, setTickets] = useState<readonly SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const [accData, enrData, tktData] = await Promise.all([
        accessApi.getProductAccess(),
        sessionApi.getUserSessionEnrollment(),
        supportApi.getUserTickets(),
      ]);
      setAccess(accData);
      setEnrollment(enrData);
      setTickets(tktData);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to load workspace data";
      setFetchError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const openTicketsCount = tickets.filter((t) => t.status !== "resolved").length;

  return (
    <AppShell pageTitle="Workspace Overview">
      <div className="app-page-container">
        {/* Welcome Section */}
        <div className="app-page-hero">
          <div>
            <span className="app-page-eyebrow">WORKSPACE</span>
            <h2 className="app-page-title">Welcome back, {user?.name || "Trader"}</h2>
            <p className="app-page-subtitle">
              Your central operational hub for product entitlements, curriculum schedules, and technical support.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading workspace entitlements..." />
        ) : fetchError ? (
          <ErrorState
            title="Failed to load workspace"
            message={fetchError}
            onRetry={loadDashboardData}
          />
        ) : (
          <div className="app-grid-cards">
            {/* 1. WHAT DO I HAVE? — Indicator Access Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="app-card-badge-row">
                  <span className="app-card-tag">WHAT DO I HAVE?</span>
                  {access && <StatusBadge status={access.status} />}
                </div>
                <CardTitle>AlgoFinex Indicator</CardTitle>
                <CardDescription>
                  Invite-only technical analysis tools on TradingView.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="app-meta-list">
                  <div className="app-meta-row">
                    <span className="app-meta-label">TradingView ID:</span>
                    <span className="app-meta-value font-mono">
                      {access?.tradingViewUsername || "Not linked"}
                    </span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-label">Entitlement State:</span>
                    <span className="app-meta-value">
                      {access?.status === "active"
                        ? "Script Provisioned"
                        : access?.status === "provisioning"
                        ? "Sync In Progress"
                        : access?.status === "pending"
                        ? "Username Needed"
                        : "Access Required"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={ROUTES.DASHBOARD_INDICATOR}>
                  <Button variant="primary" size="sm">
                    Manage Script Access →
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* 2. WHAT DO I DO NEXT? — Next Session Action Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="app-card-badge-row">
                  <span className="app-card-tag">WHAT DO I DO NEXT?</span>
                  {enrollment && <StatusBadge status={enrollment.status} />}
                </div>
                <CardTitle>3-Day Session</CardTitle>
                <CardDescription>
                  Structured market orientation and execution curriculum.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="app-meta-list">
                  <div className="app-meta-row">
                    <span className="app-meta-label">Cohort Status:</span>
                    <span className="app-meta-value">
                      {enrollment?.status === "confirmed"
                        ? "Seat Confirmed"
                        : enrollment?.status === "active"
                        ? "Session Active"
                        : enrollment?.status === "pending"
                        ? "Pending Assignment"
                        : "Registration Open"}
                    </span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-label">Schedule:</span>
                    <span className="app-meta-value">
                      {enrollment?.scheduleNotice || "Details emailed prior to start"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={ROUTES.DASHBOARD_SESSION}>
                  <Button variant="secondary" size="sm">
                    View Session Schedule →
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* 3. WHERE DO I GET HELP? — Support Desk Card */}
            <Card variant="outline">
              <CardHeader>
                <div className="app-card-badge-row">
                  <span className="app-card-tag">WHERE DO I GET HELP?</span>
                  <StatusBadge
                    status={openTicketsCount > 0 ? "open" : "active"}
                    label={openTicketsCount > 0 ? `${openTicketsCount} Open Ticket${openTicketsCount > 1 ? "s" : ""}` : "Desk Ready"}
                  />
                </div>
                <CardTitle>Technical Support</CardTitle>
                <CardDescription>
                  Script authorization and account assistance desk.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="app-card-text-muted">
                  {openTicketsCount > 0
                    ? `You have ${openTicketsCount} active support request under review.`
                    : "Need help adding the script on TradingView? Submit an access ticket anytime."}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={ROUTES.DASHBOARD_SUPPORT}>
                  <Button variant="ghost" size="sm">
                    Open Help Desk →
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* 4. Referral / Invite Link Card */}
            <Card variant="outline">
              <CardHeader>
                <div className="app-card-badge-row">
                  <span className="app-card-tag">PROGRAM</span>
                  <StatusBadge status="upcoming" label="Active" />
                </div>
                <CardTitle>Referrals & Sharing</CardTitle>
                <CardDescription>
                  Share AlgoFinex tools with fellow traders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="app-card-text-muted">
                  Access your personal invitation link and review invitation activity.
                </p>
              </CardContent>
              <CardFooter>
                <Link to={ROUTES.DASHBOARD_REFERRALS}>
                  <Button variant="ghost" size="sm">
                    View Referrals →
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
};
