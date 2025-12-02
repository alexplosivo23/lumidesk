"use client";

import { useEffect, useState } from "react";
import { getHelpdeskCategories, getHelpdesk } from "@/lib/api/portal";

export default function HelpdeskCategoriesPage({ params }: any) {
  const helpdeskId = Number(params.id);

  const [helpdesk, setHelpdesk] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      setHelpdesk(await getHelpdesk(helpdeskId));
      setCategories(await getHelpdeskCategories(helpdeskId));
    }
    load();
  }, [helpdeskId]);

  if (!helpdesk) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        {helpdesk.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow border border-gray-100">
            {/* Header */}
            <button
              onClick={() => setOpen(open === cat.id ? null : cat.id)}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="text-lg font-semibold">{cat.name}</span>
              <span className="text-gray-500">{open === cat.id ? "−" : "+"}</span>
            </button>

            {/* Contenido expandible */}
            {open === cat.id && (
              <div className="p-6 border-t bg-gray-50">
                <p className="text-sm text-gray-600 mb-4">
                  Enviá una solicitud relacionada con "{cat.name}".  
                  (Más adelante podremos agregar descripciones personalizadas en Configuración.)
                </p>

                <a
                  href={`/portal/tickets/create?category=${cat.id}`}
                  className="px-4 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937] transition"
                >
                  Crear Solicitud
                </a>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}
