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
      <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <Skeleton variant="text" width={200} height={24} className="mb-6" />
        <Skeleton variant="rectangular" height={160} className="mb-8" />
        <Skeleton variant="rectangular" height={360} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-32 px-4 text-center">
        <h2 className="text-2xl font-bold">Indicator not found</h2>
        <p className="text-sm text-[#8B929C] mt-2">The requested algorithm profile could not be retrieved.</p>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => onNavigate('/products')}>
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F3F4F6] pt-24 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8B929C] mb-8">
          <button
            onClick={() => onNavigate('/products')}
            className="flex items-center gap-1 hover:text-[#F3F4F6] transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Catalog</span>
          </button>
          <span>/</span>
          <span className="text-[#F3F4F6] font-medium">{product.name}</span>
        </div>

        {/* 1. HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#20252C] pb-12">
          <div className="lg:col-span-7 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="accent">{product.categoryLabel}</Badge>
              <Badge variant="neutral">{product.version}</Badge>
              <Badge variant="success">Pine Script v5</Badge>
              <span className="text-xs font-mono text-[#6FAF8A] flex items-center gap-1 ml-1">
                <Check className="size-3" /> Zero Repaint
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#8B929C] leading-relaxed max-w-2xl">
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
                leftIcon={<ShieldCheck className="size-4 text-[#C8A96B]" />}
              >
                Learn in 3-Day Session
              </Button>
            </div>
          </div>

          {/* Quick Technical Specs Box */}
          <div className="lg:col-span-5 bg-[#101318] border border-[#20252C] rounded-xl p-5 text-left font-mono text-xs">
            <h4 className="text-xs uppercase text-[#8B929C] tracking-wider pb-3 border-b border-[#20252C] font-semibold">
              Technical Specifications
            </h4>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between py-1 border-b border-[#181E28]">
                <span className="text-[#8B929C]">Execution Layer:</span>
                <span className="text-[#F3F4F6] font-medium">{product.pineScriptType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#181E28]">
                <span className="text-[#8B929C]">Validation Mode:</span>
                <span className="text-[#6FAF8A] font-medium">Strict Bar-Close Lock</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#181E28]">
                <span className="text-[#8B929C]">Repaint Status:</span>
                <span className="text-[#6FAF8A] font-medium">Guaranteed 0% Repaint</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#181E28]">
                <span className="text-[#8B929C]">TradingView Whitelisting:</span>
                <span className="text-[#F3F4F6] font-medium">Instant Handle Provisioning</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT PREVIEW: Interactive Chart & Visual Engine */}
        <div className="mt-12 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#F3F4F6]">Live Indicator Visual Engine</h2>
              <p className="text-xs text-[#8B929C]">Interactive candlestick telemetry rendered with deterministic signals.</p>
            </div>
            <Badge variant="accent">Live Simulation</Badge>
          </div>
          <HeroProductTerminal />
        </div>

        {/* 3. WHAT IT DOES & MARKET PHILOSOPHY */}
        <div className="mt-16 text-left border-t border-[#20252C] pt-12">
          <h2 className="text-2xl font-bold text-[#F3F4F6] tracking-tight">
            What It Does
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8B929C] max-w-3xl leading-relaxed">
            Markets are structured around liquidity, imbalances, and multi-timeframe swing geometry.
            Most discretionary traders suffer from subjective chart drawing and emotional bias.
            {product.name} formalizes trading logic into objective rules so every setup is verified identically.
          </p>
        </div>

        {/* 4. KEY CAPABILITIES */}
        <div className="mt-12 text-left">
          <h3 className="text-lg font-bold text-[#F3F4F6] mb-6">Key Algorithmic Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {product.keyCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#101318] border border-[#20252C] hover:border-[#2E3642] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-2 rounded-full bg-[#C8A96B]" />
                  <h4 className="text-sm font-semibold text-[#F3F4F6]">{cap.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#8B929C] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. HOW IT WORKS (Pine Script logic) */}
        <div className="mt-16 text-left border-t border-[#20252C] pt-12">
          <h3 className="text-lg font-bold text-[#F3F4F6] mb-4">Algorithmic Workflow &amp; Rules</h3>
          <div className="p-5 rounded-xl bg-[#0B0E13] border border-[#20252C] font-mono text-xs">
            <p className="text-[#C8A96B] font-semibold mb-3">Formula Logic Model:</p>
            <p className="text-[#8B929C] italic mb-6">"{product.formulaLogic}"</p>

            <p className="text-[#F3F4F6] font-semibold mb-2">Sequential Verification Checklist:</p>
            <ol className="space-y-2 list-decimal list-inside text-[#8B929C]">
              {product.howItWorks.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-[#F3F4F6]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 6. USE CASES & SUPPORTED MARKETS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-[#20252C] pt-12">
          <div>
            <h3 className="text-lg font-bold text-[#F3F4F6] mb-4">Primary Trader Use Cases</h3>
            <ul className="space-y-3">
              {product.useCases.map((uc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8B929C]">
                  <CheckCircle2 className="size-4 text-[#6FAF8A] mt-0.5 shrink-0" />
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#F3F4F6] mb-4">Supported Market Classes</h3>
            <div className="flex flex-wrap gap-2">
              {product.supportedMarkets.map((mkt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#101318] border border-[#20252C] text-xs font-mono text-[#F3F4F6]"
                >
                  {mkt}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#8B929C] leading-relaxed">
              Operational across all TradingView supported brokers and exchanges with automated alerts.
            </p>
          </div>
        </div>

        {/* 7. FAQ */}
        <div className="mt-16 text-left border-t border-[#20252C] pt-12">
          <h3 className="text-xl font-bold text-[#F3F4F6] mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {product.faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#101318] border border-[#20252C] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-[#F3F4F6] hover:text-[#C8A96B] transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <span className="text-xs text-[#8B929C] font-mono">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-[#8B929C] leading-relaxed border-t border-[#1C2128] pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 8. BOTTOM CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-[#101318] border border-[#20252C] text-center">
          <h3 className="text-2xl font-bold text-[#F3F4F6]">
            Integrate {product.name} into your trading desk.
          </h3>
          <p className="mt-2 text-sm text-[#8B929C] max-w-xl mx-auto">
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
              variant="outline"
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
