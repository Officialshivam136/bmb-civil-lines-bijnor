import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/product/ProductCard';
import SearchBar from '@/components/common/SearchBar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function SearchPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || '';

  const products = query.trim()
    ? await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { category: { name: { contains: query } } }
          ]
        },
        include: {
          variants: { where: { isActive: true } },
          images: true
        }
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/menu" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Complete Menu
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
            {query ? `Search Results for "${query}"` : 'Search Delicacies'}
          </h1>
          <p className="text-xs text-foreground/60 mt-1">
            {query ? `Found ${products.length} authentic delicacies matching your query` : 'Type any sweet, snack, or category name above'}
          </p>
        </div>

        <div className="w-full sm:w-80">
          <SearchBar />
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface border border-border rounded-3xl p-8 max-w-lg mx-auto">
          <span className="text-5xl block mb-4">🔍</span>
          <h3 className="text-lg font-bold text-foreground mb-1">No items found for "{query}"</h3>
          <p className="text-xs text-foreground/60 mb-6">
            We couldn't find an exact match. Try searching for Samosa, Jalebi, Rasgulla, or Kaju Katli.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-primary text-primary-foreground font-bold text-xs px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Explore Complete Menu &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
