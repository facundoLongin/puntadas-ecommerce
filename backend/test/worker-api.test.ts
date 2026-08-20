import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "../src/worker.js";

const env = {
  FRONTEND_ORIGIN: "http://localhost:3000"
};

async function request(path: string, init?: RequestInit) {
  return worker.fetch(new Request(`http://worker.local${path}`, init), env);
}

test("worker exposes health and product endpoints", async () => {
  const healthResponse = await request("/health");
  assert.equal(healthResponse.status, 200);
  assert.deepEqual(await healthResponse.json(), { status: "ok" });

  const productsResponse = await request("/api/products?categories=acolchados");
  assert.equal(productsResponse.status, 200);

  const productsBody = (await productsResponse.json()) as { data: Array<{ category: string; slug: string }> };
  assert.ok(productsBody.data.length > 0);
  assert.ok(productsBody.data.every((product) => product.category === "acolchados"));

  const detailResponse = await request(`/api/products/${productsBody.data[0].slug}`);
  assert.equal(detailResponse.status, 200);
});

test("worker keeps auth disabled until persistent storage is added", async () => {
  const response = await request("/api/auth/login", { method: "POST" });
  const body = (await response.json()) as { error: { code: string } };

  assert.equal(response.status, 501);
  assert.equal(body.error.code, "AUTH_PERSISTENCE_REQUIRED");
});
