import React, { useState, ReactNode } from "react";

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: readonly AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    return defaultOpenId ? [defaultOpenId] : [];
  });

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`app-accordion ${className}`.trim()} role="region">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className={`app-accordion-item ${isOpen ? "open" : ""}`}>
            <button
              type="button"
              className="app-accordion-trigger"
              id={`acc-btn-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <span className="app-accordion-title">{item.title}</span>
              <span className="app-accordion-icon" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform var(--duration-fast) var(--ease-standard)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div
              id={`acc-panel-${item.id}`}
              role="region"
              aria-labelledby={`acc-btn-${item.id}`}
              className="app-accordion-panel"
              hidden={!isOpen}
            >
              <div className="app-accordion-content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
