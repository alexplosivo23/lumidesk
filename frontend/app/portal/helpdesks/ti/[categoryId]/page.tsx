import Link from "next/link";

export default function TICreatePage({ params }: any) {
  const { categoryId } = params;

  const labels: any = {
    equipos: "Soporte a Equipos",
    sistemas: "Soporte a Sistemas",
  };

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-4">
        {labels[categoryId] ?? "Categoría"}
      </h1>

      <p className="text-gray-600 mb-8">
        Crear una nueva solicitud para <strong>{labels[categoryId]}</strong>.
      </p>

      <Link
        href={`/portal/helpdesks/ti/${categoryId}/create`}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Crear Solicitud
      </Link>
    </div>
  );
}