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
  LifeBuoy,
  Sun,
  Moon
} from 'lucide-react';
import { SymbolSearchModal } from './SymbolSearchModal';
import { WATCHLIST_DATA } from '../../data/mockChartData';
import { useTheme } from '../../context/ThemeContext';

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
  const { isDark, toggleTheme } = useTheme();

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
      <header className="h-14 bg-white border-b border-[#EAEAE5] px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none shadow-xs">
        {/* Left: Brand + Landing Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitApp}
            className="flex items-center gap-1.5 text-xs font-medium text-[#666B76] hover:text-[#17181C] transition-colors p-1.5 -ml-1 rounded-xl hover:bg-[#FAFAF7] cursor-pointer"
            title="Return to Presentation"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Website</span>
          </button>

          <div className="h-4 w-px bg-[#EAEAE5] hidden sm:block" />

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-xl bg-[#4F6BFF] flex items-center justify-center shadow-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 18L10 11L14 15L20 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-[#17181C] tracking-tight text-sm hidden xs:inline">
              Algo<span className="text-[#4F6BFF]">Finex</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F6BFF] border border-[#4F6BFF]/20 uppercase hidden md:inline">
              DESK TERMINAL
            </span>
          </div>
        </div>

        {/* Center: Search Popover Trigger + Timeframe Selector */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-[#FAFAF7] hover:bg-white border border-[#EAEAE5] hover:border-[#4F6BFF]/40 rounded-xl px-3 py-1.5 transition-all cursor-pointer shadow-xs group"
          >
            <Search className="size-3.5 text-[#666B76] group-hover:text-[#4F6BFF] transition-colors" />
            <span className="text-xs font-bold text-[#17181C] font-mono tracking-tight">
              {selectedInstrument}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#EAEAE5] text-xs font-mono">
              <span className="text-[#17181C] font-semibold">
                ${currentQuote.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`text-[11px] font-bold ${
                  isPositive ? 'text-[#059669]' : 'text-[#FF6B6B]'
                }`}
              >
                {isPositive ? '+' : ''}
                {currentQuote.change24h}%
              </span>
            </div>
            <ChevronDown className="size-3 text-[#666B76] ml-0.5" />
          </button>

          {/* Timeframe Selector Strip */}
          <div className="flex items-center bg-[#FAFAF7] border border-[#EAEAE5] rounded-xl p-0.5 shadow-xs">
            {(['1m', '5m', '15m', '1h', '4h', '1D'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-[#4F6BFF] text-white shadow-xs font-bold'
                    : 'text-[#666B76] hover:text-[#17181C]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Telemetry & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-[#4F6BFF] bg-[#EEF2FF] border border-[#4F6BFF]/20 px-2.5 py-1 rounded-full">
            <span className="size-1.5 rounded-full bg-[#4F6BFF]" />
            <span>DEMO PREVIEW</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium text-[#059669] bg-[#ECFBF6] border border-[#35C99A]/20 px-2.5 py-1 rounded-full">
            <span className="size-1.5 rounded-full bg-[#35C99A]" />
            <span>PINE V5 · SYNCED</span>
          </div>

          <button
            onClick={toggleTheme}
            className="size-8 rounded-xl hover:bg-[#FAFAF7] flex items-center justify-center text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer border border-[#EAEAE5]"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="size-3.5 text-[#F4C95D]" /> : <Moon className="size-3.5" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="size-8 rounded-xl hover:bg-[#FAFAF7] flex items-center justify-center text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer border border-[#EAEAE5]"
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
      className={`bg-white border-r border-[#EAEAE5] flex flex-col justify-between py-4 select-none shrink-0 transition-all duration-200 z-30 shadow-xs ${
        isCollapsed ? 'w-16' : 'w-52 lg:w-56'
      }`}
    >
      <div>
        <div className="px-3 mb-3 flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#666B76] px-2">
              Trader Desk
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="size-7 rounded-lg hover:bg-[#FAFAF7] flex items-center justify-center text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer mx-auto"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft
              className={`size-3.5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#4F6BFF] font-bold shadow-xs'
                    : 'text-[#666B76] hover:text-[#17181C] hover:bg-[#FAFAF7]'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`size-4 shrink-0 ${isActive ? 'text-[#4F6BFF]' : 'text-[#666B76]'}`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}

                {isCollapsed && (
                  <div className="absolute left-16 ml-2 px-2.5 py-1 bg-white border border-[#EAEAE5] rounded-xl text-xs font-medium text-[#17181C] whitespace-nowrap shadow-card opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pt-4 border-t border-[#EAEAE5] text-[11px] text-[#666B76]">
        {!isCollapsed ? (
          <div>
            <div className="text-[#17181C] font-semibold">ALGOFINEX v4.2</div>
            <div>Institutional Workstation</div>
          </div>
        ) : (
          <div className="text-center font-bold text-[#4F6BFF]">AF</div>
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
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EAEAE5] z-40 flex items-center justify-around h-14 select-none px-1 shadow-card">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition-colors cursor-pointer ${
              isActive ? 'text-[#4F6BFF] font-bold' : 'text-[#666B76]'
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
    <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] flex flex-col overflow-hidden">
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

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-[#FAFAF7]">
          {children}
        </main>
      </div>

      <MobileBottomTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
