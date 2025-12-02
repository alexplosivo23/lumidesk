"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Función para resaltar menú activo
  function isActive(path: string) {
    return pathname.startsWith(path)
      ? "bg-blue-50 text-blue-700 font-semibold border-r-4 border-blue-700"
      : "text-gray-700 hover:bg-gray-100";
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">

        {/* HEADER DEL SIDEBAR */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold" style={{ backgroundColor: "#2A3748" }}>
              A
            </div>

            <div>
              <p className="font-semibold text-gray-900" >Agente</p>
              <p className="text-xs text-gray-500">intraDesk</p>
            </div>
          </div>
        </div>

        {/* MENÚ */}
        <nav className="flex flex-col p-4 gap-1 text-sm">

          <Link
            href="/desk/home"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/desk/home")}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7m-9 5v6m0 0H5a2 2 0 01-2-2v-5a2 2 0 012-2h3m9 7h3a2 2 0 002-2v-5a2 2 0 00-2-2h-3" />
            </svg>
            Dashboard
          </Link>

          <Link
            href="/desk/tickets"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/desk/tickets")}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
            Todos los tickets
          </Link>

          <Link
            href="/desk/tickets/assigned"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/desk/tickets?filter=assigned")}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5.121 17.804A9 9 0 1118.364 4.56M15 11h6m0 0l-3-3m3 3l-3 3" />
            </svg>
            Asignados a mí
          </Link>

          <Link
            href="/desk/tickets/unassigned"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/desk/tickets?filter=unassigned")}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sin asignar
          </Link>

          {/* SEPARADOR */}
          <div className="my-4 border-t"></div>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 12H3m12 0l-4-4m4 4l-4 4m8-8v8a2 2 0 002 2h3" />
            </svg>
            Cerrar sesión
          </Link>

          <Link href="/desk/kanban">
            Kanban
          </Link>
        </nav>
      </aside>

      {/* CONTENIDO DEL DESK */}
      <main className="flex-1 p-8 fade-in">
        {children}
      </main>
    </div>
    
  );
}