"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

// ---- Types ----

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: string) => void;
  increaseQuantity: (cartKey: string) => void;
  decreaseQuantity: (cartKey: string) => void;
  removeFromCart: (cartKey: string) => void;
  totalItems: number;
  totalPrice: number;
}

// ---- Context ----

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ---- localStorage helpers ----

const CART_KEY = "ecommerce-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// ---- Provider ----

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Sync cart changes to localStorage
  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  function cartKey(productId: number, size: string, color: string) {
    return `${productId}-${size}-${color}`;
  }

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    setItems((prev) => {
      const key = cartKey(product.id, size, color);
      const existing = prev.find(
        (item) => cartKey(item.product.id, item.size, item.color) === key
      );
      if (existing) {
        return prev.map((item) =>
          cartKey(item.product.id, item.size, item.color) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size, color }];
    });
  }, []);

  const increaseQuantity = useCallback((key: string) => {
    setItems((prev) =>
      prev.map((item) =>
        cartKey(item.product.id, item.size, item.color) === key
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((key: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          cartKey(item.product.id, item.size, item.color) === key
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => cartKey(item.product.id, item.size, item.color) !== key
      )
    );
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ---- Hook ----

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
