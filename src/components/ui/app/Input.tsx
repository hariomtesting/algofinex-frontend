import { InputHTMLAttributes, forwardRef, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className = "", ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="app-form-group">
        {label && (
          <label htmlFor={inputId} className="app-form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`app-input ${error ? "has-error" : ""} ${className}`.trim()}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="app-form-error" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-help`} className="app-form-helper">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
