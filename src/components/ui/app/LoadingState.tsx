import React from "react";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div className={`app-state-box app-loading-state ${className}`.trim()} role="status" aria-live="polite">
      <div className="app-spinner-ring" aria-hidden="true" />
      <span className="app-state-message">{message}</span>
    </div>
  );
};
