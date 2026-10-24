'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Check, Star, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
  };
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  ingredients: string | null;
  allergens: string | null;
  isVegetarian: boolean;
  priceConfigured: boolean;
  variants: Variant[];
  images?: ProductImage[];
  reviews?: Review[];
}

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const mainImageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      quantity,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-surface border border-border rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm">
            {mainImageUrl ? (
              <Image 
                src={mainImageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-primary/10">
                <span className="text-8xl">🍬</span>
              </div>
            )}
            
            {product.isVegetarian && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-sm shadow-sm z-10">
                <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            <span>Bikaner Misthan Bhandar • Bijnor</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{product.name}</h1>
          
          {product.reviews && product.reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-700 px-2.5 py-1 rounded-md text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>
                  {(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-foreground/60">
                ({product.reviews.length} {product.reviews.length === 1 ? 'verified review' : 'verified reviews'})
              </span>
            </div>
          )}

          {product.priceConfigured && selectedVariant ? (
            <div className="text-3xl font-extrabold text-primary mb-6">
              ₹{selectedVariant.price}
              <span className="text-sm font-normal text-foreground/60 ml-2">({selectedVariant.weight})</span>
            </div>
          ) : (
            <div className="text-xl font-bold text-foreground/60 mb-6">Price unavailable</div>
          )}

          <div className="text-foreground/80 mb-8 whitespace-pre-line leading-relaxed">
            {product.description || "Authentic and freshly prepared mithai from Bikaner Misthan Bhandar, Civil Lines, Bijnor."}
          </div>

          {/* Variant Selection */}
          {product.variants.length > 0 && (
            <div className="mb-8">
              <label className="block text-sm font-bold text-foreground mb-3">
                Select Weight / Pack:
              </label>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-border bg-surface text-foreground hover:border-primary/50'
                    }`}
                  >
                    <span>{variant.weight}</span>
                    <span className="ml-2 opacity-90 font-semibold">₹{variant.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-border">
            <div className="flex items-center border border-border rounded-xl bg-surface">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-foreground/70 hover:text-foreground hover:bg-border/30 rounded-l-xl transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-foreground/70 hover:text-foreground hover:bg-border/30 rounded-r-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || isAdded}
              className={`flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all shadow-md ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add to Cart (₹{(selectedVariant?.price || 0) * quantity})
                </>
              )}
            </button>
          </div>

          {/* Quick Shop Highlights */}
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-foreground/70">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface border border-border">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>30-45 min delivery in Bijnor</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface border border-border">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Hygienic Tamper-proof Box</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-border pt-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">Verified Customer Feedback</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-foreground">{rev.user.name || "Customer from Bijnor"}</div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  "{rev.comment}"
                </p>
                <div className="text-[11px] text-foreground/50">
                  Verified Local Buyer • Civil Lines, Bijnor
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl p-6 text-center text-foreground/60 text-sm">
            Be the first customer in Bijnor to review this freshly prepared delicacy!
          </div>
        )}
      </div>
    </div>
  );
}
