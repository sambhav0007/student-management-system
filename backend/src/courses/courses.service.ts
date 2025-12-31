import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
  ) {}

  async createCourse(dto: CreateCourseDto): Promise<Course> {
    const exists = await this.courseModel.findOne({
      courseCode: dto.courseCode,
    });

    if (exists) {
      throw new BadRequestException('Course code already exists');
    }

    const course = new this.courseModel(dto);
    return course.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async updateCourse(
    id: string,
    dto: UpdateCourseDto,
  ): Promise<Course | null> {
    return this.courseModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courseModel.findByIdAndDelete(id);
  }
}
