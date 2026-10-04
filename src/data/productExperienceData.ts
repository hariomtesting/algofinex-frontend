import { 
  ExperienceModeData, 
  SystemLayer, 
  SessionPillar, 
  WorkflowJourneyStep,
  RoutineStep
} from '../types/productExperience';

export const EXPERIENCE_MODES: Record<string, ExperienceModeData> = {
  STRUCTURE: {
    id: 'STRUCTURE',
    label: 'Market Structure',
    tagline: 'Swing Sequences & Breakpoints',
    headline: 'Your chart should show more than raw price.',
    description: 'Raw candlesticks conceal the underlying rhythm of buying and selling. AlgoFinex automatically maps higher-high sequences, breaks of structure (BOS), and shifts in character without cluttering your view.',
    whatYouSee: [
      'Validated Higher-High & Higher-Low swing levels',
      'Instant Break of Structure (BOS) markers on bar close',
      'Structural shift markers distinguishing trends from range chop',
      'Dynamic invalidation boundaries based on market swing pivots'
    ],
    traditionalNoise: 'Cluttered manual trendlines that redraw with every new wick and create subjective bias.',
    indicatorAdvantage: 'Objective, rule-based structural boundaries calculated identically on every bar close.',
    activeMetrics: [
      { label: 'Structural State', value: 'Higher-Low Sequence', state: 'bull' },
      { label: 'Break Status', value: 'BOS Validated', state: 'accent' },
      { label: 'Range Low', value: '$65,950 Defended', state: 'neutral' },
      { label: 'Invalidation', value: '$66,180 Intact', state: 'neutral' }
    ]
  },
  LIQUIDITY: {
    id: 'LIQUIDITY',
    label: 'Liquidity Dynamics',
    tagline: 'Order Clusters & Fair Value Gaps',
    headline: 'See where liquidity sits before displacement begins.',
    description: 'Markets do not reverse randomly; they reach for resting liquidity pools. AlgoFinex highlights key buy-side sweeps, sell-side absorption zones, and fair value gaps where institutional volume defended price.',
    whatYouSee: [
      'Institutional Demand & Supply order block boxes',
      'Mitigated vs. unmitigated Fair Value Gap (FVG) zones',
      'Sell-side liquidity sweep callouts before trend resumption',
      'Clear targets based on unharvested overhead liquidity'
    ],
    traditionalNoise: 'Guessing support levels from single candlestick wicks without knowing where resting orders reside.',
    indicatorAdvantage: 'Visualized imbalance zones that update in real time when price mitigates and confirms volume interest.',
    activeMetrics: [
      { label: 'Demand Zone', value: '$65,950 – $66,200', state: 'bull' },
      { label: 'FVG Status', value: 'Mitigated & Defended', state: 'accent' },
      { label: 'Overhead Pool', value: '$68,150 – $68,350', state: 'neutral' },
      { label: 'Absorption', value: 'Sell-Side Swept', state: 'bull' }
    ]
  },
  TREND: {
    id: 'TREND',
    label: 'Trend Context',
    tagline: 'Dynamic Adaptive Clouds',
    headline: 'Trade with macro momentum, not against it.',
    description: 'Static moving averages lag during rapid shifts and produce whipsaws in consolidation. AlgoFinex deploys adaptive trend clouds that expand during healthy trending phases and compress during indecisive consolidation.',
    whatYouSee: [
      'Multi-timeframe dynamic ribbon cloud support',
      'Color-coded trend regime shifts based on momentum agreement',
      'Consolidation squeeze warnings to avoid chop entries',
      'Pullback zones that indicate continuation opportunities'
    ],
    traditionalNoise: 'Staring at five overlapping generic moving average lines with no clear signal of trend strength.',
    indicatorAdvantage: 'Clean gradient ribbon highlighting exact dynamic support and momentum expansion boundaries.',
    activeMetrics: [
      { label: 'Trend Phase', value: 'Expansion Mode', state: 'bull' },
      { label: 'Dynamic Ribbon', value: 'Adaptive Cloud Support', state: 'accent' },
      { label: 'Chop Filter', value: 'Trending Cleanly', state: 'bull' },
      { label: 'Bias Alignment', value: 'Macro & Entry Sync', state: 'accent' }
    ]
  },
  CONFIRMATION: {
    id: 'CONFIRMATION',
    label: 'Signal Confirmation',
    tagline: 'Non-Repainting Bar-Close Signals',
    headline: 'Signals that stay on your chart once printed.',
    description: 'Repainting indicators create an illusion of perfection in backtests that vanishes in live trading. AlgoFinex signals validate only upon bar completion, locking the trigger and defining unambiguous trade invalidation.',
    whatYouSee: [
      'Non-repainting buy/sell signal markers locked at candle close',
      'Objective structure invalidation price levels',
      'Multi-timeframe agreement checklist before trigger firing',
      'Integrated risk boundaries for disciplined position sizing'
    ],
    traditionalNoise: 'Flashy arrows that appear mid-candle and disappear as soon as price moves against them.',
    indicatorAdvantage: 'Locked signals guaranteed never to repaint or shift position once the bar timestamp closes.',
    activeMetrics: [
      { label: 'Signal Trigger', value: 'Confirmation Active', state: 'bull' },
      { label: 'Calculation', value: 'Strict Bar-Close Only', state: 'accent' },
      { label: 'Invalidation', value: '$66,180 Defined', state: 'bear' },
      { label: 'Repaint Protection', value: '100% Locked', state: 'bull' }
    ]
  }
};

