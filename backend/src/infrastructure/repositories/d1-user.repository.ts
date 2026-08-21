import type { User } from "../../domain/auth/auth.types.js";
import type { UserRepository } from "../../domain/auth/user.repository.js";

type UserRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_street: string;
  address_street_number: string;
  address_apartment: string | null;
  address_city: string;
  address_province: string;
  address_postal_code: string;
  password_hash: string;
  created_at: string;
};

function toUser(row: UserRow): User {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    address: {
      street: row.address_street,
      streetNumber: row.address_street_number,
      apartment: row.address_apartment ?? undefined,
      city: row.address_city,
      province: row.address_province,
      postalCode: row.address_postal_code
    },
    passwordHash: row.password_hash,
    createdAt: row.created_at
  };
}

export class D1UserRepository implements UserRepository {
  constructor(private readonly db: D1Database) {}

  async create(user: User): Promise<User> {
    await this.db
      .prepare(
        `INSERT INTO users (
          id,
          first_name,
          last_name,
          email,
          phone,
          address_street,
          address_street_number,
          address_apartment,
          address_city,
          address_province,
          address_postal_code,
          password_hash,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.address.street,
        user.address.streetNumber,
        user.address.apartment ?? null,
        user.address.city,
        user.address.province,
        user.address.postalCode,
        user.passwordHash,
        user.createdAt
      )
      .run();

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.db.prepare("SELECT * FROM users WHERE email = ?").bind(email.toLowerCase()).first<UserRow>();
    return row ? toUser(row) : null;
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<UserRow>();
    return row ? toUser(row) : null;
  }
}
