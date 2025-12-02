"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getCategory,
  updateCategory,
  getHelpdesks,
} from "@/lib/api/superadmin-categories";

export default function EditCategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id);

  const [category, setCategory] = useState<any>(null);
  const [helpdesks, setHelpdesks] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [helpdeskId, setHelpdeskId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const cat = await getCategory(categoryId);
      setCategory(cat);

      setName(cat.name);
      setDescription(cat.description || "");
      setHelpdeskId(cat.helpdeskId);

      setHelpdesks(await getHelpdesks());
    }
    load();
  }, [categoryId]);

  const handleSave = async () => {
    await updateCategory(categoryId, {
      name,
      description,
      helpdeskId,
    });

    alert("Categoría actualizada");
  };

  if (!category) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-semibold mb-6">
        Editar Categoría: {category.name}
      </h1>

      <div className="flex flex-col gap-4">

        <div>
          <p className="text-gray-700 mb-1">Nombre</p>
          <input
            type="text"
            className="border p-3 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-gray-700 mb-1">Descripción</p>
          <textarea
            className="border p-3 rounded w-full h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <p className="text-gray-700 mb-1">Mesa</p>
          <select
            className="border p-3 rounded w-full"
            value={helpdeskId || ""}
            onChange={(e) => setHelpdeskId(Number(e.target.value))}
          >
            {helpdesks.map((h: any) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
