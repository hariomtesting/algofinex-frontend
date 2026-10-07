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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141820] border border-[#20252C] text-[11px] font-mono font-medium text-[#C8A96B] uppercase tracking-wider mb-3">
          <span className="size-1.5 rounded-full bg-[#C8A96B]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-sm sm:text-base text-[#8B929C] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
