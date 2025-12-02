const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getTicketComments(ticketId: number) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/comments`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al obtener comentarios");
  return await res.json();
}

export async function addTicketComment(ticketId: number, formData: FormData) {
  const res = await fetch(`${API_URL}/tickets/${ticketId}/comments`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Error al agregar comentario");
  return await res.json();
}
