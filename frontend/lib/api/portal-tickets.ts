const API_URL = "http://localhost:3001";

export async function getCategory(id: number) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    credentials: "include",
  });
  return res.json();
}

export async function createTicket(data: any) {
  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getMyTickets() {
  const res = await fetch(`${API_URL}/tickets/mine`, {
    credentials: "include",
  });
  return res.json();
}

export async function getTicketById(id: number) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    credentials: "include",
  });
  return res.json();
}

export async function getComments(ticketId: number) {
  const res = await fetch(`${API_URL}/comments/ticket/${ticketId}`, {
    credentials: "include",
  });
  return res.json();
}

export async function addComment(ticketId: number, text: string) {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, ticketId }),
  });
  return res.json();
}

export async function getAttachments(ticketId: number) {
  const res = await fetch(`${API_URL}/attachments/ticket/${ticketId}`, {
    credentials: "include",
  });
  return res.json();
}

export async function uploadAttachment(ticketId: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ticketId", String(ticketId));

  const res = await fetch(`${API_URL}/attachments`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return res.json();
}
