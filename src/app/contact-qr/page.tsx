'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCodeGenerator from '@/components/qr/QRCodeGenerator';
import BMBLogo from '@/components/common/BMBLogo';
import { QrCode, Sparkles, Store, ShieldCheck, MessageSquare, ArrowRight, Phone, MapPin, Printer } from 'lucide-react';

export default function ContactQRPage() {
  const [baseUrl, setBaseUrl] = useState('https://bmb-civil-lines-bijnor.vercel.app');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const qrUrl = `${baseUrl}/#menu?source=contact_qr&mode=pickup`;

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Official Store Contact & Instant Order QR</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
        Bikaner Misthan Bhandar — Contact QR
      </h1>
      <p className="text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto mb-8 leading-relaxed">
        Scan this QR code with any smartphone camera, Google Lens, Paytm, or PhonePe to browse our sweets, order without login, pay via Razorpay / UPI, and receive an instant tax invoice on your WhatsApp.
      </p>

      {/* Printable Royal QR Stand Frame */}
      <div className="bg-white border-4 border-[#7A1C1C] rounded-3xl p-6 sm:p-8 shadow-xl text-center max-w-md mx-auto relative overflow-hidden mb-8">
        {/* Gold Border Accent */}
        <div className="absolute inset-1.5 border-2 border-dashed border-[#C5A059] rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex justify-center mb-3">
          <BMBLogo size="lg" />
        </div>

        <div className="relative z-10 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#7A1C1C] bg-amber-50 px-3 py-1 rounded-full border border-[#C5A059]/40">
            Civil Lines • Bijnor (U.P.) • Established 1995
          </span>
        </div>

        <div className="relative z-10 my-3">
          <h2 className="text-xl font-black text-[#1A1A1A]">SCAN TO ORDER & PAY</h2>
          <p className="text-xs font-semibold text-[#7A1C1C] mt-0.5">
            Instant WhatsApp Invoice • Zero Sign-Up Needed
          </p>
        </div>

        {/* QR Code Container */}
        <div className="relative z-10 my-4 flex justify-center">
          <div className="p-3.5 bg-white border-2 border-[#C5A059] rounded-2xl shadow-inner inline-block">
            <QRCodeGenerator value={qrUrl} size={220} />
          </div>
        </div>

        {/* Step-by-Step Scan Instructions */}
        <div className="relative z-10 text-[11px] text-neutral-600 font-medium space-y-1 mb-4">
          <p className="font-bold text-[#1A1A1A]">Open Camera / Google Lens / Paytm / PhonePe</p>
          <p>1. Scan QR ➔ 2. Select Sweets ➔ 3. Pay Online via Razorpay UPI / Cash</p>
          <p className="text-green-700 font-bold">📲 Tax Invoice sent automatically to your WhatsApp</p>
        </div>

        {/* Contact Strip */}
        <div className="relative z-10 pt-3 border-t border-dashed border-[#C5A059] text-[10px] text-neutral-700 space-y-0.5">
          <p className="font-extrabold text-[#7A1C1C]">BIKANER MISTHAN BHANDAR</p>
          <p>Opposite Classic Bar, Civil Lines, Bijnor • 📞 +91 89791 64646</p>
          <p className="text-[9px] text-neutral-400">Open Daily: 10:00 AM – 10:00 PM</p>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-8 text-xs">
        <div className="p-4 rounded-2xl bg-surface border border-border">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-2">
            ⚡
          </div>
          <span className="font-bold text-foreground block text-sm mb-1">No Login Needed</span>
          <p className="text-foreground/70">
            Customers add sweets directly to cart without creating accounts or passwords.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface border border-border">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-foreground block text-sm mb-1">Razorpay / UPI</span>
          <p className="text-foreground/70">
            Pay safely with GPay, PhonePe, Paytm, Cards, or choose Cash at Counter.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface border border-border">
          <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold mb-2">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="font-bold text-foreground block text-sm mb-1">WhatsApp Invoice</span>
          <p className="text-foreground/70">
            Enter WhatsApp number at checkout to receive the itemized bill & pickup token.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href="/#menu?source=contact_qr&mode=pickup"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-black py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <span>Simulate QR Scan & Order Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface hover:bg-background border border-border text-foreground font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-primary" />
          <span>Print Counter QR Stand</span>
        </button>
      </div>
    </div>
  );
}
