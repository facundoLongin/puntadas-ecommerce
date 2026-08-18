export type ProductId = string;

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

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  colors: ProductColor[];
  measures: string[];
  options: string[];
  price: number;
  transferPrice: number;
  installments: number;
  imageUrl: string;
  isNew: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
};

export type ProductFilters = {
  categories?: ProductCategory[];
  colors?: ProductColor[];
  measures?: string[];
  options?: string[];
  sort?: ProductSort;
};
