import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async addComment(ticketId: number, userId: number, message: string) {
    return this.prisma.comment.create({
      data: {
        ticketId,
        authorId: userId,
        message,
      },
    });
  }

  async getCommentsByTicket(ticketId: number) {
    return this.prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
