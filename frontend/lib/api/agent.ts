const API_URL = "http://localhost:3001";

export async function getMyAssignedTickets() {
  const res = await fetch(`${API_URL}/tickets?assigned=me`, {
    credentials: "include",
  });
  return res.json();
}

export async function getUnassignedTickets() {
  const res = await fetch(`${API_URL}/tickets?unassigned=true`, {
    credentials: "include",
  });
  return res.json();
}

export async function assignTicket(id: number) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assignToMe: true }),
  });
  return res.json();
}

export async function agentAssignTicket(id: number) {
  const res = await fetch(`${API_URL}/tickets/${id}/assign`, {
    method: "PATCH",
    credentials: "include",
  });
  return res.json();
}

export async function agentUpdateStatus(id: number, status: string) {
  const res = await fetch(`${API_URL}/tickets/${id}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function agentUpdatePriority(id: number, priority: string) {
  const res = await fetch(`${API_URL}/tickets/${id}/priority`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priority }),
  });
  return res.json();
}
