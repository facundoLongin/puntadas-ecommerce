"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/auth-context";

type AuthPageContentProps = {
  mode: "login" | "register";
};

export function AuthPageContent({ mode }: AuthPageContentProps) {
  const router = useRouter();
  const { isAuthenticated, signInDemo } = useAuth();
  const isRegister = mode === "register";

  function handleDemoAccess() {
    signInDemo();
    router.push("/productos");
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
      <div className="grid gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7c4e]">
          {isRegister ? "Crear cuenta" : "Mi cuenta"}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-[#211d19]">
          {isRegister ? "Registrate para comprar en Puntadas" : "Ingresá para continuar tu compra"}
        </h1>
        <p className="max-w-xl leading-8 text-[#62594f]">
          Podés recorrer productos sin cuenta. Para agregar al carrito y avanzar con una compra, usá una cuenta de cliente.
        </p>
      </div>

      <div className="grid gap-5 rounded-md border border-[#eee5d8] bg-[#faf7f1] p-6 shadow-[0_16px_50px_rgba(33,29,25,0.08)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#6f7c4e]">
          {isRegister ? <UserPlus className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
        </span>
        <div className="grid gap-2">
          <h2 className="text-2xl font-semibold text-[#211d19]">
            {isAuthenticated ? "Sesión activa" : isRegister ? "Cuenta de prueba" : "Acceso de prueba"}
          </h2>
          <p className="text-sm leading-6 text-[#62594f]">
            Esta versión usa una cuenta demo local para no pedir ni guardar datos personales reales.
          </p>
        </div>
        <Button className="w-full gap-2" onClick={handleDemoAccess}>
          {isRegister ? "Crear cuenta demo" : "Ingresar con cuenta demo"}
        </Button>
        <div className="border-t border-[#e8ddce] pt-4 text-sm text-[#62594f]">
          {isRegister ? "Ya tenés una cuenta?" : "Todavía no tenés cuenta?"}{" "}
          <Link href={isRegister ? "/ingresar" : "/registro"} className="font-semibold text-[#6f7c4e] hover:text-[#4f5a35]">
            {isRegister ? "Ingresar" : "Registrarse"}
          </Link>
        </div>
      </div>
    </section>
  );
}
