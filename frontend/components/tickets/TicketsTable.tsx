"use client";

import { useEffect, useState } from "react";
import { fetchAllTickets } from "@/lib/api/tickets";

export default function TicketsTable() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await fetchAllTickets();
    setTickets(data);
    setLoading(false);
  }

  if (loading) return <div>Cargando tickets...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">Tickets asignados / abiertos</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="py-2">ID</th>
            <th className="py-2">Título</th>
            <th className="py-2">Categoría</th>
            <th className="py-2">Prioridad</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Creado por</th>
            <th className="py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t: any) => (
            <tr key={t.id} className="border-b text-sm">
              <td className="py-2">{t.id}</td>
              <td>{t.title}</td>
              <td>{t.category?.name ?? "-"}</td>
              <td>
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                  {t.priority}
                </span>
              </td>
              <td>
                <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">
                  {t.status}
                </span>
              </td>
              <td>{t.createdBy?.name ?? "—"}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}