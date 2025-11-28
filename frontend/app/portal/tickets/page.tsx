"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { Card } from "@/components/ui/card";

export default function MyTicketsPage() {
  const { token } = useAuth();

  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTickets() {
    const res = await fetch("http://localhost:3000/tickets/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTickets(data);
    setLoading(false);
  }

  useEffect(() => {
    loadTickets();
  }, [token]);

  if (loading) return <p>Cargando...</p>;

  if (tickets.length === 0)
    return <p className="text-gray-600">Aún no tienes tickets creados.</p>;

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-[#303a4b]">Mis Tickets</h1>

      <div className="grid gap-4">
        {tickets.map((t) => {
          const isOverdue =
            t.dueAt && new Date(t.dueAt).getTime() < Date.now();

          return (
            <Card
              key={t.id}
              className="p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-[#303a4b]">
                    {t.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">
                    Estado:{" "}
                    <span className="font-medium text-gray-800">
                      {t.status}
                    </span>
                  </p>

                  <p className="text-gray-600 text-sm">
                    Prioridad:{" "}
                    <span className="font-medium">{t.priority}</span>
                  </p>

                  {t.dueAt && (
                    <p className="text-sm mt-1">
                      SLA vence:{" "}
                      <span
                        className={
                          isOverdue ? "text-red-600 font-bold" : "text-gray-800"
                        }
                      >
                        {new Date(t.dueAt).toLocaleString()}
                      </span>
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  #{t.id} <br />
                  {new Date(t.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}