import PortalSidebar from "@/components/sidebar/PortalSidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <PortalSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
