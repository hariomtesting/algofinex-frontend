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
      <div className="p-8 text-center text-xs font-mono text-[#8B929C]">
        Loading partner analytics desk...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto text-left space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#20252C] pb-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-[#C8A96B]" />
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
            Partner &amp; Referral Desk
          </h1>
        </div>
        <p className="text-xs text-[#8B929C] mt-1">
          25% recurring monthly and annual commission on all active subscribers.
        </p>
      </div>

      {/* DEMO NOTICE */}
      <div className="p-3 rounded-xl bg-[#101318] border border-[#20252C] flex items-center justify-between text-xs font-mono text-[#8B929C]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#C8A96B]" />
          <span>SIMULATED PARTNER ANALYTICS — Public Preview Mode</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase text-[#8B929C]">Referred Accounts</span>
          <p className="text-xl font-mono font-bold text-[#F3F4F6] mt-1">{stats.totalReferred}</p>
          <span className="text-[11px] font-mono text-[#6FAF8A]">{stats.activeSubscribers} Active</span>
        </div>

        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase text-[#8B929C]">Commission Rate</span>
          <p className="text-xl font-mono font-bold text-[#C8A96B] mt-1">{stats.commissionRate}%</p>
          <span className="text-[11px] font-mono text-[#8B929C]">Lifetime Recurring</span>
        </div>

        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase text-[#8B929C]">Pending Payout</span>
          <p className="text-xl font-mono font-bold text-[#6FAF8A] mt-1">${stats.pendingPayout}.00</p>
          <span className="text-[11px] font-mono text-[#8B929C]">Eligible for withdrawal</span>
        </div>

        <div className="bg-[#101318] border border-[#20252C] rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase text-[#8B929C]">Total Revenue Earned</span>
          <p className="text-xl font-mono font-bold text-[#F3F4F6] mt-1">${stats.totalEarned}.00</p>
          <span className="text-[11px] font-mono text-[#8B929C]">${stats.paidPayout} Disbursed</span>
        </div>
      </div>

      {/* Referral Link & Code Bar */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[#F3F4F6]">
              Your Dedicated Referral Link
            </h3>
            <p className="text-xs text-[#8B929C] mt-0.5">
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
          <div className="md:col-span-8 flex items-center justify-between p-3 rounded-xl bg-[#0B0E13] border border-[#20252C] font-mono text-xs">
            <span className="text-[#F3F4F6] truncate mr-2">{stats.referralLink}</span>
            <button
              onClick={handleCopyLink}
              className="text-[#8B929C] hover:text-[#C8A96B] flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Copy className="size-3.5" />
              <span>Copy Link</span>
            </button>
          </div>

          <div className="md:col-span-4 flex items-center justify-between p-3 rounded-xl bg-[#0B0E13] border border-[#20252C] font-mono text-xs">
            <div>
              <span className="text-[#8B929C] mr-2">Code:</span>
              <span className="text-[#C8A96B] font-bold">{stats.referralCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-[#8B929C] hover:text-[#C8A96B] flex items-center gap-1 cursor-pointer"
            >
              <Copy className="size-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Referral History Table */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-[#F3F4F6]">Attribution &amp; Commission History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead>
              <tr className="border-b border-[#20252C] text-[#8B929C]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Referred User</th>
                <th className="py-2.5 px-3">Subscribed Plan</th>
                <th className="py-2.5 px-3">Plan Amount</th>
                <th className="py-2.5 px-3">Commission (25%)</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2128]">
              {stats.history.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#141820] transition-colors">
                  <td className="py-3 px-3 text-[#8B929C]">{tx.date}</td>
                  <td className="py-3 px-3 font-semibold text-[#F3F4F6]">{tx.referredUser}</td>
                  <td className="py-3 px-3 text-[#8B929C]">{tx.plan}</td>
                  <td className="py-3 px-3 text-[#F3F4F6]">${tx.amount}.00</td>
                  <td className="py-3 px-3 text-[#6FAF8A] font-semibold">${tx.commission.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border ${
                        tx.status === 'paid'
                          ? 'bg-[#6FAF8A]/10 text-[#6FAF8A] border-[#6FAF8A]/30'
                          : 'bg-[#C8A96B]/10 text-[#C8A96B] border-[#C8A96B]/30'
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
            <label className="text-xs font-mono uppercase text-[#8B929C] block mb-1">
              Payout Amount (USD)
            </label>
            <input
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              className="w-full bg-[#0B0E13] text-[#F3F4F6] border border-[#20252C] rounded-lg p-2.5 font-mono text-sm"
            />
            <p className="text-[11px] text-[#6B7380] mt-1">
              Minimum payout threshold: $100.00 USD. Current balance: ${stats.pendingPayout}.00.
            </p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-[#8B929C] block mb-1">
              Receiving Address / Bank Info
            </label>
            <input
              type="text"
              defaultValue="0x71C...b9F1 (USDT ERC-20)"
              className="w-full bg-[#0B0E13] text-[#F3F4F6] border border-[#20252C] rounded-lg p-2.5 font-mono text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsPayoutModalOpen(false)}>
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
