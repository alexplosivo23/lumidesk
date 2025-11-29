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
    loadData();
  }, []);

  async function loadData() {
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
    loadData();
  }

  async function handleAssign() {
    const agentId = Number(localStorage.getItem("userId"));
    if (!agentId) return alert("Error: no hay agente logeado");

    await assignTicket(Number(id), agentId);
    loadData();
  }

  async function handleStatusUpdate() {
    await updateTicketStatus(Number(id), status);
    loadData();
  }

  return (
    <div className="space-y-8">
      {!ticket ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* Información del ticket */}
          <div className="bg-white p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-2">
              #{ticket.id} - {ticket.title}
            </h2>
            <p className="text-gray-600 mb-4">{ticket.description}</p>

            <p><strong>Estado:</strong> {ticket.status}</p>
            <p><strong>Prioridad:</strong> {ticket.priority}</p>
            <p><strong>Categoría:</strong> {ticket.categoryName ?? "Sin categoría"}</p>
            <p><strong>Creado por:</strong> {ticket.createdByName}</p>
            <p><strong>Asignado a:</strong> {ticket.assignedToName ?? "Sin asignar"}</p>

            {/* Botón de asignar */}
            {!ticket.assignedToId && (
              <button
                onClick={handleAssign}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Asignarme Ticket
              </button>
            )}

            {/* Actualizar Estado */}
            <div className="mt-4">
              <label className="block mb-1">Cambiar estado:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="open">Abierto</option>
                <option value="in_progress">En progreso</option>
                <option value="waiting">Esperando</option>
                <option value="resolved">Resuelto</option>
                <option value="closed">Cerrado</option>
              </select>

              <button
                onClick={handleStatusUpdate}
                className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Actualizar
              </button>
            </div>
          </div>

          {/* Comentarios */}
          <div className="bg-white p-6 border rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Comentarios</h3>

            <div className="space-y-4 mb-4">
              {comments.map((c: any) => (
                <div key={c.id} className="p-3 border rounded">
                  <p>{c.message}</p>
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
              className="w-full border p-2 rounded mb-2"
              placeholder="Escriba un comentario..."
            />

            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={internal}
                onChange={(e) => setInternal(e.target.checked)}
              />
              Comentario interno (solo agentes)
            </label>

            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Agregar comentario
            </button>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 border rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Historial</h3>

            <div className="space-y-4">
              {timeline.map((item: any) => (
                <div key={item.id} className="p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
                  <p>{item.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}