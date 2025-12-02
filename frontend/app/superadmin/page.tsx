"use client";

import { useEffect, useState } from "react";
import { superadminStats } from "@/lib/api/superadmin";

export default function SuperadminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    superadminStats().then(setStats);
  }, []);

  if (!stats) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Panel del Superadministrador</h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Usuarios</p>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Mesas de Ayuda</p>
          <p className="text-3xl font-bold">{stats.helpdesks}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Categorías</p>
          <p className="text-3xl font-bold">{stats.categories}</p>
        </div>

      </div>
    </div>
  );
}
