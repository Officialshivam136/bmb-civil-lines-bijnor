'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string; // Unique cart item ID (product.id + variant.id)
  productId: string;
  variantId: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  // VIP System: >= 2 orders in a month (last 30 days)
  isVipUser: boolean;
  monthlyOrderCount: number;
  vipThreshold: number;
  checkVipByPhone: (phone: string) => Promise<{ isVip: boolean; monthlyOrderCount: number; message: string }>;
  recordOrderPlaced: (orderId: string, phone?: string) => void;
  // Promo Engine
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountRate: number; // 0.10 for 10%
  discountAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [monthlyOrderCount, setMonthlyOrderCount] = useState<number>(0);
  const [isVipUser, setIsVipUser] = useState<boolean>(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const vipThreshold = 2;

  // Load from local storage & evaluate monthly orders
  useEffect(() => {
    // 1. Load Cart Items
    const saved = localStorage.getItem('bmb_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }

    // 2. Load and filter order history within the last 30 days (1 month)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const rawOrders = localStorage.getItem('bmb_monthly_orders');
    let validTimestamps: number[] = [];

    if (rawOrders) {
      try {
        const parsed = JSON.parse(rawOrders);
        if (Array.isArray(parsed)) {
          // Keep only orders placed in the last 30 days
          validTimestamps = parsed.filter((timestamp: number) => typeof timestamp === 'number' && timestamp >= thirtyDaysAgo);
        }
      } catch (e) {
        console.error('Failed to parse order history', e);
      }
    }

    // Check legacy order flag if present
    const hasLegacyOrder = localStorage.getItem('bmb_has_ordered') === 'true';
    if (hasLegacyOrder && validTimestamps.length === 0) {
      validTimestamps.push(Date.now() - 5 * 24 * 60 * 60 * 1000); // 1 order 5 days ago
    }

    // Save cleaned monthly orders
    localStorage.setItem('bmb_monthly_orders', JSON.stringify(validTimestamps));
    
    const count = validTimestamps.length;
    setMonthlyOrderCount(count);
    // VIP Rule: Must order at least twice in a month
    const isVip = count >= vipThreshold;
    setIsVipUser(isVip);

    setIsLoaded(true);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bmb_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Check VIP status in real-time from database via phone number
  const checkVipByPhone = useCallback(async (phone: string) => {
    const clean = phone.replace(/\D/g, '').slice(-10);
    if (clean.length < 10) {
      return {
        isVip: isVipUser,
        monthlyOrderCount,
        message: 'Please enter a valid 10-digit mobile number.'
      };
    }

    try {
      const res = await fetch(`/api/user/vip-status?phone=${clean}`);
      if (res.ok) {
        const data = await res.json();
        // Take the maximum of database order count or local session orders
        const effectiveCount = Math.max(data.monthlyOrderCount, monthlyOrderCount);
        const vip = effectiveCount >= vipThreshold;
        
        setIsVipUser(vip);
        setMonthlyOrderCount(effectiveCount);

        return {
          isVip: vip,
          monthlyOrderCount: effectiveCount,
          message: data.message
        };
      }
    } catch (err) {
      console.error('Failed to verify VIP status by phone', err);
    }

    return {
      isVip: isVipUser,
      monthlyOrderCount,
      message: ''
    };
  }, [isVipUser, monthlyOrderCount]);

  // Record an order placed to advance monthly count
  const recordOrderPlaced = (orderId: string, phone?: string) => {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    
    let history: number[] = [];
    const saved = localStorage.getItem('bmb_monthly_orders');
    if (saved) {
      try {
        history = JSON.parse(saved).filter((t: number) => t >= thirtyDaysAgo);
      } catch (e) {}
    }
    
    history.push(now);
    localStorage.setItem('bmb_monthly_orders', JSON.stringify(history));
    localStorage.setItem('bmb_has_ordered', 'true');

    const newCount = history.length;
    setMonthlyOrderCount(newCount);
    if (newCount >= vipThreshold) {
      setIsVipUser(true);
    }
  };

  const addToCart = (newItem: CartItem) => {
    setItems(current => {
      const existing = current.find(item => item.id === newItem.id);
      if (existing) {
        return current.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...current, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(current => 
      current.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Promo Code handling
  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'BIJNOR10' || formatted === 'PREMIUM10' || formatted === 'FESTIVE10') {
      setAppliedPromoCode(formatted);
      return { success: true, message: `10% Discount Coupon '${formatted}' applied!` };
    }
    if (formatted === 'SWEET50') {
      setAppliedPromoCode(formatted);
      return { success: true, message: '₹50 Instant Discount applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try BIJNOR10' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // VIP Rule: 10% discount applies ONLY IF user is a VIP (>= 2 orders in month) OR applies promo code
  const qualifiesFor10Percent = isVipUser || appliedPromoCode === 'BIJNOR10' || appliedPromoCode === 'PREMIUM10' || appliedPromoCode === 'FESTIVE10';
  
  let discountRate = qualifiesFor10Percent ? 0.10 : 0;
  let discountAmount = Math.round(subtotal * discountRate);

  if (appliedPromoCode === 'SWEET50' && subtotal >= 200) {
    discountAmount = 50;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalItems,
      isVipUser,
      monthlyOrderCount,
      vipThreshold,
      checkVipByPhone,
      recordOrderPlaced,
      appliedPromoCode,
      applyPromoCode,
      removePromoCode,
      discountRate,
      discountAmount,
      finalTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
