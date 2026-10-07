import React from 'react';
import {
  Calendar,
  Layers,
  ArrowRight,
  LineChart,
  ShieldCheck,
  CreditCard,
  Users,
  Activity,
  ChevronRight,
  FileText
} from 'lucide-react';
import { AppTab, Instrument } from './AppShell';
import { ALGORITHMIC_ALERTS } from '../../data/mockChartData';
import { AlgorithmicAlert } from '../../types/trading';
import { MOCK_CURRENT_USER } from '../../mock/mockData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface OverviewScreenProps {
  onNavigate: (tab: AppTab) => void;
  selectedInstrument: Instrument;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onNavigate,
  selectedInstrument,
}) => {
  return (
    <div
      data-component="OverviewScreen"
      className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 select-none text-left overflow-y-auto"
    >
      {/* PUBLIC PREVIEW DEMO NOTICE BANNER */}
      <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#4F6BFF]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-[#4F6BFF]" />
          <span className="text-[#17181C] font-bold">PUBLIC PREVIEW:</span>
          <span className="text-[#666B76]">Displaying simulated demo trading account data.</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-white text-[#4F6BFF] border border-[#4F6BFF]/20 text-[11px] font-bold shadow-xs">
          DEMO ENVIRONMENT
        </span>
      </div>

      {/* 1. TOP DENSITY TELEMETRY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 text-left shadow-card">
          <div className="text-[11px] font-semibold uppercase text-[#666B76] flex items-center justify-between">
            <span>Account Status</span>
            <span className="size-2 rounded-full bg-[#35C99A]" />
          </div>
          <div className="text-base font-bold text-[#17181C] mt-2">DEMO SUBSCRIBER</div>
          <div className="text-xs text-[#059669] font-medium mt-0.5">Simulated TV Sync</div>
        </div>

        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 text-left shadow-card">
          <div className="text-[11px] font-semibold uppercase text-[#666B76] flex items-center justify-between">
            <span>Active Indicators</span>
            <Layers className="size-4 text-[#4F6BFF]" />
          </div>
          <div className="text-base font-bold text-[#17181C] mt-2">4 of 4 Scripts Active</div>
          <div className="text-xs text-[#666B76] mt-0.5">Pine Script v5 Locked</div>
        </div>

        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 text-left shadow-card">
          <div className="text-[11px] font-semibold uppercase text-[#666B76] flex items-center justify-between">
            <span>Masterclass Status</span>
            <Calendar className="size-4 text-[#8B5CF6]" />
          </div>
          <div className="text-base font-bold text-[#17181C] mt-2">3-Day Session Passed</div>
          <div className="text-xs text-[#059669] font-medium mt-0.5">Recordings Certified</div>
        </div>

        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 text-left shadow-card">
          <div className="text-[11px] font-semibold uppercase text-[#666B76] flex items-center justify-between">
            <span>Current Subscription</span>
            <CreditCard className="size-4 text-[#4F6BFF]" />
          </div>
          <div className="text-base font-bold text-[#17181C] mt-2">Annual Suite</div>
          <div className="text-xs text-[#666B76] mt-0.5">Renews April 2027</div>
        </div>
      </div>

      {/* 2. PRIMARY WORKSTATION LAUNCHER & QUICK ACTIONS */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 text-left shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAEAE5] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-[#35C99A]" />
            <span className="text-xs font-bold uppercase text-[#17181C] tracking-wider">
              AlgoFinex Trading Terminal
            </span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ECFBF6] text-[#059669] border border-[#35C99A]/20">
            WORKSPACE FEED: LIVE
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#17181C] tracking-tight">
              Institutional Charting &amp; Market Structure Workstation
            </h1>
            <p className="text-xs sm:text-sm text-[#666B76] leading-relaxed max-w-2xl">
              Launch the live interactive Lightweight Charts terminal. Inspect multi-timeframe swing geometry, liquidity imbalance sweeps, and bar-close execution triggers across crypto, futures, and equities.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('workspace')}
              leftIcon={<LineChart className="size-4" />}
              rightIcon={<ArrowRight className="size-4" />}
            >
              Launch Live Terminal ({selectedInstrument})
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onNavigate('products')}
              leftIcon={<Layers className="size-4" />}
            >
              Manage Installed Indicators
            </Button>
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Left Column: Recent Algorithmic Activity & Signal Log */}
        <div className="lg:col-span-7 bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-5 shadow-card">
          <div className="flex items-center justify-between border-b border-[#EAEAE5] pb-4">
            <div className="flex items-center gap-2.5">
              <Activity className="size-4 text-[#4F6BFF]" />
              <h3 className="text-sm font-bold text-[#17181C]">
                Recent Indicator Telemetry
              </h3>
            </div>
            <span className="text-xs text-[#666B76]">Auto-sync 15s</span>
          </div>

          <div className="divide-y divide-[#F0F1EE]">
            {ALGORITHMIC_ALERTS.map((alert: AlgorithmicAlert) => (
              <div key={alert.id} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span
                    className={`size-2 rounded-full ${
                      alert.type.includes('BULLISH') || alert.type.includes('MOMENTUM')
                        ? 'bg-[#35C99A]'
                        : 'bg-[#FF6B6B]'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-[#17181C] font-mono">{alert.symbol}</span>
                    <span className="text-[#666B76] ml-2 font-medium">{alert.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#666B76] font-mono">
                  <span className="font-semibold text-[#17181C]">${alert.price.toLocaleString()}</span>
                  <span className="text-[11px] text-[#9CA3AF]">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAEAE5]">
            <button
              onClick={() => onNavigate('workspace')}
              className="text-xs font-semibold text-[#4F6BFF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Telemetry Feed in Workspace</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Active Access & License Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Access Card */}
          <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-5 shadow-card">
            <div className="flex items-center justify-between border-b border-[#EAEAE5] pb-4">
              <h3 className="text-sm font-bold text-[#17181C] flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#35C99A]" />
                <span>TradingView Whitelist</span>
              </h3>
              <Badge variant="success">ACTIVE</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">Linked Username:</span>
                <span className="text-[#17181C] font-bold font-mono">@{MOCK_CURRENT_USER.tradingViewHandle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">License Pass:</span>
                <span className="text-[#17181C] font-mono">AF-DEMO-00000</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#666B76]">Pine Script Access:</span>
                <span className="text-[#059669] font-semibold">All 4 Indicators Active</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onNavigate('access')}
              >
                Change Linked Handle
              </Button>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-3 text-xs shadow-card">
            <h4 className="text-xs font-semibold uppercase text-[#666B76] mb-2">
              Desk Management
            </h4>
            <button
              onClick={() => onNavigate('subscription')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAFAF7] text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5 font-medium">
                <CreditCard className="size-4 text-[#4F6BFF]" />
                <span>Subscription &amp; Invoices</span>
              </span>
              <ChevronRight className="size-4 text-[#9CA3AF]" />
            </button>

            <button
              onClick={() => onNavigate('referral')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAFAF7] text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5 font-medium">
                <Users className="size-4 text-[#35C99A]" />
                <span>Partner &amp; Referral Desk ($354 Pending)</span>
              </span>
              <ChevronRight className="size-4 text-[#9CA3AF]" />
            </button>

            <button
              onClick={() => onNavigate('support')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAFAF7] text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5 font-medium">
                <FileText className="size-4 text-[#8B5CF6]" />
                <span>Submit Technical Ticket</span>
              </span>
              <ChevronRight className="size-4 text-[#9CA3AF]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
