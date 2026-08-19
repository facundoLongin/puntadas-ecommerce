"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/auth-context";
import { ApiRequestError, type ApiValidationDetail, type LoginInput, type RegisterInput } from "@/features/auth/auth-api";

type AuthPageContentProps = {
  mode: "login" | "register";
};

const emptyRegisterForm: RegisterInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address: {
    street: "",
    streetNumber: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: ""
  }
};

const emptyLoginForm: LoginInput = {
  email: "",
  password: ""
};

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  autoComplete?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function Field({ label, name, type = "text", value, autoComplete, required = true, onChange }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm text-[#34302b]">
      <span className="font-medium">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        className="h-11 rounded-md border border-[#d9cbb5] bg-white px-3 text-sm outline-none transition placeholder:text-[#8a8175] focus:border-[#6f7c4e]"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function AuthPageContent({ mode }: AuthPageContentProps) {
  const router = useRouter();
  const { isAuthenticated, login, register } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginInput>(emptyLoginForm);
  const [registerForm, setRegisterForm] = useState<RegisterInput>(emptyRegisterForm);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<ApiValidationDetail[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setErrorDetails([]);
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await register(registerForm);
      } else {
        await login(loginForm);
      }

      router.push("/productos");
    } catch (submitError) {
      if (submitError instanceof ApiRequestError) {
        setError(submitError.message);
        setErrorDetails(submitError.details);
      } else {
        setError(submitError instanceof Error ? submitError.message : "No pudimos procesar la solicitud");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="grid gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7c4e]">
          {isRegister ? "Crear cuenta" : "Mi cuenta"}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-[#211d19]">
          {isRegister ? "Registrate para comprar en Puntadas" : "Ingresá para continuar tu compra"}
        </h1>
        <p className="max-w-xl leading-8 text-[#62594f]">
          Podés recorrer productos sin cuenta. Para agregar al carrito y avanzar con una compra, necesitás una cuenta.
        </p>
        <p className="max-w-xl text-sm leading-6 text-[#7a7066]">
          En esta etapa las cuentas se guardan en memoria del backend. Si detenés el servidor, se borran.
        </p>
      </div>

      <form
        className="grid gap-5 rounded-md border border-[#eee5d8] bg-[#faf7f1] p-6 shadow-[0_16px_50px_rgba(33,29,25,0.08)]"
        onSubmit={handleSubmit}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#6f7c4e]">
          {isRegister ? <UserPlus className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
        </span>

        <div className="grid gap-2">
          <h2 className="text-2xl font-semibold text-[#211d19]">
            {isAuthenticated ? "Sesión activa" : isRegister ? "Crear cuenta" : "Ingresar"}
          </h2>
          <p className="text-sm leading-6 text-[#62594f]">
            {isRegister
              ? "Usá datos de prueba si estás mostrando este repo como portfolio."
              : "Ingresá con el email y la contraseña de una cuenta creada mientras el backend está levantado."}
          </p>
        </div>

        {isRegister ? (
          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre"
                name="firstName"
                value={registerForm.firstName}
                autoComplete="given-name"
                onChange={(value) => setRegisterForm((current) => ({ ...current, firstName: value }))}
              />
              <Field
                label="Apellido"
                name="lastName"
                value={registerForm.lastName}
                autoComplete="family-name"
                onChange={(value) => setRegisterForm((current) => ({ ...current, lastName: value }))}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={registerForm.email}
                autoComplete="email"
                onChange={(value) => setRegisterForm((current) => ({ ...current, email: value }))}
              />
              <Field
                label="Teléfono"
                name="phone"
                type="tel"
                value={registerForm.phone}
                autoComplete="tel"
                onChange={(value) => setRegisterForm((current) => ({ ...current, phone: value }))}
              />
              <Field
                label="Contraseña"
                name="password"
                type="password"
                value={registerForm.password}
                autoComplete="new-password"
                onChange={(value) => setRegisterForm((current) => ({ ...current, password: value }))}
              />
              <Field
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                value={registerForm.confirmPassword}
                autoComplete="new-password"
                onChange={(value) => setRegisterForm((current) => ({ ...current, confirmPassword: value }))}
              />
            </div>

            <div className="grid gap-4 border-t border-[#e8ddce] pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6f7c4e]">Dirección de entrega</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Calle"
                  name="street"
                  value={registerForm.address.street}
                  autoComplete="address-line1"
                  onChange={(value) =>
                    setRegisterForm((current) => ({ ...current, address: { ...current.address, street: value } }))
                  }
                />
                <Field
                  label="Número"
                  name="streetNumber"
                  value={registerForm.address.streetNumber}
                  autoComplete="address-line2"
                  onChange={(value) =>
                    setRegisterForm((current) => ({ ...current, address: { ...current.address, streetNumber: value } }))
                  }
                />
                <Field
                  label="Piso/depto"
                  name="apartment"
                  value={registerForm.address.apartment ?? ""}
                  required={false}
                  onChange={(value) =>
                    setRegisterForm((current) => ({ ...current, address: { ...current.address, apartment: value } }))
                  }
                />
                <Field
                  label="Ciudad"
                  name="city"
                  value={registerForm.address.city}
                  autoComplete="address-level2"
                  onChange={(value) =>
                    setRegisterForm((current) => ({ ...current, address: { ...current.address, city: value } }))
                  }
                />
                <Field
                  label="Provincia"
                  name="province"
                  value={registerForm.address.province}
                  autoComplete="address-level1"
                  onChange={(value) =>
                    setRegisterForm((current) => ({ ...current, address: { ...current.address, province: value } }))
                  }
                />
                <Field
                  label="Código postal"
                  name="postalCode"
                  value={registerForm.address.postalCode}
                  autoComplete="postal-code"
                  onChange={(value) =>
                    setRegisterForm((current) => ({ ...current, address: { ...current.address, postalCode: value } }))
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <Field
              label="Email"
              name="email"
              type="email"
              value={loginForm.email}
              autoComplete="email"
              onChange={(value) => setLoginForm((current) => ({ ...current, email: value }))}
            />
            <Field
              label="Contraseña"
              name="password"
              type="password"
              value={loginForm.password}
              autoComplete="current-password"
              onChange={(value) => setLoginForm((current) => ({ ...current, password: value }))}
            />
          </div>
        )}

        {error ? (
          <div className="rounded-md border border-[#e7c7bd] bg-[#fff6f2] px-3 py-3 text-sm text-[#8f3e2f]">
            <p className="font-semibold">{error}</p>
            {errorDetails.length ? (
              <ul className="mt-2 grid gap-2">
                {errorDetails.map((detail) => (
                  <li key={`${detail.field}-${detail.message}`} className="leading-5">
                    <span className="font-semibold">{detail.label}:</span> {detail.message}. {detail.hint}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : isRegister ? "Crear cuenta" : "Ingresar"}
        </Button>

        <div className="border-t border-[#e8ddce] pt-4 text-sm text-[#62594f]">
          {isRegister ? "Ya tenés una cuenta?" : "Todavía no tenés cuenta?"}{" "}
          <Link href={isRegister ? "/ingresar" : "/registro"} className="font-semibold text-[#6f7c4e] hover:text-[#4f5a35]">
            {isRegister ? "Ingresar" : "Registrarse"}
          </Link>
        </div>
      </form>
    </section>
  );
}
