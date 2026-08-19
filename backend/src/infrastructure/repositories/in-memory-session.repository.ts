import type { SessionRepository } from "../../domain/auth/session.repository.js";
import type { AuthSession } from "../../domain/auth/auth.types.js";

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions = new Map<string, AuthSession>();

  async create(session: AuthSession): Promise<AuthSession> {
    this.sessions.set(session.token, session);
    return session;
  }

  async findByToken(token: string): Promise<AuthSession | null> {
    return this.sessions.get(token) ?? null;
  }

  async deleteByToken(token: string): Promise<void> {
    this.sessions.delete(token);
  }
}
