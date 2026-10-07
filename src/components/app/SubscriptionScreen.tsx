import React, { useState } from 'react';
import { MOCK_SUBSCRIPTION } from '../../mock/mockData';
import { cancelSubscription, updateSubscriptionPlan } from '../../api/subscriptions';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';
import { CreditCard, Download } from 'lucide-react';
import { SubscriptionPlan } from '../../types/api';

export const SubscriptionScreen: React.FC = () => {
  const { showToast } = useToast();
  const [subscription, setSubscription] = useState(MOCK_SUBSCRIPTION);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleCancelSubscription = async () => {
    setIsActionLoading(true);
    try {
      const res = await cancelSubscription();
      setSubscription({ ...subscription, cancelAtPeriodEnd: true });
      setIsCancelModalOpen(false);
      showToast(res.message, { type: 'info' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handlePlanChange = async (plan: SubscriptionPlan) => {
    setIsActionLoading(true);
    try {
      const updated = await updateSubscriptionPlan(plan);
      setSubscription(updated);
      setIsUpgradeModalOpen(false);
      showToast(`Subscription modified to ${plan.toUpperCase()}`, { type: 'success' });
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1000px] mx-auto text-left space-y-6">
      
      {/* DEMO NOTICE */}
      <div className="p-3 rounded-xl bg-[#101318] border border-[#20252C] flex items-center justify-between text-xs font-mono text-[#8B929C]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#C8A96B]" />
          <span>SIMULATED SUBSCRIPTION &amp; BILLING DESK — Public Preview Mode</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#20252C] pb-5">
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-[#C8A96B]" />
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
            Subscription &amp; Billing Desk
          </h1>
        </div>
        <p className="text-xs text-[#8B929C] mt-1">
          Review active license billing cycle, payment method, and tax receipts.
        </p>
      </div>

      {/* Active Subscription Overview Card */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#20252C] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#F3F4F6] capitalize">
                {subscription.plan} AlgoFinex Suite
              </span>
              <Badge variant="success">ACTIVE</Badge>
              {subscription.cancelAtPeriodEnd && (
                <Badge variant="danger">CANCELS AT PERIOD END</Badge>
              )}
            </div>
            <p className="text-xs text-[#8B929C] mt-1 font-mono">
              ${subscription.amount}.00 USD billed annually • Active since April 2025
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsUpgradeModalOpen(true)}
            >
              Modify Tier
            </Button>
            {!subscription.cancelAtPeriodEnd && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCancelModalOpen(true)}
              >
                Cancel Renewal
              </Button>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#0B0E13] border border-[#20252C]">
            <span className="text-[#8B929C] block">Renewal Date</span>
            <span className="text-[#F3F4F6] font-semibold mt-1 block">
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E13] border border-[#20252C]">
            <span className="text-[#8B929C] block">Payment Card</span>
            <span className="text-[#F3F4F6] font-semibold mt-1 block">
              Visa ending in •••• {subscription.paymentMethodLast4}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B0E13] border border-[#20252C]">
            <span className="text-[#8B929C] block">Included Scripts</span>
            <span className="text-[#6FAF8A] font-semibold mt-1 block">
              4 Proprietary Algorithms
            </span>
          </div>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-semibold text-[#F3F4F6]">Invoice &amp; Tax Receipts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead>
              <tr className="border-b border-[#20252C] text-[#8B929C]">
                <th className="py-2.5 px-3">Invoice ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2128]">
              {subscription.invoiceHistory.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#141820] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#F3F4F6]">{inv.id}</td>
                  <td className="py-3 px-3 text-[#8B929C]">{inv.date}</td>
                  <td className="py-3 px-3 text-[#F3F4F6]">${inv.amount}.00 USD</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#6FAF8A]/10 text-[#6FAF8A] border border-[#6FAF8A]/30">
                      PAID
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showToast(`Downloaded invoice ${inv.id}`, { type: 'success' })}
                      className="text-[#8B929C] hover:text-[#C8A96B] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="size-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancel Automatic Renewal"
        subtitle="You will retain access until the end of your billing cycle."
      >
        <p className="text-xs text-[#8B929C] leading-relaxed mb-6">
          Canceling your renewal will prevent future billing. Your TradingView script invites will remain active until{' '}
          <strong className="text-[#F3F4F6]">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</strong>.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" size="sm" onClick={() => setIsCancelModalOpen(false)}>
            Keep Subscription
          </Button>
          <Button
            variant="danger"
            size="sm"
            isLoading={isActionLoading}
            onClick={handleCancelSubscription}
          >
            Confirm Cancellation
          </Button>
        </div>
      </Modal>

      {/* Upgrade / Modify Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Modify Subscription Tier"
      >
        <div className="space-y-3">
          {(['monthly', 'annual', 'lifetime'] as SubscriptionPlan[]).map((plan) => (
            <div
              key={plan}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                subscription.plan === plan
                  ? 'bg-[#141820] border-[#C8A96B]'
                  : 'bg-[#0B0E13] border-[#20252C] hover:border-[#2E3642]'
              }`}
              onClick={() => handlePlanChange(plan)}
            >
              <div>
                <p className="text-xs font-mono capitalize font-bold text-[#F3F4F6]">{plan} Suite</p>
                <p className="text-[11px] text-[#8B929C]">
                  {plan === 'monthly' ? '$79/month' : plan === 'annual' ? '$708/year ($59/mo)' : '$1,490 one-time'}
                </p>
              </div>
              <Badge variant={subscription.plan === plan ? 'accent' : 'neutral'}>
                {subscription.plan === plan ? 'CURRENT' : 'SELECT'}
              </Badge>
            </div>
          ))}
        </div>
      </Modal>

    </div>
  );
};
