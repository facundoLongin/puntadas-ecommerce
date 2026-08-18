import type { ProductCategory, ProductColor, ProductSort } from "@/types/product";

export const categoryLabels: Record<ProductCategory, string> = {
  acolchados: "Acolchados",
  almohadones: "Almohadones",
  cubrecamas: "Cubrecamas",
  "cubre-edredones": "Cubre edredones",
  "piezas-de-cama": "Piezas de cama",
  respaldos: "Respaldos"
};

export const colorLabels: Record<ProductColor, string> = {
  beige: "Beige",
  gris: "Gris",
  nuez: "Nuez",
  "off-white": "Off white",
  "verde-oliva": "Verde oliva"
};

export const sortLabels: Record<ProductSort, string> = {
  newest: "Mas nuevo al mas viejo",
  "price-asc": "Menor precio",
  "price-desc": "Mayor precio",
  name: "Nombre"
};
