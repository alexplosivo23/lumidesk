const API_URL = "http://localhost:3001";

export async function getAllTicketsForSupervisor() {
  const res = await fetch(`${API_URL}/tickets?supervisorView=true`, {
    credentials: "include",
  });
  return res.json();
}

export async function supervisorAssignToAgent(ticketId: number, agentId: number) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/assign-agent`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agentId }),
  });
  return res.json();
}

export async function supervisorChangeCategory(ticketId: number, categoryId: number) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/category`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryId }),
  });
  return res.json();
}

export async function supervisorGetAgents(helpdeskId: number) {
  const res = await fetch(`${API_URL}/helpdesks/${helpdeskId}/agents`, {
    credentials: "include",
  });
  return res.json();
}

export async function supervisorUpdateStatus(ticketId: number, status: string) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function supervisorUpdatePriority(ticketId: number, priority: string) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/priority`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priority }),
  });
  return res.json();
}