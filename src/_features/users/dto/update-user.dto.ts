import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(6)
  @MaxLength(12)
  @IsString()
  @IsOptional()
  password?: string;

  @MinLength(3)
  @MaxLength(15)
  @IsString()
  @IsOptional()
  username?: string;
}
