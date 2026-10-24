'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { Truck, Store, MapPin, CheckCircle2, Crown, Tag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { 
    items, 
    subtotal, 
    discountAmount, 
    finalTotal, 
    clearCart, 
    totalItems,
    isVipUser,
    monthlyOrderCount,
    checkVipByPhone,
    recordOrderPlaced
  } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [customer, setCustomer] = useState({ name: '', phone: '' });
  const [deliveryMethod, setDeliveryMethod] = useState('DELIVERY'); // DELIVERY or PICKUP
  const [tableNumber, setTableNumber] = useState('');
  const [isQrOrder, setIsQrOrder] = useState(false);
  const [address, setAddress] = useState({
    house: '', street: '', area: '', landmark: '', city: 'Bijnor', state: 'Uttar Pradesh', pincode: '246701'
  });
  const [paymentMethod, setPaymentMethod] = useState('COD'); // COD or PAY_AT_PICKUP

  useEffect(() => {
    setMounted(true);
    if (mounted && items.length === 0) {
      router.push('/cart');
    }
    
    // Auto-fill customer if logged in
    if (session?.user && !customer.name) {
      setCustomer({
        name: session.user.name || '',
        phone: (session.user as any).phone || ''
      });
    }

    // Check QR parameters or session storage
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode') || params.get('orderMode') || sessionStorage.getItem('bmb_order_mode');
      const table = params.get('table') || sessionStorage.getItem('bmb_table_no');

      if (table) {
        setTableNumber(table);
        setIsQrOrder(true);
      }
      if (mode === 'pickup' || mode === 'counter' || table) {
        setDeliveryMethod('PICKUP');
        setPaymentMethod('COD');
        setIsQrOrder(true);
      }
    }
  }, [mounted, items.length, router, session]);

  // Live VIP verification when 10-digit phone number is entered
  useEffect(() => {
    const clean = customer.phone.replace(/\D/g, '');
    if (clean.length === 10) {
      checkVipByPhone(clean);
    }
  }, [customer.phone, checkVipByPhone]);

  const deliveryFee = deliveryMethod === 'DELIVERY' ? 40 : 0;
  const grandTotal = finalTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!customer.name.trim() || !customer.phone.trim()) {
      setError('Please provide your name and phone number for delivery updates.');
      return;
    }

    if (deliveryMethod === 'DELIVERY' && (!address.house.trim() || !address.street.trim() || !address.area.trim())) {
      setError('Please provide complete delivery address in Bijnor.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer,
          deliveryMethod,
          address,
          paymentMethod,
          subtotal,
          discount: discountAmount,
          userId: (session?.user as any)?.id,
          notes: tableNumber ? `Dine-in Table #${tableNumber}` : (deliveryMethod === 'PICKUP' ? 'Counter Pickup (Civil Lines)' : 'Doorstep Delivery')
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Record order in monthly history for VIP qualification (>= 2 orders a month)
      recordOrderPlaced(data.orderId, customer.phone);

      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!mounted || items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">
          Checkout & Order Confirmation
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {isQrOrder && (
          <div className="bg-amber-500/10 border border-accent text-accent-foreground px-4 py-3 rounded-2xl mb-6 flex items-center gap-3 text-sm font-semibold">
            <Store className="w-5 h-5 text-primary shrink-0" />
            <div>
              <span className="font-bold block text-foreground">
                {tableNumber ? `Table #${tableNumber} Dine-In Service Active` : '⚡ Civil Lines Counter Handover Active'}
              </span>
              <span className="text-xs text-foreground/70">
                {tableNumber
                  ? `Your order will be prepared and served directly to Table #${tableNumber}.`
                  : 'Your order will be packed and handed over directly at BMB Civil Lines counter.'}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Delivery vs Pickup */}
            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground">1. Choose Delivery Method</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('DELIVERY')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    deliveryMethod === 'DELIVERY'
                      ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm'
                      : 'border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-xs md:text-sm">Doorstep Delivery (Bijnor)</span>
                  <span className="text-[11px] font-normal text-foreground/60">₹40 Standard Charge</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('PICKUP')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    deliveryMethod === 'PICKUP'
                      ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm'
                      : 'border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  <Store className="w-5 h-5" />
                  <span className="text-xs md:text-sm">Store Takeaway</span>
                  <span className="text-[11px] font-normal text-green-600 font-semibold">FREE (Civil Lines)</span>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground">2. Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="e.g. Gaurav Sharma"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                    required
                  />
                  {customer.phone.replace(/\D/g, '').length === 10 && (
                    <div className="mt-2 text-xs">
                      {isVipUser ? (
                        <div className="flex items-center gap-1.5 text-amber-800 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl font-bold">
                          <Crown className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                          <span>👑 VIP Patron Verified: {monthlyOrderCount} orders this month! 10% VIP discount applied.</span>
                        </div>
                      ) : monthlyOrderCount === 1 ? (
                        <div className="flex items-center gap-1.5 text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>⭐ 1/2 Monthly Orders: Welcome back! This 2nd order qualifies you for VIP Patron status!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-foreground/70 bg-surface border border-border px-3 py-1.5 rounded-xl text-[11px]">
                          <span>Normal User: Order 2 or more times a month to unlock 10% VIP discount on all sweets.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address if Delivery */}
            {deliveryMethod === 'DELIVERY' && (
              <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-4">
                <h2 className="text-base font-bold text-foreground">3. Delivery Address in Bijnor</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                        House / Flat / Shop No. *
                      </label>
                      <input
                        type="text"
                        value={address.house}
                        onChange={(e) => setAddress({ ...address, house: e.target.value })}
                        placeholder="e.g. House No. 42"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                        Street / Colony *
                      </label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="e.g. Civil Lines / Punjabi Colony"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                        Area / Locality *
                      </label>
                      <input
                        type="text"
                        value={address.area}
                        onChange={(e) => setAddress({ ...address, area: e.target.value })}
                        placeholder="e.g. Nai Basti / Civil Lines"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                        Prominent Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={address.landmark}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                        placeholder="e.g. Near Classic Bar"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground">
                {deliveryMethod === 'DELIVERY' ? '4. Payment Preference' : '3. Payment Preference'}
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-primary bg-primary/5 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-primary w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-sm block text-foreground">
                      {deliveryMethod === 'DELIVERY' ? 'Cash on Delivery (COD) / UPI at Doorstep' : 'Pay at Counter (Cash / UPI / Card)'}
                    </span>
                    <span className="text-xs text-foreground/60">
                      Pay easily when your freshly prepared order reaches you.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Checkout Summary Box */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-border p-6 rounded-2xl sticky top-24 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-foreground">Order Overview</h2>

              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-foreground/80 pb-2 border-b border-border/40">
                    <div>
                      <span className="font-semibold block text-foreground">{item.name}</span>
                      <span className="text-foreground/50">{item.weight} × {item.quantity}</span>
                    </div>
                    <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-xs text-foreground/80 pt-3 border-t border-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span className="flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5" /> {isVipUser ? 'VIP Patron 10% Discount' : 'Coupon Promo Discount'}
                    </span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>{deliveryFee === 0 ? <strong className="text-green-600">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
              </div>

              <div className="flex justify-between font-extrabold text-lg text-foreground pt-4 border-t border-border">
                <span>Final Payable</span>
                <span className="text-primary text-xl">₹{grandTotal}</span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? 'Confirming Order...' : `PLACE ORDER (₹${grandTotal})`}
              </button>

              <div className="text-[11px] text-center text-foreground/60 space-y-1">
                <p className="flex items-center justify-center gap-1 text-green-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Freshness Guaranteed
                </p>
                <p>Packed hygienically from Civil Lines, Bijnor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
