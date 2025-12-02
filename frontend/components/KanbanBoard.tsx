"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import { fetchAllTickets, updateTicketStatus } from "@/lib/api/tickets";

const COLUMNS = ["open", "in_progress", "waiting", "resolved", "closed"];

export default function KanbanBoard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [columns, setColumns] = useState<any>({});

  useEffect(() => {
    async function load() {
      const data = await fetchAllTickets();

      const grouped: any = {};
      for (const col of COLUMNS) {
        grouped[col] = data.filter((t) => t.status === col);
      }

      setTickets(data);
      setColumns(grouped);
    }
    load();
  }, []);

  async function handleDrag(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;

    const fromCol = source.droppableId;
    const toCol = destination.droppableId;

    if (fromCol === toCol) return;

    const movedTicket = columns[fromCol][source.index];

    // actualizar visualmente
    const newColumns = { ...columns };
    newColumns[fromCol].splice(source.index, 1);
    newColumns[toCol].splice(destination.index, 0, movedTicket);

    setColumns(newColumns);

    // actualizar backend
    await updateTicketStatus(movedTicket.id, toCol);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tablero Kanban</h1>

      <DragDropContext onDragEnd={handleDrag}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {COLUMNS.map((col) => (
            <KanbanColumn key={col} title={col} tickets={columns[col] || []} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
