import cors from "cors";
import express from "express";
import { ProductService } from "./application/services/product.service.js";
import { InMemoryProductRepository } from "./infrastructure/repositories/in-memory-product.repository.js";
import { ProductController } from "./interfaces/http/controllers/product.controller.js";
import { errorMiddleware } from "./interfaces/http/middlewares/error.middleware.js";
import { createProductRouter } from "./interfaces/http/routers/product.router.js";
import { env } from "./shared/config/env.js";

export function createApp() {
  const app = express();

  const productRepository = new InMemoryProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);

  app.use(cors({ origin: env.frontendOrigin }));
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/products", createProductRouter(productController));
  app.use(errorMiddleware);

  return app;
}
