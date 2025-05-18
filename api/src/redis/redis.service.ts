import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private client: Redis;

  onApplicationBootstrap(): void {
    // Nest appelle automatiquement onApplicationBootstrap() une fois tous les providers initialisés.
    // Tu ouvres une connexion Redis ici (this.client = new Redis(...)).
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  getClient(): Redis {
    // Via la méthode getClient(), n’importe quel service (ex: RefreshTokenIdsStorage) peut acceder a redis et ecrire, delete ...
    if (!this.client) {
      throw new Error('Redis client not initialized yet');
    }
    return this.client;
  }

  async onApplicationShutdown(signal?: string) {
    // Nest appelle onApplicationShutdown() juste avant de quitter.
    await this.client?.quit();
  }
}
