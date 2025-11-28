// lib/api/tickets.ts

const API_URL = "http://localhost:3001"; // 👈 TU BACKEND REAL

// =============================================================================
// Obtener cookie
// =============================================================================
function getOptions() {
  return {
    credentials: "include" as const,
    headers: {
      "Content-Type": "application/json",
    },
  };
}

// =============================================================================
// Obtener mis tickets
// =============================================================================
export async function getMyTickets() {
  const res = await fetch(`${API_URL}/tickets/my`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// =============================================================================
// Crear ticket
// =============================================================================
export async function createTicket(data: any) {
  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    ...getOptions(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// =============================================================================
// Obtener ticket por ID
// =============================================================================
export async function getTicketById(id: number | string) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// =============================================================================
// Obtener timeline
// =============================================================================
export async function getTicketTimeline(id: number | string) {
  const res = await fetch(`${API_URL}/tickets/${id}/timeline`, {
    ...getOptions(),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

