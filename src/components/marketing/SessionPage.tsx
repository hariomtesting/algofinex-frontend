import React, { useState } from 'react';
import { SESSION_PILLARS } from '../../data/productExperienceData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface SessionPageProps {
  onNavigate: (path: string) => void;
}

export const SessionPage: React.FC<SessionPageProps> = ({ onNavigate: _onNavigate }) => {
  const [email, setEmail] = useState('');
  const [tradingViewHandle, setTradingViewHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (tradingViewHandle.trim().length < 3) {
      setErrorMessage('TradingView username must be at least 3 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto pt-6 pb-12 border-b border-[#20252C]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141820] border border-[#20252C] text-xs font-mono text-[#C8A96B] uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#C8A96B]" />
            <span>DISCIPLINED EDUCATION MASTERCLASS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
            The 3-Day Execution Session.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B929C] leading-relaxed">
            A structured three-day masterclass designed to align your charting environment, formalize structural risk invalidation, and transform indicators into a repeatable execution habit.
          </p>
        </div>

        {/* 4 Pillars of Information Architecture */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C] text-left">
            <Clock className="size-5 text-[#C8A96B] mb-3" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">Session Duration</h4>
            <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
              3 Structured Days with self-paced video modules and live session exercises.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C] text-left">
            <BookOpen className="size-5 text-[#C8A96B] mb-3" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">Curriculum Delivery</h4>
            <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
              System calibration, liquidity absorption analysis, and position risk modeling.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C] text-left">
            <ShieldCheck className="size-5 text-[#C8A96B] mb-3" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">Eligibility</h4>
            <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
              Open to all traders with a free or paid TradingView account. Zero fee required.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#101318] border border-[#20252C] text-left">
            <Users className="size-5 text-[#C8A96B] mb-3" />
            <h4 className="text-sm font-semibold text-[#F3F4F6]">Active Study Desk</h4>
            <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
              Private community cohort and direct technical desk support throughout.
            </p>
          </div>
        </div>

        {/* The 3-Day Curriculum Breakdown */}
        <div className="mt-16 text-left">
          <SectionHeading
            eyebrow="DAY-BY-DAY SYLLABUS"
            title="What happens inside the 3-day curriculum."
            description="Clear learning outcomes with verifiable exercises on your own charts."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SESSION_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl bg-[#101318] border border-[#20252C] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#20252C] pb-3 mb-4">
                    <span className="text-xs font-mono font-bold text-[#C8A96B]">
                      DAY 0{pillar.number}
                    </span>
                    <Badge variant="neutral">MODULE {pillar.number}</Badge>
                  </div>

                  <h3 className="text-lg font-bold text-[#F3F4F6]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#C8A96B] mt-1 font-mono">{pillar.tagline}</p>

                  <p className="text-xs sm:text-sm text-[#8B929C] mt-3 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-[11px] font-mono text-[#8B929C] uppercase tracking-wider mb-2">
                      Key Competencies:
                    </p>
                    <ul className="space-y-1.5">
                      {pillar.focusItems.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-xs text-[#8B929C]">
                          <Check className="size-3 text-[#6FAF8A] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#20252C] bg-[#0B0E13] p-3 rounded-lg">
                  <p className="text-[10px] font-mono text-[#6B7380] uppercase">Expected Outcome:</p>
                  <p className="text-xs text-[#F3F4F6] font-medium mt-1">{pillar.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens After Activation */}
        <div className="mt-16 p-8 rounded-xl bg-[#101318] border border-[#20252C] text-left">
          <h3 className="text-xl font-bold text-[#F3F4F6]">What Happens After Activation</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#C8A96B]">STEP 01</span>
              <h4 className="text-sm font-semibold text-[#F3F4F6] mt-1">TradingView Whitelist</h4>
              <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
                Your TradingView username is automatically provisioned for invite-only script access so you can test indicators live.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#C8A96B]">STEP 02</span>
              <h4 className="text-sm font-semibold text-[#F3F4F6] mt-1">Syllabus Unlocked</h4>
              <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
                Receive instant email access to Day 1 video walkthrough, market structure checklists, and journal spreadsheets.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#C8A96B]">STEP 03</span>
              <h4 className="text-sm font-semibold text-[#F3F4F6] mt-1">Next Step Decision</h4>
              <p className="text-xs text-[#8B929C] mt-1.5 leading-relaxed">
                At the end of Day 3, decide whether to transition into the full AlgoFinex Suite or maintain your own independent notes.
              </p>
            </div>
          </div>
        </div>

        {/* Enrollment Intake Form (No Fake Countdown / Honest Process) */}
        <div className="mt-16 max-w-xl mx-auto p-8 rounded-2xl bg-[#101318] border border-[#20252C] text-center">
          <h3 className="text-2xl font-bold text-[#F3F4F6]">
            Request 3-Day Session Activation
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#8B929C]">
            Provide your email and TradingView username below to queue your session seat.
          </p>

          {submittedSuccess ? (
            <div className="mt-6 p-6 rounded-xl bg-[#0B0E13] border border-[#6FAF8A]/40 text-left">
              <div className="flex items-center gap-2 text-[#6FAF8A] font-semibold text-sm">
                <CheckCircle2 className="size-5" />
                <span>Session Request Queued Successfully</span>
              </div>
              <p className="mt-2 text-xs text-[#8B929C] leading-relaxed">
                We have registered <strong className="text-[#F3F4F6]">{email}</strong> and your TradingView handle <strong className="text-[#F3F4F6]">@{tradingViewHandle}</strong>. Check your inbox for orientation materials and whitelisting confirmation.
              </p>
              <div className="mt-5">
                <Button variant="secondary" size="sm" onClick={() => setSubmittedSuccess(false)}>
                  Submit Another Handle
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnrollSubmit} className="mt-6 space-y-4 text-left">
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="trader@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="TradingView Username"
                required
                placeholder="e.g. SatoshiQuant"
                helperText="Required to grant invite-only script access during your 3-day evaluation."
                value={tradingViewHandle}
                onChange={(e) => setTradingViewHandle(e.target.value)}
              />

              {errorMessage && (
                <div className="p-3 rounded-lg bg-[#C87878]/10 border border-[#C87878]/30 text-xs text-[#C87878] flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Activate My 3-Day Session
                </Button>
              </div>

              <p className="text-[11px] text-[#6B7380] text-center pt-2">
                Strict privacy guarantee. Zero spam. Whitelisted strictly for educational evaluation.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
