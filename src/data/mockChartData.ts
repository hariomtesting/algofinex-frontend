import {
  Candle,
  SignalMarker,
  OrderBlockZone,
  IndicatorOverview,
  WatchlistItem,
  OrderBookData,
  MarketSession,
  AlgorithmicAlert
} from '../types/trading';

// Base UTC timestamp for high-density mock intraday series (15m intervals)
const BASE_TIMESTAMP = 1774350000; // Epoch seconds

export interface LightweightCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface LightweightVolume {
  time: number;
  value: number;
  color: string;
}

export interface LightweightLinePoint {
  time: number;
  value: number;
}

// Generate realistic 60-bar candle dataset
function generateCandleSeries(
  startPrice: number,
  volatility: number,
  drift: number,
  count: number = 60
): { candles: Candle[]; lwCandles: LightweightCandle[]; lwVolume: LightweightVolume[] } {
  const candles: Candle[] = [];
  const lwCandles: LightweightCandle[] = [];
  const lwVolume: LightweightVolume[] = [];

  let currentPrice = startPrice;

  for (let i = 0; i < count; i++) {
    const timeSec = BASE_TIMESTAMP + i * 900; // 15m intervals
    const hours = new Date(timeSec * 1000).getUTCHours().toString().padStart(2, '0');
    const minutes = new Date(timeSec * 1000).getUTCMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    const delta = (Math.sin(i / 4) * 0.4 + (Math.random() - 0.47) + drift) * volatility;
    const open = Math.round(currentPrice * 100) / 100;
    const close = Math.round((open + delta) * 100) / 100;
    const high = Math.round((Math.max(open, close) + Math.random() * volatility * 0.75) * 100) / 100;
    const low = Math.round((Math.min(open, close) - Math.random() * volatility * 0.75) * 100) / 100;
    const isBullish = close >= open;
    const volume = Math.round(800 + Math.random() * 2500 + (Math.abs(delta) / volatility) * 2000);

    candles.push({
      time: timeStr,
      open,
      high,
      low,
      close,
      volume,
      isBullish
    });

    lwCandles.push({
      time: timeSec,
      open,
      high,
      low,
      close
    });

    lwVolume.push({
      time: timeSec,
      value: volume,
      color: isBullish ? 'rgba(0, 240, 144, 0.45)' : 'rgba(255, 59, 105, 0.45)'
    });

    currentPrice = close;
  }

  return { candles, lwCandles, lwVolume };
}

// Seeded dataset generators
const BTC_GEN = generateCandleSeries(66200, 180, 0.08, 64);
const ETH_GEN = generateCandleSeries(3480, 16, 0.06, 64);
const SOL_GEN = generateCandleSeries(174, 2.2, 0.12, 64);
const NQ_GEN = generateCandleSeries(20280, 35, 0.05, 64);

export const INSTRUMENT_CANDLES: Record<string, Candle[]> = {
  'BTC/USD': BTC_GEN.candles,
  'ETH/USD': ETH_GEN.candles,
  'SOL/USD': SOL_GEN.candles,
  'NQ1!': NQ_GEN.candles,
};

export const INSTRUMENT_LW_CANDLES: Record<string, LightweightCandle[]> = {
  'BTC/USD': BTC_GEN.lwCandles,
  'ETH/USD': ETH_GEN.lwCandles,
  'SOL/USD': SOL_GEN.lwCandles,
  'NQ1!': NQ_GEN.lwCandles,
};

export const INSTRUMENT_LW_VOLUME: Record<string, LightweightVolume[]> = {
  'BTC/USD': BTC_GEN.lwVolume,
  'ETH/USD': ETH_GEN.lwVolume,
  'SOL/USD': SOL_GEN.lwVolume,
  'NQ1!': NQ_GEN.lwVolume,
};

// Backwards-compatible export
export const BTC_15M_CANDLES: Candle[] = BTC_GEN.candles.slice(0, 20);

// Calculate Exponential Moving Average (EMA)
export function calculateEMA(data: LightweightCandle[], period: number): LightweightLinePoint[] {
  if (data.length < period) return [];
  const k = 2 / (period + 1);
  const result: LightweightLinePoint[] = [];

  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i].close;
  }
  let prevEma = sum / period;
  result.push({ time: data[period - 1].time, value: Math.round(prevEma * 100) / 100 });

  for (let i = period; i < data.length; i++) {
    const currentEma = data[i].close * k + prevEma * (1 - k);
    result.push({ time: data[i].time, value: Math.round(currentEma * 100) / 100 });
    prevEma = currentEma;
  }

  return result;
}

