'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  IndianRupee, ShoppingBag, Plus, Minus, Trash2, Printer, 
  Tv, Sparkles, CheckCircle2, User, Phone, Store, Utensils
} from 'lucide-react';
import { ProductData } from '@/data/fallbackCatalogue';

interface PosBillingClientProps {
  products: ProductData[];
}

interface CartItem {
  name: string;
  variant: string;
  price: number;
  qty: number;
}

export default function PosBillingClient({ products }: PosBillingClientProps) {
  const [cart, setCart] = useState<CartItem[]>([
    { name: 'Desi Samosa', variant: '2 pieces', price: 44, qty: 1 },
    { name: 'Desi Ghee Jalebi', variant: '250g', price: 81, qty: 1 }
  ]);
  const [customerName, setCustomerName] = useState('Ajendra Singh');
  const [customerPhone, setCustomerPhone] = useState('8979164646');
  const [orderType, setOrderType] = useState<'PICKUP' | 'DINE_IN'>('PICKUP');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI'>('UPI');
  const [discount, setDiscount] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [generatedOrder, setGeneratedOrder] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const addToCart = (product: ProductData, variantIdx: number = 0) => {
    const v = product.variants[variantIdx] || { weight: 'Standard', price: 100 };
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name && item.variant === v.weight);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { name: product.name, variant: v.weight, price: v.price, qty: 1 }];
    });
  };

  const updateQty = (index: number, delta: number) => {
    setCart(prev => {
      const copy = [...prev];
      copy[index].qty += delta;
      if (copy[index].qty <= 0) {
        return copy.filter((_, i) => i !== index);
      }
      return copy;
    });
  };

  const removeItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/pos/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim() || 'Counter Guest',
          customerPhone: customerPhone.trim() || undefined,
          orderType,
          paymentMethod,
          items: cart,
          discount
        })
      });

      const data = await res.json();
      if (res.ok && data.order) {
        setGeneratedOrder(data.order);
        setCart([]);
      }
    } catch (err) {
      console.warn('POS checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.categoryId === selectedCategory || p.category?.slug === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>POS Counter Billing & Token Dispenser</span>
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Instant TV Sync
            </span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Generate counter tokens for in-store walk-in customers and broadcast directly to the shop TV display.
          </p>
        </div>

        <Link
          href="/tv"
          target="_blank"
          className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all"
        >
          <Tv className="w-4 h-4" />
          <span>View TV Display Screen &rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Product Catalogue Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Categories */}
          <div className="bg-[#18181b] border border-neutral-800 p-4 rounded-2xl space-y-3">
            <input
              type="text"
              placeholder="Search sweets or snacks (e.g. Samosa, Jalebi, Kaju)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  selectedCategory === 'ALL'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'bg-[#242429] text-neutral-400 hover:text-white'
                }`}
              >
                All Sweets
              </button>
              {['Snacks & Chaat', 'Traditional Mithai', 'Kaju & Dry Fruits', 'Barfi & Milk Sweets', 'Laddu'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedCategory.includes(cat.toLowerCase().slice(0, 4))
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : 'bg-[#242429] text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Delicacy Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredProducts.slice(0, 24).map((p) => {
              const baseVariant = p.variants[0] || { weight: '1 pc', price: 20 };
              return (
                <div
                  key={p.id}
                  className="bg-[#18181b] hover:bg-[#202025] border border-neutral-800 rounded-2xl p-3 flex flex-col justify-between transition-all"
                >
                  <div>
                    <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
                      {p.category?.name || 'Mithai'}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">{p.name}</h4>
                    <span className="text-sm font-black text-amber-300 font-mono block mt-1">
                      ₹{baseVariant.price}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400">{baseVariant.weight}</span>
                    <button
                      onClick={() => addToCart(p, 0)}
                      className="bg-amber-500 hover:bg-amber-400 text-neutral-950 p-1 rounded-lg text-xs font-black shadow-sm transition-transform active:scale-90 cursor-pointer"
                      title="Add to bill"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Current Bill & Customer Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Current Order Slip</span>
              </h3>
              <span className="text-xs font-bold text-neutral-400">
                {cart.length} items
              </span>
            </div>

            {/* Customer Inputs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Customer Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#242429] border border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-[#242429] border border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-white font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Order Type & Payment Method */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex rounded-xl bg-[#242429] p-1 border border-neutral-700">
                <button
                  type="button"
                  onClick={() => setOrderType('PICKUP')}
                  className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 ${
                    orderType === 'PICKUP' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400'
                  }`}
                >
                  <Store className="w-3 h-3" /> Takeaway
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('DINE_IN')}
                  className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 ${
                    orderType === 'DINE_IN' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400'
                  }`}
                >
                  <Utensils className="w-3 h-3" /> Dine-in
                </button>
              </div>

              <div className="flex rounded-xl bg-[#242429] p-1 border border-neutral-700">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`flex-1 py-1.5 rounded-lg font-bold ${
                    paymentMethod === 'UPI' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400'
                  }`}
                >
                  UPI QR
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CASH')}
                  className={`flex-1 py-1.5 rounded-lg font-bold ${
                    paymentMethod === 'CASH' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400'
                  }`}
                >
                  Cash
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  Cart is empty. Click delicacies on the left to add.
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#242429] p-2.5 rounded-xl border border-neutral-800 text-xs">
                    <div>
                      <span className="font-bold text-white block">{item.name}</span>
                      <span className="text-[10px] text-neutral-400">{item.variant} • ₹{item.price} each</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(i, -1)}
                        className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold font-mono text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(i, 1)}
                        className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="w-14 text-right font-black text-amber-400 font-mono">
                        ₹{item.price * item.qty}
                      </span>
                      <button
                        onClick={() => removeItem(i)}
                        className="text-neutral-500 hover:text-red-400 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Billing Totals */}
            <div className="pt-3 border-t border-neutral-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-white font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-400 items-center">
                <span>Discount (₹)</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-16 bg-[#242429] border border-neutral-700 text-right px-2 py-0.5 rounded font-mono text-amber-400 font-bold"
                />
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                <span>Total Amount</span>
                <span className="text-amber-400 font-mono text-lg">₹{finalTotal}</span>
              </div>
            </div>

            {/* Action Button: Generate Token */}
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black py-3.5 rounded-xl shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-transform active:scale-98"
            >
              {isSubmitting ? 'Issuing Token...' : '⚡ Generate Token & Send to Shop TV'}
            </button>
          </div>
        </div>
      </div>

      {/* TOKEN GENERATED MODAL */}
      {generatedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#18181b] border-2 border-amber-500/50 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold block">
                Bikaner Misthan Bhandar
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Counter Token Issued!</h2>
              <p className="text-xs text-neutral-400">Order successfully broadcast to the live TV display</p>
            </div>

            {/* Huge Token Badge */}
            <div className="bg-[#242429] border border-neutral-700 rounded-2xl p-6">
              <span className="text-xs text-neutral-400 font-semibold block uppercase">Your Token Number</span>
              <span className="text-6xl font-black text-amber-400 tracking-tight block my-1 font-mono">
                #{generatedOrder.tokenNumber}
              </span>
              <span className="text-xs text-neutral-300 font-semibold">
                {generatedOrder.orderNumber} • {generatedOrder.customerName}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Slip
              </button>
              <button
                onClick={() => setGeneratedOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black"
              >
                Next Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
