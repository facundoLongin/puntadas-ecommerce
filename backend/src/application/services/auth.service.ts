import { randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import type { SessionRepository } from "../../domain/auth/session.repository.js";
import type { CreateUserInput, LoginInput, PublicUser, User } from "../../domain/auth/auth.types.js";
import type { UserRepository } from "../../domain/auth/user.repository.js";
import { ConflictError, UnauthorizedError } from "../../shared/errors/app-error.js";

type AuthResponse = {
  user: PublicUser;
  token: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toPublicUser(user: User): PublicUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

function hashPassword(password: string) {
  const salt = randomUUID();
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedPasswordHash: string) {
  const [salt, storedHash] = storedPasswordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const candidateHash = scryptSync(password, salt, 64);
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  if (candidateHash.length !== storedHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateHash, storedHashBuffer);
}

export class AuthService {
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
      id: randomUUID(),
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
      passwordHash: hashPassword(input.password),
      createdAt: new Date().toISOString()
    });

    const token = await this.createSession(user.id);

    return { user: toPublicUser(user), token };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(normalizeEmail(input.email));

    if (!user || !verifyPassword(input.password, user.passwordHash)) {
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
      token: randomUUID(),
      userId,
      createdAt: new Date().toISOString()
    });

    return session.token;
  }
}
