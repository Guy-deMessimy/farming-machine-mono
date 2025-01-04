import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const isDev = process.env.NODE_ENV !== 'production';
    super({
      log: isDev
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'info' },
            { emit: 'stdout', level: 'warn' },
            { emit: 'stdout', level: 'error' },
          ]
        : [],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    this.logger.log('Prisma service initialized');
    await this.$connect();

    this.$on('error', ({ message }) => {
      this.logger.error(message);
    });
    this.$on('warn', ({ message }) => {
      this.logger.warn(message);
    });
    this.$on('info', ({ message }) => {
      this.logger.debug(message);
    });
    this.$on('query', ({ query, params, duration }) => {
      this.logger.log(`Query: ${query}`);
      this.logger.log(`Params: ${params}`);
      this.logger.log(`Duration: ${duration}ms`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks();
    app.getHttpServer().on('close', async () => {
      await this.$disconnect();
    });
  }
}
