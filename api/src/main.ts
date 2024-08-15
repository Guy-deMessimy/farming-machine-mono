import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  console.log(`env URL ${process.env.DATABASE_URL}`);
  const app = await NestFactory.create(AppModule, { cors: true });
  //   const app = await NestFactory.create(AppModule);
  //   app.enableCors({
  //     origin: 'http://localhost:3000', // L'URL de votre frontend
  //     credentials: true,
  //   });
  //   await app.listen(3001); // Assurez-vous que c'est bien le port 3001
  // }
  // bootstrap();
  app.use(graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }));
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

  // initialize prisma service
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3002);
}
bootstrap();
