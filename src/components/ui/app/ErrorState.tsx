import React, { ReactNode } from "react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  action,
  className = "",
}) => {
  return (
    <div className={`app-state-box app-error-state ${className}`.trim()} role="alert">
      <div className="app-error-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h4 className="app-error-title">{title}</h4>
      <p className="app-error-desc">{message}</p>
      {onRetry && (
        <div className="app-error-action">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
      {action && !onRetry && <div className="app-error-action">{action}</div>}
    </div>
  );
};
