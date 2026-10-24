import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductClient from '@/components/product/ProductClient';

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { 
      variants: true,
      images: true,
      reviews: {
        include: { user: true },
        where: { isApproved: true }
      }
    }
  });

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductClient product={product} />
    </div>
  );
}
