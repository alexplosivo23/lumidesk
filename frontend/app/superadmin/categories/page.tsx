"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  getHelpdesks,
} from "@/lib/api/superadmin-categories";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [helpdesks, setHelpdesks] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [helpdeskId, setHelpdeskId] = useState<number | null>(null);

  const load = async () => {
    setCategories(await getCategories());
    setHelpdesks(await getHelpdesks());
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return alert("Ingrese un nombre");
    if (!helpdeskId) return alert("Seleccione una mesa");

    await createCategory({ name, description, helpdeskId });

    setName("");
    setDescription("");
    setHelpdeskId(null);

    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Categorías</h1>

      {/* LISTA */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Existentes</h2>

        <table className="w-full text-sm border border-gray-100">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Mesa</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c: any) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.helpdesk.name}</td>

                <td className="p-3 text-right">
                  <Link
                    href={`/superadmin/categories/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No hay categorías.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREAR CATEGORÍA */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Crear nueva categoría</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="border p-3 rounded"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="border p-3 rounded h-24"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="border p-3 rounded"
            value={helpdeskId || ""}
            onChange={(e) => setHelpdeskId(Number(e.target.value))}
          >
            <option value="">Seleccione una mesa</option>
            {helpdesks.map((h: any) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937] w-fit"
          >
            Crear categoría
          </button>
        </div>
      </div>
    </div>
  );
}
