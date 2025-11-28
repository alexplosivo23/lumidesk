import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// ========================
// Calcular SLA
// ========================
function calculateDueAt(sla: string | null | undefined): Date | null {
  if (!sla) return null;

  const now = new Date();

  switch (sla) {
    case 'P1':
      return new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2h
    case 'P2':
      return new Date(now.getTime() + 8 * 60 * 60 * 1000); // +8h
    case 'P3':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24h
    default:
      return null;
  }
}

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // ========================================
  // Registrar actividad en el ticket
  // ========================================
  private async logActivity(
    ticketId: number,
    type: string,
    message: string,
    userId?: number,
  ) {
    return this.prisma.ticketActivity.create({
      data: {
        ticketId,
        type,
        message,
        userId: userId ?? null,
      },
    });
  }

  // ========================================
  // Crear ticket
  // ========================================
  async createTicket(
    userId: number,
    title: string,
    description: string,
    priority: string,
    sla?: string,
    categoryId?: number,
  ) {
    if (!sla && categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });

      sla = category?.defaultSla ?? undefined;
    }

    const dueAt = calculateDueAt(sla);

    const ticket = await this.prisma.ticket.create({
      data: {
        title,
        description,
        priority,
        sla: sla ?? null,
        dueAt,
        categoryId: categoryId ?? null,
        createdById: userId,
      },
    });

    await this.logActivity(
      ticket.id,
      'create',
      `Ticket creado por el usuario ${userId}`,
      userId,
    );

    return ticket;
  }

  // ========================================
  // Tickets del usuario
  // ========================================
  async getMyTickets(userId: number) {
    return this.prisma.ticket.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ========================================
  // Todos los tickets (solo agente/admin)
  // ========================================
  async getAllTickets(role: string) {
    if (role === 'user') {
      throw new ForbiddenException('Solo agentes o administradores');
    }

    return this.prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        createdBy: true,
        assignedTo: true,
      },
    });
  }

  // ========================================
  // Obtener ticket por ID (detalle)
  // ========================================
  async getTicketById(id: number, userId: number, role: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: true,
        assignedTo: true,
      },
    });

    if (!ticket) throw new NotFoundException('Ticket no encontrado');

    if (role === 'user' && ticket.createdById !== userId) {
      throw new ForbiddenException('No puedes ver este ticket');
    }

    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      sla: ticket.sla,
      createdAt: ticket.createdAt,

      categoryName: ticket.category?.name ?? null,

      createdByName: ticket.createdBy?.name ?? null,
      assignedToName: ticket.assignedTo?.name ?? null,
    };
  }

  // ========================================
  // Asignar ticket
  // ========================================
  async assignTicket(
    ticketId: number,
    agentId: number,
    role: string,
    userId?: number,
  ) {
    if (role === 'user') throw new ForbiddenException('No autorizado');

    const updated = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { assignedToId: agentId },
    });

    await this.logActivity(
      ticketId,
      'assign',
      `Ticket asignado al agente ${agentId}`,
      userId,
    );

    return updated;
  }

  // ========================================
  // Cambiar estado
  // ========================================
  async updateStatus(
    ticketId: number,
    status: string,
    role: string,
    userId?: number,
  ) {
    if (role === 'user') throw new ForbiddenException('No autorizado');

    const updated = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });

    await this.logActivity(
      ticketId,
      'status_change',
      `Estado cambiado a ${status}`,
      userId,
    );

    return updated;
  }

  // ========================================
  // Timeline de un ticket
  // ========================================
  async getTimeline(ticketId: number) {
    return this.prisma.ticketActivity.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
