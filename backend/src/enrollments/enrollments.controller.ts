import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  // 🎓 STUDENT – Enroll in course
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @Post()
  enroll(@Req() req, @Body() dto: EnrollCourseDto) {
    return this.enrollmentsService.enroll(
      req.user.userId,
      dto.courseId,
    );
  }

  // 🎓 STUDENT – View my enrollments
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @Get('my')
  getMyEnrollments(@Req() req) {
    return this.enrollmentsService.getMyEnrollments(
      req.user.userId,
    );
  }
}
