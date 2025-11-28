// app/portal/tickets/new/page.tsx
"use client";

import { useState } from "react";
import { createTicket } from "@/lib/api/tickets";
import { useRouter } from "next/navigation";

export default function NewTicketPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const data = {
      title: form.get("title"),
      description: form.get("description"),
      priority: form.get("priority"),
    };

    await createTicket(data);
    router.push("/portal/tickets");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-bold">Crear Ticket</h2>

      <input
        name="title"
        placeholder="Título"
        required
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Descripción"
        required
        className="w-full border px-3 py-2 rounded"
      />

      <select
        name="priority"
        required
        className="w-full border px-3 py-2 rounded"
      >
        <option value="P1">P1 - Alta</option>
        <option value="P2">P2 - Media</option>
        <option value="P3">P3 - Baja</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creando..." : "Crear Ticket"}
      </button>
    </form>
  );
}