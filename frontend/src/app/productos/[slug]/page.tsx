import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProductPurchaseForm } from "@/components/products/ProductPurchaseForm";
import { ProductVisual } from "@/components/products/ProductVisual";
import { demoProducts } from "@/features/products/demo-products";
import { categoryLabels, colorLabels } from "@/features/products/product-options";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return demoProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = demoProducts.find((item) => item.slug === slug);

  return {
    title: product ? `${product.name} | Puntadas` : "Producto | Puntadas",
    description: product?.description ?? "Detalle de producto de Puntadas"
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = demoProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
      <ProductVisual product={product} />
      <section className="grid content-start gap-6">
        <div>
          <p className="text-sm text-[#7a7066]">
            <Link href="/productos" className="hover:text-[#6f7c4e]">
              Productos
            </Link>{" "}
            / {categoryLabels[product.category]}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[#211d19]">{product.name}</h1>
          <p className="mt-4 max-w-2xl leading-8 text-[#62594f]">{product.description}</p>
        </div>

        <div className="grid gap-4 text-sm text-[#4b443c]">
          <p>
            <span className="font-semibold">Colores:</span>{" "}
            {product.colors.map((color) => colorLabels[color]).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Medidas:</span> {product.measures.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Opciones:</span> {product.options.join(", ")}
          </p>
        </div>

        <div className="grid gap-3">
          <ProductPurchaseForm product={product} />
          <Link href="/guia-de-medidas">
            <Button variant="ghost" className="border border-[#d8c4a5]">
              Ver guia de medidas
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
