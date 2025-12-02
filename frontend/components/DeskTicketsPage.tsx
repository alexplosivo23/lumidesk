"use client";

import DeskHomePage from "@/app/desk/home/page";

export default function DeskTicketsPage({ filter }: { filter: string | null }) {
  return <DeskHomePage forcedFilter={filter} />;
}