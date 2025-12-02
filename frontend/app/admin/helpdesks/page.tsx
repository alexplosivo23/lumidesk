"use client";

import { useEffect, useState } from "react";
import {
  getHelpdesks,
  createHelpdesk,
  updateHelpdesk,
  deleteHelpdesk,
} from "@/lib/api/admin-helpdesks";

export default function AdminHelpdesksPage() {
  const [helpdesks, setHelpdesks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
  });

  const load = async () => {
    const data = await getHelpdesks();
    setHelpdesks(data);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm({ name: "" });
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({ name: item.name });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editItem) {
      await updateHelpdesk(editItem.id, form);
    } else {
      await createHelpdesk(form);
    }

    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar esta mesa de ayuda?")) {
      await deleteHelpdesk(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Mesas de Ayuda</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
        >
          + Nueva Mesa
        </button>
      </div>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Nombre</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {helpdesks.map((h: any) => (
            <tr key={h.id} className="border-t">
              <td className="p-4">{h.name}</td>
              <td className="p-4 flex justify-end gap-3">
                <button
                  onClick={() => openEdit(h)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(h.id)}
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
              {editItem ? "Editar Mesa de Ayuda" : "Nueva Mesa de Ayuda"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre"
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

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
