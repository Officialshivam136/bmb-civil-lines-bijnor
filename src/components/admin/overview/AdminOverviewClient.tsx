'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  IndianRupee, ShoppingBag, Clock, Users, ArrowRight, CheckCircle2, 
  ExternalLink, Plus, Ticket, Sparkles, QrCode, Box, Flame, 
  ChevronRight, AlertCircle, Check, X, Bell, TrendingUp, RefreshCw
} from 'lucide-react';
import { LiveOrder } from '@/lib/orderService';

interface AdminOverviewClientProps {
  initialOrders: LiveOrder[];
  initialMetrics: {
    todayRevenue: number;
    discountsGiven: number;
    ordersToday: number;
    cancelledToday: number;
    waitingApproval: number;
    avgOrderValue: number;
    totalCustomers: number;
    vipCustomers: number;
  };
}

export default function AdminOverviewClient({
  initialOrders,
  initialMetrics
}: AdminOverviewClientProps) {
  const [orders, setOrders] = useState<LiveOrder[]>(initialOrders);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [viewChartAsTable, setViewChartAsTable] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('BMBFESTIVE15');
  const [couponDiscount, setCouponDiscount] = useState('15');
  const [isSoldOutModalOpen, setIsSoldOutModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Royal Ruby Velvet');

  // Greeting based on current time
  const [greeting, setGreeting] = useState('Good evening');
  const [formattedDate, setFormattedDate] = useState('Saturday, 24 October');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    setFormattedDate(new Date().toLocaleDateString('en-IN', options));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Change order status action
  const handleUpdateStatus = async (orderId: string, newStatus: LiveOrder['status']) => {
    // Optimistic UI update
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    
    if (newStatus === 'PREPARING') {
      showToast(`Order approved! Moved to Kitchen & Preparing.`);
    } else if (newStatus === 'READY') {
      showToast(`Order marked READY! TV counter updated with audio chime.`);
    } else if (newStatus === 'DELIVERED') {
      showToast(`Order handed over to customer. Completed!`);
    }

    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('Status update error:', err);
    }
  };

  // 7-day revenue dataset
  const revenueChartData = [
    { day: 'Sun', amount: 0 },
    { day: 'Mon', amount: 0 },
    { day: 'Tue', amount: 0 },
    { day: 'Wed', amount: 0 },
    { day: 'Thu', amount: 0 },
    { day: 'Fri', amount: 0 },
    { day: 'Sat', amount: metrics.todayRevenue || 222 }
  ];

  // Active orders (pending, preparing, ready)
  const activeOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{greeting}, Developer</span>
            <span>🙏</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {formattedDate} • here&apos;s the shop today
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8c1824] to-[#a61c2b] hover:from-[#7a121d] hover:to-[#8c1824] text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg shadow-red-950/40 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-red-500/20"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Open orders board</span>
          </Link>
          <Link
            href="/tv"
            target="_blank"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/30 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all"
            title="Open TV counter display"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open TV Screen</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </Link>
        </div>
      </div>

      {/* 4 TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Today's Revenue */}
        <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold">
            <span className="text-amber-400 font-bold">₹</span>
            <span>today&apos;s revenue</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              ₹{metrics.todayRevenue}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            ₹{metrics.discountsGiven} discounts given
          </p>
        </div>

        {/* 2. Orders Today */}
        <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Orders today</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {metrics.ordersToday}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            {metrics.cancelledToday} cancelled
          </p>
        </div>

        {/* 3. Waiting Approval */}
        <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Waiting approval</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400 tracking-tight">
              {activeOrders.filter(o => o.status === 'PENDING').length}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Approve them on the board
          </p>
        </div>

        {/* 4. Average Order Value */}
        <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Average order</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              ₹{metrics.avgOrderValue}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            {metrics.totalCustomers} customers • {metrics.vipCustomers} VIP
          </p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Revenue Chart & Active Orders (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Revenue, last 7 days */}
          <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Revenue, last 7 days{' '}
                  <span className="text-xs font-normal text-neutral-400">
                    ₹{metrics.todayRevenue} from {metrics.ordersToday} orders
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setViewChartAsTable(!viewChartAsTable)}
                className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                {viewChartAsTable ? '▶ View as chart' : '▶ View as table'}
              </button>
            </div>

            {viewChartAsTable ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 text-[10px] uppercase">
                      <th className="py-2 px-3">Day</th>
                      <th className="py-2 px-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {revenueChartData.map((d) => (
                      <tr key={d.day}>
                        <td className="py-2 px-3 font-semibold">{d.day}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-amber-400">₹{d.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-48 w-full pt-4">
                <svg viewBox="0 0 700 180" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="40" y1="20" x2="680" y2="20" stroke="#27272a" strokeDasharray="3 3" />
                  <text x="15" y="24" fill="#71717a" fontSize="10" fontFamily="sans-serif">400</text>
                  
                  <line x1="40" y1="60" x2="680" y2="60" stroke="#27272a" strokeDasharray="3 3" />
                  <text x="15" y="64" fill="#71717a" fontSize="10" fontFamily="sans-serif">300</text>

                  <line x1="40" y1="100" x2="680" y2="100" stroke="#27272a" strokeDasharray="3 3" />
                  <text x="15" y="104" fill="#71717a" fontSize="10" fontFamily="sans-serif">200</text>

                  <line x1="40" y1="140" x2="680" y2="140" stroke="#27272a" strokeDasharray="3 3" />
                  <text x="15" y="144" fill="#71717a" fontSize="10" fontFamily="sans-serif">100</text>

                  <line x1="40" y1="170" x2="680" y2="170" stroke="#3f3f46" />
                  <text x="25" y="174" fill="#71717a" fontSize="10" fontFamily="sans-serif">0</text>

                  {/* Area fill */}
                  <polygon
                    points="60,170 150,170 240,170 330,170 420,170 510,170 600,170 660,80 660,170"
                    fill="url(#revenueGlow)"
                  />

                  {/* Glowing Blue Trendline */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="60,170 150,170 240,170 330,170 420,170 510,170 600,170 660,80"
                  />

                  {/* Peak Point on Saturday */}
                  <circle cx="660" cy="80" r="5" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />

                  {/* Day labels */}
                  {revenueChartData.map((d, idx) => (
                    <text
                      key={d.day}
                      x={60 + idx * 100}
                      y="188"
                      fill="#a1a1aa"
                      fontSize="11"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {d.day}
                    </text>
                  ))}
                </svg>
              </div>
            )}
          </div>

          {/* Active Orders (Newest First) */}
          <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Active orders</span>
                <span className="text-xs text-neutral-400 font-normal">newest first</span>
              </h3>
              <span className="text-xs text-amber-400 font-semibold">
                {activeOrders.length} live in shop
              </span>
            </div>

            <div className="space-y-3">
              {activeOrders.length === 0 ? (
                <div className="text-center py-10 text-neutral-500 text-xs">
                  All orders completed! No active orders in queue.
                </div>
              ) : (
                activeOrders.map((order) => {
                  return (
                    <div
                      key={order.id}
                      className="bg-[#242429] hover:bg-[#2b2b32] border border-neutral-800 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left side: Token, Order number, Badges, Customer */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-lg border border-amber-500/30">
                            #{order.tokenNumber}
                          </span>
                          <span className="text-xs font-bold text-white font-mono">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
                            • {order.customerName}
                            {order.isVip && <span title="VIP Patron">👑</span>}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
                          <span>{order.orderType === 'PICKUP' ? 'Pickup' : 'Delivery'}</span>
                          <span>•</span>
                          <span>{order.itemsSummary}</span>
                          <span>•</span>
                          <span>{order.timeAgo}</span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          {order.status === 'PENDING' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                              <span>Order received</span>
                            </span>
                          )}

                          {order.status === 'PREPARING' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              <span>Preparing</span>
                            </span>
                          )}

                          {order.status === 'READY' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Ready for pickup</span>
                            </span>
                          )}

                          {order.paymentStatus === 'VERIFY_REQUIRED' && (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                              UPI - verify
                            </span>
                          )}
                          {order.paymentStatus === 'PAID' && (
                            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">
                              At counter
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right side: Amount & 1-Click Progression Action */}
                      <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 border-neutral-800 pt-2 sm:pt-0">
                        <span className="text-base font-black text-white font-mono">
                          ₹{order.total}
                        </span>

                        {order.status === 'PENDING' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'PREPARING')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-1.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {order.status === 'PREPARING' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'READY')}
                            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-1.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>Mark ready</span>
                          </button>
                        )}

                        {order.status === 'READY' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-1.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Hand over</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions & Top Sellers (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Grid (2x3) */}
          <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white">Quick actions</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* 1. Live orders board */}
              <Link
                href="/admin/orders"
                className="bg-[#242429] hover:bg-[#2e2e34] border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral-200">Live orders board</span>
              </Link>

              {/* 2. Mark items sold out */}
              <button
                onClick={() => setIsSoldOutModalOpen(true)}
                className="bg-[#242429] hover:bg-[#2e2e34] border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2 transition-all group text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Box className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral-200">Mark items sold out</span>
              </button>

              {/* 3. Add a product */}
              <Link
                href="/admin/products/new"
                className="bg-[#242429] hover:bg-[#2e2e34] border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral-200">+ Add a product</span>
              </Link>

              {/* 4. Create a coupon */}
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="bg-[#242429] hover:bg-[#2e2e34] border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2 transition-all group text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Ticket className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral-200">Create a coupon</span>
              </button>

              {/* 5. Change theme */}
              <button
                onClick={() => setIsThemeModalOpen(true)}
                className="bg-[#242429] hover:bg-[#2e2e34] border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2 transition-all group text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral-200">Change theme</span>
              </button>

              {/* 6. Print QR stands */}
              <Link
                href="/admin/qr-stands"
                className="bg-[#242429] hover:bg-[#2e2e34] border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <QrCode className="w-4 h-4" />
                </div>
                <span className="font-semibold text-neutral-200">Print QR stands</span>
              </Link>
            </div>
          </div>

          {/* Top Sellers This Week */}
          <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Top sellers this week</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800/60">
                <span className="font-semibold text-neutral-200">Desi Ghee Jalebi</span>
                <span className="text-neutral-400 font-mono">
                  <strong className="text-white">₹100</strong> • 1 sold
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-neutral-800/60">
                <span className="font-semibold text-neutral-200">Desi Samosa</span>
                <span className="text-neutral-400 font-mono">
                  <strong className="text-white">₹66</strong> • 3 sold
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-200">Aloo Tikki Chaat</span>
                <span className="text-neutral-400 font-mono">
                  <strong className="text-white">₹60</strong> • 1 sold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK COUPON MODAL */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-neutral-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-sm">Create Shop Promo Coupon</h3>
              <button onClick={() => setIsCouponModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Coupon Code</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-3 py-2 text-white font-mono font-bold uppercase"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Discount Percentage (%)</label>
                <input
                  type="number"
                  value={couponDiscount}
                  onChange={(e) => setCouponDiscount(e.target.value)}
                  className="w-full bg-[#242429] border border-neutral-700 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(`Coupon ${couponCode} (${couponDiscount}% OFF) created!`);
                  setIsCouponModalOpen(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Save Coupon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK SOLD OUT MODAL */}
      {isSoldOutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-sm">Quick Inventory Status Switch</h3>
              <button onClick={() => setIsSoldOutModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-400">
              Easily toggle live stock status on your store during peak rush hours:
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
              {['Desi Samosa', 'Desi Ghee Jalebi', 'Kaju Katli', 'Motichoor Laddu', 'Special Milk Cake', 'Khaman Dhokla'].map((item) => (
                <div key={item} className="flex items-center justify-between bg-[#242429] p-3 rounded-xl border border-neutral-800">
                  <span className="font-bold text-white">{item}</span>
                  <Link 
                    href="/admin/products"
                    className="text-[11px] font-bold text-emerald-400 hover:underline"
                  >
                    Manage in Catalogue &rarr;
                  </Link>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-neutral-800 text-right">
              <button
                onClick={() => setIsSoldOutModalOpen(false)}
                className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK THEME MODAL */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-neutral-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-sm">Admin Portal Theme</h3>
              <button onClick={() => setIsThemeModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {['Royal Ruby Velvet (Default)', 'Imperial Dark Charcoal', 'Bikaner Golden Heritage'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTheme(t);
                    showToast(`Theme updated to ${t}`);
                    setIsThemeModalOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold transition-all flex items-center justify-between ${
                    selectedTheme.includes(t.split(' ')[0])
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'bg-[#242429] text-neutral-300 hover:bg-[#2b2b32]'
                  }`}
                >
                  <span>{t}</span>
                  {selectedTheme.includes(t.split(' ')[0]) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
