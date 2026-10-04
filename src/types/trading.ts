export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isBullish: boolean;
}

export interface SignalMarker {
  index: number;
  type: 'BUY' | 'SELL';
  price: number;
  label: string;
  upperTarget: number;
  lowerTarget: number;
  invalidation: number;
  time: string;
}

export interface OrderBlockZone {
  startIndex: number;
  endIndex: number;
  topPrice: number;
  bottomPrice: number;
  type: 'BULLISH_OB' | 'BEARISH_OB' | 'FAIR_VALUE_GAP';
  label: string;
}

export type IndicatorMode = 'TREND' | 'LIQUIDITY' | 'STRUCTURE';

export interface IndicatorConfig {
  showEMA: boolean;
  showOrderBlocks: boolean;
  showSignals: boolean;
  showVolume: boolean;
  activeMode: IndicatorMode;
}

export interface IndicatorOverview {
  asset: string;
  price: number;
  change24h: number;
  marketStructure: string;
  trendContext: string;
  liquidityState: string;
  signalState: string;
  timeframeAlignment: {
    tf4h: string;
    tf1h: string;
    tf15m: string;
  };
}
