import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CartFeedback } from "@/components/cart/CartFeedback";
import { CartFeedbackProvider } from "@/components/cart/CartFeedbackProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  applicationName: "Puntadas",
  title: {
    default: "Puntadas | Textil y deco home",
    template: "%s | Puntadas"
  },
  description: "Productos textiles y deco home con datos demo para desarrollo.",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Puntadas | Textil y deco home",
    description: "Productos textiles para vestir la casa con tonos calidos y detalles cuidados.",
    siteName: "Puntadas",
    locale: "es_AR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <CartFeedbackProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartFeedback />
            </CartProvider>
          </CartFeedbackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
