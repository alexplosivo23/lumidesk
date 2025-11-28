// app/portal/layout.tsx
import "../globals.css";
import Link from "next/link";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="w-full bg-white border-b shadow-sm py-3 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Portal de Usuario</h1>
        <nav className="flex gap-6">
          <Link href="/portal/tickets" className="text-blue-600 hover:underline">
            Mis Tickets
          </Link>
          <Link href="/portal/tickets/new" className="text-blue-600 hover:underline">
            Crear Ticket
          </Link>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-4xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