export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: 'structure',
    number: '01',
    name: 'Market Structure & Swings',
    badge: 'STRUCTURAL GEOMETRY',
    tagline: 'Maps swing highs, swing lows, and structural shifts without redraw.',
    description: 'Calculates the foundational geometry of the chart. Identifies true Breaks of Structure (BOS) and Changes of Character (CHoCH) based on candle close thresholds rather than subjective discretionary trendlines.',
    role: 'Defines the prevailing directional bias and major key price levels.',
    capabilities: [
      'Objective Higher-High / Higher-Low sequence detection',
      'Break of Structure (BOS) and Change of Character (CHoCH) labels',
      'Dynamic range high and range low boundary tracking',
      'Macro swing projections across multiple timeframes'
    ],
    inChartElement: 'Swing pivots & breakout threshold lines',
    color: '#3B82F6'
  },
  {
    id: 'liquidity',
    number: '02',
    name: 'Liquidity Pools & Imbalances',
    badge: 'VOLUME & IMBALANCE',
    tagline: 'Reveals resting institutional order clusters and fair value gaps.',
    description: 'Highlights where market makers and institutional orders have left imbalances. Maps demand blocks, supply clusters, and unharvested liquidity pools that price naturally gravitates toward.',
    role: 'Pinpoints high-probability reaction zones where price is defended.',
    capabilities: [
      'Automated Order Block identification with mitigation tracking',
      'Fair Value Gap (FVG) imbalance boxes with fill state alerts',
      'Liquidity sweep detection at key session highs and lows',
      'Target projection based on uncollected resting liquidity'
    ],
    inChartElement: 'Shaded order blocks & FVG imbalance zones',
    color: '#8B5CF6'
  },
  {
    id: 'trend',
    number: '03',
    name: 'Dynamic Trend & Regime Filter',
    badge: 'MOMENTUM REGIME',
    tagline: 'Filters low-probability consolidation from directional expansion.',
    description: 'Replaces lagging static moving averages with adaptive volatility ribbons. Instantly demonstrates whether a market is actively expanding with momentum or coiling in indecisive chop.',
    role: 'Prevents over-trading during sideways range consolidation.',
    capabilities: [
      'Multi-timeframe adaptive trend cloud ribbon',
      'Integrated volatility squeeze & chop filter',
      'Trend exhaustion warnings near extended boundaries',
      'Directional color gradient reflecting momentum consensus'
    ],
    inChartElement: 'Smooth adaptive gradient cloud ribbon',
    color: '#10B981'
  },
  {
    id: 'confirmation',
    number: '04',
    name: 'Execution Confirmation & Invalidation',
    badge: 'EXECUTION TRIGGER',
    tagline: 'Locks signal verification at bar close with unambiguous risk boundaries.',
    description: 'The final confluence filter. Synthesizes structure alignment, liquidity defense, and trend momentum into an objective execution trigger—complete with a hard structural invalidation line.',
    role: 'Provides the exact entry timing and pre-calculated risk boundary.',
    capabilities: [
      'Strict bar-close signal validation (zero retroactive repainting)',
      'Pre-calculated structural invalidation stop level',
      'Multi-condition confluence verification prior to trigger',
      'Actionable alert webhooks for mobile and desktop'
    ],
    inChartElement: 'Signal markers & structural invalidation line',
    color: '#06B6D4'
  }
];

export const WORKFLOW_JOURNEY_STEPS: WorkflowJourneyStep[] = [
  {
    step: '01',
    phase: 'RAW MARKET DATA',
    title: 'Disorganized Price Noise',
    tagline: 'Erratic wicks and emotional reactions',
    description: 'Without structural filters, traders stare at chaotic wicks, chasing green candles and panicking on red retracements. Decisions are driven by impulse rather than mathematical structure.',
    traderMindset: 'Confused by noise • Prone to chasing false breakouts • Subjective bias',
    visualState: 'noise'
  },
  {
    step: '02',
    phase: 'STRUCTURE',
    title: 'Market Architecture Revealed',
    tagline: 'Higher highs, lower lows, and validated breaks',
    description: 'AlgoFinex maps the underlying swing sequence. You instantly see whether price is respecting an uptrend sequence, breaking structure, or trapped inside an established range.',
    traderMindset: 'Directional bias established • Swing levels defined • Clear context',
    visualState: 'structure'
  },
  {
    step: '03',
    phase: 'CONTEXT',
    title: 'Momentum & Regime Agreement',
    tagline: 'Adaptive cloud support and consolidation filtering',
    description: 'The trend ribbon evaluates momentum health. When price expands alongside trend agreement, probability increases. When the cloud compresses, you are alerted to stay patient.',
    traderMindset: 'Chop avoided • Macro alignment verified • Pullback entry zones spotted',
    visualState: 'context'
  },
  {
    step: '04',
    phase: 'SETUP',
    title: 'Liquidity Sweep & Imbalance Defense',
    tagline: 'Resting orders cleared and order block defended',
    description: 'Price sweeps a key liquidity pool, mitigates an active order block, and closes with institutional defense. The setup criteria are objectively met on the chart.',
    traderMindset: 'High-confluence reaction zone • Patiently waiting for bar-close confirmation',
    visualState: 'setup'
  },
  {
    step: '05',
    phase: 'DECISION / WORKFLOW',
    title: 'Disciplined Execution & Invalidation',
    tagline: 'Pre-calculated stop, position sizing, and calm execution',
    description: 'The bar closes. The signal locks permanently. The structural invalidation line defines the exact dollar risk before the order is placed. The trade is managed by rules, not emotion.',
    traderMindset: 'Risk strictly capped • Flawless execution • Zero second-guessing',
    visualState: 'execution'
  }
];

