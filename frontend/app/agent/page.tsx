"use client";

import { useEffect, useState } from "react";
import { getMyAssignedTickets, getUnassignedTickets } from "@/lib/api/agent";

export default function AgentHome() {
  const [my, setMy] = useState<any[]>([]);
  const [unassigned, setUnassigned] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      setMy(await getMyAssignedTickets());
      setUnassigned(await getUnassignedTickets());
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Panel del Agente</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Sin asignar</p>
          <p className="text-3xl font-bold">{unassigned.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Mis tickets</p>
          <p className="text-3xl font-bold">{my.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">En progreso</p>
          <p className="text-3xl font-bold">
            {my.filter((t) => t.status === "IN_PROGRESS").length}
          </p>
        </div>
      </div>
    </div>
  );
}
