// app/portal/tickets/page.tsx
import { getMyTickets } from "@/lib/api/tickets";
import Link from "next/link";

export default async function MyTicketsPage() {
  const tickets = await getMyTickets();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mis Tickets</h2>

      <div className="space-y-4">
        {tickets.map((t: any) => (
          <Link
            key={t.id}
            href={`/portal/tickets/${t.id}`}
            className="block p-4 bg-white border rounded shadow hover:bg-gray-50"
          >
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-xs text-gray-400 mt-2">
              Estado: {t.status} • Prioridad: {t.priority}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
