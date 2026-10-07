import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0D]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 min-h-[46px]',
  };

  const variantStyles = {
    // Primary: Reserved for dominant action / gold accent
    primary: 'bg-[#C8A96B] hover:bg-[#D8BB80] text-[#080A0D] font-semibold shadow-[0_2px_12px_rgba(200,169,107,0.25)] hover:shadow-[0_2px_16px_rgba(200,169,107,0.35)]',
    // Secondary: Institutional dark surface
    secondary: 'bg-[#141820] hover:bg-[#1A202A] text-[#F3F4F6] border border-[#20252C] hover:border-[#2E3642]',
    // Outline: Minimal border
    outline: 'bg-transparent hover:bg-white/[0.04] text-[#F3F4F6] border border-[#20252C] hover:border-[#3B4654]',
    // Ghost: No background or border until hover
    ghost: 'bg-transparent hover:bg-white/[0.05] text-[#8B929C] hover:text-[#F3F4F6]',
    // Danger: Muted rose
    danger: 'bg-[#C87878]/15 hover:bg-[#C87878]/25 text-[#C87878] border border-[#C87878]/30',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
