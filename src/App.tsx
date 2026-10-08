import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { RouteErrorBoundary } from "./components/layout/RouteErrorBoundary";
import { RouteSuspenseFallback } from "./components/layout/RouteSuspenseFallback";
import { ROUTES } from "./router/routes";

// Eagerly loaded initial route: Public Landing Page
import { LandingPage } from "./pages/public/LandingPage";

// Route-Level Code Splitting: Lazy-loaded public & auth routes
const PublicIndicatorPage = lazy(() =>
  import("./pages/public/PublicIndicatorPage").then((m) => ({ default: m.PublicIndicatorPage }))
);
const PublicSessionPage = lazy(() =>
  import("./pages/public/PublicSessionPage").then((m) => ({ default: m.PublicSessionPage }))
);
const LoginPage = lazy(() =>
  import("./pages/public/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const SignupPage = lazy(() =>
  import("./pages/public/SignupPage").then((m) => ({ default: m.SignupPage }))
);
const CheckoutPage = lazy(() =>
  import("./pages/public/CheckoutPage").then((m) => ({ default: m.CheckoutPage }))
);
const NotFoundPage = lazy(() =>
  import("./pages/public/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

// Route-Level Code Splitting: Lazy-loaded authenticated application routes
const DashboardPage = lazy(() =>
  import("./pages/dashboard/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const IndicatorPage = lazy(() =>
  import("./pages/dashboard/IndicatorPage").then((m) => ({ default: m.IndicatorPage }))
);
const SessionPage = lazy(() =>
  import("./pages/dashboard/SessionPage").then((m) => ({ default: m.SessionPage }))
);
const ReferralsPage = lazy(() =>
  import("./pages/dashboard/ReferralsPage").then((m) => ({ default: m.ReferralsPage }))
);
const SupportPage = lazy(() =>
  import("./pages/dashboard/SupportPage").then((m) => ({ default: m.SupportPage }))
);
const AccountPage = lazy(() =>
  import("./pages/dashboard/AccountPage").then((m) => ({ default: m.AccountPage }))
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteErrorBoundary>
          <Suspense fallback={<RouteSuspenseFallback />}>
            <Routes>
              {/* 1. Public Marketing & Product Routes */}
              <Route path={ROUTES.HOME} element={<LandingPage />} />
              <Route path={ROUTES.INDICATOR} element={<PublicIndicatorPage />} />
              <Route path={ROUTES.SESSION} element={<PublicSessionPage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
              <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />

              {/* 2. Authenticated Application Workspace (Route Guarded) */}
              <Route element={<ProtectedRoute />}>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.DASHBOARD_INDICATOR} element={<IndicatorPage />} />
                <Route path={ROUTES.DASHBOARD_SESSION} element={<SessionPage />} />
                <Route path={ROUTES.DASHBOARD_REFERRALS} element={<ReferralsPage />} />
                <Route path={ROUTES.DASHBOARD_SUPPORT} element={<SupportPage />} />
                <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
              </Route>

              {/* 3. 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
