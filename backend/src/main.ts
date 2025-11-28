import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // PERMITIR COOKIES EN PETICIONES
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  });

  app.use(cookieParser());

  await app.listen(3001);
  console.log("Backend corriendo en http://localhost:3001");
}

bootstrap();