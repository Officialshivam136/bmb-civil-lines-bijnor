'use client';

import React, { useState } from 'react';
import QRCodeGenerator from '@/components/qr/QRCodeGenerator';
import BMBLogo from '@/components/common/BMBLogo';
import { Printer, QrCode, Store, UtensilsCrossed, Smartphone, Sparkles, Copy, Check } from 'lucide-react';

export default function AdminQRStandsPage() {
  const [standType, setStandType] = useState<'counter' | 'table' | 'delivery' | 'app'>('counter');
  const [tableNo, setTableNo] = useState('1');
  const [baseUrl, setBaseUrl] = useState('http://192.168.1.20:3000');
  const [copied, setCopied] = useState(false);

  // Compute Target URL based on selected stand type
  let targetUrl = baseUrl;
  if (standType === 'counter') {
    targetUrl = `${baseUrl}/qr-order?source=counter_qr&mode=pickup`;
  } else if (standType === 'table') {
    targetUrl = `${baseUrl}/qr-order?source=table_qr&table=${tableNo}&mode=pickup`;
  } else if (standType === 'delivery') {
    targetUrl = `${baseUrl}/menu?source=box_flyer&mode=delivery`;
  } else if (standType === 'app') {
    targetUrl = `${baseUrl}/bmb-misthan-bijnor.apk`;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Non-Printable Configuration Section */}
      <div className="print:hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
              <QrCode className="w-6 h-6 text-primary" />
              <span>BMB QR Stand & Counter Tent Generator</span>
            </h1>
            <p className="text-xs sm:text-sm text-foreground/70 mt-1">
              Print counter stands and table tent cards for Bikaner Misthan Bhandar, Civil Lines, Bijnor.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee / Tent</span>
          </button>
        </div>

        {/* Configuration Controls */}
        <div className="bg-surface border border-border p-6 rounded-2xl shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
            1. Select Stand Type
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setStandType('counter')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                standType === 'counter'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border bg-background text-foreground/80 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold">Counter Order Stand</span>
              </div>
              <p className="text-[11px] text-foreground/60">For billing & delivery counter</p>
            </button>

            <button
              type="button"
              onClick={() => setStandType('table')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                standType === 'table'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border bg-background text-foreground/80 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <UtensilsCrossed className="w-4 h-4 text-accent-foreground" />
                <span className="text-xs font-bold">Dine-in Table Tent</span>
              </div>
              <p className="text-[11px] text-foreground/60">Includes custom Table #</p>
            </button>

            <button
              type="button"
              onClick={() => setStandType('delivery')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                standType === 'delivery'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border bg-background text-foreground/80 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold">Mithai Box / Flyer QR</span>
              </div>
              <p className="text-[11px] text-foreground/60">For home delivery inserts</p>
            </button>

            <button
              type="button"
              onClick={() => setStandType('app')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                standType === 'app'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                  : 'border-border bg-background text-foreground/80 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">Android APK App Stand</span>
              </div>
              <p className="text-[11px] text-foreground/60">Direct APK download</p>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                Base Website URL / Server IP
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="http://192.168.1.20:3000 or your domain"
                className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs outline-none focus:border-primary"
              />
              <span className="text-[10px] text-foreground/50 mt-1 block">
                Use your local Wi-Fi IP (e.g. 192.168.1.20:3000) for testing on mobile, or your live domain when deployed.
              </span>
            </div>

            {standType === 'table' && (
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Table Number
                </label>
                <input
                  type="text"
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  placeholder="e.g. 1, 2, 3..."
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-xs outline-none focus:border-primary font-bold"
                />
              </div>
            )}
          </div>

          {/* Target URL Preview */}
          <div className="p-3 bg-background border border-border rounded-xl flex items-center justify-between text-xs">
            <span className="text-foreground/70 truncate mr-2">
              <strong className="text-foreground">Encoded QR Destination: </strong>
              <code className="text-primary font-mono">{targetUrl}</code>
            </span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Standee Design Card */}
      <div className="flex justify-center">
        <div className="w-[380px] sm:w-[420px] bg-white border-4 border-[#7A1C1C] rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden print:w-[100%] print:border-4 print:shadow-none print:m-0">
          {/* Ornate Gold Border Accent */}
          <div className="absolute inset-1.5 border-2 border-dashed border-[#C5A059] rounded-2xl pointer-events-none" />

          {/* Shop Crest Logo */}
          <div className="relative z-10 flex justify-center mb-3">
            <BMBLogo size="lg" />
          </div>

          <div className="relative z-10 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#7A1C1C] bg-amber-50 px-3 py-1 rounded-full border border-[#C5A059]/40">
              Civil Lines • Bijnor (U.P.)
            </span>
          </div>

          {/* Heading depending on type */}
          <div className="relative z-10 my-3">
            {standType === 'counter' && (
              <>
                <h2 className="text-xl font-black text-[#1A1A1A]">SCAN TO ORDER & PAY</h2>
                <p className="text-xs font-semibold text-[#7A1C1C] mt-0.5">Instant Counter Pickup • Skip The Queue</p>
              </>
            )}

            {standType === 'table' && (
              <>
                <div className="inline-block bg-[#7A1C1C] text-white px-3 py-0.5 rounded-lg text-xs font-black mb-1">
                  TABLE #{tableNo}
                </div>
                <h2 className="text-xl font-black text-[#1A1A1A]">SCAN FOR DIGITAL MENU</h2>
                <p className="text-xs font-semibold text-[#7A1C1C] mt-0.5">Order Sweets & Snacks Right To Your Table</p>
              </>
            )}

            {standType === 'delivery' && (
              <>
                <h2 className="text-xl font-black text-[#1A1A1A]">ORDER FRESH MITHAI</h2>
                <p className="text-xs font-semibold text-[#7A1C1C] mt-0.5">Desi Ghee Sweets Delivered to Your Door</p>
              </>
            )}

            {standType === 'app' && (
              <>
                <h2 className="text-xl font-black text-[#1A1A1A]">DOWNLOAD BMB APP</h2>
                <p className="text-xs font-semibold text-[#7A1C1C] mt-0.5">Exclusive 10% Off on Mobile App Orders</p>
              </>
            )}
          </div>

          {/* QR Code Container with Gold Framing */}
          <div className="relative z-10 my-4 flex justify-center">
            <div className="p-3 bg-white border-2 border-[#C5A059] rounded-2xl shadow-inner">
              <QRCodeGenerator value={targetUrl} size={220} />
            </div>
          </div>

          {/* Instructions */}
          <div className="relative z-10 text-[11px] text-neutral-600 font-medium space-y-1 mb-4">
            <p className="font-bold text-[#1A1A1A]">Open Camera or Paytm / PhonePe / Google Lens</p>
            <p>Scan QR code ➔ Select Sweets ➔ Pay Online or At Counter</p>
          </div>

          {/* Contact Details */}
          <div className="relative z-10 pt-3 border-t border-dashed border-[#C5A059] text-[10px] text-neutral-700">
            <p className="font-extrabold text-[#7A1C1C]">BIKANER MISTHAN BHANDAR</p>
            <p>Civil Lines (Opp. Classic Bar), Bijnor • 📞 +91 89791 64646</p>
            <p className="text-[9px] text-neutral-400 mt-1">Open 10:00 AM – 10:00 PM Daily</p>
          </div>
        </div>
      </div>
    </div>
  );
}
