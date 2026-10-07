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
      {/* 1. TOP DENSITY TELEMETRY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4 text-left">
          <div className="text-[10px] font-mono uppercase text-[#8B929C] flex items-center justify-between">
            <span>Account Status</span>
            <span className="size-1.5 rounded-full bg-[#6FAF8A]" />
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#F3F4F6] mt-1">PRO SUBSCRIBER</div>
          <div className="text-[11px] font-mono text-[#6FAF8A]">TradingView Synced</div>
        </div>

        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4 text-left">
          <div className="text-[10px] font-mono uppercase text-[#8B929C] flex items-center justify-between">
            <span>Active Indicators</span>
            <Layers className="size-3 text-[#C8A96B]" />
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#F3F4F6] mt-1">4 of 4 Scripts Active</div>
          <div className="text-[11px] font-mono text-[#8B929C]">Pine Script v5 Locked</div>
        </div>

        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4 text-left">
          <div className="text-[10px] font-mono uppercase text-[#8B929C] flex items-center justify-between">
            <span>Masterclass Status</span>
            <Calendar className="size-3 text-[#C8A96B]" />
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#F3F4F6] mt-1">3-Day Session Passed</div>
          <div className="text-[11px] font-mono text-[#6FAF8A]">Recordings Certified</div>
        </div>

        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4 text-left">
          <div className="text-[10px] font-mono uppercase text-[#8B929C] flex items-center justify-between">
            <span>Current Subscription</span>
            <CreditCard className="size-3 text-[#C8A96B]" />
          </div>
          <div className="text-sm sm:text-base font-mono font-bold text-[#F3F4F6] mt-1">Annual Suite</div>
          <div className="text-[11px] font-mono text-[#8B929C]">Renews April 2027</div>
        </div>
      </div>

      {/* 2. PRIMARY WORKSTATION LAUNCHER & QUICK ACTIONS */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#20252C] pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#6FAF8A]" />
            <span className="text-xs font-mono font-bold uppercase text-[#F3F4F6] tracking-wider">
              AlgoFinex Trading Terminal
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#141820] text-[#C8A96B] border border-[#20252C] font-semibold">
            WORKSPACE FEED: LIVE
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
              Institutional Charting &amp; Market Structure Workstation
            </h1>
            <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed max-w-2xl">
              Launch the live interactive Lightweight Charts terminal. Inspect multi-timeframe swing geometry, liquidity imbalance sweeps, and bar-close execution triggers across crypto, futures, and equities.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2.5">
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
              size="sm"
              onClick={() => onNavigate('products')}
              leftIcon={<Layers className="size-3.5" />}
            >
              Manage Installed Indicators
            </Button>
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN HIGH-DENSITY DASHBOARD: Real Activity & Account Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Left Column (7 cols): Recent Algorithmic Activity & Signal Log */}
        <div className="lg:col-span-7 bg-[#101318] border border-[#20252C] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#20252C] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-[#C8A96B]" />
              <h3 className="text-sm font-semibold text-[#F3F4F6]">
                Recent Indicator Telemetry
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#8B929C]">Auto-sync 15s</span>
          </div>

          <div className="divide-y divide-[#1C2128]">
            {ALGORITHMIC_ALERTS.map((alert: AlgorithmicAlert) => (
              <div key={alert.id} className="py-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span
                    className={`size-1.5 rounded-full ${
                      alert.type.includes('BULLISH') || alert.type.includes('MOMENTUM')
                        ? 'bg-[#6FAF8A]'
                        : 'bg-[#C87878]'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-[#F3F4F6]">{alert.symbol}</span>
                    <span className="text-[#8B929C] ml-2">{alert.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#8B929C]">
                  <span>${alert.price.toLocaleString()}</span>
                  <span className="text-[10px] text-[#4B5563]">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#20252C]">
            <button
              onClick={() => onNavigate('workspace')}
              className="text-xs font-mono text-[#C8A96B] hover:text-[#D8BB80] flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Telemetry Feed in Workspace</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Active Access & License Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Access Card */}
          <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#20252C] pb-3">
              <h3 className="text-sm font-semibold text-[#F3F4F6] flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#6FAF8A]" />
                <span>TradingView Whitelist</span>
              </h3>
              <Badge variant="success">ACTIVE</Badge>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1C2128]">
                <span className="text-[#8B929C]">Linked Username:</span>
                <span className="text-[#F3F4F6] font-semibold">@{MOCK_CURRENT_USER.tradingViewHandle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1C2128]">
                <span className="text-[#8B929C]">License Pass:</span>
                <span className="text-[#F3F4F6]">AF-PRO-98214</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1C2128]">
                <span className="text-[#8B929C]">Pine Script Access:</span>
                <span className="text-[#6FAF8A]">All 4 Indicators Active</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
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
          <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-5 sm:p-6 space-y-3 text-xs">
            <h4 className="text-xs font-mono uppercase text-[#8B929C] font-semibold mb-2">
              Desk Management
            </h4>
            <button
              onClick={() => onNavigate('subscription')}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#141820] text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 font-mono">
                <CreditCard className="size-3.5 text-[#C8A96B]" />
                <span>Subscription &amp; Invoices</span>
              </span>
              <ChevronRight className="size-3.5 text-[#4B5563]" />
            </button>

            <button
              onClick={() => onNavigate('referral')}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#141820] text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 font-mono">
                <Users className="size-3.5 text-[#C8A96B]" />
                <span>Partner &amp; Referral Desk ($354 Pending)</span>
              </span>
              <ChevronRight className="size-3.5 text-[#4B5563]" />
            </button>

            <button
              onClick={() => onNavigate('support')}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#141820] text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 font-mono">
                <FileText className="size-3.5 text-[#C8A96B]" />
                <span>Submit Technical Ticket</span>
              </span>
              <ChevronRight className="size-3.5 text-[#4B5563]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
