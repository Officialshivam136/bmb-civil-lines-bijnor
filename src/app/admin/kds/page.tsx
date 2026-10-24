import { getLiveOrders } from '@/lib/orderService';
import KitchenDisplayClient from '@/components/admin/kds/KitchenDisplayClient';

export const dynamic = 'force-dynamic';

export default async function KitchenDisplayPage() {
  const orders = await getLiveOrders();

  return (
    <KitchenDisplayClient initialOrders={orders} />
  );
}
