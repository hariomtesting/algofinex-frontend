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
      <div className="border-b border-[#20252C] pb-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-[#6FAF8A]" />
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
            Active Script Access &amp; License Provisioning
          </h1>
        </div>
        <p className="text-xs text-[#8B929C] mt-1">
          Manage your TradingView account handle and webhook alert integrations.
        </p>
      </div>

      {/* Main License Card */}
      <div className="bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-7 space-y-6">
        
        {/* TradingView Handle Binding */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-[#8B929C] font-semibold">
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
                  variant="outline"
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
          <p className="text-[11px] text-[#6B7380] mt-1.5">
            Updating your username triggers automated script provisioning for your new account within 5-10 minutes.
          </p>
        </div>

        {/* License Key */}
        <div className="pt-5 border-t border-[#20252C]">
          <span className="text-xs font-mono uppercase text-[#8B929C] font-semibold block mb-2">
            Master License Pass
          </span>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0E13] border border-[#20252C] font-mono text-xs">
            <span className="text-[#F3F4F6] font-semibold">{licenseKey}</span>
            <button
              onClick={() => handleCopy(licenseKey, 'License Pass')}
              className="text-[#8B929C] hover:text-[#C8A96B] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Copy className="size-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Automated Webhook Alert Endpoint */}
        <div className="pt-5 border-t border-[#20252C]">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="size-4 text-[#C8A96B]" />
            <span className="text-xs font-mono uppercase text-[#8B929C] font-semibold">
              TradingView Webhook Alert URL
            </span>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0E13] border border-[#20252C] font-mono text-xs">
            <span className="text-[#8B929C] truncate mr-2">{webhookUrl}</span>
            <button
              onClick={() => handleCopy(webhookUrl, 'Webhook URL')}
              className="text-[#8B929C] hover:text-[#C8A96B] flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
            >
              <Copy className="size-3.5" />
              <span>Copy URL</span>
            </button>
          </div>
          <p className="text-[11px] text-[#6B7380] mt-1.5">
            Paste this URL into your TradingView Alert "Webhook URL" field for instant alert routing to Telegram or Discord.
          </p>
        </div>

      </div>

    </div>
  );
};
