import { prisma } from '@/lib/prisma';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES, ProductData, CategoryData } from '@/data/fallbackCatalogue';

export { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS };

// In-memory runtime overlay for serverless environments
const inMemoryDeletedIds = new Set<string>();
const inMemoryStatusOverrides = new Map<string, boolean>();
const inMemoryAddedProducts: ProductData[] = [];

export async function getAdminProducts(): Promise<ProductData[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        variants: true,
        images: true
      }
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p: any) => ({
        ...p,
        category: p.category || { id: p.categoryId, name: 'Traditional Sweets', slug: 'traditional-sweets' },
        variants: p.variants || [],
        images: p.images || []
      })) as ProductData[];
    }
  } catch (err) {
    console.warn('[catalogueService] Falling back to pre-seeded authentic catalogue:', err);
  }

  // Resilient fallback with runtime overlays
  const list = [...inMemoryAddedProducts, ...FALLBACK_PRODUCTS]
    .filter(p => !inMemoryDeletedIds.has(p.id))
    .map(p => {
      if (inMemoryStatusOverrides.has(p.id)) {
        return { ...p, isActive: inMemoryStatusOverrides.get(p.id)! };
      }
      return p;
    });

  return list;
}

export async function getAdminCategories(): Promise<CategoryData[]> {
  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        sortOrder: true,
        isActive: true
      }
    });

    if (dbCategories && dbCategories.length > 0) {
      return dbCategories;
    }
  } catch (err) {
    console.warn('[catalogueService] Categories query fallback:', err);
  }

  return FALLBACK_CATEGORIES;
}

export function registerDeletedProduct(id: string) {
  inMemoryDeletedIds.add(id);
}

export function registerStatusToggle(id: string, isActive: boolean) {
  inMemoryStatusOverrides.set(id, isActive);
}

export function registerAddedProduct(product: ProductData) {
  inMemoryAddedProducts.unshift(product);
}
