"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Cargar token al montar
  useEffect(() => {
    const token = getCookie("token");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // Guardar token + actualizar contexto
  function login(token: string) {
    setCookie("token", token, { maxAge: 60 * 60 * 24 * 7 });
    const decoded = jwtDecode(token);
    setUser(decoded);
  }

  function logout() {
    setCookie("token", "", { maxAge: 0 });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
