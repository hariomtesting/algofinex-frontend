import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'success' | 'danger' | 'neutral' | 'outline' | 'violet' | 'yellow';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none tracking-tight';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  const variantStyles = {
    accent: 'bg-[#EEF2FF] text-[#4F6BFF] border border-[#E0E7FF]',
    success: 'bg-[#ECFBF6] text-[#059669] border border-[#A7F3D0]',
    danger: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
    neutral: 'bg-[#F4F5F8] text-[#4B5563] border border-[#E5E7EB]',
    outline: 'bg-white text-[#4B5563] border border-[#E5E7EB]',
    violet: 'bg-[#F4F0FF] text-[#7C3AED] border border-[#DDD6FE]',
    yellow: 'bg-[#FFF8E1] text-[#D97706] border border-[#FDE68A]',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
