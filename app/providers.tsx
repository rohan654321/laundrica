'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/context/cart-context';
import { SessionProvider } from '@/context/session-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}