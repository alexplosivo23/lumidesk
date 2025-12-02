import {
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';

import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles('superadmin')
  get() {
    return this.settingsService.get();
  }

  @Patch()
  @Roles('superadmin')
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.update(dto);
  }

  @Post('logo')
  @Roles('superadmin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${unique}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadLogo(@UploadedFile() file: Express.Multer.File) {
    const url = `/uploads/${file.filename}`;
    return this.settingsService.updateLogo(url);
  }
}
