"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser, getRoles } from "@/lib/api/admin-users";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    roleId: 0,
  });

  const load = async () => {
    const usersData = await getUsers();
    const rolesData = await getRoles();
    setUsers(usersData);
    setRoles(rolesData);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditUser(null);
    setForm({ email: "", name: "", password: "", roleId: 0 });
    setModalOpen(true);
  };

  const openEdit = (user: any) => {
    setEditUser(user);
    setForm({
      email: user.email,
      name: user.name,
      password: "",
      roleId: user.roleId,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editUser) {
      await updateUser(editUser.id, form);
    } else {
      await createUser(form);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar este usuario?")) {
      await deleteUser(id);
      load();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
        >
          + Nuevo Usuario
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-4">Nombre</th>
            <th className="p-4">Email</th>
            <th className="p-4">Rol</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id} className="border-t">
              <td className="p-4">{u.name}</td>
              <td className="p-4">{u.email}</td>
              <td className="p-4">{u.role.name}</td>
              <td className="p-4 text-right flex gap-3 justify-end">
                <button
                  onClick={() => openEdit(u)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
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
              {editUser ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre"
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="border p-2 rounded"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <select
                className="border p-2 rounded"
                value={form.roleId}
                onChange={(e) => setForm({ ...form, roleId: Number(e.target.value) })}
              >
                <option value={0}>Seleccione un rol...</option>
                {roles.map((r: any) => (
                  <option value={r.id} key={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
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
