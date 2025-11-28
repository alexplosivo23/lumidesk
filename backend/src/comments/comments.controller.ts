import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { User } from '../auth/user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('add')
  addComment(
    @User() user: any,
    @Body('ticketId') ticketId: number,
    @Body('message') message: string,
  ) {
    return this.commentsService.addComment(Number(ticketId), user.sub, message);
  }

  @Get('ticket/:id')
  getByTicket(@Param('id') ticketId: number) {
    return this.commentsService.getCommentsByTicket(Number(ticketId));
  }
}
