import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'success' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded uppercase select-none tracking-wider';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    accent: 'bg-[#C8A96B]/12 text-[#C8A96B] border border-[#C8A96B]/30',
    success: 'bg-[#6FAF8A]/12 text-[#6FAF8A] border border-[#6FAF8A]/30',
    danger: 'bg-[#C87878]/12 text-[#C87878] border border-[#C87878]/30',
    neutral: 'bg-[#1E2532] text-[#8B929C] border border-[#20252C]',
    outline: 'bg-transparent text-[#8B929C] border border-[#20252C]',
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
