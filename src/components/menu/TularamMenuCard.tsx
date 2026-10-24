'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
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
  category?: {
    name: string;
    slug: string;
  };
}

export default function TularamMenuCard({ product }: { product: Product }) {
  const { items, addToCart, updateQuantity } = useCart();

  // Selected variant state (defaults to first variant, e.g. 250g or 1 piece)
  const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(defaultVariant);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Check if this specific variant is already in cart
  const cartItemId = selectedVariant ? `${product.id}-${selectedVariant.id}` : '';
  const cartItem = items.find((i) => i.id === cartItemId);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const hindiName = getHindiTitle(product.slug, product.name);
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;
  const currentPrice = selectedVariant ? selectedVariant.price : 0;

  const handleAdd = () => {
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
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 500);
  };

  const handleIncrement = () => {
    if (!selectedVariant) return;
    updateQuantity(cartItemId, inCartQty + 1);
  };

  const handleDecrement = () => {
    if (!selectedVariant) return;
    updateQuantity(cartItemId, inCartQty - 1);
  };

  return (
    <div className="group relative bg-surface border border-border hover:border-primary/50 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      {/* Left Color Accent Bar like Tularam */}
      <div 
        className={`absolute top-0 left-0 w-1.5 h-full ${
          product.category?.slug === 'snacks-chaat' ? 'bg-[#C5A059]' : 'bg-[#7A1C1C]'
        }`} 
      />

      <div className="pl-2">
        {/* Top Metadata Row: Veg Badge & Bestseller */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {/* Pure Veg Green Icon */}
            <div className="w-4 h-4 border border-green-600 p-0.5 rounded-xs flex items-center justify-center bg-white shrink-0">
              <div className="w-2 h-2 rounded-full bg-green-600" />
            </div>

            {product.isBestSeller && (
              <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="w-2.5 h-2.5" /> Bestseller
              </span>
            )}
          </div>

          {selectedVariant && (
            <span className="text-[11px] font-semibold text-foreground/50">
              {selectedVariant.weight}
            </span>
          )}
        </div>

        {/* Content & Thumbnail Grid */}
        <div className="flex gap-3 justify-between items-start">
          <div className="flex-1 min-w-0">
            {/* English Title */}
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Authentic Hindi Subtitle */}
            <p className="text-xs text-primary/80 font-medium font-serif mt-0.5 line-clamp-1">
              {hindiName}
            </p>

            {/* Description */}
            <p className="text-[11px] sm:text-xs text-foreground/65 mt-1.5 line-clamp-2 leading-relaxed">
              {product.description || 'Pure traditional preparation made fresh at BMB Civil Lines, Bijnor.'}
            </p>
          </div>

          {/* Product Thumbnail */}
          <Link href={`/product/${product.slug}`} className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-border/20 shrink-0 block border border-border/60">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="80px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                🍬
              </div>
            )}
          </Link>
        </div>

        {/* Portion / Weight Options Pills (250g, 500g, 1kg, 1 pc) */}
        {product.variants && product.variants.length > 1 && (
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedVariant?.id === v.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-background border border-border text-foreground/75 hover:border-primary/40'
                }`}
              >
                {v.weight} • ₹{v.price}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Pricing & Instant Quick-Add Action */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between pl-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black text-primary">
              ₹{currentPrice}
            </span>
            {selectedVariant && (
              <span className="text-[11px] text-foreground/50 font-medium">
                /{selectedVariant.weight}
              </span>
            )}
          </div>
          {inCartQty > 0 && selectedVariant && (
            <span className="text-[10px] text-green-700 font-bold block mt-0.5">
              In Cart: {inCartQty} × ₹{currentPrice} = ₹{inCartQty * currentPrice}
            </span>
          )}
        </div>

        {/* Dynamic Add / Quantity Controller Button */}
        <div>
          {inCartQty === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                addedAnimation
                  ? 'bg-green-600 border-green-600 text-white scale-95'
                  : 'bg-primary/10 border-primary text-primary hover:bg-primary hover:text-white shadow-xs'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 bg-primary text-white px-2 py-1.5 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5 text-white" />
              </button>

              <span className="text-xs font-black min-w-4 text-center">
                {inCartQty}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
