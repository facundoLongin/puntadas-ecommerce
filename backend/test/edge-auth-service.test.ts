import assert from "node:assert/strict";
import { test } from "node:test";
import { EdgeAuthService } from "../src/application/services/edge-auth.service.js";
import { InMemorySessionRepository } from "../src/infrastructure/repositories/in-memory-session.repository.js";
import { InMemoryUserRepository } from "../src/infrastructure/repositories/in-memory-user.repository.js";

const registerInput = {
  firstName: "Ana",
  lastName: "Demo",
  email: "ana.edge@example.com",
  phone: "+54 11 0000-0000",
  password: "Password123",
  address: {
    street: "Calle Demo",
    streetNumber: "123",
    city: "Buenos Aires",
    province: "Buenos Aires",
    postalCode: "1000"
  }
};

test("edge auth service registers, restores, logs out, and logs in", async () => {
  const service = new EdgeAuthService(new InMemoryUserRepository(), new InMemorySessionRepository());

  const registered = await service.register(registerInput);
  assert.equal(registered.user.email, "ana.edge@example.com");
  assert.equal(typeof registered.token, "string");

  const currentUser = await service.getSessionUser(registered.token);
  assert.equal(currentUser.id, registered.user.id);

  await service.logout(registered.token);
  await assert.rejects(() => service.getSessionUser(registered.token), /Sesion invalida/);

  const loggedIn = await service.login({
    email: registerInput.email,
    password: registerInput.password
  });

  assert.equal(loggedIn.user.id, registered.user.id);
  assert.notEqual(loggedIn.token, registered.token);
});

test("edge auth service rejects invalid password", async () => {
  const service = new EdgeAuthService(new InMemoryUserRepository(), new InMemorySessionRepository());

  await service.register(registerInput);

  await assert.rejects(
    () =>
      service.login({
        email: registerInput.email,
        password: "wrong-password"
      }),
    /Email o contrasena incorrectos/
  );
});
