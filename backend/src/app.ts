import cors from "cors";
import express from "express";
import { AuthService } from "./application/services/auth.service.js";
import { ProductService } from "./application/services/product.service.js";
import { InMemorySessionRepository } from "./infrastructure/repositories/in-memory-session.repository.js";
import { InMemoryProductRepository } from "./infrastructure/repositories/in-memory-product.repository.js";
import { InMemoryUserRepository } from "./infrastructure/repositories/in-memory-user.repository.js";
import { AuthController } from "./interfaces/http/controllers/auth.controller.js";
import { ProductController } from "./interfaces/http/controllers/product.controller.js";
import { errorMiddleware } from "./interfaces/http/middlewares/error.middleware.js";
import { createAuthRouter } from "./interfaces/http/routers/auth.router.js";
import { createProductRouter } from "./interfaces/http/routers/product.router.js";
import { env } from "./shared/config/env.js";

export function createApp() {
  const app = express();

  const userRepository = new InMemoryUserRepository();
  const sessionRepository = new InMemorySessionRepository();
  const authService = new AuthService(userRepository, sessionRepository);
  const authController = new AuthController(authService);

  const productRepository = new InMemoryProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);

  app.use(cors({ origin: env.frontendOrigin }));
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/auth", createAuthRouter(authController));
  app.use("/api/products", createProductRouter(productController));
  app.use(errorMiddleware);

  return app;
}
