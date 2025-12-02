"use client";

import { Droppable } from "@hello-pangea/dnd";
import KanbanTicket from "./KanbanTicket";

export default function KanbanColumn({ title, tickets }: any) {
  return (
    <div className="bg-gray-100 p-3 rounded shadow-inner min-h-[400px]">

      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-2"
          >
            {tickets.map((t: any, index: number) => (
              <KanbanTicket key={t.id} ticket={t} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  );
}
