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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-[#EAEAE5] rounded-3xl shadow-card overflow-hidden text-[#17181C] flex flex-col max-h-[80vh]">
        {/* Header / Search Input */}
        <div className="p-4 border-b border-[#EAEAE5] flex items-center gap-3 bg-[#FAFAF7]">
          <Search className="size-5 text-[#4F6BFF] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol (e.g. BTC, ETH, NQ1!, SOL)..."
            autoFocus
            className="w-full bg-transparent text-sm font-medium text-[#17181C] placeholder:text-[#9CA3AF] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#666B76] hover:text-[#17181C] p-1 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 bg-white border border-[#EAEAE5] rounded-xl text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer font-medium shadow-xs"
          >
            ESC
          </button>
        </div>

        {/* Filter Categories */}
        <div className="px-4 py-2.5 border-b border-[#EAEAE5] bg-white flex items-center gap-1.5 overflow-x-auto text-xs">
          {(['ALL', 'CRYPTO', 'INDICES', 'COMMODITIES', 'FOREX'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-xl transition-colors cursor-pointer font-medium ${
                category === cat
                  ? 'bg-[#EEF2FF] text-[#4F6BFF] font-bold border border-[#4F6BFF]/20 shadow-xs'
                  : 'text-[#666B76] hover:text-[#17181C] hover:bg-[#FAFAF7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#F0F1EE] p-2 max-h-[400px]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#666B76]">
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
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-[#EEF2FF] border border-[#4F6BFF]/30'
                      : 'hover:bg-[#FAFAF7] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] flex items-center justify-center font-mono font-bold text-xs text-[#17181C]">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#17181C] group-hover:text-[#4F6BFF] transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#EAEAE5] text-[#666B76]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#666B76]">{item.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-mono font-bold text-sm text-[#17181C]">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-xs font-mono font-semibold flex items-center justify-end gap-1 ${
                          isPositive ? 'text-[#059669]' : 'text-[#FF6B6B]'
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
                      <div className="size-6 rounded-full bg-[#4F6BFF] text-white flex items-center justify-center shadow-xs">
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
        <div className="p-3.5 border-t border-[#EAEAE5] bg-[#FAFAF7] text-[11px] font-medium text-[#666B76] flex items-center justify-between">
          <span>ALGOFINEX MARKET ROUTER</span>
          <span>SELECT TO SWITCH ACTIVE WORKSPACE FEED</span>
        </div>
      </div>
    </div>
  );
};

export default SymbolSearchModal;
