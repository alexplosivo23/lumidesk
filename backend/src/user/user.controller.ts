import {
  Body,
  Controller,
  Post,
  Get,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.userService.createUser(email, password, name);
  }

  // Nuevo endpoint: listar todos los usuarios
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Cambiar rol (solo admin)
  @Roles('admin')
  @Post('set-role')
  async setRole(
    @Body('id') id: number,
    @Body('role') role: string,
  ) {
    return this.userService.setRole(id, role);
  }

  // Listar usuarios (solo admin)
  @Roles('admin')
  @Get('list')
  getAll() {
    return this.userService.getAll();
  }
}
