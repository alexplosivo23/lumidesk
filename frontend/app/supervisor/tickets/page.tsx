"use client";

import { useEffect, useState } from "react";
import { getAllTicketsForSupervisor } from "@/lib/api/supervisor";
import Link from "next/link";

export default function SupervisorTicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTicketsForSupervisor().then(setTickets);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Tickets de la Mesa</h1>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Asunto</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Prioridad</th>
            <th className="p-4">Agente</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t: any) => (
            <tr key={t.id} className="border-t">
              <td className="p-4">{t.subject}</td>
              <td className="p-4">{t.status}</td>
              <td className="p-4">{t.priority}</td>
              <td className="p-4">{t.agent?.name || "Sin asignar"}</td>

              <td className="p-4 text-right">
                <Link
                  href={`/supervisor/tickets/${t.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}

          {tickets.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">
                No hay tickets.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
