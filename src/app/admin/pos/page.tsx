import { getAdminProducts } from '@/lib/catalogueService';
import PosBillingClient from '@/components/admin/pos/PosBillingClient';

export const dynamic = 'force-dynamic';

export default async function AdminPosPage() {
  const products = await getAdminProducts();

  return (
    <PosBillingClient products={products} />
  );
}
