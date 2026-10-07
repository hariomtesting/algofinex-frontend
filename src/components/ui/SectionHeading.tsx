import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  return (
    <div
      className={`max-w-2xl ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#4F6BFF]/20 text-xs font-semibold text-[#4F6BFF] uppercase tracking-wider mb-3">
          <span className="size-1.5 rounded-full bg-[#4F6BFF]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17181C] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-sm sm:text-base text-[#666B76] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
