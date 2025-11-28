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
export async function createTicket(data: any) {
  const res = await fetch(`${API_URL}/tickets/create`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify(data),
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