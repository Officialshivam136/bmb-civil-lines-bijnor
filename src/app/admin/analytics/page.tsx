import { TrendingUp, Users, ShoppingBag, IndianRupee, ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-400" />
          <span>Sales & Storefront Analytics</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Detailed metrics on daily sweet sales, customer retention, and peak ordering hours for Civil Lines, Bijnor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl">
          <span className="text-xs text-neutral-400 font-semibold block">Weekly Sales</span>
          <span className="text-2xl font-black text-white mt-1 block">₹12,480</span>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last week
          </span>
        </div>
        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl">
          <span className="text-xs text-neutral-400 font-semibold block">Total Orders</span>
          <span className="text-2xl font-black text-white mt-1 block">48 Orders</span>
          <span className="text-[11px] text-neutral-400 mt-1 block">Average 7 orders / day</span>
        </div>
        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl">
          <span className="text-xs text-neutral-400 font-semibold block">VIP Patrons</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">16 Patrons</span>
          <span className="text-[11px] text-amber-300/80 mt-1 block">Qualify for flat 10% OFF</span>
        </div>
        <div className="bg-[#18181b] border border-neutral-800 p-5 rounded-2xl">
          <span className="text-xs text-neutral-400 font-semibold block">Peak Hour</span>
          <span className="text-2xl font-black text-white mt-1 block">5 PM - 8 PM</span>
          <span className="text-[11px] text-neutral-400 mt-1 block">Evening snack rush</span>
        </div>
      </div>

      {/* Category Sales Breakdown */}
      <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-white text-sm">Delicacy Category Popularity</h3>
        <div className="space-y-3">
          {[
            { name: 'Traditional Mithai (Jalebi, Rasgulla, Gulab Jamun)', pct: 42, rev: '₹5,240', color: 'bg-amber-500' },
            { name: 'Snacks & Chaat (Desi Samosa, Dhokla, Tikki)', pct: 28, rev: '₹3,490', color: 'bg-emerald-500' },
            { name: 'Kaju & Dry Fruit Sweets (Kaju Katli, Anjeer Roll)', pct: 18, rev: '₹2,240', color: 'bg-purple-500' },
            { name: 'Barfi & Milk Sweets (Milk Cake, Bikaneri Peda)', pct: 12, rev: '₹1,510', color: 'bg-blue-500' }
          ].map(c => (
            <div key={c.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-neutral-200">{c.name}</span>
                <span className="font-mono text-neutral-400">{c.rev} ({c.pct}%)</span>
              </div>
              <div className="h-2 w-full bg-[#242429] rounded-full overflow-hidden">
                <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
