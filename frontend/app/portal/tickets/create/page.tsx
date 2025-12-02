"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCategory, createTicket } from "@/lib/api/portal-tickets";

export default function CreateTicketPage() {
  const router = useRouter();
  const params = useSearchParams();
  const categoryId = Number(params.get("category"));

  const [category, setCategory] = useState<any>(null);

  const [form, setForm] = useState({
    subject: "",
    description: "",
    priority: "P3",
  });

  useEffect(() => {
    if (categoryId) getCategory(categoryId).then(setCategory);
  }, [categoryId]);

  const handleSubmit = async () => {
    if (!form.subject.trim()) return alert("Ingrese un asunto");
    if (!form.description.trim()) return alert("Ingrese una descripción");

    const payload = {
      ...form,
      categoryId,
    };

    await createTicket(payload);
    router.push("/portal/tickets");
  };

  if (!category) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-semibold mb-6">Nueva Solicitud</h1>

      <p className="text-sm text-gray-600 mb-6">
        Categoría seleccionada:{" "}
        <span className="font-medium">{category.name}</span>
      </p>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Asunto"
          className="border p-3 rounded"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          placeholder="Describa su problema..."
          className="border p-3 rounded h-40"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="border p-3 rounded"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="P1">P1 - Alta</option>
          <option value="P2">P2 - Media</option>
          <option value="P3">P3 - Baja</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
      >
        Enviar solicitud
      </button>
    </div>
  );
}

