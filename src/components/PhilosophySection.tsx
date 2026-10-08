import React from "react";
import { ScrollReveal } from "./ui/ScrollReveal";

export const PhilosophySection: React.FC = () => {
  return (
    <section className="section-philosophy" id="overview" aria-labelledby="philosophy-title">
      <div className="container">
        <ScrollReveal distance={8}>
          <div className="philosophy-wrapper">
            <div className="section-label">
              <span>01 / BRAND STATEMENT</span>
            </div>

            <div className="philosophy-grid">
              <div className="philosophy-headline-col">
                <h2 className="philosophy-title" id="philosophy-title">
                  MARKETS ARE NOISY.<br />
                  <span className="philosophy-highlight">THE PROCESS DOESN'T HAVE TO BE.</span>
                </h2>
              </div>

              <div className="philosophy-content-col">
                <p className="philosophy-lead">
                  Modern charting setups often accumulate visual complexity rather than analytical clarity. Layers of contradictory indicators, reactive alerts, and perpetual noise distract from the fundamental requirement of trading: understanding market context.
                </p>
                <p className="philosophy-sub">
                  AlgoFinex was built on a deliberate conviction: sustainable market decision-making begins by stripping away the noise. We build tools and curriculum designed to provide clear, calm chart references — helping traders cultivate consistency, structured habits, and disciplined risk awareness.
                </p>

                <div className="philosophy-credo-strip" aria-label="Core Philosophy Pillars">
                  <div className="credo-pillar">
                    <span className="credo-num">01</span>
                    <span className="credo-text">CONTEXT OVER NOISE</span>
                  </div>
                  <div className="credo-sep" aria-hidden="true">—</div>
                  <div className="credo-pillar">
                    <span className="credo-num">02</span>
                    <span className="credo-text">STRUCTURE OVER IMPULSE</span>
                  </div>
                  <div className="credo-sep" aria-hidden="true">—</div>
                  <div className="credo-pillar">
                    <span className="credo-num">03</span>
                    <span className="credo-text">DISCIPLINE OVER PROMISES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
