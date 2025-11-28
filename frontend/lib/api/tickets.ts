export async function fetchAllTickets() {
  try {
    const res = await fetch("http://localhost:3001/tickets/all", {
      method: "GET",
      credentials: "include",     // <—— IMPORTANTE
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Error al obtener los tickets");
    }

    return await res.json();
  } catch (err) {
    console.error("FETCH ALL TICKETS ERROR:", err);
    throw err;
  }
}

export async function getTicketById(id) {
  const res = await fetch(`http://localhost:3001/tickets/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener ticket");
  return res.json();
}

export async function updateTicketStatus(ticketId, status) {
  const res = await fetch(`http://localhost:3001/tickets/status`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticketId, status }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado");
  return res.json();
}
export async function getTicketTimeline(id: string | number) {
  const res = await fetch(`http://localhost:3001/tickets/${id}/timeline`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error al obtener el historial del ticket");
  }

  return res.json();
}

