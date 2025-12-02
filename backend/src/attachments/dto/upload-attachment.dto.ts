import { IsInt } from 'class-validator';

export class UploadAttachmentDto {
  @IsInt()
  ticketId: number;
}
