import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { BadRequestException } from '@nestjs/common';

@Controller('attachments')
export class AttachmentsController {
  constructor(private prisma: PrismaService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('ticketId') ticketId: string,
    @Body('commentId') commentId: string,
  ) {
    if (!file) {
      return {
        success: false,
        message: 'No file received. Check form-data field name = file.',
      };
    }
    if (!ticketId) {
      throw new BadRequestException("ticketId es obligatorio");
    }

    const attachment = await this.prisma.attachment.create({
      data: {
        ticketId: Number(ticketId),
        fileName: file.originalname,
        filePath: file.path,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    return { success: true, data: attachment };
  }
}
