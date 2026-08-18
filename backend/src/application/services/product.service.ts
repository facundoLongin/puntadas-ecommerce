import type { ProductRepository } from "../../domain/product/product.repository.js";
import type { ProductFilters } from "../../domain/product/product.types.js";
import { NotFoundError } from "../../shared/errors/app-error.js";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  listProducts(filters: ProductFilters) {
    return this.productRepository.findMany(filters);
  }

  async getProductBySlug(slug: string) {
    const product = await this.productRepository.findBySlug(slug);

    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }

    return product;
  }
}
