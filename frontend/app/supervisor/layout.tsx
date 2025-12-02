import SupervisorSidebar from "@/components/supervisor/SupervisorSidebar";
import PortalTopbar from "@/components/portal/PortalTopbar";

export default function SupervisorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <SupervisorSidebar />
      <div className="flex-1 flex flex-col">
        <PortalTopbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
