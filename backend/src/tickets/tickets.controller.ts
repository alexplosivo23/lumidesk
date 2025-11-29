import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Post('create')
  createTicket(@User() user, @Body() body: any) {
    console.log("BODY RECIBIDO ===>", body);

    const { title, description, priority, sla, categoryId } = body;

    return this.ticketService.createTicket(
      user.sub,
      title,
      description,
      priority,
      sla,
      categoryId,
    );
  }


  @Get('my')
  getMyTickets(@User() user) {
    return this.ticketService.getMyTickets(user.sub);
  }

  @Get('all')
  getAll(@User() user) {
    return this.ticketService.getAllTickets(user.role);
  }

  @Get(':id')
  getTicket(@Param('id') id: string, @User() user) {
    return this.ticketService.getTicketById(Number(id), user.sub, user.role);
  }

  @Post('assign')
  assignTicket(
    @User() user,
    @Body('ticketId') ticketId: number,
    @Body('agentId') agentId: number,
  ) {
    return this.ticketService.assignTicket(ticketId, agentId, user.role, user.sub);
  }

  @Post('status')
  updateStatus(
    @User() user,
    @Body('ticketId') ticketId: number,
    @Body('status') status: string,
  ) {
    return this.ticketService.updateStatus(ticketId, status, user.role, user.sub);
  }

  // Obtener timeline de un ticket
@Get(':id/timeline')
getTimeline(@Param('id') id: string) {
  return this.ticketService.getTimeline(Number(id));
}

}
