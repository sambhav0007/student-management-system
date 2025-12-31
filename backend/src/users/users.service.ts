import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  // 🔍 Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // ➕ Create new user
  async createUser(
    name: string,
    email: string,
    password: string,
    role: Role,
  ): Promise<User> {
    const user = new this.userModel({
      name,
      email,
      password,
      role,
    });
    return user.save();
  }

  // 🔍 Find by ID (used later)
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
