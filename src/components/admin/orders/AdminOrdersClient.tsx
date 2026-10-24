'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Check, Bell, CheckCircle2, Clock, 
  Tv, ExternalLink, Search, Filter, Store, Truck, Phone, IndianRupee
} from 'lucide-react';
import { LiveOrder } from '@/lib/orderService';

interface AdminOrdersClientProps {
  initialOrders: LiveOrder[];
}

export default function AdminOrdersClient({ initialOrders }: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<LiveOrder[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED'>('ALL');
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Real-time polling every 3 seconds for live order queue
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders/live', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.orders) {
            setOrders(json.orders);
          }
        }
      } catch (err) {
        console.warn('Orders board live sync error:', err);
      }
    };

    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId: string, status: LiveOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order status updated to ${status}`);

    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn('Status change error:', err);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesTab = activeTab === 'ALL' || o.status === activeTab;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.itemsSummary.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>Orders Board & Kitchen Queue</span>
            <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
              Live TV Sync Active
            </span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage incoming takeaway and delivery orders. Moving status to &quot;Ready&quot; automatically announces the token on the Smart TV screen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tv"
            target="_blank"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
          >
            <Tv className="w-4 h-4" />
            <span>Launch TV Order Status</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/pos"
            className="inline-flex items-center gap-2 bg-[#242429] hover:bg-[#2e2e34] border border-neutral-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all"
          >
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>+ Counter POS</span>
          </Link>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-[#18181b] border border-neutral-800 p-4 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'ALL', label: 'All Orders', count: orders.length },
              { id: 'PENDING', label: 'Order Received', count: orders.filter(o => o.status === 'PENDING').length },
              { id: 'PREPARING', label: 'Preparing', count: orders.filter(o => o.status === 'PREPARING').length },
              { id: 'READY', label: 'Ready for Pickup', count: orders.filter(o => o.status === 'READY').length },
              { id: 'DELIVERED', label: 'Completed', count: orders.filter(o => o.status === 'DELIVERED').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'bg-[#242429] text-neutral-400 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search token, customer or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#242429] border border-neutral-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#18181b] border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#242429] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                <th className="py-3 px-4">Token & ID</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Order Items Summary</th>
                <th className="py-3 px-4">Type & Pay</th>
                <th className="py-3 px-4">Status on TV</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No orders match this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-[#202025] transition-colors">
                    {/* Token */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono font-black text-sm flex items-center justify-center shrink-0">
                          #{order.tokenNumber}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{order.orderNumber}</span>
                          <span className="text-[10px] text-neutral-400">{order.timeAgo}</span>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-neutral-200 block">{order.customerName}</span>
                      {order.customerPhone && (
                        <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-neutral-500" />
                          <span>{order.customerPhone}</span>
                        </span>
                      )}
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-medium text-neutral-300 block line-clamp-1">{order.itemsSummary}</span>
                      <span className="text-amber-400 font-bold font-mono text-[11px]">Total: ₹{order.total}</span>
                    </td>

                    {/* Type & Payment */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                          {order.orderType === 'PICKUP' ? <Store className="w-3 h-3 text-amber-400" /> : <Truck className="w-3 h-3 text-blue-400" />}
                          <span>{order.orderType}</span>
                        </span>
                        <div>
                          <span className="text-[10px] font-semibold text-neutral-400">
                            {order.paymentMethod} • {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* TV Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {order.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 rounded-full">
                          <span>● Order received</span>
                        </span>
                      )}
                      {order.status === 'PREPARING' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
                          <span>● Preparing</span>
                        </span>
                      )}
                      {order.status === 'READY' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                          <span>● Ready for pickup</span>
                        </span>
                      )}
                      {order.status === 'DELIVERED' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full">
                          <span>✓ Collected</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {order.status === 'PENDING' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'PREPARING')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {order.status === 'PREPARING' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'READY')}
                            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === 'READY' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            Hand Over
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
