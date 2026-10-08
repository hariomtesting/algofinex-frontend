import React from "react";
import { BRAND_CONFIG } from "../data/mockData";
import { ChartPreview } from "./ChartPreview";
import { BlurText } from "./ui/BlurText";
import { SpotlightCard } from "./ui/SpotlightCard";
import { ScrollReveal } from "./ui/ScrollReveal";

export interface HeroProps {
  readonly onOpenIndicator: () => void;
  readonly onOpenSession: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenIndicator, onOpenSession }) => {
  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-main-title">
      {/* Background ambient radial depth behind product visual */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="container hero-container">
        {/* 12-Column Asymmetric Desktop Layout */}
        <div className="hero-grid">
          {/* Columns 1-5: Editorial Product Launch Anchor */}
          <div className="hero-col-text">
            <div className="hero-brand-mark" aria-hidden="true">
              <span className="brand-dot" />
              <span>{BRAND_CONFIG.name}</span>
            </div>

            <h1 className="hero-title" id="hero-main-title">
              <span className="hero-title-line">
                <BlurText text="TRADE WITH" delay={30} duration={0.32} blurAmount={4} />
              </span>
              <span className="hero-title-line">
                <BlurText text="CLARITY." delay={70} duration={0.32} blurAmount={4} />
              </span>
            </h1>

            <p className="hero-description">
              {BRAND_CONFIG.subheadline}
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                id="btn-hero-explore"
                onClick={onOpenIndicator}
              >
                <span>Explore Indicator</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className="hero-secondary-link"
                id="btn-hero-session"
                onClick={onOpenSession}
              >
                Join 3-Day Session
              </button>
            </div>
          </div>

          {/* Columns 6-12: The Elegant Product Teaser Canvas */}
          <div className="hero-col-visual">
            <ScrollReveal distance={10} delay={60}>
              <div className="hero-visual-frame" id="hero-chart-container">
                <SpotlightCard
                  spotlightColor="rgba(16, 185, 129, 0.05)"
                  spotlightRadius={520}
                  className="hero-spotlight-wrap"
                >
                  <ChartPreview label="ALGOFINEX INDICATOR" isHeroMain={true} />
                </SpotlightCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
