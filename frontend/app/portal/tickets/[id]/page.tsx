// frontend/app/tickets/[id]/page.tsx

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getTicketById, updateTicketStatus } from "@/lib/api/tickets";

const STATUS_OPTIONS = [
  { value: "open", label: "Abierto" },
  { value: "in_progress", label: "En progreso" },
  { value: "resolved", label: "Resuelto" },
  { value: "closed", label: "Cerrado" },
];

export default function TicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, startSaving] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getTicketById(id);
        if (!mounted) return;
        setTicket(data);
        setStatus(data.status);
      } catch (e: any) {
        console.error(e);
        if (!mounted) return;
        setError("No se pudo cargar el ticket");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    if (!ticket) return;

    startSaving(async () => {
      try {
        setError(null);
        await updateTicketStatus(ticket.id, status);
        // refresco datos
        const updated = await getTicketById(id);
        setTicket(updated);
      } catch (e: any) {
        console.error(e);
        setError("No se pudo actualizar el estado");
      }
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          Cargando ticket...
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          Error: ticket no encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        <button
          onClick={() => router.push("/tickets")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Volver a tickets
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            #{ticket.id} - {ticket.title}
          </h1>
          <div className="flex items-center gap-2">
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={status}
              onChange={handleStatusChange}
              disabled={saving}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar estado"}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h2 className="font-semibold mb-1">Detalles</h2>
            <p>
              <span className="font-medium">Descripción:</span>{" "}
              {ticket.description || "-"}
            </p>
            <p>
              <span className="font-medium">Categoría:</span>{" "}
              {ticket.categoryName || "-"}
            </p>
            <p>
              <span className="font-medium">Prioridad:</span>{" "}
              {ticket.priority}
            </p>
            <p>
              <span className="font-medium">SLA:</span> {ticket.sla || "-"}
            </p>
          </div>
          <div>
            <h2 className="font-semibold mb-1">Metadatos</h2>
            <p>
              <span className="font-medium">Creado por:</span>{" "}
              {ticket.createdByName || "-"}
            </p>
            <p>
              <span className="font-medium">Fecha de creación:</span>{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : "-"}
            </p>
            <p>
              <span className="font-medium">Asignado a:</span>{" "}
              {ticket.assignedToName || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
