"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getHelpdesks,
} from "@/lib/api/admin-categories";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [helpdesks, setHelpdesks] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    helpdeskId: 0,
  });

  const load = async () => {
    const c = await getCategories();
    const h = await getHelpdesks();
    setCategories(c);
    setHelpdesks(h);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm({ name: "", helpdeskId: 0 });
    setModalOpen(true);
  };

  const openEdit = (category: any) => {
    setEditItem(category);
    setForm({
      name: category.name,
      helpdeskId: category.helpdeskId,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editItem) {
      await updateCategory(editItem.id, form);
    } else {
      await createCategory(form);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar esta categoría?")) {
      await deleteCategory(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categorías</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
        >
          + Nueva Categoría
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Nombre</th>
            <th className="p-4">Mesa de Ayuda</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat: any) => (
            <tr key={cat.id} className="border-t">
              <td className="p-4">{cat.name}</td>
              <td className="p-4">{cat.helpdesk.name}</td>
              <td className="p-4 flex justify-end gap-3">
                <button
                  onClick={() => openEdit(cat)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editItem ? "Editar Categoría" : "Nueva Categoría"}
            </h2>

            <div className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Nombre"
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              {/* Selector de mesa */}
              <select
                className="border p-2 rounded"
                value={form.helpdeskId}
                onChange={(e) =>
                  setForm({ ...form, helpdeskId: Number(e.target.value) })
                }
              >
                <option value={0}>Seleccione una mesa...</option>
                {helpdesks.map((h: any) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#303a4b] text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
