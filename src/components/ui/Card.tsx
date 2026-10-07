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
  const baseStyles = 'rounded-2xl border transition-all duration-200 text-left';

  const variantStyles = {
    default: 'bg-white border-[#EAEAE5] shadow-xs',
    elevated: 'bg-white border-[#EAEAE5] shadow-sm',
    subtle: 'bg-[#FAFAF7] border-[#EAEAE5]',
    interactive: 'bg-white border-[#EAEAE5] shadow-xs hover:border-[#4F6BFF]/40 hover:shadow-card-hover cursor-pointer hover:-translate-y-0.5',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
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

export default Card;
