import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-1.5 p-1 bg-[#101318] border border-[#20252C] rounded-xl overflow-x-auto select-none ${className}`}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-[#1E2532] text-[#F3F4F6] shadow-xs border border-[#2E3642]'
                : 'text-[#8B929C] hover:text-[#F3F4F6] hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            {tab.icon && <span className="size-3.5 flex items-center">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive
                    ? 'bg-[#C8A96B]/20 text-[#C8A96B]'
                    : 'bg-white/[0.06] text-[#8B929C]'
                }`}
              >
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
