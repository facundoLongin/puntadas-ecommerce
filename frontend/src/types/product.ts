export type ProductCategory =
  | "acolchados"
  | "almohadones"
  | "cubrecamas"
  | "cubre-edredones"
  | "piezas-de-cama"
  | "respaldos";

export type ProductColor =
  | "beige"
  | "gris"
  | "nuez"
  | "off-white"
  | "verde-oliva";

export type ProductSort = "newest" | "price-asc" | "price-desc" | "name";

export type ProductMeasureVariant = {
  measure: string;
  price: number;
  transferPrice: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  colors: ProductColor[];
  measures: string[];
  options: string[];
  price: number;
  transferPrice: number;
  measureVariants: ProductMeasureVariant[];
  installments: number;
  imageUrl: string;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export type ProductFilterState = {
  categories: ProductCategory[];
  colors: ProductColor[];
  measures: string[];
  options: string[];
  sort: ProductSort;
};
