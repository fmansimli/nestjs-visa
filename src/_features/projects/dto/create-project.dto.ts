import { IsNumber, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(15)
  description: string;

  @IsString()
  requirements: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  teamId: number;
}
