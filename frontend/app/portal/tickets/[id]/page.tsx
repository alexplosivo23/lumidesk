"use client";

import { use, useState, useEffect } from "react";
import { getTicketById, getTicketTimeline } from "@/lib/api/tickets";
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

export default function TicketDetail(props: any) {
  const params = use(props.params);
  const id = params.id;

  const [ticket, setTicket] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const t = await getTicketById(id);
      const tl = await getTicketTimeline(id);

      setTicket(t);
      setTimeline(tl);
    } catch (e) {
      console.error("Error cargando ticket", e);
    }
    setLoading(false);
  }

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!ticket) return <p className="p-6">Ticket no encontrado.</p>;

  const statusLabel = ticket.status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase());

  return (
    <div className="p-8 max-w-3xl mx-auto">
      
      {/* BOTÓN VOLVER */}
      <Link
        href="/portal/tickets"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Volver a mis tickets
      </Link>

      <div className="card">

        {/* TITULO + BADGES */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            #{ticket.id} — {ticket.title}
          </h1>

          <div className="flex gap-2">

            {/* PRIORIDAD */}
            <span
              className={`px-3 py-1 text-white text-sm rounded ${priorityColors[ticket.priority]}`}
            >
              {ticket.priority}
            </span>

            {/* ESTADO */}
            <span
              className={`px-3 py-1 text-white text-sm rounded ${
                statusColors[ticket.status.toUpperCase()] || "bg-gray-500"
              }`}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* DATOS DEL TICKET */}
        <div className="space-y-2 mb-6">
          <p><strong>Categoría:</strong> {ticket.categoryName}</p>
          <p className="whitespace-pre-wrap">{ticket.description}</p>
        </div>

        {/* TIMELINE */}
        <h2 className="text-xl font-semibold mb-4">Historial</h2>

<div className="border-l-2 border-gray-300 pl-6 space-y-6">

  {timeline.map((item: any, index: number) => {

    // Determinar ícono según mensaje
    const msg = item.message.toLowerCase();
    let icon = "📝";

    if (msg.includes("creó") || msg.includes("creado")) icon = "🆕";
    if (msg.includes("coment")) icon = "💬";
    if (msg.includes("asign")) icon = "👤";
    if (msg.includes("estado")) icon = "🔄";
    if (msg.includes("aprob")) icon = "✔️";
    if (msg.includes("rechaz")) icon = "❌";

    return (
      <div key={item.id} className="relative">

        {/* Punto del timeline */}
        <div className="absolute -left-3 top-1 w-6 h-6 bg-blue-600 text-white flex items-center justify-center text-sm rounded-full shadow">
          {icon}
        </div>

        {/* Tarjeta del evento */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="font-medium">{item.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    );
  })}

  {timeline.length === 0 && (
    <p className="text-gray-500">Este ticket no tiene historial aún.</p>
  )}
</div>
      </div>
    </div>
  );
}
