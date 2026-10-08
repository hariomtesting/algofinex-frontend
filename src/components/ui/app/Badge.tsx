import React from "react";

export type BadgeVariant = "default" | "neutral" | "outline" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <span
      className={`app-badge app-badge-${variant} app-badge-${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};
