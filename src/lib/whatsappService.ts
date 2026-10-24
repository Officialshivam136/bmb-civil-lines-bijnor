import { prisma } from '@/lib/prisma';

export interface OrderNotificationData {
  orderNumber: string;
  orderId: string;
  createdAt: string | Date;
  customerName: string;
  customerPhone: string;
  orderType: string; // 'PICKUP' | 'DELIVERY'
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
  paymentMethod: string; // 'RAZORPAY' | 'COD'
  paymentStatus: string; // 'PENDING' | 'SUCCESS'
  transactionId?: string | null;
  address?: {
    house?: string | null;
    street?: string | null;
    area?: string | null;
    city?: string | null;
    landmark?: string | null;
  } | null;
}

/**
 * Generates formatted WhatsApp message specifically designed for the BMB shop owner/cashier
 */
export function formatAdminOrderNotification(order: OrderNotificationData): string {
  const dateFormatted = new Date(order.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  const isPickup = order.orderType === 'PICKUP';
  const fulfillmentHeader = isPickup ? '🏬 STORE TAKEAWAY (COUNTER PICKUP)' : '🛵 DOORSTEP DELIVERY IN BIJNOR';

  let paymentHeader = '💵 PAY AT COUNTER / CASH ON DELIVERY (PENDING)';
  if (order.paymentMethod === 'RAZORPAY') {
    paymentHeader = `✅ PAID ONLINE VIA RAZORPAY / UPI ${order.transactionId ? `\n   Txn ID: ${order.transactionId}` : ''}`;
  }

  const itemsList = order.items
    .map((item, idx) => `  ${idx + 1}. *${item.productName}* (${item.variantName})\n     ↳ Qty: *${item.quantity}* × ₹${item.price} = *₹${item.total}*`)
    .join('\n');

  let addressBlock = '';
  if (!isPickup && order.address) {
    const addrParts = [
      order.address.house,
      order.address.street,
      order.address.area,
      order.address.landmark ? `(Near ${order.address.landmark})` : null,
      order.address.city || 'Bijnor'
    ].filter(Boolean);
    addressBlock = `\n📍 *DELIVERY ADDRESS:*\n   ${addrParts.join(', ')}\n`;
  }

  const adminOrderUrl = `https://bmb-civil-lines-bijnor.vercel.app/admin/orders/${order.orderId}`;

  return `🚨 *NEW BMB ORDER RECEIVED!* 🚨
━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* *${order.orderNumber}*
🕒 *Time:* ${dateFormatted}
👤 *Customer:* *${order.customerName}*
📞 *Customer Phone:* +91 ${order.customerPhone}
🛵 *Fulfillment:* *${fulfillmentHeader}*
${addressBlock}${order.notes ? `📝 *Notes:* ${order.notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
📦 *ITEMS TO PREPARE:*
${itemsList}
━━━━━━━━━━━━━━━━━━━━
💰 *BILLING SUMMARY:*
  • Items Subtotal: ₹${order.subtotal}
  ${order.discount > 0 ? `• Discount Applied: -₹${order.discount}\n  ` : ''}• Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
  ━━━━━━━━━━━━━━━━━
  👉 *TOTAL BILL AMOUNT:* *₹${order.total}*
  💳 *PAYMENT STATUS:* 
  ${paymentHeader}
━━━━━━━━━━━━━━━━━━━━
⚡ *SHOP ACTIONS:*
👉 View in Admin: ${adminOrderUrl}
👉 Call Customer: tel:+91${order.customerPhone.replace(/\D/g, '')}
👉 Message Customer: https://wa.me/91${order.customerPhone.replace(/\D/g, '')}`;
}

/**
 * Returns a direct 1-click wa.me URL to send this notification to the shop owner's WhatsApp
 */
export function generateAdminWhatsAppUrl(order: OrderNotificationData, adminPhone = '8979164646'): string {
  const cleanPhone = adminPhone.replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const message = formatAdminOrderNotification(order);
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Dispatches WhatsApp notification in the background
 * 1. Checks if a WhatsApp Gateway Webhook (UltraMsg / Twilio / Meta API) is configured in process.env
 * 2. Logs dispatch details to the terminal / audit log
 */
export async function sendAdminWhatsAppNotification(order: OrderNotificationData): Promise<{
  success: boolean;
  mode: 'API' | 'MANUAL_LINK';
  url?: string;
  error?: string;
}> {
  try {
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || '8979164646';
    const message = formatAdminOrderNotification(order);
    const manualUrl = generateAdminWhatsAppUrl(order, adminPhone);

    // If an external automated API endpoint is configured (e.g. UltraMsg, Twilio, or Meta Cloud API)
    const webhookUrl = process.env.WHATSAPP_API_URL;
    const apiToken = process.env.WHATSAPP_API_TOKEN;

    if (webhookUrl && apiToken) {
      console.log(`[WhatsApp Server Automation] Dispatching background WhatsApp message to +91 ${adminPhone}...`);
      
      const cleanPhone = adminPhone.replace(/\D/g, '');
      const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

      // UltraMsg / standard JSON gateway payload format
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: apiToken,
          to: targetPhone,
          body: message
        })
      });

      if (response.ok) {
        console.log(`[WhatsApp Server Automation] ✅ Order alert successfully delivered to +91 ${adminPhone}!`);
        return { success: true, mode: 'API', url: manualUrl };
      } else {
        const errorText = await response.text();
        console.warn(`[WhatsApp Server Automation] Gateway call returned ${response.status}:`, errorText);
      }
    }

    // Default simulated background log
    console.log(`\n======================================================`);
    console.log(`📲 [WHATSAPP OWNER ALERT -> +91 ${adminPhone}]`);
    console.log(`Order: ${order.orderNumber} | Customer: ${order.customerName} | Bill: ₹${order.total}`);
    console.log(`Notification Link: ${manualUrl}`);
    console.log(`======================================================\n`);

    return { success: true, mode: 'MANUAL_LINK', url: manualUrl };
  } catch (err: any) {
    console.error('Failed to dispatch WhatsApp admin notification:', err);
    return { success: false, mode: 'MANUAL_LINK', error: err?.message };
  }
}
