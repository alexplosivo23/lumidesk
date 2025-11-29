"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTicket } from "@/lib/api/tickets";
import Link from "next/link";

export default function CreateTicketPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("P3");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // CATEGORÍAS FIJAS PARA DEMO
  useEffect(() => {
    setCategories([
      { id: 1, name: "Informática" },
      { id: 2, name: "RRHH" },
      { id: 3, name: "Compras" },
      { id: 4, name: "Mesa de Ayuda" },
    ]);
    setLoading(false);
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    if (!categoryId) {
      setError("Selecciona una categoría.");
      return;
    }

    try {
      await createTicket(title, description, priority, categoryId);
      router.push("/portal/tickets");
    } catch (error) {
      console.error(error);
      setError("No se pudo crear el ticket.");
    }
  }

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">

      {/* BOTÓN VOLVER */}
      <Link
        href="/portal/tickets"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Volver a mis tickets
      </Link>

      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Crear Ticket</h1>

        {error && (
          <p className="text-red-600 mb-3 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* CATEGORÍA */}
          <div>
            <label className="block mb-1 font-medium">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* TÍTULO */}
          <div>
            <label className="block mb-1 font-medium">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block mb-1 font-medium">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded h-32 resize-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* PRIORIDAD */}
          <div>
            <label className="block mb-1 font-medium">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-600"
            >
              <option value="P1">P1 - Alta</option>
              <option value="P2">P2 - Media</option>
              <option value="P3">P3 - Baja</option>
            </select>
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="btn-primary w-full">
            Crear Ticket
          </button>
        </form>
      </div>
    </div>
  );
}