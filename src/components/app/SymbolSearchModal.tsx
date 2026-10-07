import React, { useState, useMemo } from 'react';
import { Search, X, TrendingUp, TrendingDown, Check } from 'lucide-react';
import { Instrument } from './AppShell';
import { WATCHLIST_DATA } from '../../data/mockChartData';
import { AssetCategory } from '../../types/trading';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInstrument: Instrument;
  onSelectInstrument: (inst: Instrument) => void;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  selectedInstrument,
  onSelectInstrument,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'ALL' | AssetCategory>('ALL');

  const filteredItems = useMemo(() => {
    return WATCHLIST_DATA.filter((item) => {
      const matchesCategory = category === 'ALL' || item.category === category;
      const matchesQuery =
        item.symbol.toLowerCase().includes(query.toLowerCase()) ||
        item.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#0A0E1A] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[80vh]">
        {/* Header / Search Input */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#060A12]">
          <Search className="size-5 text-[#00E5FF] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol (e.g. BTC, ETH, NQ1!, SOL)..."
            autoFocus
            className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-white p-1"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Categories */}
        <div className="px-4 py-2 border-b border-white/10 bg-[#070B14] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          {(['ALL', 'CRYPTO', 'INDICES', 'COMMODITIES', 'FOREX'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                category === cat
                  ? 'bg-emerald-500/15 text-[#00F090] font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-white/5 p-2 max-h-[400px]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-slate-500">
              No instruments match "{query}"
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = selectedInstrument === item.symbol;
              const isPositive = item.change24h >= 0;

              return (
                <button
                  key={item.symbol}
                  onClick={() => {
                    onSelectInstrument(item.symbol as Instrument);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-[#0E1528] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-sans">{item.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-mono font-bold text-sm text-white">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-xs font-mono font-semibold flex items-center justify-end gap-1 ${
                          isPositive ? 'text-[#00F090]' : 'text-[#FF3B69]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        <span>
                          {isPositive ? '+' : ''}
                          {item.change24h}%
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="size-6 rounded-full bg-emerald-500/20 text-[#00F090] flex items-center justify-center">
                        <Check className="size-3.5" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/10 bg-[#060A12] text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>ALGOFINEX VELA MARKET ROUTER</span>
          <span>SELECT TO SWITCH ACTIVE WORKSPACE FEED</span>
        </div>
      </div>
    </div>
  );
};

export default SymbolSearchModal;
