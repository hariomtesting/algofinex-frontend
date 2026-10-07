import React, { useState, useEffect } from 'react';
import { getProductBySlug } from '../../api/products';
import { Product } from '../../types/api';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Skeleton } from '../ui/Skeleton';
import { 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { HeroProductTerminal } from './HeroProductTerminal';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getProductBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-28 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <Skeleton variant="text" width={200} height={24} className="mb-6" />
        <Skeleton variant="rectangular" height={160} className="mb-8 rounded-2xl" />
        <Skeleton variant="rectangular" height={360} className="rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-32 px-4 text-center">
        <h2 className="text-2xl font-bold">Indicator not found</h2>
        <p className="text-sm text-[#666B76] mt-2">The requested algorithm profile could not be retrieved.</p>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => onNavigate('/products')}>
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#17181C] pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#666B76] mb-8">
          <button
            onClick={() => onNavigate('/products')}
            className="flex items-center gap-1 hover:text-[#17181C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Catalog</span>
          </button>
          <span>/</span>
          <span className="text-[#17181C] font-semibold">{product.name}</span>
        </div>

        {/* 1. HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-[#EAEAE5]">
          <div className="lg:col-span-7 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="accent">{product.categoryLabel}</Badge>
              <Badge variant="neutral">{product.version}</Badge>
              <Badge variant="success">Pine Script v5</Badge>
              <span className="text-xs text-[#059669] font-medium flex items-center gap-1 ml-1">
                <Check className="size-3.5" /> Zero Repaint
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17181C] tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#666B76] leading-relaxed max-w-2xl">
              {product.fullDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('/checkout')}
                rightIcon={<ChevronRight className="size-4" />}
              >
                Access via AlgoFinex Suite
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('/session')}
                leftIcon={<ShieldCheck className="size-4 text-[#8B5CF6]" />}
              >
                Learn in 3-Day Session
              </Button>
            </div>
          </div>

          {/* Quick Technical Specs Box */}
          <div className="lg:col-span-5 bg-white border border-[#EAEAE5] rounded-3xl p-6 text-left shadow-card">
            <h4 className="text-xs uppercase text-[#666B76] tracking-wider pb-3 border-b border-[#EAEAE5] font-semibold">
              Technical Specifications
            </h4>
            <div className="mt-4 space-y-3.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">Execution Layer:</span>
                <span className="text-[#17181C] font-semibold">{product.pineScriptType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">Validation Mode:</span>
                <span className="text-[#059669] font-semibold">Strict Bar-Close Lock</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F1EE]">
                <span className="text-[#666B76]">Repaint Status:</span>
                <span className="text-[#059669] font-semibold">Guaranteed 0% Repaint</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#666B76]">TradingView Whitelisting:</span>
                <span className="text-[#17181C] font-semibold">Instant Handle Provisioning</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT PREVIEW: Interactive Chart & Visual Engine */}
        <div className="mt-14 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#17181C]">Live Indicator Visual Engine</h2>
              <p className="text-xs sm:text-sm text-[#666B76]">Interactive candlestick telemetry rendered with deterministic signals.</p>
            </div>
            <Badge variant="accent">Live Simulation</Badge>
          </div>
          <HeroProductTerminal />
        </div>

        {/* 3. WHAT IT DOES & MARKET PHILOSOPHY */}
        <div className="mt-16 text-left border-t border-[#EAEAE5] pt-12">
          <h2 className="text-2xl font-bold text-[#17181C] tracking-tight">
            What It Does
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#666B76] max-w-3xl leading-relaxed">
            Markets are structured around liquidity, imbalances, and multi-timeframe swing geometry.
            Most discretionary traders suffer from subjective chart drawing and emotional bias.
            {product.name} formalizes trading logic into objective rules so every setup is verified identically.
          </p>
        </div>

        {/* 4. KEY CAPABILITIES */}
        <div className="mt-12 text-left">
          <h3 className="text-lg font-bold text-[#17181C] mb-6">Key Algorithmic Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {product.keyCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EAEAE5] shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="size-2 rounded-full bg-[#4F6BFF]" />
                  <h4 className="text-sm font-bold text-[#17181C]">{cap.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#666B76] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. HOW IT WORKS (Pine Script logic) */}
        <div className="mt-16 text-left border-t border-[#EAEAE5] pt-12">
          <h3 className="text-lg font-bold text-[#17181C] mb-4">Algorithmic Workflow &amp; Rules</h3>
          <div className="p-6 rounded-2xl bg-[#F1F4FF] border border-[#4F6BFF]/15 text-xs">
            <p className="text-[#4F6BFF] font-bold mb-2">Formula Logic Model:</p>
            <p className="text-[#17181C] italic mb-6">"{product.formulaLogic}"</p>

            <p className="text-[#17181C] font-bold mb-3">Sequential Verification Checklist:</p>
            <ol className="space-y-2.5 list-decimal list-inside text-[#666B76]">
              {product.howItWorks.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-[#17181C] font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 6. USE CASES & SUPPORTED MARKETS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-[#EAEAE5] pt-12">
          <div>
            <h3 className="text-lg font-bold text-[#17181C] mb-4">Primary Trader Use Cases</h3>
            <ul className="space-y-3">
              {product.useCases.map((uc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#666B76]">
                  <CheckCircle2 className="size-4 text-[#35C99A] mt-0.5 shrink-0" />
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#17181C] mb-4">Supported Market Classes</h3>
            <div className="flex flex-wrap gap-2">
              {product.supportedMarkets.map((mkt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#EAEAE5] text-xs font-medium text-[#17181C] shadow-xs"
                >
                  {mkt}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#666B76] leading-relaxed">
              Operational across all TradingView supported brokers and exchanges with automated alerts.
            </p>
          </div>
        </div>

        {/* 7. FAQ */}
        <div className="mt-16 text-left border-t border-[#EAEAE5] pt-12">
          <h3 className="text-xl font-bold text-[#17181C] mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {product.faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#EAEAE5] overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-[#17181C] hover:text-[#4F6BFF] transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <span className="text-sm text-[#666B76] font-semibold">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#666B76] leading-relaxed border-t border-[#F0F1EE] pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 8. BOTTOM CTA */}
        <div className="mt-16 p-10 rounded-3xl bg-[#EEF2FF] border border-[#4F6BFF]/20 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17181C]">
            Integrate {product.name} into your trading desk.
          </h3>
          <p className="mt-2 text-sm text-[#666B76] max-w-xl mx-auto">
            Available as part of the complete AlgoFinex Suite along with the intensive 3-Day Execution Masterclass.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/checkout')}
            >
              Get Suite Access
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/products')}
            >
              Browse Other Indicators
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
