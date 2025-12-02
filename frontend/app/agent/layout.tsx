import AgentSidebar from "@/components/agent/AgentSidebar";
import PortalTopbar from "@/components/portal/PortalTopbar";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <AgentSidebar />
      <div className="flex-1 flex flex-col">
        <PortalTopbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
