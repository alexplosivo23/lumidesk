"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTicket } from "@/lib/api/tickets";

export default function TICreateForm({ params }: any) {
  const router = useRouter();
  const { categoryId } = params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("P3");

  async function handleSubmit(e: any) {
    e.preventDefault();

    // TEMPORAL: categoryId no afecta aún
    await createTicket(title, description, priority, 1);

    router.push("/portal/tickets");
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-2xl shadow mx-auto fade-in">
      <h1 className="text-xl font-semibold mb-4">Nueva Solicitud</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        <div>
          <label className="text-sm">Título</label>
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm">Descripción</label>
          <textarea
            className="w-full border p-2 rounded h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm">Prioridad</label>
          <select
            className="w-full border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="P1">Alta (P1)</option>
            <option value="P2">Media (P2)</option>
            <option value="P3">Baja (P3)</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}
