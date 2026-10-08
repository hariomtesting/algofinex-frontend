import React, { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { supportApi } from "../../api/supportApi";
import { SupportTicket, TicketCategory } from "../../types/models";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  StatusBadge,
  Button,
  Input,
  Textarea,
  Select,
  LoadingState,
  EmptyState,
  ErrorState,
  SuccessState,
} from "../../components/ui/app";

export const SupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<readonly SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form submission states
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<TicketCategory>("Indicator Access");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<SupportTicket | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories: readonly { value: TicketCategory; label: string }[] = [
    { value: "Indicator Access", label: "Indicator Access" },
    { value: "3-Day Session", label: "3-Day Session" },
    { value: "Account", label: "Account Settings" },
    { value: "Payment", label: "Payment & Invoicing" },
    { value: "Other", label: "General Inquiry" },
  ];

  const loadTickets = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await supportApi.getUserTickets();
      setTickets(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to load support history";
      setFetchError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setSubmitError("Please fill out both subject and message.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSuccessTicket(null);

    try {
      const created = await supportApi.createTicket({
        subject: subject.trim(),
        category,
        message: message.trim(),
      });
      setTickets((prev) => [created, ...prev]);
      setSubject("");
      setMessage("");
      setSuccessTicket(created);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to submit support ticket. Please try again.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell pageTitle="Support Desk">
      <div className="app-page-container">
        <div className="app-page-hero">
          <div>
            <span className="app-page-eyebrow">HELP DESK</span>
            <h2 className="app-page-title">Technical Support & Inquiries</h2>
            <p className="app-page-subtitle">
              Reach out directly to our team for script permissions, curriculum questions, and account assistance.
            </p>
          </div>
        </div>

        <div className="app-layout-split">
          {/* Left Column: Inquiry Submission Form */}
          <div className="app-split-main">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Submit a Ticket</CardTitle>
                <CardDescription>
                  Provide specific details so our desk can resolve your request efficiently.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {successTicket && (
                  <div style={{ marginBottom: "var(--space-6)" }}>
                    <SuccessState
                      title="Ticket Created"
                      message={`Your ticket (#${successTicket.id}) has been recorded. Our support desk will respond via email.`}
                      action={
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSuccessTicket(null)}
                        >
                          Submit another inquiry
                        </Button>
                      }
                    />
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <Input
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your question"
                    required
                  />

                  <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TicketCategory)}
                    options={categories}
                  />

                  <Textarea
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or inquiry in detail..."
                    rows={5}
                    required
                  />

                  {submitError && (
                    <div className="app-alert app-alert-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
                      {submitError}
                    </div>
                  )}

                  <div style={{ marginTop: "var(--space-4)" }}>
                    <Button type="submit" variant="primary" size="md" isLoading={submitting}>
                      Submit Inquiry
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Ticket History */}
            <Card variant="default" style={{ marginTop: "var(--space-6)" }}>
              <CardHeader>
                <CardTitle>Your Support Requests</CardTitle>
                <CardDescription>
                  Review the status of your submitted tickets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <LoadingState message="Loading ticket history..." />
                ) : fetchError ? (
                  <ErrorState
                    title="Could not load tickets"
                    message={fetchError}
                    onRetry={loadTickets}
                  />
                ) : tickets.length > 0 ? (
                  <div className="app-ticket-list">
                    {tickets.map((t) => (
                      <div key={t.id} className="app-ticket-row">
                        <div className="app-ticket-info">
                          <div className="app-ticket-header">
                            <span className="app-ticket-subject">{t.subject}</span>
                            <StatusBadge status={t.status} />
                          </div>
                          <p className="app-ticket-msg">{t.message}</p>
                          <div className="app-ticket-meta">
                            <span className="font-mono">{t.id}</span>
                            <span>•</span>
                            <span>{t.category}</span>
                            <span>•</span>
                            <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                            {t.updatedAt && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-xs">Updated {new Date(t.updatedAt).toLocaleDateString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No tickets submitted"
                    description="When you submit a support inquiry, it will appear here with live resolution updates."
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Desk Info */}
          <div className="app-split-side">
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Desk Information</CardTitle>
                <CardDescription>
                  Operational hours & contact channels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="app-meta-list">
                  <div className="app-meta-row">
                    <span className="app-meta-label">Email:</span>
                    <span className="app-meta-value font-mono">support@algofinex.com</span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-label">Average Response:</span>
                    <span className="app-meta-value">Under 24 hours</span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-label">TradingView Desk:</span>
                    <span className="app-meta-value">Daily script synchronization</span>
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
