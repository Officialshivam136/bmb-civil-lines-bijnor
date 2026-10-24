import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock, MapPin, Printer, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import BMBLogo from '@/components/common/BMBLogo';
import { formatWhatsAppInvoice, generateWhatsAppInvoiceUrl, InvoiceOrderData } from '@/lib/invoiceFormatter';
import PrintButton from './PrintButton';

export default async function OrderConfirmationPage(props: { params: Promise<{ orderId: string }> }) {
  const params = await props.params;
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: {
      items: true,
      address: true,
      payment: true
    }
  });

  if (!order) {
    notFound();
  }

  const customerName = order.address?.name || 'Valued Patron';
  const customerPhone = order.address?.phone || '';

  const invoiceData: InvoiceOrderData = {
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    customerName,
    customerPhone,
    orderType: order.orderType,
    notes: order.notes,
    items: order.items.map(i => ({
      productName: i.productName,
      variantName: i.variantName,
      quantity: i.quantity,
      price: i.price,
      total: i.total
    })),
    subtotal: order.subtotal,
    discount: order.discount,
    deliveryFee: order.deliveryFee,
    total: order.total,
    paymentMethod: order.payment?.method || 'COD',
    paymentStatus: order.payment?.status || 'PENDING',
    transactionId: order.payment?.transactionId
  };

  const customerWhatsAppUrl = customerPhone ? generateWhatsAppInvoiceUrl(invoiceData) : null;
  const shopWhatsAppUrl = `https://wa.me/918979164646?text=${encodeURIComponent(formatWhatsAppInvoice(invoiceData))}`;

  const isPaid = order.payment?.status === 'SUCCESS' || order.payment?.method === 'RAZORPAY';

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Success Badge */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bikaner Misthan Bhandar — Civil Lines, Bijnor</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          Order Placed Successfully!
        </h1>
        <p className="text-xs sm:text-sm text-foreground/70 mt-1">
          Thank you, <strong className="text-foreground">{customerName}</strong>. Your freshly packed sweets order is confirmed.
        </p>
      </div>

      {/* WhatsApp Invoice Direct Dispatch Action Card */}
      <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl p-5 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-foreground block">
                Digital WhatsApp Invoice Ready
              </span>
              <p className="text-xs text-foreground/70 mt-0.5">
                {customerPhone 
                  ? `Your complete tax invoice is formatted for WhatsApp number +91 ${customerPhone}.`
                  : 'Receive your detailed itemized invoice and pickup token directly on WhatsApp.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {customerWhatsAppUrl && (
              <a
                href={customerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
              >
                <span>📲 Send to My WhatsApp</span>
              </a>
            )}

            <a
              href={shopWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-surface hover:bg-background border border-border text-foreground font-bold px-3.5 py-2.5 rounded-xl text-xs transition-colors"
            >
              <span>Share with Shop (+91 89791 64646)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Official Printable Tax Invoice & Receipt Card */}
      <div id="printable-invoice" className="bg-surface border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm mb-8 text-left relative overflow-hidden">
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary via-accent to-primary" />

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border">
          <div>
            <BMBLogo size="md" />
            <div className="text-[11px] text-foreground/70 mt-2 space-y-0.5">
              <p className="font-bold text-foreground">BIKANER MISTHAN BHANDAR</p>
              <p>1101, Civil Lines, Opposite Classic Bar, Bijnor (U.P.) 246701</p>
              <p>FSSAI Lic No: 12721008000123 • GSTIN: 09ADQPG2917D1ZL</p>
              <p>Helpline / WhatsApp: +91 89791 64646</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              Tax Invoice / Bill
            </span>
            <p className="font-black text-xl text-foreground mt-2">{order.orderNumber}</p>
            <p className="text-xs text-foreground/60 mt-0.5">
              {new Date(order.createdAt).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
                timeZone: 'Asia/Kolkata'
              })}
            </p>
            <div className="mt-2 inline-block">
              {isPaid ? (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Paid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Pay at Counter / COD
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Billed To / Mode Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-border text-xs">
          <div>
            <span className="text-foreground/50 font-semibold block uppercase tracking-wider text-[10px]">
              Customer Information
            </span>
            <p className="font-bold text-sm text-foreground mt-1">{customerName}</p>
            <p className="text-foreground/70">WhatsApp: +91 {customerPhone}</p>
            {order.notes && (
              <p className="text-primary font-medium mt-1">Note: {order.notes}</p>
            )}
          </div>

          <div className="sm:text-right">
            <span className="text-foreground/50 font-semibold block uppercase tracking-wider text-[10px]">
              Fulfillment Method
            </span>
            <p className="font-bold text-sm text-foreground mt-1">
              {order.orderType === 'PICKUP' ? '🏬 Store Counter Pickup (Civil Lines)' : '🛵 Doorstep Delivery in Bijnor'}
            </p>
            {order.address && order.orderType === 'DELIVERY' && (
              <p className="text-foreground/70 mt-0.5">
                {order.address.house}, {order.address.street}, {order.address.area}, {order.address.city}
              </p>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-5 border-b border-border space-y-3">
          <span className="text-foreground/50 font-semibold block uppercase tracking-wider text-[10px]">
            Items Ordered
          </span>

          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs py-1.5 border-b border-border/40">
                <div>
                  <span className="font-bold text-foreground text-sm block">
                    {item.productName}
                  </span>
                  <span className="text-foreground/60 text-[11px]">
                    Portion: {item.variantName} • {item.quantity} × ₹{item.price}
                  </span>
                </div>
                <span className="font-extrabold text-sm text-foreground">
                  ₹{item.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Calculation Breakdown */}
        <div className="pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-foreground/75">
            <span>Items Subtotal</span>
            <span className="font-semibold">₹{order.subtotal}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-green-700 font-bold">
              <span>👑 VIP Patron 10% Discount</span>
              <span>-₹{order.discount}</span>
            </div>
          )}

          <div className="flex justify-between text-foreground/75">
            <span>Delivery Fee</span>
            <span>{order.deliveryFee === 0 ? <strong className="text-green-600">FREE</strong> : `₹${order.deliveryFee}`}</span>
          </div>

          <div className="flex justify-between items-baseline pt-3 border-t border-border text-base font-black text-foreground">
            <span>Total Payable Amount</span>
            <span className="text-primary text-xl">₹{order.total}</span>
          </div>

          {order.payment && (
            <div className="pt-2 text-[11px] text-foreground/60 flex justify-between">
              <span>Payment Mode: <b>{order.payment.method}</b> ({order.payment.status})</span>
              {order.payment.transactionId && <span>Txn ID: {order.payment.transactionId}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href={`/track-order?id=${encodeURIComponent(order.orderNumber)}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-black py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <span>Track Order Status</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <PrintButton />

        <Link
          href="/#menu"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-surface hover:bg-background border border-border text-foreground font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
        >
          <span>Order More Sweets</span>
        </Link>
      </div>
    </div>
  );
}
