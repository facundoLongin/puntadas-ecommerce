"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  measure: string;
  unitPrice: number;
  transferUnitPrice: number;
  quantity: number;
};

type AddToCartInput = {
  product: Product;
  measure: string;
  unitPrice: number;
  transferUnitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (input: AddToCartInput) => void;
  increaseItem: (itemId: string) => void;
  decreaseItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "puntadas-demo-cart";

function getCartItemId(productId: string, measure: string) {
  return `${productId}:${measure}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedCart = window.localStorage.getItem(storageKey);
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart) as CartItem[];
        if (Array.isArray(parsedItems)) {
          return parsedItems;
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    return [];
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem: ({ product, measure, unitPrice, transferUnitPrice }) => {
        setItems((currentItems) => {
          const id = getCartItemId(product.id, measure);
          const existingItem = currentItems.find((item) => item.id === id);

          if (existingItem) {
            return currentItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1, unitPrice, transferUnitPrice } : item
            );
          }

          return [
            ...currentItems,
            {
              id,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl: product.imageUrl,
              measure,
              unitPrice,
              transferUnitPrice,
              quantity: 1
            }
          ];
        });
      },
      increaseItem: (itemId) => {
        setItems((currentItems) =>
          currentItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item))
        );
      },
      decreaseItem: (itemId) => {
        setItems((currentItems) =>
          currentItems.flatMap((item) => {
            if (item.id !== itemId) {
              return [item];
            }

            if (item.quantity <= 1) {
              return [];
            }

            return [{ ...item, quantity: item.quantity - 1 }];
          })
        );
      },
      removeItem: (itemId) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
      },
      clearCart: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
