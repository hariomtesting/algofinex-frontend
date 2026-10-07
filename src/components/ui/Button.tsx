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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[34px]',
    md: 'text-sm px-4.5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    // Primary: Vibrant electric blue #4F6BFF
    primary: 'bg-[#4F6BFF] hover:bg-[#4059E0] text-white font-medium shadow-xs hover:-translate-y-0.5 active:translate-y-0',
    // Secondary: Clean white surface with subtle border
    secondary: 'bg-white hover:bg-[#F9F9F8] text-[#17181C] border border-[#EAEAE5] hover:border-[#D8D8D2] shadow-xs hover:-translate-y-0.5 active:translate-y-0',
    // Outline: Soft electric blue border
    outline: 'bg-transparent hover:bg-[#F1F4FF] text-[#4F6BFF] border border-[#E0E7FF] hover:border-[#C7D2FE]',
    // Ghost: Subtle hover state
    ghost: 'bg-transparent hover:bg-[#F1F3F5] text-[#666B76] hover:text-[#17181C]',
    // Danger: Soft coral
    danger: 'bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]/60',
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

export default Button;
