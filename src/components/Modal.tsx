import React, { useState, useEffect, useRef } from "react";
import { ApiService } from "../api/apiService";

export type ModalType = "indicator" | "session" | "support" | "login";

export interface ModalProps {
  readonly isOpen: boolean;
  readonly type: ModalType | null;
  readonly onClose: () => void;
  readonly onSuccess: (message: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, type, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // Form states
  const [tvUsername, setTvUsername] = useState("");
  const [indicatorEmail, setIndicatorEmail] = useState("");

  const [sessionName, setSessionName] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");

  const [supportEmail, setSupportEmail] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Lock body scroll and focus first input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }

    document.body.style.overflow = "";
    setSubmitting(false);
    return undefined;
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  const handleIndicatorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await ApiService.requestIndicatorAccess({
      tradingViewUsername: tvUsername,
      email: indicatorEmail,
    });
    setSubmitting(false);
    onClose();
    onSuccess(`Request submitted for @${tvUsername}.`);
    setTvUsername("");
    setIndicatorEmail("");
  };

  const handleSessionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await ApiService.enrollInSession({
      name: sessionName,
      email: sessionEmail,
    });
    setSubmitting(false);
    onClose();
    onSuccess("Application submitted successfully.");
    setSessionName("");
    setSessionEmail("");
  };

  const handleSupportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await ApiService.submitSupportInquiry({
      email: supportEmail,
      message: supportMessage,
    });
    setSubmitting(false);
    onClose();
    onSuccess("Inquiry submitted.");
    setSupportEmail("");
    setSupportMessage("");
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await ApiService.login({
      email: loginEmail,
      password: loginPassword,
    });
    setSubmitting(false);
    onClose();
    onSuccess(`Signed in as ${loginEmail}.`);
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? "open" : ""}`}
      id="global-modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog" id="global-modal-dialog">
        <button
          type="button"
          className="modal-close-btn"
          id="modal-close-trigger"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {type === "indicator" && (
          <div>
            <div className="modal-header">
              <div className="section-label" style={{ marginBottom: "var(--space-2)" }}>
                <span>INDICATOR ACCESS</span>
              </div>
              <h2 className="modal-title">Explore Indicator</h2>
              <p className="modal-desc">
                Provide your TradingView username to request access to the indicator.
              </p>
            </div>
            <form id="form-indicator-access" onSubmit={handleIndicatorSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="tv-username">
                  TradingView Username
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="tv-username"
                  className="form-input"
                  placeholder="Username"
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ind-email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="ind-email"
                  className="form-input"
                  placeholder="name@domain.com"
                  value={indicatorEmail}
                  onChange={(e) => setIndicatorEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "var(--space-4)" }}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Request Access"}
              </button>
            </form>
          </div>
        )}

        {type === "session" && (
          <div>
            <div className="modal-header">
              <div className="section-label" style={{ marginBottom: "var(--space-2)" }}>
                <span>SESSION APPLICATION</span>
              </div>
              <h2 className="modal-title">Join the 3-Day Session</h2>
              <p className="modal-desc">
                Submit your information to receive schedule and enrollment details.
              </p>
            </div>
            <form id="form-session-enroll" onSubmit={handleSessionSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="ses-name">
                  Name
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="ses-name"
                  className="form-input"
                  placeholder="Full name"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ses-email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="ses-email"
                  className="form-input"
                  placeholder="name@domain.com"
                  value={sessionEmail}
                  onChange={(e) => setSessionEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "var(--space-4)" }}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        )}

        {type === "support" && (
          <div>
            <div className="modal-header">
              <div className="section-label" style={{ marginBottom: "var(--space-2)" }}>
                <span>SUPPORT</span>
              </div>
              <h2 className="modal-title">Contact Support</h2>
              <p className="modal-desc">Send an inquiry to the AlgoFinex support desk.</p>
            </div>
            <form id="form-support-inquiry" onSubmit={handleSupportSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="sup-email">
                  Email Address
                </label>
                <input
                  ref={firstInputRef}
                  type="email"
                  id="sup-email"
                  className="form-input"
                  placeholder="name@domain.com"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="sup-msg">
                  Message
                </label>
                <textarea
                  id="sup-msg"
                  className="form-textarea"
                  placeholder="How can we help?"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "var(--space-4)" }}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        )}

        {type === "login" && (
          <div>
            <div className="modal-header">
              <div className="section-label" style={{ marginBottom: "var(--space-2)" }}>
                <span>ACCOUNT</span>
              </div>
              <h2 className="modal-title">Login</h2>
              <p className="modal-desc">Sign in to your AlgoFinex account.</p>
            </div>
            <form id="form-login-auth" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="log-email">
                  Email Address
                </label>
                <input
                  ref={firstInputRef}
                  type="email"
                  id="log-email"
                  className="form-input"
                  placeholder="name@domain.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="log-pass">
                  Password
                </label>
                <input
                  type="password"
                  id="log-pass"
                  className="form-input"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "var(--space-4)" }}
                disabled={submitting}
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
