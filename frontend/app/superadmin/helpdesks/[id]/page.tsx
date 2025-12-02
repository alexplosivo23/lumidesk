"use client";

import { useEffect, useState } from "react";
import { getHelpdesk, updateHelpdesk } from "@/lib/api/superadmin-helpdesks";
import { useParams } from "next/navigation";

export default function EditHelpdeskPage() {
  const { id } = useParams();
  const helpdeskId = Number(id);

  const [helpdesk, setHelpdesk] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getHelpdesk(helpdeskId);
      setHelpdesk(data);
      setName(data.name);
      setDescription(data.description || "");
    }
    load();
  }, [helpdeskId]);

  const handleSave = async () => {
    await updateHelpdesk(helpdeskId, { name, description });
    alert("Mesa actualizada");
  };

  if (!helpdesk) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">
        Editar Mesa: {helpdesk.name}
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
