export interface InvoiceOrderData {
  orderNumber: string;
  createdAt: string | Date;
  customerName: string;
  customerPhone: string;
  orderType: string;
  notes?: string | null;
  items: Array<{
    productName: string;
    variantName: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string | null;
}

export function formatWhatsAppInvoice(order: InvoiceOrderData): string {
  const dateFormatted = new Date(order.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  const isPickup = order.orderType === 'PICKUP';
  const fulfillmentText = isPickup ? '🏬 Store Counter Pickup (Civil Lines)' : '🛵 Doorstep Delivery in Bijnor';

  let paymentText = order.paymentMethod;
  if (order.paymentMethod === 'RAZORPAY') {
    paymentText = `✅ PAID via Razorpay Online / UPI ${order.transactionId ? `(Txn: ${order.transactionId})` : ''}`;
  } else if (order.paymentMethod === 'COD') {
    paymentText = isPickup ? '💵 Pay at Counter (Cash / UPI)' : '💵 Cash on Delivery (COD)';
  }

  const itemsList = order.items
    .map((item, idx) => `  ${idx + 1}. *${item.productName}* (${item.variantName})\n     ${item.quantity} x ₹${item.price} = *₹${item.total}*`)
    .join('\n');

  const trackingLink = `https://bmb-civil-lines-bijnor.vercel.app/track-order/${encodeURIComponent(order.orderNumber)}`;

  return `🧾 *TAX INVOICE & ORDER RECEIPT*
*BIKANER MISTHAN BHANDAR (Established 1995)*
_1101, Civil Lines, Opposite Classic Bar, Bijnor (U.P.) 246701_
📞 *Orders & Helpline:* +91 89791 64646
━━━━━━━━━━━━━━━━━━━━
*Order Number:* *${order.orderNumber}*
*Date & Time:* ${dateFormatted}
*Customer Name:* ${order.customerName}
*WhatsApp Phone:* +91 ${order.customerPhone}
*Order Type:* ${fulfillmentText}
${order.notes ? `*Instructions:* ${order.notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
*ITEMS ORDERED:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
*FINANCIAL BREAKDOWN:*
• Items Subtotal: ₹${order.subtotal}
${order.discount > 0 ? `• 👑 VIP Patron 10% Discount: -₹${order.discount}\n` : ''}• Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
*GRAND TOTAL:* *₹${order.total}*
*Payment Status:* ${paymentText}
━━━━━━━━━━━━━━━━━━━━
📍 *Track Your Order Live:*
${trackingLink}

_Thank you for choosing Bikaner Misthan Bhandar, Civil Lines, Bijnor for your celebration!_`;
}

export function generateWhatsAppInvoiceUrl(order: InvoiceOrderData): string {
  const cleanPhone = order.customerPhone.replace(/\D/g, '').slice(-10);
  const text = formatWhatsAppInvoice(order);
  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`;
}
