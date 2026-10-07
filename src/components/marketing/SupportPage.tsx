import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { 
  getSupportTickets, 
  createSupportTicket 
} from '../../api/support';
import { SupportTicket, TicketPriority } from '../../types/api';
import { 
  LifeBuoy, 
  HelpCircle, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface SupportPageProps {
  onNavigate: (path: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate: _onNavigate }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  
  // New Ticket Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'tradingview_access' | 'indicator_settings' | 'billing' | '3day_session' | 'general'>('tradingview_access');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);
  const [ticketError, setTicketError] = useState<string | null>(null);

  useEffect(() => {
    getSupportTickets()
      .then((data) => {
        setTickets(data);
        setIsLoadingTickets(false);
      })
      .catch(() => setIsLoadingTickets(false));
  }, []);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketError(null);
    setTicketSuccess(null);

    if (!subject.trim() || !message.trim()) {
      setTicketError('Subject and message details are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newTicket = await createSupportTicket({
        subject,
        category,
        priority,
        message,
      });
      setTickets([newTicket, ...tickets]);
      setTicketSuccess(`Ticket ${newTicket.id} has been submitted to the engineering desk.`);
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setTicketError(err?.message || 'Failed to submit ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How quickly are TradingView script access invites granted?',
      a: 'Invites are dispatched via our automated backend bridge within 5 to 15 minutes after subscription or 3-Day Session intake. You will see them under TradingView > Indicators > Invite-Only Scripts.',
    },
    {
      q: 'Can I change my TradingView username after enrollment?',
      a: 'Yes. You can update your linked TradingView username anytime from your User Dashboard under the Active Access tab.',
    },
    {
      q: 'Do your indicators repaint past bars when reloading the chart?',
      a: 'No. AlgoFinex algorithms enforce strict bar-close verification. Signals never shift position, delete, or redraw retroactively.',
    },
    {
      q: 'What timeframes are supported by the suite?',
      a: 'All timeframes are supported, from 1-minute scalping up to Weekly macro charts. The algorithms feature sensitivity presets tailored to individual asset classes.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#4F6BFF]/20 text-xs font-medium text-[#4F6BFF] uppercase tracking-wider mb-4">
            <LifeBuoy className="size-3.5 text-[#4F6BFF]" />
            <span>ALGOFINEX TECHNICAL DESK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17181C] tracking-tight leading-tight">
            Client Support &amp; Help Center
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#666B76] leading-relaxed">
            Direct assistance from our technical engineers. TradingView account binding, indicator sensitivity calibration, and billing inquiries.
          </p>
        </div>

        {/* Two-Column: Ticket Submission + Ticket History */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: Create Ticket Form */}
          <div className="lg:col-span-7 bg-white border border-[#EAEAE5] shadow-card rounded-3xl p-8">
            <h3 className="text-lg font-bold text-[#17181C] flex items-center gap-2">
              <MessageSquare className="size-4 text-[#4F6BFF]" />
              <span>Submit Technical Ticket</span>
            </h3>
            <p className="text-xs text-[#666B76] mt-1 mb-6">
              Our engineering team responds within 2-4 hours during market trading hours.
            </p>

            {ticketSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-[#ECFBF6] border border-[#35C99A]/30 text-xs text-[#059669] flex items-center gap-2 font-medium">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{ticketSuccess}</span>
              </div>
            )}

            {ticketError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{ticketError}</span>
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-[#666B76] block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#FAFAF7] text-[#17181C] text-xs rounded-xl border border-[#EAEAE5] p-3 focus:border-[#4F6BFF] focus:bg-white focus:outline-none font-medium cursor-pointer"
                >
                  <option value="tradingview_access">TradingView Script Whitelisting</option>
                  <option value="indicator_settings">Indicator Sensitivity Calibration</option>
                  <option value="billing">Subscription &amp; Invoices</option>
                  <option value="3day_session">3-Day Session Materials</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-[#666B76] block mb-1.5">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-[#FAFAF7] text-[#17181C] text-xs rounded-xl border border-[#EAEAE5] p-3 focus:border-[#4F6BFF] focus:bg-white focus:outline-none font-medium cursor-pointer"
                >
                  <option value="low">Low — General Question</option>
                  <option value="medium">Medium — Configuration Inquiry</option>
                  <option value="high">High — Script Access Issue</option>
                  <option value="urgent">Urgent — Live Session Support</option>
                </select>
              </div>

              <Input
                label="Subject"
                placeholder="Brief summary of your question"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase text-[#666B76]">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-[#FAFAF7] text-[#17181C] text-xs rounded-xl border border-[#EAEAE5] p-3 focus:border-[#4F6BFF] focus:bg-white focus:outline-none placeholder:text-[#9CA3AF]"
                  placeholder="Include asset class, timeframe, and any error message displayed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="size-3.5" />}
                >
                  Submit Ticket
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Ticket History & Knowledge Quick Links */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-[#EAEAE5] shadow-card rounded-3xl p-6 sm:p-8">
              <h4 className="text-sm font-bold text-[#17181C] mb-4">
                Recent Support Tickets
              </h4>

              {isLoadingTickets ? (
                <div className="space-y-3">
                  <div className="h-12 bg-[#F0F1EE] rounded-xl animate-pulse" />
                  <div className="h-12 bg-[#F0F1EE] rounded-xl animate-pulse" />
                </div>
              ) : tickets.length === 0 ? (
                <p className="text-xs text-[#666B76]">No support tickets recorded for this profile.</p>
              ) : (
                <div className="space-y-3">
                  {tickets.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#EAEAE5] hover:border-[#D0D4DD] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#17181C]">
                          {t.id}
                        </span>
                        <Badge
                          variant={
                            t.status === 'resolved'
                              ? 'success'
                              : t.status === 'in_review'
                              ? 'accent'
                              : 'neutral'
                          }
                        >
                          {t.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#666B76] mt-1.5 font-medium line-clamp-1">
                        {t.subject}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF] font-mono mt-2">
                        <Clock className="size-3" />
                        <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Support Options */}
            <div className="bg-white border border-[#EAEAE5] shadow-card rounded-3xl p-6 sm:p-8 text-xs text-[#666B76] space-y-3">
              <h4 className="text-sm font-bold text-[#17181C]">Direct Communication</h4>
              <p>
                <strong className="text-[#17181C]">Desk Email:</strong> support@algofinex.com
              </p>
              <p>
                <strong className="text-[#17181C]">Trading Desk Hours:</strong> Mon – Fri, 08:00 – 22:00 UTC
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-left border-t border-[#EAEAE5] pt-12">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED"
            title="General Knowledge Base"
            description="Answers to common setup, installation, and subscription inquiries."
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EAEAE5] shadow-xs"
              >
                <h4 className="text-sm font-bold text-[#17181C] flex items-center gap-2">
                  <HelpCircle className="size-4 text-[#4F6BFF] shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#666B76] mt-2.5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
