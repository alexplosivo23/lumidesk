import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { PrismaService } from '../prisma/prisma.service';
import { TicketSlaScheduler } from './ticket.sla.scheduler';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService, TicketSlaScheduler],
})
export class TicketsModule {}
