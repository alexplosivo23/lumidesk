import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalTopbar from "@/components/portal/PortalTopbar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar izquierda */}
      <PortalSidebar />

      {/* Contenido */}
      <div className="flex-1 flex flex-col">
        <PortalTopbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

