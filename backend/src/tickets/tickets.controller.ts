import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @Roles('agent', 'supervisor', 'superadmin')
  findFiltered(@Query() query, @User() user) {
    return this.ticketsService.findFiltered(query, user);
  }

  @Get()
  @Roles('superadmin', 'supervisor', 'agent')
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('mine')
  @Roles('user', 'agent', 'supervisor', 'superadmin')
  findMine(@User() user) {
    return this.ticketsService.findMine(user.id);
  }

  @Get(':id')
  @Roles('user', 'agent', 'supervisor', 'superadmin')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(Number(id));
  }

  @Post()
  @Roles('user', 'agent', 'supervisor', 'superadmin')
  create(@Body() dto: CreateTicketDto, @User() user) {
    return this.ticketsService.create(dto, user.id);
  }

  @Patch(':id')
  @Roles('agent', 'supervisor', 'superadmin')
  update(@Param('id') id: string, @Body() dto: UpdateTicketDto) {
    return this.ticketsService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles('superadmin')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(Number(id));
  }
}
