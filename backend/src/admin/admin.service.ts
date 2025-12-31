import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Course } from '../courses/schemas/course.schema';
import { Enrollment } from '../enrollments/schemas/enrollment.schema';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,

    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<Enrollment>,
  ) {}

  async getDashboardStats() {
    const totalUsers = await this.userModel.countDocuments();
    const totalCourses = await this.courseModel.countDocuments();
    const totalEnrollments = await this.enrollmentModel.countDocuments();

    const totalStudents = await this.userModel.countDocuments({
      role: Role.STUDENT,
    });

    const totalAdmins = await this.userModel.countDocuments({
      role: Role.ADMIN,
    });

    return {
      totalUsers,
      totalStudents,
      totalAdmins,
      totalCourses,
      totalEnrollments,
    };
  }

  async getEnrollmentStatsByCourse() {
    return this.enrollmentModel.aggregate([
      {
        $group: {
          _id: '$courseId',
          totalEnrollments: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course',
        },
      },
      {
        $unwind: '$course',
      },
      {
        $project: {
          _id: 0,
          courseName: '$course.courseName',
          courseCode: '$course.courseCode',
          totalEnrollments: 1,
        },
      },
    ]);
  }
}
