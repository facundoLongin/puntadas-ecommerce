import { Router } from "express";
import type { ProductController } from "../controllers/product.controller.js";

export function createProductRouter(productController: ProductController) {
  const router = Router();

  router.get("/", productController.list);
  router.get("/:slug", productController.detail);

  return router;
}
