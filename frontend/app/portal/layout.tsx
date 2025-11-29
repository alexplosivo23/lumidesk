import Link from "next/link";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR SUPERIOR */}
      <header className="bg-white shadow py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO / TITULO */}
          <Link href="/portal/tickets" className="text-xl font-semibold text-blue-700">
            Portal de Tickets
          </Link>

          {/* NAV LINKS */}
          <nav className="flex gap-6 text-sm font-medium">

            <Link href="/portal/tickets" className="hover:text-blue-600">
              Mis Tickets
            </Link>

            <Link href="/portal/tickets/create" className="hover:text-blue-600">
              Crear Ticket
            </Link>

            <Link href="/" className="hover:text-red-600">
              Cerrar Sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
