"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllTickets } from "@/lib/api/tickets";

export default function DeskHomePage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllTickets();
        setTickets(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Tickets</h1>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">ID</th>
              <th className="text-left py-2 pr-4">Título</th>
              <th className="text-left py-2 pr-4">Estado</th>
              <th className="text-left py-2 pr-4">Prioridad</th>
              <th className="text-left py-2 pr-4">Fecha</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t: any) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="py-2 pr-4">{t.id}</td>

                <td className="py-2 pr-4">
                  <Link
                    href={`/desk/home/${t.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {t.title}
                  </Link>
                </td>

                <td className="py-2 pr-4">
                  <span className="px-2 py-1 rounded bg-gray-100">
                    {t.status}
                  </span>
                </td>

                <td className="py-2 pr-4">{t.priority}</td>

                <td className="py-2 pr-4">
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}