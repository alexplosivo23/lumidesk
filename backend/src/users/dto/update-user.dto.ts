import { IsOptional, IsEmail, IsString, MinLength, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(4)
  password?: string;

  @IsOptional()
  @IsInt()
  roleId?: number;
}
