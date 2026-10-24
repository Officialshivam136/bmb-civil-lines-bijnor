import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { registerAddedProduct, FALLBACK_CATEGORIES } from '@/lib/catalogueService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, categoryId, description, imageUrl, variants, isFeatured, isBestSeller } = body;

    if (!name || !categoryId || !variants || variants.length === 0) {
      return NextResponse.json({ error: 'Name, Category, and at least 1 price variant are required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const uniqueSlug = `${slug}-${Date.now().toString().slice(-4)}`;
    const categoryObj = FALLBACK_CATEGORIES.find(c => c.id === categoryId) || {
      id: categoryId,
      name: 'Authentic Delicacy',
      slug: 'authentic-delicacy'
    };

    let createdProduct = null;

    try {
      createdProduct = await prisma.product.create({
        data: {
          name,
          slug: uniqueSlug,
          categoryId,
          description: description || 'Freshly prepared traditional sweet from Bikaner Misthan Bhandar.',
          isVegetarian: true,
          isActive: true,
          priceConfigured: true,
          isFeatured: Boolean(isFeatured),
          isBestSeller: Boolean(isBestSeller),
          images: imageUrl ? {
            create: [{ url: imageUrl, altText: name }]
          } : undefined,
          variants: {
            create: variants.map((v: any) => ({
              weight: v.weight,
              price: Number(v.price),
              stock: Number(v.stock || 50),
              isActive: true
            }))
          }
        },
        include: {
          category: true,
          variants: true,
          images: true
        }
      });
    } catch (dbErr) {
      console.warn('[api/admin/products] Serverless DB write fallback:', dbErr);
      const tempId = `prod_temp_${Date.now()}`;
      createdProduct = {
        id: tempId,
        name,
        slug: uniqueSlug,
        description: description || 'Freshly prepared traditional sweet from Bikaner Misthan Bhandar, Civil Lines, Bijnor.',
        categoryId,
        category: categoryObj,
        isVegetarian: true,
        isActive: true,
        priceConfigured: true,
        isFeatured: Boolean(isFeatured),
        isBestSeller: Boolean(isBestSeller),
        images: imageUrl ? [{ id: `img_${Date.now()}`, url: imageUrl, altText: name }] : [],
        variants: variants.map((v: any, idx: number) => ({
          id: `var_${Date.now()}_${idx}`,
          productId: tempId,
          weight: v.weight,
          price: Number(v.price),
          stock: Number(v.stock || 50),
          isActive: true
        }))
      };
      registerAddedProduct(createdProduct as any);
    }

    revalidatePath('/menu');
    revalidatePath('/');
    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, product: createdProduct });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
