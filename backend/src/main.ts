import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ACTIVAR body-parser de forma explícita
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(3001);
  console.log("Backend corriendo en http://localhost:3001");
}
bootstrap();