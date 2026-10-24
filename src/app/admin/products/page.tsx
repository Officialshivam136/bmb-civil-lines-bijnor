import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { PlusCircle, Search, Trash2, Edit3, ArrowLeft } from 'lucide-react';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      variants: true,
      images: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Catalogue & Inventory Management</h1>
          <p className="text-xs text-foreground/60 mt-1">
            Add new sweets, update pricing/weights, or remove products from the live website.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between bg-border/20 text-xs">
          <span className="font-semibold text-foreground">
            Total Active Delicacies: {products.length}
          </span>
          <span className="text-foreground/50">
            Changes reflect instantly on the consumer website
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-border/30 text-foreground/60 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Available Weights & Prices</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {products.map((product) => {
                const img = product.images[0]?.url;
                return (
                  <tr key={product.id} className="hover:bg-primary/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-border/20 overflow-hidden relative shrink-0">
                        {img ? (
                          <Image src={img} alt={product.name} fill className="object-cover" />
                        ) : (
                          <span className="flex items-center justify-center h-full text-lg">🍬</span>
                        )}
                      </div>
                      <div>
                        <span className="font-bold block text-foreground">{product.name}</span>
                        <span className="text-[11px] text-foreground/50 line-clamp-1">{product.description}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] font-semibold">
                        {product.category.name}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5">
                        {product.variants.map((v) => (
                          <span key={v.id} className="bg-surface border border-border px-2 py-0.5 rounded text-[11px]">
                            <strong>{v.weight}</strong>: ₹{v.price}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700">
                        <span className="w-2 h-2 rounded-full bg-green-600 inline-block" /> Pure Veg
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <form action={`/api/admin/products/${product.id}`} method="POST" className="inline-block">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button
                          type="submit"
                          className="text-red-500 hover:text-red-700 font-bold hover:underline p-1 text-xs"
                          title="Remove from site"
                        >
                          Remove
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
