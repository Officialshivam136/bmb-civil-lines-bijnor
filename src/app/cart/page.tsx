'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, Tag, Crown, CheckCircle2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    totalItems,
    isVipUser,
    monthlyOrderCount,
    vipThreshold,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    finalTotal
  } = useCart();

  const [mounted, setMounted] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="w-24 h-24 bg-surface border border-border rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🛒</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
        <p className="text-foreground/70 mb-8">
          Explore authentic pure desi ghee sweets, hot samosas, and snacks from Bikaner Misthan Bhandar.
        </p>
        <Link 
          href="/menu"
          className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-md"
        >
          BROWSE MENU
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Your Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>
        <Link href="/menu" className="text-xs md:text-sm font-semibold text-primary hover:underline">
          + Add more items
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-surface border border-border p-4 rounded-2xl shadow-sm">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-border/20 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <span className="text-3xl">🍬</span>
                )}
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-foreground text-sm md:text-base">{item.name}</h3>
                    <p className="text-xs text-foreground/60">{item.weight}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-foreground/40 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="font-bold text-primary text-base">₹{item.price * item.quantity}</div>
                  
                  <div className="flex items-center border border-border rounded-lg bg-background">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors rounded-l-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-xs text-foreground">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors rounded-r-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* VIP Status Banner Inside Cart */}
          {isVipUser ? (
            <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-[#7a121d] flex items-center justify-center font-bold shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div className="text-xs text-foreground">
                <strong className="font-bold text-amber-800 text-sm block">👑 BMB VIP Patron Active!</strong>
                You have ordered <strong className="text-primary">{monthlyOrderCount} times</strong> in the past month. A flat 10% VIP privilege discount is automatically applied to your cart.
              </div>
            </div>
          ) : monthlyOrderCount === 1 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">⭐ 1/2 Orders This Month</h4>
                  <p className="text-xs text-foreground/70">
                    You have placed 1 order in the past 30 days. Complete this order to become a <strong>BMB VIP Patron</strong> and unlock 10% OFF on all future orders!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Standard User Status (0/2 Monthly Orders)</h4>
                  <p className="text-xs text-foreground/70">
                    Order 2 or more times in a month to automatically unlock <strong>VIP Patron Status (10% OFF)</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border p-6 rounded-2xl sticky top-24 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon (e.g. BIJNOR10)"
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs uppercase font-medium focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-red-500' : 'text-green-600 font-semibold'}`}>
                  {promoMessage.text}
                </p>
              )}

              {appliedPromoCode && (
                <div className="flex items-center justify-between bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary">
                  <span>Coupon {appliedPromoCode} Active</span>
                  <button onClick={removePromoCode} className="hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
            
            <div className="space-y-3 text-sm text-foreground/80 pt-2 border-t border-border/50">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" /> {isVipUser ? 'VIP Patron 10% Discount' : 'Coupon Promo Discount'}
                  </span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-xs">
                <span>Delivery Charge</span>
                <span className="text-foreground/60">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between font-extrabold text-xl text-foreground pt-4 border-t border-border">
              <span>Estimated Total</span>
              <span className="text-primary">₹{finalTotal}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              PROCEED TO CHECKOUT
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-center text-foreground/50">
              🔒 Safe & Secure Checkout • Bijnor Local Express Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
