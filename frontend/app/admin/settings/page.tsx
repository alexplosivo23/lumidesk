"use client";

import { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
  uploadLogo
} from "@/lib/api/admin-settings";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    companyName: "",
    timezone: "",
    theme: "light",
    primaryColor: "#303a4b",
    logoUrl: "",
  });

  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getSettings();
    setForm(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async () => {
    await updateSettings(form);
    alert("Configuración guardada correctamente");
  };

  const handleLogoUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const res = await uploadLogo(file);

    setForm({ ...form, logoUrl: res.url });
  };

  if (loading) return <p>Cargando configuración…</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Configuración General</h1>

      <div className="grid grid-cols-2 gap-6">

        {/* Tarjeta: Logo */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Logo de la Empresa</h2>

          <div className="flex flex-col items-start gap-4">
            {form.logoUrl ? (
              <img src={form.logoUrl} alt="logo" className="h-16 rounded" />
            ) : (
              <div className="h-16 w-16 bg-gray-200 rounded" />
            )}

            <input type="file" onChange={handleLogoUpload} />
          </div>
        </div>

        {/* Tarjeta: Datos básicos */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Información General</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre de la empresa"
              className="border p-2 rounded"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Zona horaria (ej: America/Asuncion)"
              className="border p-2 rounded"
              value={form.timezone}
              onChange={(e) =>
                setForm({ ...form, timezone: e.target.value })
              }
            />
          </div>
        </div>

        {/* Tarjeta: Personalización */}
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Personalización</h2>

          <div className="grid grid-cols-3 gap-6">

            {/* Tema */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Tema del Sistema</label>
              <select
                className="border p-2 rounded"
                value={form.theme}
                onChange={(e) =>
                  setForm({ ...form, theme: e.target.value })
                }
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </div>

            {/* Color primario */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Color Primario</label>
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) =>
                  setForm({ ...form, primaryColor: e.target.value })
                }
                className="w-12 h-10 p-0 border rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#212936]"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
