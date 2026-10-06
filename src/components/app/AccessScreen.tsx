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
    <div data-component="AccessScreen" className="p-6 md:p-10 max-w-[1200px] mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-black/[0.08] pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-brand-blue" />
          <span className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
            Access Pass &amp; Integration
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
          Client Access &amp; License Portal
        </h1>
        <p className="text-xs text-slate-600 max-w-2xl font-sans">
          Manage your TradingView username integration, active access tier licenses, and 3-Day Live Masterclass enrollment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Active License Key Status */}
        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
            <div>
              <div className="text-[10px] font-mono font-semibold uppercase text-brand-blue">License Status</div>
              <h3 className="font-display font-bold text-slate-900 text-base mt-1">All-Access Master Pass</h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              ACTIVE
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Access Key ID:</span>
              <span className="font-bold text-slate-900">AF-8849-VALIDATED</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">TradingView Indicators:</span>
              <span className="font-bold text-emerald-600">UNLOCKED</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">3-Day Live Session:</span>
              <span className="font-bold text-emerald-600">ENROLLED</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[11px] font-mono text-slate-600">
            // PROTOTYPE ASSUMPTION — Simulated access pass state. No real backend billing attached.
          </div>
        </div>

        {/* Card 2: TradingView Username Integration Form */}
        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 space-y-5">
          <div className="border-b border-black/[0.06] pb-4">
            <div className="text-[10px] font-mono font-semibold uppercase text-brand-blue">Script Access</div>
            <h3 className="font-display font-bold text-slate-900 text-base mt-1">TradingView Account Binding</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-slate-700 block">
                TradingView ID / Username:
              </label>
              <input
                type="text"
                value={tradingViewId}
                onChange={(e) => setTradingViewId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-brand-blue"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-brand-blue text-white text-xs font-mono font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSaved ? <CheckCircle2 className="size-4 text-emerald-300" /> : <UserCheck className="size-4" />}
              <span>{isSaved ? 'TradingView ID Saved!' : 'Update TradingView Binding'}</span>
            </button>
          </form>

          <div className="text-[10px] font-mono text-slate-400">
            // PROTOTYPE ASSUMPTION — Client-side form simulation.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessScreen;
