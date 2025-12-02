"use client";

import { useEffect, useState } from "react";
import { getSettings } from "@/lib/api/portal";

export default function PortalTopbar() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {settings?.logoUrl ? (
          <img src={settings.logoUrl} className="h-8" />
        ) : (
          <span className="text-xl font-semibold">{settings?.companyName}</span>
        )}
      </div>

      <div className="text-gray-600 text-sm">
        Portal del Usuario
      </div>
    </header>
  );
}



