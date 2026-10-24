'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  // Loyalty / Returning Member System
  isReturningCustomer: boolean;
  isClubMember: boolean;
  joinClubMembership: () => void;
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountRate: number; // e.g. 0.10 for 10%
  discountAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);
  const [isClubMember, setIsClubMember] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  // Load from local storage & detect returning visitor
  useEffect(() => {
    // 1. Load Cart
    const saved = localStorage.getItem('bmb_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }

    // 2. Returning Customer & Membership detection
    const visits = parseInt(localStorage.getItem('bmb_visit_count') || '0', 10);
    const hasPlacedPreviousOrder = localStorage.getItem('bmb_has_ordered') === 'true';
    const isMember = localStorage.getItem('bmb_club_member') === 'true';

    // Increment visit count
    localStorage.setItem('bmb_visit_count', String(visits + 1));

    // A returning customer is someone who visited more than once or already ordered or enrolled in membership
    if (visits > 0 || hasPlacedPreviousOrder || isMember) {
      setIsReturningCustomer(true);
    }

    if (isMember) {
      setIsClubMember(true);
    }

    setIsLoaded(true);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bmb_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const joinClubMembership = () => {
    localStorage.setItem('bmb_club_member', 'true');
    localStorage.setItem('bmb_visit_count', '5'); // Mark as established returning patron
    setIsClubMember(true);
    setIsReturningCustomer(true);
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
      return { success: true, message: "₹50 Instant Discount applied!" };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try BIJNOR10' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // 10% Discount automatically granted if Returning Customer, Club Member, or Promo Applied
  const qualifiesFor10Percent = isReturningCustomer || isClubMember || appliedPromoCode === 'BIJNOR10' || appliedPromoCode === 'PREMIUM10' || appliedPromoCode === 'FESTIVE10';
  
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
      isReturningCustomer,
      isClubMember,
      joinClubMembership,
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
