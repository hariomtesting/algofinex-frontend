import React, { useEffect, useRef } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
  LineSeries,
  AreaSeries,
  HistogramSeries,
  ColorType,
  CrosshairMode,
  LineStyle,
  Time
} from 'lightweight-charts';
import { Instrument, Timeframe } from './AppShell';
import { LensLayer } from './WorkspaceScreen';
import {
  INSTRUMENT_LW_CANDLES,
  INSTRUMENT_LW_VOLUME,
  calculateEMA,
  calculateRSI
} from '../../data/mockChartData';
import { InspectorPoint } from './ContextualInspector';

export type ChartType = 'candles' | 'line' | 'area';

export interface ChartCrosshairData {
  timeStr: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isBull: boolean;
  change: number;
  changePercent: number;
  ema21?: number;
  ema55?: number;
  rsi?: number;
}

interface TradingChartProps {
  instrument: Instrument;
  timeframe: Timeframe;
  chartType: ChartType;
  activeLens: LensLayer;
  showEMA: boolean;
  showOrderBlocks: boolean;
  showLiquidity: boolean;
  showVolume: boolean;
  showRSI: boolean;
  onCrosshairMove?: (data: ChartCrosshairData | null) => void;
  onSelectInspectPoint?: (point: InspectorPoint) => void;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  instrument,
  timeframe,
  chartType,
  activeLens,
  showEMA,
  showOrderBlocks,
  showLiquidity,
  showVolume,
  showRSI,
  onCrosshairMove,
  onSelectInspectPoint,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const rsiContainerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<IChartApi | null>(null);
  const rsiChartRef = useRef<IChartApi | null>(null);

  // Active series references
  const mainSeriesRef = useRef<ISeriesApi<any> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const ema21SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const ema55SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const rsiSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  // Price lines for OB & Liquidity
  const priceLinesRef = useRef<any[]>([]);

  // Current dataset
  const candleData = INSTRUMENT_LW_CANDLES[instrument] || INSTRUMENT_LW_CANDLES['BTC/USD'];
  const volumeData = INSTRUMENT_LW_VOLUME[instrument] || INSTRUMENT_LW_VOLUME['BTC/USD'];

