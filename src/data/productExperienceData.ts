import { 
  ExperienceModeData, 
  IndicatorProduct, 
  SessionPillar, 
  WorkflowStage 
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
      'Instant Break of Structure (BOS) alerts on bar close',
      'Structural shift markers distinguishing trends from range chop',
      'Dynamic invalidation boundaries based on market swing lows'
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
      'Multi-timeframe 21/55 dynamic ribbon cloud support',
      'Color-coded trend regime shifts based on momentum agreement',
      'Consolidation squeeze warnings to avoid chop entries',
      'Pullback zones that indicate continuation opportunities'
    ],
    traditionalNoise: 'Staring at five overlapping generic moving average lines with no clear signal of trend strength.',
    indicatorAdvantage: 'Clean gradient ribbon highlighting exact dynamic support and momentum expansion boundaries.',
    activeMetrics: [
      { label: 'Trend Phase', value: 'Expansion Mode', state: 'bull' },
      { label: 'Dynamic Ribbon', value: '21/55 EMA Cloud Support', state: 'accent' },
      { label: 'Chop Filter', value: 'Trending Cleanly', state: 'bull' },
      { label: 'Bias Alignment', value: '4H & 1H Bullish Sync', state: 'accent' }
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

export const INDICATOR_PRODUCTS: IndicatorProduct[] = [
  {
    id: 'structure-pro',
    name: 'AlgoFinex Structure Pro',
    badge: 'CORE FOUNDATION',
    tagline: 'Automated Market Structure & Order Block Intelligence',
    description: 'Maps the architecture of any market with mathematical rigor. Identifies swing boundaries, break of structure (BOS), change of character (CHoCH), and supply/demand zones with zero retroactive repainting.',
    role: 'Primary market map for defining directional bias and major key levels.',
    features: [
      'Automated BOS & CHoCH Detection',
      'Mitigated & Unmitigated Order Blocks',
      'Fair Value Gap (FVG) Dynamic Mapping',
      'Multi-Timeframe High/Low Projections'
    ],
    techSpecs: [
      { label: 'Platform', value: 'TradingView (Pine Script v5)' },
      { label: 'Repaint Behavior', value: 'Zero Repaint (Bar-Close)' },
      { label: 'Supported Markets', value: 'Crypto, Forex, Indices, Equities' },
      { label: 'Timeframe Compatibility', value: '1m to 1D All Timeframes' }
    ],
    accentColor: '#3B82F6'
  },
  {
    id: 'trend-ribbon',
    name: 'AlgoFinex Trend Cloud',
    badge: 'MOMENTUM & REGIME',
    tagline: 'Adaptive Trend Bands with Built-in Consolidation Filtering',
    description: 'Eliminates moving average lag with dynamic volatility ribbons. Instantly reveals whether price is expanding with conviction or coiling in low-probability consolidation.',
    role: 'Confirms whether to trade continuation pullbacks or stay sidelined during chop.',
    features: [
      'Adaptive 21/55 Dynamic Cloud Ribbon',
      'Integrated Chop & Squeeze Filter',
      'Trend Exhaustion Warning Callouts',
      'Custom Multi-Timeframe Background Tint'
    ],
    techSpecs: [
      { label: 'Platform', value: 'TradingView (Pine Script v5)' },
      { label: 'Algorithm', value: 'Volume-Weighted Dynamic Ribbon' },
      { label: 'Alert Support', value: 'Cloud Twist & Breakout Webhooks' },
      { label: 'Latency', value: 'Instant Bar-Close Event' }
    ],
    accentColor: '#10B981'
  },
  {
    id: 'momentum-pulse',
    name: 'AlgoFinex Momentum Pulse',
    badge: 'SIGNAL CONFIRMATION',
    tagline: 'Non-Repainting Signal Confirmation & Invalidation Levels',
    description: 'The final filter for disciplined entry execution. Synthesizes order block reclaims, trend cloud agreement, and volume delta absorption into actionable, locked entry markers.',
    role: 'Provides the precise entry trigger and structural invalidation boundary.',
    features: [
      'Bar-Close Signal Confirmation Triggers',
      'Automatic Invalidation Level Calculation',
      'Institutional Delta Absorption Detection',
      'Custom Audio, Email & Webhook Alerts'
    ],
    techSpecs: [
      { label: 'Platform', value: 'TradingView (Pine Script v5)' },
      { label: 'Signal Engine', value: 'Multi-Condition Confluence Matrix' },
      { label: 'Lock Guarantee', value: 'Permanent Signal Lock on Close' },
      { label: 'Delivery', value: 'Direct TradingView Invite-Only Script' }
    ],
    accentColor: '#60A5FA'
  }
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    label: 'RAW MARKET NOISE',
    title: 'Disorganized Price Action',
    description: 'Raw candlesticks produce emotional reactions, false breakouts, and second-guessing without a structured filter.',
    badge: 'Without AlgoFinex',
    status: 'noise'
  },
  {
    step: '02',
    label: 'STRUCTURAL FILTERING',
    title: 'Clear Zones & Market Bias',
    description: 'AlgoFinex maps key swing levels, order blocks, and dynamic clouds, turning ambiguous charts into defined reference zones.',
    badge: 'Indicator Layer',
    status: 'structure'
  },
  {
    step: '03',
    label: 'CONFIRMATION TRIGGER',
    title: 'Objective Signal Validation',
    description: 'Signals lock only on bar close with predefined invalidation. You know precisely where the trade idea is wrong before entering.',
    badge: 'Execution Trigger',
    status: 'signal'
  },
  {
    step: '04',
    label: 'DISCIPLINED WORKFLOW',
    title: 'Repeatable Trading Habits',
    description: 'The 3-Day Session transforms indicator signals into a systematic daily trading workflow that you can execute consistently.',
    badge: '3-Day Session Transformation',
    status: 'execution'
  }
];

export const SESSION_PILLARS: SessionPillar[] = [
  {
    number: '01',
    title: 'System Calibration & Chart Environment',
    tagline: 'Configure an uncluttered, high-clarity charting workspace.',
    description: 'Learn how to calibrate the AlgoFinex indicator suite for your specific asset class and timeframe. Establish a macro-to-micro routine that filters noise before the trading session opens.',
    focusItems: [
      'Multi-timeframe hierarchy: aligning 4H bias with 15m/5m execution',
      'Eliminating indicator clutter and duplicate information',
      'Customizing dynamic cloud sensitivity to current market volatility'
    ],
    outcome: 'A clean, objective chart template where every line and zone serves a specific decision.'
  },
  {
    number: '02',
    title: 'Structural Invalidation & Liquidity Logic',
    tagline: 'Define your risk before you ever consider reward.',
    description: 'Indicators are only useful when you know where they fail. This pillar focuses on recognizing genuine liquidity sweeps versus false expansions, and establishing non-negotiable invalidation levels.',
    focusItems: [
      'Identifying institutional sell-side sweeps versus genuine breakdowns',
      'Pinpointing order block mitigation criteria and reclaim confirmation',
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
      'Step-by-step pre-entry confirmation checklist',
      'Risk-adjusted position sizing based on structural invalidation width',
      'Managing trade progression with scale-out rules at key range targets'
    ],
    outcome: 'A documented trading workflow that transforms indicator charts into a repeatable process.'
  }
];
