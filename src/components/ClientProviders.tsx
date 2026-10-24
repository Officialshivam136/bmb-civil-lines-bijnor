'use client';

import { CartProvider } from '@/context/CartContext';
import { SessionProvider } from 'next-auth/react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
