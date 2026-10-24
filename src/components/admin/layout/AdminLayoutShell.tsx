'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, ShoppingBag, IndianRupee, Clock, Package, 
  Tag, TrendingUp, Users, FileText, Store, Palette, 
  UserCheck, Tv, QrCode, Cpu, Terminal, ExternalLink, 
  Bell, Sun, Moon, Sparkles, Menu, X, LogOut, CheckCircle2
} from 'lucide-react';
import { AdminThemeProvider, useAdminTheme } from '@/context/AdminThemeContext';

interface AdminLayoutShellProps {
  adminName: string;
  adminEmail: string;
  children: React.ReactNode;
}

function AdminLayoutInner({
  adminName,
  adminEmail,
  children
}: AdminLayoutShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, setTheme } = useAdminTheme();
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
    <div className={`min-h-screen flex overflow-hidden transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#111113] text-neutral-100' : 'bg-[#f8f6f0] text-stone-900'
    }`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom duration-300 ${
          theme === 'dark'
            ? 'bg-neutral-900 text-amber-300 border border-amber-500/40'
            : 'bg-white text-amber-900 border border-amber-300 shadow-amber-900/10'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
        fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#5c0f19] via-[#480c14] to-[#2c070c] border-r border-[#8c1824]/40 flex flex-col justify-between transition-transform duration-300 shadow-2xl shrink-0
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
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/60 block mb-1.5">
              RUN THE SHOP
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-4 h-4 text-amber-300/90" />
                <span>Overview</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/orders')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-amber-300/90" />
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
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <IndianRupee className="w-4 h-4 text-amber-300/90" />
                <span>Counter POS Billing</span>
              </Link>

              <Link
                href="/admin/kds"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/kds')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-300/90" />
                <span>Kitchen Display (KDS)</span>
              </Link>

              <Link
                href="/admin/products"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/products')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Package className="w-4 h-4 text-amber-300/90" />
                <span>Catalogue & Stock</span>
              </Link>
            </div>
          </div>

          {/* 2. GROW */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/60 block mb-1.5">
              GROW
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/coupons"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/coupons')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Tag className="w-4 h-4 text-amber-300/90" />
                <span>Offers & Coupons</span>
              </Link>

              <Link
                href="/admin/analytics"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/analytics')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-amber-300/90" />
                <span>Analytics</span>
              </Link>

              <Link
                href="/admin/crm"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/crm')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4 text-amber-300/90" />
                <span>Customers</span>
              </Link>

              <Link
                href="/admin/sales"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/sales')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-300/90" />
                <span>Sales Reports</span>
              </Link>
            </div>
          </div>

          {/* 3. MANAGE */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/60 block mb-1.5">
              MANAGE
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/settings')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Store className="w-4 h-4 text-amber-300/90" />
                <span>Store & Payments</span>
              </Link>

              <Link
                href="/admin/theme"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/theme')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Palette className="w-4 h-4 text-amber-300/90" />
                <span>Theme & Look</span>
              </Link>

              <Link
                href="/admin/team"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/team')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <UserCheck className="w-4 h-4 text-amber-300/90" />
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
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
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
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <QrCode className="w-4 h-4 text-amber-300/90" />
                <span>QR Stands</span>
              </Link>
            </div>
          </div>

          {/* 4. SYSTEM */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-200/60 block mb-1.5">
              SYSTEM
            </span>
            <div className="space-y-0.5">
              <Link
                href="/admin/integrations"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/integrations')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Cpu className="w-4 h-4 text-amber-300/90" />
                <span>Integrations</span>
              </Link>

              <Link
                href="/admin/dev-tools"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive('/admin/dev-tools')
                    ? 'bg-[#8c1824] text-white font-bold shadow-md'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Terminal className="w-4 h-4 text-amber-300/90" />
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
            className="flex items-center justify-between px-3 py-2 rounded-xl text-rose-100/90 hover:text-white hover:bg-white/10 text-xs font-bold transition-all"
          >
            <span>View shop</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP BAR */}
        <header className={`h-16 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-[#161619] border-b border-neutral-800' 
            : 'bg-white border-b border-stone-200 shadow-xs'
        }`}>
          {/* Left: Mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-xl ${
                theme === 'dark' ? 'bg-neutral-800 text-neutral-300 hover:text-white' : 'bg-stone-100 text-stone-700 hover:text-stone-900'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className={`hidden sm:inline-block text-xs font-bold ${
              theme === 'dark' ? 'text-neutral-400' : 'text-stone-500'
            }`}>
              Civil Lines, Bijnor • Estd. 1995
            </span>
          </div>

          {/* Right: Store Status, Theme Switcher, Bell, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Taking orders live toggle */}
            <button
              onClick={handleToggleOrders}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isTakingOrders
                  ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500/25'
                  : theme === 'dark' 
                    ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
                    : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
              }`}
              title="Click to toggle store taking orders status"
            >
              <span className={`w-2 h-2 rounded-full ${isTakingOrders ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
              <span className="hidden sm:inline">
                {isTakingOrders ? 'Taking orders' : 'Orders paused'}
              </span>
            </button>

            {/* 1-Click Dark/Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                theme === 'dark'
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 border border-neutral-700'
                  : 'bg-stone-100 hover:bg-stone-200 text-amber-600 hover:text-amber-700 border border-stone-200'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle dark/light theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline text-[11px] font-bold text-neutral-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-700" />
                  <span className="hidden md:inline text-[11px] font-bold text-stone-700">Dark</span>
                </>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl transition-all relative cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-black text-[9px] flex items-center justify-center">
                  2
                </span>
              </button>

              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-72 rounded-2xl p-4 shadow-2xl z-50 space-y-2 text-xs border ${
                  theme === 'dark'
                    ? 'bg-[#1c1c20] border-neutral-700 text-neutral-200'
                    : 'bg-white border-stone-200 text-stone-800 shadow-xl'
                }`}>
                  <div className={`flex items-center justify-between pb-2 border-b font-bold ${
                    theme === 'dark' ? 'border-neutral-800 text-white' : 'border-stone-100 text-stone-900'
                  }`}>
                    <span>Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-neutral-400 hover:text-white">✕</button>
                  </div>
                  <div className="space-y-2">
                    <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800/60' : 'bg-stone-50 border border-stone-100'}`}>
                      <span className="font-bold text-amber-600 dark:text-amber-400 block">New Order #BMB-001005</span>
                      <span className={`text-[11px] ${theme === 'dark' ? 'text-neutral-300' : 'text-stone-600'}`}>Desi Samosa (1 pc) • ₹20 (UPI)</span>
                    </div>
                    <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-neutral-800/60' : 'bg-stone-50 border border-stone-100'}`}>
                      <span className="font-bold text-amber-600 dark:text-amber-400 block">TV Counter Active</span>
                      <span className={`text-[11px] ${theme === 'dark' ? 'text-neutral-300' : 'text-stone-600'}`}>Smart TV display synchronized.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Settings Shortcut */}
            <Link
              href="/admin/theme"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 border border-neutral-700'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-amber-700 border border-stone-200'
              }`}
              title="Full Theme & Look Customizer"
            >
              <Palette className="w-4 h-4" />
            </Link>

            {/* User Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl transition-all cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700'
                    : 'bg-stone-100 hover:bg-stone-200 border-stone-200'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-amber-600 text-neutral-950 font-black text-xs flex items-center justify-center">
                  B
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <span className={`font-bold block leading-tight ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>
                    {adminName.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] block leading-tight ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-500'}`}>
                    Admin
                  </span>
                </div>
              </button>

              {showUserDropdown && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1 border ${
                  theme === 'dark'
                    ? 'bg-[#1c1c20] border-neutral-700 text-neutral-200'
                    : 'bg-white border-stone-200 text-stone-800 shadow-xl'
                }`}>
                  <div className={`p-2.5 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-stone-100'}`}>
                    <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{adminName}</p>
                    <p className={`text-[11px] truncate ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-500'}`}>{adminEmail}</p>
                  </div>

                  {/* Theme Mode Toggle inside Dropdown */}
                  <div className={`p-2 rounded-xl my-1 ${theme === 'dark' ? 'bg-neutral-800/60' : 'bg-stone-50 border border-stone-100'}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-bold text-[11px] ${theme === 'dark' ? 'text-neutral-300' : 'text-stone-700'}`}>Theme Mode</span>
                      <span className="text-[10px] text-amber-500 uppercase font-black">{theme}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`py-1.5 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-amber-500 text-neutral-950 shadow-xs'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`py-1.5 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          theme === 'light'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>Light</span>
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/tv"
                    target="_blank"
                    className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${
                      theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <Tv className="w-4 h-4 text-amber-500" />
                    <span>TV Order Status</span>
                  </Link>

                  <Link
                    href="/admin/settings"
                    className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${
                      theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <Store className="w-4 h-4 text-neutral-400" />
                    <span>Shop Settings</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-red-500/15 text-red-500 text-left font-bold cursor-pointer transition-colors"
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

export default function AdminLayoutShell(props: AdminLayoutShellProps) {
  return (
    <AdminThemeProvider>
      <AdminLayoutInner {...props} />
    </AdminThemeProvider>
  );
}
