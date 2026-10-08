import React, { useState } from "react";
import { INDICATOR_PRODUCT } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface IndicatorDetailsSectionProps {
  readonly onExploreClick: () => void;
}

export const IndicatorDetailsSection: React.FC<IndicatorDetailsSectionProps> = ({ onExploreClick }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section className="section-indicator-details" id="indicator-details" aria-labelledby="indicator-details-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="indicator-details-header">
            <div className="section-label">
              <span>04 / INDICATOR CAPABILITIES</span>
            </div>
            <div className="indicator-details-header-grid">
              <h2 className="indicator-details-title" id="indicator-details-heading">
                {INDICATOR_PRODUCT.headline}
              </h2>
              <p className="indicator-details-lead">
                {INDICATOR_PRODUCT.summary}
              </p>
            </div>
          </div>

          <div className="capabilities-editorial-list">
            {INDICATOR_PRODUCT.capabilities.map((cap, index) => {
              const isSelected = activeIdx === index;
              return (
                <div
                  key={cap.index}
                  className={`capability-editorial-row ${isSelected ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIdx(index)}
                  tabIndex={0}
                  role="region"
                  aria-label={cap.title}
                  onFocus={() => setActiveIdx(index)}
                >
                  {/* Left Column: Large capability title & typography */}
                  <div className="capability-left">
                    <div className="capability-meta">
                      <span className="capability-num">{cap.index}</span>
                      {cap.badge && <span className="capability-badge">{cap.badge}</span>}
                    </div>
                    <h3 className="capability-name">{cap.title}</h3>
                  </div>

                  {/* Right Column: Editorial description + subtle product visualization */}
                  <div className="capability-right">
                    <p className="capability-desc">{cap.description}</p>
                    
                    <div className="capability-visual-artifact" aria-hidden="true">
                      {index === 0 && (
                        <div className="artifact-schematic artifact-market-view">
                          <svg viewBox="0 0 400 120" className="artifact-svg" fill="none">
                            {/* Grid ticks */}
                            <line x1="20" y1="30" x2="380" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                            <line x1="20" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                            <line x1="20" y1="90" x2="380" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                            {/* Baseline structure line */}
                            <path
                              d="M 30,85 Q 90,75 140,55 T 250,50 T 370,35"
                              stroke="rgba(255,255,255,0.75)"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                            />
                            {/* Nodes along baseline */}
                            <circle cx="140" cy="55" r="3" fill="#ffffff" />
                            <circle cx="250" cy="50" r="3" fill="#ffffff" />
                            <circle cx="370" cy="35" r="3" fill="#ffffff" />
                            <text x="32" y="24" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">REFERENCE BASELINE</text>
                          </svg>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="artifact-schematic artifact-context">
                          <svg viewBox="0 0 400 120" className="artifact-svg" fill="none">
                            {/* Reference Bands */}
                            <path
                              d="M 30,45 Q 110,25 200,32 T 370,20"
                              stroke="rgba(16,185,129,0.5)"
                              strokeWidth="1.2"
                              strokeDasharray="3 3"
                            />
                            <path
                              d="M 30,95 Q 110,75 200,82 T 370,70"
                              stroke="rgba(16,185,129,0.35)"
                              strokeWidth="1.2"
                              strokeDasharray="3 3"
                            />
                            {/* Shaded reference channel */}
                            <path
                              d="M 30,45 Q 110,25 200,32 T 370,20 L 370,70 Q 290,82 200,82 T 30,95 Z"
                              fill="rgba(16,185,129,0.03)"
                            />
                            {/* Price traversal */}
                            <path
                              d="M 30,70 Q 110,50 200,60 T 370,45"
                              stroke="rgba(255,255,255,0.85)"
                              strokeWidth="1.75"
                            />
                            <text x="32" y="24" fill="rgba(16,185,129,0.8)" fontSize="10" fontFamily="monospace">REFERENCE BOUNDARY</text>
                          </svg>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="artifact-schematic artifact-decision">
                          <svg viewBox="0 0 400 120" className="artifact-svg" fill="none">
                            {/* Lower reference level */}
                            <line x1="30" y1="85" x2="370" y2="85" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
                            <rect x="30" y="80" width="94" height="12" fill="rgba(255,255,255,0.04)" rx="2" />
                            <text x="34" y="89" fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="monospace">LOWER REFERENCE</text>
                            
                            {/* Upper reference level */}
                            <line x1="30" y1="45" x2="370" y2="45" stroke="rgba(16,185,129,0.35)" strokeWidth="1" strokeDasharray="4 4" />
                            <rect x="30" y="40" width="94" height="12" fill="rgba(16,185,129,0.05)" rx="2" />
                            <text x="34" y="49" fill="rgba(16,185,129,0.85)" fontSize="9" fontFamily="monospace">UPPER REFERENCE</text>

                            {/* Candidate progression */}
                            <path
                              d="M 120,80 L 190,65 L 260,70 L 340,48"
                              stroke="rgba(255,255,255,0.9)"
                              strokeWidth="1.75"
                            />
                            <circle cx="340" cy="48" r="3.5" fill="rgba(16,185,129,0.8)" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="indicator-details-cta">
            <button
              type="button"
              className="btn btn-secondary"
              id="btn-explore-indicator-details"
              onClick={onExploreClick}
            >
              <span>Explore Indicator</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
