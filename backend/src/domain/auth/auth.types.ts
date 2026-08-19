export type UserId = string;
export type SessionToken = string;

export type UserAddress = {
  street: string;
  streetNumber: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
};

export type User = {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: UserAddress;
  passwordHash: string;
  createdAt: string;
};

export type PublicUser = Omit<User, "passwordHash">;

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: UserAddress;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthSession = {
  token: SessionToken;
  userId: UserId;
  createdAt: string;
};
