const API_URL = "http://localhost:3001";

export async function getSettings() {
  const res = await fetch(`${API_URL}/settings`, { credentials: "include" });
  return res.json();
}

export async function getHelpdesks() {
  const res = await fetch(`${API_URL}/helpdesks`, { credentials: "include" });
  return res.json();
}

export async function getHelpdesk(id: number) {
  const res = await fetch(`${API_URL}/helpdesks/${id}`, {
    credentials: "include",
  });
  return res.json();
}

export async function getHelpdeskCategories(helpdeskId: number) {
  const res = await fetch(`${API_URL}/categories/helpdesk/${helpdeskId}`, {
    credentials: "include",
  });
  return res.json();
}

