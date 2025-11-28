import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // Crear categoría raíz
  async create(name: string) {
    return this.prisma.category.create({
      data: { name },
    });
  }

  // Crear subcategoría
  async createSubcategory(name: string, parentId: number) {
    return this.prisma.category.create({
      data: {
        name,
        parentId,
      },
    });
  }

  // Obtener árbol de categorías (padres + subcategorías)
  async getAll() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        subcategories: true, // <- antes era children
      },
      orderBy: { name: 'asc' },
    });
  }

  // Asignar categoría a ticket
  async assignCategoryToTicket(ticketId: number, categoryId: number) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: { categoryId },
    });
  }

  // Actualizar SLA por defecto de una categoría
  async updateSla(id: number, defaultSla: string) {
    return this.prisma.category.update({
      where: { id },
      data: { defaultSla },
    });
  }
}