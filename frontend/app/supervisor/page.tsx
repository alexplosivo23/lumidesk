"use client";

import { useEffect, useState } from "react";
import { getAllTicketsForSupervisor } from "@/lib/api/supervisor";

export default function SupervisorHome() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTicketsForSupervisor().then(setTickets);
  }, []);

  const open = tickets.filter(t => t.status === "OPEN").length;
  const inProgress = tickets.filter(t => t.status === "IN_PROGRESS").length;
  const waiting = tickets.filter(t => t.status === "WAITING").length;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Panel del Supervisor</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Abiertos</p>
          <p className="text-3xl font-bold">{open}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">En progreso</p>
          <p className="text-3xl font-bold">{inProgress}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">En espera</p>
          <p className="text-3xl font-bold">{waiting}</p>
        </div>
      </div>
    </div>
  );
}
