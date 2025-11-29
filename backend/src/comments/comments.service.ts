import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async addComment(ticketId: number, userId: number, message: string, isInternal = false) {
    if (!message || message.trim() === '') {
      throw new Error('Message is required');
    }

    // crear comentario
    const comment = await this.prisma.comment.create({
      data: {
        ticketId,
        authorId: userId,
        message,
        isInternal,
      },
    });

    // registrar actividad en el timeline
    await this.prisma.ticketActivity.create({
      data: {
        ticketId,
        type: isInternal ? 'internal_comment' : 'comment',
        message: isInternal
          ? `Comentario interno agregado por el usuario ${userId}`
          : `Comentario agregado por el usuario ${userId}`,
        userId,
      },
    });

    return comment;
  }

  async getCommentsByTicket(ticketId: number) {
    return this.prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
