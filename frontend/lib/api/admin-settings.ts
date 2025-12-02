const API_URL = "http://localhost:3001";

export async function getSettings() {
  const res = await fetch(`${API_URL}/settings`, {
    credentials: "include",
  });
  return res.json();
}

export async function updateSettings(data: any) {
  const res = await fetch(`${API_URL}/settings`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function uploadLogo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/settings/logo`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return res.json();
}
