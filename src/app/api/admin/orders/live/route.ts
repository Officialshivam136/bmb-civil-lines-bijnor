import { NextResponse } from 'next/server';
import { getLiveOrders, getOrderMetrics } from '@/lib/orderService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [orders, metrics] = await Promise.all([
      getLiveOrders(),
      getOrderMetrics()
    ]);

    return NextResponse.json({
      success: true,
      orders,
      metrics,
      timestamp: Date.now()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch live orders' }, { status: 500 });
  }
}
