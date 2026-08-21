import type { SessionRepository } from "../../domain/auth/session.repository.js";
import type { CreateUserInput, LoginInput, PublicUser, User } from "../../domain/auth/auth.types.js";
import type { UserRepository } from "../../domain/auth/user.repository.js";
import { ConflictError, UnauthorizedError } from "../../shared/errors/app-error.js";

type AuthResponse = {
  user: PublicUser;
  token: string;
};

const passwordIterations = 100000;
const passwordHashPrefix = "pbkdf2-sha256";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toPublicUser(user: User): PublicUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getPasswordKey(password: string) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
}

function toArrayBuffer(bytes: Uint8Array) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

async function derivePasswordHash(password: string, salt: Uint8Array, iterations: number) {
  const key = await getPasswordKey(password);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: toArrayBuffer(salt),
      iterations
    },
    key,
    256
  );

  return new Uint8Array(bits);
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) {
    return false;
  }

  let difference = 0;

  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }

  return difference === 0;
}

async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePasswordHash(password, salt, passwordIterations);

  return `${passwordHashPrefix}:${passwordIterations}:${bytesToBase64(salt)}:${bytesToBase64(hash)}`;
}

async function verifyPassword(password: string, storedPasswordHash: string) {
  const [prefix, iterationsValue, saltValue, hashValue] = storedPasswordHash.split(":");
  const iterations = Number(iterationsValue);

  if (prefix !== passwordHashPrefix || !Number.isInteger(iterations) || !saltValue || !hashValue) {
    return false;
  }

  const salt = base64ToBytes(saltValue);
  const storedHash = base64ToBytes(hashValue);
  const candidateHash = await derivePasswordHash(password, salt, iterations);

  return constantTimeEqual(candidateHash, storedHash);
}

export class EdgeAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository
  ) {}

  async register(input: CreateUserInput): Promise<AuthResponse> {
    const normalizedEmail = normalizeEmail(input.email);
    const existingUser = await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new ConflictError("Ya existe una cuenta con ese email");
    }

    const user = await this.userRepository.create({
      id: crypto.randomUUID(),
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: normalizedEmail,
      phone: input.phone.trim(),
      address: {
        street: input.address.street.trim(),
        streetNumber: input.address.streetNumber.trim(),
        apartment: input.address.apartment?.trim() || undefined,
        city: input.address.city.trim(),
        province: input.address.province.trim(),
        postalCode: input.address.postalCode.trim()
      },
      passwordHash: await hashPassword(input.password),
      createdAt: new Date().toISOString()
    });

    const token = await this.createSession(user.id);

    return { user: toPublicUser(user), token };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(normalizeEmail(input.email));

    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw new UnauthorizedError("Email o contrasena incorrectos");
    }

    const token = await this.createSession(user.id);

    return { user: toPublicUser(user), token };
  }

  async getSessionUser(token: string): Promise<PublicUser> {
    const session = await this.sessionRepository.findByToken(token);

    if (!session) {
      throw new UnauthorizedError("Sesion invalida");
    }

    const user = await this.userRepository.findById(session.userId);

    if (!user) {
      throw new UnauthorizedError("Sesion invalida");
    }

    return toPublicUser(user);
  }

  async logout(token: string): Promise<void> {
    await this.sessionRepository.deleteByToken(token);
  }

  private async createSession(userId: string) {
    const session = await this.sessionRepository.create({
      token: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString()
    });

    return session.token;
  }
}
