'use client';

import { useState } from 'react';
import { Tag, Plus, Check, Trash2, Sparkles, Percent } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'BMBPATRON10', discount: 10, type: 'PERCENT', minOrder: 300, usageCount: 14, isActive: true },
    { id: '2', code: 'FESTIVE15', discount: 15, type: 'PERCENT', minOrder: 500, usageCount: 28, isActive: true },
    { id: '3', code: 'BIJNOREXPRESS', discount: 50, type: 'FLAT', minOrder: 400, usageCount: 9, isActive: false }
  ]);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('10');
  const [newMinOrder, setNewMinOrder] = useState('300');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const newC = {
      id: String(Date.now()),
      code: newCode.toUpperCase().trim(),
      discount: Number(newDiscount),
      type: 'PERCENT',
      minOrder: Number(newMinOrder),
      usageCount: 0,
      isActive: true
    };

    setCoupons([newC, ...coupons]);
    showToast(`Coupon ${newC.code} activated!`);
    setNewCode('');
  };

  const toggleCoupon = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
    showToast('Coupon removed');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Tag className="w-6 h-6 text-amber-400" />
          <span>Offers & Promo Coupons</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Configure discount coupons, VIP patron specials, and festive promo codes for Civil Lines, Bijnor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Create Coupon */}
        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Create New Promo Code</span>
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Promo Code</label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                placeholder="e.g. DIWALI20"
                className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-3 py-2 text-white font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Discount Value (%)</label>
              <input
                type="number"
                value={newDiscount}
                onChange={(e) => setNewDiscount(e.target.value)}
                placeholder="10"
                className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-semibold">Minimum Order Amount (₹)</label>
              <input
                type="number"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(e.target.value)}
                placeholder="300"
                className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black py-3 rounded-xl shadow-md text-xs uppercase tracking-wider cursor-pointer"
            >
              + Activate Coupon
            </button>
          </form>
        </div>

        {/* Right: Active Coupons List */}
        <div className="lg:col-span-2 bg-[#18181b] border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-neutral-800 bg-[#242429] text-xs font-bold text-white flex justify-between">
            <span>Active Store Coupons</span>
            <span className="text-neutral-400">{coupons.length} total</span>
          </div>

          <div className="divide-y divide-neutral-800">
            {coupons.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-amber-400 text-sm bg-amber-500/15 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                      {c.code}
                    </span>
                    <span className="font-bold text-white">
                      {c.discount}% OFF (Min ₹{c.minOrder})
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-1 block">
                    Used {c.usageCount} times by patrons
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCoupon(c.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                      c.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {c.isActive ? 'Active' : 'Paused'}
                  </button>
                  <button
                    onClick={() => deleteCoupon(c.id)}
                    className="text-neutral-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
