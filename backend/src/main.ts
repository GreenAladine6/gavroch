// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.enableCors({ origin: FRONTEND_URL || '*', credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Gavroch API')
    .setDescription('Restaurant website API')
    .setVersion('1.0')
    .addBearerAuth() // enables the "Authorize" button for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true }, // keeps the token after page refresh
  });
  if (process.env.NODE_ENV !== 'production') {
  SwaggerModule.setup('api/docs', app, document);
}

  await app.listen(3000);
}
bootstrap();