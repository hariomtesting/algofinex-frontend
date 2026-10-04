export type ExperienceMode = 'STRUCTURE' | 'LIQUIDITY' | 'TREND' | 'CONFIRMATION';

export interface ExperienceModeData {
  id: ExperienceMode;
  label: string;
  tagline: string;
  headline: string;
  description: string;
  whatYouSee: string[];
  traditionalNoise: string;
  indicatorAdvantage: string;
  activeMetrics: {
    label: string;
    value: string;
    state: 'bull' | 'bear' | 'neutral' | 'accent';
  }[];
}

export interface IndicatorProduct {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  role: string;
  features: string[];
  techSpecs: {
    label: string;
    value: string;
  }[];
  accentColor: string;
}

export interface SessionPillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  focusItems: string[];
  outcome: string;
}

export interface WorkflowStage {
  step: string;
  label: string;
  title: string;
  description: string;
  badge: string;
  status: 'noise' | 'structure' | 'signal' | 'execution';
}
