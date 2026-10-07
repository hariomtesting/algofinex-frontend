import React, { useState } from 'react';
import { MOCK_CURRENT_USER } from '../../mock/mockData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';
import { 
  ShieldCheck, 
  Copy, 
  Bell
} from 'lucide-react';

export const ActiveAccessScreen: React.FC = () => {
  const { showToast } = useToast();
  const [handle, setHandle] = useState(MOCK_CURRENT_USER.tradingViewHandle);
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const licenseKey = 'AF-DEMO-00000-PREVIEW';
  const webhookUrl = 'https://api.algofinex.com/v1/webhooks/alerts/demo_user_preview';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`Copied ${label} to clipboard`, { type: 'success' });
  };

  const handleSaveHandle = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsEditing(false);
      showToast('TradingView handle updated and whitelisting queued.', { type: 'success' });
    }, 700);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1000px] mx-auto text-left space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#EAEAE5] pb-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-[#35C99A]" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#17181C]">
            Active Script Access &amp; License Provisioning
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#666B76] mt-1">
          Manage your TradingView account handle and webhook alert integrations.
        </p>
      </div>

      {/* Main License Card */}
      <div className="bg-white border border-[#EAEAE5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
        
        {/* TradingView Handle Binding */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase text-[#666B76]">
              TradingView Username Binding
            </span>
            <Badge variant="success">WHITELISTED</Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full">
              <Input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                disabled={!isEditing}
                placeholder="TradingView username"
              />
            </div>
            {isEditing ? (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isSyncing}
                  onClick={handleSaveHandle}
                >
                  Save &amp; Sync
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto"
              >
                Change Handle
              </Button>
            )}
          </div>
          <p className="text-[11px] text-[#666B76] mt-2">
            Updating your username triggers automated script provisioning for your new account within 5-10 minutes.
          </p>
        </div>

        {/* License Key */}
        <div className="pt-6 border-t border-[#EAEAE5]">
          <span className="text-xs font-semibold uppercase text-[#666B76] block mb-2">
            Master License Pass
          </span>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] text-xs font-mono">
            <span className="text-[#17181C] font-bold">{licenseKey}</span>
            <button
              onClick={() => handleCopy(licenseKey, 'License Pass')}
              className="text-[#666B76] hover:text-[#4F6BFF] flex items-center gap-1.5 cursor-pointer transition-colors font-sans font-medium"
            >
              <Copy className="size-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Automated Webhook Alert Endpoint */}
        <div className="pt-6 border-t border-[#EAEAE5]">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="size-4 text-[#4F6BFF]" />
            <span className="text-xs font-semibold uppercase text-[#666B76]">
              TradingView Webhook Alert URL
            </span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] text-xs font-mono">
            <span className="text-[#666B76] truncate mr-2">{webhookUrl}</span>
            <button
              onClick={() => handleCopy(webhookUrl, 'Webhook URL')}
              className="text-[#666B76] hover:text-[#4F6BFF] flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors font-sans font-medium"
            >
              <Copy className="size-3.5" />
              <span>Copy URL</span>
            </button>
          </div>
          <p className="text-[11px] text-[#666B76] mt-2">
            Paste this URL into your TradingView Alert "Webhook URL" field for instant alert routing to Telegram or Discord.
          </p>
        </div>

      </div>

    </div>
  );
};
