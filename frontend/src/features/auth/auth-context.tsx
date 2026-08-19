"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  getCurrentAccount,
  loginAccount,
  logoutAccount,
  registerAccount,
  type AccountUser,
  type LoginInput,
  type RegisterInput
} from "./auth-api";

type AuthContextValue = {
  user: AccountUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const tokenStorageKey = "puntadas-session-token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      window.localStorage.removeItem("puntadas-demo-user");
      const storedToken = window.localStorage.getItem(tokenStorageKey);

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentAccount = await getCurrentAccount(storedToken);
        setToken(storedToken);
        setUser(currentAccount.user);
      } catch {
        window.localStorage.removeItem(tokenStorageKey);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      register: async (input) => {
        const auth = await registerAccount(input);
        window.localStorage.setItem(tokenStorageKey, auth.token);
        setToken(auth.token);
        setUser(auth.user);
      },
      login: async (input) => {
        const auth = await loginAccount(input);
        window.localStorage.setItem(tokenStorageKey, auth.token);
        setToken(auth.token);
        setUser(auth.user);
      },
      signOut: async () => {
        if (token) {
          await logoutAccount(token).catch(() => undefined);
        }

        window.localStorage.removeItem(tokenStorageKey);
        setToken(null);
        setUser(null);
      }
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
