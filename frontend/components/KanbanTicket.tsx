"use client";

import { Draggable } from "@hello-pangea/dnd";

import Link from "next/link";

export default function KanbanTicket({ ticket, index }: any) {
  return (
    <Draggable draggableId={String(ticket.id)} index={index}>
      {(provided) => (
        <Link
          href={`/desk/tickets/${ticket.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-3 bg-white shadow rounded hover:bg-gray-50 transition"
        >
          <p className="font-semibold">{ticket.title}</p>
          <p className="text-xs text-gray-500">#{ticket.id}</p>
        </Link>
      )}
    </Draggable>
  );
}
