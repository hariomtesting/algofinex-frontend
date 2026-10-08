import React, { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`app-state-box app-empty-state ${className}`.trim()}>
      {icon && <div className="app-empty-icon">{icon}</div>}
      <h4 className="app-empty-title">{title}</h4>
      <p className="app-empty-desc">{description}</p>
      {action && <div className="app-empty-action">{action}</div>}
    </div>
  );
};
