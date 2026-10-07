import React, { useState } from 'react';
import {
  LayoutGrid,
  LineChart,
  Layers,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Search,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Users,
  User as UserIcon,
  LifeBuoy
} from 'lucide-react';
import { SymbolSearchModal } from './SymbolSearchModal';
import { WATCHLIST_DATA } from '../../data/mockChartData';

export type AppTab = 
  | 'workspace' 
  | 'overview' 
  | 'products' 
  | 'access' 
  | 'subscription' 
  | 'referral' 
  | 'account' 
  | 'support'
  | 'session';

export type Instrument =
  | 'BTC/USD'
  | 'ETH/USD'
  | 'SOL/USD'
  | 'NQ1!'
  | 'ES1!'
  | 'XAU/USD'
  | 'EUR/USD'
  | string;

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W';

interface AppHeaderProps {
  selectedInstrument: Instrument;
  onInstrumentChange: (inst: Instrument) => void;
  selectedTimeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  onExitApp: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  selectedInstrument,
  onInstrumentChange,
  selectedTimeframe,
  onTimeframeChange,
  onExitApp,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active instrument quote lookup
  const currentQuote = WATCHLIST_DATA.find((w) => w.symbol === selectedInstrument) || {
    symbol: selectedInstrument,
    price: 68220.50,
    change24h: 3.42,
  };
  const isPositive = currentQuote.change24h >= 0;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <>
      <header className="h-13 bg-[#101318] border-b border-[#20252C] px-3 sm:px-5 flex items-center justify-between sticky top-0 z-40 select-none">
        {/* Left: Brand + Landing Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitApp}
            className="flex items-center gap-1.5 text-xs font-mono text-[#8B929C] hover:text-[#F3F4F6] transition-colors p-1.5 -ml-1 rounded-lg hover:bg-white/[0.04] cursor-pointer"
            title="Return to Presentation"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Website</span>
          </button>

          <div className="h-4 w-px bg-[#20252C] hidden sm:block" />

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-[#141820] border border-[#20252C] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M4 18L10 11L14 15L20 7" stroke="#C8A96B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-[#F3F4F6] tracking-tight text-sm hidden xs:inline">
              Algo<span className="text-[#C8A96B] font-medium">Finex</span>
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#141820] text-[#C8A96B] border border-[#20252C] uppercase hidden md:inline">
              DESK TERMINAL
            </span>
          </div>
        </div>

        {/* Center: Search Popover Trigger + Timeframe Selector */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-[#0B0E13] hover:bg-[#141820] border border-[#20252C] hover:border-[#C8A96B]/50 rounded-lg px-2.5 py-1 transition-all cursor-pointer shadow-xs group"
          >
            <Search className="size-3 text-[#8B929C] group-hover:text-[#C8A96B] transition-colors" />
            <span className="text-xs font-mono font-bold text-[#F3F4F6] tracking-tight">
              {selectedInstrument}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-[#20252C] text-[11px] font-mono">
              <span className="text-[#F3F4F6] font-semibold">
                ${currentQuote.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  isPositive ? 'text-[#6FAF8A]' : 'text-[#C87878]'
                }`}
              >
                {isPositive ? '+' : ''}
                {currentQuote.change24h}%
              </span>
            </div>
            <ChevronDown className="size-3 text-[#6B7380] ml-0.5" />
          </button>

          {/* Timeframe Selector Strip */}
          <div className="flex items-center bg-[#0B0E13] border border-[#20252C] rounded-lg p-0.5 shadow-xs">
            {(['1m', '5m', '15m', '1h', '4h', '1D'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`px-2 py-0.5 text-[11px] font-mono font-medium rounded-md transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-[#141820] text-[#C8A96B] font-bold border border-[#20252C]'
                    : 'text-[#8B929C] hover:text-[#F3F4F6]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Telemetry & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-[#6FAF8A] bg-[#141820] border border-[#20252C] px-2.5 py-1 rounded-md">
            <span className="size-1.5 rounded-full bg-[#6FAF8A]" />
            <span>PINE V5 ENGINE · SYNCED</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="size-7 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer border border-transparent"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
        </div>
      </header>

      {/* Symbol Search Modal */}
      <SymbolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        selectedInstrument={selectedInstrument}
        onSelectInstrument={onInstrumentChange}
      />
    </>
  );
};

interface DesktopRailProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const DesktopRail: React.FC<DesktopRailProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'workspace' as AppTab, label: 'Workspace', icon: LineChart },
    { id: 'overview' as AppTab, label: 'Overview', icon: LayoutGrid },
    { id: 'products' as AppTab, label: 'My Products', icon: Layers },
    { id: 'access' as AppTab, label: 'Active Access', icon: ShieldCheck },
    { id: 'subscription' as AppTab, label: 'Subscription', icon: CreditCard },
    { id: 'referral' as AppTab, label: 'Referral', icon: Users },
    { id: 'account' as AppTab, label: 'Account', icon: UserIcon },
    { id: 'support' as AppTab, label: 'Support', icon: LifeBuoy },
    { id: 'session' as AppTab, label: '3-Day Session', icon: Calendar },
  ];

