const API_URL = "http://localhost:3001";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, { credentials: "include" });
  return res.json();
}

export async function getRoles() {
  const res = await fetch(`${API_URL}/roles`, { credentials: "include" });
  return res.json();
}

export async function createUser(data: any) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(id: number, data: any) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}
