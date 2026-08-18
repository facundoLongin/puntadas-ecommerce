import type { Request, Response } from "express";
import type { ProductService } from "../../../application/services/product.service.js";
import { ValidationError } from "../../../shared/errors/app-error.js";
import { productQuerySchema } from "../../../shared/validation/product-query.schema.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  list = async (request: Request, response: Response) => {
    const filters = productQuerySchema.parse(request.query);
    const products = await this.productService.listProducts(filters);
    response.json({ data: products });
  };

  detail = async (request: Request, response: Response) => {
    const slug = request.params.slug;

    if (typeof slug !== "string") {
      throw new ValidationError("Slug invalido");
    }

    const product = await this.productService.getProductBySlug(slug);
    response.json({ data: product });
  };
}
