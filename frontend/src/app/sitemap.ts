import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const lastModified = "2026-08-20";
const routes = [
  "",
  "/productos",
  "/guia-de-medidas",
  "/contacto",
  "/quienes-somos",
  "/formas-de-pago",
  "/preguntas-frecuentes",
  "/ingresar",
  "/registro"
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/productos" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
