import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SuperadminService {
  constructor(private prisma: PrismaService) {}

  async stats() {
    const users = await this.prisma.user.count();
    const helpdesks = await this.prisma.helpdesk.count();
    const categories = await this.prisma.category.count();

    return { users, helpdesks, categories };
  }
}
