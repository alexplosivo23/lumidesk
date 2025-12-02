import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';

import { HelpdesksService } from './helpdesks.service';
import { CreateHelpdeskDto } from './dto/create-helpdesk.dto';
import { UpdateHelpdeskDto } from './dto/update-helpdesk.dto';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('helpdesks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HelpdesksController {
  constructor(private readonly helpdesksService: HelpdesksService) {}

  @Get()
  @Roles('superadmin', 'supervisor')
  findAll() {
    return this.helpdesksService.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'supervisor')
  findOne(@Param('id') id: string) {
    return this.helpdesksService.findOne(Number(id));
  }

  @Post()
  @Roles('superadmin')
  create(@Body() dto: CreateHelpdeskDto) {
    return this.helpdesksService.create(dto);
  }

  @Patch(':id')
  @Roles('superadmin')
  update(@Param('id') id: string, @Body() dto: UpdateHelpdeskDto) {
    return this.helpdesksService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles('superadmin')
  remove(@Param('id') id: string) {
    return this.helpdesksService.remove(Number(id));
  }
}
