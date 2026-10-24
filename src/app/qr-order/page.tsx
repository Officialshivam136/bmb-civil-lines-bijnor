'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Store, Truck, UtensilsCrossed, Smartphone, Phone, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import BMBLogo from '@/components/common/BMBLogo';

function QROrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableNumber, setTableNumber] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const table = searchParams.get('table');
    if (table) {
      setTableNumber(table);
      sessionStorage.setItem('bmb_table_no', table);
    }
  }, [searchParams]);

  const handleSelectPickup = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bmb_order_mode', 'pickup');
      if (tableNumber) {
        sessionStorage.setItem('bmb_table_no', tableNumber);
      }
    }
    router.push('/menu?mode=pickup');
  };

  const handleSelectDelivery = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bmb_order_mode', 'delivery');
      sessionStorage.removeItem('bmb_table_no');
    }
    router.push('/menu?mode=delivery');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/40 via-surface to-background py-8 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-background border border-border rounded-3xl shadow-xl p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary via-accent to-primary" />

        {/* Brand Crest */}
        <div className="flex justify-center mb-4">
          <BMBLogo size="lg" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Civil Lines, Bijnor • Instant Digital Counter</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-foreground mb-2">
          Welcome to BMB Misthan Bhandar
        </h1>
        <p className="text-xs sm:text-sm text-foreground/70 mb-6 leading-relaxed">
          Skip the billing queue! Browse our fresh sweets & savouries, place your order on your phone, and collect at the counter or get it delivered.
        </p>

        {/* Order Mode Cards */}
        <div className="space-y-3.5 text-left mb-6">
          {/* Option 1: Counter Pickup / Handover */}
          <button
            onClick={handleSelectPickup}
            className="w-full p-4 rounded-2xl border-2 border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-foreground">Counter Pickup / Handover</span>
                  <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">Fastest</span>
                </div>
                <p className="text-xs text-foreground/60 mt-0.5">
                  Order now & collect freshly packed from Civil Lines counter
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Option 2: Dine-In Table Order */}
          <div className="p-4 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3.5 mb-2.5">
              <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xs shrink-0">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="font-extrabold text-sm text-foreground">Sitting at Table? Dine-In</span>
                <p className="text-xs text-foreground/60 mt-0.5">
                  Enter your table number and we will serve to you
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Table # (e.g. 3)"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-28 px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-bold outline-none focus:border-primary text-center"
              />
              <button
                onClick={handleSelectPickup}
                className="flex-1 bg-foreground text-background hover:bg-primary hover:text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Order for Table {tableNumber || '#'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Option 3: Doorstep Delivery */}
          <button
            onClick={handleSelectDelivery}
            className="w-full p-4 rounded-2xl border border-border hover:border-primary bg-surface hover:bg-primary/5 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 text-white flex items-center justify-center shadow-xs shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-foreground">Doorstep Delivery in Bijnor</span>
                <p className="text-xs text-foreground/60 mt-0.5">
                  Hot samosas & sweets delivered right to your home/office
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>

        {/* Android App & Phone Bar */}
        <div className="pt-4 border-t border-border flex flex-col gap-2.5 text-xs">
          <a
            href="/bmb-misthan-bijnor.apk"
            download="bmb-misthan-bijnor.apk"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent/20 text-accent-foreground font-bold hover:bg-accent/30 transition-colors"
          >
            <Smartphone className="w-4 h-4 text-primary" />
            <span>Install BMB Android App (One-Click APK)</span>
          </a>

          <div className="flex items-center justify-center gap-2 text-foreground/60 pt-1">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>Counter Help: </span>
            <a href="tel:+918979164646" className="font-bold text-foreground hover:underline">
              +91 89791 64646
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QROrderLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-foreground/60">Loading counter...</div>}>
      <QROrderContent />
    </Suspense>
  );
}

