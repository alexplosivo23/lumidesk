import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async findFiltered(query: any, user: any) {
  const where: any = {};

    // tickets asignados a mí
    if (query.assigned === "me") {
      where.agentId = user.id;
    }

    // tickets sin asignar
    if (query.unassigned === "true") {
      where.agentId = null;
    }

    return this.prisma.ticket.findMany({
      where,
      include: {
        user: true,
        category: { include: { helpdesk: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany({
      include: {
        user: true,
        category: { include: { helpdesk: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMine(userId: number) {
    return this.prisma.ticket.findMany({
      where: { userId },
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        category: { include: { helpdesk: true } },
        comments: {
          include: { user: true },
          orderBy: { createdAt: 'asc' },
        },
        attachments: true,
      },
    });

    if (!ticket) throw new NotFoundException('Ticket no encontrado');

    return ticket;
  }

  async create(dto: CreateTicketDto, userId: number) {
    return this.prisma.ticket.create({
      data: {
        subject: dto.subject,
        description: dto.description,
        priority: dto.priority,
        categoryId: dto.categoryId,
        userId,
      },
    });
  }

  async update(id: number, dto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
