import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({ products: [] });
    }

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { category: { name: { contains: query } } }
        ]
      },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' }
        },
        images: true
      },
      take: 8
    });

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
