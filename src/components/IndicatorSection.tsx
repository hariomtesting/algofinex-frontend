import React from "react";
import { INDICATOR_PRODUCT } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface IndicatorSectionProps {
  readonly onOpenIndicator: () => void;
}

export const IndicatorSection: React.FC<IndicatorSectionProps> = ({ onOpenIndicator }) => {
  return (
    <section className="section-indicator" id="indicator" aria-labelledby="indicator-title">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="indicator-editorial-grid">
            {/* Left Column: Large Editorial Product Title & Statement */}
            <div className="indicator-editorial-lead">
              <div className="section-label">
                <span>01 / THE INDICATOR</span>
              </div>
              <h2 className="indicator-title" id="indicator-title">
                {INDICATOR_PRODUCT.headline}
              </h2>
              <p className="indicator-statement">
                {INDICATOR_PRODUCT.summary}
              </p>
              <div className="indicator-lead-action">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  id="btn-indicator-explore"
                  onClick={onOpenIndicator}
                >
                  <span>Explore Indicator</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Three Concise Capability Rows */}
            <div className="indicator-editorial-capabilities" role="list">
              {INDICATOR_PRODUCT.capabilities.map((item) => (
                <div key={item.index} className="capability-editorial-row" role="listitem">
                  <div className="capability-header-line">
                    <span className="capability-index">{item.index}</span>
                    <span className="capability-sep" aria-hidden="true">—</span>
                    <h3 className="capability-title">{item.title.toUpperCase()}</h3>
                  </div>
                  <p className="capability-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
