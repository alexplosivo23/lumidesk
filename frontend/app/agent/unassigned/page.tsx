"use client";

import { useEffect, useState } from "react";
import { getUnassignedTickets, assignTicket } from "@/lib/api/agent";
import Link from "next/link";

export default function UnassignedPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  const load = async () => {
    setTickets(await getUnassignedTickets());
  };

  useEffect(() => {
    load();
  }, []);

  const take = async (id: number) => {
    await assignTicket(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Tickets Sin Asignar</h1>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Asunto</th>
            <th className="p-4">Categoría</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-4">{t.subject}</td>
              <td className="p-4">{t.category.name}</td>

              <td className="p-4 text-right">
                <button
                  onClick={() => take(t.id)}
                  className="px-3 py-1 bg-[#303a4b] text-white rounded hover:bg-[#1f2937]"
                >
                  Tomar
                </button>
              </td>
            </tr>
          ))}

          {tickets.length === 0 && (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-500">
                No hay tickets sin asignar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
