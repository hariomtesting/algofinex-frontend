import React, { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClass = "app-btn";
    const variantClass = `app-btn-${variant}`;
    const sizeClass = `app-btn-${size}`;
    const loadingClass = isLoading ? "is-loading" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim()}
        {...props}
      >
        {isLoading && (
          <span className="app-btn-spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="16" />
            </svg>
          </span>
        )}
        {!isLoading && icon && <span className="app-btn-icon">{icon}</span>}
        <span className="app-btn-text">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
