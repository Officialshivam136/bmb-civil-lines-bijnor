'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PlusCircle, Search, Trash2, Edit3, CheckCircle2, XCircle, 
  Sparkles, Filter, LayoutGrid, Table as TableIcon, ArrowUpDown, 
  Check, RefreshCw, AlertTriangle, Eye, EyeOff, X, IndianRupee, Tag
} from 'lucide-react';
import { ProductData, CategoryData } from '@/data/fallbackCatalogue';

interface AdminProductsClientProps {
  initialProducts: ProductData[];
  categories: CategoryData[];
}

export default function AdminProductsClient({ initialProducts, categories }: AdminProductsClientProps) {
  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'BESTSELLER'>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(categories[0]?.id || '');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newIsFeatured, setNewIsFeatured] = useState(false);
  const [newIsBestSeller, setNewIsBestSeller] = useState(false);
  const [newVariants, setNewVariants] = useState<{ weight: string; price: number; stock: number }[]>([
    { weight: '250g', price: 120, stock: 50 },
    { weight: '500g', price: 240, stock: 50 },
    { weight: '1kg', price: 480, stock: 50 }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search text filter
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory !== 'ALL') {
        const catIdMatch = p.categoryId === selectedCategory || p.category?.id === selectedCategory || p.category?.slug === selectedCategory;
        if (!catIdMatch) return false;
      }

      // Status filter
      if (statusFilter === 'ACTIVE' && !p.isActive) return false;
      if (statusFilter === 'INACTIVE' && p.isActive) return false;
      if (statusFilter === 'BESTSELLER' && !p.isBestSeller) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, statusFilter]);

  // Statistics
  const totalCount = products.length;
  const activeCount = products.filter(p => p.isActive).length;
  const bestsellerCount = products.filter(p => p.isBestSeller).length;

  // Toggle in-stock / active
  const handleToggleStatus = async (product: ProductData) => {
    const updatedStatus = !product.isActive;
    
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, isActive: updatedStatus } : p));
    showToast(`${product.name} marked as ${updatedStatus ? 'In Stock (Active)' : 'Out of Stock (Paused)'}`);

    try {
      await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updatedStatus })
      });
    } catch (err) {
      console.warn('Status toggle error:', err);
    }
  };

  // Delete product confirmation
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    const id = productToDelete.id;
    const name = productToDelete.name;
    setActionLoading(true);

    // Optimistic update
    setProducts(prev => prev.filter(p => p.id !== id));
    setProductToDelete(null);
    showToast(`Removed "${name}" from catalogue.`);

    try {
      await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Product delete error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Add Product Form Submit
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          categoryId: newCategoryId || categories[0]?.id,
          description: newDescription.trim() || undefined,
          imageUrl: newImageUrl.trim() || undefined,
          isFeatured: newIsFeatured,
          isBestSeller: newIsBestSeller,
          variants: newVariants
        })
      });

      const data = await res.json();
      if (res.ok && data.product) {
        setProducts(prev => [data.product, ...prev]);
        showToast(`Delicacy "${newName}" added to live catalogue!`);
        setIsAddModalOpen(false);
        // Reset form
        setNewName('');
        setNewDescription('');
        setNewImageUrl('');
        setNewIsFeatured(false);
        setNewIsBestSeller(false);
      } else {
        showToast(data.error || 'Failed to create delicacy');
      }
    } catch (err: any) {
      showToast(err.message || 'Error creating delicacy');
    } finally {
      setActionLoading(false);
    }
  };

  // Quick Edit Submit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setActionLoading(true);
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    showToast(`Updated "${editingProduct.name}" pricing & details!`);
    const target = editingProduct;
    setEditingProduct(null);

    try {
      await fetch(`/api/admin/products/${target.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: target.name,
          description: target.description,
          variants: target.variants
        })
      });
    } catch (err) {
      console.warn('Update error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner & Stats */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-amber-50 p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Civil Lines, Bijnor • Estd. 1995</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Catalogue & Inventory Management
            </h1>
            <p className="text-xs text-amber-100/70 mt-1 max-w-xl">
              Monitor active sweets, instant price adjustments, availability toggles, and add new seasonal delicacies to your shop's menu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-5 py-3 rounded-2xl font-black text-xs shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add New Delicacy</span>
            </button>
            <Link
              href="/menu"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-4 py-3 rounded-2xl font-bold text-xs transition-all"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>View Customer Menu</span>
            </Link>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <span className="text-[10px] text-amber-200/60 font-semibold uppercase tracking-wider block">Total Catalogue</span>
            <span className="text-xl font-black text-white">{totalCount} Delicacies</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Live In Stock</span>
            <span className="text-xl font-black text-emerald-400">{activeCount} Items</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">Bestsellers</span>
            <span className="text-xl font-black text-amber-400">{bestsellerCount} Sweets</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider block">Purity Standard</span>
            <span className="text-xl font-black text-blue-300">100% Desi Ghee</span>
          </div>
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-surface border border-border p-4 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-foreground/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sweet by name, ingredients (e.g. Samosa, Kaju, Jalebi, Laddu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-foreground placeholder:text-foreground/40"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filters & View Mode Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="ALL">Status: All Items</option>
              <option value="ACTIVE">Status: In Stock Only</option>
              <option value="INACTIVE">Status: Out of Stock</option>
              <option value="BESTSELLER">Status: Bestsellers ⭐</option>
            </select>

            <div className="flex items-center bg-background border border-border rounded-xl p-1 shrink-0">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'table' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/60 hover:text-foreground'
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/60 hover:text-foreground'
                }`}
                title="Grid Showcase"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-border/50 pt-3">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              selectedCategory === 'ALL'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-background hover:bg-border/30 text-foreground/70'
            }`}
          >
            All Categories ({totalCount})
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.categoryId === cat.id || p.category?.id === cat.id || p.category?.slug === cat.slug).length;
            const isSelected = selectedCategory === cat.id || selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-background hover:bg-border/30 text-foreground/70'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count Banner */}
      <div className="flex items-center justify-between text-xs text-foreground/60 px-1">
        <span>Showing <strong>{filteredProducts.length}</strong> of {totalCount} delicacies</span>
        {(searchQuery || selectedCategory !== 'ALL' || statusFilter !== 'ALL') && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setStatusFilter('ALL'); }}
            className="text-primary hover:underline font-bold text-xs"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-border/30 text-foreground/70 uppercase text-[10px] tracking-wider font-semibold border-b border-border">
                  <th className="py-3.5 px-4">Delicacy & Description</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Available Weights & Pricing</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-foreground/50">
                      <div className="max-w-xs mx-auto space-y-2">
                        <AlertTriangle className="w-8 h-8 mx-auto text-amber-500 opacity-60" />
                        <p className="font-bold text-sm text-foreground">No delicacies found</p>
                        <p className="text-xs">Try adjusting your search query or category filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const img = product.images?.[0]?.url;
                    return (
                      <tr key={product.id} className="hover:bg-primary/5 transition-colors">
                        {/* Delicacy Thumbnail & Title */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-border/40 overflow-hidden relative shrink-0 border border-border/50">
                              {img ? (
                                <Image 
                                  src={img} 
                                  alt={product.name} 
                                  fill 
                                  className="object-cover hover:scale-110 transition-transform duration-300" 
                                />
                              ) : (
                                <span className="flex items-center justify-center h-full text-lg">🍬</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-extrabold text-foreground text-sm">{product.name}</span>
                                {product.isBestSeller && (
                                  <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[9px] px-1.5 py-0.5 rounded font-black uppercase">
                                    ⭐ Bestseller
                                  </span>
                                )}
                                {product.isFeatured && (
                                  <span className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-[9px] px-1.5 py-0.5 rounded font-black uppercase">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-foreground/55 line-clamp-1 mt-0.5 max-w-md">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[11px] font-bold">
                            {product.category?.name || 'Delicacy'}
                          </span>
                        </td>

                        {/* Weights & Prices */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1.5 max-w-sm">
                            {product.variants?.map((v) => (
                              <span
                                key={v.id}
                                className="bg-background border border-border px-2 py-1 rounded-lg text-[11px] font-medium shadow-xs"
                              >
                                <span className="text-foreground/60">{v.weight}: </span>
                                <strong className="text-primary font-bold">₹{v.price}</strong>
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Status Toggle Switch */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(product)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                              product.isActive 
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                                : 'bg-neutral-500/15 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-500/25 border border-neutral-500/30'
                            }`}
                            title="Click to toggle availability"
                          >
                            <span className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                            <span>{product.isActive ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                              title="Edit Delicacy & Prices"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setProductToDelete(product)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                              title="Remove Delicacy"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID SHOWCASE VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const img = product.images?.[0]?.url;
            return (
              <div 
                key={product.id} 
                className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="h-44 w-full bg-border/30 relative overflow-hidden">
                    {img ? (
                      <Image 
                        src={img} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl">🍬</div>
                    )}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                        {product.category?.name}
                      </span>
                      {product.isBestSeller && (
                        <span className="bg-amber-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                          ⭐ Bestseller
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md cursor-pointer transition-all ${
                        product.isActive 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {product.isActive ? '● Live' : '○ Paused'}
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-foreground text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] text-foreground/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing Pill Strip */}
                    <div className="pt-2 flex flex-wrap gap-1">
                      {product.variants?.map((v) => (
                        <span key={v.id} className="bg-background border border-border px-2 py-0.5 rounded text-[10px]">
                          <strong>{v.weight}</strong>: ₹{v.price}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-3 border-t border-border/60 bg-border/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="inline-flex items-center gap-1 text-primary hover:underline font-bold"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Prices
                  </button>
                  <button
                    onClick={() => setProductToDelete(product)}
                    className="inline-flex items-center gap-1 text-red-500 hover:underline font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-black text-lg text-foreground">Edit Delicacy</h3>
                <p className="text-xs text-foreground/60">{editingProduct.name}</p>
              </div>
              <button 
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-full hover:bg-border/40 text-foreground/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-1">Delicacy Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-2">Weight Variants & Pricing (₹)</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editingProduct.variants?.map((v, idx) => (
                    <div key={v.id || idx} className="flex items-center gap-2 bg-background border border-border p-2 rounded-xl text-xs">
                      <div className="w-24">
                        <span className="text-[10px] text-foreground/50 block">Weight</span>
                        <input
                          type="text"
                          value={v.weight}
                          onChange={(e) => {
                            const updated = [...editingProduct.variants];
                            updated[idx].weight = e.target.value;
                            setEditingProduct({ ...editingProduct, variants: updated });
                          }}
                          className="w-full font-bold bg-transparent text-foreground focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] text-foreground/50 block">Price (₹)</span>
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => {
                            const updated = [...editingProduct.variants];
                            updated[idx].price = Number(e.target.value);
                            setEditingProduct({ ...editingProduct, variants: updated });
                          }}
                          className="w-full font-bold bg-transparent text-primary focus:outline-none"
                        />
                      </div>
                      <div className="w-20">
                        <span className="text-[10px] text-foreground/50 block">Stock Qty</span>
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => {
                            const updated = [...editingProduct.variants];
                            updated[idx].stock = Number(e.target.value);
                            setEditingProduct({ ...editingProduct, variants: updated });
                          }}
                          className="w-full font-bold bg-transparent text-foreground focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-foreground/70 hover:bg-border/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-border rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-black text-lg text-foreground">Add New Sweet / Delicacy</h3>
                <p className="text-xs text-foreground/60">Bikaner Misthan Bhandar, Civil Lines, Bijnor</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-border/40 text-foreground/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-1">Delicacy Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Kesar Peda, Anjeer Barfi, Paneer Pakora"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-1">Category *</label>
                <select
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Traditional authentic preparation cooked with pure desi ghee..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Weight Variants */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground/70">Weights & Prices *</label>
                  <button
                    type="button"
                    onClick={() => setNewVariants([...newVariants, { weight: '1kg', price: 500, stock: 50 }])}
                    className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    + Add Weight Row
                  </button>
                </div>
                <div className="space-y-2">
                  {newVariants.map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Weight (e.g. 500g)"
                        value={v.weight}
                        onChange={(e) => {
                          const updated = [...newVariants];
                          updated[i].weight = e.target.value;
                          setNewVariants(updated);
                        }}
                        className="w-1/3 bg-background border border-border rounded-xl px-3 py-1.5 text-xs text-foreground font-semibold"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Price ₹"
                        value={v.price}
                        onChange={(e) => {
                          const updated = [...newVariants];
                          updated[i].price = Number(e.target.value);
                          setNewVariants(updated);
                        }}
                        className="flex-1 bg-background border border-border rounded-xl px-3 py-1.5 text-xs text-foreground font-semibold"
                        required
                      />
                      {newVariants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setNewVariants(newVariants.filter((_, idx) => idx !== i))}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsBestSeller}
                    onChange={(e) => setNewIsBestSeller(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Mark as Bestseller ⭐</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsFeatured}
                    onChange={(e) => setNewIsFeatured(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Feature on Homepage 🔥</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-foreground/70 hover:bg-border/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Adding...' : 'Add Delicacy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-black text-base text-foreground">Remove Delicacy?</h3>
              <p className="text-xs text-foreground/60">
                Are you sure you want to remove <strong className="text-foreground">{productToDelete.name}</strong> from the online shop catalogue?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-xs font-bold text-foreground hover:bg-border/30"
              >
                Keep Item
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md disabled:opacity-50"
              >
                {actionLoading ? 'Removing...' : 'Yes, Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
