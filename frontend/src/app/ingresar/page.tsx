import { AuthPageContent } from "@/components/auth/AuthPageContent";

export const metadata = {
  title: "Ingresar",
  description: "Acceso de cliente para Puntadas."
};

export default function LoginPage() {
  return <AuthPageContent mode="login" />;
}
