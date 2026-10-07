import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../mock/mockData';
import { ProductCategory } from '../../types/api';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  ArrowRight, 
  Layers, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  Sliders, 
  Check 
} from 'lucide-react';

interface ProductCatalogSectionProps {
  onNavigate: (path: string) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Indicators (4)' },
    { id: 'MARKET_STRUCTURE', label: 'Market Structure' },
    { id: 'LIQUIDITY', label: 'Liquidity & Imbalance' },
    { id: 'MOMENTUM_TREND', label: 'Trend & Momentum' },
    { id: 'EXECUTION_CONFIRMATION', label: 'Execution & Invalidation' },
  ];

  const filteredProducts = selectedCategory === 'ALL'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: ProductCategory) => {
    switch (category) {
      case 'MARKET_STRUCTURE':
        return <Layers className="size-3.5 text-[#C8A96B]" />;
      case 'LIQUIDITY':
        return <Compass className="size-3.5 text-[#C8A96B]" />;
      case 'MOMENTUM_TREND':
        return <TrendingUp className="size-3.5 text-[#C8A96B]" />;
      case 'EXECUTION_CONFIRMATION':
        return <CheckCircle2 className="size-3.5 text-[#C8A96B]" />;
      default:
        return <Sliders className="size-3.5 text-[#C8A96B]" />;
    }
  };

  return (
    <section
      id="product-catalogue"
      className="py-20 sm:py-24 bg-[#080A0D] border-b border-[#20252C] relative"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="PRODUCT SUITE"
          title="Institutional indicator catalog."
          description="Engineered strictly for TradingView Pine Script v5. Every algorithm executes deterministic logic without redrawing or mid-candle hallucination."
        />

        {/* Category Filtering Toolbar */}
        <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-[#141820] text-[#F3F4F6] border-[#C8A96B] shadow-xs'
                    : 'bg-[#101318] text-[#8B929C] border-[#20252C] hover:text-[#F3F4F6] hover:border-[#2E3642]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid - Software Product Catalog */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`group relative rounded-xl bg-[#101318] border transition-all duration-200 p-6 flex flex-col justify-between text-left ${
                  isHovered ? 'border-[#C8A96B]/50 shadow-card-hover bg-[#12161E]' : 'border-[#20252C]'
                }`}
              >
                <div>
                  {/* Card Header: Category & Badge */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#20252C] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-[#141820] border border-[#20252C]">
                        {getCategoryIcon(product.category)}
                      </div>
                      <span className="text-xs font-mono text-[#8B929C] uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="neutral">{product.version}</Badge>
                      <Badge variant="accent">Pine Script v5</Badge>
                    </div>
                  </div>

                  {/* Product Title & Short Description */}
                  <div className="mt-5">
                    <h3 className="text-xl font-bold text-[#F3F4F6] tracking-tight group-hover:text-[#C8A96B] transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#8B929C] leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Technical Visual Representation Preview */}
                  <div className="mt-5 p-3.5 rounded-lg bg-[#0B0E13] border border-[#20252C] font-mono text-[11px]">
                    <div className="flex items-center justify-between text-[#8B929C] pb-2 border-b border-[#1C2128]">
                      <span>Mathematical Model:</span>
                      <span className="text-[#6FAF8A] flex items-center gap-1">
                        <Check className="size-3" /> Non-Repainting
                      </span>
                    </div>
                    <p className="mt-2 text-[#8B929C] text-[11px] leading-relaxed italic">
                      "{product.formulaLogic}"
                    </p>
                  </div>

                  {/* Key Capabilities */}
                  <div className="mt-6">
                    <p className="text-[11px] font-mono font-medium text-[#8B929C] uppercase tracking-wider mb-2.5">
                      Core Capabilities
                    </p>
                    <ul className="space-y-2">
                      {product.keyCapabilities.slice(0, 3).map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F3F4F6]">
                          <span className="size-1 rounded-full bg-[#C8A96B] mt-1.5 shrink-0" />
                          <span className="leading-snug">
                            <strong className="font-semibold text-[#F3F4F6]">{cap.title}:</strong>{' '}
                            <span className="text-[#8B929C]">{cap.description}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Supported Markets Tags */}
                  <div className="mt-6 pt-4 border-t border-[#20252C]">
                    <p className="text-[10px] font-mono text-[#6B7380] uppercase tracking-wider mb-2">
                      Supported Markets
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.supportedMarkets.map((mkt, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141820] text-[#8B929C] border border-[#20252C]"
                        >
                          {mkt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="mt-7 pt-4 border-t border-[#20252C] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate(`/products/${product.slug}`)}
                    className="text-xs font-mono text-[#C8A96B] hover:text-[#D8BB80] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowRight className="size-3.5" />
                  </button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onNavigate('/pricing')}
                  >
                    Deploy via Suite
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