// Calculate Relative Strength Index (RSI)
export function calculateRSI(data: LightweightCandle[], period: number = 14): LightweightLinePoint[] {
  if (data.length <= period) return [];
  const result: LightweightLinePoint[] = [];

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = data[i].close - data[i - 1].close;
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  let rsi = 100 - (100 / (1 + rs));
  result.push({ time: data[period].time, value: Math.round(rsi * 10) / 10 });

  for (let i = period + 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi = 100 - (100 / (1 + rs));
    result.push({ time: data[i].time, value: Math.round(rsi * 10) / 10 });
  }

  return result;
}

export const DEMO_SIGNALS: SignalMarker[] = [
  {
    index: 8,
    type: 'BUY',
    price: 66810,
    label: 'SIGNAL: CONFIRMATION',
    upperTarget: 68110,
    lowerTarget: 67520,
    invalidation: 66180,
    time: '12:00 UTC',
  },
  {
    index: 4,
    type: 'BUY',
    price: 66250,
    label: 'STRUCTURE BREAK',
    upperTarget: 67200,
    lowerTarget: 66800,
    invalidation: 65900,
    time: '11:00 UTC',
  }
];

export const DEMO_ORDER_BLOCKS: OrderBlockZone[] = [
  {
    startIndex: 3,
    endIndex: 6,
    topPrice: 66200,
    bottomPrice: 65950,
    type: 'BULLISH_OB',
    label: 'Key Demand Zone',
  },
  {
    startIndex: 7,
    endIndex: 11,
    topPrice: 66680,
    bottomPrice: 66490,
    type: 'FAIR_VALUE_GAP',
    label: 'Fair Value Gap (Mitigated)',
  },
  {
    startIndex: 16,
    endIndex: 20,
    topPrice: 68350,
    bottomPrice: 68150,
    type: 'BEARISH_OB',
    label: 'Overhead Resistance Zone',
  }
];

export const INDICATOR_DATA_BY_MODE: Record<string, IndicatorOverview> = {
  TREND: {
    asset: 'BTC/USDT',
    price: 68220,
    change24h: 3.42,
    marketStructure: 'Bullish Higher-Low Sequence',
    trendContext: 'Above Dynamic 21/55 EMA Cloud',
    liquidityState: 'Demand Zone Reclaimed',
    signalState: 'Confirmation Active',
    timeframeAlignment: {
      tf4h: 'Bullish Trend',
      tf1h: 'Expansion Phase',
      tf15m: 'Structure Confirmed',
    }
  },
  LIQUIDITY: {
    asset: 'BTC/USDT',
    price: 68220,
    change24h: 3.42,
    marketStructure: 'Sell-Side Sweep -> Displacement',
    trendContext: 'Testing Key Overhead Supply',
    liquidityState: 'Lower Liquidity Swept',
    signalState: 'Structure Shift Validated',
    timeframeAlignment: {
      tf4h: 'Major Support',
      tf1h: 'Volume Absorption',
      tf15m: 'Reversal Confirmed',
    }
  },
  STRUCTURE: {
    asset: 'BTC/USDT',
    price: 68220,
    change24h: 3.42,
    marketStructure: 'Range Equilibrium Extension',
    trendContext: 'Clean Order Block Respect',
    liquidityState: 'Targeting Overhead Liquidity Pool',
    signalState: 'Breakout Staged',
    timeframeAlignment: {
      tf4h: 'Range Low Defended',
      tf1h: 'Break of Structure',
      tf15m: 'Retest Aligned',
    }
  }
};

export const TELEMETRY_TICKER_ITEMS = [
  { symbol: 'BTC/USDT', price: '68,220.50', change: '+3.42%', status: 'STRUCTURE: BULLISH' },
  { symbol: 'ETH/USDT', price: '3,542.10', change: '+2.18%', status: 'ZONE: DEMAND RETEST' },
  { symbol: 'SOL/USDT', price: '184.75', change: '+5.64%', status: 'TREND: EXPANSION' },
  { symbol: 'NQ1! MINI', price: '20,412.00', change: '+1.05%', status: 'LIQUIDITY: SWEPT' },
  { symbol: 'ES1! 500', price: '5,892.25', change: '+0.74%', status: 'ALIGNED: 4H/1H' },
];

