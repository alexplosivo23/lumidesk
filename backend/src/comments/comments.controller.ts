import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';

@Controller('comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('ticket/:ticketId')
  @Roles('user', 'agent', 'supervisor', 'superadmin')
  findByTicket(@Param('ticketId') ticketId: string) {
    return this.commentsService.findByTicket(Number(ticketId));
  }

  @Post()
  @Roles('user', 'agent', 'supervisor', 'superadmin')
  create(@Body() dto: CreateCommentDto, @User() user) {
    return this.commentsService.create(dto, user.id);
  }

  @Delete(':id')
  @Roles('superadmin')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(Number(id));
  }
}
