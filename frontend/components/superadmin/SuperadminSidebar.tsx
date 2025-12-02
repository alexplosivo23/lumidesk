"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", href: "/superadmin" },
  { label: "Settings", href: "/superadmin/settings" },
  { label: "Mesas de Ayuda", href: "/superadmin/helpdesks" },
  { label: "Categorías", href: "/superadmin/categories" },
  { label: "Usuarios", href: "/superadmin/users" },
];

export default function SuperadminSidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 bg-[#303a4b] text-white min-h-screen p-6 shadow-xl">
      <h1 className="text-xl font-semibold mb-8">intraDesk Admin</h1>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              px-4 py-2 rounded-lg transition
              ${path === item.href
                ? "bg-white text-[#303a4b] font-semibold"
                : "text-gray-300 hover:bg-gray-700/40"}
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
