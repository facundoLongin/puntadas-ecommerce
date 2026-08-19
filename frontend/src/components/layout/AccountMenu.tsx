"use client";

import Link from "next/link";
import { LogIn, LogOut, UserPlus, UserRound } from "lucide-react";
import { useAuth } from "@/features/auth/auth-context";

export function AccountMenu() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <span className="hidden h-10 items-center rounded-md border border-[#eee5d8] bg-[#faf7f1] px-3 text-sm font-semibold text-[#6f675d] sm:inline-flex">
        Cuenta
      </span>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex h-10 max-w-[150px] items-center gap-2 rounded-md border border-[#d8c4a5] bg-[#faf7f1] px-3 text-sm font-semibold text-[#211d19] sm:max-w-none">
          <UserRound className="h-4 w-4 shrink-0 text-[#6f7c4e]" />
          <span className="truncate">{user?.firstName}</span>
        </span>
        <button
          type="button"
          aria-label="Cerrar sesion"
          title="Cerrar sesion"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#292622] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
          onClick={() => void signOut()}
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/ingresar"
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d8c4a5] bg-white px-3 text-sm font-semibold text-[#2a2825] transition hover:bg-[#f4efe7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
      >
        <LogIn className="h-4 w-4" />
        <span>Ingresar</span>
      </Link>
      <Link
        href="/registro"
        className="inline-flex h-10 items-center gap-2 rounded-md bg-[#d8c4a5] px-3 text-sm font-semibold text-[#211b16] transition hover:bg-[#c9b28e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]"
      >
        <UserPlus className="h-4 w-4" />
        <span>Registrarme</span>
      </Link>
    </div>
  );
}
