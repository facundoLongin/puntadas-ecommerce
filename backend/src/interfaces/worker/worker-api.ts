import { ZodError } from "zod";
import { ProductService } from "../../application/services/product.service.js";
import { InMemoryProductRepository } from "../../infrastructure/repositories/in-memory-product.repository.js";
import { AppError } from "../../shared/errors/app-error.js";
import { productQuerySchema } from "../../shared/validation/product-query.schema.js";
import { toValidationErrorDetails } from "../../shared/validation/validation-error-details.js";

type WorkerEnv = {
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
    return errorResponse(
      request,
      env,
      501,
      "AUTH_PERSISTENCE_REQUIRED",
      "La autenticacion en Cloudflare queda pendiente para la etapa con D1."
    );
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

      return errorResponse(request, env, 500, "INTERNAL_SERVER_ERROR", "Error interno");
    }
  }
};
