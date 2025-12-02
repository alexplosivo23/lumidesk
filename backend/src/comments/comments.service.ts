import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findByTicket(ticketId: number) {
    return this.prisma.comment.findMany({
      where: { ticketId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(dto: CreateCommentDto, userId: number) {
    // Si el ticket no existe → error
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: dto.ticketId },
    });

    if (!ticket) throw new NotFoundException('Ticket no encontrado');

    return this.prisma.comment.create({
      data: {
        text: dto.text,
        ticketId: dto.ticketId,
        userId,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
