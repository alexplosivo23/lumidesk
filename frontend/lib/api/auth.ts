"use client";

import { setCookie } from "cookies-next";

export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  const data = await res.json(); // { access_token }

  // Guardar token en cookie accesible al middleware
  setCookie("token", data.access_token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return data;
}