import { getLiveOrders } from '@/lib/orderService';
import AdminOrdersClient from '@/components/admin/orders/AdminOrdersClient';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await getLiveOrders();

  return (
    <AdminOrdersClient initialOrders={orders} />
  );
}
