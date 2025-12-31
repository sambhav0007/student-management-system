import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongoConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const uri = configService.get<string>('MONGO_URI');

    if (!uri) {
      throw new Error('❌ MONGO_URI is not defined');
    }

    return {
      uri,
      connectionFactory: (connection) => {
        console.log('✅ MongoDB connected successfully');
        return connection;
      },
    };
  },
});
