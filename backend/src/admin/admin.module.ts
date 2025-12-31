import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Course, CourseSchema } from '../courses/schemas/course.schema';
import {
  Enrollment,
  EnrollmentSchema,
} from '../enrollments/schemas/enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, EnrollmentsService],
})
export class AdminModule {}
