// app/portal/tickets/[id]/page.tsx
import { getTicketById, getTicketTimeline } from "@/lib/api/tickets";

export default async function TicketDetail({ params }: any) {
  const { id } = params;

  const ticket = await getTicketById(id);
  const timeline = await getTicketTimeline(id);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
        <p className="text-gray-600 mb-4">{ticket.description}</p>

        <p><strong>Estado:</strong> {ticket.status}</p>
        <p><strong>Prioridad:</strong> {ticket.priority}</p>
        <p><strong>Categoría:</strong> {ticket.categoryName ?? "Sin categoría"}</p>
      </div>

      <div className="bg-white p-6 border rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Historial</h3>

        <div className="space-y-4">
          {timeline.map((item: any) => (
            <div key={item.id} className="p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
              <p>{item.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}