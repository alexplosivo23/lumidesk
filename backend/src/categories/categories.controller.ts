import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  // Crear categoría raíz
  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }

  // Crear subcategoría
  @Post('subcategory')
  createSub(
    @Body('name') name: string,
    @Body('parentId') parentId: number,
  ) {
    return this.service.createSubcategory(name, Number(parentId));
  }

  // Listar categorías
  @Get()
  getAll() {
    return this.service.getAll();
  }

  // Asignar categoría a ticket
  @Patch('ticket/:id')
  assignCategory(
    @Param('id') ticketId: number,
    @Body('categoryId') categoryId: number,
  ) {
    return this.service.assignCategoryToTicket(Number(ticketId), Number(categoryId));
  }

  // Actualizar SLA por defecto
  @Patch('sla/:id')
  updateSla(
    @Param('id') id: number,
    @Body('sla') sla: string,
  ) {
    return this.service.updateSla(Number(id), sla);
  }
}
