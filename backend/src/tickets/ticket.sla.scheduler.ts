import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketSlaScheduler {
  private readonly logger = new Logger(TicketSlaScheduler.name);

  constructor(private prisma: PrismaService) {}

  // Cada 5 minutos revisa SLAs vencidos
  @Cron('*/5 * * * *')
  async checkSla() {
    const now = new Date();

    const result = await this.prisma.ticket.updateMany({
      where: {
        sla: { not: null },
        dueAt: { lte: now },
        slaBreached: false,
      },
      data: {
        slaBreached: true,
      },
    });

    if (result.count > 0) {
      this.logger.log(`SLA vencido en ${result.count} tickets`);
    }
  }
}
