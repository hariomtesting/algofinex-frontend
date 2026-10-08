import React from "react";
import { Badge, BadgeVariant } from "./Badge";

export type DomainStatus =
  | "active"
  | "provisioning"
  | "pending"
  | "completed"
  | "scheduled"
  | "upcoming"
  | "open"
  | "in_review"
  | "resolved"
  | "confirmed"
  | "not_entitled"
  | "not_enrolled"
  | "error"
  | "draft"
  | "failed"
  | "inactive";

export interface StatusBadgeProps {
  readonly status: DomainStatus | string;
  readonly label?: string;
  readonly showDot?: boolean;
  readonly className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showDot = true,
  className = "",
}) => {
  let variant: BadgeVariant = "neutral";
  let displayLabel = label || status;

  switch (status) {
    case "active":
    case "completed":
    case "resolved":
    case "confirmed":
      variant = "success";
      break;
    case "provisioning":
    case "pending":
    case "in_review":
    case "scheduled":
      variant = "warning";
      break;
    case "open":
    case "upcoming":
      variant = "info";
      break;
    case "error":
    case "failed":
    case "inactive":
      variant = "error";
      break;
    case "not_entitled":
    case "not_enrolled":
    case "draft":
    default:
      variant = "neutral";
  }

  // Format label: capitalize words
  if (!label) {
    displayLabel = status
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <Badge variant={variant} size="sm" className={`app-status-badge ${className}`}>
      {showDot && <span className="app-status-dot" aria-hidden="true" />}
      <span>{displayLabel}</span>
    </Badge>
  );
};
