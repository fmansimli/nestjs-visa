import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(20)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
