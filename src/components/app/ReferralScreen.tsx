import React, { useState, useEffect } from 'react';
import { getReferralStats, requestPayout } from '../../api/referrals';
import { ReferralData } from '../../types/api';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';
import { Users, Copy } from 'lucide-react';

export const ReferralScreen: React.FC = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('354');
  const [isPayoutLoading, setIsPayoutLoading] = useState(false);

  useEffect(() => {
    getReferralStats()
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleCopyLink = () => {
    if (!stats) return;
    navigator.clipboard?.writeText(stats.referralLink);
    showToast('Referral link copied to clipboard!', { type: 'success' });
  };

  const handleCopyCode = () => {
    if (!stats) return;
    navigator.clipboard?.writeText(stats.referralCode);
    showToast('Referral code copied to clipboard!', { type: 'success' });
  };

  const handlePayoutSubmit = async () => {
    setIsPayoutLoading(true);
    try {
      const res = await requestPayout(Number(payoutAmount));
      showToast(res.message, { type: 'success' });
      setIsPayoutModalOpen(false);
      if (stats) {
        setStats({
          ...stats,
          pendingPayout: Math.max(0, stats.pendingPayout - Number(payoutAmount)),
          paidPayout: stats.paidPayout + Number(payoutAmount),
        });
      }
    } catch (err: any) {
      showToast(err?.message || 'Payout request failed.', { type: 'error' });
    } finally {
      setIsPayoutLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="p-8 text-center text-xs font-mono text-[#666B76]">
        Loading partner analytics desk...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto text-left space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#EAEAE5] pb-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-[#35C99A]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#17181C]">
            Partner &amp; Referral Desk
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#666B76] mt-1">
          25% recurring monthly and annual commission on all active subscribers.
        </p>
      </div>

      {/* DEMO NOTICE */}
      <div className="p-4 rounded-2xl bg-[#ECFBF6] border border-[#35C99A]/20 flex items-center justify-between text-xs text-[#059669]">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-[#35C99A]" />
          <span className="font-medium">SIMULATED PARTNER ANALYTICS — Public Preview Mode</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 shadow-card">
          <span className="text-[11px] font-semibold uppercase text-[#666B76]">Referred Accounts</span>
          <p className="text-2xl font-bold font-mono text-[#17181C] mt-2">{stats.totalReferred}</p>
          <span className="text-xs text-[#059669] font-medium mt-1 block">{stats.activeSubscribers} Active</span>
        </div>

        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 shadow-card">
          <span className="text-[11px] font-semibold uppercase text-[#666B76]">Commission Rate</span>
          <p className="text-2xl font-bold font-mono text-[#4F6BFF] mt-2">{stats.commissionRate}%</p>
          <span className="text-xs text-[#666B76] mt-1 block">Lifetime Recurring</span>
        </div>

        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 shadow-card">
          <span className="text-[11px] font-semibold uppercase text-[#666B76]">Pending Payout</span>
          <p className="text-2xl font-bold font-mono text-[#059669] mt-2">${stats.pendingPayout}.00</p>
          <span className="text-xs text-[#666B76] mt-1 block">Eligible for withdrawal</span>
        </div>

        <div className="bg-white border border-[#EAEAE5] rounded-2xl p-5 shadow-card">
          <span className="text-[11px] font-semibold uppercase text-[#666B76]">Total Revenue Earned</span>
          <p className="text-2xl font-bold font-mono text-[#17181C] mt-2">${stats.totalEarned}.00</p>
          <span className="text-xs text-[#666B76] mt-1 block">${stats.paidPayout} Disbursed</span>
        </div>
      </div>

      {/* Referral Link & Code Bar */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#17181C]">
              Your Dedicated Referral Link
            </h3>
            <p className="text-xs sm:text-sm text-[#666B76] mt-0.5">
              Visitors are tracked via 60-day browser cookies.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPayoutModalOpen(true)}
            disabled={stats.pendingPayout < stats.minimumPayoutThreshold}
          >
            Request Payout (${stats.pendingPayout})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-8 flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] text-xs font-mono">
            <span className="text-[#17181C] font-semibold truncate mr-2">{stats.referralLink}</span>
            <button
              onClick={handleCopyLink}
              className="text-[#666B76] hover:text-[#4F6BFF] flex items-center gap-1.5 shrink-0 cursor-pointer font-sans font-medium"
            >
              <Copy className="size-3.5" />
              <span>Copy Link</span>
            </button>
          </div>

          <div className="md:col-span-4 flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] text-xs font-mono">
            <div>
              <span className="text-[#666B76] mr-2">Code:</span>
              <span className="text-[#4F6BFF] font-bold">{stats.referralCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-[#666B76] hover:text-[#4F6BFF] flex items-center gap-1.5 cursor-pointer font-sans font-medium"
            >
              <Copy className="size-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Referral History Table */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <h3 className="text-base font-bold text-[#17181C]">Attribution &amp; Commission History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#EAEAE5] text-[#666B76] font-semibold">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Referred User</th>
                <th className="py-3 px-3">Subscribed Plan</th>
                <th className="py-3 px-3">Plan Amount</th>
                <th className="py-3 px-3">Commission (25%)</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EE]">
              {stats.history.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#FAFAF7] transition-colors">
                  <td className="py-3.5 px-3 text-[#666B76]">{tx.date}</td>
                  <td className="py-3.5 px-3 font-semibold text-[#17181C]">{tx.referredUser}</td>
                  <td className="py-3.5 px-3 text-[#666B76]">{tx.plan}</td>
                  <td className="py-3.5 px-3 text-[#17181C] font-mono">${tx.amount}.00</td>
                  <td className="py-3.5 px-3 text-[#059669] font-bold font-mono">${tx.commission.toFixed(2)}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        tx.status === 'paid'
                          ? 'bg-[#ECFBF6] text-[#059669] border-[#35C99A]/30'
                          : 'bg-[#EEF2FF] text-[#4F6BFF] border-[#4F6BFF]/30'
                      }`}
                    >
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      <Modal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        title="Request Commission Payout"
        subtitle="Disbursements are processed via USDT (TRC-20/ERC-20) or Wire."
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-[#666B76] block mb-1">
              Payout Amount (USD)
            </label>
            <input
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              className="w-full bg-[#FAFAF7] text-[#17181C] border border-[#EAEAE5] rounded-xl p-3 font-mono text-sm focus:bg-white focus:outline-none focus:border-[#4F6BFF]"
            />
            <p className="text-xs text-[#666B76] mt-1.5">
              Minimum payout threshold: $100.00 USD. Current balance: ${stats.pendingPayout}.00.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-[#666B76] block mb-1">
              Receiving Address / Bank Info
            </label>
            <input
              type="text"
              defaultValue="0x71C...b9F1 (USDT ERC-20)"
              className="w-full bg-[#FAFAF7] text-[#17181C] border border-[#EAEAE5] rounded-xl p-3 font-mono text-xs focus:bg-white focus:outline-none focus:border-[#4F6BFF]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <Button variant="secondary" size="sm" onClick={() => setIsPayoutModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isPayoutLoading}
              onClick={handlePayoutSubmit}
            >
              Confirm Withdrawal
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
