"use client";

import { useEffect, useState } from "react";
import { getMyTickets } from "@/lib/api/portal-tickets";
import Link from "next/link";

const priorityColors = {
  P1: "bg-red-500/20 text-red-700",
  P2: "bg-yellow-500/20 text-yellow-700",
  P3: "bg-green-500/20 text-green-700",
};

const statusColors: any = {
  OPEN: "bg-blue-500/20 text-blue-700",
  IN_PROGRESS: "bg-indigo-500/20 text-indigo-700",
  WAITING: "bg-yellow-500/20 text-yellow-700",
  RESOLVED: "bg-green-600/20 text-green-700",
  CLOSED: "bg-gray-500/20 text-gray-700",
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMyTickets().then(setTickets);
  }, []);

  const filtered = tickets.filter((t) => {
    return (
      (filterStatus === "ALL" || t.status === filterStatus) &&
      (filterPriority === "ALL" || t.priority === filterPriority) &&
      (search.trim() === "" ||
        t.subject.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Mis Solicitudes</h1>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow border border-gray-100">
        
        {/* Estado */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">Todos los estados</option>
          <option value="OPEN">Abierto</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="WAITING">En espera</option>
          <option value="RESOLVED">Resuelto</option>
          <option value="CLOSED">Cerrado</option>
        </select>

        {/* Prioridad */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">Todas las prioridades</option>
          <option value="P1">P1 (Alta)</option>
          <option value="P2">P2 (Media)</option>
          <option value="P3">P3 (Baja)</option>
        </select>

        {/* Búsqueda */}
        <input
          type="text"
          placeholder="Buscar por asunto..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLA */}
      <table className="w-full bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Asunto</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Prioridad</th>
            <th className="p-4">Categoría</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((ticket) => (
            <tr key={ticket.id} className="border-t">
              <td className="p-4">{ticket.subject}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}
                >
                  {ticket.status}
                </span>
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}
                >
                  {ticket.priority}
                </span>
              </td>

              <td className="p-4">
                {ticket.category?.name || "-"}
              </td>

              <td className="p-4 text-right">
                <Link
                  href={`/portal/tickets/${ticket.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">
                No se encontraron tickets.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

