import React, { useState } from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface IndicatorDetailsSectionProps {
  readonly onExploreClick: () => void;
}

export const IndicatorDetailsSection: React.FC<IndicatorDetailsSectionProps> = ({ onExploreClick }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const capabilities = [
    {
      index: "01",
      title: "MARKET VIEW",
      summary: "Visual tools designed to help organize market information directly on the chart.",
      detail: "Provides a clean price path and reference baseline directly on your TradingView chart, reducing visual clutter and emphasizing underlying market rhythm.",
      badge: "BASELINE REFERENCE",
    },
    {
      index: "02",
      title: "CONTEXT",
      summary: "Chart-based references for interpreting changing market conditions.",
      detail: "Dual reference boundaries create a clear contextual envelope around price action, helping you evaluate whether current moves are within or beyond expected range.",
      badge: "REFERENCE ENVELOPE",
    },
    {
      index: "03",
      title: "DECISION PROCESS",
      summary: "Designed to support a more structured approach to chart analysis.",
      detail: "Identifies structural inflection levels and candidate decision points to support your personal rules-based execution framework.",
      badge: "STRUCTURAL LEVELS",
    },
  ];

  return (
    <section className="section-indicator-details" id="product-anatomy" aria-labelledby="anatomy-heading">
      <div className="container">
        <ScrollReveal distance={8}>
          {/* Section Header */}
          <div className="indicator-details-header">
            <div className="section-label">
              <span>03 / PRODUCT ANATOMY</span>
            </div>
            <div className="indicator-details-header-grid">
              <h2 className="indicator-details-title" id="anatomy-heading">
                WHAT YOU SEE.
              </h2>
              <p className="indicator-details-lead">
                Three focused visual layers engineered into the TradingView analytical overlay. Clear geometric reference structures designed to replace noisy indicators.
              </p>
            </div>
          </div>

          {/* Substantial Capabilities Anatomy List */}
          <div className="capabilities-editorial-list" role="list">
            {capabilities.map((cap, index) => {
              const isSelected = activeIdx === index;
              return (
                <div
                  key={cap.index}
                  className={`capability-editorial-row ${isSelected ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIdx(index)}
                  tabIndex={0}
                  role="listitem"
                  aria-label={cap.title}
                  onFocus={() => setActiveIdx(index)}
                >
                  {/* Left Column: Number, Title, Typography & Copy */}
                  <div className="capability-left">
                    <div className="capability-meta">
                      <span className="capability-num font-mono">{cap.index}</span>
                      <span className="capability-badge font-mono">{cap.badge}</span>
                    </div>
                    <h3 className="capability-name">{cap.title}</h3>
                    <p className="capability-desc">{cap.summary}</p>
                    <p className="capability-subdesc">{cap.detail}</p>
                  </div>

                  {/* Right Column: High-Impact Visual Diagram & Architectural Schematic */}
                  <div className="capability-right">
                    <div className="capability-visual-artifact" aria-hidden="true">
                      {index === 0 && (
                        <div className="artifact-schematic artifact-market-view">
                          <div className="schematic-top-label">
                            <span className="font-mono text-xs">DIAGRAM // BASELINE TRAJECTORY</span>
                            <span className="font-mono text-xs text-muted">01 VIEW</span>
                          </div>
                          <svg viewBox="0 0 460 160" className="artifact-svg" fill="none">
                            {/* Grid ticks */}
                            <line x1="20" y1="40" x2="440" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                            <line x1="20" y1="80" x2="440" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                            <line x1="20" y1="120" x2="440" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                            
                            {/* Vertical divisions */}
                            <line x1="120" y1="20" x2="120" y2="140" stroke="rgba(255,255,255,0.02)" />
                            <line x1="240" y1="20" x2="240" y2="140" stroke="rgba(255,255,255,0.02)" />
                            <line x1="360" y1="20" x2="360" y2="140" stroke="rgba(255,255,255,0.02)" />

                            {/* Baseline structure line */}
                            <path
                              d="M 30,115 Q 100,105 160,75 T 300,70 T 430,45"
                              stroke="rgba(255,255,255,0.85)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />

                            {/* Nodes along baseline */}
                            <circle cx="160" cy="75" r="4" fill="#ffffff" />
                            <circle cx="300" cy="70" r="4" fill="#ffffff" />
                            <circle cx="430" cy="45" r="5" fill="#10B981" stroke="#ffffff" strokeWidth="1.5" />

                            <text x="32" y="28" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="'JetBrains Mono', monospace">REFERENCE BASELINE // CLEAN PATH</text>
                            <text x="375" y="38" fill="rgba(16,185,129,0.9)" fontSize="10" fontFamily="'JetBrains Mono', monospace">+14.2%</text>
                          </svg>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="artifact-schematic artifact-context">
                          <div className="schematic-top-label">
                            <span className="font-mono text-xs">DIAGRAM // REFERENCE ENVELOPE</span>
                            <span className="font-mono text-xs text-muted">02 BOUNDS</span>
                          </div>
                          <svg viewBox="0 0 460 160" className="artifact-svg" fill="none">
                            {/* Upper boundary line */}
                            <path
                              d="M 30,55 Q 120,30 220,38 T 430,22"
                              stroke="rgba(16,185,129,0.55)"
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                            />
                            {/* Lower boundary line */}
                            <path
                              d="M 30,125 Q 120,100 220,108 T 430,92"
                              stroke="rgba(255,255,255,0.18)"
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                            />
                            {/* Shaded reference channel */}
                            <path
                              d="M 30,55 Q 120,30 220,38 T 430,22 L 430,92 Q 330,108 220,108 T 30,125 Z"
                              fill="rgba(16,185,129,0.035)"
                            />
                            {/* Price traversal path */}
                            <path
                              d="M 30,90 Q 120,65 220,78 T 430,55"
                              stroke="rgba(255,255,255,0.9)"
                              strokeWidth="2"
                            />
                            <text x="32" y="28" fill="rgba(16,185,129,0.85)" fontSize="10" fontFamily="'JetBrains Mono', monospace">UPPER BOUND // CONTEXT LEVEL</text>
                            <text x="32" y="148" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="'JetBrains Mono', monospace">LOWER BOUND // SUPPORT LEVEL</text>
                          </svg>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="artifact-schematic artifact-decision">
                          <div className="schematic-top-label">
                            <span className="font-mono text-xs">DIAGRAM // DECISION PROCESS</span>
                            <span className="font-mono text-xs text-muted">03 INFLECTION</span>
                          </div>
                          <svg viewBox="0 0 460 160" className="artifact-svg" fill="none">
                            {/* Lower reference level */}
                            <line x1="30" y1="115" x2="430" y2="115" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                            <rect x="30" y="108" width="110" height="14" fill="rgba(255,255,255,0.05)" rx="2" />
                            <text x="35" y="119" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="'JetBrains Mono', monospace">LOWER THRESHOLD</text>

                            {/* Upper reference level */}
                            <line x1="30" y1="55" x2="430" y2="55" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 4" />
                            <rect x="30" y="48" width="110" height="14" fill="rgba(16,185,129,0.07)" rx="2" />
                            <text x="35" y="59" fill="rgba(16,185,129,0.9)" fontSize="9" fontFamily="'JetBrains Mono', monospace">UPPER THRESHOLD</text>

                            {/* Candidate progression path */}
                            <path
                              d="M 120,110 L 200,90 L 280,95 L 390,60"
                              stroke="rgba(255,255,255,0.9)"
                              strokeWidth="2"
                            />
                            <circle cx="200" cy="90" r="3.5" fill="#ffffff" />
                            <circle cx="280" cy="95" r="3.5" fill="#ffffff" />
                            <circle cx="390" cy="60" r="4.5" fill="rgba(16,185,129,0.9)" stroke="#ffffff" strokeWidth="1.5" />

                            <text x="310" y="45" fill="rgba(16,185,129,0.9)" fontSize="10" fontFamily="'JetBrains Mono', monospace">DECISION NODE</text>
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
              <span>Explore Indicator Access</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
