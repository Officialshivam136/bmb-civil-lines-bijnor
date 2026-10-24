'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, ShoppingBag, IndianRupee, Clock, Package, 
  Tag, TrendingUp, Users, FileText, Store, Palette, 
  UserCheck, Tv, QrCode, Cpu, Terminal, ExternalLink, 
  Bell, Sun, Sparkles, Menu, X, LogOut, CheckCircle2
} from 'lucide-react';
import BMBLogo from '@/components/common/BMBLogo';

interface AdminLayoutShellProps {
  adminName: string;
  adminEmail: string;
  children: React.ReactNode;
}

export default function AdminLayoutShell({
  adminName,
  adminEmail,
  children
}: AdminLayoutShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTakingOrders, setIsTakingOrders] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      window.location.href = '/admin/login';
    }
  };

  const handleToggleOrders = () => {
    const nextState = !isTakingOrders;
    setIsTakingOrders(nextState);
    showToast(nextState ? 'Store is now taking live orders!' : 'Store orders paused for rush hour.');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return pathname === '/admin';
    return pathname?.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#111113] text-neutral-100 flex overflow-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs" 
        />
      )}

      {/* SIDEBAR: Rich Royal Burgundy/Ruby velvet */}
      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#5c0f19] via-[#480c14] to-[#2c070c] border-r border-[#8c1824]/40 flex flex-col justify-between transition-transform duration-300 shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header with BMB Monogram Crest */}
        <div className="p-5 border-b border-[#8c1824]/50 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#5c0f19] flex items-center justify-center font-black text-amber-300 text-xs">
                BMB
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm block text-white tracking-tight leading-tight">
                Bikaner Misthan
              </span>
              <span className="font-extrabold text-sm block text-white tracking-tight leading-tight">
                Bhandar
              </span>
              <span className="text-[9px] font-black tracking-[0.2em] uppercase text-amber-400/90 block mt-0.5">
                DASHBOARD
              </span>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 text-xs font-semibold custom-scrollbar">
          {/* 1. RUN THE SHOP */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/50 block mb-1.5">
              RUN THE SHOP
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home className="w-4 h-4 text-amber-300/80" />
                <span>Overview</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/orders')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-amber-300/80" />
                  <span>Orders</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">
                  2
                </span>
              </Link>

              <Link
                href="/admin/pos"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/pos')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <IndianRupee className="w-4 h-4 text-amber-300/80" />
                <span>POS billing</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  pathname === '/admin/kitchen'
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-300/80" />
                <span>Kitchen & Queue</span>
              </Link>

              <Link
                href="/admin/products"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/products')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4 text-amber-300/80" />
                <span>Products & Stock</span>
              </Link>
            </div>
          </div>

          {/* 2. GROW */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/50 block mb-1.5">
              GROW
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/coupons"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/coupons')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Tag className="w-4 h-4 text-amber-300/80" />
                <span>Offers & Coupons</span>
              </Link>

              <Link
                href="/admin/analytics"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/analytics')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-amber-300/80" />
                <span>Analytics</span>
              </Link>

              <Link
                href="/admin/crm"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/crm')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4 text-amber-300/80" />
                <span>Customers</span>
              </Link>

              <Link
                href="/admin/sales"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/sales')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-300/80" />
                <span>Sales Reports</span>
              </Link>
            </div>
          </div>

          {/* 3. MANAGE */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/50 block mb-1.5">
              MANAGE
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/settings')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Store className="w-4 h-4 text-amber-300/80" />
                <span>Store & Payments</span>
              </Link>

              <Link
                href="/admin/theme"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/theme')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Palette className="w-4 h-4 text-amber-300/80" />
                <span>Theme & Look</span>
              </Link>

              <Link
                href="/admin/team"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/team')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserCheck className="w-4 h-4 text-amber-300/80" />
                <span>Team & Roles</span>
              </Link>

              {/* TV ORDER DISPLAY (Direct Smart TV Screen Link) */}
              <Link
                href="/tv"
                target="_blank"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                  isActive('/tv') || isActive('/admin/tv')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-300">TV Order Display</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300/70" />
              </Link>

              <Link
                href="/admin/qr-stands"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/qr-stands')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <QrCode className="w-4 h-4 text-amber-300/80" />
                <span>QR Stands</span>
              </Link>
            </div>
          </div>

          {/* 4. SYSTEM */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/50 block mb-1.5">
              SYSTEM
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/integrations"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/integrations')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="w-4 h-4 text-amber-300/80" />
                <span>Integrations</span>
              </Link>

              <Link
                href="/admin/dev-tools"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/dev-tools')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Terminal className="w-4 h-4 text-amber-300/80" />
                <span>Developer Tools</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Link: View Shop */}
        <div className="p-3 border-t border-[#8c1824]/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-all"
          >
            <span>View shop</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP BAR */}
        <header className="h-16 bg-[#161619] border-b border-neutral-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          {/* Left: Mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline-block text-xs font-bold text-neutral-400">
              Civil Lines, Bijnor • Estd. 1995
            </span>
          </div>

          {/* Right: Store Status, Bell, Theme, Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Taking orders live toggle */}
            <button
              onClick={handleToggleOrders}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isTakingOrders
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
              }`}
              title="Click to toggle store taking orders status"
            >
              <span className={`w-2 h-2 rounded-full ${isTakingOrders ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'}`} />
              <span className="hidden sm:inline">
                {isTakingOrders ? 'Taking orders' : 'Orders paused'}
              </span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-black text-[9px] flex items-center justify-center">
                  2
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-[#1c1c20] border border-neutral-700 rounded-2xl p-4 shadow-2xl z-50 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800 font-bold text-white">
                    <span>Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-neutral-400 hover:text-white">✕</button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-neutral-800/60 rounded-xl">
                      <span className="font-bold text-amber-400 block">New Order #BMB-001005</span>
                      <span className="text-[11px] text-neutral-300">Desi Samosa (1 pc) • ₹20 (UPI)</span>
                    </div>
                    <div className="p-2 bg-neutral-800/60 rounded-xl">
                      <span className="font-bold text-amber-400 block">TV Counter Active</span>
                      <span className="text-[11px] text-neutral-300">Smart TV display synchronized.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Icon */}
            <Link
              href="/admin/theme"
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 transition-all cursor-pointer"
              title="Theme settings"
            >
              <Sparkles className="w-4 h-4" />
            </Link>

            {/* User Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-amber-600 text-neutral-950 font-black text-xs flex items-center justify-center">
                  D
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <span className="font-bold text-white block leading-tight">Developer</span>
                  <span className="text-[10px] text-neutral-400 block leading-tight">Developer</span>
                </div>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1c1c20] border border-neutral-700 rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1">
                  <div className="p-2.5 border-b border-neutral-800">
                    <p className="font-bold text-white">{adminName}</p>
                    <p className="text-[11px] text-neutral-400">{adminEmail}</p>
                  </div>
                  <Link
                    href="/tv"
                    target="_blank"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-800 text-neutral-200"
                  >
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>TV Order Status</span>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-800 text-neutral-200"
                  >
                    <Store className="w-4 h-4 text-neutral-400" />
                    <span>Shop Settings</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-red-500/20 text-red-400 text-left font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
