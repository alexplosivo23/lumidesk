"use client";

import { useEffect, useState } from "react";
import { getHelpdesks, getSettings } from "@/lib/api/portal";

export default function PortalHome() {
  const [helpdesks, setHelpdesks] = useState([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function load() {
      setHelpdesks(await getHelpdesks());
      setSettings(await getSettings());
    }
    load();
  }, []);

  if (!settings) return <p>Cargando...</p>;

  return (
    <div>
      {/* Título */}
      <h1 className="text-2xl font-semibold mb-6">
        Bienvenido a {settings.companyName}
      </h1>

      {/* Mesas de ayuda */}
      <h2 className="text-lg font-medium mb-4">Mesas de Ayuda</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {helpdesks.map((h: any) => (
          <a
            key={h.id}
            href={`/portal/helpdesks/${h.id}`}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-1">{h.name}</h3>
            <p className="text-sm text-gray-600">Ver categorías y enviar solicitudes</p>
          </a>
        ))}
      </div>
    </div>
  );
}


