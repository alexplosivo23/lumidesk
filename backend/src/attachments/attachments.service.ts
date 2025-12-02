import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  async findByTicket(ticketId: number) {
    return this.prisma.attachment.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(file: Express.Multer.File, ticketId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) throw new NotFoundException('Ticket no encontrado');

    return this.prisma.attachment.create({
      data: {
        ticketId,
        url: `/uploads/${file.filename}`,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.attachment.delete({
      where: { id },
    });
  }
}
