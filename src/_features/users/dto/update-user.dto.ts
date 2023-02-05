import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsEmail()
  @MinLength(6)
  @MaxLength(12)
  @IsString()
  password: string;
}
