"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type CartFeedback = {
  id: number;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  tone?: "success" | "auth";
};

type CartFeedbackContextValue = {
  feedback: CartFeedback | null;
  showCartFeedback: (message: Omit<CartFeedback, "id">) => void;
  dismissCartFeedback: () => void;
};

const CartFeedbackContext = createContext<CartFeedbackContextValue | null>(null);

export function CartFeedbackProvider({ children }: { children: ReactNode }) {
  const [feedback, setFeedback] = useState<CartFeedback | null>(null);

  const value = useMemo<CartFeedbackContextValue>(
    () => ({
      feedback,
      showCartFeedback: (message) => {
        const id = Date.now();
        setFeedback({ ...message, id });
        window.setTimeout(() => {
          setFeedback((currentFeedback) => (currentFeedback?.id === id ? null : currentFeedback));
        }, 3200);
      },
      dismissCartFeedback: () => setFeedback(null)
    }),
    [feedback]
  );

  return <CartFeedbackContext.Provider value={value}>{children}</CartFeedbackContext.Provider>;
}

export function useCartFeedback() {
  const context = useContext(CartFeedbackContext);

  if (!context) {
    throw new Error("useCartFeedback debe usarse dentro de CartFeedbackProvider");
  }

  return context;
}
