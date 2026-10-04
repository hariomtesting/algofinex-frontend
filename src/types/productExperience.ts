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

export interface SystemLayer {
  id: 'structure' | 'liquidity' | 'trend' | 'confirmation';
  number: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  role: string;
  capabilities: string[];
  inChartElement: string;
  color: string;
}

export interface WorkflowJourneyStep {
  step: string;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  traderMindset: string;
  visualState: 'noise' | 'structure' | 'context' | 'setup' | 'execution';
}

export interface RoutineStep {
  num: string;
  phase: string;
  title: string;
  objective: string;
  rule: string;
  status: string;
}

export interface SessionPillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  focusItems: string[];
  outcome: string;
}
