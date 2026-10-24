'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function FloatingCartBar() {
  const pathname = usePathname();
  const { totalItems, finalTotal, subtotal, discountAmount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't display on checkout, cart, or admin paths
  if (!mounted || totalItems === 0) return null;
  if (pathname === '/cart' || pathname === '/checkout' || pathname?.startsWith('/admin') || pathname?.startsWith('/tv')) {
    return null;
  }

  return (
    <aside 
      aria-label="Floating cart preview"
      className="fixed bottom-18 md:bottom-4 left-3 right-3 md:left-auto md:right-6 md:max-w-md z-40 animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      <div className="bg-linear-to-r from-[#7A1C1C] via-[#8c1d1d] to-[#7A1C1C] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(122,28,28,0.45)] border border-[#C5A059]/40 flex items-center justify-between gap-3 backdrop-blur-md">
        {/* Left Side: Cart Icon & Amount */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-[#1A1A1A] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#7A1C1C] shadow-xs">
              {totalItems}
            </span>
          </div>

          <div>
            <div className="text-[11px] text-white/80 font-medium flex items-center gap-1.5">
              <span>{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</span>
              {discountAmount > 0 && (
                <span className="text-amber-300 text-[10px] font-bold">
                  • 10% VIP Off
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg font-black tracking-tight flex items-baseline gap-1.5">
              <span>₹{Math.round(finalTotal)}</span>
              {discountAmount > 0 && (
                <span className="text-xs text-white/60 line-through font-normal">
                  ₹{Math.round(subtotal)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: View Cart Button */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 text-[#7A1C1C] font-black px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] shrink-0"
        >
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
