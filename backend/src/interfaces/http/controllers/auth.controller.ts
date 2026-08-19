import type { Request, Response } from "express";
import type { AuthService } from "../../../application/services/auth.service.js";
import { UnauthorizedError } from "../../../shared/errors/app-error.js";
import { loginSchema, registerSchema } from "../../../shared/validation/auth.schema.js";

function getBearerToken(request: Request) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Sesion requerida");
  }

  return authorization.slice("Bearer ".length);
}

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (request: Request, response: Response) => {
    const { confirmPassword: _confirmPassword, ...input } = registerSchema.parse(request.body);
    const auth = await this.authService.register(input);
    response.status(201).json({ data: auth });
  };

  login = async (request: Request, response: Response) => {
    const input = loginSchema.parse(request.body);
    const auth = await this.authService.login(input);
    response.json({ data: auth });
  };

  me = async (request: Request, response: Response) => {
    const token = getBearerToken(request);
    const user = await this.authService.getSessionUser(token);
    response.json({ data: { user } });
  };

  logout = async (request: Request, response: Response) => {
    const token = getBearerToken(request);
    await this.authService.logout(token);
    response.status(204).send();
  };
}
