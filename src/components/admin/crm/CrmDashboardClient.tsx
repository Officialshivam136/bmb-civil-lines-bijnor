'use client';

import React, { useState, useMemo } from 'react';
import { CustomerProfile, CrmStats } from '@/lib/crmService';
import { 
  Users, Crown, TrendingUp, IndianRupee, Clock, Search, 
  MessageSquare, Sparkles, Send, Filter, ChevronRight, 
  ExternalLink, ShoppingBag, MapPin, Phone, Calendar, ArrowUpDown, X
} from 'lucide-react';

interface Props {
  initialCustomers: CustomerProfile[];
  stats: CrmStats;
}

type FilterTab = 'ALL' | 'VIP' | 'ACTIVE' | 'LAPSED' | 'NEW';
type SortBy = 'SPEND' | 'ORDERS' | 'RECENT' | 'INACTIVE';

export default function CrmDashboardClient({ initialCustomers, stats }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('ALL');
  const [sortBy, setSortBy] = useState<SortBy>('SPEND');
  
  // Selected customer for detailed view drawer
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  // Selected customer and template for WhatsApp campaign modal
  const [campaignModal, setCampaignModal] = useState<{
    customer: CustomerProfile;
    template: 'vip' | 'sunday' | 'festival' | 'winback';
  } | null>(null);

  // Filter & Sort customers
  const filteredCustomers = useMemo(() => {
    let result = [...initialCustomers];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.area.toLowerCase().includes(q)
      );
    }

    // Segment filter tab
    if (filterTab === 'VIP') {
      result = result.filter((c) => c.isVip);
    } else if (filterTab === 'ACTIVE') {
      result = result.filter((c) => c.status === 'ACTIVE' || c.status === 'VIP');
    } else if (filterTab === 'LAPSED') {
      result = result.filter((c) => c.daysSinceLastOrder > 30 && c.totalOrders > 0);
    } else if (filterTab === 'NEW') {
      result = result.filter((c) => c.totalOrders === 1);
    }

    // Sort order
    if (sortBy === 'SPEND') {
      result.sort((a, b) => b.totalSpend - a.totalSpend);
    } else if (sortBy === 'ORDERS') {
      result.sort((a, b) => b.totalOrders - a.totalOrders);
    } else if (sortBy === 'RECENT') {
      result.sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime());
    } else if (sortBy === 'INACTIVE') {
      result.sort((a, b) => b.daysSinceLastOrder - a.daysSinceLastOrder);
    }

    return result;
  }, [initialCustomers, searchQuery, filterTab, sortBy]);

  // Generate WhatsApp message based on template
  const getWhatsAppMessage = (customer: CustomerProfile, template: 'vip' | 'sunday' | 'festival' | 'winback') => {
    const greetingName = customer.name && customer.name !== 'Valued Patron' ? `${customer.name} ji` : 'ji';
    const storeUrl = 'https://bmb-civil-lines-bijnor.vercel.app/#menu';

    switch (template) {
      case 'vip':
        return `Namaste ${greetingName}! 🙏✨\n\nAs one of our most valued *VIP Patrons* at *Bikaner Misthan Bhandar (BMB), Civil Lines*, you enjoy an exclusive flat *10% OFF* on all authentic pure desi ghee mithai and savouries today!\n\n👑 *Your VIP Status:* Active (${customer.monthlyOrders} monthly orders)\n📦 *Order online or counter takeaway:* ${storeUrl}\n\nWarm regards,\nBikaner Misthan Bhandar, Civil Lines, Bijnor\n📞 +91 89791 64646`;

      case 'sunday':
        return `Namaste ${greetingName}! ☀️🥮\n\nFresh, piping hot *Desi Samosas, Khaman Dhokla & Crispy Jalebis* are frying right now at *BMB Civil Lines, Bijnor*!\n\nTreat your family this morning with pure desi ghee freshness.\n🛵 *Instant Express Delivery / Counter Pickup:* ${storeUrl}\n\nCall/WhatsApp: +91 89791 64646`;

      case 'festival':
        return `Namaste ${greetingName}! 🎁🎉\n\nCelebrations are sweeter with BMB! Booking for *Custom Mithai Gift Trays & Premium Kaju Katli / Dry Fruit Boxes* is now open for family events and festivals at *BMB Civil Lines*.\n\n✨ Pre-order early to reserve freshest festival batches:\n👉 ${storeUrl}\n\nBikaner Misthan Bhandar, Civil Lines, Bijnor`;

      case 'winback':
        return `Namaste ${greetingName}! 🙏\n\nWe missed seeing you at *Bikaner Misthan Bhandar, Civil Lines*! It's been ${customer.daysSinceLastOrder} days since your last order.\n\nHere is a special *10% Welcome Back Discount* for your next sweet craving.\n👉 *Order fresh sweets here:* ${storeUrl}\n\nAlways fresh & pure desi ghee!`;
    }
  };

  const openWhatsApp = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-600" />
            <span>Patron CRM & WhatsApp Loyalty Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 mt-1">
            Track repeat customer frequency, manage VIP tiers ($\ge 2$ orders/month), and launch 1-click personalized WhatsApp promotions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-500/10 text-amber-700 font-bold px-3 py-1.5 rounded-full border border-amber-500/20 flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>{stats.vipCustomers} Active VIP Patrons</span>
          </span>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Patrons</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{stats.totalCustomers}</div>
          <div className="text-[10px] text-foreground/60 mt-1">Unique phone numbers</div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">VIP Patrons</span>
            <Crown className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{stats.vipCustomers}</div>
          <div className="text-[10px] text-amber-700/80 mt-1">$\ge 2$ orders this month (10% OFF)</div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Repeat Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{stats.repeatCustomerRate}%</div>
          <div className="text-[10px] text-foreground/60 mt-1">$\ge 2$ lifetime orders</div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total LTV Spend</span>
            <IndianRupee className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-primary">₹{stats.totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-foreground/60 mt-1">Avg ₹{stats.averageLtv} / patron</div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-foreground/60 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lapsed Patrons</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">{stats.lapsedCustomers}</div>
          <div className="text-[10px] text-rose-600/80 mt-1">No order in &gt; 30 days</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface border border-border p-4 sm:p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patron name, phone or area..."
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-foreground/50 shrink-0" />
            <span className="text-xs font-semibold text-foreground/70 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="bg-background border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground outline-none cursor-pointer"
            >
              <option value="SPEND">Highest Spend (₹ LTV)</option>
              <option value="ORDERS">Most Orders Count</option>
              <option value="RECENT">Recently Visited</option>
              <option value="INACTIVE">Longest Inactive (Win-back)</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50 text-xs">
          <button
            type="button"
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'ALL'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-background hover:bg-primary/5 text-foreground/70'
            }`}
          >
            All Patrons ({initialCustomers.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('VIP')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterTab === 'VIP'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-background hover:bg-amber-500/10 text-amber-700'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>VIP Patrons ({stats.vipCustomers})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('ACTIVE')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'ACTIVE'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-background hover:bg-emerald-500/10 text-emerald-700'
            }`}
          >
            Active &le; 30 Days ({stats.activeCustomers})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('LAPSED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'LAPSED'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-background hover:bg-rose-500/10 text-rose-700'
            }`}
          >
            Lapsed / At Risk ({stats.lapsedCustomers})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('NEW')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterTab === 'NEW'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-background hover:bg-slate-500/10 text-slate-700'
            }`}
          >
            New Patrons (1 Order)
          </button>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-surface border border-border rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/80 text-[11px] font-bold text-foreground/60 uppercase tracking-wider border-b border-border">
                <th className="py-3.5 px-4">Patron Details</th>
                <th className="py-3.5 px-4">Loyalty Status</th>
                <th className="py-3.5 px-4">Order Frequency</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Top Sweet Pick</th>
                <th className="py-3.5 px-4">Last Ordered</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-foreground/50">
                    No patrons found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const initial = (customer.name || 'P')[0].toUpperCase();
                  const isRecent = customer.daysSinceLastOrder <= 7;

                  return (
                    <tr 
                      key={customer.phone} 
                      className="hover:bg-primary/5 transition-colors cursor-pointer group"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      {/* Name & Phone */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                            customer.isVip
                              ? 'bg-amber-500 text-white'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {customer.isVip ? '👑' : initial}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors block">
                              {customer.name}
                            </span>
                            <span className="text-[11px] text-foreground/60 flex items-center gap-1 font-mono">
                              <Phone className="w-3 h-3 text-foreground/40" />
                              +91 {customer.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Loyalty Badge */}
                      <td className="py-3.5 px-4">
                        {customer.isVip ? (
                          <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[11px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                            <Crown className="w-3 h-3 text-amber-600" />
                            <span>VIP Patron (10% OFF)</span>
                          </span>
                        ) : customer.daysSinceLastOrder <= 30 ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                            <span>● Active Regular</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                            <span>○ Inactive ({customer.daysSinceLastOrder}d)</span>
                          </span>
                        )}
                      </td>

                      {/* Frequency */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-extrabold text-foreground text-xs block">
                            {customer.totalOrders} {customer.totalOrders === 1 ? 'order' : 'orders'}
                          </span>
                          <span className="text-[10px] text-foreground/60">
                            {customer.monthlyOrders} in past 30 days
                          </span>
                        </div>
                      </td>

                      {/* Spend */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-black text-sm text-emerald-700 block">
                            ₹{customer.totalSpend.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-foreground/50">
                            Avg ₹{customer.avgOrderValue}
                          </span>
                        </div>
                      </td>

                      {/* Favorite item */}
                      <td className="py-3.5 px-4">
                        {customer.favoriteItems[0] ? (
                          <span className="bg-background border border-border/80 text-foreground/80 px-2.5 py-1 rounded-lg text-[11px] font-medium inline-block max-w-[140px] truncate" title={customer.favoriteItems[0].name}>
                            {customer.favoriteItems[0].name} ({customer.favoriteItems[0].count}x)
                          </span>
                        ) : (
                          <span className="text-foreground/40 text-[11px]">N/A</span>
                        )}
                      </td>

                      {/* Last order date */}
                      <td className="py-3.5 px-4 text-foreground/70">
                        {customer.totalOrders > 0 ? (
                          <div>
                            <span className={`text-[11px] font-semibold block ${isRecent ? 'text-emerald-700 font-bold' : ''}`}>
                              {customer.daysSinceLastOrder === 0
                                ? 'Today'
                                : customer.daysSinceLastOrder === 1
                                ? 'Yesterday'
                                : `${customer.daysSinceLastOrder} days ago`}
                            </span>
                            <span className="text-[10px] text-foreground/50 font-mono">
                              {new Date(customer.lastOrderDate).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-foreground/40 text-[11px]">No orders</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setCampaignModal({ customer, template: customer.isVip ? 'vip' : 'sunday' })}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                            title="Send WhatsApp Promotion Offer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-1.5 rounded-lg bg-background hover:bg-primary/10 text-foreground/70 hover:text-primary border border-border transition-colors cursor-pointer"
                            title="View Patron History"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detailed Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#7A1C1C] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-md ${
                  selectedCustomer.isVip
                    ? 'bg-amber-400 text-amber-900'
                    : 'bg-white/10 text-white'
                }`}>
                  {selectedCustomer.isVip ? '👑' : selectedCustomer.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{selectedCustomer.name}</h3>
                    {selectedCustomer.isVip && (
                      <span className="bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                        VIP PATRON
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">
                    +91 {selectedCustomer.phone} • {selectedCustomer.area}, {selectedCustomer.city}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800">
              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Spend (LTV)</span>
                  <span className="text-lg font-black text-emerald-700">₹{selectedCustomer.totalSpend}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lifetime Orders</span>
                  <span className="text-lg font-black text-slate-900">{selectedCustomer.totalOrders}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Monthly Orders</span>
                  <span className="text-lg font-black text-amber-700">{selectedCustomer.monthlyOrders} / 2 for VIP</span>
                </div>
              </div>

              {/* Favorite Sweets */}
              {selectedCustomer.favoriteItems.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Favorite Sweets & Chaat
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.favoriteItems.map((fav) => (
                      <span key={fav.name} className="bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{fav.name}</span>
                        <strong className="text-amber-700">({fav.count}x)</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Order History */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Order History ({selectedCustomer.orderHistory.length})
                </h4>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {selectedCustomer.orderHistory.map((order) => (
                    <div key={order.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            order.status === 'CONFIRMED' || order.status === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {order.orderType === 'PICKUP' ? '🏬 Takeaway' : '🛵 Delivery'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 truncate max-w-sm">
                          {order.itemNames.join(', ')} ({order.itemsCount} items)
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-black text-slate-900 block">₹{order.total}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp Campaign Dispatch Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const cust = selectedCustomer;
                    setSelectedCustomer(null);
                    setCampaignModal({ customer: cust, template: cust.isVip ? 'vip' : 'sunday' });
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Launch WhatsApp Offer to {selectedCustomer.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Campaign Modal */}
      {campaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-emerald-700 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Send WhatsApp Offer</h3>
                  <p className="text-[11px] text-white/80">To: {campaignModal.customer.name} (+91 {campaignModal.customer.phone})</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCampaignModal(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Campaign Selector & Preview */}
            <div className="p-5 space-y-4 text-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Choose Campaign Template:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'vip', label: '👑 VIP Appreciation (10%)' },
                    { id: 'sunday', label: '☀️ Sunday Samosa Special' },
                    { id: 'festival', label: '🎁 Festive Gift Boxes' },
                    { id: 'winback', label: '💌 We Miss You Discount' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setCampaignModal({ ...campaignModal, template: tpl.id as any })}
                      className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                        campaignModal.template === tpl.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600/20'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Preview (via WhatsApp):
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono whitespace-pre-wrap text-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                  {getWhatsAppMessage(campaignModal.customer, campaignModal.template)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCampaignModal(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const msg = getWhatsAppMessage(campaignModal.customer, campaignModal.template);
                    openWhatsApp(campaignModal.customer.phone, msg);
                    setCampaignModal(null);
                  }}
                  className="flex-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open WhatsApp & Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
