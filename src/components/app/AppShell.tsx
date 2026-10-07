import React from 'react';
import { LayoutGrid, LineChart, Layers, Calendar, ShieldCheck, ArrowLeft } from 'lucide-react';

export type AppTab = 'overview' | 'workspace' | 'indicators' | 'session' | 'access';
export type Instrument = 'BTC/USD' | 'ETH/USD' | 'SOL/USD' | 'NQ1!';
export type Timeframe = '15m' | '1h' | '4h' | '1D';

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
  return (
    <header className="h-14 bg-[#060A12] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Brand + Exit to Marketing */}
      <div className="flex items-center gap-3">
        <button
          onClick={onExitApp}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
          title="Return to Public Presentation"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden sm:inline">Landing</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10" />

        <div className="flex items-center gap-2">
          <div className="size-5 rounded bg-gradient-to-tr from-[#00F090] to-[#00E5FF] flex items-center justify-center shadow-[0_0_8px_rgba(0,240,144,0.4)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <line x1="3" y1="20" x2="21" y2="20" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 17L11 10L15 14L20 6" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-display font-bold text-white tracking-[-0.03em] text-sm">
            Algo<span className="text-slate-400 font-medium">Finex</span>
          </span>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 uppercase">
            Workstation
          </span>
        </div>
      </div>

      {/* Middle: Instrument & Timeframe Selectors (Active in Workspace View) */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Instrument Selector */}
        <div className="flex items-center bg-[#0A0E1A] border border-white/10 rounded-lg px-2 py-1 shadow-xs">
          <span className="text-[10px] font-mono text-slate-500 mr-1.5 uppercase hidden sm:inline">Inst:</span>
          <select
            value={selectedInstrument}
            onChange={(e) => onInstrumentChange(e.target.value as Instrument)}
            className="text-xs font-mono font-bold text-white bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="BTC/USD" className="bg-[#0A0E1A] text-white">BTC/USD</option>
            <option value="ETH/USD" className="bg-[#0A0E1A] text-white">ETH/USD</option>
            <option value="SOL/USD" className="bg-[#0A0E1A] text-white">SOL/USD</option>
            <option value="NQ1!" className="bg-[#0A0E1A] text-white">NQ1!</option>
          </select>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center bg-[#0A0E1A] border border-white/10 rounded-lg p-0.5 shadow-xs">
          {(['15m', '1h', '4h', '1D'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md transition-all cursor-pointer ${
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

      {/* Right: Demo State Badge */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#00F090] bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <span className="size-1.5 rounded-full bg-[#00F090] animate-pulse shadow-[0_0_6px_#00F090]" />
          <span>AF-8849 · LIVE VELA ENGINE</span>
        </div>
      </div>
    </header>
  );
};

interface DesktopRailProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const DesktopRail: React.FC<DesktopRailProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'overview' as AppTab, label: 'Overview', icon: LayoutGrid },
    { id: 'workspace' as AppTab, label: 'Workspace', icon: LineChart },
    { id: 'indicators' as AppTab, label: 'Indicators', icon: Layers },
    { id: 'session' as AppTab, label: '3-Day Session', icon: Calendar },
    { id: 'access' as AppTab, label: 'Access Pass', icon: ShieldCheck },
  ];

  return (
    <aside className="w-16 lg:w-56 bg-[#060A12] border-r border-white/10 flex flex-col justify-between py-4 select-none shrink-0">
      <nav className="space-y-1.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/10 text-[#00F090] font-bold border border-emerald-500/30 shadow-[0_0_12px_rgba(0,240,144,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`size-4 shrink-0 ${isActive ? 'text-[#00F090]' : 'text-slate-500'}`} />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Rail Bottom Metadata */}
      <div className="px-3 text-[10px] font-mono text-slate-500 hidden lg:block border-t border-white/10 pt-3">
        <div className="text-slate-300">ALGOFINEX v4.0</div>
        <div className="text-emerald-400 text-[9px] mt-0.5 flex items-center gap-1">
          <span className="size-1 rounded-full bg-[#00F090]"></span>
          VELA ENGINE ACTIVE
        </div>
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
    { id: 'workspace' as AppTab, label: 'Chart', icon: LineChart },
    { id: 'overview' as AppTab, label: 'Overview', icon: LayoutGrid },
    { id: 'indicators' as AppTab, label: 'Suite', icon: Layers },
    { id: 'session' as AppTab, label: 'Session', icon: Calendar },
    { id: 'access' as AppTab, label: 'Access', icon: ShieldCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#060A12] border-t border-white/10 flex items-center justify-around px-2 z-50 shadow-2xl">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-0.5 min-h-[48px] cursor-pointer ${
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
  return (
    <div data-component="AppShell" className="min-h-screen bg-[#05080E] text-white flex flex-col font-sans">
      <AppHeader
        selectedInstrument={selectedInstrument}
        onInstrumentChange={onInstrumentChange}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={onTimeframeChange}
        onExitApp={onExitApp}
      />

      <div className="flex-1 flex min-h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="hidden md:block">
          <DesktopRail activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <main className="flex-1 min-w-0 bg-[#05080E] overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default AppShell;
