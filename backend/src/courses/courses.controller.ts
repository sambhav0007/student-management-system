import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // 🌍 PUBLIC – View courses
  @Get()
  getAllCourses() {
    return this.coursesService.findAll();
  }

  // 🔐 ADMIN – Create course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  createCourse(@Body() dto: CreateCourseDto) {
    return this.coursesService.createCourse(dto);
  }

  // 🔐 ADMIN – Update course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(id, dto);
  }

  // 🔐 ADMIN – Delete course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }
}
