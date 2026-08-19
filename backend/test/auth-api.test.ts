import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { AddressInfo } from "node:net";
import { createApp } from "../src/app.js";

const server = createApp().listen(0);
const baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;

before(() => {
  assert.ok(baseUrl.includes("localhost"));
});

after(() => {
  server.close();
});

async function parseJson(response: Response) {
  return (await response.json()) as Record<string, any>;
}

test("auth flow registers, restores, logs out, and logs in with the same in-memory account", async () => {
  const email = `cliente.${Date.now()}@example.com`;
  const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "Ana",
      lastName: "Demo",
      email,
      phone: "+54 11 0000-0000",
      password: "Password123",
      confirmPassword: "Password123",
      address: {
        street: "Calle Demo",
        streetNumber: "123",
        apartment: "2A",
        city: "Ciudad Demo",
        province: "Buenos Aires",
        postalCode: "1000"
      }
    })
  });

  assert.equal(registerResponse.status, 201);
  const registerBody = await parseJson(registerResponse);
  assert.equal(registerBody.data.user.email, email);
  assert.equal(registerBody.data.user.passwordHash, undefined);
  assert.equal(typeof registerBody.data.token, "string");

  const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${registerBody.data.token}` }
  });
  assert.equal(meResponse.status, 200);

  const logoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${registerBody.data.token}` }
  });
  assert.equal(logoutResponse.status, 204);

  const loggedOutResponse = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${registerBody.data.token}` }
  });
  assert.equal(loggedOutResponse.status, 401);

  const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "Password123" })
  });
  assert.equal(loginResponse.status, 200);
  const loginBody = await parseJson(loginResponse);
  assert.equal(loginBody.data.user.firstName, "Ana");
  assert.notEqual(loginBody.data.token, registerBody.data.token);
});

test("auth validation returns field-specific details", async () => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "A",
      lastName: "",
      email: "mal",
      phone: "1",
      password: "123",
      confirmPassword: "456",
      address: {
        street: "",
        streetNumber: "",
        city: "",
        province: "",
        postalCode: "1"
      }
    })
  });

  assert.equal(response.status, 400);
  const body = await parseJson(response);
  assert.equal(body.error.code, "VALIDATION_ERROR");
  assert.ok(body.error.details.length > 5);
  assert.deepEqual(
    body.error.details.map((detail: { field: string }) => detail.field).slice(0, 3),
    ["firstName", "lastName", "email"]
  );
  assert.ok(body.error.details.every((detail: { label?: string; hint?: string }) => detail.label && detail.hint));
});
