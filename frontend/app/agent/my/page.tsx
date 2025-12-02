"use client";

import { useEffect, useState } from "react";
import { getMyAssignedTickets } from "@/lib/api/agent";
import Link from "next/link";

export default function AgentMyTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    getMyAssignedTickets().then(setTickets);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Mis Tickets Asignados</h1>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Asunto</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Prioridad</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-4">{t.subject}</td>

              <td className="p-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                  {t.status}
                </span>
              </td>

              <td className="p-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                  {t.priority}
                </span>
              </td>

              <td className="p-4 text-right">
                <Link
                  href={`/agent/tickets/${t.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}

          {tickets.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No tenés tickets asignados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
