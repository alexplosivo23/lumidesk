"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";

export default function DeskSidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-[#303a4b] text-white min-h-screen flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8">Desk</h1>

      <nav className="flex flex-col gap-4 grow">
        <Link href="/desk/home" className="hover:text-gray-300">Inicio</Link>
        <Link href="/desk/tickets" className="hover:text-gray-300">Tickets</Link>
        <Link href="/desk/approvals" className="hover:text-gray-300">Aprobaciones</Link>
        <Link href="/desk/categories" className="hover:text-gray-300">Categorías</Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-500/40">
        <p className="text-sm opacity-70 mb-2">{user?.email}</p>
        <button
          onClick={logout}
          className="w-full bg-red-600 py-2 rounded text-sm hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
