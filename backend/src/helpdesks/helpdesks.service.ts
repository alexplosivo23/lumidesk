import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHelpdeskDto } from './dto/create-helpdesk.dto';
import { UpdateHelpdeskDto } from './dto/update-helpdesk.dto';

@Injectable()
export class HelpdesksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.helpdesk.findMany({
      include: { categories: true },
    });
  }

  async findOne(id: number) {
    const hd = await this.prisma.helpdesk.findUnique({
      where: { id },
      include: { categories: true },
    });

    if (!hd) throw new NotFoundException('Mesa de ayuda no encontrada');

    return hd;
  }

  async create(dto: CreateHelpdeskDto) {
    return this.prisma.helpdesk.create({
      data: { name: dto.name },
    });
  }

  async update(id: number, dto: UpdateHelpdeskDto) {
    return this.prisma.helpdesk.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.helpdesk.delete({
      where: { id },
    });
  }
}
