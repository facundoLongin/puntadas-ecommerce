import { Router } from "express";
import type { AuthController } from "../controllers/auth.controller.js";

export function createAuthRouter(authController: AuthController) {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", authController.me);
  router.post("/logout", authController.logout);

  return router;
}
