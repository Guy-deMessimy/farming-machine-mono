import { Injectable } from '@nestjs/common';

import { RedisService } from 'src/redis/redis.service';

// 💡 Ideally this should be in a separate file - putting this here for brevity
export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(private readonly redisService: RedisService) {}

  private get redis() {
    return this.redisService.getClient();
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redis.set(this.getKey(userId), tokenId, 'EX', 60 * 60 * 24 * 7); // TTL = 7j
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedId = await this.redis.get(this.getKey(userId));
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redis.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
