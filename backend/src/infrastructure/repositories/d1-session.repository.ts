import type { AuthSession } from "../../domain/auth/auth.types.js";
import type { SessionRepository } from "../../domain/auth/session.repository.js";

type SessionRow = {
  token: string;
  user_id: string;
  created_at: string;
};

function toSession(row: SessionRow): AuthSession {
  return {
    token: row.token,
    userId: row.user_id,
    createdAt: row.created_at
  };
}

export class D1SessionRepository implements SessionRepository {
  constructor(private readonly db: D1Database) {}

  async create(session: AuthSession): Promise<AuthSession> {
    await this.db
      .prepare("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)")
      .bind(session.token, session.userId, session.createdAt)
      .run();

    return session;
  }

  async findByToken(token: string): Promise<AuthSession | null> {
    const row = await this.db.prepare("SELECT * FROM sessions WHERE token = ?").bind(token).first<SessionRow>();
    return row ? toSession(row) : null;
  }

  async deleteByToken(token: string): Promise<void> {
    await this.db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
  }
}
