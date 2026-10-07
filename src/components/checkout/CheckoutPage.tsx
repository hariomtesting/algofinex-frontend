import React, { useState } from 'react';
import { SubscriptionPlan } from '../../types/api';
import { createPaymentIntent, processPayment } from '../../api/payments';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Download,
  ChevronRight
} from 'lucide-react';

interface CheckoutPageProps {
  initialPlan?: SubscriptionPlan;
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  initialPlan = 'annual',
  onNavigate,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(initialPlan);
  const [email, setEmail] = useState('trader@desk.com');
  const [tradingViewHandle, setTradingViewHandle] = useState('Marcus_MacroFlow');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');

  // Checkout Asynchronous Status
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'succeeded' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<{ id: string; amount: number; plan: string } | null>(null);
  const [simulateDecline, setSimulateDecline] = useState(false);

  const planDetails = {
    monthly: { name: 'Monthly Suite', price: 79, recurring: 'Billed monthly' },
    annual: { name: 'Annual Suite (Recommended)', price: 708, recurring: 'Billed annually ($59/mo)' },
    lifetime: { name: 'Lifetime Founder', price: 1490, recurring: 'One-time investment' },
  };

  const current = planDetails[selectedPlan];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setCheckoutState('processing');

    try {
      const intent = await createPaymentIntent({
        plan: selectedPlan,
        email,
        tradingViewHandle,
        paymentMethod,
      });

      const confirmation = await processPayment(intent.paymentId, simulateDecline);
      setReceiptData({
        id: confirmation.paymentId,
        amount: current.price,
        plan: current.name,
      });
      setCheckoutState('succeeded');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Transaction could not be completed.');
      setCheckoutState('failed');
    }
  };

  if (checkoutState === 'succeeded' && receiptData) {
    return (
      <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-8 shadow-workstation text-left">
          <div className="size-12 rounded-xl bg-[#6FAF8A]/15 border border-[#6FAF8A]/30 flex items-center justify-center mb-4">
            <CheckCircle2 className="size-6 text-[#6FAF8A]" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
            Payment Confirmed
          </h2>
          <p className="text-xs text-[#8B929C] mt-1">
            Receipt ID: <span className="font-mono text-[#F3F4F6]">{receiptData.id}</span>
          </p>

          <div className="mt-6 p-4 rounded-xl bg-[#0B0E13] border border-[#20252C] space-y-2.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#8B929C]">Plan:</span>
              <span className="text-[#F3F4F6]">{receiptData.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8B929C]">Amount Charged:</span>
              <span className="text-[#6FAF8A] font-semibold">${receiptData.amount}.00 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8B929C]">TradingView Whitelist:</span>
              <span className="text-[#C8A96B]">Queued for @{tradingViewHandle}</span>
            </div>
          </div>

          <div className="mt-6 text-xs text-[#8B929C] leading-relaxed">
            Your TradingView account is being whitelisted for all 4 suite indicators. Please open your trading workstation to review your license state.
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => onNavigate('/app')}
              rightIcon={<ChevronRight className="size-4" />}
            >
              Open Workstation Terminal
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.print()}
              leftIcon={<Download className="size-4" />}
            >
              Invoice
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Back */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8B929C] mb-6">
          <button
            onClick={() => onNavigate('/pricing')}
            className="flex items-center gap-1 hover:text-[#F3F4F6] transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Pricing</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] tracking-tight text-left mb-8">
          Complete Your Subscription
        </h1>

        {/* Failed Error Banner with Retry */}
        {checkoutState === 'failed' && (
          <div className="mb-6 p-4 rounded-xl bg-[#C87878]/10 border border-[#C87878]/30 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C87878]">
              <AlertCircle className="size-4 shrink-0" />
              <span>Checkout Failed: {errorMessage}</span>
            </div>
            <p className="text-xs text-[#8B929C] mt-1">
              Please verify your payment credentials or select an alternative payment method.
            </p>
            <div className="mt-3">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setCheckoutState('idle')}
              >
                Retry Transaction
              </Button>
            </div>
          </div>
        )}

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-8">
            
            {/* Step 1: Select Plan */}
            <div>
              <label className="text-xs font-mono uppercase text-[#8B929C] block mb-3 font-semibold">
                1. Select Billing Tier
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['monthly', 'annual', 'lifetime'] as SubscriptionPlan[]).map((p) => {
                  const isSelected = selectedPlan === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPlan(p)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#141820] border-[#C8A96B] text-[#F3F4F6]'
                          : 'bg-[#0B0E13] border-[#20252C] text-[#8B929C] hover:border-[#2E3642]'
                      }`}
                    >
                      <p className="text-xs font-mono capitalize">{p}</p>
                      <p className="text-sm font-bold font-mono text-[#F3F4F6] mt-0.5">
                        ${planDetails[p].price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Client & TradingView Handle */}
            <div className="mt-8 space-y-4">
              <label className="text-xs font-mono uppercase text-[#8B929C] block font-semibold">
                2. Client Credentials
              </label>
              <Input
                label="Account Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="TradingView Username"
                required
                placeholder="e.g. SatoshiQuant"
                helperText="Algorithms will be granted directly to this handle within minutes."
                value={tradingViewHandle}
                onChange={(e) => setTradingViewHandle(e.target.value)}
              />
            </div>

            {/* Step 3: Payment Method */}
            <div className="mt-8 space-y-4">
              <label className="text-xs font-mono uppercase text-[#8B929C] block font-semibold">
                3. Payment Method
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#141820] border-[#C8A96B] text-[#F3F4F6]'
                      : 'bg-[#0B0E13] border-[#20252C] text-[#8B929C]'
                  }`}
                >
                  <CreditCard className="size-4" />
                  <span className="text-xs font-mono">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-[#141820] border-[#C8A96B] text-[#F3F4F6]'
                      : 'bg-[#0B0E13] border-[#20252C] text-[#8B929C]'
                  }`}
                >
                  <Lock className="size-4" />
                  <span className="text-xs font-mono">USDT / USDC</span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3 pt-2">
                  <Input
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    leftIcon={<CreditCard className="size-4" />}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Expiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                    <Input
                      label="CVC"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#0B0E13] border border-[#20252C] text-xs font-mono text-[#8B929C] space-y-2">
                  <p>Deposit Network: <strong>Ethereum (ERC-20) / TRON (TRC-20)</strong></p>
                  <p className="text-[11px] text-[#C8A96B]">A dynamic deposit address will be generated upon confirmation.</p>
                </div>
              )}
            </div>

            {/* Test Simulation Controls */}
            <div className="mt-6 pt-4 border-t border-[#20252C] flex items-center justify-between text-[11px] font-mono text-[#8B929C]">
              <span>QA State Simulation:</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateDecline}
                  onChange={(e) => setSimulateDecline(e.target.checked)}
                  className="rounded accent-[#C87878] size-3"
                />
                <span>Simulate Decline Error</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={checkoutState === 'processing'}
                onClick={handleCheckoutSubmit}
              >
                Pay ${current.price}.00 USD
              </Button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#101318] border border-[#20252C] rounded-2xl p-6 h-fit">
            <h3 className="text-sm font-semibold text-[#F3F4F6] pb-3 border-b border-[#20252C]">
              Order Summary
            </h3>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8B929C]">{current.name}</span>
                <span className="font-mono text-[#F3F4F6]">${current.price}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B929C]">Pine Script Whitelist Engine</span>
                <span className="font-mono text-[#6FAF8A]">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B929C]">3-Day Masterclass Seat</span>
                <span className="font-mono text-[#6FAF8A]">INCLUDED</span>
              </div>
              <div className="pt-3 border-t border-[#20252C] flex justify-between text-sm font-bold">
                <span className="text-[#F3F4F6]">Total Due</span>
                <span className="font-mono text-[#C8A96B]">${current.price}.00 USD</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#0B0E13] border border-[#20252C] text-xs text-[#8B929C] space-y-2">
              <div className="flex items-center gap-2 text-[#6FAF8A]">
                <ShieldCheck className="size-4 shrink-0" />
                <span className="font-semibold">14-Day Money Back Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Cancel anytime directly from your dashboard. No contract lock-in or cancellation penalties.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
