"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  getHelpdesks,
  getRoles,
} from "@/lib/api/superadmin-users";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [helpdesks, setHelpdesks] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [helpdeskId, setHelpdeskId] = useState<number | null>(null);

  const load = async () => {
    setUsers(await getUsers());
    setRoles(await getRoles());
    setHelpdesks(await getHelpdesks());
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return alert("Ingrese un nombre");
    if (!email.trim()) return alert("Ingrese un email");
    if (!password.trim()) return alert("Ingrese una contraseña");
    if (!roleId) return alert("Seleccione un rol");

    const data: any = {
      name,
      email,
      password,
      roleId,
    };

    // solo agentes/supervisores requieren mesa
    const role = roles.find((r: any) => r.id === roleId)?.name;
    if (["agent", "supervisor"].includes(role)) {
      if (!helpdeskId) return alert("Seleccione una mesa");
      data.helpdeskId = helpdeskId;
    }

    await createUser(data);

    setName("");
    setEmail("");
    setPassword("");
    setRoleId(null);
    setHelpdeskId(null);

    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Usuarios</h1>

      {/* LISTA */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Usuarios existentes</h2>

        <table className="w-full text-sm border border-gray-100">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Mesa</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role.name}</td>
                <td className="p-3">{u.helpdesk?.name || "-"}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/superadmin/users/${u.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No hay usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREACIÓN */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Crear usuario</h2>

        <div className="flex flex-col gap-3">
          <input
            className="border p-3 rounded"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-3 rounded"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="border p-3 rounded"
            placeholder="Contraseña inicial"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROL */}
          <select
            className="border p-3 rounded"
            value={roleId || ""}
            onChange={(e) => setRoleId(Number(e.target.value))}
          >
            <option value="">Seleccione un rol</option>
            {roles.map((r: any) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {/* MESA (solo agent o supervisor) */}
          {["agent", "supervisor"].includes(
            roles.find((r: any) => r.id === roleId)?.name
          ) && (
            <select
              className="border p-3 rounded"
              value={helpdeskId || ""}
              onChange={(e) => setHelpdeskId(Number(e.target.value))}
            >
              <option value="">Seleccione mesa</option>
              {helpdesks.map((h: any) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937] w-fit"
          >
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  );
}
