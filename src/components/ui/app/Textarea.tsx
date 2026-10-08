import { TextareaHTMLAttributes, forwardRef, useId } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = "", rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
      <div className="app-form-group">
        {label && (
          <label htmlFor={textareaId} className="app-form-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`app-textarea ${error ? "has-error" : ""} ${className}`.trim()}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-help` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="app-form-error" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${textareaId}-help`} className="app-form-helper">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
