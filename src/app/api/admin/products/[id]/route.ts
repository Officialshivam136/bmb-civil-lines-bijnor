import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { registerDeletedProduct, registerStatusToggle } from '@/lib/catalogueService';

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;

    try {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      await prisma.productVariant.deleteMany({ where: { productId: id } });
      await prisma.review.deleteMany({ where: { productId: id } });
      await prisma.product.delete({ where: { id } });
    } catch (dbErr) {
      console.warn('[api/admin/products/[id]] Serverless DB delete fallback:', dbErr);
    }

    // Always register in runtime memory store
    registerDeletedProduct(id);

    revalidatePath('/menu');
    revalidatePath('/');
    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, message: 'Delicacy removed successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;
    const body = await request.json();

    const { isActive, name, description, variants } = body;

    try {
      if (typeof isActive === 'boolean') {
        await prisma.product.update({
          where: { id },
          data: { isActive }
        });
      }

      if (name || description) {
        await prisma.product.update({
          where: { id },
          data: {
            ...(name ? { name } : {}),
            ...(description ? { description } : {})
          }
        });
      }

      if (variants && Array.isArray(variants)) {
        for (const v of variants) {
          if (v.id) {
            await prisma.productVariant.update({
              where: { id: v.id },
              data: {
                ...(v.price ? { price: Number(v.price) } : {}),
                ...(v.weight ? { weight: v.weight } : {}),
                ...(typeof v.stock === 'number' ? { stock: v.stock } : {})
              }
            });
          }
        }
      }
    } catch (dbErr) {
      console.warn('[api/admin/products/[id]] Serverless DB patch fallback:', dbErr);
    }

    if (typeof isActive === 'boolean') {
      registerStatusToggle(id, isActive);
    }

    revalidatePath('/menu');
    revalidatePath('/');
    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, message: 'Product updated successfully' });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  return DELETE(request, props);
}
