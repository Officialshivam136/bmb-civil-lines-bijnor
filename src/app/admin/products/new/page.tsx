import { getAdminCategories } from '@/lib/catalogueService';
import NewProductForm from './NewProductForm';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Add New Sweet / Delicacy</h1>
        <p className="text-xs text-foreground/60 mt-1">
          Create a new delicacy for Bikaner Misthan Bhandar, Civil Lines, Bijnor, set weight variants, prices, and upload an image.
        </p>
      </div>

      <NewProductForm categories={categories} />
    </div>
  );
}
