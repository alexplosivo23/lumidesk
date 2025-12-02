import SuperadminSidebar from "@/components/superadmin/SuperadminSidebar";
import PortalTopbar from "@/components/portal/PortalTopbar";

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <SuperadminSidebar />
      <div className="flex-1 flex flex-col">
        <PortalTopbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
