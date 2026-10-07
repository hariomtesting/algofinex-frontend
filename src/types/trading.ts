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

export type AssetCategory = 'CRYPTO' | 'INDICES' | 'COMMODITIES' | 'FOREX';

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  category: AssetCategory;
  sparkline: number[];
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  depthPercent: number;
}

export interface OrderBookData {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadPercent: number;
  lastPrice: number;
}

export interface MarketSession {
  name: string;
  city: string;
  timezone: string;
  isOpen: boolean;
  hours: string;
}

export interface AlgorithmicAlert {
  id: string;
  time: string;
  symbol: string;
  timeframe: string;
  type: 'BULLISH_BOS' | 'BEARISH_CHOCH' | 'LIQUIDITY_SWEEP' | 'FVG_FILL' | 'MOMENTUM_ALIGN';
  title: string;
  price: number;
  invalidation: number;
  qualityScore: number;
}

export type DrawingToolType = 'cursor' | 'trendline' | 'horizontal_ray' | 'fibonacci' | 'position' | 'text';

