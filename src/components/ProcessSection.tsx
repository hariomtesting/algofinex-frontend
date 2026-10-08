import React from "react";
import { WORKFLOW_STEPS } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export const ProcessSection: React.FC = () => {
  return (
    <section className="section-process" id="workflow" aria-labelledby="process-title">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="process-header">
            <div className="section-label">
              <span>03 / SUGGESTED WORKFLOW</span>
            </div>
            <div className="process-header-grid">
              <h2 className="process-title" id="process-title">
                A structured workflow for market analysis.
              </h2>
              <p className="process-lead">
                A suggested four-stage routine designed to help traders approach charts with discipline and clear personal risk rules rather than emotional improvisation.
              </p>
            </div>
          </div>

          <div className="process-steps-grid" role="list">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.step} className="process-step-item" role="listitem">
                <div className="process-step-top">
                  <span className="process-step-num">{step.step}</span>
                  <div className="process-step-line" aria-hidden="true" />
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
