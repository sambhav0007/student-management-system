import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Optional fields
  @Prop()
  phone?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  address?: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
