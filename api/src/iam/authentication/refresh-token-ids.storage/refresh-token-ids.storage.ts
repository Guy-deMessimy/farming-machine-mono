import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { InvalidatedRefreshTokenError } from '../../../common/errors/index';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(private readonly redisService: RedisService) {}

  private get redis() {
    return this.redisService.getClient();
  }

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redis.set(this.getKey(userId), tokenId, 'EX', 60 * 60 * 24 * 7); // TTL = 7j
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId = await this.redis.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.del(this.getKey(userId));
  }

  private getKey(userId: string): string {
    return `user-${userId}`;
  }
}
