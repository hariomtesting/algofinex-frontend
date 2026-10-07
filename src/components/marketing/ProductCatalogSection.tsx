import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../mock/mockData';
import { ProductCategory } from '../../types/api';
import { ArrowRight, Layers, Compass, TrendingUp, CheckCircle2 } from 'lucide-react';

interface ProductCatalogSectionProps {
  onNavigate: (path: string) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Products' },
    { id: 'MARKET_STRUCTURE', label: 'Market Structure' },
    { id: 'LIQUIDITY', label: 'Liquidity' },
    { id: 'MOMENTUM_TREND', label: 'Trend & Momentum' },
    { id: 'EXECUTION_CONFIRMATION', label: 'Confirmation' },
  ];

  const filteredProducts = selectedCategory === 'ALL'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

  const getProductTheme = (category: ProductCategory) => {
    switch (category) {
      case 'MARKET_STRUCTURE':
        return {
          bg: 'bg-[#EEF2FF]',
          border: 'border-[#E0E7FF]',
          text: 'text-[#4F6BFF]',
          icon: <Layers className="size-6 text-[#4F6BFF]" />,
          previewGradient: 'from-[#4F6BFF]/15 to-[#4F6BFF]/5',
          accentColor: '#4F6BFF'
        };
      case 'LIQUIDITY':
        return {
          bg: 'bg-[#F4F0FF]',
          border: 'border-[#DDD6FE]',
          text: 'text-[#8B5CF6]',
          icon: <Compass className="size-6 text-[#8B5CF6]" />,
          previewGradient: 'from-[#8B5CF6]/15 to-[#8B5CF6]/5',
          accentColor: '#8B5CF6'
        };
      case 'MOMENTUM_TREND':
        return {
          bg: 'bg-[#ECFBF6]',
          border: 'border-[#A7F3D0]',
          text: 'text-[#059669]',
          icon: <TrendingUp className="size-6 text-[#35C99A]" />,
          previewGradient: 'from-[#35C99A]/15 to-[#35C99A]/5',
          accentColor: '#35C99A'
        };
      case 'EXECUTION_CONFIRMATION':
      default:
        return {
          bg: 'bg-[#FEF2F2]',
          border: 'border-[#FECACA]',
          text: 'text-[#DC2626]',
          icon: <CheckCircle2 className="size-6 text-[#FF6B6B]" />,
          previewGradient: 'from-[#FF6B6B]/15 to-[#FF6B6B]/5',
          accentColor: '#FF6B6B'
        };
    }
  };

  return (
    <section
      id="product-catalogue"
      className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#EAEAE5]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-[#EEF2FF] px-3 py-1 rounded-full border border-[#E0E7FF]">
            Product Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            Built for clarity, not clutter.
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            Four focused tools designed to give you an objective, mathematical read on market structure.
          </p>
        </div>

        {/* Minimal Category Filtering Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#17181C] text-white shadow-xs'
                    : 'bg-white text-[#666B76] border border-[#EAEAE5] hover:text-[#17181C] hover:border-[#D8D8D2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Simple, Colourful Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const theme = getProductTheme(product.category);

            return (
              <div
                key={product.id}
                onClick={() => onNavigate(`/products/${product.slug}`)}
                className="group rounded-3xl bg-white border border-[#EAEAE5] p-7 sm:p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-card-hover hover:border-[#4F6BFF]/30 transition-all duration-200 cursor-pointer"
              >
                <div>
                  {/* Colourful Product Preview Box */}
                  <div className={`w-full h-44 rounded-2xl ${theme.bg} border ${theme.border} p-5 flex flex-col justify-between relative overflow-hidden mb-6`}>
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-white shadow-xs">
                        {theme.icon}
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white text-[#17181C] shadow-xs">
                        {product.version}
                      </span>
                    </div>

                    {/* Minimal SVG Graphic Representation */}
                    <div className="flex items-end justify-between px-2 pt-4">
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-20 rounded-full bg-white/80" />
                        <div className="h-1.5 w-12 rounded-full bg-white/60" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/90 text-[#17181C] shadow-xs">
                        {product.pineScriptType}
                      </span>
                    </div>
                  </div>

                  {/* Category Label */}
                  <div className="mb-2">
                    <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${theme.bg} ${theme.text}`}>
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17181C] tracking-tight group-hover:text-[#4F6BFF] transition-colors">
                    {product.name}
                  </h3>

                  {/* One-Line Description */}
                  <p className="mt-2.5 text-sm sm:text-base text-[#666B76] leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* View Product Link */}
                <div className="mt-6 pt-5 border-t border-[#F0F1EE] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#666B76]">
                    {product.nonRepainting ? 'Deterministic · Non-repainting' : 'Bar-close confirmed'}
                  </span>
                  <span className="text-sm font-semibold text-[#4F6BFF] group-hover:translate-x-1 flex items-center gap-1.5 transition-transform">
                    View Product <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogSection;
