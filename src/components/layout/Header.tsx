'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, User, QrCode } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import BMBLogo from '@/components/common/BMBLogo';
import SearchBar from '@/components/common/SearchBar';

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not render consumer storefront header inside admin portal or TV display
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/tv')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xs">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo with BMB Monogram */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center">
            <BMBLogo size="md" />
          </Link>
        </div>

        {/* Live Functional Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Quick Actions (Cart & Account & Mobile Search toggle) */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 shrink-0">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link 
            href="/contact-qr" 
            className="hidden sm:flex flex-col items-center gap-0.5 text-primary hover:text-primary/80 transition-colors"
            title="Shop Contact QR — Scan & Order Without Login"
          >
            <QrCode className="w-5 h-5 text-primary" />
            <span className="text-[11px] font-bold">Contact QR</span>
          </Link>

          <Link href="/account" className="hidden md:flex flex-col items-center gap-0.5 text-foreground hover:text-primary transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[11px] font-semibold">Account</span>
          </Link>
          
          <Link href="/cart" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <ShoppingBag className="w-4 h-4" />
              </div>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background shadow-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-bold">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Overlay Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-border bg-surface animate-in slide-in-from-top-2">
          <SearchBar />
        </div>
      )}
    </header>
  );
}
