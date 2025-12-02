"use client";

import { useEffect, useState } from "react";
import { getHelpdesks, createHelpdesk } from "@/lib/api/superadmin-helpdesks";
import Link from "next/link";

export default function HelpdesksPage() {
  const [helpdesks, setHelpdesks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    setHelpdesks(await getHelpdesks());
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return alert("Ingrese un nombre");

    await createHelpdesk({ name, description });
    setName("");
    setDescription("");
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Mesas de Ayuda</h1>

      {/* LISTA */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Existentes</h2>

        <table className="w-full text-sm border border-gray-100">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Categorías</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {helpdesks.map((h: any) => (
              <tr key={h.id} className="border-t">
                <td className="p-3">{h.name}</td>
                <td className="p-3">{h.categories?.length || 0}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/superadmin/helpdesks/${h.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {helpdesks.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No hay mesas creadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREAR NUEVA */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Crear Nueva Mesa</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre de la mesa (ej: TI)"
            className="border p-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Descripción (opcional)"
            className="border p-3 rounded h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-[#303a4b] text-white rounded hover:bg-[#1f2937] w-fit"
          >
            Crear mesa
          </button>
        </div>
      </div>
    </div>
  );
}
