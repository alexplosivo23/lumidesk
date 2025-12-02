"use client";

import { use, useState, useEffect } from "react";

import {
  getTicketById,
  getTicketTimeline,
  getComments,
  assignTicket,
  updateTicketStatus,
  addComment,
} from "@/lib/api/tickets";

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

export default function DeskTicketDetail(props: any) {
  const params = use(props.params);
  const id = params.id;

  const [ticket, setTicket] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [internal, setInternal] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const t = await getTicketById(id);
    const tl = await getTicketTimeline(id);
    const cm = await getComments(id);

    setTicket(t);
    setTimeline(tl);
    setComments(cm);
    setStatus(t.status);
  }

  async function handleAddComment() {
    if (!comment.trim()) return;

    await addComment(Number(id), comment, internal);
    setComment("");
    load();
  }

  async function handleAssign() {
    const agentId = Number(localStorage.getItem("userId"));
    if (!agentId) return alert("Error: no hay agente logueado");

    await assignTicket(Number(id), agentId);
    load();
  }

  async function handleStatus() {
    await updateTicketStatus(Number(id), status);
    load();
  }

  if (!ticket) return <p className="p-8">Cargando...</p>;

  const statusLabel = ticket.status
    .replace("_", " ")
    .toLowerCase()
    .replace(/^\w/, (c: string) => c.toUpperCase());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ======= COLUMNA IZQUIERDA (INFO + COMENTARIOS) ======= */}
      <div className="lg:col-span-2 space-y-6">

        {/* INFO GENERAL */}
        <div className="card fade-in">

          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">
              #{ticket.id} — {ticket.title}
            </h2>

            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded text-sm ${priorityColors[ticket.priority]}`}
              >
                {ticket.priority}
              </span>

              <span
                className={`px-3 py-1 rounded text-sm ${
                  statusColors[ticket.status.toUpperCase()] || "bg-gray-500 text-white"
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{ticket.description}</p>

          <div className="space-y-1 text-sm">
            <p><strong>Estado:</strong> {statusLabel}</p>
            <p><strong>Categoría:</strong> {ticket.categoryName ?? "Sin categoría"}</p>
            <p><strong>Creado por:</strong> {ticket.createdByName}</p>
            <p><strong>Asignado a:</strong> {ticket.assignedToName ?? "Sin asignar"}</p>
            <p><strong>Creado:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* COMENTARIOS */}
        <div className="card fade-in">
          <h3 className="text-xl font-semibold mb-4">Comentarios</h3>

          <div className="space-y-4 mb-4">
            {comments.map((c: any) => (
              <div
                key={c.id}
                className={`p-3 border rounded ${
                  c.isInternal ? "bg-yellow-50" : "bg-gray-50"
                }`}
              >
                <p className="font-medium">{c.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()} —
                  {c.isInternal ? " Interno" : " Público"}
                </p>
              </div>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            placeholder="Escriba un comentario…"
          />

          <label className="flex items-center mb-3 text-sm">
            <input
              type="checkbox"
              checked={internal}
              onChange={(e) => setInternal(e.target.checked)}
              className="mr-2"
            />
            Comentario interno (solo agentes)
          </label>

          <button
            onClick={handleAddComment}
            className="btn-primary"
          >
            Agregar comentario
          </button>
        </div>

        {/* TIMELINE */}
        <div className="card fade-in">
          <h3 className="text-xl font-semibold mb-4">Historial</h3>

          <div className="border-l-2 border-gray-300 pl-6 space-y-6">
            {timeline.map((item: any) => {
              const msg = item.message.toLowerCase();
              let icon = "📝";

              if (msg.includes("creó") || msg.includes("creado")) icon = "🆕";
              if (msg.includes("coment")) icon = "💬";
              if (msg.includes("asign")) icon = "👤";
              if (msg.includes("estado")) icon = "🔄";
              if (msg.includes("aprob")) icon = "✔️";
              if (msg.includes("rechaz")) icon = "❌";

              return (
                <div key={item.id} className="relative fade-in">
                  <div className="absolute -left-3 top-1 w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs shadow">
                    {icon}
                  </div>

                  <div className="card">
                    <p>{item.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======= COLUMNA DERECHA (ACCIONES) ======= */}
      <div className="space-y-6">

        <div className="card fade-in">
          <h3 className="text-lg font-semibold mb-3">Acciones</h3>

          {!ticket.assignedToId && (
            <button
              onClick={handleAssign}
              className="btn-primary w-full mb-3"
            >
              Asignarme ticket
            </button>
          )}

          {/* Cambiar estado */}
          <label className="block text-sm mb-1">Cambiar estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          >
            <option value="open">Abierto</option>
            <option value="in_progress">En progreso</option>
            <option value="waiting">Esperando</option>
            <option value="resolved">Resuelto</option>
            <option value="closed">Cerrado</option>
          </select>

          <button
            onClick={handleStatus}
            className="btn-primary w-full"
          >
            Actualizar estado
          </button>
        </div>
      </div>
    </div>
  );
}