import { 
  User, 
  Product, 
  Subscription, 
  ReferralData, 
  SupportTicket 
} from '../types/api';

export const MOCK_CURRENT_USER: User = {
  id: 'usr_algo_98214',
  email: 'trader@institutional-desk.com',
  name: 'Marcus Vance',
  role: 'pro',
  tradingViewHandle: 'Marcus_MacroFlow',
  tier: 'pro_subscriber',
  sessionExpiresAt: '2026-11-01T00:00:00Z',
  createdAt: '2026-03-15T10:00:00Z',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_struct_01',
    slug: 'market-structure-pro',
    name: 'Market Structure Matrix',
    badge: 'CORE GEOMETRY',
    category: 'MARKET_STRUCTURE',
    categoryLabel: 'Market Structure',
    version: 'v4.2.1',
    pineScriptType: 'Indicator v5',
    pricingTier: 'suite',
    nonRepainting: true,
    barCloseValidation: true,
    shortDescription: 'Automated multi-timeframe swing pivots, Break of Structure (BOS), and Change of Character (CHoCH) verified strictly at candle close.',
    fullDescription: 'Calculates true structural swing highs and lows using deterministic zigzag algorithms without subjective redraw. Highlights internal vs external breaks of structure and maps premium/discount equilibrium pricing.',
    supportedMarkets: ['Crypto (BTC, ETH, SOL)', 'US Indices (NQ, ES, YM)', 'Commodities (Gold, Oil)', 'Forex Majors'],
    keyCapabilities: [
      {
        title: 'Deterministic Swing Pivots',
        description: 'Eliminates discretionary trend drawing by locking swing highs and swing lows dynamically according to mathematical confirmation thresholds.'
      },
      {
        title: 'Internal vs Swing Structure Distinction',
        description: 'Separates minor sub-structure noise from major directional changes of character (CHoCH), preventing premature entries during internal chop.'
      },
      {
        title: 'Multi-Timeframe Fractal Mapping',
        description: 'Projects 4H and Daily higher-timeframe boundaries directly onto 15m and 5m execution charts without chart hopping.'
      },
      {
        title: 'Equilibrium & Premium/Discount Zones',
        description: 'Plots mathematical 50% discount equilibrium boxes to ensure trades align with favorable institutional risk-to-reward boundaries.'
      }
    ],
    formulaLogic: 'Swing pivots use a left/right bar clearance threshold of N periods. BOS is registered only when bar close breaches the swing boundary, locking the state permanently without retroactive redraw.',
    howItWorks: [
      'The engine scans the historical array for confirmed local minima and maxima.',
      'Upon detection of a breach, it distinguishes between wick sweeps and confirmed body closes.',
      'A confirmed close above the previous swing high generates an objective BOS marker and updates the active structural range.',
      'All structural levels remain visible as historical support/resistance zones.'
    ],
    useCases: [
      'Determining macro directional trend bias before London and NY session opens.',
      'Preventing counter-trend impulse trades during established trending structures.',
      'Identifying high-probability retracement entry points at structural higher-lows.'
    ],
    faq: [
      {
        question: 'Does this indicator repaint when the chart is refreshed?',
        answer: 'No. All calculations are executed strictly on confirmed bar close. Historical markers never move or disappear.'
      },
      {
        question: 'How do I add this to my TradingView account?',
        answer: 'Once enrolled, provide your TradingView username in the Client Access tab. Script access is granted directly to your TradingView account within minutes.'
      },
      {
        question: 'Can I use this on 1-minute scalping charts?',
        answer: 'Yes. The algorithm functions across all timeframes from 1-minute to weekly charts, with adjustable sensitivity parameters.'
      }
    ]
  },
  {
    id: 'prod_liq_02',
    slug: 'liquidity-imbalance-matrix',
    name: 'Liquidity Imbalance Matrix',
    badge: 'ORDER FLOW',
    category: 'LIQUIDITY',
    categoryLabel: 'Liquidity & Imbalance',
    version: 'v3.8.0',
    pineScriptType: 'Indicator v5',
    pricingTier: 'suite',
    nonRepainting: true,
    barCloseValidation: true,
    shortDescription: 'Visualizes resting liquidity pools, institutional Fair Value Gaps (FVGs), and high-volume order blocks with real-time mitigation tracking.',
    fullDescription: 'Identifies institutional price imbalances created by aggressive displacement. Tracks unmitigated fair value gaps and highlights resting stop liquidity clusters above equal highs and below equal lows.',
    supportedMarkets: ['All TradingView Assets', 'Crypto', 'Equities', 'Futures', 'FX'],
    keyCapabilities: [
      {
        title: 'Fair Value Gap (FVG) Detection',
        description: 'Identifies single-sided volume displacement candles and draws projected mitigation corridors across your active session.'
      },
      {
        title: 'Mitigation Status Tracking',
        description: 'Automatically dims or removes imbalance zones once price re-enters and absorbs resting limit inventory.'
      },
      {
        title: 'Equal Highs & Lows (EQH/EQL) Pools',
        description: 'Calculates resting stop-loss concentration clusters where institutional smart money frequently triggers liquidity sweeps.'
      },
      {
        title: 'Order Block Volume Weighting',
        description: 'Highlights the origin candle of major impulses with institutional volume filtering to isolate valid supply and demand.'
      }
    ],
    formulaLogic: 'FVG is defined when Bar 1 High is less than Bar 3 Low in an uptrend (or Bar 1 Low is greater than Bar 3 High in a downtrend). Mitigation occurs when subsequent bars traverse the gap interval.',
    howItWorks: [
      'Evaluates 3-candle sequential matrices for imbalance gaps.',
      'Tracks depth and percentage of mitigation in real time.',
      'Identifies sweep reactions where price enters an FVG, absorbs liquidity, and rejects within the same bar.'
    ],
    useCases: [
      'Pinpointing high-probability limit order entry zones inside deep discounts.',
      'Setting realistic profit targets based on unharvested resting buy-side liquidity.',
      'Identifying absorption reversals during key economic release times.'
    ],
    faq: [
      {
        question: 'What is the difference between an order block and an FVG?',
        answer: 'An order block represents the last opposing candle prior to displacement, while an FVG is the 3-bar imbalance gap created during that displacement.'
      },
      {
        question: 'Does it work for crypto altcoins?',
        answer: 'Yes, it operates on all liquid crypto pairs, equities, forex pairs, and futures contracts.'
      }
    ]
  },
  {
    id: 'prod_trend_03',
    slug: 'adaptive-trend-cloud',
    name: 'Adaptive Momentum Ribbon',
    badge: 'REGIME FILTER',
    category: 'MOMENTUM_TREND',
    categoryLabel: 'Trend & Momentum',
    version: 'v5.1.0',
    pineScriptType: 'Indicator v5',
    pricingTier: 'suite',
    nonRepainting: true,
    barCloseValidation: true,
    shortDescription: 'Multi-layer volatility-adjusted dynamic cloud that expands during directional momentum and compresses during sideways consolidation.',
    fullDescription: 'Replaces lagging static moving averages with responsive volatility-adjusted bands. Automatically classifies market state into Expansion, Retracement, Consolidation, or Exhaustion regimes.',
    supportedMarkets: ['Global Indices', 'Crypto', 'Forex', 'Tech Equities'],
    keyCapabilities: [
      {
        title: 'Volatility Adaptive Bands',
        description: 'Adjusts ribbon width based on Average True Range (ATR) expansion, widening during clean trends and tightening during range squeezes.'
      },
      {
        title: 'Consolidation Chop Guard',
        description: 'Shades background or flags warning badges when ribbon compression indicates low-probability choppy market conditions.'
      },
      {
        title: 'Dynamic Trailing Support & Resistance',
        description: 'Provides responsive dynamic baseline support for riding extended momentum runs without getting shaken out prematurely.'
      },
      {
        title: 'Multi-Timeframe Trend Consensus',
        description: 'Built-in indicator status board reflecting momentum agreement across higher timeframes.'
      }
    ],
    formulaLogic: 'Calculates dual exponential volatility smoothed moving bands weighted by normalized ATR momentum. Ribbon slope and expansion coefficient determine regime classification.',
    howItWorks: [
      'Analyzes velocity of price displacement relative to recent volatility.',
      'Color shifts smoothly from neutral charcoal to bull sage or bear rose when consensus is confirmed.',
      'Signals trend continuation pullbacks when price tags the inner ribbon boundary.'
    ],
    useCases: [
      'Staying on the right side of macro momentum during major market moves.',
      'Avoiding the temptation to trade during low-volume mid-day consolidations.',
      'Trailing stop-loss management behind dynamic cloud support.'
    ],
    faq: [
      {
        question: 'Does this lag behind sudden market moves?',
        answer: 'Because the smoothing factor is volatility-adaptive, it reacts significantly faster than traditional 50/200 simple moving averages while minimizing whipsaws.'
      }
    ]
  },
  {
    id: 'prod_exec_04',
    slug: 'execution-invalidation-engine',
    name: 'Execution & Invalidation Engine',
    badge: 'EXECUTION TRIGGER',
    category: 'EXECUTION_CONFIRMATION',
    categoryLabel: 'Execution Triggers',
    version: 'v4.0.2',
    pineScriptType: 'Strategy v5',
    pricingTier: 'suite',
    nonRepainting: true,
    barCloseValidation: true,
    shortDescription: 'Confluence trigger engine that locks non-repainting buy/sell execution markers at bar close with automated risk invalidation lines.',
    fullDescription: 'The final execution layer. Synthesizes market structure alignment, liquidity sweeps, and trend momentum into high-probability execution markers with non-negotiable risk invalidation price points.',
    supportedMarkets: ['All TradingView Markets'],
    keyCapabilities: [
      {
        title: 'Zero-Repaint Signal Locking',
        description: 'Signals fire and lock strictly on candle close. No retroactive deletions or mid-bar vanishing arrows.'
      },
      {
        title: 'Automated Hard Invalidation Levels',
        description: 'Calculates the exact structural invalidation price coordinate for every trigger, removing stop-loss guesswork.'
      },
      {
        title: 'Confluence Score Filter',
        description: 'Requires a minimum of 3 independent algorithmic confirmations before a visual trigger is rendered on your chart.'
      },
      {
        title: 'Webhook & Mobile Alert Integration',
        description: 'Pre-formatted TradingView alerts compatible with mobile push notifications and automated execution bots.'
      }
    ],
    formulaLogic: 'Trigger is true when Structure Alignment == TRUE && Regime Momentum == ACTIVE && Liquidity Sweep == VALIDATED && Bar Close == TRUE.',
    howItWorks: [
      'Evaluates conditions across all sub-indicators in real time.',
      'Upon bar close, if all thresholds are satisfied, prints the execution glyph and draws the invalidation ray.',
      'Dispatches alert webhook containing asset, timeframe, entry price, and invalidation stop.'
    ],
    useCases: [
      'Calm, disciplined trade execution with pre-defined dollar risk.',
      'Eliminating hesitation and second-guessing at critical market inflection points.',
      'Automating watchlist monitoring with webhook alerts.'
    ],
    faq: [
      {
        question: 'Does this give me 100% win rate signals?',
        answer: 'No. No legitimate trading technology produces 100% win rates. AlgoFinex provides structural edge and disciplined risk invalidation so that your winning trades outpace defined risk.'
      }
    ]
  }
];

