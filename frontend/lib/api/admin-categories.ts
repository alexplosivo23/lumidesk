const API_URL = "http://localhost:3001";

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, { credentials: "include" });
  return res.json();
}

export async function getHelpdesks() {
  const res = await fetch(`${API_URL}/helpdesks`, { credentials: "include" });
  return res.json();
}

export async function createCategory(data: any) {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCategory(id: number, data: any) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCategory(id: number) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}
