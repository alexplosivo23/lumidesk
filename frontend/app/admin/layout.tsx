import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar fijo */}
      <AdminSidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <AdminTopbar />

        {/* Contenido interno */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
