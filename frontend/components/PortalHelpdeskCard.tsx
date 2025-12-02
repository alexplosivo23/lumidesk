"use client";

import Link from "next/link";

export default function PortalHelpdeskCard({ id, label }: any) {
  return (
    <Link
      href={`/portal/helpdesks/${id}`}
      className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border cursor-pointer"
    >
      <h3 className="text-xl font-semibold">{label}</h3>
      <p className="text-sm text-gray-500 mt-2">Ver categorías</p>
    </Link>
  );
}