"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/features/cart/cart-context";

export function CartStatus() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/carrito"
      aria-label={`Mi carrito, ${itemCount} productos`}
      title={`Mi carrito, ${itemCount} productos`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#292622] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6f7c4e] px-1 text-[10px] font-semibold text-white">
        {itemCount}
      </span>
    </Link>
  );
}
