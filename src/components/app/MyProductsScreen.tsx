import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../mock/mockData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Layers, 
  Check, 
  Copy, 
  CheckCircle2 
} from 'lucide-react';
import { useToast } from '../ui/Toast';

export const MyProductsScreen: React.FC = () => {
  const { showToast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);

  const handleCopyPineScriptId = (productName: string) => {
    navigator.clipboard?.writeText(`AlgoFinex :: ${productName} (v5)`);
    showToast(`Copied TradingView Script Name for ${productName}`, { type: 'success' });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto text-left space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#20252C] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-[#C8A96B]" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
              Installed Indicator Suite
            </h1>
          </div>
          <p className="text-xs text-[#8B929C] mt-1">
            4 of 4 proprietary algorithms active for your whitelisted TradingView handle.
          </p>
        </div>

        <Badge variant="success">All Scripts Synced (Pine Script v5)</Badge>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Product Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {MOCK_PRODUCTS.map((prod) => {
            const isSelected = selectedProduct.id === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#141820] border-[#C8A96B] shadow-card-hover'
                    : 'bg-[#101318] border-[#20252C] hover:border-[#2E3642]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#C8A96B] font-semibold">
                    {prod.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181E28] text-[#6FAF8A] border border-[#20252C]">
                    ACTIVE
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#F3F4F6] mt-1.5">
                  {prod.name}
                </h3>
                <p className="text-xs text-[#8B929C] mt-1 line-clamp-2">
                  {prod.shortDescription}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#1C2128] flex items-center justify-between text-[11px] font-mono text-[#6B7380]">
                  <span>Version: {prod.version}</span>
                  <span className="text-[#6FAF8A] flex items-center gap-1">
                    <Check className="size-3" /> Zero Repaint
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Selected Product Configuration & Script Whitelist Info */}
        <div className="lg:col-span-7 bg-[#101318] border border-[#20252C] rounded-2xl p-6 space-y-6">
          <div className="border-b border-[#20252C] pb-4">
            <div className="flex items-center justify-between">
              <Badge variant="accent">{selectedProduct.categoryLabel}</Badge>
              <span className="text-xs font-mono text-[#8B929C]">{selectedProduct.version}</span>
            </div>
            <h2 className="text-xl font-bold text-[#F3F4F6] mt-2">
              {selectedProduct.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#8B929C] mt-1.5 leading-relaxed">
              {selectedProduct.fullDescription}
            </p>
          </div>

          {/* Quick Script Actions */}
          <div className="p-4 rounded-xl bg-[#0B0E13] border border-[#20252C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-[#8B929C] block">TradingView Search Name:</span>
              <span className="text-[#F3F4F6] font-semibold">AlgoFinex :: {selectedProduct.name} (v5)</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleCopyPineScriptId(selectedProduct.name)}
              leftIcon={<Copy className="size-3.5" />}
            >
              Copy Script Name
            </Button>
          </div>

          {/* Formula Logic & Rules */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#8B929C] font-semibold mb-2">
              Mathematical Model
            </h4>
            <div className="p-3.5 rounded-xl bg-[#0B0E13] border border-[#20252C] text-xs font-mono text-[#8B929C]">
              "{selectedProduct.formulaLogic}"
            </div>
          </div>

          {/* Key Capabilities */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#8B929C] font-semibold mb-3">
              Configured Parameters &amp; Thresholds
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProduct.keyCapabilities.map((cap, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#141820] border border-[#20252C] text-xs">
                  <div className="font-semibold text-[#F3F4F6] mb-1">{cap.title}</div>
                  <div className="text-[#8B929C] leading-snug">{cap.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TradingView Invitation Instructions */}
          <div className="p-4 rounded-xl bg-[#141820] border border-[#20252C] text-xs text-[#8B929C] space-y-2">
            <h4 className="font-semibold text-[#F3F4F6] flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-[#6FAF8A]" />
              <span>How to load in TradingView:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open TradingView and select your chart.</li>
              <li>Click <strong>Indicators</strong> (top toolbar).</li>
              <li>Navigate to <strong>Invite-Only Scripts</strong> tab.</li>
              <li>Click <strong>AlgoFinex :: {selectedProduct.name}</strong> to apply to chart.</li>
            </ol>
          </div>

        </div>

      </div>

    </div>
  );
};
