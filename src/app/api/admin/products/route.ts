import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, categoryId, description, imageUrl, variants, isFeatured, isBestSeller } = body;

    if (!name || !categoryId || !variants || variants.length === 0) {
      return NextResponse.json({ error: 'Name, Category, and at least 1 price variant are required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
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
      }
    });

    revalidatePath('/menu');
    revalidatePath('/');
    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
