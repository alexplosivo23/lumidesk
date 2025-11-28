"use client";

import { use, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getTicketById, updateTicketStatus } from "@/lib/api/tickets";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const STATUS = [
  { value: "open", label: "Abierto" },
  { value: "in_progress", label: "En progreso" },
  { value: "resolved", label: "Resuelto" },
  { value: "closed", label: "Cerrado" },
];

export default function TicketDetailPage({ params }: any) {
  // FIX Next.js 16
  const resolved = use(params);
  const id = resolved.id;

  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, startSaving] = useTransition();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTicketById(id);
        setTicket(data);
        setStatus(data.status);
      } catch {
        setError("No se pudo cargar el ticket");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const saveStatus = () => {
    startSaving(async () => {
      try {
        await updateTicketStatus(Number(id), status);
        const updated = await getTicketById(id);
        setTicket(updated);
      } catch {
        setError("No se pudo actualizar el estado");
      }
    });
  };

  if (loading) return <div className="p-8">Cargando ticket...</div>;

  if (!ticket)
    return (
      <div className="p-8 text-red-600">
        Error: ticket no encontrado.
      </div>
    );

  return (
    <div className="p-8 space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/desk/home")}
        className="text-blue-600 hover:underline p-0"
      >
        ← Volver
      </Button>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            #{ticket.id} — {ticket.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ESTADO + PRIORIDAD */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Estado:</span>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={saveStatus}
              disabled={saving}
              className="bg-blue-600 text-white"
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>

            <Badge
              className={`${
                ticket.priority === "P1"
                  ? "bg-red-600 text-white"
                  : ticket.priority === "P2"
                  ? "bg-orange-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {ticket.priority}
            </Badge>
          </div>

          {error && (
            <div className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <Separator />

          {/* DESCRIPCIÓN */}
          <div>
            <h3 className="font-semibold mb-1 text-gray-700">
              Descripción
            </h3>
            <p className="text-gray-800 bg-gray-50 p-4 rounded-md border text-sm">
              {ticket.description ?? "-"}
            </p>
          </div>

          <Separator />

          {/* METADATOS */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p><strong>Categoría:</strong> {ticket.categoryName ?? "-"}</p>
              <p><strong>Creado por:</strong> {ticket.createdByName ?? "-"}</p>
            </div>

            <div>
              <p>
                <strong>Fecha creación:</strong>{" "}
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Última actualización:</strong>{" "}
                {ticket.updatedAt
                  ? new Date(ticket.updatedAt).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}