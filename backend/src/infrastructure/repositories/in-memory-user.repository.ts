import type { UserRepository } from "../../domain/auth/user.repository.js";
import type { User } from "../../domain/auth/auth.types.js";

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase();
    return [...this.users.values()].find((user) => user.email === normalizedEmail) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }
}
