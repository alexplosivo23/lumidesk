import { IsOptional, IsString } from 'class-validator';

export class UpdateHelpdeskDto {
  @IsOptional()
  @IsString()
  name?: string;
}
