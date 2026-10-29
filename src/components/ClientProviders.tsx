'use client';

import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from 'next-auth/react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
