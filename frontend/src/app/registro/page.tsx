import { AuthPageContent } from "@/components/auth/AuthPageContent";

export const metadata = {
  title: "Registrarse | Puntadas",
  description: "Registro de cliente demo para Puntadas."
};

export default function RegisterPage() {
  return <AuthPageContent mode="register" />;
}
