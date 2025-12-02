"use client";

import { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
  uploadLogo,
} from "@/lib/api/superadmin";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [companyName, setCompanyName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#303a4b");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getSettings();
    setSettings(data);
    setCompanyName(data.companyName);
    setPrimaryColor(data.primaryColor);
    setLogoPreview(data.logoUrl);
  };

  const handleSave = async () => {
    await updateSettings({
      companyName,
      primaryColor,
    });

    if (logoFile) {
      await uploadLogo(logoFile);
    }

    alert("Configuración guardada");
    load();
  };

  const handleLogo = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  if (!settings) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-semibold mb-6">Configuración General</h1>

      {/* NOMBRE */}
      <div className="mb-6">
        <p className="text-gray-700 mb-1">Nombre de la Empresa</p>
        <input
          type="text"
          className="border p-3 rounded w-full"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      {/* COLOR */}
      <div className="mb-6">
        <p className="text-gray-700 mb-1">Color Primario</p>
        <input
          type="color"
          className="h-10 w-20 cursor-pointer"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>

      {/* LOGO */}
      <div className="mb-6">
        <p className="text-gray-700 mb-1">Logo</p>

        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo preview"
            className="h-16 mb-3 border rounded"
          />
        )}

        <input type="file" onChange={handleLogo} />
      </div>

      {/* BOTÓN GUARDAR */}
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
