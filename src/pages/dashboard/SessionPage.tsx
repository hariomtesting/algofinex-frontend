import React, { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Link } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { sessionApi } from "../../api/sessionApi";
import { Session, SessionEnrollment, SessionEnrollmentStatus } from "../../types/models";
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

export const SessionPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [enrollment, setEnrollment] = useState<SessionEnrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadSessionData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const [sessData, enrData] = await Promise.all([
        sessionApi.getSessionById("sess_3day_01"),
        sessionApi.getUserSessionEnrollment(),
      ]);
      setSession(sessData);
      setEnrollment(enrData);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to load curriculum data";
      setFetchError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessionData();
  }, []);

  const renderEnrollmentCard = (status: SessionEnrollmentStatus) => {
    switch (status) {
      case "not_enrolled":
        return (
          <Card variant="outline">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">ENROLLMENT</span>
                <StatusBadge status="not_enrolled" label="Not Enrolled" />
              </div>
              <CardTitle>Session Registration</CardTitle>
              <CardDescription>
                You are not currently registered for an upcoming cohort.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="app-card-text-muted">
                The 3-Day Session is an interactive live educational walkthrough of disciplined market routines and execution habits.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.SESSION}>
                <Button variant="primary" size="sm">
                  View Public Syllabus →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );

      case "pending":
        return (
          <Card variant="outline">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">ENROLLMENT</span>
                <StatusBadge status="pending" label="Pending Cohort" />
              </div>
              <CardTitle>Application Under Review</CardTitle>
              <CardDescription>
                Your registration has been received. Cohort scheduling is underway.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="app-card-text-muted">
                You will receive an email confirmation once your cohort seat is assigned.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.DASHBOARD_SUPPORT}>
                <Button variant="ghost" size="sm">
                  Inquire about scheduling →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );

      case "active":
        return (
          <Card variant="outline">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">ENROLLMENT</span>
                <StatusBadge status="active" label="Live Cohort Active" />
              </div>
              <CardTitle>Live Cohort In Progress</CardTitle>
              <CardDescription>
                Your 3-day curriculum cohort is currently active.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="app-alert app-alert-success" style={{ marginBottom: "var(--space-4)" }}>
                Live session link was dispatched to your email address.
              </div>
              <p className="app-card-text-muted">
                Please join at least 5 minutes prior to scheduled session start.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.DASHBOARD_SUPPORT}>
                <Button variant="secondary" size="sm">
                  Desk Support →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );

      case "completed":
        return (
          <Card variant="outline">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">ENROLLMENT</span>
                <StatusBadge status="completed" label="Curriculum Completed" />
              </div>
              <CardTitle>Cohort Completed</CardTitle>
              <CardDescription>
                You have completed the 3-Day educational program.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="app-card-text-muted">
                Review the core curriculum modules below for continuing reference in your daily market preparation.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.DASHBOARD_INDICATOR}>
                <Button variant="secondary" size="sm">
                  View Indicator Tools →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );

      case "confirmed":
      default:
        return (
          <Card variant="outline">
            <CardHeader>
              <div className="app-card-badge-row">
                <span className="app-card-tag">ENROLLMENT</span>
                <StatusBadge status="confirmed" label="Seat Confirmed" />
              </div>
              <CardTitle>Session Access</CardTitle>
              <CardDescription>
                Your seat is confirmed for the next live cohort.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="app-card-text-muted">
                {enrollment?.scheduleNotice ||
                  "Calendar invites and live stream access links are emailed prior to each session start time."}
              </p>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.DASHBOARD_SUPPORT}>
                <Button variant="ghost" size="sm">
                  Question about schedule? →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <AppShell pageTitle="3-Day Session">
      <div className="app-page-container">
        <div className="app-page-hero">
          <div>
            <span className="app-page-eyebrow">CURRICULUM</span>
            <h2 className="app-page-title">{session?.title || "3-Day Session"}</h2>
            <p className="app-page-subtitle">
              {session?.summary || "A structured walkthrough of disciplined chart analysis and execution routines."}
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading curriculum status..." />
        ) : fetchError ? (
          <ErrorState
            title="Failed to load session"
            message={fetchError}
            onRetry={loadSessionData}
          />
        ) : (
          <div className="app-layout-split">
            {/* Left: 3-Day Curriculum Cards */}
            <div className="app-split-main">
              <div className="app-curriculum-list">
                {session?.days.map((day) => (
                  <Card key={day.dayNumber} variant="elevated" className="app-curriculum-card">
                    <CardHeader>
                      <div className="app-card-badge-row">
                        <span className="app-day-tag font-mono">DAY {day.dayNumber}</span>
                        <StatusBadge status={day.status} />
                      </div>
                      <CardTitle>{day.title}</CardTitle>
                      <CardDescription>{day.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="app-curriculum-meta">
                        <span className="app-meta-label">Format:</span>
                        <span className="app-meta-value">Live interactive session ({day.duration || "90 min"})</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right: Explicit Session Enrollment Status Card */}
            <div className="app-split-side">
              {enrollment && renderEnrollmentCard(enrollment.status)}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
