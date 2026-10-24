'use client';

import { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Volume2, VolumeX, Store, ShoppingBag, Utensils, Sparkles } from 'lucide-react';
import { TvDisplayOrder } from '@/lib/orderService';

interface TvDisplayClientProps {
  initialReceived: TvDisplayOrder[];
  initialPreparing: TvDisplayOrder[];
  initialReady: TvDisplayOrder[];
}

export default function TvDisplayClient({
  initialReceived,
  initialPreparing,
  initialReady
}: TvDisplayClientProps) {
  const [received, setReceived] = useState<TvDisplayOrder[]>(initialReceived);
  const [preparing, setPreparing] = useState<TvDisplayOrder[]>(initialPreparing);
  const [ready, setReady] = useState<TvDisplayOrder[]>(initialReady);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  const prevReadyCountRef = useRef(initialReady.length);
  const prevReadyIdsRef = useRef<Set<string>>(new Set(initialReady.map(r => r.id)));

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Chime synthesizer for TV bell sound
  const playChime = () => {
    if (!isAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Dual-tone chime (E5 -> A5)
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      playTone(659.25, 0, 0.4);  // E5
      playTone(880.00, 0.18, 0.7); // A5
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  };

  // Real-time live polling every 3 seconds for instant TV sync
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/tv/orders', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            const newReady: TvDisplayOrder[] = json.data.ready || [];
            
            // Check if any new order entered "Ready for pickup"
            const currentReadyIds = new Set(newReady.map(r => r.id));
            let hasNewReadyOrder = false;
            for (const r of newReady) {
              if (!prevReadyIdsRef.current.has(r.id)) {
                hasNewReadyOrder = true;
                break;
              }
            }

            if (hasNewReadyOrder && newReady.length > prevReadyCountRef.current) {
              playChime();
            }

            prevReadyCountRef.current = newReady.length;
            prevReadyIdsRef.current = currentReadyIds;

            setReceived(json.data.received || []);
            setPreparing(json.data.preparing || []);
            setReady(newReady);
          }
        }
      } catch (err) {
        console.warn('TV polling error:', err);
      }
    };

    const pollInterval = setInterval(fetchOrders, 3000);
    return () => clearInterval(pollInterval);
  }, [isAudioEnabled]);

  // Fullscreen toggle for TV browsers
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.warn);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.warn);
    }
  };

  return (
    <div className="min-h-screen bg-[#111113] text-white flex flex-col justify-between select-none font-sans overflow-x-hidden">
      {/* TOP ROYAL TV HEADER */}
      <header className="bg-gradient-to-r from-[#4d0c15] via-[#5e121b] to-[#4d0c15] border-b-2 border-[#C5A059]/40 px-6 md:px-12 py-4 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-white drop-shadow-md">
              Bikaner Misthan Bhandar
            </h1>
            <span className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-[#E5C158] block mt-0.5">
              ORDER STATUS
            </span>
          </div>
        </div>

        {/* Right TV Controls & Live Clock */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              setIsAudioEnabled(!isAudioEnabled);
              if (!isAudioEnabled) playChime();
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-black/30 hover:bg-black/50 text-[#E5C158] border border-[#C5A059]/30 transition-all cursor-pointer"
            title={isAudioEnabled ? 'Mute announcement chime' : 'Enable announcement chime'}
          >
            {isAudioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-neutral-400" />}
          </button>

          {/* Fullscreen Kiosk Mode */}
          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-xl bg-black/30 hover:bg-black/50 text-[#E5C158] border border-[#C5A059]/30 transition-all cursor-pointer"
            title="Toggle TV Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Live Pulsing Clock */}
          <div className="flex items-center gap-2.5 bg-black/40 border border-[#C5A059]/30 px-4 py-2 rounded-2xl shadow-inner">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wider font-mono">
              {currentTime || '...'}
            </span>
          </div>
        </div>
      </header>

      {/* 3 COLUMN ORDER KDS BOARD */}
      <main className="flex-1 p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 max-w-[1920px] mx-auto w-full">
        {/* COLUMN 1: Order received */}
        <div className="bg-[#18181c] border border-neutral-800 rounded-3xl p-5 md:p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80">
            <h2 className="text-xl md:text-2xl font-serif font-black text-[#fca5a5] flex items-center gap-2">
              <span>Order received</span>
            </h2>
            <span className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-200 text-sm font-black flex items-center justify-center border border-neutral-700">
              {received.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
            {received.length === 0 ? (
              <div className="col-span-2 py-16 text-center text-neutral-600 text-sm font-semibold">
                No orders waiting
              </div>
            ) : (
              received.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#242429] hover:bg-[#2b2b32] border border-neutral-700/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg transition-all"
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                    {order.tokenNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-300 mt-1 truncate max-w-[140px]">
                    {order.customerName}
                  </span>
                  <div className="mt-2 text-[10px] text-neutral-400 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <Store className="w-3 h-3 text-neutral-400" />
                    <span>Pickup</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 2: Preparing */}
        <div className="bg-[#18181c] border border-neutral-800 rounded-3xl p-5 md:p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80">
            <h2 className="text-xl md:text-2xl font-serif font-black text-[#fef08a] flex items-center gap-2">
              <span>Preparing</span>
            </h2>
            <span className="w-9 h-9 rounded-full bg-neutral-800 text-amber-300 text-sm font-black flex items-center justify-center border border-neutral-700">
              {preparing.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
            {preparing.length === 0 ? (
              <div className="col-span-2 py-16 text-center text-neutral-600 text-sm font-semibold">
                No items currently in preparation
              </div>
            ) : (
              preparing.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#242429] border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 animate-pulse" />
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                    {order.tokenNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-200 mt-1 truncate max-w-[140px]">
                    {order.customerName}
                  </span>
                  <div className="mt-2 text-[10px] text-amber-300/70 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <Utensils className="w-3 h-3 text-amber-400" />
                    <span>In Kitchen</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMN 3: Ready for pickup (Highlighted Emerald Glow) */}
        <div className="bg-gradient-to-b from-[#0d2315] via-[#0f2a1a] to-[#0d2315] border-2 border-emerald-500/60 rounded-3xl p-5 md:p-6 flex flex-col shadow-2xl shadow-emerald-950/50">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/30">
            <h2 className="text-xl md:text-2xl font-serif font-black text-emerald-400 flex items-center gap-2">
              <span>Ready for pickup</span>
            </h2>
            <span className="w-9 h-9 rounded-full bg-emerald-500 text-neutral-950 text-sm font-black flex items-center justify-center shadow-md">
              {ready.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 flex-1">
            {ready.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center h-48 text-emerald-500/50 text-sm font-medium">
                <Sparkles className="w-8 h-8 mb-2 opacity-40 text-emerald-400" />
                <span>Ready orders appear here</span>
              </div>
            ) : (
              ready.map((order) => (
                <div
                  key={order.id}
                  className="bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl animate-in zoom-in-95 duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none" />
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black text-emerald-300 tracking-tight">
                    {order.tokenNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1 truncate max-w-[140px]">
                    {order.customerName}
                  </span>
                  <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1 font-black uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span>● Please Collect</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* BOTTOM TICKER BANNER (Bilingual English & Hindi) */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-3.5 px-6 text-center">
        <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-300 tracking-wide">
          Please collect your order when your token is shown in <strong className="text-emerald-400 font-bold">Ready</strong> • आपका टोकन <strong className="text-emerald-400 font-bold">&quot;Ready&quot;</strong> में दिखे तब ऑर्डर लें
        </p>
      </footer>
    </div>
  );
}
