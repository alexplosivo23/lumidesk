export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resumen general</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">Usuarios</div>
        <div className="p-6 bg-white rounded-xl shadow">Mesas de Ayuda</div>
        <div className="p-6 bg-white rounded-xl shadow">Tickets</div>
      </div>
    </div>
  );
}