export const WATCHLIST_DATA: WatchlistItem[] = [
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin Perpetual',
    price: 68220.50,
    change24h: 3.42,
    high24h: 68450.00,
    low24h: 65920.00,
    volume24h: '$38.4B',
    category: 'CRYPTO',
    sparkline: [66200, 66350, 66100, 66500, 67100, 67800, 68220]
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum Perpetual',
    price: 3542.10,
    change24h: 2.18,
    high24h: 3580.00,
    low24h: 3440.00,
    volume24h: '$19.2B',
    category: 'CRYPTO',
    sparkline: [3440, 3460, 3490, 3480, 3510, 3530, 3542]
  },
  {
    symbol: 'SOL/USD',
    name: 'Solana Perpetual',
    price: 184.75,
    change24h: 5.64,
    high24h: 188.50,
    low24h: 172.10,
    volume24h: '$6.8B',
    category: 'CRYPTO',
    sparkline: [172, 175, 178, 176, 180, 182, 184.75]
  },
  {
    symbol: 'NQ1!',
    name: 'E-mini NASDAQ-100',
    price: 20412.00,
    change24h: 1.05,
    high24h: 20485.00,
    low24h: 20210.00,
    volume24h: '$44.1B',
    category: 'INDICES',
    sparkline: [20210, 20250, 20300, 20290, 20380, 20400, 20412]
  },
  {
    symbol: 'ES1!',
    name: 'E-mini S&P 500',
    price: 5892.25,
    change24h: 0.74,
    high24h: 5910.00,
    low24h: 5855.00,
    volume24h: '$52.3B',
    category: 'INDICES',
    sparkline: [5855, 5865, 5875, 5870, 5885, 5890, 5892]
  },
  {
    symbol: 'XAU/USD',
    name: 'Gold Spot',
    price: 2684.30,
    change24h: -0.38,
    high24h: 2702.00,
    low24h: 2678.00,
    volume24h: '$22.0B',
    category: 'COMMODITIES',
    sparkline: [2700, 2695, 2690, 2692, 2688, 2682, 2684]
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: 1.0842,
    change24h: 0.15,
    high24h: 1.0875,
    low24h: 1.0820,
    volume24h: '$118B',
    category: 'FOREX',
    sparkline: [1.0825, 1.0830, 1.0840, 1.0835, 1.0838, 1.0845, 1.0842]
  }
];

export const ORDERBOOK_DATA: OrderBookData = {
  spread: 0.50,
  spreadPercent: 0.001,
  lastPrice: 68220.50,
  asks: [
    { price: 68223.00, size: 4.821, total: 4.821, depthPercent: 22 },
    { price: 68222.50, size: 7.150, total: 11.971, depthPercent: 44 },
    { price: 68222.00, size: 12.405, total: 24.376, depthPercent: 68 },
    { price: 68221.50, size: 9.320, total: 33.696, depthPercent: 82 },
    { price: 68221.00, size: 18.512, total: 52.208, depthPercent: 100 },
  ],
  bids: [
    { price: 68220.50, size: 14.280, total: 14.280, depthPercent: 48 },
    { price: 68220.00, size: 8.940, total: 23.220, depthPercent: 64 },
    { price: 68219.50, size: 11.600, total: 34.820, depthPercent: 78 },
    { price: 68219.00, size: 6.750, total: 41.570, depthPercent: 88 },
    { price: 68218.50, size: 15.340, total: 56.910, depthPercent: 100 },
  ]
};

export const MARKET_SESSIONS: MarketSession[] = [
  { name: 'London', city: 'LON', timezone: 'UTC+1', isOpen: true, hours: '08:00 - 16:30' },
  { name: 'New York', city: 'NYC', timezone: 'UTC-4', isOpen: true, hours: '13:30 - 20:00' },
  { name: 'Tokyo', city: 'TYO', timezone: 'UTC+9', isOpen: false, hours: '00:00 - 06:00' },
  { name: 'Sydney', city: 'SYD', timezone: 'UTC+10', isOpen: false, hours: '22:00 - 05:00' },
];

export const ALGORITHMIC_ALERTS: AlgorithmicAlert[] = [
  {
    id: 'ALT-9821',
    time: '14:45:12',
    symbol: 'BTC/USD',
    timeframe: '15m',
    type: 'BULLISH_BOS',
    title: 'Break of Structure Confirmed',
    price: 68110,
    invalidation: 66180,
    qualityScore: 94
  },
  {
    id: 'ALT-9820',
    time: '14:32:05',
    symbol: 'ETH/USD',
    timeframe: '15m',
    type: 'FVG_FILL',
    title: 'Fair Value Gap Rebalance & Rebound',
    price: 3528,
    invalidation: 3495,
    qualityScore: 88
  },
  {
    id: 'ALT-9819',
    time: '14:15:48',
    symbol: 'SOL/USD',
    timeframe: '1h',
    type: 'MOMENTUM_ALIGN',
    title: 'Multi-Timeframe Ribbon Expansion',
    price: 182.40,
    invalidation: 174.50,
    qualityScore: 92
  },
  {
    id: 'ALT-9818',
    time: '13:58:22',
    symbol: 'NQ1!',
    timeframe: '5m',
    type: 'LIQUIDITY_SWEEP',
    title: 'Equal Lows Swept -> High Velocity Reclaim',
    price: 20340,
    invalidation: 20295,
    qualityScore: 96
  }
];

