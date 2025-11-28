import DeskSidebar from "@/components/sidebar/DeskSidebar";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DeskSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}