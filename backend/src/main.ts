import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(`env URL ${process.env.DATABASE_URL}`);
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      // have error message in case of incorrect request
      disableErrorMessages: false,
      // filter out properties that should not be received by the method handler and removed it
      whitelist: true,
      //  stop a request if any non-white listed properties are present
      forbidNonWhitelisted: false,
      // transform payloads on an instance of their dto
      transform: true,
      // perform conversion of primitive types comes from the network (ex request id = string to number)
      // if true @type on DTO can be disable
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3001);
}
bootstrap();
