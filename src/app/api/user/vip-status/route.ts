import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneParam = searchParams.get('phone');
    const session = await getServerSession(authOptions);

    const userId = (session?.user as any)?.id;
    const cleanPhone = phoneParam ? phoneParam.replace(/\D/g, '').slice(-10) : '';

    if (!userId && !cleanPhone) {
      return NextResponse.json({
        isVip: false,
        monthlyOrderCount: 0,
        threshold: 2,
        discountPercent: 0,
        statusLabel: 'Normal Guest',
        message: 'Order twice or thrice in a month to unlock 10% BMB VIP Patron Discount.'
      });
    }

    // Orders within the last 30 days (1 month)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const monthlyOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        status: { not: 'CANCELLED' },
        OR: [
          ...(userId ? [{ userId }] : []),
          ...(cleanPhone ? [{ address: { phone: { contains: cleanPhone } } }] : [])
        ]
      },
      select: {
        id: true,
        orderNumber: true,
        total: true,
        createdAt: true,
        status: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const monthlyOrderCount = monthlyOrders.length;
    // VIP rule: Must have ordered at least twice in a month (>= 2 orders within last 30 days)
    const isVip = monthlyOrderCount >= 2;

    return NextResponse.json({
      isVip,
      monthlyOrderCount,
      threshold: 2,
      discountPercent: isVip ? 10 : 0,
      statusLabel: isVip ? 'VIP Patron' : 'Normal User',
      recentOrders: monthlyOrders,
      message: isVip
        ? `👑 BMB VIP Patron Confirmed! You have ordered ${monthlyOrderCount} times in the past month. Flat 10% VIP discount automatically applied on your orders.`
        : monthlyOrderCount === 1
          ? `⭐ You have 1 order in the past month. Place just 1 more order this month to unlock BMB VIP Patron status with 10% OFF!`
          : `👋 Normal User: Place 2 or more orders in a month to become a VIP Patron with 10% discount on all sweets.`
    });
  } catch (error: any) {
    console.error('Error checking VIP status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
