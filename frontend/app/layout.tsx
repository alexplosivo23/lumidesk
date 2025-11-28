import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export const metadata = {
  title: "Lumidesk",
  description: "Sistema de tickets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}