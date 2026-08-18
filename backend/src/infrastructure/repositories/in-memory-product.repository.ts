import { productMatchesFilters, sortProducts } from "../../domain/product/product.filters.js";
import type { ProductRepository } from "../../domain/product/product.repository.js";
import type { Product, ProductFilters } from "../../domain/product/product.types.js";
import { demoProducts } from "../persistence/demo-products.js";

export class InMemoryProductRepository implements ProductRepository {
  constructor(private readonly products: Product[] = demoProducts) {}

  async findMany(filters: ProductFilters): Promise<Product[]> {
    const filtered = this.products.filter((product) => productMatchesFilters(product, filters));
    return sortProducts(filtered, filters.sort);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.products.find((product) => product.slug === slug && product.isActive) ?? null;
  }
}
