"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CircleHelp, Menu, Search, X } from "lucide-react";
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
  const router = useRouter();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchTerm.trim();
    const href = query ? `/productos?q=${encodeURIComponent(query)}` : "/productos";

    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(false);
    router.push(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#eee5d8] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap sm:gap-4 sm:px-6">
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

        <form className="hidden flex-1 md:block" onSubmit={handleSearchSubmit}>
          <label className="relative block">
            <span className="sr-only">Buscar productos</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Que estas buscando?"
              className="h-11 w-full rounded-md border border-[#d8c4a5] bg-white px-4 pr-11 text-sm text-[#24211d] outline-none transition placeholder:text-[#8a8175] focus:border-[#6f7c4e]"
            />
            <button
              type="submit"
              aria-label="Buscar productos"
              className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#6f7c4e] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
            >
              <Search className="h-5 w-5" />
            </button>
          </label>
        </form>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <IconButton
            label={isMobileSearchOpen ? "Cerrar busqueda" : "Buscar"}
            className="md:hidden"
            aria-expanded={isMobileSearchOpen}
            aria-controls="mobile-search"
            onClick={() => {
              setIsMobileSearchOpen((current) => !current);
              setIsMobileMenuOpen(false);
            }}
          >
            {isMobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </IconButton>
          <Link
            href="/preguntas-frecuentes"
            aria-label="Ayuda"
            title="Ayuda"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#292622] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
          >
            <CircleHelp className="h-5 w-5" />
          </Link>
          <AccountMenu className="hidden sm:flex" />
          <CartStatus />
          <IconButton
            label={isMobileMenuOpen ? "Cerrar menu" : "Menu"}
            className="lg:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setIsMobileMenuOpen((current) => !current);
              setIsMobileSearchOpen(false);
            }}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>
        </div>

        <AccountMenu className="w-full sm:hidden" />
      </div>

      {isMobileSearchOpen ? (
        <div id="mobile-search" className="border-t border-[#f0e7db] px-4 py-3 md:hidden">
          <form className="mx-auto max-w-7xl" onSubmit={handleSearchSubmit}>
            <label className="relative block">
              <span className="sr-only">Buscar productos</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar productos"
                autoFocus
                className="h-11 w-full rounded-md border border-[#d8c4a5] bg-white px-4 pr-11 text-sm text-[#24211d] outline-none transition placeholder:text-[#8a8175] focus:border-[#6f7c4e]"
              />
              <button
                type="submit"
                aria-label="Buscar productos"
                className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#6f7c4e] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
              >
                <Search className="h-5 w-5" />
              </button>
            </label>
          </form>
        </div>
      ) : null}

      <nav className="hidden border-t border-[#f0e7db] lg:block">
        <div className="mx-auto flex max-w-7xl justify-center gap-9 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#312d28]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#6f7c4e]">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <nav id="mobile-navigation" className="border-t border-[#f0e7db] bg-white lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3 text-sm font-semibold text-[#312d28]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 transition hover:bg-[#f4efe7] hover:text-[#6f7c4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