export const TRADING_ROUTINE_STEPS: RoutineStep[] = [
  {
    num: '01',
    phase: 'PRE-MARKET',
    title: 'Macro Bias & Key Levels',
    objective: 'Establish daily and 4H directional lean before the session opens.',
    rule: 'Never execute counter to higher-timeframe structure.',
    status: 'ACTIVE BIAS'
  },
  {
    num: '02',
    phase: 'STRUCTURE',
    title: 'Swing Geometry Mapping',
    objective: 'Identify active swing highs, swing lows, and unbroken structural ranges.',
    rule: 'Mark valid Break of Structure (BOS) points on the entry timeframe.',
    status: 'ZONES DEFINED'
  },
  {
    num: '03',
    phase: 'CONTEXT',
    title: 'Dynamic Regime Filter',
    objective: 'Verify whether the adaptive trend cloud confirms trend expansion.',
    rule: 'Sideline trading if the regime filter signals range compression/chop.',
    status: 'REGIME VERIFIED'
  },
  {
    num: '04',
    phase: 'SETUP',
    title: 'Liquidity Sweep Confirmation',
    objective: 'Confirm price swept resting liquidity into a key order block.',
    rule: 'Demand or supply block must demonstrate immediate volume absorption.',
    status: 'SETUP READY'
  },
  {
    num: '05',
    phase: 'INVALIDATION',
    title: 'Hard Stop-Loss Calibration',
    objective: 'Anchor invalidation line behind the swing pivot that invalidates the thesis.',
    rule: 'Risk is calculated first; reward is secondary.',
    status: 'RISK LOCKED'
  },
  {
    num: '06',
    phase: 'EXECUTION',
    title: 'Bar-Close Signal Trigger',
    objective: 'Execute only upon candle close timestamp when signal lock is permanent.',
    rule: 'No premature mid-candle entries. Let the bar print.',
    status: 'EXECUTE'
  },
  {
    num: '07',
    phase: 'POST-TRADE REVIEW',
    title: 'Systematic Journal Audit',
    objective: 'Record trade parameters against the 7-step checklist rules.',
    rule: 'A losing trade that followed all rules is a successful execution.',
    status: 'AUDITED'
  }
];

export const SESSION_PILLARS: SessionPillar[] = [
  {
    number: '01',
    title: 'System Calibration & Chart Environment',
    tagline: 'Configure an uncluttered, high-clarity charting workspace.',
    description: 'Learn how to calibrate the AlgoFinex indicator suite for your specific asset class and timeframe. Establish a macro-to-micro routine that filters noise before the trading session opens.',
    focusItems: [
      'Multi-timeframe hierarchy: aligning macro structure with low-timeframe execution',
      'Eliminating indicator clutter, duplicate signals, and subjective indicators',
      'Calibrating trend cloud sensitivity to current market volatility'
    ],
    outcome: 'A clean, objective chart environment where every line and zone serves a specific decision.'
  },
  {
    number: '02',
    title: 'Structural Invalidation & Liquidity Logic',
    tagline: 'Define your risk before you ever consider reward.',
    description: 'Indicators are only useful when you know where they fail. This pillar focuses on recognizing genuine liquidity sweeps versus false expansions, and establishing non-negotiable invalidation levels.',
    focusItems: [
      'Distinguishing institutional liquidity sweeps from structural breakdowns',
      'Pinpointing order block mitigation criteria and volume absorption defense',
      'Calculating exact structural stop-loss placement on every setup'
    ],
    outcome: 'Absolute clarity on when an idea is invalid, eliminating emotional trade holding.'
  },
  {
    number: '03',
    title: 'The Discretionary Execution Framework',
    tagline: 'Turn indicator signals into a disciplined, repeatable routine.',
    description: 'Connect technical analysis to real-world execution. Standardize your entry confirmation checklist, position sizing model, and trade management rules so you execute with calm consistency.',
    focusItems: [
      'Step-by-step pre-entry confirmation checklist before firing orders',
      'Risk-adjusted position sizing based on structural invalidation width',
      'Managing trade progression with partial take-profit rules at structural targets'
    ],
    outcome: 'A documented trading workflow that transforms indicator charts into a repeatable process.'
  }
];
