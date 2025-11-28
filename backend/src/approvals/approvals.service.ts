import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApprovalsService {
  constructor(private prisma: PrismaService) {}

  // Crear flujo automático por categoría
  async createFlow(
    name: string,
    categoryId: number,
    steps: { approverId: number; stepOrder: number }[],
  ) {
    const flow = await this.prisma.approvalFlow.create({
      data: { name, categoryId },
    });

    for (const step of steps) {
      await this.prisma.approvalFlowStep.create({
        data: {
          flowId: flow.id,
          approverId: step.approverId,
          stepOrder: step.stepOrder,
        },
      });
    }

    return { success: true, flowId: flow.id };
  }

  // Listar flujos
  async getFlows() {
    return this.prisma.approvalFlow.findMany({
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
        },
      },
    });
  }

  // Solicitar aprobación manual (sin flujo)
  async requestApproval(
    ticketId: number,
    approverId: number,
    comment?: string,
  ) {
    return this.prisma.ticketApproval.create({
      data: {
        ticketId,
        approverId,
        status: 'pending',
        comment: comment ?? null,
      },
    });
  }

  // Aprobar (manual o parte de flujo)
  async approve(approvalId: number, approverId: number) {
    const approval = await this.prisma.ticketApproval.findUnique({
      where: { id: approvalId },
      include: { step: true, ticket: true },
    });

    if (!approval) throw new NotFoundException('Approval not found');

    // Si es parte de un flujo, validar aprobador
    if (approval.step && approval.step.approverId !== approverId) {
      throw new ForbiddenException('No eres el aprobador de este paso');
    }

    // Marcar actual como aprobado
    await this.prisma.ticketApproval.update({
      where: { id: approvalId },
      data: {
        status: 'approved',
        approvedAt: new Date(),
      },
    });

    // Si NO tiene step → es manual, termina acá
    if (!approval.step) {
      return { success: true };
    }

    // Buscar siguiente paso del flujo
    const nextStep = await this.prisma.approvalFlowStep.findFirst({
      where: {
        flowId: approval.step.flowId,
        stepOrder: { gt: approval.step.stepOrder },
      },
      orderBy: { stepOrder: 'asc' },
    });

    if (nextStep) {
      // Crear aprobación para el siguiente paso
      await this.prisma.ticketApproval.create({
        data: {
          ticketId: approval.ticketId,
          stepId: nextStep.id,
          approverId: nextStep.approverId,
          status: 'pending',
        },
      });

      return { success: true, nextStepId: nextStep.id };
    } else {
      // Era el último paso → marcar ticket como "approved"
      await this.prisma.ticket.update({
        where: { id: approval.ticketId },
        data: { status: 'approved' },
      });

      return { success: true, final: true };
    }
  }

  // Rechazar
  async reject(approvalId: number, approverId: number, reason?: string) {
    const approval = await this.prisma.ticketApproval.findUnique({
      where: { id: approvalId },
      include: { step: true },
    });

    if (!approval) throw new NotFoundException('Approval not found');

    if (approval.step && approval.step.approverId !== approverId) {
      throw new ForbiddenException('No eres el aprobador de este paso');
    }

    return this.prisma.ticketApproval.update({
      where: { id: approvalId },
      data: {
        status: 'rejected',
        comment: reason ?? approval.comment,
        approvedAt: new Date(),
      },
    });
  }

  // Aprobaciones de un ticket
  async getApprovalsByTicket(ticketId: number) {
    return this.prisma.ticketApproval.findMany({
      where: { ticketId },
      include: {
        step: true,
        approver: true,
      },
      orderBy: { id: 'asc' },
    });
  }
}
