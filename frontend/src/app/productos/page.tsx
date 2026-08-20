import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { demoProducts } from "@/features/products/demo-products";

export const metadata = {
  title: "Productos",
  description: "Explorá productos textiles y deco home de Puntadas con filtros por categoría, color, medida y opción."
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm text-[#7a7066]">Inicio / Productos</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#211d19]">Productos</h1>
      </div>
      <Suspense fallback={<p className="text-sm text-[#62594f]">Cargando productos...</p>}>
        <ProductCatalog products={demoProducts} />
      </Suspense>
    </div>
  );
}
