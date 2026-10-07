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
    <div data-component="AccessScreen" className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none text-left text-white">
      {/* Header */}
      <div className="border-b border-white/10 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#00F090]" />
          <span className="text-xs font-mono font-bold uppercase text-[#00F090] tracking-wider">
            Access Pass &amp; Integration
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">
          Client Access &amp; License Portal
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl font-sans">
          Manage your TradingView username integration, active access tier licenses, and 3-Day Live Masterclass enrollment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Active License Key Status */}
        <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-[10px] font-mono font-semibold uppercase text-[#00E5FF]">License Status</div>
              <h3 className="font-display font-bold text-white text-base mt-1">All-Access Master Pass</h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 font-bold">
              ACTIVE
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Access Key ID:</span>
              <span className="font-bold text-white">AF-8849-VALIDATED</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">TradingView Indicators:</span>
              <span className="font-bold text-[#00F090]">UNLOCKED</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">3-Day Live Session:</span>
              <span className="font-bold text-[#00F090]">ENROLLED</span>
            </div>
          </div>

          <div className="bg-[#060A12] border border-white/10 p-3.5 rounded-xl text-[11px] font-mono text-slate-400">
            // LUXALGO VELA ENGINE — Simulated access pass state. Verified deterministic logic.
          </div>
        </div>

        {/* Card 2: TradingView Username Integration Form */}
        <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <div className="text-[10px] font-mono font-semibold uppercase text-[#00E5FF]">Script Access</div>
            <h3 className="font-display font-bold text-white text-base mt-1">TradingView Account Binding</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-300 block">
                TradingView ID / Username:
              </label>
              <input
                type="text"
                value={tradingViewId}
                onChange={(e) => setTradingViewId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#060A12] text-xs font-mono font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00F090] focus:ring-1 focus:ring-[#00F090]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F090] to-[#00E5FF] text-black text-xs font-mono font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,144,0.3)]"
            >
              {isSaved ? <CheckCircle2 className="size-4 text-black" /> : <UserCheck className="size-4 text-black" />}
              <span>{isSaved ? 'TradingView ID Saved!' : 'Update TradingView Binding'}</span>
            </button>
          </form>

          <div className="text-[10px] font-mono text-slate-500">
            // Client-side simulation state. Webhook triggers automated invite-only script provisioning.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessScreen;
