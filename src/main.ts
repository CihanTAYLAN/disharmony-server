import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));
  
  // Validation pipe
  app.useGlobalPipes(new ValidationPipe());
  
  // CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Swagger / OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('Disharmony API')
    .setDescription('Discord clone API documentation')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('servers', 'Server management endpoints')
    .addTag('rooms', 'Room management endpoints')
    .addTag('messages', 'Message management endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Start server
  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
  console.log('API Documentation is available at http://localhost:3000/api');
}
bootstrap();
