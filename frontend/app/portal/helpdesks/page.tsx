export default function HelpdeskTIPage() {
  return (
    <div className="max-w-5xl mx-auto">

      {/* Título */}
      <h1 className="text-2xl font-bold text-slate-800 mb-8">
        Tecnología (TI)
      </h1>

      {/* Categorías internas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Soporte a Equipos */}
        <a
          href="/portal/helpdesks/ti/equipos"
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm 
                     hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Soporte a Equipos
          </h3>
          <p className="text-sm text-slate-500">
            Problemas con computadoras, notebooks, impresoras y periféricos.
          </p>
        </a>

        {/* Soporte a Sistemas */}
        <a
          href="/portal/helpdesks/ti/sistemas"
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm 
                     hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Soporte a Sistemas
          </h3>
          <p className="text-sm text-slate-500">
            Accesos, sistemas internos, SAP, Office, GLPI, etc.
          </p>
        </a>

      </div>
    </div>
  );
}
