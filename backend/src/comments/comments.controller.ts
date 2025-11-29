import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { User } from '../auth/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('add')
  addComment(
    @User() user: any,
    @Body('ticketId') ticketId: number,
    @Body('message') message: string,
    @Body('internal') internal?: boolean,
  ) {
    return this.commentsService.addComment(
      Number(ticketId),
      user.sub,
      message,
      internal ?? false,
    );
  }

  @Get('ticket/:id')
  getByTicket(@Param('id') ticketId: number) {
    return this.commentsService.getCommentsByTicket(Number(ticketId));
  }
}
