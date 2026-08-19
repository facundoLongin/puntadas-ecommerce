import type { AuthSession } from "./auth.types.js";

export type SessionRepository = {
  create(session: AuthSession): Promise<AuthSession>;
  findByToken(token: string): Promise<AuthSession | null>;
  deleteByToken(token: string): Promise<void>;
};
