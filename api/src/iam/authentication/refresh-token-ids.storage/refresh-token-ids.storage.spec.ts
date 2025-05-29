import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { RedisService } from '../../../redis/redis.service';

describe.skip('RefreshTokenIdsStorage', () => {
  let redisService: jest.Mocked<RedisService>;

  it('should be defined', () => {});
});
