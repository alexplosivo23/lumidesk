"use client";

import { useState } from "react";

export default function HelpdeskTIPage() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (name: string) => {
    setOpen(open === name ? null : name);
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Título */}
      <h1 className="text-2xl font-bold text-slate-800 mb-8">
        Tecnología (TI)
      </h1>

      <div className="space-y-4">

        {/* ============================== */}
        {/* CATEGORÍA 1 - SOPORTE A EQUIPOS */}
        {/* ============================== */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

          {/* Header de la card */}
          <button
            onClick={() => toggle("equipos")}
            className="w-full flex justify-between items-center p-6 text-left"
          >
            <span className="text-lg font-semibold text-slate-800">
              Soporte a Equipos
            </span>

            <span className="text-slate-500">
              {open === "equipos" ? "▲" : "▼"}
            </span>
          </button>

          {/* Contenido expandido */}
          {open === "equipos" && (
            <div className="px-6 pb-6 text-sm text-slate-600 space-y-4 animate-fadeIn">

              <p className="leading-relaxed">
                Problemas con computadoras, notebooks, impresoras, periféricos o equipos
                utilizados por los colaboradores. Aquí podrás reportar fallas, pedir
                asistencia técnica y solicitar soporte relacionado a hardware.
              </p>

              <a
                href="/portal/tickets/create?category=ti_equipos"
                className="inline-block px-5 py-3 rounded-lg bg-blue-700 text-white text-sm font-medium
                           hover:bg-blue-800 transition shadow-sm"
              >
                Crear solicitud
              </a>
            </div>
          )}
        </div>

        {/* ============================== */}
        {/* CATEGORÍA 2 - SOPORTE A SISTEMAS */}
        {/* ============================== */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">

          {/* Header */}
          <button
            onClick={() => toggle("sistemas")}
            className="w-full flex justify-between items-center p-6 text-left"
          >
            <span className="text-lg font-semibold text-slate-800">
              Soporte a Sistemas
            </span>

            <span className="text-slate-500">
              {open === "sistemas" ? "▲" : "▼"}
            </span>
          </button>

          {/* Contenido expandido */}
          {open === "sistemas" && (
            <div className="px-6 pb-6 text-sm text-slate-600 space-y-4 animate-fadeIn">

              <p className="leading-relaxed">
                Soporte para sistemas internos, accesos, SAP, Office, GLPI, portal web,
                credenciales y aplicaciones empresariales. Ideal para incidentes,
                solicitudes o consultas funcionales.
              </p>

              <a
                href="/portal/tickets/create?category=ti_sistemas"
                className="inline-block px-5 py-3 rounded-lg bg-blue-700 text-white text-sm font-medium
                           hover:bg-blue-800 transition shadow-sm"
              >
                Crear solicitud
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


