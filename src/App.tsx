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

// Dedicated Standalone Sub-Pages
import { ProductDetailPage } from './components/marketing/ProductDetailPage';
import { PricingPage } from './components/marketing/PricingPage';
import { HowItWorksPage } from './components/marketing/HowItWorksPage';
import { SessionPage } from './components/marketing/SessionPage';
import { ReferralPage } from './components/marketing/ReferralPage';
import { SupportPage } from './components/marketing/SupportPage';
import { AuthPages } from './components/auth/AuthPages';
import { CheckoutPage } from './components/checkout/CheckoutPage';

// Phase 4B Workstation & Trader Dashboard Components
import { AppShell, AppTab, Instrument, Timeframe } from './components/app/AppShell';
import { OverviewScreen } from './components/app/OverviewScreen';
import { WorkspaceScreen, LensLayer } from './components/app/WorkspaceScreen';
import { MyProductsScreen } from './components/app/MyProductsScreen';
import { ActiveAccessScreen } from './components/app/ActiveAccessScreen';
import { SubscriptionScreen } from './components/app/SubscriptionScreen';
import { ReferralScreen } from './components/app/ReferralScreen';
import { AccountScreen } from './components/app/AccountScreen';
import { SupportDashboardScreen } from './components/app/SupportDashboardScreen';
import { SessionScreen } from './components/app/SessionScreen';
import { SubscriptionPlan } from './types/api';

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
        <AppShell
          activeTab={appTab}
          onTabChange={(tab) => navigate(tabToPath(tab))}
          selectedInstrument={selectedInstrument}
          onInstrumentChange={setSelectedInstrument}
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
          onExitApp={() => navigate('/')}
        >
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
        </AppShell>
      ) : (
        /* 2. PUBLIC MARKETING & DEDICATED EXPERIENCE VIEWS */
        <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] flex flex-col justify-between selection:bg-[#C8A96B]/20 selection:text-[#C8A96B]">
          
          {/* Universal Sticky Navbar */}
          <Navbar currentPath={pathname} onNavigate={navigate} />

          <main className="flex-1 w-full min-w-0">
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
          </main>

          {/* Persistent Footer */}
          <footer className="border-t border-[#20252C] bg-[#0B0E13] py-14 px-5 sm:px-8 text-xs font-mono text-[#8B929C]">
            <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-[#141820] border border-[#20252C] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M4 18L10 11L14 15L20 7" stroke="#C8A96B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-semibold text-[#F3F4F6] tracking-tight text-sm">
                    Algo<span className="text-[#C8A96B] font-medium">Finex</span>
                  </span>
                </div>
                <span className="hidden sm:inline text-[#3B4654]">•</span>
                <div className="text-[#8B929C] text-[11px]">
                  Institutional Market Structure &amp; Quantitative Indicator Suite
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
                <button onClick={() => navigate('/products')} className="text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer">
                  Indicators
                </button>
                <button onClick={() => navigate('/pricing')} className="text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer">
                  Pricing
                </button>
                <button onClick={() => navigate('/how-it-works')} className="text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer">
                  How It Works
                </button>
                <button onClick={() => navigate('/session')} className="text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer">
                  3-Day Session
                </button>
                <button onClick={() => navigate('/referral')} className="text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer">
                  Referral
                </button>
                <button onClick={() => navigate('/support')} className="text-[#8B929C] hover:text-[#F3F4F6] transition-colors cursor-pointer">
                  Support
                </button>
                <button onClick={() => navigate('/app')} className="text-[#C8A96B] font-semibold hover:text-[#D8BB80] transition-colors cursor-pointer">
                  Launch Terminal
                </button>
              </div>

              <div className="text-[#6B7380] text-[10px] text-center md:text-right">
                &copy; {new Date().getFullYear()} AlgoFinex. Educational market structure analysis. Not financial advice.
              </div>
            </div>
          </footer>

        </div>
      )}
    </ToastProvider>
  );
};

export default App;
