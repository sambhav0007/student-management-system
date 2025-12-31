import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  courseName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  duration?: string;
}
