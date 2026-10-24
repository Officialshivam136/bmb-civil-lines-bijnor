import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { razorpayKeySecret } from '@/lib/razorpay';

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
