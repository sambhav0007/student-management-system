import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true, unique: true })
  courseCode: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
