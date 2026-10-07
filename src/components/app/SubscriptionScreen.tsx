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
      <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#4F6BFF]/20 flex items-center justify-between text-xs text-[#17181C]">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-[#4F6BFF]" />
          <span className="font-medium">SIMULATED SUBSCRIPTION &amp; BILLING DESK — Public Preview Mode</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#EAEAE5] pb-5">
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-[#4F6BFF]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#17181C]">
            Subscription &amp; Billing Desk
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#666B76] mt-1">
          Review active license billing cycle, payment method, and tax receipts.
        </p>
      </div>

      {/* Active Subscription Overview Card */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAEAE5] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-bold text-[#17181C] capitalize">
                {subscription.plan} AlgoFinex Suite
              </span>
              <Badge variant="success">ACTIVE</Badge>
              {subscription.cancelAtPeriodEnd && (
                <Badge variant="danger">CANCELS AT PERIOD END</Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#666B76] mt-1 font-sans">
              ${subscription.amount}.00 USD billed annually • Active since April 2025
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsUpgradeModalOpen(true)}
            >
              Modify Tier
            </Button>
            {!subscription.cancelAtPeriodEnd && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsCancelModalOpen(true)}
              >
                Cancel Renewal
              </Button>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5]">
            <span className="text-[#666B76] block">Renewal Date</span>
            <span className="text-[#17181C] font-bold mt-1 block">
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5]">
            <span className="text-[#666B76] block">Payment Card</span>
            <span className="text-[#17181C] font-bold mt-1 block">
              Visa ending in •••• {subscription.paymentMethodLast4}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5]">
            <span className="text-[#666B76] block">Included Scripts</span>
            <span className="text-[#059669] font-bold mt-1 block">
              4 Proprietary Algorithms
            </span>
          </div>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <h3 className="text-base font-bold text-[#17181C]">Invoice &amp; Tax Receipts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#EAEAE5] text-[#666B76] font-semibold">
                <th className="py-3 px-3">Invoice ID</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EE]">
              {subscription.invoiceHistory.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#FAFAF7] transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-[#17181C] font-mono">{inv.id}</td>
                  <td className="py-3.5 px-3 text-[#666B76]">{inv.date}</td>
                  <td className="py-3.5 px-3 text-[#17181C] font-bold font-mono">${inv.amount}.00 USD</td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#ECFBF6] text-[#059669] border border-[#35C99A]/30 font-bold">
                      PAID
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => showToast(`Downloaded invoice ${inv.id}`, { type: 'success' })}
                      className="text-[#666B76] hover:text-[#4F6BFF] inline-flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Download className="size-3.5" />
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
        <p className="text-xs text-[#666B76] leading-relaxed mb-6">
          Canceling your renewal will prevent future billing. Your TradingView script invites will remain active until{' '}
          <strong className="text-[#17181C]">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</strong>.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" size="sm" onClick={() => setIsCancelModalOpen(false)}>
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
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                subscription.plan === plan
                  ? 'bg-[#EEF2FF] border-2 border-[#4F6BFF]'
                  : 'bg-[#FAFAF7] border-[#EAEAE5] hover:border-[#D0D4DD]'
              }`}
              onClick={() => handlePlanChange(plan)}
            >
              <div>
                <p className="text-xs capitalize font-bold text-[#17181C]">{plan} Suite</p>
                <p className="text-xs text-[#666B76] mt-0.5">
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
