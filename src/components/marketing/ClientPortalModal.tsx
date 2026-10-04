import React, { useState } from 'react';
import { X, Key, AlertCircle } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CLIENT PORTAL PROTOTYPE MODAL
 * Simulates the client login and script access management state.
 * 
 * IMPORTANT:
 * // PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
 * No real authentication or API tokens.
 */
export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [handle, setHandle] = useState('demo_trader');
  const [verified, setVerified] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-title"
        className="relative w-full max-w-lg rounded-3xl bg-white border border-black/[0.09] shadow-2xl p-6 sm:p-8 z-10 text-left my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        {/* Prototype Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="size-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-xs shrink-0">
            <Key className="size-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-brand-blue uppercase tracking-wider font-semibold block">
              Member Area • Prototype Preview
            </span>
            <h3 id="portal-title" className="text-xl font-display font-bold text-slate-900">
              AlgoFinex Client Portal
            </h3>
          </div>
        </div>

        {/* Prototype Banner */}
        <div className="p-3 rounded-xl bg-slate-50 border border-black/[0.06] flex items-start gap-2.5 text-xs text-slate-600 font-mono mb-6">
          <AlertCircle className="size-4 text-brand-blue shrink-0 mt-0.5" />
          <span>This portal preview demonstrates script provisioning and cohort calendar access. No live credentials required.</span>
        </div>

        {/* TradingView Provisioning Card */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
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
                className="flex-1 px-4 py-2.5 rounded-xl border border-black/[0.12] bg-[#F8FAFC] text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
              <button
                type="button"
                onClick={() => setVerified(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-brand-blue text-white hover:bg-blue-800 transition-colors shadow-2xs"
              >
                Verify Status
              </button>
            </div>
          </div>

          {/* Script Provisioning Status */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-black/[0.06] space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-black/[0.06]">
              <span className="text-slate-500">TradingView Invite-Only Status:</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-signal-bull" />
                {verified ? 'SYNCHRONIZED' : 'SIMULATED ACTIVE'}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-700">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/[0.04]">
                <span>01. AlgoFinex - Market Structure</span>
                <span className="text-brand-blue font-semibold text-[10px]">v4.2 Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/[0.04]">
                <span>02. AlgoFinex - Liquidity Pools</span>
                <span className="text-brand-blue font-semibold text-[10px]">v4.2 Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/[0.04]">
                <span>03. AlgoFinex - Trend Cloud</span>
                <span className="text-brand-blue font-semibold text-[10px]">v4.2 Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-black/[0.04]">
                <span>04. AlgoFinex - Execution Confluence</span>
                <span className="text-brand-blue font-semibold text-[10px]">v4.2 Active</span>
              </div>
            </div>
          </div>

          {/* 3-Day Cohort Card */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs font-mono">
            <span className="text-amber-800 font-bold block mb-1">
              October Cohort Masterclass:
            </span>
            <p className="text-slate-600 mb-2 font-sans text-xs">
              Live link activates 24 hours prior to Day 01 session start. Recordings populate inside this portal immediately post-lab.
            </p>
            <div className="text-[11px] text-amber-700">
              Status: Enrollment Simulation Active (Day 01 – Day 03)
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl font-semibold text-xs font-mono text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Close Portal Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalModal;
