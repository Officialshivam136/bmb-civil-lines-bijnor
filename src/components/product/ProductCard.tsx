'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getHindiTitle } from '@/lib/hindiTranslations';

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
}

export default function ProductCard({ product }: { product: Product }) {
  const { items, addToCart, updateQuantity } = useCart();
  const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(defaultVariant);

  const cartItemId = selectedVariant ? `${product.id}-${selectedVariant.id}` : '';
  const cartItem = items.find((i) => i.id === cartItemId);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const startingPrice = selectedVariant ? selectedVariant.price : (product.variants?.[0]?.price || 0);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;
  const hindiName = getHindiTitle(product.slug, product.name);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    addToCart({
      id: cartItemId,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      quantity: 1,
      image: imageUrl || undefined
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    updateQuantity(cartItemId, inCartQty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    updateQuantity(cartItemId, inCartQty - 1);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xs hover:border-primary/50 transition-all flex flex-col group hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/3] bg-border/20 overflow-hidden block">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/10 group-hover:scale-105 transition-transform duration-300">
            <span className="text-4xl">🍬</span>
          </div>
        )}

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> BESTSELLER
            </span>
          )}
        </div>

        {product.isVegetarian && (
          <div className="absolute top-2.5 right-2.5 bg-white/95 p-1 rounded-xs shadow-xs z-10">
            <div className="w-3.5 h-3.5 border border-green-600 rounded-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            </div>
          </div>
        )}
      </Link>
      
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-primary/80 font-medium font-serif line-clamp-1">
            {hindiName}
          </p>
        </Link>
        
        {/* Weight Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex gap-1 mt-2 mb-2 flex-wrap">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedVariant(v);
                }}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  selectedVariant?.id === v.id
                    ? 'bg-primary text-white'
                    : 'bg-background border border-border text-foreground/70 hover:border-primary/40'
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-border/50">
          <div>
            <div className="font-black text-primary text-base sm:text-lg">
              ₹{startingPrice}
              {selectedVariant && (
                <span className="text-[10px] font-normal text-foreground/60 ml-0.5">
                  /{selectedVariant.weight}
                </span>
              )}
            </div>
          </div>
          
          <div>
            {inCartQty === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-primary text-white px-2 py-1 rounded-xl shadow-xs">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-5 h-5 rounded-md bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                  title="Decrease"
                >
                  <Minus className="w-3 h-3 text-white" />
                </button>
                <span className="text-xs font-black min-w-3 text-center">
                  {inCartQty}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-5 h-5 rounded-md bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                  title="Increase"
                >
                  <Plus className="w-3 h-3 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
