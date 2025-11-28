import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { CategoriesModule } from './categories/categories.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ApprovalsModule } from './approvals/approvals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    UserModule,
    AuthModule,
    TicketsModule,
    CommentsModule,
    AttachmentsModule,
    CategoriesModule,
    ScheduleModule.forRoot(),
    ApprovalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
