"use client";

import Link from "next/link";
import { LogIn, LogOut, UserPlus, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/auth-context";

export function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Mi cuenta"
        title="Mi cuenta"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#292622] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
        onClick={() => setIsOpen((current) => !current)}
      >
        <UserRound className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-md border border-[#eee5d8] bg-white p-3 shadow-[0_18px_48px_rgba(33,29,25,0.16)]">
          {isAuthenticated ? (
            <div className="grid gap-2">
              <div className="rounded-md bg-[#faf7f1] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f7c4e]">Cuenta</p>
                <p className="mt-1 font-semibold text-[#211d19]">{user?.name}</p>
              </div>
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[#2a2825] transition hover:bg-[#f4efe7]"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="grid gap-2">
              <Link
                href="/ingresar"
                className="flex h-10 items-center gap-2 rounded-md bg-[#d8c4a5] px-3 text-sm font-semibold text-[#211b16] transition hover:bg-[#c9b28e]"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="flex h-10 items-center gap-2 rounded-md border border-[#d8c4a5] px-3 text-sm font-semibold text-[#2a2825] transition hover:bg-[#f4efe7]"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="h-4 w-4" />
                Registrarse
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