  // Initialize main chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const container = chartContainerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight || 420,
      layout: {
        background: { type: ColorType.Solid, color: '#0B0E13' },
        textColor: '#8B929C',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.02)', style: LineStyle.Dotted },
        horzLines: { color: 'rgba(255, 255, 255, 0.02)', style: LineStyle.Dotted },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: 'rgba(200, 169, 107, 0.4)',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#141820',
        },
        horzLine: {
          color: 'rgba(200, 169, 107, 0.4)',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: '#141820',
        },
      },
      rightPriceScale: {
        borderColor: '#20252C',
        textColor: '#8B929C',
        autoScale: true,
      },
      timeScale: {
        borderColor: '#20252C',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0 || !chartRef.current) return;
      const { width, height } = entries[0].contentRect;
      chartRef.current.applyOptions({ width, height });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  // Update Main Series (Candles / Line / Area) & Overlays
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    if (mainSeriesRef.current) {
      try {
        chart.removeSeries(mainSeriesRef.current);
      } catch (e) {}
      mainSeriesRef.current = null;
    }

    priceLinesRef.current = [];

    if (chartType === 'candles') {
      const series = chart.addSeries(CandlestickSeries, {
        upColor: '#6FAF8A',
        downColor: '#C87878',
        borderVisible: true,
        borderUpColor: '#6FAF8A',
        borderDownColor: '#C87878',
        wickUpColor: '#6FAF8A',
        wickDownColor: '#C87878',
      });
      series.setData(candleData as any);
      mainSeriesRef.current = series;
    } else if (chartType === 'area') {
      const series = chart.addSeries(AreaSeries, {
        topColor: 'rgba(200, 169, 107, 0.25)',
        bottomColor: 'rgba(200, 169, 107, 0.01)',
        lineColor: '#C8A96B',
        lineWidth: 2,
      });
      const areaData = candleData.map((c) => ({ time: c.time as Time, value: c.close }));
      series.setData(areaData);
      mainSeriesRef.current = series;
    } else {
      const series = chart.addSeries(LineSeries, {
        color: '#C8A96B',
        lineWidth: 2,
      });
      const lineData = candleData.map((c) => ({ time: c.time as Time, value: c.close }));
      series.setData(lineData);
      mainSeriesRef.current = series;
    }

    // Volume Series
    if (volumeSeriesRef.current) {
      try {
        chart.removeSeries(volumeSeriesRef.current);
      } catch (e) {}
      volumeSeriesRef.current = null;
    }

    if (showVolume) {
      const volSeries = chart.addSeries(HistogramSeries, {
        priceFormat: { type: 'volume' },
        priceScaleId: 'volume_scale',
      });
      chart.priceScale('volume_scale').applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      volSeries.setData(volumeData as any);
      volumeSeriesRef.current = volSeries;
    }

    // EMA Ribbon Overlays
    if (ema21SeriesRef.current) {
      try {
        chart.removeSeries(ema21SeriesRef.current);
      } catch (e) {}
      ema21SeriesRef.current = null;
    }
    if (ema55SeriesRef.current) {
      try {
        chart.removeSeries(ema55SeriesRef.current);
      } catch (e) {}
      ema55SeriesRef.current = null;
    }

    if (showEMA || activeLens === 'TREND' || activeLens === 'CONFIRMATION') {
      const ema21Data = calculateEMA(candleData, 21);
      const ema55Data = calculateEMA(candleData, 45);

      const ema21 = chart.addSeries(LineSeries, {
        color: '#C8A96B',
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        title: 'EMA 21',
      });
      ema21.setData(ema21Data as any);
      ema21SeriesRef.current = ema21;

      const ema55 = chart.addSeries(LineSeries, {
        color: '#8B929C',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        title: 'EMA 45',
      });
      ema55.setData(ema55Data as any);
      ema55SeriesRef.current = ema55;
    }

    // Order Blocks & Liquidity Price Lines
    if (mainSeriesRef.current) {
      const targetSeries = mainSeriesRef.current;

      if (showOrderBlocks || activeLens === 'STRUCTURE' || activeLens === 'CONFIRMATION') {
        const lastBar = candleData[candleData.length - 1];
        const obHigh = Math.round(lastBar.close * 1.018 * 100) / 100;
        const obLow = Math.round(lastBar.close * 0.982 * 100) / 100;

        const lineHigh = targetSeries.createPriceLine({
          price: obHigh,
          color: '#C87878',
          lineWidth: 1,
          lineStyle: LineStyle.Dotted,
          axisLabelVisible: true,
          title: 'SUPPLY OB / RESISTANCE',
        });
        const lineLow = targetSeries.createPriceLine({
          price: obLow,
          color: '#6FAF8A',
          lineWidth: 1,
          lineStyle: LineStyle.Dotted,
          axisLabelVisible: true,
          title: 'DEMAND OB / EQUILIBRIUM',
        });
        priceLinesRef.current.push(lineHigh, lineLow);
      }

      if (showLiquidity || activeLens === 'LIQUIDITY' || activeLens === 'CONFIRMATION') {
        const lastBar = candleData[candleData.length - 1];
        const liqBuy = Math.round(lastBar.close * 1.028 * 100) / 100;
        const liqSell = Math.round(lastBar.close * 0.972 * 100) / 100;

        const lineLiqBuy = targetSeries.createPriceLine({
          price: liqBuy,
          color: '#C8A96B',
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          title: 'BUY-SIDE LIQUIDITY POOL',
        });
        const lineLiqSell = targetSeries.createPriceLine({
          price: liqSell,
          color: '#D4A359',
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          title: 'SELL-SIDE LIQUIDITY / EQUAL LOWS',
        });
        priceLinesRef.current.push(lineLiqBuy, lineLiqSell);
      }
    }

    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !mainSeriesRef.current) {
        if (onCrosshairMove) onCrosshairMove(null);
        return;
      }

      const bar: any = param.seriesData.get(mainSeriesRef.current);
      if (!bar) {
        if (onCrosshairMove) onCrosshairMove(null);
        return;
      }

      const open = bar.open ?? bar.value ?? 0;
      const high = bar.high ?? bar.value ?? 0;
      const low = bar.low ?? bar.value ?? 0;
      const close = bar.close ?? bar.value ?? 0;
      const volBar: any = volumeSeriesRef.current ? param.seriesData.get(volumeSeriesRef.current) : null;
      const volume = volBar ? volBar.value : 0;
      const isBull = close >= open;
      const change = Math.round((close - open) * 100) / 100;
      const changePercent = open > 0 ? Math.round(((close - open) / open) * 10000) / 100 : 0;

      const timeVal = typeof param.time === 'number' ? param.time : 0;
      const d = new Date(timeVal * 1000);
      const timeStr = `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')} UTC`;

      if (onCrosshairMove) {
        onCrosshairMove({
          timeStr,
          open,
          high,
          low,
          close,
          volume,
          isBull,
          change,
          changePercent,
        });
      }
    });

  }, [instrument, chartType, candleData, volumeData, showEMA, showOrderBlocks, showLiquidity, showVolume, activeLens]);

  // Secondary RSI Chart Pane
  useEffect(() => {
    if (!showRSI) {
      if (rsiChartRef.current) {
        rsiChartRef.current.remove();
        rsiChartRef.current = null;
      }
      return;
    }

    if (!rsiContainerRef.current) return;

    if (rsiChartRef.current) {
      rsiChartRef.current.remove();
      rsiChartRef.current = null;
    }

    const container = rsiContainerRef.current;
    const rsiChart = createChart(container, {
      width: container.clientWidth,
      height: 110,
      layout: {
        background: { type: ColorType.Solid, color: '#0B0E13' },
        textColor: '#8B929C',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.02)', style: LineStyle.Dotted },
        horzLines: { color: 'rgba(255, 255, 255, 0.02)', style: LineStyle.Dotted },
      },
      rightPriceScale: {
        borderColor: '#20252C',
        textColor: '#8B929C',
        scaleMargins: { top: 0.15, bottom: 0.15 },
      },
      timeScale: {
        visible: false,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    rsiChartRef.current = rsiChart;

    const rsiSeries = rsiChart.addSeries(LineSeries, {
      color: '#C8A96B',
      lineWidth: 1,
      title: 'RSI 14',
    });

    const rsiData = calculateRSI(candleData, 14);
    rsiSeries.setData(rsiData as any);
    rsiSeriesRef.current = rsiSeries;

    rsiSeries.createPriceLine({
      price: 70,
      color: '#C87878',
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      title: 'OB 70',
    });
    rsiSeries.createPriceLine({
      price: 30,
      color: '#6FAF8A',
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      title: 'OS 30',
    });

    rsiChart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0 || !rsiChartRef.current) return;
      const { width } = entries[0].contentRect;
      rsiChartRef.current.applyOptions({ width, height: 110 });
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (rsiChartRef.current) {
        rsiChartRef.current.remove();
        rsiChartRef.current = null;
      }
    };
  }, [showRSI, candleData]);

  const handleChartClick = () => {
    if (!onSelectInspectPoint) return;
    const lastBar = candleData[candleData.length - 1];
    onSelectInspectPoint({
      price: `$${lastBar.close.toLocaleString()}`,
      label: `BOS ▲ $${lastBar.close.toLocaleString()}`,
      layer: activeLens,
      type: 'STRUCTURE',
      description: `Institutional Break of Structure (BOS) confirmed on ${instrument} ${timeframe}. Order flow demonstrates high buy-side aggression with reclaimed equilibrium.`,
      invalidation: `$${(Math.round(lastBar.close * 0.985)).toLocaleString()}`,
      time: 'CURRENT BAR',
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full relative select-none overflow-hidden bg-[#0B0E13]">
      <div
        ref={chartContainerRef}
        onClick={handleChartClick}
        className="flex-1 w-full min-h-[340px] relative cursor-crosshair"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center select-none z-0 opacity-[0.03]">
          <div className="text-6xl md:text-8xl font-black tracking-tighter text-[#F3F4F6]">
            ALGOFINEX
          </div>
          <div className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-[#C8A96B]">
            PINE SCRIPT v5 WORKSTATION
          </div>
        </div>
      </div>

      {showRSI && (
        <div className="h-[110px] w-full border-t border-[#20252C] relative bg-[#0B0E13] shrink-0">
          <div className="absolute top-1.5 left-3 text-[10px] font-mono text-[#C8A96B] z-10 flex items-center gap-2">
            <span className="font-bold">RSI (14)</span>
            <span className="text-[#4B5563]">•</span>
            <span className="text-[#8B929C]">Institutional Momentum</span>
          </div>
          <div ref={rsiContainerRef} className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default TradingChart;
