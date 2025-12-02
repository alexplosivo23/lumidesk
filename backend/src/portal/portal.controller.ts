import { Controller, Get, UseGuards } from '@nestjs/common';
import { PortalService } from './portal.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('portal')
@UseGuards(JwtAuthGuard)
export class PortalController {
  constructor(private portalService: PortalService) {}

  @Get('helpdesks')
  async getHelpdesks() {
    return this.portalService.getHelpdesksForPortal();
  }
}
