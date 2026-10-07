import React, { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/marketing/Navbar';
import { Hero } from './components/marketing/Hero';
import { ProductCatalogSection } from './components/marketing/ProductCatalogSection';
import { PrinciplesSection } from './components/marketing/PrinciplesSection';
import { IndicatorSystemSection } from './components/marketing/IndicatorSystemSection';
import { ProductRevealSection } from './components/marketing/ProductRevealSection';
import { SessionSection } from './components/marketing/SessionSection';
import { HomeTrustSection } from './components/marketing/HomeTrustSection';
import { PrototypePricingSection } from './components/marketing/PrototypePricingSection';
import { HomeReferralCtaSection } from './components/marketing/HomeReferralCtaSection';
import { HomeSupportCtaSection } from './components/marketing/HomeSupportCtaSection';
import { FaqSection } from './components/marketing/FaqSection';
import { ClosingCtaSection } from './components/marketing/ClosingCtaSection';
import { LogoPreloader } from './components/ui/LogoPreloader';
import { ToastProvider } from './components/ui/Toast';

import type { AppTab, Instrument, Timeframe } from './components/app/AppShell';
import type { LensLayer } from './components/app/WorkspaceScreen';
import type { SubscriptionPlan } from './types/api';

// Dedicated Standalone Sub-Pages (Code-split to keep marketing bundle minimal)
const ProductDetailPage = React.lazy(() => import('./components/marketing/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const PricingPage = React.lazy(() => import('./components/marketing/PricingPage').then(m => ({ default: m.PricingPage })));
const HowItWorksPage = React.lazy(() => import('./components/marketing/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const SessionPage = React.lazy(() => import('./components/marketing/SessionPage').then(m => ({ default: m.SessionPage })));
const ReferralPage = React.lazy(() => import('./components/marketing/ReferralPage').then(m => ({ default: m.ReferralPage })));
const SupportPage = React.lazy(() => import('./components/marketing/SupportPage').then(m => ({ default: m.SupportPage })));
const AuthPages = React.lazy(() => import('./components/auth/AuthPages').then(m => ({ default: m.AuthPages })));
const CheckoutPage = React.lazy(() => import('./components/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));

// Workstation & Trader Dashboard Screens (Code-split)
const AppShell = React.lazy(() => import('./components/app/AppShell').then(m => ({ default: m.AppShell })));
const OverviewScreen = React.lazy(() => import('./components/app/OverviewScreen').then(m => ({ default: m.OverviewScreen })));
const WorkspaceScreen = React.lazy(() => import('./components/app/WorkspaceScreen').then(m => ({ default: m.WorkspaceScreen })));
const MyProductsScreen = React.lazy(() => import('./components/app/MyProductsScreen').then(m => ({ default: m.MyProductsScreen })));
const ActiveAccessScreen = React.lazy(() => import('./components/app/ActiveAccessScreen').then(m => ({ default: m.ActiveAccessScreen })));
const SubscriptionScreen = React.lazy(() => import('./components/app/SubscriptionScreen').then(m => ({ default: m.SubscriptionScreen })));
const ReferralScreen = React.lazy(() => import('./components/app/ReferralScreen').then(m => ({ default: m.ReferralScreen })));
const AccountScreen = React.lazy(() => import('./components/app/AccountScreen').then(m => ({ default: m.AccountScreen })));
const SupportDashboardScreen = React.lazy(() => import('./components/app/SupportDashboardScreen').then(m => ({ default: m.SupportDashboardScreen })));
const SessionScreen = React.lazy(() => import('./components/app/SessionScreen').then(m => ({ default: m.SessionScreen })));

// Route Loading Fallbacks
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 font-mono text-xs text-[#666B76] bg-[#FAFAF7]">
    <div className="w-7 h-7 border-2 border-[#4F6BFF] border-t-transparent rounded-full animate-spin" />
    <span className="tracking-widest text-[11px] text-[#666B76]">LOADING MODULE...</span>
  </div>
);

const AppShellFallback: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-3 font-mono text-xs text-[#666B76] bg-[#FAFAF7]">
    <div className="w-8 h-8 border-2 border-[#4F6BFF] border-t-transparent rounded-full animate-spin" />
    <span className="tracking-widest text-[11px] text-[#4F6BFF]">INITIALIZING ALGOFINEX WORKSTATION...</span>
  </div>
);

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function resolveAppTab(pathname: string): AppTab | null {
  const norm = normalizePath(pathname);
  switch (norm) {
    case '/app':
      return 'overview';
    case '/app/workspace':
      return 'workspace';
    case '/app/overview':
      return 'overview';
    case '/app/products':
    case '/app/indicators':
      return 'products';
    case '/app/access':
      return 'access';
    case '/app/subscription':
      return 'subscription';
    case '/app/referral':
      return 'referral';
    case '/app/account':
      return 'account';
    case '/app/support':
      return 'support';
    case '/app/session':
      return 'session';
    default:
      return null;
  }
}

function tabToPath(tab: AppTab): string {
  switch (tab) {
    case 'overview':
      return '/app';
    case 'workspace':
      return '/app/workspace';
    case 'products':
      return '/app/products';
    case 'access':
      return '/app/access';
    case 'subscription':
      return '/app/subscription';
    case 'referral':
      return '/app/referral';
    case 'account':
      return '/app/account';
    case 'support':
      return '/app/support';
    case 'session':
      return '/app/session';
  }
}

export const App: React.FC = () => {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [navState, setNavState] = useState<any>({});

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((nextPath: string, state?: any) => {
    const next = normalizePath(nextPath);
    if (normalizePath(window.location.pathname) !== next) {
      window.history.pushState({}, '', next);
    }
    setPathname(next);
    if (state) setNavState(state);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const appTab = resolveAppTab(pathname);

  // App Global Workstation State
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>('BTC/USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('15m');
  const [activeLens, setActiveLens] = useState<LensLayer>('STRUCTURE');

  // Check dynamic product route: /products/:slug
  const productMatch = pathname.match(/^\/products\/([a-zA-Z0-9_-]+)$/);
  const productSlug = productMatch ? productMatch[1] : null;

  return (
    <ToastProvider>
      <LogoPreloader />

      {/* 1. APP WORKSTATION & TRADER DASHBOARD VIEW */}
      {appTab ? (
        <React.Suspense fallback={<AppShellFallback />}>
          <AppShell
            activeTab={appTab}
            onTabChange={(tab) => navigate(tabToPath(tab))}
            selectedInstrument={selectedInstrument}
            onInstrumentChange={setSelectedInstrument}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
            onExitApp={() => navigate('/')}
          >
            <React.Suspense fallback={<RouteLoadingFallback />}>
              {appTab === 'overview' && (
                <OverviewScreen
                  onNavigate={(tab) => navigate(tabToPath(tab))}
                  selectedInstrument={selectedInstrument}
                />
              )}
              {appTab === 'workspace' && (
                <WorkspaceScreen
                  selectedInstrument={selectedInstrument}
                  selectedTimeframe={selectedTimeframe}
                  activeLens={activeLens}
                  onLensChange={setActiveLens}
                  onSelectInstrument={setSelectedInstrument}
                />
              )}
              {appTab === 'products' && <MyProductsScreen />}
              {appTab === 'access' && <ActiveAccessScreen />}
              {appTab === 'subscription' && <SubscriptionScreen />}
              {appTab === 'referral' && <ReferralScreen />}
              {appTab === 'account' && <AccountScreen />}
              {appTab === 'support' && <SupportDashboardScreen onNavigate={(t) => navigate(tabToPath(t))} />}
              {appTab === 'session' && <SessionScreen />}
            </React.Suspense>
          </AppShell>
        </React.Suspense>
      ) : (
        /* 2. PUBLIC MARKETING & DEDICATED EXPERIENCE VIEWS */
        <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] flex flex-col justify-between selection:bg-[#4F6BFF]/20 selection:text-[#4F6BFF]">
          
          {/* Universal Sticky Navbar */}
          <Navbar currentPath={pathname} onNavigate={navigate} />

          <main className="flex-1 w-full min-w-0">
            <React.Suspense fallback={<RouteLoadingFallback />}>
              {/* ROUTE: /products/:slug (Dedicated Product Detail Page) */}
              {productSlug ? (
                <ProductDetailPage slug={productSlug} onNavigate={navigate} />
              ) : pathname === '/products' ? (
                /* ROUTE: /products (Product Catalogue Page) */
                <div className="pt-20">
                  <ProductCatalogSection onNavigate={navigate} />
                </div>
              ) : pathname === '/pricing' ? (
                /* ROUTE: /pricing (Pricing Comparison Page) */
                <PricingPage onNavigate={navigate} />
              ) : pathname === '/how-it-works' ? (
                /* ROUTE: /how-it-works (Architecture & Routine Page) */
                <HowItWorksPage onNavigate={navigate} />
              ) : pathname === '/session' ? (
                /* ROUTE: /session (Dedicated 3-Day Session Page) */
                <SessionPage onNavigate={navigate} />
              ) : pathname === '/referral' ? (
                /* ROUTE: /referral (Partner & Affiliate Page) */
                <ReferralPage onNavigate={navigate} />
              ) : pathname === '/support' ? (
                /* ROUTE: /support (Client Helpdesk Page) */
                <SupportPage onNavigate={navigate} />
              ) : pathname === '/login' ? (
                /* ROUTE: /login */
                <AuthPages initialMode="login" onNavigate={navigate} />
              ) : pathname === '/signup' ? (
                /* ROUTE: /signup */
                <AuthPages initialMode="signup" onNavigate={navigate} />
              ) : pathname === '/forgot-password' ? (
                /* ROUTE: /forgot-password */
                <AuthPages initialMode="forgot_password" onNavigate={navigate} />
              ) : pathname === '/verify' ? (
                /* ROUTE: /verify */
                <AuthPages initialMode="verify" onNavigate={navigate} />
              ) : pathname === '/checkout' ? (
                /* ROUTE: /checkout (Payment Flow) */
                <CheckoutPage
                  initialPlan={(navState?.selectedPlan as SubscriptionPlan) || 'annual'}
                  onNavigate={navigate}
                />
              ) : (
                /* ROUTE: / (HOME PAGE — EXACT MASTER BRIEF STRUCTURE) */
                <>
                  {/* 1. Hero */}
                  <Hero onNavigate={navigate} />

                  {/* 2. Product / Indicator showcase */}
                  <ProductCatalogSection onNavigate={navigate} />

                  {/* 3. Why AlgoFinex (Clarity, Context, Discipline, Consistency) */}
                  <PrinciplesSection />

                  {/* 4. Product capabilities (4 Strata Layers) */}
                  <IndicatorSystemSection />

                  {/* 5. Visual trading/chart section (5-Stage Progressive Reveal) */}
                  <ProductRevealSection />

                  {/* 6. 3-Day Session CTA */}
                  <SessionSection onNavigate={navigate} />

                  {/* 7. Social proof / trust section (Verifiable standards) */}
                  <HomeTrustSection />

                  {/* 8. Pricing preview */}
                  <PrototypePricingSection onNavigate={navigate} />

                  {/* 9. Referral CTA */}
                  <HomeReferralCtaSection onNavigate={navigate} />

                  {/* 10. Team / support */}
                  <HomeSupportCtaSection onNavigate={navigate} />

                  {/* 11. FAQ */}
                  <FaqSection onNavigate={navigate} />

                  {/* 12. Closing CTA */}
                  <ClosingCtaSection onNavigate={navigate} />
                </>
              )}
            </React.Suspense>
          </main>

          {/* Clean Modern Footer */}
          <footer className="border-t border-[#EAEAE5] bg-white py-12 px-5 sm:px-8 text-xs text-[#666B76]">
            <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-[#F1F4FF] border border-[#E0E7FF] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M4 18L10 11L14 15L20 7" stroke="#4F6BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-semibold text-[#17181C] tracking-tight text-sm">
                    Algo<span className="text-[#4F6BFF] font-semibold">Finex</span>
                  </span>
                </div>
                <span className="hidden sm:inline text-[#D8D8D2]">•</span>
                <div className="text-[#666B76] text-[12px]">
                  Simple, powerful trading tools designed for clear market structure.
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[12px]">
                <button onClick={() => navigate('/products')} className="text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer">
                  Products
                </button>
                <button onClick={() => navigate('/pricing')} className="text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer">
                  Pricing
                </button>
                <button onClick={() => navigate('/how-it-works')} className="text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer">
                  How It Works
                </button>
                <button onClick={() => navigate('/session')} className="text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer">
                  3-Day Session
                </button>
                <button onClick={() => navigate('/referral')} className="text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer">
                  Referral
                </button>
                <button onClick={() => navigate('/support')} className="text-[#666B76] hover:text-[#17181C] transition-colors cursor-pointer">
                  Support
                </button>
                <button onClick={() => navigate('/app')} className="text-[#4F6BFF] font-semibold hover:text-[#4059E0] transition-colors cursor-pointer">
                  Launch Workstation
                </button>
              </div>

              <div className="text-[#9CA3AF] text-[11px] text-center md:text-right">
                &copy; {new Date().getFullYear()} AlgoFinex. Educational market analysis. Not financial advice.
              </div>
            </div>
          </footer>

        </div>
      )}
    </ToastProvider>
  );
};

export default App;
