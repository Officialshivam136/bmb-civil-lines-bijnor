import { NextResponse } from 'next/server';
import { getTvOrders } from '@/lib/orderService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getTvOrders();
    return NextResponse.json({
      success: true,
      data,
      timestamp: Date.now()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch TV orders' }, { status: 500 });
  }
}
