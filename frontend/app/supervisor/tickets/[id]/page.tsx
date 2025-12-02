"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getTicketById,
  getComments,
  addComment,
  getAttachments,
  uploadAttachment,
} from "@/lib/api/portal-tickets";

import {
  supervisorAssignToAgent,
  supervisorChangeCategory,
  supervisorGetAgents,
  supervisorUpdatePriority,
  supervisorUpdateStatus,
} from "@/lib/api/supervisor";

export default function SupervisorTicketDetailPage() {
  const { id } = useParams();
  const ticketId = Number(id);

  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const load = async () => {
    const t = await getTicketById(ticketId);
    setTicket(t);
    setComments(await getComments(ticketId));
    setAttachments(await getAttachments(ticketId));

    const helpdesk = t.category.helpdeskId;
    const agentsList = await supervisorGetAgents(helpdesk);
    setAgents(agentsList);

    const catsRes = await fetch(`http://localhost:3001/categories/helpdesk/${helpdesk}`);
    setCategories(await catsRes.json());
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (s: string) => {
    await supervisorUpdateStatus(ticketId, s);
    load();
  };

  const updatePriority = async (p: string) => {
    await supervisorUpdatePriority(ticketId, p);
    load();
  };

  const updateCategory = async (c: number) => {
    await supervisorChangeCategory(ticketId, c);
    load();
  };

  const reassign = async (agentId: number) => {
    await supervisorAssignToAgent(ticketId, agentId);
    load();
  };

  const comment = async () => {
    if (!newComment.trim()) return;
    await addComment(ticketId, newComment);
    setNewComment("");
    load();
  };

  const attach = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadAttachment(ticketId, file);
    load();
  };

  if (!ticket) return <p className="mt-10 text-center">Cargando...</p>;

  return (
    <div className="flex gap-8">

      {/* COLUMNA PRINCIPAL */}
      <div className="flex-1">

        <h1 className="text-2xl font-semibold mb-4">{ticket.subject}</h1>

        {/* Descripción */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-2">Descripción</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        {/* Comentarios */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Comentarios</h2>

          {/* Lista */}
          <div className="flex flex-col gap-4 mb-6">
            {comments.map((c) => (
              <div key={c.id} className="p-4 bg-gray-50 border rounded-lg">
                <p className="text-sm text-gray-500 mb-1">
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

          <textarea
            className="border p-3 rounded w-full mb-3"
            placeholder="Agregar comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={comment}
            className="px-4 py-2 bg-[#303a4b] text-white rounded hover:bg-[#1f2937]"
          >
            Enviar comentario
          </button>
        </div>
      </div>

      {/* PANEL LATERAL */}
      <aside className="w-72 bg-white p-6 rounded-xl shadow border sticky top-6 h-fit">

        <h3 className="text-lg font-semibold mb-4">Administración</h3>

        {/* Estado */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Estado</p>
          <select
            className="mt-1 border p-2 rounded w-full"
            value={ticket.status}
            onChange={(e) => updateStatus(e.target.value)}
          >
            <option>OPEN</option>
            <option>IN_PROGRESS</option>
            <option>WAITING</option>
            <option>RESOLVED</option>
            <option>CLOSED</option>
          </select>
        </div>

        {/* Prioridad */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Prioridad</p>
          <select
            className="mt-1 border p-2 rounded w-full"
            value={ticket.priority}
            onChange={(e) => updatePriority(e.target.value)}
          >
            <option>P1</option>
            <option>P2</option>
            <option>P3</option>
          </select>
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Categoría</p>
          <select
            className="mt-1 border p-2 rounded w-full"
            value={ticket.categoryId}
            onChange={(e) => updateCategory(Number(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Asignar a agente */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Asignar a</p>
          <select
            className="mt-1 border p-2 rounded w-full"
            value={ticket.agentId || ""}
            onChange={(e) => reassign(Number(e.target.value))}
          >
            <option value="">Sin asignar</option>
            {agents.map((a: any) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Adjuntos */}
        <div>
          <p className="text-gray-500 text-sm mb-2">Adjuntos</p>

          {attachments.length > 0 ? (
            <ul className="text-sm mb-2">
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

          <input type="file" onChange={attach} />
        </div>

      </aside>
    </div>
  );
}
