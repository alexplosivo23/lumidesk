import { IsString, IsInt } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  subject: string;

  @IsString()
  description: string;

  @IsInt()
  categoryId: number;

  @IsString()
  priority: string; // P1, P2, P3
}
