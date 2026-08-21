import { ZodError } from "zod";
import { EdgeAuthService } from "../../application/services/edge-auth.service.js";
import { ProductService } from "../../application/services/product.service.js";
import { D1SessionRepository } from "../../infrastructure/repositories/d1-session.repository.js";
import { D1UserRepository } from "../../infrastructure/repositories/d1-user.repository.js";
import { InMemoryProductRepository } from "../../infrastructure/repositories/in-memory-product.repository.js";
import { AppError } from "../../shared/errors/app-error.js";
import { UnauthorizedError } from "../../shared/errors/app-error.js";
import { productQuerySchema } from "../../shared/validation/product-query.schema.js";
import { loginSchema, registerSchema } from "../../shared/validation/auth.schema.js";
import { toValidationErrorDetails } from "../../shared/validation/validation-error-details.js";

type WorkerEnv = {
  DB?: D1Database;
  FRONTEND_ORIGIN?: string;
};

type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: ReturnType<typeof toValidationErrorDetails>;
  };
};

const productService = new ProductService(new InMemoryProductRepository());

function getCorsHeaders(request: Request, env: WorkerEnv) {
  const requestOrigin = request.headers.get("Origin");
  const configuredOrigin = env.FRONTEND_ORIGIN ?? "*";
  const allowedOrigin =
    configuredOrigin === "*" || !requestOrigin || requestOrigin === configuredOrigin
      ? configuredOrigin
      : configuredOrigin;

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

function jsonResponse<T>(request: Request, env: WorkerEnv, body: T, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getCorsHeaders(request, env),
      ...init.headers
    }
  });
}

function errorResponse(request: Request, env: WorkerEnv, status: number, code: string, message: string) {
  return jsonResponse<ApiErrorBody>(
    request,
    env,
    {
      error: {
        code,
        message
      }
    },
    { status }
  );
}

function validationErrorResponse(request: Request, env: WorkerEnv, error: ZodError) {
  return jsonResponse<ApiErrorBody>(
    request,
    env,
    {
      error: {
        code: "VALIDATION_ERROR",
        message: "Hay campos invalidos. Revisá los detalles para corregirlos.",
        details: toValidationErrorDetails(error.issues)
      }
    },
    { status: 400 }
  );
}

function queryFromSearchParams(searchParams: URLSearchParams) {
  const query: Record<string, string | string[]> = {};

  for (const key of ["categories", "colors", "measures", "options", "sort"]) {
    const values = searchParams.getAll(key);

    if (values.length === 1) {
      query[key] = values[0];
    }

    if (values.length > 1) {
      query[key] = values;
    }
  }

  return query;
}

function getProductSlug(pathname: string) {
  const match = pathname.match(/^\/(?:api\/)?products\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getAuthService(env: WorkerEnv) {
  if (!env.DB) {
    return null;
  }

  return new EdgeAuthService(new D1UserRepository(env.DB), new D1SessionRepository(env.DB));
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Sesion requerida");
  }

  return authorization.slice("Bearer ".length);
}

async function readJsonBody(request: Request) {
  return request.json().catch(() => {
    throw new Error("INVALID_JSON");
  });
}

async function handleAuthRequest(request: Request, env: WorkerEnv, pathname: string) {
  const authService = getAuthService(env);

  if (!authService) {
    return errorResponse(
      request,
      env,
      501,
      "AUTH_PERSISTENCE_REQUIRED",
      "La autenticacion en Cloudflare requiere una base D1 configurada."
    );
  }

  if (request.method === "POST" && (pathname === "/api/auth/register" || pathname === "/auth/register")) {
    const { confirmPassword: _confirmPassword, ...input } = registerSchema.parse(await readJsonBody(request));
    const auth = await authService.register(input);
    return jsonResponse(request, env, { data: auth }, { status: 201 });
  }

  if (request.method === "POST" && (pathname === "/api/auth/login" || pathname === "/auth/login")) {
    const input = loginSchema.parse(await readJsonBody(request));
    const auth = await authService.login(input);
    return jsonResponse(request, env, { data: auth });
  }

  if (request.method === "GET" && (pathname === "/api/auth/me" || pathname === "/auth/me")) {
    const user = await authService.getSessionUser(getBearerToken(request));
    return jsonResponse(request, env, { data: { user } });
  }

  if (request.method === "POST" && (pathname === "/api/auth/logout" || pathname === "/auth/logout")) {
    await authService.logout(getBearerToken(request));
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(request, env)
    });
  }

  return errorResponse(request, env, 404, "NOT_FOUND", "Ruta no encontrada");
}

async function handleRequest(request: Request, env: WorkerEnv) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(request, env)
    });
  }

  if (request.method === "GET" && pathname === "/health") {
    return jsonResponse(request, env, { status: "ok" });
  }

  if (request.method === "GET" && (pathname === "/api/products" || pathname === "/products")) {
    const filters = productQuerySchema.parse(queryFromSearchParams(url.searchParams));
    const products = await productService.listProducts(filters);
    return jsonResponse(request, env, { data: products });
  }

  if (request.method === "GET") {
    const slug = getProductSlug(pathname);

    if (slug) {
      const product = await productService.getProductBySlug(slug);
      return jsonResponse(request, env, { data: product });
    }
  }

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth")) {
    return handleAuthRequest(request, env, pathname);
  }

  return errorResponse(request, env, 404, "NOT_FOUND", "Ruta no encontrada");
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      if (error instanceof ZodError) {
        return validationErrorResponse(request, env, error);
      }

      if (error instanceof AppError) {
        return errorResponse(request, env, error.statusCode, error.code, error.message);
      }

      if (error instanceof Error && error.message === "INVALID_JSON") {
        return errorResponse(request, env, 400, "VALIDATION_ERROR", "El cuerpo de la solicitud debe ser JSON valido.");
      }

      console.error("Worker request failed", {
        message: error instanceof Error ? error.message : "Unknown error",
        name: error instanceof Error ? error.name : "UnknownError",
        pathname: new URL(request.url).pathname
      });

      return errorResponse(request, env, 500, "INTERNAL_SERVER_ERROR", "Error interno");
    }
  }
};
