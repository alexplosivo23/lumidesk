const API_URL = "http://localhost:3001";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });
  return res.json();
}

export async function getUser(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    credentials: "include",
  });
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
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getHelpdesks() {
  const res = await fetch(`${API_URL}/helpdesks`, {
    credentials: "include"
  });
  return res.json();
}

export async function getRoles() {
  const res = await fetch(`${API_URL}/roles`, {
    credentials: "include"
  });
  return res.json();
}
