import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoConfig } from './database/mongo.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoConfig,
    UsersModule,
    AuthModule,
    CoursesModule,
    EnrollmentsModule,
    AdminModule,
  ],
})
export class AppModule {}
