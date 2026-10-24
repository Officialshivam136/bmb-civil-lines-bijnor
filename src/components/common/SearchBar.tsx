'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, Plus, Check, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Variant {
  id: string;
  weight: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: { name: string };
  variants: Variant[];
  images: { url: string }[];
}

export default function SearchBar() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.products || []);
        setIsOpen(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const variant = product.variants[0];
    if (!variant) return;

    addToCart({
      id: `${product.id}-${variant.id}`,
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      weight: variant.weight,
      price: variant.price,
      quantity: 1,
      image: product.images[0]?.url
    });

    setAddedMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Input Field */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search sweets, samosa, jalebi, kaju..."
          className="w-full pl-9 pr-9 py-2.5 bg-surface border border-border rounded-full text-xs text-foreground placeholder:text-foreground/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-2xs"
        />

        {loading ? (
          <Loader2 className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/40 animate-spin" />
        ) : query ? (
          <button
            onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Live Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto divide-y divide-border/60">
          {results.length > 0 ? (
            <>
              <div className="p-2.5 bg-surface border-b border-border flex items-center justify-between text-[11px] text-foreground/60">
                <span>Found {results.length} authentic delicacies</span>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  View full results <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {results.map((product) => {
                const img = product.images[0]?.url;
                const startingPrice = product.variants[0]?.price || 0;
                const isAdded = addedMap[product.id];

                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/product/${product.slug}`);
                    }}
                    className="p-3 hover:bg-surface/80 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-lg bg-border/20 overflow-hidden relative shrink-0">
                        {img ? (
                          <Image src={img} alt={product.name} fill className="object-cover" />
                        ) : (
                          <span className="flex items-center justify-center h-full text-base">🍬</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-foreground truncate hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-foreground/50 truncate">
                          {product.category.name} • {product.variants[0]?.weight || 'Standard'}
                        </p>
                        <span className="font-extrabold text-xs text-primary block mt-0.5">
                          ₹{startingPrice}
                        </span>
                      </div>
                    </div>

                    {/* Quick Add to Cart button */}
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs shrink-0 ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-primary/10 hover:bg-primary text-primary hover:text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Add
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="p-6 text-center text-xs text-foreground/60 space-y-1">
              <p className="font-bold text-foreground">No sweets found for "{query}"</p>
              <p className="text-[11px]">Try searching for Samosa, Jalebi, Laddu, or Kaju Katli.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
