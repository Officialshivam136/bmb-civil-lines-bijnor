import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/orderService';
import { revalidatePath } from 'next/cache';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const res = await updateOrderStatus(params.id, status);

    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    revalidatePath('/tv');

    return NextResponse.json({ success: true, order: res });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: error.message || 'Failed to update order' }, { status: 500 });
  }
}
