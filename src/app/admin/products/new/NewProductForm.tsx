'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ArrowLeft, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

interface VariantInput {
  weight: string;
  price: number;
  stock: number;
}

export default function NewProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const [variants, setVariants] = useState<VariantInput[]>([
    { weight: '250g', price: 120, stock: 50 },
    { weight: '500g', price: 240, stock: 50 }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addVariantRow = () => {
    setVariants([...variants, { weight: '1kg', price: 480, stock: 50 }]);
  };

  const removeVariantRow = (index: number) => {
    if (variants.length <= 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: keyof VariantInput, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a product name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          categoryId,
          description,
          imageUrl: imageUrl.trim() || undefined,
          isFeatured,
          isBestSeller,
          variants
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalogue
      </Link>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-700 px-4 py-3 rounded-xl text-xs">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
            Sweet / Dish Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kesar Peda"
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
            Category *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Detailed description of ingredients, aroma, and traditional preparation..."
          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
          Image Web URL (Optional)
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Weight & Price Variants */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Weights & Pricing *</h3>
            <p className="text-xs text-foreground/60">Configure options like 250g, 500g, 1kg or 1 piece</p>
          </div>
          <button
            type="button"
            onClick={addVariantRow}
            className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Weight Option
          </button>
        </div>

        <div className="space-y-2">
          {variants.map((v, i) => (
            <div key={i} className="flex items-center gap-3 bg-background p-3 rounded-xl border border-border">
              <div className="flex-1">
                <input
                  type="text"
                  value={v.weight}
                  onChange={(e) => updateVariant(i, 'weight', e.target.value)}
                  placeholder="e.g. 250g"
                  className="w-full px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-semibold"
                  required
                />
              </div>

              <div className="w-28">
                <input
                  type="number"
                  value={v.price}
                  onChange={(e) => updateVariant(i, 'price', Number(e.target.value))}
                  placeholder="Price (₹)"
                  className="w-full px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-semibold"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => removeVariantRow(i)}
                disabled={variants.length <= 1}
                className="text-foreground/40 hover:text-red-500 p-1 disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Flags */}
      <div className="flex gap-6 pt-3 border-t border-border">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="rounded text-primary focus:ring-primary w-4 h-4"
          />
          <span>Show on Homepage Featured Specials</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
            className="rounded text-primary focus:ring-primary w-4 h-4"
          />
          <span>Mark as Bestseller</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-border flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all shadow-md text-xs"
        >
          {loading ? 'Adding Sweet...' : 'Publish Sweet to Storefront'}
        </button>
      </div>
    </form>
  );
}
