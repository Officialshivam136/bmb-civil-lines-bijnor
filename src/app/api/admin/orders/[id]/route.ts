import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/orderService';
import { revalidatePath } from 'next/cache';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { status } = body;
    const ALLOWED_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(', ')}` 
      }, { status: 400 });
    }

    const res = await updateOrderStatus(params.id, status as any);

    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    revalidatePath('/tv');

    return NextResponse.json({ success: true, order: res });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: error.message || 'Failed to update order' }, { status: 500 });
  }
}