  return (
    <aside
      className={`bg-[#0B0E13] border-r border-[#20252C] flex flex-col justify-between py-3 select-none shrink-0 transition-all duration-200 z-30 ${
        isCollapsed ? 'w-14' : 'w-48 lg:w-52'
      }`}
    >
      <div>
        <div className="px-2 mb-3 flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7380] font-semibold px-2">
              Trader Desk
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="size-7 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer mx-auto"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft
              className={`size-3.5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <nav className="space-y-1 px-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#141820] text-[#C8A96B] font-semibold border border-[#20252C]'
                    : 'text-[#8B929C] hover:text-[#F3F4F6] hover:bg-white/[0.03] border border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`size-4 shrink-0 ${isActive ? 'text-[#C8A96B]' : 'text-[#8B929C]'}`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}

                {isCollapsed && (
                  <div className="absolute left-14 ml-1 px-2 py-1 bg-[#141820] border border-[#20252C] rounded text-[11px] font-mono text-[#F3F4F6] whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pt-3 border-t border-[#20252C] text-[10px] font-mono text-[#6B7380]">
        {!isCollapsed ? (
          <div>
            <div className="text-[#8B929C] font-semibold">ALGOFINEX v4.2</div>
            <div>Institutional Workstation</div>
          </div>
        ) : (
          <div className="text-center font-bold text-[#8B929C]">AF</div>
        )}
      </div>
    </aside>
  );
};

interface MobileBottomTabsProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const MobileBottomTabs: React.FC<MobileBottomTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'workspace' as AppTab, label: 'Terminal', icon: LineChart },
    { id: 'overview' as AppTab, label: 'Overview', icon: LayoutGrid },
    { id: 'products' as AppTab, label: 'Products', icon: Layers },
    { id: 'access' as AppTab, label: 'Access', icon: ShieldCheck },
    { id: 'subscription' as AppTab, label: 'Billing', icon: CreditCard },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#101318] border-t border-[#20252C] z-40 flex items-center justify-around h-14 select-none px-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-mono transition-colors cursor-pointer ${
              isActive ? 'text-[#C8A96B] font-bold' : 'text-[#8B929C]'
            }`}
          >
            <Icon className="size-4 mb-0.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

interface AppShellProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  selectedInstrument: Instrument;
  onInstrumentChange: (inst: Instrument) => void;
  selectedTimeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  onExitApp: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  selectedInstrument,
  onInstrumentChange,
  selectedTimeframe,
  onTimeframeChange,
  onExitApp,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] flex flex-col overflow-hidden">
      <AppHeader
        selectedInstrument={selectedInstrument}
        onInstrumentChange={onInstrumentChange}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={onTimeframeChange}
        onExitApp={onExitApp}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden md:flex shrink-0">
          <DesktopRail
            activeTab={activeTab}
            onTabChange={onTabChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-[#080A0D]">
          {children}
        </main>
      </div>

      <MobileBottomTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
