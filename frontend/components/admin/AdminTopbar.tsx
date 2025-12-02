"use client";

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
      <h2 className="text-xl font-semibold">Panel de Administración</h2>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>Administrador</span>
      </div>
    </header>
  );
}
