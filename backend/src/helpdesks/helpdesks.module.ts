import { Module } from '@nestjs/common';
import { HelpdesksController } from './helpdesks.controller';
import { HelpdesksService } from './helpdesks.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [HelpdesksController],
  providers: [HelpdesksService, RolesGuard],
  exports: [HelpdesksService],
})
export class HelpdesksModule {}
