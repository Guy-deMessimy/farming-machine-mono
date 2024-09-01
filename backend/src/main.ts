import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    logger.log(`Starting backend service...`);
    logger.log(`Api URL: ${process.env.API_URI}`);

    const app = await NestFactory.create(AppModule);

    const corsOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : [
          'http://localhost:4000',
          'http://frontend:4000',
          'http://localhost:3000',
          'http://api:3000',
        ];

    app.enableCors({
      origin: corsOrigins,
      methods: ['POST', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Apollo-Require-Preflight',
      ],
      credentials: true,
      optionsSuccessStatus: 204,
    });

    app.use((req, res, next) => {
      console.log('Full request:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      });
      next();
    });

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
    await app.listen(3001, '0.0.0.0');
    logger.log(`Application is running on: http://localhost:3001`);
  } catch (error) {
    logger.error(`Error starting application: ${error.message}`, error.stack);
    process.exit(1);
  }
}
bootstrap();
