import Image from "next/image";
import type { Product } from "@/types/product";

export function ProductVisual({ product }: { product: Product }) {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f5efe7]"
      data-testid="product-visual"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-300 group-hover:scale-[1.03]"
      />
      {product.isNew ? (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#59613e]">
          Nuevo
        </span>
      ) : null}
    </div>
  );
}
