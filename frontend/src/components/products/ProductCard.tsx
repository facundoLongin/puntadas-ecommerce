import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@/types/product";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const installmentValue = product.price / product.installments;

  return (
    <article className="group grid self-start content-start gap-3" data-testid="product-card">
      <Link className="block" href={`/productos/${product.slug}`} aria-label={`Ver ${product.name}`}>
        <ProductVisual product={product} />
      </Link>
      <div className="grid content-start gap-2" data-testid="product-card-body">
        <Link
          href={`/productos/${product.slug}`}
          className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-[#2c2823] transition group-hover:text-[#6f7c4e]"
        >
          {product.name}
        </Link>
        <div className="grid gap-1 text-sm">
          <p className="font-bold text-[#171411]">{formatCurrency(product.price)}</p>
          <p className="text-xs font-semibold leading-5 text-[#4a443d]">
            {formatCurrency(product.transferPrice)} con transferencia
          </p>
          <p className="text-xs text-[#6f675d]">
            {product.installments} x {formatCurrency(installmentValue)} sin interes
          </p>
        </div>
        <Button className="mt-1 w-full">Comprar</Button>
      </div>
    </article>
  );
}
