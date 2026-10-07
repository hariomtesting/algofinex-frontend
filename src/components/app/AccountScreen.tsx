import React, { useState } from 'react';
import { MOCK_CURRENT_USER } from '../../mock/mockData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';
import { User as UserIcon } from 'lucide-react';

export const AccountScreen: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState(MOCK_CURRENT_USER.name);
  const [email, setEmail] = useState(MOCK_CURRENT_USER.email);
  const [tradingViewHandle, setTradingViewHandle] = useState(MOCK_CURRENT_USER.tradingViewHandle);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Profile security settings updated successfully.', { type: 'success' });
    }, 500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[900px] mx-auto text-left space-y-6">
      
      {/* DEMO NOTICE */}
      <div className="p-3 rounded-xl bg-[#101318] border border-[#20252C] flex items-center justify-between text-xs font-mono text-[#8B929C]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#C8A96B]" />
          <span>DEMO ACCOUNT PROFILE — Simulated Preview Environment</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#20252C] pb-5">
        <div className="flex items-center gap-2">
          <UserIcon className="size-5 text-[#C8A96B]" />
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
            Account &amp; Security Settings
          </h1>
        </div>
        <p className="text-xs text-[#8B929C] mt-1">
          Trader profile details, two-factor authentication, and telemetry notifications.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 space-y-6">
        <h3 className="text-sm font-semibold text-[#F3F4F6]">Trader Profile</h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Input
            label="TradingView Username"
            value={tradingViewHandle}
            onChange={(e) => setTradingViewHandle(e.target.value)}
            helperText="Synced with automated invite-only Pine Script whitelisting."
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSaving}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Security & 2FA */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-[#20252C] pb-3">
          <div>
            <h3 className="text-sm font-semibold text-[#F3F4F6]">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs text-[#8B929C] mt-0.5">Protect your TradingView script licenses with TOTP authentication.</p>
          </div>
          <Badge variant={twoFactorEnabled ? 'success' : 'neutral'}>
            {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-[#F3F4F6]">Authenticator App (Google / 1Password)</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setTwoFactorEnabled(!twoFactorEnabled);
              showToast(twoFactorEnabled ? '2FA disabled' : '2FA activated', { type: 'info' });
            }}
          >
            {twoFactorEnabled ? 'Configure / Re-sync' : 'Enable 2FA'}
          </Button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 space-y-4">
        <h3 className="text-sm font-semibold text-[#F3F4F6] border-b border-[#20252C] pb-3">
          Telemetry &amp; Notification Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-2 rounded-lg hover:bg-[#141820] cursor-pointer transition-colors">
            <div>
              <span className="font-semibold text-[#F3F4F6] block">Critical Indicator Updates</span>
              <span className="text-[#8B929C]">Email notices when Pine Script algorithms receive new sensitivity updates.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded accent-[#C8A96B] size-4"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg hover:bg-[#141820] cursor-pointer transition-colors">
            <div>
              <span className="font-semibold text-[#F3F4F6] block">Masterclass &amp; Session Reminders</span>
              <span className="text-[#8B929C]">Calendar invites for live 3-Day Session breakout discussions.</span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded accent-[#C8A96B] size-4"
            />
          </label>
        </div>
      </div>

    </div>
  );
};
