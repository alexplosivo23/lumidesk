const API_URL = "http://localhost:3001";

export async function getHelpdesks() {
  const res = await fetch(`${API_URL}/helpdesks`, {
    credentials: "include",
  });
  return res.json();
}

export async function getHelpdesk(id: number) {
  const res = await fetch(`${API_URL}/helpdesks/${id}`, {
    credentials: "include",
  });
  return res.json();
}

export async function createHelpdesk(data: any) {
  const res = await fetch(`${API_URL}/helpdesks`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateHelpdesk(id: number, data: any) {
  const res = await fetch(`${API_URL}/helpdesks/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
