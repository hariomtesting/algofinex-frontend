import React, { ReactNode } from "react";

export interface SuccessStateProps {
  readonly title?: string;
  readonly message: string;
  readonly action?: ReactNode;
  readonly className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = "Action Successful",
  message,
  action,
  className = "",
}) => {
  return (
    <div className={`app-state-box app-success-state ${className}`.trim()} role="status">
      <div className="app-success-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h4 className="app-success-title">{title}</h4>
      <p className="app-success-desc">{message}</p>
      {action && <div className="app-success-action">{action}</div>}
    </div>
  );
};
