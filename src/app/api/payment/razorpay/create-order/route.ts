import { NextResponse } from 'next/server';
import { getRazorpayClient, razorpayKeyId } from '@/lib/razorpay';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, orderNumber, orderId, receipt } = body;

    let targetAmount = Number(amount);

    // If orderId or orderNumber is supplied, enforce server-side price from database
    if (orderId || orderNumber) {
      const dbOrder = await prisma.order.findFirst({
        where: {
          OR: [
            ...(orderId ? [{ id: orderId }] : []),
            ...(orderNumber ? [{ orderNumber }] : [])
          ]
        },
        select: { total: true }
      });
      if (dbOrder && typeof dbOrder.total === 'number') {
        targetAmount = dbOrder.total;
      }
    }

    if (!targetAmount || targetAmount <= 0) {
      return NextResponse.json({ error: 'Invalid order payable amount' }, { status: 400 });
    }

    const amountInPaise = Math.round(targetAmount * 100);
    const razorpay = getRazorpayClient();


    let razorpayOrder;

    // Check if live or real test keys are configured
    const isMock = razorpayKeyId === 'rzp_test_BMBBijnor2026';

    if (!isMock && razorpay) {
      try {
        razorpayOrder = await razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receipt || orderNumber || `rcpt_${Date.now()}`,
          notes: {
            shop: 'Bikaner Misthan Bhandar - Civil Lines, Bijnor',
            orderNumber: orderNumber || ''
          }
        });
      } catch (err: any) {
        console.warn('Real Razorpay call failed, falling back to instant test order mode:', err?.message);
        razorpayOrder = {
          id: `order_bmb_demo_${Date.now()}`,
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderNumber || `rcpt_${Date.now()}`
        };
      }
    } else {
      // Demo test order
      razorpayOrder = {
        id: `order_bmb_demo_${Date.now()}`,
        amount: amountInPaise,
        currency: 'INR',
        receipt: orderNumber || `rcpt_${Date.now()}`
      };
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpayKeyId
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
  }
}
