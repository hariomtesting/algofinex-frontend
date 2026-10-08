import React, { useState } from "react";
import { FAQ_ITEMS } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface FaqSectionProps {
  readonly onOpenSupport: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenSupport }) => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-faq" id="faq" aria-labelledby="faq-section-title">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="faq-layout-grid">
            {/* Left Column: Heading & Support Access */}
            <div className="faq-editorial-lead">
              <div className="section-label">
                <span>08 / QUESTIONS</span>
              </div>
              <h2 className="faq-main-title" id="faq-section-title">
                FREQUENTLY ASKED QUESTIONS.
              </h2>
              <p className="faq-lead-desc">
                Everything you need to know regarding TradingView indicator access, installation requirements, and 3-day session participation.
              </p>
              <div className="faq-support-box">
                <span className="faq-support-caption font-mono text-xs">NEED ASSISTANCE?</span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  id="btn-faq-support"
                  onClick={onOpenSupport}
                >
                  <span>Contact Support Desk</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Large Typography Accordion */}
            <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions">
              {FAQ_ITEMS.slice(0, 6).map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-accordion-trigger"
                      id={`btn-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`panel-${item.id}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <span className="faq-question-text">{item.question}</span>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
                      id={`panel-${item.id}`}
                      role="region"
                      aria-labelledby={`btn-${item.id}`}
                      className="faq-accordion-panel"
                      hidden={!isOpen}
                    >
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
