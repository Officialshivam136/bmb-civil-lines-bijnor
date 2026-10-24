'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Cart', href: '/cart', icon: ShoppingBag, badge: totalItems },
    { name: 'Account', href: '/account', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border z-50 px-2 pb-safe shadow-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
