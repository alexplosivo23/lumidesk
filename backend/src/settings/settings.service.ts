import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const settings = await this.prisma.settings.findUnique({
      where: { id: 1 },
    });

    // Si no existe, crear una fila por defecto
    if (!settings) {
      return this.prisma.settings.create({
        data: {},
      });
    }

    return settings;
  }

  async update(dto: UpdateSettingsDto) {
    return this.prisma.settings.update({
      where: { id: 1 },
      data: dto,
    });
  }

  async updateLogo(url: string) {
    return this.prisma.settings.update({
      where: { id: 1 },
      data: { logoUrl: url },
    });
  }
}
