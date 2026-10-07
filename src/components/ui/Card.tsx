import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl border transition-all duration-200 text-left';

  const variantStyles = {
    default: 'bg-[#101318] border-[#20252C]',
    elevated: 'bg-[#141820] border-[#20252C] shadow-panel',
    subtle: 'bg-[#0B0E13] border-[#1C2128]',
    interactive: 'bg-[#101318] border-[#20252C] hover:border-[#C8A96B]/50 hover:bg-[#12161E] hover:shadow-card-hover cursor-pointer',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
