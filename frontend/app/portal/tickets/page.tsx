"use client";

import { useEffect, useState } from "react";
import { getMyTickets } from "@/lib/api/tickets";
import Link from "next/link";

const priorityColors: any = {
  P1: "bg-red-600",
  P2: "bg-yellow-600",
  P3: "bg-green-600",
};

const statusColors: any = {
  OPEN: "bg-blue-600",
  IN_PROGRESS: "bg-indigo-600",
  WAITING: "bg-orange-600",
  RESOLVED: "bg-green-700",
  CLOSED: "bg-gray-600",
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getMyTickets();
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Tickets</h1>

        <Link
          href="/portal/tickets/create"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Crear Ticket
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl divide-y">
        {tickets.length === 0 && (
          <p className="p-6 text-gray-600">No tienes tickets creados.</p>
        )}

        {tickets.map((t) => (
          <Link
            key={t.id}
            href={`/portal/tickets/${t.id}`}
            className="block hover:bg-gray-50 transition"
          >
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{t.title}</p>
                <p className="text-sm text-gray-500">
                  Ticket #{t.id} • {t.categoryName}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                {/* Prioridad */}
                <span
                  className={`px-3 py-1 text-white text-sm rounded ${priorityColors[t.priority]}`}
                >
                  {t.priority}
                </span>

                {/* Estado */}
                <span
                  className={`px-3 py-1 text-white text-sm rounded ${statusColors[t.status.toUpperCase()] || "bg-gray-500"}`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
