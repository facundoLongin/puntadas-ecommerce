import { AuthPageContent } from "@/components/auth/AuthPageContent";

export const metadata = {
  title: "Registrarse",
  description: "Registro de cliente para Puntadas."
};

export default function RegisterPage() {
  return <AuthPageContent mode="register" />;
}
