import React, { useState } from 'react';
import { ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';

export const AccessScreen: React.FC = () => {
  const [tradingViewId, setTradingViewId] = useState('trader_demo_user');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div data-component="AccessScreen" className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none text-left bg-[#FAFAF7] text-[#17181C]">
      {/* Header */}
      <div className="border-b border-[#EAEAE5] pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#35C99A]" />
          <span className="text-xs font-bold uppercase text-[#059669] tracking-wider">
            Access Pass &amp; Integration
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#17181C] tracking-tight">
          Client Access &amp; License Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#666B76] max-w-2xl">
          Manage your TradingView username integration, active access tier licenses, and 3-Day Live Masterclass enrollment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Active License Key Status */}
        <div className="bg-white border border-[#EAEAE5] rounded-3xl p-8 space-y-5 shadow-card">
          <div className="flex items-center justify-between border-b border-[#EAEAE5] pb-4">
            <div>
              <div className="text-[11px] font-semibold uppercase text-[#4F6BFF]">License Status</div>
              <h3 className="font-bold text-[#17181C] text-base mt-1">All-Access Master Pass</h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ECFBF6] text-[#059669] border border-[#35C99A]/30 font-bold">
              ACTIVE
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
              <span className="text-[#666B76]">Access Key ID:</span>
              <span className="font-bold text-[#17181C] font-mono">AF-8849-VALIDATED</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
              <span className="text-[#666B76]">TradingView Indicators:</span>
              <span className="font-bold text-[#059669]">UNLOCKED</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F0F1EE]">
              <span className="text-[#666B76]">3-Day Live Session:</span>
              <span className="font-bold text-[#059669]">ENROLLED</span>
            </div>
          </div>

          <div className="bg-[#FAFAF7] border border-[#EAEAE5] p-4 rounded-2xl text-xs text-[#666B76]">
            Simulated access pass state. Verified deterministic logic.
          </div>
        </div>

        {/* Card 2: TradingView Username Integration Form */}
        <div className="bg-white border border-[#EAEAE5] rounded-3xl p-8 space-y-5 shadow-card">
          <div className="border-b border-[#EAEAE5] pb-4">
            <div className="text-[11px] font-semibold uppercase text-[#4F6BFF]">Script Access</div>
            <h3 className="font-bold text-[#17181C] text-base mt-1">TradingView Account Binding</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#666B76] block">
                TradingView ID / Username:
              </label>
              <input
                type="text"
                value={tradingViewId}
                onChange={(e) => setTradingViewId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#EAEAE5] bg-[#FAFAF7] text-xs font-bold text-[#17181C] focus:bg-white focus:outline-none focus:border-[#4F6BFF] focus:ring-2 focus:ring-[#4F6BFF]/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#4F6BFF] text-white text-xs font-bold hover:bg-[#3d57e0] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {isSaved ? <CheckCircle2 className="size-4 text-white" /> : <UserCheck className="size-4 text-white" />}
              <span>{isSaved ? 'TradingView ID Saved!' : 'Update TradingView Binding'}</span>
            </button>
          </form>

          <div className="text-xs text-[#666B76]">
            Client-side simulation state. Webhook triggers automated invite-only script provisioning.
          </div>
        </div>
      </div>
    </div>
  );
};
