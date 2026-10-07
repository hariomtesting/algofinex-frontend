import React, { useState } from 'react';
import { MOCK_CURRENT_USER } from '../../mock/mockData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';
import { User as UserIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AccountScreen: React.FC = () => {
  const { showToast } = useToast();
  const { theme, setTheme } = useTheme();
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
      <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#4F6BFF]/20 flex items-center justify-between text-xs text-[#17181C]">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-[#4F6BFF]" />
          <span className="font-medium">DEMO ACCOUNT PROFILE — Simulated Preview Environment</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#EAEAE5] pb-5">
        <div className="flex items-center gap-2">
          <UserIcon className="size-5 text-[#4F6BFF]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#17181C]">
            Account &amp; Security Settings
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#666B76] mt-1">
          Trader profile details, two-factor authentication, and telemetry notifications.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
        <h3 className="text-base font-bold text-[#17181C]">Trader Profile</h3>
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
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex items-center justify-between border-b border-[#EAEAE5] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#17181C]">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs sm:text-sm text-[#666B76] mt-0.5">Protect your TradingView script licenses with TOTP authentication.</p>
          </div>
          <Badge variant={twoFactorEnabled ? 'success' : 'neutral'}>
            {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-mono text-[#17181C] font-semibold">Authenticator App (Google / 1Password)</span>
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
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <h3 className="text-base font-bold text-[#17181C] border-b border-[#EAEAE5] pb-4">
          Telemetry &amp; Notification Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAFAF7] cursor-pointer transition-colors border border-transparent hover:border-[#EAEAE5]">
            <div>
              <span className="font-bold text-[#17181C] block text-sm">Critical Indicator Updates</span>
              <span className="text-[#666B76]">Email notices when Pine Script algorithms receive new sensitivity updates.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded accent-[#4F6BFF] size-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAFAF7] cursor-pointer transition-colors border border-transparent hover:border-[#EAEAE5]">
            <div>
              <span className="font-bold text-[#17181C] block text-sm">Masterclass &amp; Session Reminders</span>
              <span className="text-[#666B76]">Calendar invites for live 3-Day Session breakout discussions.</span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded accent-[#4F6BFF] size-4"
            />
          </label>
        </div>
      </div>

      {/* Theme Preferences */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-card">
        <h3 className="text-base font-bold text-[#17181C] border-b border-[#EAEAE5] pb-4">
          Interface Theme Preference
        </h3>
        <p className="text-xs text-[#666B76]">
          Choose your preferred color theme across the marketing site and trading workstation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#161B2E] border-[#4F6BFF] text-[#F3F4F6] ring-2 ring-[#4F6BFF]/30'
                : 'bg-white border-[#EAEAE5] text-[#666B76] hover:border-[#4F6BFF]/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#222738] text-[#F4C95D]">
                <Moon className="size-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#17181C]">Dark Mode</div>
                <div className="text-[11px] text-[#666B76]">Modern obsidian fintech aesthetic</div>
              </div>
            </div>
            {theme === 'dark' && <Badge variant="success" size="sm">Active</Badge>}
          </button>

          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-[#F1F4FF] border-[#4F6BFF] text-[#17181C] ring-2 ring-[#4F6BFF]/30'
                : 'bg-white border-[#EAEAE5] text-[#666B76] hover:border-[#4F6BFF]/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#F4C95D]/20 text-[#D97706]">
                <Sun className="size-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#17181C]">Light Mode</div>
                <div className="text-[11px] text-[#666B76]">Clean, high-contrast off-white surface</div>
              </div>
            </div>
            {theme === 'light' && <Badge variant="success" size="sm">Active</Badge>}
          </button>
        </div>
      </div>

    </div>
  );
};
