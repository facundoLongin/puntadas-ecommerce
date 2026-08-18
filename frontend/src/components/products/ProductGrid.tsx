import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="rounded-md border border-[#eee5d8] bg-[#faf7f1] p-8 text-center text-sm text-[#5e564c]">
        No encontramos productos con esos filtros.
      </div>
    );
  }

  return (
    <div className="grid auto-rows-max grid-cols-2 items-start gap-x-4 gap-y-9 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
