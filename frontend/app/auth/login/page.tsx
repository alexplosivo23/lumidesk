"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        credentials: "include",   // 🔥🔥 SOLUCIÓN
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Credenciales incorrectas");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Guarda token si existe (en caso de que quieras usarlo)
      login(data.access_token);

      if (data.user.role === "admin" || data.user.role === "agent") {
        router.push("/desk/home");
      } else {
        router.push("/portal/home");
      }

    } catch (err) {
      setError("Error al conectar con el servidor");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9FAFB]">
      <Card className="w-[380px] shadow-xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-[#303a4b] tracking-tight">
            Lumidesk
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-gray-700 text-sm font-medium">
                Correo electrónico
              </label>
              <Input
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-gray-900 bg-white border-gray-300 focus-visible:ring-[#3B82F6]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 text-sm font-medium">
                Contraseña
              </label>
              <Input
                placeholder="•••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-white text-gray-900 border-gray-300 focus-visible:ring-[#3B82F6]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              className="w-full h-11 text-white bg-[#303a4b] hover:bg-[#112142] transition-colors rounded-lg"
              disabled={loading}
              type="submit"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>

            <p className="text-center text-gray-500 text-sm">
              Sistema de Tickets
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
