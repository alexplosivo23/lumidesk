// app/portal/page.tsx
import Link from "next/link";

export default function PortalHome() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Bienvenido al Portal de Tickets</h2>
      <p className="text-gray-600 mb-8">
        Aquí podrás crear tickets y ver el estado de tus solicitudes.
      </p>

      <Link
        href="/portal/tickets/create"
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Crear un nuevo ticket
      </Link>
    </div>
  );
}
