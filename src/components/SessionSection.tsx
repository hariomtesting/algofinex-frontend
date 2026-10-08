import React from "react";
import { SESSION_CONFIG } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface SessionSectionProps {
  readonly onOpenSession: () => void;
}

export const SessionSection: React.FC<SessionSectionProps> = ({ onOpenSession }) => {
  return (
    <section className="section-session" id="session" aria-labelledby="session-monument-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="session-editorial-grid">
            {/* Left Column: Monumental "3 DAYS" Visual Statement */}
            <div className="session-editorial-lead">
              <div className="section-label">
                <span>05 / 3-DAY SESSION</span>
              </div>
              <div className="session-monument-wrap" id="session-monument-heading">
                <span className="session-monument-num">3</span>
                <span className="session-monument-label">DAYS</span>
              </div>
              <h3 className="session-subhead">{SESSION_CONFIG.title}</h3>
              <p className="session-monument-summary">
                {SESSION_CONFIG.summary}
              </p>
              <div className="session-lead-action">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  id="btn-session-join"
                  onClick={onOpenSession}
                >
                  <span>Join 3-Day Session</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Refined 3-Day Curriculum Sequence */}
            <div className="session-editorial-sequence" role="list">
              {SESSION_CONFIG.curriculum.map((item) => (
                <div key={item.day} className="sequence-editorial-row" role="listitem">
                  <div className="sequence-header-line">
                    <span className="sequence-index-tag">{item.day}</span>
                    <span className="sequence-sep" aria-hidden="true">—</span>
                    <h4 className="sequence-title">{item.title.toUpperCase()}</h4>
                  </div>
                  <p className="sequence-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
