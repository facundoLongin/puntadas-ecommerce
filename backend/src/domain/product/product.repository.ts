import type { Product, ProductFilters } from "./product.types.js";

export interface ProductRepository {
  findMany(filters: ProductFilters): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
}
