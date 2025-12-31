import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment } from './schemas/enrollment.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<Enrollment>,
  ) {}

  // STUDENT ENROLL
  async enroll(userId: string, courseId: string) {
    const exists = await this.enrollmentModel.findOne({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(courseId),
    });

    if (exists) {
      throw new BadRequestException(
        'You are already enrolled in this course',
      );
    }

    const enrollment = new this.enrollmentModel({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(courseId),
    });

    return enrollment.save();
  }

  // STUDENT – MY ENROLLMENTS
  async getMyEnrollments(userId: string) {
    return this.enrollmentModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('courseId', 'courseName courseCode duration')
      .sort({ enrollmentDate: -1 })
      .exec();
  }

  // ADMIN – ALL ENROLLMENTS (THIS FEEDS ADMIN DASHBOARD)
  async getAllEnrollments() {
    const enrollments = await this.enrollmentModel
      .find()
      .populate('userId', 'name email')
      .populate('courseId', 'courseName courseCode')
      .sort({ enrollmentDate: -1 })
      .exec();

    return enrollments.map((e) => ({
      studentName: e.userId ? (e.userId as any).name : 'N/A',
      courseName: e.courseId ? (e.courseId as any).courseName : 'N/A',
      enrollmentDate: e.enrollmentDate,
    }));
  }
}
