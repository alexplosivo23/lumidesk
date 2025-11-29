import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('approvals')
@UseGuards(JwtAuthGuard)
export class ApprovalsController {
  constructor(private service: ApprovalsService) {}

  // Crear flujo automático
  @Post('flow/create')
  async createFlow(
    @Body('name') name: string,
    @Body('categoryId') categoryId: number,
    @Body('steps') steps: { approverId: number; stepOrder: number }[],
  ) {
    return this.service.createFlow(name, categoryId, steps);
  }

  // Ver flujos automáticos
  @Get('flows')
  async getFlows() {
    return this.service.getFlows();
  }

  // Solicitar aprobación manual
  @Post('request')
  async requestApproval(
    @Body('ticketId') ticketId: number,
    @Body('approverId') approverId: number,
    @Body('comment') comment: string,
  ) {
    return this.service.requestApproval(
      Number(ticketId),
      Number(approverId),
      comment,
    );
  }

  // Aprobar solicitud
  @Post('approve')
  async approve(
    @Body('approvalId') approvalId: number,
    @Body('approverId') approverId: number,
  ) {
    return this.service.approve(
      Number(approvalId),
      Number(approverId),
    );
  }

  // Rechazar solicitud
  @Post('reject')
  async reject(
    @Body('approvalId') approvalId: number,
    @Body('approverId') approverId: number,
    @Body('reason') reason: string,
  ) {
    return this.service.reject(
      Number(approvalId),
      Number(approverId),
      reason,
    );
  }

  // Listar aprobaciones de un ticket
  @Get('ticket/:id')
  async getApprovalsByTicket(@Param('id') id: string) {
    return this.service.getApprovalsByTicket(Number(id));
  }
}
