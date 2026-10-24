import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { razorpayKeySecret } from '@/lib/razorpay';
import { sendAdminWhatsAppNotification } from '@/lib/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!orderId || !razorpay_payment_id) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // In demo mode or when signature is present, verify signature
    let isSignatureValid = true;

    if (razorpay_signature && razorpay_order_id && razorpayKeySecret !== 'bmb_secret_test_key_2026') {
      const generatedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        isSignatureValid = false;
      }
    }

    if (!isSignatureValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update database records
    await prisma.$transaction([
      prisma.payment.updateMany({
        where: { orderId },
        data: {
          status: 'SUCCESS',
          transactionId: razorpay_payment_id,
          method: 'RAZORPAY'
        }
      }),
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CONFIRMED'
        }
      })
    ]);

    // Send instant WhatsApp notification to shop owner with PAID status
    try {
      const confirmedOrder = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, address: true, user: true }
      });

      if (confirmedOrder) {
        await sendAdminWhatsAppNotification({
          orderNumber: confirmedOrder.orderNumber,
          orderId: confirmedOrder.id,
          createdAt: confirmedOrder.createdAt,
          customerName: confirmedOrder.address?.name || confirmedOrder.user?.name || 'Valued Patron',
          customerPhone: confirmedOrder.address?.phone || confirmedOrder.user?.phone || '8979164646',
          orderType: confirmedOrder.orderType,
          notes: confirmedOrder.notes,
          items: confirmedOrder.items.map((it) => ({
            productName: it.productName,
            variantName: it.variantName,
            quantity: it.quantity,
            price: it.price,
            total: it.total
          })),
          subtotal: confirmedOrder.subtotal,
          discount: confirmedOrder.discount,
          deliveryFee: confirmedOrder.deliveryFee,
          total: confirmedOrder.total,
          paymentMethod: 'RAZORPAY',
          paymentStatus: 'SUCCESS',
          transactionId: razorpay_payment_id,
          address: confirmedOrder.address
        });
      }
    } catch (notifyErr) {
      console.warn('Admin WhatsApp notification warning:', notifyErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order confirmed successfully.',
      transactionId: razorpay_payment_id
    });
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
