"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getTicketById,
  getComments,
  getAttachments,
  addComment,
  uploadAttachment,
} from "@/lib/api/portal-tickets";

import {
  agentAssignTicket,
  agentUpdateStatus,
  agentUpdatePriority,
} from "@/lib/api/agent";

const statusList = [
  "OPEN",
  "IN_PROGRESS",
  "WAITING",
  "RESOLVED",
  "CLOSED",
];

const priorityList = ["P1", "P2", "P3"];

export default function AgentTicketDetailPage() {
  const { id } = useParams();
  const ticketId = Number(id);

  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const load = async () => {
    setTicket(await getTicketById(ticketId));
    setComments(await getComments(ticketId));
    setAttachments(await getAttachments(ticketId));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAssign = async () => {
    await agentAssignTicket(ticketId);
    load();
  };

  const handleStatusChange = async (newStatus: string) => {
    await agentUpdateStatus(ticketId, newStatus);
    load();
  };

  const handlePriorityChange = async (newPriority: string) => {
    await agentUpdatePriority(ticketId, newPriority);
    load();
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    await addComment(ticketId, newComment);
    setNewComment("");
    load();
  };

  // upload
  const handleAttachment = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadAttachment(ticketId, file);
    load();
  };

  if (!ticket)
    return <p className="mt-10 text-center">Cargando ticket...</p>;

  return (
    <div className="flex gap-8">

      {/* COLUMNA PRINCIPAL */}
      <div className="flex-1">

        <h1 className="text-2xl font-semibold mb-4">{ticket.subject}</h1>

        {/* DESCRIPCIÓN */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-2">Descripción</h2>
          <p className="whitespace-pre-wrap text-gray-700">
            {ticket.description}
          </p>
        </div>

        {/* Comentarios */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Comentarios</h2>

          {/* Lista */}
          <div className="flex flex-col gap-4 mb-6">
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">{c.user.name}</span> —{" "}
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                <p>{c.text}</p>
              </div>
            ))}

            {comments.length === 0 && (
              <p className="text-sm text-gray-500">No hay comentarios aún.</p>
            )}
          </div>

          {/* Nuevo comentario */}
          <textarea
            className="w-full border p-3 rounded mb-3"
            placeholder="Escribir comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={handleComment}
            className="px-4 py-2 bg-[#303a3b] text-white rounded hover:bg-[#1f2937]"
          >
            Enviar comentario
          </button>
        </div>
      </div>

      {/* PANEL LATERAL */}
      <aside className="w-72 sticky top-6 h-fit bg-white p-6 rounded-xl shadow border">

        <h3 className="text-lg font-semibold mb-4">Información</h3>

        {/* Asignar */}
        {!ticket.agentId && (
          <button
            onClick={handleAssign}
            className="w-full mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tomar ticket
          </button>
        )}

        {/* Estado */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Estado</p>
          <select
            className="border p-2 rounded w-full"
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {statusList.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Prioridad */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Prioridad</p>
          <select
            className="border p-2 rounded w-full"
            value={ticket.priority}
            onChange={(e) => handlePriorityChange(e.target.value)}
          >
            {priorityList.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Categoría</p>
          <p className="font-medium">{ticket.category?.name}</p>
        </div>

        {/* Adjuntos */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Adjuntos</p>

          {attachments.length > 0 ? (
            <ul className="text-sm mb-3">
              {attachments.map((a) => (
                <li key={a.id}>
                  <a
                    href={`http://localhost:3001${a.url}`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    {a.url.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm mb-2">No hay adjuntos</p>
          )}

          <input type="file" onChange={handleAttachment} />
        </div>

        {/* Ticket ID */}
        <div>
          <p className="text-gray-500 text-sm">ID Ticket</p>
          <p className="font-medium">#{ticket.id}</p>
        </div>
      </aside>
    </div>
  );
}
