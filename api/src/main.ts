import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe, Logger } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    logger.log(`Starting api service...`);
    logger.log(`Database URL: ${process.env.DATABASE_URL}`);

    const app = await NestFactory.create(AppModule);

    app.use((req, res, next) => {
      // console.log('Full request:', {
      //   method: req.method,
      //   url: req.url,
      //   headers: req.headers,
      //   body: req.body,
      // });
      next();
    });

    app.use(cookieParser());

    app.use(graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }));
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: false, // Affiche les messages d'erreurs détaillés en cas de requêtes invalides
        whitelist: true, // retire les champs non-déclarés dans le DTO
        forbidNonWhitelisted: false, // on ignore l'erreur si un champ non attendu est envoyé
        transform: true, // transforme les types (ex: string → number)
        transformOptions: {
          enableImplicitConversion: true, // Permet la conversion implicite des types (ex: "1" → 1 pour un champ number)
        },
      }),
    );

    // initialize prisma service
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(3000, '0.0.0.0');
  } catch (error) {
    logger.error(`Error starting application: ${error.message}`, error.stack);
    process.exit(1);
  }
}
bootstrap();
