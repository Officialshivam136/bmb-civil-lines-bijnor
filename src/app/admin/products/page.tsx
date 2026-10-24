import { getAdminProducts, getAdminCategories } from '@/lib/catalogueService';
import AdminProductsClient from '@/components/admin/products/AdminProductsClient';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getAdminCategories()
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <AdminProductsClient 
        initialProducts={products} 
        categories={categories} 
      />
    </div>
  );
}
