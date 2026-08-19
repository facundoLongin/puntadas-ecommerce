import { AuthPageContent } from "@/components/auth/AuthPageContent";

export const metadata = {
  title: "Ingresar | Puntadas",
  description: "Acceso de cliente demo para Puntadas."
};

export default function LoginPage() {
  return <AuthPageContent mode="login" />;
}
