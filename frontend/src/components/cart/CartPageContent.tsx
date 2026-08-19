"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/auth-context";
import { useCart } from "@/features/cart/cart-context";
import { formatCurrency } from "@/lib/formatters";

export function CartPageContent() {
  const { isAuthenticated } = useAuth();
  const { items, itemCount, subtotal, increaseItem, decreaseItem, removeItem, clearCart } = useCart();

  if (!items.length) {
    return (
      <section className="mx-auto grid max-w-3xl justify-items-center gap-5 px-4 py-16 text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4efe7] text-[#6f7c4e]">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <div className="grid gap-2">
          <h1 className="text-3xl font-semibold text-[#211d19]">Tu carrito esta vacio</h1>
          <p className="text-[#62594f]">Elegí productos demo y agregalos con la medida que prefieras.</p>
        </div>
        <Link href="/productos">
          <Button>Ver productos</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7c4e]">Carrito</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#211d19]">Productos seleccionados</h1>
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-md border border-[#eee5d8] bg-white p-4 sm:grid-cols-[96px_1fr] lg:grid-cols-[96px_1fr_auto]"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-[#f4efe7]">
                <Image src={item.imageUrl} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="grid content-center gap-1">
                <Link href={`/productos/${item.slug}`} className="font-semibold text-[#211d19] hover:text-[#6f7c4e]">
                  {item.name}
                </Link>
                <p className="text-sm text-[#62594f]">Medida: {item.measure}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex h-10 items-center rounded-md border border-[#d8c4a5] bg-white">
                    <button
                      type="button"
                      aria-label={`Reducir cantidad de ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center text-[#2a2825] transition hover:bg-[#f4efe7]"
                      onClick={() => decreaseItem(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex h-10 min-w-10 items-center justify-center border-x border-[#d8c4a5] px-3 text-sm font-semibold text-[#211d19]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center text-[#2a2825] transition hover:bg-[#f4efe7]"
                      onClick={() => increaseItem(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#6f675d] transition hover:bg-[#f4efe7] hover:text-[#211d19]"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Quitar
                  </button>
                </div>
              </div>
              <div className="grid content-center gap-1 text-left sm:text-right">
                <p className="font-semibold text-[#211d19]">{formatCurrency(item.unitPrice * item.quantity)}</p>
                <p className="text-xs text-[#62594f]">
                  {formatCurrency(item.transferUnitPrice * item.quantity)} con transferencia
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="grid h-fit gap-4 rounded-md border border-[#eee5d8] bg-[#faf7f1] p-5">
        <h2 className="text-lg font-semibold text-[#211d19]">Resumen</h2>
        <div className="flex justify-between text-sm text-[#62594f]">
          <span>Productos</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex justify-between border-t border-[#e8ddce] pt-4 font-semibold text-[#211d19]">
          <span>Subtotal demo</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <p className="text-xs leading-5 text-[#62594f]">
          Este carrito es una simulacion para desarrollo. No registra compras reales ni datos de clientes.
        </p>
        <Link href={isAuthenticated ? "/contacto" : "/ingresar"}>
          <Button className="w-full">{isAuthenticated ? "Consultar compra" : "Ingresar para comprar"}</Button>
        </Link>
        <Button variant="ghost" className="border border-[#d8c4a5]" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </aside>
    </section>
  );
}
