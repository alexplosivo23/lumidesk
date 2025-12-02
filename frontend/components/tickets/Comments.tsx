"use client";

import { useState, useEffect } from "react";
import { getTicketComments, addTicketComment } from "@/lib/api/comments";

export default function Comments({ ticketId }: { ticketId: number }) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTicketComments(ticketId);
        setComments(data);
      } catch (error) {
        console.error("Error al cargar comentarios:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [ticketId]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!newComment.trim()) return;

    // envío al backend
    const c = await addTicketComment(ticketId, newComment);

    // lo agregamos visualmente
    setComments((prev) => [...prev, c]);
    setNewComment("");
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Cargando comentarios…</p>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">

      {/* Título */}
      <h2 className="text-lg font-semibold text-slate-800">
        Comentarios
      </h2>

      {/* Lista de comentarios */}
      <div className="space-y-6">
        {comments.length === 0 && (
          <p className="text-sm text-slate-500">Aún no hay comentarios.</p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">

            {/* Avatar */}
            <div className="h-8 w-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-semibold">
              {c.author?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Contenido */}
            <div className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-800 text-sm">
                  {c.author?.name || "Usuario"}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-slate-700 text-sm whitespace-pre-line">
                {c.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form para agregar comentario */}
      <form onSubmit={handleSubmit} className="space-y-3">

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario…"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm h-24 
                     focus:ring-2 focus:ring-blue-600 outline-none resize-none"
        />

        <button
          type="submit"
          className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 text-sm font-medium"
        >
          Agregar comentario
        </button>
      </form>

    </div>
  );
}
