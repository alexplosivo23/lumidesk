"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getTicketById,
  addComment,
  getComments,
  getAttachments,
  uploadAttachment,
} from "@/lib/api/portal-tickets";

const statusColors: any = {
  OPEN: "bg-blue-500/20 text-blue-700",
  IN_PROGRESS: "bg-indigo-500/20 text-indigo-700",
  WAITING: "bg-yellow-500/20 text-yellow-700",
  RESOLVED: "bg-green-500/20 text-green-700",
  CLOSED: "bg-gray-500/20 text-gray-700",
};

const priorityColors: any = {
  P1: "bg-red-500/20 text-red-700",
  P2: "bg-yellow-500/20 text-yellow-700",
  P3: "bg-green-500/20 text-green-700",
};

export default function TicketDetailPage() {
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

  const handleComment = async () => {
    if (!newComment.trim()) return;

    await addComment(ticketId, newComment);
    setNewComment("");
    load();
  };

  const handleAttachment = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadAttachment(ticketId, file);
    load();
  };

  if (!ticket)
    return <p className="text-center mt-10">Cargando ticket...</p>;

  return (
    <div className="flex gap-8">

      {/* COLUMNA PRINCIPAL */}
      <div className="flex-1">

        {/* Asunto */}
        <h1 className="text-2xl font-semibold mb-4">{ticket.subject}</h1>

        {/* Descripción */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-2">Descripción</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        {/* Comentarios */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Comentarios</h2>

          {/* Lista de comentarios */}
          <div className="flex flex-col gap-4 mb-6">
            {comments.map((c) => (
              <div key={c.id} className="p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">{c.user.name}</span> —{" "}
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                <p>{c.text}</p>
              </div>
            ))}

            {comments.length === 0 && (
              <p className="text-gray-500 text-sm">No hay comentarios aún.</p>
            )}
          </div>

          {/* Agregar comentario */}
          <textarea
            className="border p-3 rounded w-full mb-3"
            placeholder="Escribir comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={handleComment}
            className="px-4 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
          >
            Enviar comentario
          </button>
        </div>
      </div>

      {/* PANEL LATERAL (STICKY) */}
      <aside className="w-72 sticky top-6 h-fit bg-white p-6 rounded-xl shadow border border-gray-100">

        <h3 className="text-lg font-semibold mb-4">Información</h3>

        <div className="flex flex-col gap-4 text-sm">

          {/* Estado */}
          <div>
            <p className="text-gray-500">Estado</p>
            <span
              className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}
            >
              {ticket.status}
            </span>
          </div>

          {/* Prioridad */}
          <div>
            <p className="text-gray-500">Prioridad</p>
            <span
              className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}
            >
              {ticket.priority}
            </span>
          </div>

          {/* Categoría */}
          <div>
            <p className="text-gray-500">Categoría</p>
            <p className="font-medium mt-1">{ticket.category.name}</p>
          </div>

          {/* Mesa de ayuda */}
          <div>
            <p className="text-gray-500">Mesa de Ayuda</p>
            <p className="font-medium mt-1">{ticket.category.helpdesk.name}</p>
          </div>

          {/* Adjuntos */}
          <div>
            <p className="text-gray-500 mb-2">Adjuntos</p>

            {/* Lista */}
            {attachments.length > 0 ? (
              <ul className="text-sm mb-3">
                {attachments.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`http://localhost:3001${a.url}`}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {a.url.split("/").pop()}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm mb-3">No hay adjuntos</p>
            )}

            {/* Subir */}
            <input type="file" onChange={handleAttachment} />
          </div>

          {/* Ticket ID */}
          <div>
            <p className="text-gray-500">ID del Ticket</p>
            <p className="font-medium mt-1">#{ticket.id}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
