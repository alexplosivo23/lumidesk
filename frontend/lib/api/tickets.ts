// lib/api/tickets.ts

const API_URL = "http://localhost:3001"; // BACKEND REAL

// ==========================================================
// Opciones para fetch con cookies
// ==========================================================
function getOptions() {
  return {
    credentials: "include" as const,
    headers: {
      "Content-Type": "application/json",
    },
  };
}

// ==========================================================
// Obtener tickets del usuario
// ==========================================================
export async function getMyTickets() {
  const res = await fetch(`${API_URL}/tickets/my`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ==========================================================
// Crear ticket
// ==========================================================
export async function createTicket(
  title: string,
  description: string,
  priority: string,
  categoryId?: number
) {
  const res = await fetch(`${API_URL}/tickets/create`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({
      title,
      description,
      priority,
      categoryId: categoryId ? Number(categoryId) : undefined,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


// ==========================================================
// Obtener ticket por ID
// ==========================================================
export async function getTicketById(id: number | string) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ==========================================================
// Obtener timeline de un ticket
// ==========================================================
export async function getTicketTimeline(id: number | string) {
  const res = await fetch(`${API_URL}/tickets/${id}/timeline`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ==========================================================
// Obtener TODOS los tickets (vista agente/admin)
// ==========================================================
export async function fetchAllTickets() {
  const res = await fetch(`${API_URL}/tickets/all`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Error al obtener los tickets");
  }

  return res.json();
}

// ==========================================================
// Cambiar estado de ticket (Agente/Admin)
// ==========================================================
export async function updateTicketStatus(ticketId: number, status: string) {
  const res = await fetch(`${API_URL}/tickets/status`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({ ticketId, status }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "Error al actualizar el estado");
  }

  return res.json();
}

export async function addComment(ticketId: number, message: string, internal = false) {
  const res = await fetch(`${API_URL}/comments/add`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({ ticketId, message, internal }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getComments(ticketId: number) {
  const res = await fetch(`${API_URL}/comments/ticket/${ticketId}`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function assignTicket(ticketId: number, agentId: number) {
  const res = await fetch(`${API_URL}/tickets/assign`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({ ticketId, agentId }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function requestApproval(ticketId: number, approverId: number, comment?: string) {
  const res = await fetch(`${API_URL}/approvals/request`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({ ticketId, approverId, comment }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function approve(approvalId: number, approverId: number) {
  const res = await fetch(`${API_URL}/approvals/approve`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({ approvalId, approverId }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function reject(approvalId: number, approverId: number, reason?: string) {
  const res = await fetch(`${API_URL}/approvals/reject`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify({ approvalId, approverId, reason }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
