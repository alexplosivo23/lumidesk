import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LumiDesk",
  description: "Portal de ayuda LumiDesk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
