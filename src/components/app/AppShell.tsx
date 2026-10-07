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
  ChevronLeft
} from 'lucide-react';
import { SymbolSearchModal } from './SymbolSearchModal';
import { WATCHLIST_DATA } from '../../data/mockChartData';

export type AppTab = 'overview' | 'workspace' | 'indicators' | 'session' | 'access';
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
      <header className="h-13 bg-[#060A12] border-b border-white/10 px-3 sm:px-5 flex items-center justify-between sticky top-0 z-40 select-none">
        {/* Left: Brand + Landing Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitApp}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1.5 -ml-1 rounded-lg hover:bg-white/5 cursor-pointer"
            title="Return to Presentation"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Landing</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-gradient-to-tr from-[#00F090] to-[#00E5FF] flex items-center justify-center shadow-[0_0_10px_rgba(0,240,144,0.4)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <line x1="3" y1="20" x2="21" y2="20" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M4 17L11 10L15 14L20 6" stroke="#000000" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-display font-bold text-white tracking-[-0.03em] text-sm hidden xs:inline">
              Algo<span className="text-[#00F090] font-semibold">Finex</span>
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 uppercase hidden md:inline">
              VELA PRO
            </span>
          </div>
        </div>

        {/* Center: Search Popover Trigger + Timeframe Selector */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Symbol Selector Command Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-[#0A0E1A] hover:bg-[#0E1528] border border-white/10 hover:border-cyan-500/40 rounded-lg px-2.5 py-1 transition-all cursor-pointer shadow-xs group"
          >
            <Search className="size-3 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
            <span className="text-xs font-mono font-bold text-white tracking-tight">
              {selectedInstrument}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-white/10 text-[11px] font-mono">
              <span className="text-white font-semibold">
                ${currentQuote.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  isPositive ? 'text-[#00F090]' : 'text-[#FF3B69]'
                }`}
              >
                {isPositive ? '+' : ''}
                {currentQuote.change24h}%
              </span>
            </div>
            <ChevronDown className="size-3 text-slate-500 ml-0.5" />
          </button>

          {/* Timeframe Selector Strip */}
          <div className="flex items-center bg-[#0A0E1A] border border-white/10 rounded-lg p-0.5 shadow-xs">
            {(['1m', '5m', '15m', '1h', '4h', '1D'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`px-2 py-0.5 text-[11px] font-mono font-medium rounded-md transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-[#00F090] text-black font-bold shadow-[0_0_8px_rgba(0,240,144,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Telemetry & Workstation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-[#00F090] bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md">
            <span className="size-1.5 rounded-full bg-[#00F090] animate-pulse shadow-[0_0_6px_#00F090]" />
            <span>AF-8849 · VELA QUANT ENGINE</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="size-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
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
    { id: 'indicators' as AppTab, label: 'Indicator Suite', icon: Layers },
    { id: 'session' as AppTab, label: '3-Day Session', icon: Calendar },
    { id: 'access' as AppTab, label: 'Access Pass', icon: ShieldCheck },
  ];

  return (
    <aside
      className={`bg-[#060A12] border-r border-white/10 flex flex-col justify-between py-3 select-none shrink-0 transition-all duration-200 z-30 ${
        isCollapsed ? 'w-14' : 'w-48 lg:w-52'
      }`}
    >
      <div>
        {/* Toggle Collapse Button */}
        <div className="px-2 mb-3 flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2">
              Navigation
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="size-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer mx-auto"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft
              className={`size-3.5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 px-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-emerald-500/10 text-[#00F090] font-bold border border-emerald-500/30 shadow-[0_0_12px_rgba(0,240,144,0.15)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`size-4 shrink-0 ${isActive ? 'text-[#00F090]' : 'text-slate-500'}`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}

                {/* Floating tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-14 ml-1 px-2 py-1 bg-[#0A101D] border border-white/15 rounded text-[11px] font-mono text-white whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rail Bottom Metadata */}
      <div className="px-2 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500">
        {!isCollapsed ? (
          <div>
            <div className="text-slate-300 font-semibold">ALGOFINEX QUANT</div>
            <div className="text-emerald-400 text-[9px] mt-0.5 flex items-center gap-1 font-mono">
              <span className="size-1 rounded-full bg-[#00F090]"></span>
              VELA ENGINE v4.2
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="size-2 rounded-full bg-[#00F090] shadow-[0_0_6px_#00F090]" />
          </div>
        )}
      </div>
    </aside>
  );
};

interface MobileNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const mobileItems = [
    { id: 'workspace' as AppTab, label: 'Workspace', icon: LineChart },
    { id: 'overview' as AppTab, label: 'Overview', icon: LayoutGrid },
    { id: 'indicators' as AppTab, label: 'Suite', icon: Layers },
    { id: 'session' as AppTab, label: 'Session', icon: Calendar },
    { id: 'access' as AppTab, label: 'Access', icon: ShieldCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-13 bg-[#060A12] border-t border-white/10 flex items-center justify-around px-2 z-50 shadow-2xl">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-0.5 min-h-[44px] cursor-pointer ${
              isActive ? 'text-[#00F090] font-bold' : 'text-slate-500 hover:text-white'
            }`}
          >
            <Icon className={`size-4 ${isActive ? 'text-[#00F090]' : 'text-slate-500'}`} />
            <span className="text-[10px] font-mono">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

interface AppShellProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  selectedInstrument: Instrument;
  onInstrumentChange: (inst: Instrument) => void;
  selectedTimeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  onExitApp: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeTab,
  onTabChange,
  selectedInstrument,
  onInstrumentChange,
  selectedTimeframe,
  onTimeframeChange,
  onExitApp,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      data-component="AppShell"
      className="min-h-screen bg-[#05080E] text-white flex flex-col font-sans select-none"
    >
      <AppHeader
        selectedInstrument={selectedInstrument}
        onInstrumentChange={onInstrumentChange}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={onTimeframeChange}
        onExitApp={onExitApp}
      />

      <div className="flex-1 flex min-h-[calc(100vh-3.25rem)] overflow-hidden">
        <div className="hidden md:block">
          <DesktopRail
            activeTab={activeTab}
            onTabChange={onTabChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          />
        </div>

        <main className="flex-1 min-w-0 bg-[#05080E] flex flex-col overflow-hidden pb-13 md:pb-0">
          {children}
        </main>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default AppShell;
