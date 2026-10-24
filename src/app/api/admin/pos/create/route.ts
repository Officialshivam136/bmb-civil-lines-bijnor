import { NextResponse } from 'next/server';
import { createPosOrder } from '@/lib/orderService';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, orderType, paymentMethod, items, discount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least 1 delicacy' }, { status: 400 });
    }

    const order = createPosOrder({
      customerName: customerName || 'Counter Guest',
      customerPhone,
      orderType: orderType || 'PICKUP',
      paymentMethod: paymentMethod || 'CASH',
      items,
      discount: Number(discount || 0)
    });

    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    revalidatePath('/tv');

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create POS order' }, { status: 500 });
  }
}
