'use client';

import { useState } from 'react';
import { Store, Phone, MapPin, IndianRupee, Save, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [shopName, setShopName] = useState('Bikaner Misthan Bhandar');
  const [tagline, setTagline] = useState('Bikaner Misthan Bhandar, Established 1995');
  const [phone, setPhone] = useState('+91 89791 64646');
  const [whatsapp, setWhatsapp] = useState('+91 89791 64646');
  const [address, setAddress] = useState('1101, Civil Lines, opposite Classic Bar, Punjabi Colony, Nai Basti, Bijnor, Uttar Pradesh 246701');
  const [minOrder, setMinOrder] = useState('100');
  const [deliveryFee, setDeliveryFee] = useState('20');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Shop & Payment settings updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Store className="w-6 h-6 text-amber-400" />
          <span>Shop Profile & Payment Configuration</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Manage store branding, Civil Lines address, WhatsApp alert number, and delivery zones.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#18181b] border border-neutral-800 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-neutral-400 mb-1.5 font-bold">Shop Brand Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-white font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1.5 font-bold">Heritage Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-white font-semibold"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1.5 font-bold">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-white font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1.5 font-bold">WhatsApp Alert Destination</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-amber-400 font-bold"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-neutral-400 mb-1.5 font-bold">Store Physical Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-white font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1.5 font-bold">Minimum Delivery Order (₹)</label>
            <input
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1.5 font-bold">Standard Bijnor Delivery Fee (₹)</label>
            <input
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-4 py-2.5 text-white font-bold"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Shop Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
