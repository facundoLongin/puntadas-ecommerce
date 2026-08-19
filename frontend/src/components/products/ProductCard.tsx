import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductPurchaseForm } from "./ProductPurchaseForm";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
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
        <ProductPurchaseForm product={product} compact />
      </div>
    </article>
  );
}
