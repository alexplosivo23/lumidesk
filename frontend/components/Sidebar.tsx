"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  ClipboardCheck,
  Users,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/auth";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/desk" },
  { label: "Tickets", icon: Ticket, href: "/desk/tickets" },
  { label: "Aprobaciones", icon: ClipboardCheck, href: "/desk/approvals" },
  { label: "Usuarios", icon: Users, href: "/desk/users" },
];

export default function SidebarDesk() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#303A4B] text-white flex flex-col p-4 shadow-lg">
      <h1 className="text-2xl font-bold tracking-tight mb-8">Lumidesk</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/20">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/10 rounded-lg w-full"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
