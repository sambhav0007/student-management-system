import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Enrollment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ default: Date.now })
  enrollmentDate: Date;
}

export const EnrollmentSchema =
  SchemaFactory.createForClass(Enrollment);
