'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ChefHat, Clock, Flame, CheckCircle2, Bell, BellOff, 
  Volume2, Maximize, Minimize, RefreshCw, Sparkles, Check, 
  Store, AlertTriangle, ExternalLink, ArrowRight, Undo2, 
  Search, ShoppingBag, UtensilsCrossed
} from 'lucide-react';
import { LiveOrder } from '@/lib/orderService';
import { useAdminTheme } from '@/context/AdminThemeContext';

interface KitchenDisplayClientProps {
  initialOrders: LiveOrder[];
}

export default function KitchenDisplayClient({ initialOrders }: KitchenDisplayClientProps) {
  const { theme } = useAdminTheme();
  const [orders, setOrders] = useState<LiveOrder[]>(initialOrders);
  const [stationFilter, setStationFilter] = useState<'ALL' | 'MITHAI' | 'CHAAT' | 'BEVERAGES'>('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showCompleted, setShowCompleted] = useState(false);

  const knownOrderIdsRef = useRef<Set<string>>(new Set(initialOrders.map(o => o.id)));

  // Live Clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Web Audio Chimes
  const playChime = (type: 'new_ticket' | 'order_ready') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'new_ticket') {
        // High alert double ding
        const playTone = (freq: number, start: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + duration);
        };
        playTone(659.25, 0, 0.25); // E5
        playTone(880.00, 0.2, 0.45); // A5
      } else {
        // Ready bell chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      console.warn('Audio playback not permitted yet:', e);
    }
  };

  // Real-time live polling every 3s
  useEffect(() => {
    const pollLiveOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders/live', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.orders)) {
            const freshOrders: LiveOrder[] = data.orders;

            // Check for new incoming order
            const hasNew = freshOrders.some(o => !knownOrderIdsRef.current.has(o.id));
            if (hasNew) {
              playChime('new_ticket');
              showToast('🔔 New kitchen order received!');
              freshOrders.forEach(o => knownOrderIdsRef.current.add(o.id));
            }

            setOrders(freshOrders);
          }
        }
      } catch (err) {
        console.warn('KDS polling error:', err);
      }
    };

    const interval = setInterval(pollLiveOrders, 3000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Status transitions
  const handleUpdateStatus = async (orderId: string, newStatus: LiveOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    if (newStatus === 'PREPARING') {
      showToast('Order moved to Cooking / Preparing 👨‍🍳');
    } else if (newStatus === 'READY') {
      playChime('order_ready');
      showToast('Order marked READY! Broadcasted to TV Screen 🔔');
    } else if (newStatus === 'DELIVERED') {
      showToast('Order dispatched & completed ✓');
    }

    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('Failed status update:', err);
    }
  };

  // Toggle checklist item strike
  const toggleItemCheck = (orderId: string, itemIdx: number) => {
    const key = `${orderId}_${itemIdx}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute live elapsed time in minutes
  const getElapsedMinutes = (createdAt: Date | string) => {
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    return Math.max(0, Math.floor((now - created) / 60000));
  };

  // Filter orders by station and status
  const kitchenOrders = orders.filter(o => {
    if (showCompleted) {
      return o.status === 'DELIVERED';
    }
    const isKitchenActive = o.status === 'PENDING' || o.status === 'PREPARING' || o.status === 'READY';
    if (!isKitchenActive) return false;

    if (stationFilter === 'MITHAI') {
      return /jalebi|gulab|rasmalai|kaju|laddu|peda|barfi|halwa|mithai|ghee/i.test(o.itemsSummary);
    }
    if (stationFilter === 'CHAAT') {
      return /samosa|kachori|dhokla|pakora|chole|chaat|bhature|tikki/i.test(o.itemsSummary);
    }
    if (stationFilter === 'BEVERAGES') {
      return /lassi|chai|tea|coffee|thandai|shake|drink|water/i.test(o.itemsSummary);
    }
    return true;
  });

  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const preparingCount = orders.filter(o => o.status === 'PREPARING').length;
  const readyCount = orders.filter(o => o.status === 'READY').length;

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom duration-300 border ${
          theme === 'dark'
            ? 'bg-neutral-900 text-amber-300 border-amber-500/40'
            : 'bg-white text-amber-950 border-amber-300 shadow-xl'
        }`}>
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP KDS HEADER */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
        theme === 'dark' ? 'bg-[#18181b] border-neutral-800' : 'bg-white border-stone-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  Kitchen Display System (KDS)
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Halwai, Chaat & Sweets Dispatch Station • Civil Lines, Bijnor
              </p>
            </div>
          </div>

          {/* Clock & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Live Clock Display */}
            <div className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-mono text-xs font-black ${
              theme === 'dark' ? 'bg-[#111113] border-neutral-800 text-amber-400' : 'bg-stone-50 border-stone-200 text-amber-700'
            }`}>
              <Clock className="w-3.5 h-3.5 opacity-70" />
              <span>{currentTime || '00:00:00 PM'}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showToast(soundEnabled ? 'Kitchen chime muted' : 'Kitchen chime enabled 🔔');
              }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-emerald-400' : 'bg-stone-100 border-stone-200 text-emerald-600'
                  : theme === 'dark' ? 'bg-neutral-800/50 border-neutral-800 text-neutral-500' : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}
              title={soundEnabled ? 'Mute kitchen chimes' : 'Unmute kitchen chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                theme === 'dark' ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-stone-100 border-stone-200 hover:bg-stone-200'
              }`}
              title="Full Screen Kitchen Mode"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* TV Screen Link */}
            <Link
              href="/tv"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-500 hover:bg-amber-500/25 transition-all cursor-pointer"
              title="Open Public TV Customer Display"
            >
              <span>Customer TV</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* METRICS & SUMMARY COUNTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-neutral-800/60">
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[#111113] border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Waiting Prep</span>
              <span className="text-xl font-black text-amber-500">{pendingCount}</span>
            </div>
            <Flame className="w-5 h-5 text-amber-500/70" />
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[#111113] border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">In Kitchen</span>
              <span className="text-xl font-black text-sky-400">{preparingCount}</span>
            </div>
            <UtensilsCrossed className="w-5 h-5 text-sky-400/70" />
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[#111113] border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Ready for TV</span>
              <span className="text-xl font-black text-emerald-500">{readyCount}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-500/70" />
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[#111113] border-neutral-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Active Tickets</span>
              <span className="text-xl font-black">{pendingCount + preparingCount + readyCount}</span>
            </div>
            <ShoppingBag className="w-5 h-5 opacity-50" />
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-neutral-800/40 border border-neutral-700/50">
          <button
            onClick={() => { setStationFilter('ALL'); setShowCompleted(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !showCompleted && stationFilter === 'ALL'
                ? 'bg-[#8c1824] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Stations ({pendingCount + preparingCount + readyCount})
          </button>
          <button
            onClick={() => { setStationFilter('CHAAT'); setShowCompleted(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !showCompleted && stationFilter === 'CHAAT'
                ? 'bg-[#8c1824] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Chaat & Snacks 🥟
          </button>
          <button
            onClick={() => { setStationFilter('MITHAI'); setShowCompleted(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !showCompleted && stationFilter === 'MITHAI'
                ? 'bg-[#8c1824] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Mithai & Halwai 🍯
          </button>
          <button
            onClick={() => { setStationFilter('BEVERAGES'); setShowCompleted(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !showCompleted && stationFilter === 'BEVERAGES'
                ? 'bg-[#8c1824] text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Lassi & Beverages 🥤
          </button>
        </div>

        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            showCompleted
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : theme === 'dark' ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white' : 'bg-stone-100 border-stone-200 text-stone-700'
          }`}
        >
          {showCompleted ? '← Back to Active Tickets' : 'View Dispatched / Done ✓'}
        </button>
      </div>

      {/* KITCHEN TICKETS GRID */}
      {kitchenOrders.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${
          theme === 'dark' ? 'bg-[#18181b] border-neutral-800' : 'bg-white border-stone-200'
        }`}>
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black">Kitchen Order Queue is Clear</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
            {showCompleted
              ? 'No completed orders recorded today.'
              : 'All pending sweets, chaats, and samosa orders have been prepared and dispatched.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {kitchenOrders.map((order) => {
            const elapsedMins = getElapsedMinutes(order.createdAt);
            const isUrgent = elapsedMins >= 20;
            const isMedium = elapsedMins >= 10 && elapsedMins < 20;

            // Parse items list from summary
            const itemsList = order.itemsSummary.split(',').map(s => s.trim()).filter(Boolean);

            return (
              <div
                key={order.id}
                className={`rounded-2xl border-2 flex flex-col justify-between overflow-hidden transition-all shadow-md ${
                  order.status === 'READY'
                    ? 'border-emerald-500 shadow-emerald-950/20 bg-emerald-950/10'
                    : order.status === 'PREPARING'
                    ? 'border-sky-500 shadow-sky-950/20 bg-sky-950/10'
                    : isUrgent
                    ? 'border-red-500 shadow-red-950/30 animate-pulse'
                    : theme === 'dark'
                    ? 'border-neutral-800 bg-[#18181b]'
                    : 'border-stone-200 bg-white'
                }`}
              >
                {/* TICKET TOP HEADER */}
                <div className={`p-4 border-b ${
                  order.status === 'READY'
                    ? 'bg-emerald-500/15 border-emerald-500/30'
                    : order.status === 'PREPARING'
                    ? 'bg-sky-500/15 border-sky-500/30'
                    : isUrgent
                    ? 'bg-red-500/20 border-red-500/40'
                    : theme === 'dark'
                    ? 'bg-neutral-800/50 border-neutral-800'
                    : 'bg-stone-50 border-stone-200'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    {/* Big Token Number */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                        TOKEN #
                      </span>
                      <span className="text-3xl font-black tracking-tight text-amber-500 block leading-none">
                        #{order.tokenNumber < 10 ? `0${order.tokenNumber}` : order.tokenNumber}
                      </span>
                    </div>

                    {/* Elapsed Timer & Order Type */}
                    <div className="text-right space-y-1">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                        isUrgent
                          ? 'bg-red-500 text-white animate-bounce'
                          : isMedium
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{elapsedMins}m ago</span>
                      </div>
                      <span className={`block text-[10px] font-bold uppercase tracking-wider ${
                        order.orderType === 'DINE_IN' ? 'text-purple-400' : 'text-amber-400'
                      }`}>
                        {order.orderType.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Customer & Order Reference */}
                  <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                    <span className="font-extrabold truncate">{order.customerName}</span>
                    <span className="font-mono text-[11px] opacity-60 font-semibold">{order.orderNumber}</span>
                  </div>
                </div>

                {/* TICKET ITEMS CHECKLIST */}
                <div className="p-4 flex-1 space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                    ITEMS TO PREPARE ({itemsList.length})
                  </span>
                  <div className="space-y-2">
                    {itemsList.map((item, idx) => {
                      const itemKey = `${order.id}_${idx}`;
                      const isChecked = Boolean(checkedItems[itemKey]);

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleItemCheck(order.id, idx)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                            isChecked
                              ? 'bg-emerald-500/10 border-emerald-500/30 line-through opacity-60'
                              : theme === 'dark'
                              ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                              : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-neutral-500'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs font-bold leading-snug">
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* TICKET FOOTER ACTIONS */}
                <div className={`p-3.5 border-t ${
                  theme === 'dark' ? 'bg-[#141416] border-neutral-800' : 'bg-stone-50 border-stone-200'
                }`}>
                  {order.status === 'PENDING' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'PREPARING')}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Start Preparing</span>
                    </button>
                  )}

                  {order.status === 'PREPARING' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'READY')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Mark Ready (Chime TV)</span>
                    </button>
                  )}

                  {order.status === 'READY' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
                      className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-emerald-500/40 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Hand Over / Dispatched</span>
                    </button>
                  )}

                  {order.status === 'DELIVERED' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'READY')}
                      className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Recall Ticket</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
