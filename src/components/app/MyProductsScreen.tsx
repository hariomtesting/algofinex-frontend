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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAEAE5] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="size-5 text-[#4F6BFF]" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#17181C]">
              Installed Indicator Suite
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#666B76] mt-1">
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
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EEF2FF] border-2 border-[#4F6BFF] shadow-xs'
                    : 'bg-white border-[#EAEAE5] hover:border-[#D0D4DD] shadow-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-[#4F6BFF]">
                    {prod.categoryLabel}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFBF6] text-[#059669] border border-[#35C99A]/30">
                    ACTIVE
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#17181C] mt-2">
                  {prod.name}
                </h3>
                <p className="text-xs text-[#666B76] mt-1 line-clamp-2 leading-relaxed">
                  {prod.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-[#F0F1EE] flex items-center justify-between text-xs text-[#666B76]">
                  <span>Version: {prod.version}</span>
                  <span className="text-[#059669] font-medium flex items-center gap-1">
                    <Check className="size-3.5 text-[#35C99A]" /> Zero Repaint
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Selected Product Configuration & Script Whitelist Info */}
        <div className="lg:col-span-7 bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
          <div className="border-b border-[#EAEAE5] pb-5">
            <div className="flex items-center justify-between">
              <Badge variant="accent">{selectedProduct.categoryLabel}</Badge>
              <span className="text-xs text-[#666B76] font-mono">{selectedProduct.version}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#17181C] mt-2">
              {selectedProduct.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#666B76] mt-2 leading-relaxed">
              {selectedProduct.fullDescription}
            </p>
          </div>

          {/* Quick Script Actions */}
          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-[#666B76] block font-sans text-xs">TradingView Search Name:</span>
              <span className="text-[#17181C] font-bold">AlgoFinex :: {selectedProduct.name} (v5)</span>
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
            <h4 className="text-xs font-semibold uppercase text-[#666B76] mb-2">
              Mathematical Model
            </h4>
            <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] text-xs text-[#17181C] italic leading-relaxed">
              "{selectedProduct.formulaLogic}"
            </div>
          </div>

          {/* Key Capabilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-[#666B76] mb-3">
              Configured Parameters &amp; Thresholds
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProduct.keyCapabilities.map((cap, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#EAEAE5] text-xs shadow-xs">
                  <div className="font-bold text-[#17181C] mb-1">{cap.title}</div>
                  <div className="text-[#666B76] leading-relaxed">{cap.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TradingView Invitation Instructions */}
          <div className="p-5 rounded-2xl bg-[#EEF2FF] border border-[#4F6BFF]/20 text-xs text-[#17181C] space-y-2">
            <h4 className="font-bold text-[#17181C] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#4F6BFF]" />
              <span>How to load in TradingView:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-[#666B76]">
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
