import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  description: string;

  @IsNumber()
  leaderId: number;
}
