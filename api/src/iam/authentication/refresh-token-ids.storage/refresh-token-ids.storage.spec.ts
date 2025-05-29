import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { RedisService } from '../../../redis/redis.service';
import { InvalidatedRefreshTokenError } from '../../../common/errors/index';

describe('RefreshTokenIdsStorage', () => {
  let refreshTokenIdsStorage: jest.Mocked<RefreshTokenIdsStorage>;
  let redisClient: {
    set: jest.Mock;
    get: jest.Mock;
    del: jest.Mock;
  };

  beforeEach(async () => {
    redisClient = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
    };
    const redisServiceMock = {
      getClient: () => redisClient,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenIdsStorage,
        {
          provide: RedisService,
          useValue: redisServiceMock,
        },
      ],
    }).compile();
    refreshTokenIdsStorage = module.get(RefreshTokenIdsStorage);
  });

  it('should be defined', () => {
    expect(refreshTokenIdsStorage).toBeDefined();
  });

  it('should insert token id into redis with correct TTL', async () => {
    await refreshTokenIdsStorage.insert('user123', 'token123');
    expect(redisClient.set).toHaveBeenCalledWith(
      'user-user123',
      'token123',
      'EX',
      60 * 60 * 24 * 7, // 7 days
    );
  });

  it('should validate token if matches stored token', async () => {
    redisClient.get.mockResolvedValue('token123');
    const result = await refreshTokenIdsStorage.validate('user123', 'token123');
    expect(result).toBe(true);
    expect(redisClient.get).toHaveBeenCalledWith('user-user123');
  });

  it('should throw InvalidatedRefreshTokenError if token mismatch', async () => {
    redisClient.get.mockResolvedValue('wrong-token');
    await expect(
      refreshTokenIdsStorage.validate('user123', 'token123'),
    ).rejects.toThrow(InvalidatedRefreshTokenError);
  });

  it('should invalidate token by deleting from redis', async () => {
    await refreshTokenIdsStorage.invalidate('user123');
    expect(redisClient.del).toHaveBeenCalledWith('user-user123');
  });
});
