import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  duration?: string;
}
