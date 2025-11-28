"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CreateTicketPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priority, setPriority] = useState("medium");

  const [error, setError] = useState("");

  // Cargar categorías reales del backend
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("http://localhost:3000/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setCategories(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    loadCategories();
  }, [token]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    if (!categoryId) {
      setError("Selecciona una categoría.");
      return;
    }

    const res = await fetch("http://localhost:3000/tickets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        categoryId,
      }),
    });

    if (!res.ok) {
      setError("No se pudo crear el ticket.");
      return;
    }

    // Redirigir a Mis Tickets
    router.push("/portal/tickets");
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#303a4b] text-2xl">
            Crear nuevo ticket
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-gray-700 mb-1">Título</label>
              <Input
                placeholder="Ej: No funciona mi impresora"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Descripción</label>
              <Textarea
                placeholder="Describe el problema..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Categoría</label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setCategoryId(Number(e.target.value))}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccionar categoría...
                </option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Prioridad</label>
              <select
                className="w-full p-2 border rounded"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="w-full bg-[#303a4b] hover:bg-[#112142]">
              Crear Ticket
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}