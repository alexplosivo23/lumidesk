import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, name: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });
  }

  // 🔥 Cambiar rol
  async setRole(userId: number, role: string) {
    const validRoles = ['user', 'agent', 'admin'];

    if (!validRoles.includes(role)) {
      throw new BadRequestException(`Invalid role: ${role}`);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  // 🔥 Listar usuarios (este ya existía)
  async getAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true, name: true },
    });
  }

  // 🔥 Nuevo: listar todos los usuarios con orden
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { id: 'asc' },
    });
  }
}
