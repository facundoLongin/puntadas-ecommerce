import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { demoProducts } from "@/features/products/demo-products";

export default function Home() {
  const featuredProducts = demoProducts.filter((product) => product.isFeatured);

  return (
    <div className="bg-white">
      <section className="border-b border-[#eee5d8]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f7c4e]">
              Textil - Deco home
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-[#211d19] sm:text-5xl">
              Puntadas
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#62594f]">
              Productos textiles pensados para vestir la casa con texturas simples,
              tonos calidos y detalles cuidados.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/productos">
                <Button className="gap-2">
                  Ver productos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/guia-de-medidas">
                <Button variant="ghost" className="border border-[#d8c4a5]">
                  Guia de medidas
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-md bg-[#f5efe7] shadow-sm">
            <Image
              src="/images/hero/puntadas-home-hero.png"
              alt="Dormitorio luminoso con textiles Puntadas en tonos beige, off white y verde oliva"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f7c4e]">Seleccion destacados</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#211d19]">Productos para empezar</h2>
          </div>
          <Link href="/productos" className="hidden text-sm font-semibold text-[#6f7c4e] md:inline">
            Ver todo
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
