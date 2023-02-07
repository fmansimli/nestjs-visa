import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MinLength(20)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
