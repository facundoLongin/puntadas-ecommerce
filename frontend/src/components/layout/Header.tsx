import Image from "next/image";
import Link from "next/link";
import { CircleHelp, Menu, Search } from "lucide-react";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { CartStatus } from "@/components/cart/CartStatus";
import { IconButton } from "@/components/ui/IconButton";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/guia-de-medidas", label: "Guia de medidas" },
  { href: "/contacto", label: "Contacto" },
  { href: "/quienes-somos", label: "Quienes somos" },
  { href: "/formas-de-pago", label: "Formas de pago" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#eee5d8] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Puntadas inicio">
          <span className="relative h-14 w-14 overflow-hidden rounded-full border border-[#e8ddce] bg-white">
            <Image
              src="/brand/puntadas-logo-original.png"
              alt="Puntadas"
              fill
              sizes="56px"
              className="object-cover invert"
              priority
            />
          </span>
        </Link>

        <form className="hidden flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Buscar productos</span>
            <input
              placeholder="Que estas buscando?"
              className="h-11 w-full rounded-md border border-[#d8c4a5] bg-white px-4 pr-11 text-sm text-[#24211d] outline-none transition placeholder:text-[#8a8175] focus:border-[#6f7c4e]"
            />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6f7c4e]" />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <IconButton label="Buscar" className="md:hidden">
            <Search className="h-5 w-5" />
          </IconButton>
          <IconButton label="Ayuda">
            <CircleHelp className="h-5 w-5" />
          </IconButton>
          <AccountMenu />
          <CartStatus />
          <IconButton label="Menu" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      <nav className="hidden border-t border-[#f0e7db] lg:block">
        <div className="mx-auto flex max-w-7xl justify-center gap-9 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#312d28]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#6f7c4e]">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
