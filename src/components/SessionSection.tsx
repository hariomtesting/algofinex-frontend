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
            {/* Left Column: Monumental "3 DAYS" Sticky Lead Anchor */}
            <div className="session-editorial-lead session-sticky-col">
              <div className="section-label">
                <span>05 / GUIDED CURRICULUM</span>
              </div>

              <div className="session-monument-wrap" id="session-monument-heading">
                <span className="session-monument-num">3</span>
                <span className="session-monument-label">DAYS</span>
              </div>

              <div className="session-lead-body">
                <span className="session-badge font-mono">FOCUSED GUIDED INTRODUCTION</span>
                <h3 className="session-subhead">{SESSION_CONFIG.title}</h3>
                <p className="session-monument-summary">
                  {SESSION_CONFIG.summary}
                </p>
              </div>

              <div className="session-lead-action">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  id="btn-session-join"
                  onClick={onOpenSession}
                >
                  <span>Join 3-Day Session</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Three Curriculum Stages with Conceptual Geometry */}
            <div className="session-editorial-sequence" role="list" aria-label="Curriculum stages">
              {SESSION_CONFIG.curriculum.map((item, idx) => (
                <div key={item.day} className="sequence-editorial-row" role="listitem">
                  <div className="sequence-row-top">
                    <div className="sequence-header-line">
                      <span className="sequence-index-tag font-mono">DAY {item.day}</span>
                      <span className="sequence-sep" aria-hidden="true">—</span>
                      <h4 className="sequence-title">{item.title.toUpperCase()}</h4>
                    </div>
                    <span className="sequence-num-watermark font-mono" aria-hidden="true">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="sequence-description">{item.description}</p>

                  {/* Supporting Conceptual Diagram */}
                  <div className="sequence-stage-visual" aria-hidden="true">
                    {idx === 0 && (
                      <svg viewBox="0 0 380 90" className="stage-mini-svg" fill="none">
                        <line x1="20" y1="45" x2="360" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <line x1="20" y1="20" x2="360" y2="20" stroke="rgba(16,185,129,0.2)" strokeDasharray="3 3" />
                        <line x1="20" y1="70" x2="360" y2="70" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                        <circle cx="90" cy="45" r="3.5" fill="#ffffff" />
                        <circle cx="190" cy="45" r="3.5" fill="#ffffff" />
                        <circle cx="290" cy="45" r="4.5" fill="#10B981" />
                        <text x="24" y="16" fill="rgba(16,185,129,0.8)" fontSize="9" fontFamily="'JetBrains Mono', monospace">CHART ORIENTATION</text>
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg viewBox="0 0 380 90" className="stage-mini-svg" fill="none">
                        <path d="M 20,65 Q 90,60 160,35 T 280,30 T 360,20" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                        <path d="M 20,40 Q 90,35 160,20 T 280,15 T 360,10" stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="160" cy="35" r="3" fill="#10B981" />
                        <circle cx="280" cy="30" r="3" fill="#10B981" />
                        <text x="24" y="80" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace">EXECUTION ROUTINE</text>
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg viewBox="0 0 380 90" className="stage-mini-svg" fill="none">
                        <rect x="20" y="25" width="80" height="40" rx="3" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.02)" />
                        <text x="35" y="48" fill="#ffffff" fontSize="9" fontFamily="'JetBrains Mono', monospace">OBSERVE</text>
                        <line x1="100" y1="45" x2="135" y2="45" stroke="rgba(255,255,255,0.3)" />
                        <rect x="135" y="25" width="80" height="40" rx="3" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.02)" />
                        <text x="152" y="48" fill="#ffffff" fontSize="9" fontFamily="'JetBrains Mono', monospace">DECIDE</text>
                        <line x1="215" y1="45" x2="250" y2="45" stroke="rgba(255,255,255,0.3)" />
                        <rect x="250" y="25" width="80" height="40" rx="3" stroke="rgba(16,185,129,0.5)" fill="rgba(16,185,129,0.04)" />
                        <text x="268" y="48" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">REVIEW</text>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
