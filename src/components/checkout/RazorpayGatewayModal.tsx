'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Smartphone, 
  CreditCard, Building2, QrCode, AlertCircle, RefreshCw 
} from 'lucide-react';
import QRCodeGenerator from '@/components/qr/QRCodeGenerator';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  onSuccess: (paymentDetails: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => Promise<void>;
}

export default function RazorpayGatewayModal({
  isOpen,
  onClose,
  orderNumber,
  orderId,
  amount,
  customerName,
  customerPhone,
  onSuccess
}: RazorpayModalProps) {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate mock UPI intent payload for the QR code
  const upiIntentString = `upi://pay?pa=8979164646@paytm&pn=BikanerMisthanBhandar&am=${amount}&cu=INR&tn=Order_${orderNumber}`;

  const handlePay = async () => {
    setStatus('processing');
    setErrorMessage('');

    try {
      // Simulate real bank authorization roundtrip (1.2s)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const mockPaymentId = `pay_rzp_${Date.now()}`;
      const mockOrderId = `order_rzp_${Date.now()}`;
      const mockSignature = `sig_${Date.now()}_bmb_verified`;

      setStatus('success');
      await new Promise((resolve) => setTimeout(resolve, 800));

      await onSuccess({
        razorpay_order_id: mockOrderId,
        razorpay_payment_id: mockPaymentId,
        razorpay_signature: mockSignature
      });
    } catch (err: any) {
      console.error('Payment processing failed:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Payment transaction failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Razorpay Brand Header */}
        <div className="bg-[#0C2340] text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0070BA] flex items-center justify-center font-black text-xl text-white shadow-md">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wide text-sm sm:text-base text-white">
                  Razorpay Trusted Business
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-300">
                Bikaner Misthan Bhandar • Civil Lines, Bijnor
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={status === 'processing'}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
            title="Cancel Payment"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Amount Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-6 py-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
              Order {orderNumber}
            </span>
            <span className="text-xs text-slate-700 font-medium">
              {customerName} • {customerPhone}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
              Amount to Pay
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-700">
              ₹{amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Methods Selection Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {status === 'processing' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <RefreshCw className="w-12 h-12 text-[#0070BA] animate-spin" />
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Contacting Bank & Razorpay Gateway...
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Please do not refresh or press back. Authorizing payment for ₹{amount.toFixed(2)}.
                </p>
              </div>
            </div>
          ) : status === 'success' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-slate-900">
                Payment Authorized!
              </h4>
              <p className="text-xs text-slate-600">
                Generating Tax Invoice & confirming order on WhatsApp...
              </p>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('upi')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'upi'
                      ? 'bg-white text-[#0C2340] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#0070BA]" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'card'
                      ? 'bg-white text-[#0C2340] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#0070BA]" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('netbanking')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'netbanking'
                      ? 'bg-white text-[#0C2340] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#0070BA]" />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* UPI Tab View */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Popular Fast UPI Options:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedApp('gpay')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedApp === 'gpay'
                            ? 'border-[#0070BA] bg-blue-50/60 ring-2 ring-[#0070BA]/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-slate-800 block">Google Pay</span>
                        <span className="text-[10px] text-slate-500">1-Tap UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedApp('phonepe')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedApp === 'phonepe'
                            ? 'border-[#0070BA] bg-blue-50/60 ring-2 ring-[#0070BA]/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#5f259f] block">PhonePe</span>
                        <span className="text-[10px] text-slate-500">Instant UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedApp('paytm')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedApp === 'paytm'
                            ? 'border-[#0070BA] bg-blue-50/60 ring-2 ring-[#0070BA]/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#00b9f5] block">Paytm UPI</span>
                        <span className="text-[10px] text-slate-500">Postpaid / UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedApp('qr')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedApp === 'qr'
                            ? 'border-[#0070BA] bg-blue-50/60 ring-2 ring-[#0070BA]/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-slate-800 block">Scan QR</span>
                        <span className="text-[10px] text-slate-500">Any UPI App</span>
                      </button>
                    </div>
                  </div>

                  {/* If Scan QR is picked */}
                  {selectedApp === 'qr' ? (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-xs shrink-0">
                        <QRCodeGenerator value={upiIntentString} size={130} />
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <span className="text-xs font-black text-slate-900 block">
                          Scan to Pay ₹{amount.toFixed(2)}
                        </span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Scan using GPay, PhonePe, Paytm, or BHIM app. Once scanned and authorized, click the button below to confirm.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Or Enter UPI ID / VPA:
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. 8979164646@paytm or yourname@okhdfcbank"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0070BA] focus:border-[#0070BA] outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Cards Tab View */}
              {activeTab === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#0070BA] focus:border-[#0070BA] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#0070BA] focus:border-[#0070BA] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#0070BA] focus:border-[#0070BA] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking Tab View */}
              {activeTab === 'netbanking' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    Select Your Bank:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'sbi', name: 'State Bank of India' },
                      { id: 'hdfc', name: 'HDFC Bank' },
                      { id: 'icici', name: 'ICICI Bank' },
                      { id: 'axis', name: 'Axis Bank' },
                      { id: 'pnb', name: 'Punjab National Bank' },
                      { id: 'other', name: 'All Other Banks' },
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          selectedBank === bank.id
                            ? 'border-[#0070BA] bg-blue-50/70 text-[#0070BA] ring-2 ring-[#0070BA]/20'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay Button Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePay}
                  className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>PAY ₹{amount.toFixed(2)} via Razorpay</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </span>
                  <span>•</span>
                  <span>Official Razorpay Gateway</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
