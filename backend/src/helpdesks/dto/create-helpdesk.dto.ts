import { IsString } from 'class-validator';

export class CreateHelpdeskDto {
  @IsString()
  name: string;
}
