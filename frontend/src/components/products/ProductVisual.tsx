import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

const toneClasses: Record<Product["imageTone"], string> = {
  linen: "from-[#ede2d2] via-[#d8c4a5] to-[#bca78b]",
  olive: "from-[#dfe3d0] via-[#8a9469] to-[#59613e]",
  pearl: "from-[#f1f0ec] via-[#d6d2ca] to-[#a9a39a]",
  camel: "from-[#ead9c2] via-[#bf9f77] to-[#8d6a45]",
  stone: "from-[#eeece7] via-[#bbb4a8] to-[#7c756b]",
  cotton: "from-[#f5efe5] via-[#d9c8ad] to-[#758158]"
};

export function ProductVisual({ product }: { product: Product }) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br", toneClasses[product.imageTone])}>
      <div className="absolute inset-x-6 top-8 h-20 rounded-b-[40%] bg-white/50 shadow-sm" />
      <div className="absolute bottom-10 left-5 right-5 h-28 rounded-t-[42px] bg-white/35 shadow-lg" />
      <div className="absolute bottom-8 left-8 right-8 h-5 rounded-full bg-black/10" />
      {product.isNew ? (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#59613e]">
          Nuevo
        </span>
      ) : null}
    </div>
  );
}
