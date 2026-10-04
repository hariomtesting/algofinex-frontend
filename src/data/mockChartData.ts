import { Candle, SignalMarker, OrderBlockZone, IndicatorOverview } from '../types/trading';

// Illustrative 15m Candlestick sequence demonstrating indicator overlays
export const BTC_15M_CANDLES: Candle[] = [
  { time: '10:00', open: 66200, high: 66350, low: 66150, close: 66310, volume: 1420, isBullish: true },
  { time: '10:15', open: 66310, high: 66420, low: 66280, close: 66390, volume: 1180, isBullish: true },
  { time: '10:30', open: 66390, high: 66410, low: 66180, close: 66210, volume: 1650, isBullish: false },
  { time: '10:45', open: 66210, high: 66250, low: 65980, close: 66020, volume: 2240, isBullish: false }, // Sweep below key level
  { time: '11:00', open: 66020, high: 66280, low: 65950, close: 66250, volume: 2980, isBullish: true }, // Reclaim wick
  { time: '11:15', open: 66250, high: 66490, low: 66220, close: 66460, volume: 2150, isBullish: true }, // Order block formed
  { time: '11:30', open: 66460, high: 66680, low: 66410, close: 66620, volume: 2600, isBullish: true }, // Displacement move
  { time: '11:45', open: 66620, high: 66720, low: 66520, close: 66580, volume: 1400, isBullish: false }, // FVG mitigation test
  { time: '12:00', open: 66580, high: 66850, low: 66560, close: 66810, volume: 2750, isBullish: true }, // Signal Confirmation
  { time: '12:15', open: 66810, high: 67120, low: 66790, close: 67080, volume: 3410, isBullish: true }, // Expansion
  { time: '12:30', open: 67080, high: 67240, low: 66990, close: 67190, volume: 2120, isBullish: true },
  { time: '12:45', open: 67190, high: 67210, low: 67020, close: 67060, volume: 1350, isBullish: false },
  { time: '13:00', open: 67060, high: 67380, low: 67040, close: 67340, volume: 2890, isBullish: true },
  { time: '13:15', open: 67340, high: 67550, low: 67300, close: 67520, volume: 3620, isBullish: true },
  { time: '13:30', open: 67520, high: 67680, low: 67450, close: 67640, volume: 3100, isBullish: true },
  { time: '13:45', open: 67640, high: 67720, low: 67510, close: 67590, volume: 1820, isBullish: false },
  { time: '14:00', open: 67590, high: 67880, low: 67550, close: 67820, volume: 3340, isBullish: true },
  { time: '14:15', open: 67820, high: 68150, low: 67780, close: 68110, volume: 4150, isBullish: true }, // Range High Reach
  { time: '14:30', open: 68110, high: 68240, low: 67960, close: 68180, volume: 2400, isBullish: true },
  { time: '14:45', open: 68180, high: 68280, low: 68050, close: 68220, volume: 1950, isBullish: true },
];

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
