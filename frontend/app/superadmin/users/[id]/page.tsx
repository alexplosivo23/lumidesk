"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getUser,
  updateUser,
  getRoles,
  getHelpdesks,
} from "@/lib/api/superadmin-users";

export default function EditUserPage() {
  const { id } = useParams();
  const userId = Number(id);

  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [helpdesks, setHelpdesks] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [helpdeskId, setHelpdeskId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const usr = await getUser(userId);
      setUser(usr);

      setName(usr.name);
      setEmail(usr.email);
      setRoleId(usr.roleId);
      setHelpdeskId(usr.helpdeskId || null);

      setRoles(await getRoles());
      setHelpdesks(await getHelpdesks());
    }
    load();
  }, [userId]);

  const handleSave = async () => {
    const data: any = {
      name,
      email,
      roleId,
      helpdeskId:
        ["agent", "supervisor"].includes(
          roles.find((r) => r.id === roleId)?.name
        )
          ? helpdeskId
          : null,
    };

    await updateUser(userId, data);
    alert("Usuario actualizado");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Editar Usuario</h1>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-700 mb-1">Nombre</p>
          <input
            className="border p-3 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-gray-700 mb-1">Email</p>
          <input
            className="border p-3 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <p className="text-gray-700 mb-1">Rol</p>
          <select
            className="border p-3 rounded w-full"
            value={roleId || ""}
            onChange={(e) => setRoleId(Number(e.target.value))}
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {["agent", "supervisor"].includes(
          roles.find((r) => r.id === roleId)?.name
        ) && (
          <div>
            <p className="text-gray-700 mb-1">Mesa del usuario</p>
            <select
              className="border p-3 rounded w-full"
              value={helpdeskId || ""}
              onChange={(e) => setHelpdeskId(Number(e.target.value))}
            >
              <option value="">Seleccione mesa</option>
              {helpdesks.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#303a4b] text-white rounded-lg hover:bg-[#1f2937]"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
