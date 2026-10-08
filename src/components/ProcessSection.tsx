import React, { useState } from "react";
import { WORKFLOW_STEPS } from "../data/mockData";
import { ScrollReveal } from "./ui/ScrollReveal";

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="section-process" id="workflow" aria-labelledby="process-title">
      <div className="container">
        <ScrollReveal distance={8}>
          {/* Section Header */}
          <div className="process-header">
            <div className="section-label">
              <span>04 / TRADING WORKFLOW</span>
            </div>
            <div className="process-header-grid">
              <h2 className="process-title" id="process-title">
                A STRUCTURED TRADING WORKFLOW.
              </h2>
              <p className="process-lead">
                A four-stage analytical sequence designed to help traders approach charts with discipline and personal risk rules rather than emotional improvisation.
              </p>
            </div>
          </div>

          {/* Horizontal Progression Pipeline */}
          <div className="process-pipeline-wrap" role="region" aria-label="Workflow progression">
            <div className="process-rail-bar" aria-hidden="true">
              <div
                className="process-rail-progress"
                style={{ width: `${((activeStep + 1) / WORKFLOW_STEPS.length) * 100}%` }}
              />
            </div>

            <div className="process-steps-grid" role="list">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <div
                    key={step.step}
                    className={`process-step-item ${isSelected ? "is-active" : ""}`}
                    role="listitem"
                    tabIndex={0}
                    onMouseEnter={() => setActiveStep(idx)}
                    onFocus={() => setActiveStep(idx)}
                  >
                    <div className="process-step-top">
                      <div className="process-step-indicator">
                        <span className="process-step-num font-mono">{step.step}</span>
                        <span className="process-step-node" aria-hidden="true" />
                      </div>
                      <div className="process-step-line" aria-hidden="true" />
                    </div>

                    <div className="process-step-body">
                      <div className="process-step-badge font-mono">STAGE {step.step}</div>
                      <h3 className="process-step-title">{step.title.toUpperCase()}</h3>
                      <p className="process-step-desc">{step.description}</p>
                    </div>

                    <div className="process-step-footer">
                      <span className="process-step-subtext font-mono text-xs">
                        {idx === 0 && "Market Context"}
                        {idx === 1 && "Visual Analysis"}
                        {idx === 2 && "Personal Risk"}
                        {idx === 3 && "Post-Trade Review"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explicit Framing Note */}
          <div className="process-framing-note">
            <span className="process-note-icon font-mono">i</span>
            <span className="process-note-text">
              Framed as a structured trading workflow. AlgoFinex provides chart clarity tools to assist your analysis; traders establish and apply their own individual risk rules.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
