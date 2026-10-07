import React, { useState } from 'react';
import { 
  login, 
  signup, 
  forgotPassword, 
  verifyTradingViewHandle 
} from '../../api/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft
} from 'lucide-react';

export type AuthMode = 'login' | 'signup' | 'forgot_password' | 'verify';

interface AuthPagesProps {
  initialMode?: AuthMode;
  onNavigate: (path: string) => void;
  onAuthSuccess?: () => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  initialMode = 'login',
  onNavigate,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tradingViewHandle, setTradingViewHandle] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  // Asynchronous states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleModeSwitch = (nextMode: AuthMode) => {
    resetMessages();
    setMode(nextMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password.trim()) {
          throw new Error('Please fill in both email and password.');
        }
        await login({ email, password, tradingViewHandle });
        setSuccessMsg('Authentication confirmed. Redirecting to workstation...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onNavigate('/app');
        }, 600);
      } else if (mode === 'signup') {
        if (!name.trim() || !email.trim() || !tradingViewHandle.trim()) {
          throw new Error('All registration fields are required.');
        }
        await verifyTradingViewHandle(tradingViewHandle);
        await signup({ name, email, password, tradingViewHandle });
        setSuccessMsg('Account registered successfully. Redirecting to client portal...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onNavigate('/app');
        }, 700);
      } else if (mode === 'forgot_password') {
        if (!email.trim()) {
          throw new Error('Please enter your account email address.');
        }
        const res = await forgotPassword(email);
        setSuccessMsg(res.message);
      } else if (mode === 'verify') {
        if (verificationCode.trim().length < 6) {
          throw new Error('Verification token must be 6 digits.');
        }
        setSuccessMsg('Token verified. Access credentials restored.');
        setTimeout(() => {
          setMode('login');
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication request failed. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#101318] border border-[#20252C] rounded-2xl p-6 sm:p-8 shadow-workstation text-left">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#141820] border border-[#20252C] mb-3">
            <Lock className="size-5 text-[#C8A96B]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
            {mode === 'login' && 'Client Portal Login'}
            {mode === 'signup' && 'Create Trader Account'}
            {mode === 'forgot_password' && 'Reset Access Password'}
            {mode === 'verify' && 'Verify Security Token'}
          </h2>
          <p className="text-xs text-[#8B929C] mt-1.5">
            {mode === 'login' && 'Access your AlgoFinex indicator licenses & workstation.'}
            {mode === 'signup' && 'Bind your TradingView username for automated invite scripts.'}
            {mode === 'forgot_password' && 'Enter your registered email to receive an authorization code.'}
            {mode === 'verify' && 'Enter the 6-digit confirmation token sent to your email.'}
          </p>
        </div>

        {/* Status Banners */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-[#C87878]/10 border border-[#C87878]/30 text-xs text-[#C87878] flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-[#0B0E13] border border-[#6FAF8A]/40 text-xs text-[#6FAF8A] flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dynamic Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="Marcus Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<UserIcon className="size-4" />}
              required
            />
          )}

          {mode !== 'verify' && (
            <Input
              label="Email Address"
              type="email"
              placeholder="trader@quantdesk.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="size-4" />}
              required
            />
          )}

          {(mode === 'login' || mode === 'signup') && (
            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="size-4" />}
              required
            />
          )}

          {mode === 'signup' && (
            <Input
              label="TradingView Handle"
              type="text"
              placeholder="e.g. SatoshiQuant"
              helperText="This username will be whitelisted for invite-only script access."
              value={tradingViewHandle}
              onChange={(e) => setTradingViewHandle(e.target.value)}
              required
            />
          )}

          {mode === 'verify' && (
            <Input
              label="6-Digit Security Token"
              type="text"
              maxLength={6}
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#8B929C] cursor-pointer">
                <input type="checkbox" className="rounded accent-[#C8A96B] size-3.5" defaultChecked />
                <span>Remember session</span>
              </label>
              <button
                type="button"
                onClick={() => handleModeSwitch('forgot_password')}
                className="text-[#C8A96B] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {mode === 'login' && 'Sign In to Portal'}
              {mode === 'signup' && 'Register Trader Account'}
              {mode === 'forgot_password' && 'Send Reset Instructions'}
              {mode === 'verify' && 'Confirm Security Token'}
            </Button>
          </div>
        </form>

        {/* Footer Navigation Switcher */}
        <div className="mt-6 pt-5 border-t border-[#20252C] text-center text-xs text-[#8B929C]">
          {mode === 'login' && (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => handleModeSwitch('signup')}
                className="text-[#C8A96B] font-semibold hover:underline cursor-pointer ml-1"
              >
                Create Account
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already registered?{' '}
              <button
                onClick={() => handleModeSwitch('login')}
                className="text-[#C8A96B] font-semibold hover:underline cursor-pointer ml-1"
              >
                Sign In
              </button>
            </p>
          )}

          {(mode === 'forgot_password' || mode === 'verify') && (
            <button
              onClick={() => handleModeSwitch('login')}
              className="inline-flex items-center gap-1 text-[#8B929C] hover:text-[#F3F4F6] cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
              <span>Back to Login</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
