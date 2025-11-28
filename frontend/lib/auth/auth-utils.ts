import { jwtDecode } from "jwt-decode";

export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export function decodeToken(token: string): any | null {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error("Error al decodificar token:", e);
    return null;
  }
}