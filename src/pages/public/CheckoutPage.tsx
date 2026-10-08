import React, { useState, useEffect } from "react";
import { Link, useRouter } from "../../router/Router";
import { ROUTES } from "../../router/routes";
import { useAuth } from "../../context/AuthContext";
import { productApi } from "../../api/productApi";
import { checkoutApi } from "../../api/checkoutApi";
import { Product, Order } from "../../types/models";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  LoadingState,
  ErrorState,
  SuccessState,
} from "../../components/ui/app";
import { BRAND_CONFIG } from "../../data/mockData";

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  // Form states
  const [tvUsername, setTvUsername] = useState(user?.tradingViewUsername || "");
  const [email, setEmail] = useState(user?.email || "");
  const [processing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setLoadingProduct(true);
      try {
        const products = await productApi.getProducts();
        if (isMounted) {
          setProduct(products[0] || null);
        }
      } catch (err) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Unable to retrieve product details";
          setProductError(msg);
        }
      } finally {
        if (isMounted) setLoadingProduct(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tvUsername.trim() || !email.trim()) {
      setCheckoutError("Please provide both your TradingView username and contact email.");
      return;
    }

    setProcessing(true);
    setCheckoutError(null);

    try {
      const response = await checkoutApi.createCheckoutSession({
        productId: product?.id || "prod_indicator_01",
        tradingViewUsername: tvUsername.trim(),
        contactEmail: email.trim(),
      });

      setCreatedOrder(response.order);

      // If backend provides a payment redirect URL (e.g. Stripe checkout), redirect to it:
      if (response.paymentRedirectUrl) {
        window.location.href = response.paymentRedirectUrl;
        return;
      }

      // Simulated completion transition
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD_INDICATOR);
      }, 2500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Checkout initialization failed. Please try again.";
      setCheckoutError(msg);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="app-public-page">
      {/* Top Header */}
      <header className="site-header" style={{ position: "relative" }}>
        <div className="container nav-container">
          <Link to={ROUTES.HOME} className="brand" aria-label="AlgoFinex Homepage">
            <div className="brand-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="m7 15 4-5 4 3 6-8" />
              </svg>
            </div>
            <span className="brand-name">{BRAND_CONFIG.name}</span>
          </Link>
          <div className="nav-actions">
            <Link to={ROUTES.LOGIN} className="btn btn-ghost btn-sm">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: "clamp(2rem, 5vw, 4.5rem) var(--container-pad)" }}>
        {loadingProduct ? (
          <LoadingState message="Loading checkout details..." />
        ) : productError ? (
          <ErrorState
            title="Product unavailable"
            message={productError}
            onRetry={() => window.location.reload()}
          />
        ) : (
          <div className="app-checkout-grid">
            {/* Left Column: Order Provisioning Details */}
            <div className="app-checkout-main">
              <div style={{ marginBottom: "var(--space-6)" }}>
                <span className="app-page-eyebrow">ORDER CHECKOUT</span>
                <h2 className="app-page-title" style={{ marginTop: "var(--space-2)" }}>
                  Complete Indicator Provisioning
                </h2>
                <p className="app-page-subtitle">
                  Provide your TradingView handle to ensure direct invite-only script assignment.
                </p>
              </div>

              {createdOrder ? (
                <Card variant="elevated">
                  <CardContent style={{ padding: "var(--space-8)" }}>
                    <SuccessState
                      title="Checkout Session Initiated"
                      message={`Order #${createdOrder.id} generated for TradingView ID: ${createdOrder.tradingViewUsername}. Redirecting to your workspace...`}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Account Assignment</CardTitle>
                    <CardDescription>
                      Your script invite will be attached directly to this TradingView ID.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCheckout}>
                      <Input
                        label="TradingView Username"
                        value={tvUsername}
                        onChange={(e) => setTvUsername(e.target.value)}
                        placeholder="Enter your exact TradingView username"
                        helperText="Case-sensitive. Permissions are granted via invite-only scripts on TradingView."
                        required
                      />

                      <Input
                        label="Email Address for Setup Docs"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="trader@domain.com"
                        helperText="Access confirmation and configuration guidelines will be sent here."
                        required
                      />

                      {checkoutError && (
                        <div className="app-alert app-alert-error" role="alert" style={{ marginBottom: "var(--space-4)" }}>
                          {checkoutError}
                        </div>
                      )}

                      <div style={{ marginTop: "var(--space-6)" }}>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          style={{ width: "100%" }}
                          isLoading={processing}
                        >
                          Continue to Provider Checkout →
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Order Summary (Driven by Domain Models) */}
            <div className="app-checkout-summary">
              <Card variant="default">
                <CardHeader>
                  <span className="app-card-tag">SUMMARY</span>
                  <CardTitle>{product?.name || "AlgoFinex Indicator"}</CardTitle>
                  <CardDescription>
                    {product?.description || "TradingView technical analysis tool for structured chart clarity."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="app-summary-table">
                    <div className="app-summary-row">
                      <span>Product Access</span>
                      <span className="font-mono">{product?.priceDisplay || "Price shown at checkout"}</span>
                    </div>
                    <div className="app-summary-row">
                      <span>Applicable Taxes</span>
                      <span className="font-mono">Calculated at checkout</span>
                    </div>
                    <div className="app-summary-divider" />
                    <div className="app-summary-row app-summary-total">
                      <span>Total Due</span>
                      <span className="font-mono">{product?.priceDisplay || "Price shown at checkout"}</span>
                    </div>
                  </div>

                  <div className="app-checkout-guarantee">
                    <div className="app-guarantee-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <span className="app-guarantee-text">
                      Encrypted secure checkout. Backed by single-user license verification.
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="app-card-text-muted" style={{ fontSize: "11px" }}>
                    By completing access provisioning, you agree to the AlgoFinex Terms of Service and single-user software license.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
