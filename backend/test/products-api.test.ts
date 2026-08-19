import assert from "node:assert/strict";
import { after, test } from "node:test";
import type { AddressInfo } from "node:net";
import { createApp } from "../src/app.js";

const server = createApp().listen(0);
const baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;

after(() => {
  server.close();
});

async function parseJson(response: Response) {
  return (await response.json()) as Record<string, any>;
}

test("products API lists active products with optimized images", async () => {
  const response = await fetch(`${baseUrl}/api/products`);

  assert.equal(response.status, 200);
  const body = await parseJson(response);

  assert.ok(body.data.length >= 6);
  assert.ok(body.data.every((product: { imageUrl: string }) => product.imageUrl.endsWith(".webp")));
});

test("products API filters by category and returns product detail", async () => {
  const listResponse = await fetch(`${baseUrl}/api/products?categories=acolchados`);
  const listBody = await parseJson(listResponse);

  assert.equal(listResponse.status, 200);
  assert.ok(listBody.data.length >= 1);
  assert.ok(listBody.data.every((product: { category: string }) => product.category === "acolchados"));

  const detailResponse = await fetch(`${baseUrl}/api/products/acolchado-lino-natural`);
  const detailBody = await parseJson(detailResponse);

  assert.equal(detailResponse.status, 200);
  assert.equal(detailBody.data.slug, "acolchado-lino-natural");
  assert.ok(detailBody.data.measureVariants.length >= 2);
});
