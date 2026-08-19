"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type DemoUser = {
  name: string;
};

type AuthContextValue = {
  user: DemoUser | null;
  isAuthenticated: boolean;
  signInDemo: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const storageKey = "puntadas-demo-user";
const demoUser: DemoUser = { name: "Cliente demo" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = window.localStorage.getItem(storageKey);
    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as DemoUser;
      return typeof parsedUser.name === "string" ? parsedUser : null;
    } catch {
      window.localStorage.removeItem(storageKey);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(storageKey, JSON.stringify(user));
      return;
    }

    window.localStorage.removeItem(storageKey);
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signInDemo: () => setUser(demoUser),
      signOut: () => setUser(null)
    }),
    [user]
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
