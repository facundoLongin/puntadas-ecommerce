export type AccountAddress = {
  street: string;
  streetNumber: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
};

export type AccountUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: AccountAddress;
  createdAt: string;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: AccountAddress;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  user: AccountUser;
  token: string;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

async function parseApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    if (response.status === 204) {
      return undefined as T;
    }

    const body = (await response.json()) as { data: T };
    return body.data;
  }

  const body = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
  throw new Error(body?.error?.message ?? "No pudimos procesar la solicitud");
}

export async function registerAccount(input: RegisterInput) {
  const response = await fetch(`${apiBaseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  return parseApiResponse<AuthResult>(response);
}

export async function loginAccount(input: LoginInput) {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  return parseApiResponse<AuthResult>(response);
}

export async function getCurrentAccount(token: string) {
  const response = await fetch(`${apiBaseUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return parseApiResponse<{ user: AccountUser }>(response);
}

export async function logoutAccount(token: string) {
  const response = await fetch(`${apiBaseUrl}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });

  return parseApiResponse<void>(response);
}
