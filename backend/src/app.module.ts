import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelpdesksModule } from './helpdesks/helpdesks.module';
import { TicketsModule } from './tickets/tickets.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { RolesModule } from './roles/roles.module';
import { PortalModule } from './portal/portal.module';

@Module({
  imports: [
    PrismaModule,
    SuperadminModule,
    AuthModule,
    UsersModule,
    TicketsModule,
    HelpdesksModule,
    CategoriesModule,
    CommentsModule,
    AttachmentsModule,
    RolesModule,
    PortalModule,
  ],
})
export class AppModule {}
