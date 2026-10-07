import React, { useState } from 'react';
import { X, Key, AlertCircle } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CLIENT PORTAL PROTOTYPE MODAL
 * Redesigned in LuxAlgo Obsidian Dark aesthetic.
 * Simulates the client login and script access management state.
 */
export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [handle, setHandle] = useState('demo_trader');
  const [verified, setVerified] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-title"
        className="relative w-full max-w-lg rounded-3xl bg-[#0A0E1A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 z-10 text-left my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        {/* Prototype Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-[#00F090] to-[#00E5FF] text-black flex items-center justify-center shadow-[0_0_15px_rgba(0,240,144,0.4)] shrink-0">
            <Key className="size-5 text-black" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider font-semibold block">
              Member Area • Prototype Preview
            </span>
            <h3 id="portal-title" className="text-xl font-display font-bold text-white">
              AlgoFinex Client Portal
            </h3>
          </div>
        </div>

        {/* Prototype Banner */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5 text-xs text-slate-400 font-mono mb-6">
          <AlertCircle className="size-4 text-[#00E5FF] shrink-0 mt-0.5" />
          <span>This portal preview demonstrates script provisioning and cohort calendar access. No live credentials required.</span>
        </div>

        {/* TradingView Provisioning Card */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              TradingView Account Handle
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value);
                  setVerified(false);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#060A12] text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-[#00F090]"
              />
              <button
                type="button"
                onClick={() => setVerified(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[#00F090] text-black hover:brightness-110 transition-colors shadow-[0_0_12px_rgba(0,240,144,0.3)] cursor-pointer"
              >
                Verify Status
              </button>
            </div>
          </div>

          {/* Script Provisioning Status */}
          <div className="p-4 rounded-2xl bg-[#060A12] border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/10">
              <span className="text-slate-400">TradingView Invite-Only Status:</span>
              <span className="text-[#00F090] font-bold flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#00F090] shadow-[0_0_6px_#00F090]" />
                {verified ? 'SYNCHRONIZED' : 'SIMULATED ACTIVE'}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <span>01. AlgoFinex - Market Structure</span>
                <span className="text-[#00E5FF] font-semibold text-[10px]">v4.2 Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <span>02. AlgoFinex - Liquidity Pools</span>
                <span className="text-[#00E5FF] font-semibold text-[10px]">v4.2 Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <span>03. AlgoFinex - Trend Cloud</span>
                <span className="text-[#00E5FF] font-semibold text-[10px]">v4.2 Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <span>04. AlgoFinex - Execution Confluence</span>
                <span className="text-[#00E5FF] font-semibold text-[10px]">v4.2 Active</span>
              </div>
            </div>
          </div>

          {/* 3-Day Cohort Card */}
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs font-mono">
            <span className="text-[#C084FC] font-bold block mb-1">
              Active Cohort Masterclass:
            </span>
            <p className="text-slate-400 mb-2 font-sans text-xs">
              Live link activates 24 hours prior to Day 01 session start. Recordings populate inside this portal immediately post-lab.
            </p>
            <div className="text-[11px] text-purple-300">
              Status: Enrollment Simulation Active (Day 01 – Day 03)
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl font-semibold text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              Close Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientPortalModal;
