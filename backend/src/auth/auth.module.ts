import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<number>('JWT_EXPIRES_IN');

        if (!secret || !expiresIn) {
          throw new Error('JWT configuration missing');
        }

        return {
          secret,
          signOptions: {
            expiresIn, // ✅ number, not string
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