export const MOCK_SUBSCRIPTION: Subscription = {
  id: 'sub_pro_44812',
  userId: MOCK_CURRENT_USER.id,
  plan: 'annual',
  status: 'active',
  amount: 708,
  currency: 'USD',
  currentPeriodStart: '2026-04-01T00:00:00Z',
  currentPeriodEnd: '2027-04-01T00:00:00Z',
  cancelAtPeriodEnd: false,
  paymentMethodLast4: '4242',
  invoiceHistory: [
    {
      id: 'inv_88201',
      date: '2026-04-01',
      amount: 708,
      pdfUrl: '#',
      status: 'paid'
    },
    {
      id: 'inv_77192',
      date: '2025-04-01',
      amount: 708,
      pdfUrl: '#',
      status: 'paid'
    }
  ]
};

export const MOCK_REFERRAL_DATA: ReferralData = {
  referralCode: 'MARCUS25',
  referralLink: 'https://algofinex.com/r/MARCUS25',
  commissionRate: 25,
  totalReferred: 18,
  activeSubscribers: 14,
  totalEarned: 2478,
  pendingPayout: 354,
  paidPayout: 2124,
  minimumPayoutThreshold: 100,
  history: [
    {
      id: 'ref_tx_901',
      date: '2026-09-28',
      referredUser: 'j***@quantdesk.io',
      plan: 'Annual Suite ($708)',
      amount: 708,
      commission: 177,
      status: 'pending'
    },
    {
      id: 'ref_tx_902',
      date: '2026-09-14',
      referredUser: 'a***@tradercap.com',
      plan: 'Annual Suite ($708)',
      amount: 708,
      commission: 177,
      status: 'pending'
    },
    {
      id: 'ref_tx_899',
      date: '2026-08-11',
      referredUser: 'k***@cryptoalpha.net',
      plan: 'Monthly Suite ($79)',
      amount: 79,
      commission: 19.75,
      status: 'paid'
    },
    {
      id: 'ref_tx_890',
      date: '2026-07-22',
      referredUser: 's***@macrofund.eu',
      plan: 'Lifetime Suite ($1,490)',
      amount: 1490,
      commission: 372.50,
      status: 'paid'
    }
  ]
};

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-441',
    subject: 'TradingView script access verification for NQ charts',
    category: 'tradingview_access',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2026-09-20T14:32:00Z',
    updatedAt: '2026-09-21T09:15:00Z',
    messages: [
      {
        id: 'msg_01',
        sender: 'user',
        senderName: 'Marcus Vance',
        message: 'Hello team, I updated my TradingView username to Marcus_MacroFlow yesterday. Could you please confirm if the indicator suite invites are active for this handle?',
        timestamp: '2026-09-20T14:32:00Z'
      },
      {
        id: 'msg_02',
        sender: 'support_engineer',
        senderName: 'AlgoFinex Technical Desk',
        message: 'Hi Marcus, your handle Marcus_MacroFlow has been whitelisted for all 4 suite indicators and the Strategy Engine. Please refresh your TradingView browser window and check Indicators > Invite-Only Scripts.',
        timestamp: '2026-09-21T09:15:00Z'
      }
    ]
  },
  {
    id: 'TICK-449',
    subject: 'Question on Order Block volume filter sensitivity parameter',
    category: 'indicator_settings',
    priority: 'low',
    status: 'in_review',
    createdAt: '2026-10-02T11:04:00Z',
    updatedAt: '2026-10-03T16:20:00Z',
    messages: [
      {
        id: 'msg_03',
        sender: 'user',
        senderName: 'Marcus Vance',
        message: 'What is the recommended Volume Threshold multiplier for 15-minute Bitcoin charts during the Asian session?',
        timestamp: '2026-10-02T11:04:00Z'
      },
      {
        id: 'msg_04',
        sender: 'support_engineer',
        senderName: 'AlgoFinex Technical Desk',
        message: 'Marcus, for lower-volume sessions like Asia, we recommend reducing the threshold from 1.5x to 1.2x ATR to catch tighter institutional imbalances without false breakouts.',
        timestamp: '2026-10-03T16:20:00Z'
      }
    ]
  }
];
