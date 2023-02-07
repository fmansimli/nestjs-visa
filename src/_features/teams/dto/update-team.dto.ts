import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  description: string;
}
