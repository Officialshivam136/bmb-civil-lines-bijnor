'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, X, CheckCircle2, ChevronRight, Utensils } from 'lucide-react';
import TularamMenuCard from './TularamMenuCard';

interface Variant {
  id: string;
  weight: string;
  price: number;
  stock: number;
}

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isVegetarian: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  priceConfigured: boolean;
  variants: Variant[];
  images?: ProductImage[];
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

export default function MenuExplorer({ categories }: { categories: Category[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [bestsellerOnly, setBestsellerOnly] = useState(false);

  // Attach category metadata to every product
  const allProducts = useMemo(() => {
    return categories.flatMap(cat => 
      cat.products.map(p => ({
        ...p,
        category: { id: cat.id, name: cat.name, slug: cat.slug }
      }))
    );
  }, [categories]);

  // Filter products based on search, active category, and bestseller toggle
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        product.name.toLowerCase().includes(q) || 
        (product.description && product.description.toLowerCase().includes(q)) ||
        product.category?.name.toLowerCase().includes(q);

      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const matchesBestseller = !bestsellerOnly || product.isBestSeller;

      return matchesSearch && matchesCategory && matchesBestseller;
    });
  }, [allProducts, searchQuery, activeCategory, bestsellerOnly]);

  const handleCategoryClick = (catId: string, slug?: string) => {
    setActiveCategory(catId);
    if (catId !== 'all' && slug && !searchQuery) {
      const sectionEl = document.getElementById(`category-${slug}`);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Sticky Filter & Search Bar like Tularam Restaurant */}
      <div className="sticky top-18 z-30 bg-background/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Live Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search samosa, kaju katli, rasgulla, laddu..."
              className="w-full pl-10 pr-9 py-2.5 bg-surface border border-border rounded-xl text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground p-0.5"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters (Bestsellers & Counter Notice) */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => setBestsellerOnly(!bestsellerOnly)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                bestsellerOnly
                  ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                  : 'bg-surface border-border text-foreground/80 hover:border-primary/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bestsellers Only</span>
            </button>

            <span className="text-[11px] font-semibold text-foreground/60 hidden md:inline">
              Showing {filteredProducts.length} of {allProducts.length} items
            </span>
          </div>
        </div>

        {/* Horizontal Category Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-hide text-xs">
          <button
            type="button"
            onClick={() => handleCategoryClick('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-bold transition-all border cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-primary border-primary text-white shadow-xs'
                : 'bg-surface border-border text-foreground/80 hover:border-primary/40'
            }`}
          >
            All Items ({allProducts.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id, cat.slug)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full font-bold transition-all border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary border-primary text-white shadow-xs'
                  : 'bg-surface border-border text-foreground/80 hover:border-primary/40'
              }`}
            >
              {cat.name} ({cat.products.length})
            </button>
          ))}
        </div>
      </div>

      {/* Product Display: List all items on the same page */}
      {activeCategory === 'all' && !searchQuery && !bestsellerOnly ? (
        // Comprehensive Single-Page Category View
        <div className="space-y-12">
          {categories.map((cat) => {
            if (cat.products.length === 0) return null;
            return (
              <section key={cat.id} id={`category-${cat.slug}`} className="scroll-mt-36">
                {/* Category Header */}
                <div className="flex items-baseline justify-between mb-4 pb-2.5 border-b border-border/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <h2 className="text-lg sm:text-xl font-black text-foreground">
                      {cat.name}
                    </h2>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {cat.products.length} {cat.products.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Filter only this category</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2 or 3 Column Responsive Grid of Tularam Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.products.map((product) => (
                    <TularamMenuCard
                      key={product.id}
                      product={{
                        ...product,
                        category: { id: cat.id, name: cat.name, slug: cat.slug }
                      }}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Filtered Results Grid
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </h2>
            {(searchQuery || activeCategory !== 'all' || bestsellerOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setBestsellerOnly(false);
                }}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <TularamMenuCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface border border-border rounded-2xl p-8">
              <span className="text-4xl block mb-2">🔍</span>
              <h3 className="text-base font-bold text-foreground mb-1">
                No sweets or snacks found matching &quot;{searchQuery}&quot;
              </h3>
              <p className="text-xs text-foreground/60 mb-5 max-w-sm mx-auto">
                Try searching for Samosa, Kaju Katli, Rasgulla, Jalebi, or Motichoor Laddu.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setBestsellerOnly(false);
                }}
                className="bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Show All 49 Items
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
