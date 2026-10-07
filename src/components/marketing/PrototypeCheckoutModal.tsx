import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, AlertCircle, Lock } from 'lucide-react';

// PROTOTYPE DATA — REPLACE BEFORE PRODUCTION
export interface PlanDetails {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  badge?: string;
}

interface PrototypeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanDetails | null;
}

export const PrototypeCheckoutModal: React.FC<PrototypeCheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  const [tradingViewUser, setTradingViewUser] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !plan) return null;

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setTradingViewUser('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={resetAndClose}
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-xl rounded-3xl bg-[#0A0E1A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 z-10 text-left my-8"
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Prototype Notice Banner */}
            <div className="mb-6 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-cyan-400 font-mono">
              <AlertCircle className="size-4 shrink-0 mt-0.5 text-cyan-400" />
              <div>
                <strong className="block font-semibold">PROTOTYPE CHECKOUT SIMULATION</strong>
                <span className="text-slate-400">No real payment will be collected or credit card processed. This modal validates the frontend enrollment journey.</span>
              </div>
            </div>

            {/* Selected Plan Header */}
            <div className="border-b border-white/10 pb-5 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>Selected Plan</span>
                {plan.badge && (
                  <span className="text-[10px] font-bold text-[#00F090] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {plan.badge}
                  </span>
                )}
              </div>
              <h3 id="modal-title" className="text-2xl font-display font-bold text-white">
                {plan.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-display font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  / {plan.billingPeriod} (PROTOTYPE)
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                {plan.description}
              </p>
            </div>

            {/* Plan Features Preview */}
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                Access Included:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[#00F090] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Checkout Form */}
            <form onSubmit={handleSimulate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  TradingView Username <span className="text-slate-500 font-normal">(for invite-only scripts)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DemoTrader"
                  value={tradingViewUser}
                  onChange={(e) => setTradingViewUser(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060A12] text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-[#00F090]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-slate-500 font-normal">(for cohort schedule &amp; guide)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="demo@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060A12] text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-[#00F090]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-black bg-gradient-to-r from-[#00F090] to-[#00E5FF] hover:brightness-110 transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,144,0.3)] hover:shadow-[0_0_30px_rgba(0,240,144,0.5)] active:scale-[0.99] cursor-pointer"
                >
                  <Lock className="size-4" />
                  <span>Simulate Prototype Enrollment</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 text-center">
                <ShieldCheck className="size-3.5 text-[#00F090]" />
                <span>Simulated Sandbox Environment • No payment credentials stored</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-4 text-center">
            <div className="size-14 rounded-full bg-emerald-500/10 text-[#00F090] border border-emerald-500/30 mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,240,144,0.3)]">
              <CheckCircle2 className="size-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-wider text-[#00F090] font-bold block mb-1">
              Simulation Complete
            </span>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Prototype Access Granted
            </h3>

            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              In production, an automated TradingView invite-only authorization webhook would grant access to account <strong className="text-white font-mono">@{tradingViewUser || 'trader'}</strong>, and a calendar invite would be dispatched to <strong className="text-white font-mono">{email || 'your email'}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-[#060A12] border border-white/10 text-xs font-mono text-slate-300 text-left mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Simulated Tier:</span>
                <span className="font-semibold text-white">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Username:</span>
                <span className="font-semibold text-[#00E5FF]">@{tradingViewUser || 'demo'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-[#00F090] font-semibold">Simulated Active</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="py-3 px-8 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors text-sm cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrototypeCheckoutModal;
