import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ENABLE CORS FOR VITE FRONTEND
  app.enableCors({
    origin: 'http://localhost:5173', // Vite frontend
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}

bootstrap();
