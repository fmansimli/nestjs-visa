import { IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MinLength(20)
  name: string;

  @IsString()
  description: string;

  @IsString()
  requirments: string;

  @IsNumber()
  teamId: number;
}
