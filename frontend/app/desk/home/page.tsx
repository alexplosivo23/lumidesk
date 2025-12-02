"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllTickets } from "@/lib/api/tickets";
import { useSearchParams } from "next/navigation";

// 👉 IMPORTS RECHARTS
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const priorityColors: any = {
  P1: "bg-red-600 text-white",
  P2: "bg-yellow-500 text-white",
  P3: "bg-green-600 text-white",
};

const statusColors: any = {
  OPEN: "bg-blue-600 text-white",
  IN_PROGRESS: "bg-indigo-600 text-white",
  WAITING: "bg-orange-600 text-white",
  RESOLVED: "bg-green-700 text-white",
  CLOSED: "bg-gray-600 text-white",
};

export default function DeskHomePage({ forcedFilter = null }: any) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");

  const [sortOrder, setSortOrder] = useState("asc");

  const searchParams = useSearchParams();
  const paramFilter = searchParams.get("filter");
  const sidebarFilter = forcedFilter ?? paramFilter;

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllTickets();
        setTickets(data);

        let filteredList = [...data];

        if (sidebarFilter === "assigned") {
          const agentId = Number(localStorage.getItem("userId"));
          filteredList = data.filter((t) => t.assignedToId === agentId);
        }

        if (sidebarFilter === "unassigned") {
          filteredList = data.filter((t) => !t.assignedToId);
        }

        setFiltered(filteredList);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sidebarFilter]);

  function applyFilters() {
    let data = [...tickets];

    if (filterStatus !== "ALL") {
      data = data.filter((t) => t.status === filterStatus);
    }

    if (filterPriority !== "ALL") {
      data = data.filter((t) => t.priority === filterPriority);
    }

    if (sidebarFilter === "assigned") {
      const agentId = Number(localStorage.getItem("userId"));
      data = data.filter((t) => t.assignedToId === agentId);
    }

    if (sidebarFilter === "unassigned") {
      data = data.filter((t) => !t.assignedToId);
    }

    setFiltered(data);
  }

  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterPriority, tickets]);

  function sortBy(field: string) {
    const sorted = [...filtered].sort((a: any, b: any) => {
      if (sortOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setFiltered(sorted);
  }

  if (loading) return <div className="p-8">Cargando...</div>;

  const total = filtered.length;
  const open = filtered.filter((t) => t.status === "OPEN").length;
  const progress = filtered.filter((t) => t.status === "IN_PROGRESS").length;
  const waiting = filtered.filter((t) => t.status === "WAITING").length;
  const resolved = filtered.filter((t) => t.status === "RESOLVED").length;

  return (
    <div className="p-8">

      {/* PANEL DE MÉTRICAS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 fade-in">
        <div className="card hover-raise text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="card hover-raise text-center">
          <p className="text-sm text-gray-500">Abiertos</p>
          <p className="text-2xl font-bold text-blue-600">{open}</p>
        </div>

        <div className="card hover-raise text-center">
          <p className="text-sm text-gray-500">En progreso</p>
          <p className="text-2xl font-bold text-indigo-600">{progress}</p>
        </div>

        <div className="card hover-raise text-center">
          <p className="text-sm text-gray-500">En espera</p>
          <p className="text-2xl font-bold text-orange-600">{waiting}</p>
        </div>

        <div className="card hover-raise text-center">
          <p className="text-sm text-gray-500">Resueltos</p>
          <p className="text-2xl font-bold text-green-600">{resolved}</p>
        </div>
      </div>

      {/* ================================
          GRAFICOS DEL DASHBOARD
      ================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 fade-in">

        {/* GRAFICO DE TICKETS POR ESTADO */}
        <div className="card hover-raise">
          <h2 className="text-lg font-semibold mb-3">Tickets por Estado</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: "OPEN", value: open },
                { name: "IN_PROGRESS", value: progress },
                { name: "WAITING", value: waiting },
                { name: "RESOLVED", value: resolved },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* GRAFICO DE TICKETS POR PRIORIDAD */}
        <div className="card hover-raise">
          <h2 className="text-lg font-semibold mb-3">Tickets por Prioridad</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "P1", value: filtered.filter((t) => t.priority === "P1").length },
                  { name: "P2", value: filtered.filter((t) => t.priority === "P2").length },
                  { name: "P3", value: filtered.filter((t) => t.priority === "P3").length },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                <Cell fill="#dc2626" />
                <Cell fill="#fbbf24" />
                <Cell fill="#16a34a" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* FILTROS */}
      <div className="card mb-6 fade-in">
        <h2 className="text-xl font-semibold mb-3">Filtros</h2>

        <div className="flex gap-4">
          <div>
            <label className="block text-sm mb-1">Estado</label>
            <select
              className="border p-2 rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">Todos</option>
              <option value="OPEN">Abiertos</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="WAITING">En espera</option>
              <option value="RESOLVED">Resueltos</option>
              <option value="CLOSED">Cerrados</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Prioridad</label>
            <select
              className="border p-2 rounded"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="ALL">Todas</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </select>
          </div>

        </div>
      </div>

      {/* LISTA DE TICKETS */}
      <div className="card fade-in">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Tickets</h1>

          <input
            type="text"
            placeholder="Buscar por ID, título o usuario..."
            className="border p-2 rounded w-64"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();

              const data = tickets.filter((t: any) =>
                String(t.id).includes(query) ||
                t.title.toLowerCase().includes(query) ||
                (t.createdByName ?? "").toLowerCase().includes(query)
              );

              setFiltered(data);
            }}
          />
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">

              <th
                onClick={() => sortBy("id")}
                className="text-left py-2 pr-4 cursor-pointer hover:text-blue-600"
              >
                ID
              </th>

              <th
                onClick={() => sortBy("title")}
                className="text-left py-2 pr-4 cursor-pointer hover:text-blue-600"
              >
                Título
              </th>

              <th
                onClick={() => sortBy("status")}
                className="text-left py-2 pr-4 cursor-pointer hover:text-blue-600"
              >
                Estado
              </th>

              <th
                onClick={() => sortBy("priority")}
                className="text-left py-2 pr-4 cursor-pointer hover:text-blue-600"
              >
                Prioridad
              </th>

              <th
                onClick={() => sortBy("createdAt")}
                className="text-left py-2 pr-4 cursor-pointer hover:text-blue-600"
              >
                Fecha
              </th>

            </tr>
          </thead>

          <tbody>
            {filtered.map((t: any) => (
              <tr
                key={t.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="py-2 pr-4">{t.id}</td>

                <td className="py-2 pr-4">
                  <Link
                    href={`/desk/tickets/${t.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {t.title}
                  </Link>
                </td>

                <td className="py-2 pr-4">
                  <span className={`px-2 py-1 text-xs rounded ${statusColors[t.status]}`}>
                    {t.status}
                  </span>
                </td>

                <td className="py-2 pr-4">
                  <span className={`px-2 py-1 text-xs rounded ${priorityColors[t.priority]}`}>
                    {t.priority}
                  </span>
                </td>

                <td className="py-2 pr-4">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}