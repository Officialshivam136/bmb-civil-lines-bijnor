import { prisma } from '@/lib/prisma';
import NewProductForm from './NewProductForm';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Add New Sweet / Item</h1>
        <p className="text-xs text-foreground/60 mt-1">
          Create a new delicacy, set its weight variants, prices, and upload an image.
        </p>
      </div>

      <NewProductForm categories={categories} />
    </div>
  );
}
